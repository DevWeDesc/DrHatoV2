import {
  WorkSpaceContainer,
  WorkSpaceHeader,
  WorkSpaceContent,
  WorkSpaceFooter,
} from "./styles";
import {
  Button,
  ChakraProvider,
  Table,
  Thead,
  Tr,
  Td,
  Tbody,
  HStack,
  VStack,
  Select,
  TableContainer,
  Th,
  Input,
  Text,
  Flex,
} from "@chakra-ui/react";
import {
  AiFillMedicineBox,
  BiHome,
  MdPets,
  TbArrowBack,
  TbMedicalCrossFilled,
  GiMedicines,
} from "react-icons/all";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState, ChangeEvent, useContext } from "react";
import { api } from "../../lib/axios";
import { PetDetaisl } from "../../interfaces";
import { toast } from "react-toastify";
import { Textarea } from "@chakra-ui/react";
import { TDocumentDefinitions } from "pdfmake/interfaces";
import * as pdfMake from "pdfmake/build/pdfmake";
import { ModalContext, ModalProvider } from "../../hooks/useModal";
import { GenericModal } from "../../components/Modal/GenericModal";
import { WorkVetAutorization } from "./WorkSpaceVets/autorizations";
import { WeightPetInput } from "../../components/InputMasks/WeightPetInput";
import { SetMedicineInPet } from "../../components/Medicine/SetMedicineInPet";
import { VetInstructions } from "./WorkSpaceVets/instructions";
import { EndConsults } from "./WorkSpaceVets/endconsults";
import { CardMedicineRecord } from "../../components/CardMedicineRecord/CardMedicineRecord";
import { ThrowDiagnoisticsInConsult } from "./WorkSpaceComponents/ThrowDiagnoticsInConsult";
type OpenExamProps = {
  isMultiPart: boolean;
  isReportByText: boolean;
  isOnePart: boolean;
  examId: number;
};

export function WorkSpaceVet() {
  const { id, queueId } = useParams<{ id: string; queueId: string }>();
  const navigate = useNavigate();
  const [pet, setPet] = useState({} as PetDetaisl);
  const {
    setModalWeigthPet,
    setAutorizationModalOpen,
    closeAutorizationModal,
    closeInstructionModal,
    closeModal,
    closeMedicineModal,
    insInstructionsModalOpen,
    isAutorizationModalOpen,
    isMedicineModalOpen,
    isModalOpen,
    modalWeigthPet,
    setInstructionModalOpen,
    setIsModalOpen,
    setMedicineModalOpen,
    closeEndQueueModal,
    isEndConsultQueue,
    setIsEndConsultQueue,
    isMedicineRecordOpen,
    setIsMedicineRecordOpen,
    closeMedicineRecordModal,
  } = useContext(ModalContext);
  const [handleViewComponent, setHandleViewComponent] = useState("");
  const [petWeigth, setPetWeigth] = useState("");
  const [reloadData, setReloadData] = useState(false);
  const user = JSON.parse(localStorage.getItem("user") as string);


  const handleChangePet = async (newPetId: number) => {
    navigate(`/Vets/Workspace/${newPetId}`);
    setReloadData(true);
  };

  function handleCreateInstruction(text: string) {
    const docDefinition: TDocumentDefinitions = {
      content: [`${text}`],
      pageMargins: [50, 50],
      pageSize: "A4",
    };
    pdfMake.createPdf(docDefinition).open();
  }

  function handleOpenResultExams({
    isOnePart,
    isMultiPart,
    isReportByText,
    examId,
  }: OpenExamProps) {
    if (isOnePart === true) {
      window.open(`/WorkSpace/ExamResultsOnePart/${examId}`, "_blank");
    }

    if (isMultiPart === true) {
      window.open(`/WorkSpace/ExamResultsMultiPart/${examId}`, "_blank");
    }

    if (isReportByText === true) {
      window.open(`/WorkSpace/ExamResultsByText/${examId}`, "_blank");
    }
  }

  const handleChangePetWeight = async (weigth: string) => {
    try {
      await api.put(`/pet/${id}/${weigth}`);
      setReloadData(true);
      toast.success("Peso editado com sucesso");
    } catch (error) {
      console.log(error);
      toast.error("Falha ao editar peso do animal!");
    }
  };

  async function getPetDetails() {
    const response = await api.get(`/pets/${id}`);
    setPet(response.data);
  }
  useEffect(() => {
    getPetDetails();
  }, []);

  useEffect(() => {
    if (reloadData === true) {
      getPetDetails();
      setReloadData(false); // Reseta o estado para evitar chamadas infinitas
    }
  }, [reloadData]);

  const handleCloseQuery = async () => {
    try {
      const data = {
        responsibleVeterinarian: user.consultName,
        responsibleVeterinarianId: user.id,
        petWeight: pet.weigth,
      };


      await api.put(
        `/endqueue/${id}/${queueId}/${pet.customerId}`,
        data
      );
 
       toast.success("Consulta finalizada com sucesso!!");
       navigate("/Vets/Menu");
    } catch (error) {
      toast.error("Falha ao encerrar consulta!!");
      console.log(error);
    }
  };

  let viewComponent;
  switch (true) {
    case handleViewComponent == "allPets":
      viewComponent = (
        <TableContainer overflowY="auto" height="100%">
          <Table>
            <Thead>
              <Tr>
                <Th>IR ATÉ PET</Th>
                <Th>NOME</Th>
              </Tr>
            </Thead>
            <Tbody>
              {pet.customerPets?.map((pets) => (
                <Tr key={pets.id}>
                  <Td>
                    <Button
                      onClick={() => handleChangePet(pets.id)}
                      colorScheme="whatsapp"
                    >
                      IR ATÉ O PET
                    </Button>
                  </Td>
                  <Td>{pets.name ? pets.name : "SEM OUTROS ANIMAIS"}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      );
      break;
    case handleViewComponent == "vaccines":
      viewComponent = (
        <TableContainer overflowY="auto" height="100%">
          <Table>
            <Thead>
              <Tr>
                <Th>DATA</Th>
                <Th>NOME</Th>
              </Tr>
            </Thead>
            <Tbody>
              {pet.vaccines?.map((vacine) => (
                <Tr key={vacine.id}>
                  <Td>{vacine.requestedDate.toString()}</Td>
                  <Td>{vacine.name}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      );
      break;
    case handleViewComponent == "surgeries":
      viewComponent = (
        <TableContainer>
          <Table>
            <Thead>
              <Tr>
                <Th>DATA</Th>
                <Th>NOME</Th>
              </Tr>
            </Thead>
            <Tbody>
              {pet.surgeries?.map((surgerie: any) => (
                <Tr key={surgerie.id}>
                  <Td>
                    {surgerie.completedDate
                      ? surgerie.completedDate.toString()
                      : "NÃO CONCLUIDA"}
                  </Td>
                  <Td>{surgerie.name}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      );
      break;
    default:
      viewComponent = (
        <>
          {" "}
          <h1>NADA A EXIBIR</h1>{" "}
        </>
      );
      break;
  }

  return (
    <ChakraProvider>
      <WorkSpaceContainer>
        <WorkSpaceHeader>
          <Flex
            justify="space-between"
            align="center"
            width="100vw"
            height="100%"
          >
            <Flex align="center" gap="2">
              <Text m="2" fontSize="1xl" fontWeight="bold">
                WorkSpace Veterinário
              </Text>
              <Button
                colorScheme="teal"
                leftIcon={<BiHome size={24} />}
                onClick={() => navigate("/Home")}
              >
                Home
              </Button>

              <Button
                colorScheme="yellow"
                leftIcon={<TbArrowBack size={24} />}
                onClick={() => navigate("/Vets/Menu")}
              >
                Voltar
              </Button>
            </Flex>

            <Flex width="100%" height="100%" align="center" m="4" p="2">
              <VStack w="100%" align="flex-start">
                <HStack>
                  <Button
                    onClick={() => setIsModalOpen(true)}
                    height={8}
                    colorScheme="whatsapp"
                  >
                    FORMULÁRIOS
                  </Button>

                  <Button
                    height={8}
                    colorScheme="whatsapp"
                    onClick={() => setInstructionModalOpen(true)}
                  >
                    INSTRUÇÕES PROPRIETÁRIO
                  </Button>
                  <Button
                    height={8}
                    colorScheme="whatsapp"
                    onClick={() => setAutorizationModalOpen(true)}
                  >
                    AUTORIZAÇÕES
                  </Button>
                  <Button
                    height={8}
                    colorScheme="whatsapp"
                    onClick={() => navigate(`/WorkSpace/Protocols/${id}`)}
                  >
                    PROTOCOLOS
                  </Button>

                  <Button
                    leftIcon={<GiMedicines color="black" size={24} />}
                    isDisabled={pet.isBusy}
                    height={8}
                    gap={2}
                    colorScheme="whatsapp"
                    onClick={() => setMedicineModalOpen(true)}
                  >
                    Medicar Animal
                  </Button>
                </HStack>
                <HStack>
                  <Button
                    isDisabled={pet.isBusy}
                    height={8}
                    colorScheme="whatsapp"
                    onClick={() =>
                      navigate(`/WorkSpace/Admissions/${id}/${queueId}`)
                    }
                  >
                    INTERNAR
                  </Button>
                  <Button
                    isDisabled={pet.isBusy}
                    height={8}
                    colorScheme="whatsapp"
                    onClick={() =>
                      navigate(`/WorkSpace/Surgeries/${id}/${queueId}`)
                    }
                  >
                    CIRURGIAS
                  </Button>
                  <Button
                    isDisabled={pet.isBusy}
                    height={8}
                    colorScheme="whatsapp"
                    onClick={() =>
                      navigate(`/WorkSpace/Vaccines/${id}/${queueId}`)
                    }
                  >
                    VACINAS
                  </Button>
                  <Button
                    isDisabled={pet.isBusy}
                    onClick={() =>
                      navigate(`/WorkSpace/Procedures/${id}/${queueId}`)
                    }
                    height={8}
                    colorScheme="whatsapp"
                  >
                    PROCEDIMENTOS
                  </Button>
                  <Button
                    isDisabled={pet.isBusy}
                    height={8}
                    colorScheme="whatsapp"
                    onClick={() => navigate(`/WorkSpace/Exam/${id}/${queueId}`)}
                  >
                    EXAMES
                  </Button>

                  <Button
                    height={8}
                    onClick={
                      () => setIsMedicineRecordOpen(true)
                      // navigate(`/Pets/MedicineRecord/${id}/${queueId}`)
                    }
                    leftIcon={<MdPets />}
                    colorScheme="linkedin"
                  >
                    PRONTUÁRIO DO PET
                  </Button>
                  <Button
                    colorScheme="red"
                    height={8}
                    onClick={() => setIsEndConsultQueue(true)}
                  >
                    Concluir Consulta
                  </Button>
                </HStack>
              </VStack>
            </Flex>
          </Flex>
        </WorkSpaceHeader>
        <WorkSpaceContent>
          <div className="div1">
            <Flex m="4" gap="2" direction="row">
              <VStack>
                <Text
                  fontWeight="bold"
                  w="150px"
                  display="flex"
                  justifyContent="center"
                >
                  Cliente
                </Text>
                <Text
                  fontWeight="bold"
                  w="150px"
                  display="flex"
                  justifyContent="center"
                >
                  Gastos
                </Text>
                <Text
                  fontWeight="bold"
                  w="150px"
                  display="flex"
                  justifyContent="center"
                >
                  Animal
                </Text>
                <Text
                  fontWeight="bold"
                  w="150px"
                  display="flex"
                  justifyContent="center"
                >
                  Detalhes
                </Text>
                <Text
                  fontWeight="bold"
                  w="150px"
                  display="flex"
                  justifyContent="center"
                >
                  Internações
                </Text>
                <Text
                  fontWeight="bold"
                  w="150px"
                  display="flex"
                  justifyContent="center"
                >
                  Plano de Saúde
                </Text>
              </VStack>
              <VStack w="100%">
                <Text
                  border="1px"
                  width="100%"
                  rounded="4px"
                  fontWeight="bold"
                  textAlign="center"
                  bgColor="gray.100"
                >
                  {pet.customerName}
                </Text>
                <Text
                  width="100%"
                  border="1px"
                  rounded="4px"
                  fontWeight="bold"
                  textAlign="center"
                  bgColor="gray.100"
                >
                  {new Intl.NumberFormat("pt-BR", {
                    currency: "BRL",
                    style: "currency",
                  }).format(pet.totalAcc?.price)}{" "}
                  Nesta Consulta
                </Text>
                <Text
                  width="100%"
                  border="1px"
                  rounded="4px"
                  fontWeight="bold"
                  textAlign="center"
                  bgColor="gray.100"
                  cursor="pointer"
                  onClick={() =>
                    navigate(
                      `/Recepcao/Consultas/Clientes/Pets/Edit/${id}/${queueId}`
                    )
                  }
                >
                  {`${pet.name}, ${pet.race}`}
                </Text>

                <Flex
                  width="100%"
                  border="1px"
                  rounded="4px"
                  fontWeight="bold"
                  textAlign="center"
                  bgColor="gray.100"
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Text w="6rem"></Text>
                  <Text> {`${pet.sexo}, ${pet.weigth}`} </Text>{" "}
                  <Button
                    size="sm"
                    colorScheme="yellow"
                    onClick={() => setModalWeigthPet(true)}
                  >
                    Editar Peso
                  </Button>
                </Flex>
                {pet.isBusy === true ? (
                  <Text
                    width="100%"
                    border="1px"
                    rounded="4px"
                    fontWeight="bold"
                    textAlign="center"
                    bgColor="red.200"
                  >
                    ANIMAL ESTÁ INTERNADO
                  </Text>
                ) : (
                  <Text
                    width="100%"
                    border="1px"
                    rounded="4px"
                    fontWeight="bold"
                    textAlign="center"
                    bgColor="green.100"
                  >
                    ANIMAL NÃO SE ENCONTRA INTERNADO
                  </Text>
                )}
                <Text
                  width="100%"
                  border="1px"
                  rounded="4px"
                  fontWeight="bold"
                  textAlign="center"
                  bgColor="gray.100"
                >
                  {pet.more != "" ? "PetLove" : "Sem plano de Saúde"}
                </Text>
              </VStack>
            </Flex>
            <Flex direction="column" mx="4">
              <Text fontSize="md" mx="2" mt="0" fontWeight="bold">
                Observações
              </Text>
              <Textarea
                color="red.900"
                borderColor="black"
                value={pet.queue?.moreInfos}
              ></Textarea>
            </Flex>
          </div>
          <Flex direction="column" className="div2">
            <Flex
              backgroundColor="cyan.100"
              w="100%"
              h="48px"
              direction="row"
              align="center"
              justify="center"
            >
              <Text mr="1">Exames - </Text>
              <Text mr="2" color="red">
                Vermelho: Por fazer{" "}
              </Text>
              /
              <Text ml="2" color="green">
                Verde: pronto
              </Text>
            </Flex>

            <Flex m="2" direction="column" gap="2" overflow="auto">
              {pet.exams ? (
                pet.exams.map((exam) => (
                  <Flex
                    key={exam.id}
                    w="100%"
                    backgroundColor="gray.100"
                    p="2"
                    justify="space-between"
                  >
                    <>
                      {exam.doneExam === true ? (
                        <Button
                          onClick={() =>
                            handleOpenResultExams({
                              isOnePart: exam?.onePart,
                              isMultiPart: exam?.twoPart,
                              isReportByText: exam.byText,
                              examId: exam.id,
                            })
                          }
                          colorScheme="whatsapp"
                          fontWeight="bold"
                        >
                          {exam.name}
                        </Button>
                      ) : (
                        <Button colorScheme="red" fontWeight="bold">
                          {exam.name}
                        </Button>
                      )}
                    </>
                    <Text>
                      {new Intl.DateTimeFormat("pt-BR").format(
                        new Date(
                          exam.requestedData ? exam.requestedData : Date.now()
                        )
                      )}
                    </Text>
                  </Flex>
                ))
              ) : (
                <Text>Sem exame Solicitado</Text>
              )}
            </Flex>
          </Flex>
          <div className="div3">
    
                <ThrowDiagnoisticsInConsult />
          </div>
          <div className="div4">
            <Flex justify="space-between" gap="2" m="2">
              <Button
                leftIcon={<MdPets />}
                height={8}
                colorScheme="whatsapp"
                w="33%"
                py="5"
                onClick={() => setHandleViewComponent("allPets")}
              >
                Outros Animais
              </Button>
              <Button
                leftIcon={<TbMedicalCrossFilled />}
                height={8}
                colorScheme="whatsapp"
                w="33%"
                py="5"
                onClick={() => setHandleViewComponent("vaccines")}
              >
                Vacinas
              </Button>
              <Button
                leftIcon={<AiFillMedicineBox />}
                height={8}
                colorScheme="whatsapp"
                w="33%"
                py="5"
                onClick={() => setHandleViewComponent("surgeries")}
              >
                Cirurgias
              </Button>
            </Flex>

            <Flex
              width="100%"
              maxHeight="800px"
              m="2"
              direction="column"
              gap="2"
              overflowY="auto"
            >
              {viewComponent}
            </Flex>
          </div>
        </WorkSpaceContent>
        <WorkSpaceFooter>
          <Flex
            justify="space-evenly"
            align="center"
            width="100%"
            height="100%"
            px="2"
          >
            <Button
              colorScheme="teal"
              w="25%"
              mr="3"
              py="6"
              // onClick={() => {
              //   viewComponentPrint === "Diagnóstico"
              //     ? handleCreateInstruction(PdfDiagnostic)
              //     : handleCreateInstruction(PdfPrescrition);
              // }}
            >
              Imprimir Receita
            </Button>
            <Button colorScheme="whatsapp" w="25%" mr="3" py="6">
              Imprimir Raio-X
            </Button>
            <Button colorScheme="whatsapp" w="25%" mr="3" py="6">
              Imprimir Solicitação Exames
            </Button>
            <Button colorScheme="red" w="25%" py="6">
              Gravar Alterações
            </Button>
          </Flex>
        </WorkSpaceFooter>
      </WorkSpaceContainer>

      <GenericModal isOpen={isModalOpen} onRequestClose={closeModal}>
        <Flex direction="column" gap="4" border="2px" m="4" p="4" rounded={8}>
          <Button colorScheme="whatsapp">FICHA ANESTÉSICA PERSONALIZADA</Button>
          <Button colorScheme="whatsapp">FICHA ANESTÉSICA TOMOGRAFIA</Button>

          <Button colorScheme="whatsapp">FICHA DE PARÂMETROS</Button>
          <Button colorScheme="whatsapp">FICHA DE MEDICAÇÃO</Button>
        </Flex>
      </GenericModal>

      <GenericModal
        isOpen={modalWeigthPet}
        onRequestClose={() => setModalWeigthPet(false)}
      >
        <Text textAlign="center" fontSize="18" fontWeight="bold" mb="10">
          Edição de Peso de animal
        </Text>
        <Flex direction="column" gap="15">
          <Text>Insira o peso do animal</Text>
          <WeightPetInput
            onChange={(ev: ChangeEvent<HTMLInputElement>) =>
              setPetWeigth(ev.target.value)
            }
          />
          <Button
            onClick={() => handleChangePetWeight(petWeigth)}
            colorScheme="yellow"
          >
            Editar
          </Button>
        </Flex>
      </GenericModal>

      <GenericModal
        isOpen={isAutorizationModalOpen}
        onRequestClose={closeAutorizationModal}
      >
        <WorkVetAutorization />
      </GenericModal>

      <GenericModal
        isOpen={isMedicineModalOpen}
        onRequestClose={closeMedicineModal}
      >
        <SetMedicineInPet accId={pet?.totalAcc?.id} InAdmission={false} />
      </GenericModal>
      <GenericModal
        isOpen={insInstructionsModalOpen}
        onRequestClose={closeInstructionModal}
      >
        <VetInstructions />
      </GenericModal>
      <GenericModal
        isOpen={isEndConsultQueue}
        onRequestClose={closeEndQueueModal}
      >
        <EndConsults handleCloseQuery={handleCloseQuery} />
      </GenericModal>

      <GenericModal
        isOpen={isMedicineRecordOpen}
        onRequestClose={closeMedicineRecordModal}
      >
        <Flex gap="22px">
          <CardMedicineRecord
            content="Aqui você vai encontrar o histórico do animal que estava presente no antigo sistema do Dr Hato"
            redirect={`/Pets/MedicineRecordOld/${id}/${queueId}`}
            textButton="Histórico Antigo"
            title="Visualizar Histórico antigo"
          />

          <CardMedicineRecord
            content="Aqui você vai encontrar o histórico do animal que está presente no novo sistema do Dr Hato"
            redirect={`/Pets/MedicineRecord/${id}/${queueId}`}
            textButton="Histórico Novo"
            title="Visualizar Histórico novo"
          />
        </Flex>
      </GenericModal>
    </ChakraProvider>
  );
}
