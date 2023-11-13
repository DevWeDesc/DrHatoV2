import {
  WorkSpaceContainer,
  WorkSpaceHeader,
  WorkSpaceContent,
  WorkSpaceFooter,
} from "./styles";
import {
  Button,
  ChakraProvider,
  Flex,
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
} from "@chakra-ui/react";
import {
  AiFillMedicineBox,
  BiHome,
  MdPets,
  TbArrowBack,
  TbMedicalCrossFilled,
  CiStethoscope,
  MdAttachMoney,
  GiMedicines,
} from "react-icons/all";
import { useNavigate, useParams } from "react-router-dom";
import { ChangeEvent, useEffect, useState } from "react";
import { api } from "../../lib/axios";
import { GenericModal } from "../../components/Modal/GenericModal";
import { WorkVetAutorization } from "./WorkSpaceVets/autorizations";
import { PetDetaisl } from "../../interfaces";
import { ConfirmationDialog } from "../../components/dialogConfirmComponent/ConfirmationDialog";
import { toast } from "react-toastify";
import { Textarea } from "@chakra-ui/react";
import { TDocumentDefinitions } from "pdfmake/interfaces";
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import { WeightPetInput } from "../../components/InputMasks/WeightPetInput";
import { SetMedicineInPet } from "../../components/Medicine/SetMedicineInPet";

type OpenExamProps = {
  isMultiPart: boolean,
  isReportByText: boolean,
  isOnePart: boolean,
  examId: number
}

export function WorkSpaceVet() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [pet, setPet] = useState({} as PetDetaisl);
  const [handleViewComponent, setHandleViewComponent] = useState("");
  const [petWeigth, setPetWeigth] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAutorizationModalOpen, setAutorizationModalOpen] = useState(false);
  const [isMedicineModalOpen, setMedicineModalOpen] = useState(false);
  const [reloadData, setReloadData] = useState(false);
  const [viewComponentPrint, setViewComponentPrint] = useState("");
  const [PdfDiagnostic, setPdfDiagnostic] = useState("");
  const [PdfPrescrition, setPdfPrescrition] = useState("");
  const user = JSON.parse(localStorage.getItem("user") as string);
  const [modalWeigthPet, setModalWeigthPet] = useState(false);
  const [petObservations, setPetObservations] = useState("")

  function handleCreateInstruction(text: string) {


    const docDefinition: TDocumentDefinitions = {
      content: [`${text}`],
      pageMargins: [50, 50],
      pageSize: "A4",
    };
    pdfMake.createPdf(docDefinition).open();
  }

  function openModal() {
    setIsModalOpen(true);
  }
  function closeModal() {
    setIsModalOpen(false);
  }
  function openAutorizationModal() {
    setAutorizationModalOpen(true);
  }
  function closeAutorizationModal() {
    setAutorizationModalOpen(false);
  }

  function openMedicineModal() {
      setMedicineModalOpen(true);
  }

  function closeMedicineModal() {
    setMedicineModalOpen(false);
  }

  function handleOpenResultExams({isOnePart, isMultiPart, isReportByText, examId}: OpenExamProps) {
    if (isOnePart === true) {
      window.open(`/WorkSpace/ExamResultsOnePart/${examId}`, '_blank');
    } 

    if (isMultiPart === true) {
      window.open(`/WorkSpace/ExamResultsMultiPart/${examId}`, '_blank');
    } 

    if (isReportByText === true) {
      window.open(`/WorkSpace/ExamResultsByText/${examId}`, '_blank');
    } 
  }

  const handleChangePet = async (newPetId: number) => {
    navigate(`/Vets/Workspace/${newPetId}`);
    setReloadData(true);
  };

  const handleChangePetWeight = async (weigth: string) => {
    try {
      await api.put(`/pet/${id}/${weigth}`)
      setReloadData(true);
      toast.success("Peso editado com sucesso")
    } catch (error) {
      console.log(error)
      toast.error("Falha ao editar peso do animal!")
    }
  }
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
        queryType: pet.queue.queryType,
        queueEntry: pet.queue.queueEntry,
        queueExit: new Date(),
        debitOnThisQuery: Number(pet.totalAcc.price),
        responsibleVeterinarian: user.username,
        petName: pet.name,
        petWeight: pet.weigth,
        observations: petObservations
      };

      await api.put(
        `/endqueue/${id}/${pet.recordId}/${pet.queue.id}/${pet.customerId}`,
        data
      );
      console.log(data);
      toast.success("Consulta finalizada com sucesso!!");
      navigate("/Vets/Menu");
    } catch (error) {
      toast.error("Falha ao encerrar consulta!!");
      console.log(error);
    }
  };

  let ComponentPrint;
  switch (true) {
    case viewComponentPrint == "Diagnóstico":
      ComponentPrint = (
        <div>
          <Textarea
            minW="45.7rem"
            minH="12.5rem"
            value={PdfDiagnostic}
            onChange={(e) => setPdfDiagnostic(e.target.value)}
          />
        </div>
      );
      break;
    case viewComponentPrint == "Prescrição":
      ComponentPrint = (
        <Textarea
          minW="45.7rem"
          minH="12.5rem"
          value={PdfPrescrition}
          onChange={(e) => setPdfPrescrition(e.target.value)}
        />
      );

      break;
      case viewComponentPrint == "Solicitar Exame":
        ComponentPrint = (
          <Textarea
            minW="45.7rem"
            minH="12.5rem"
          defaultValue={'Observações nesta consulta'}
            onChange={(e) => setPetObservations(e.target.value)}
          />
        );
        
        break;
    default:
      ComponentPrint = <Text>Nenhuma informação a ser exibida</Text>;
      break;
  }

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

  console.log("examss", pet.exams)

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

            <Flex
              flexWrap="wrap"
              width="2200px"
              height="100%"
              justify="start"
              gap="2"
              m="4"
              p="2"
              overflowX="auto"
            >
              <Button
                onClick={() => openModal()}
                height={8}
                colorScheme="whatsapp"
              >
                FORMULÁRIOS
              </Button>
              <Button
                height={8}
                colorScheme="whatsapp"
                onClick={() => navigate(`/WorkSpace/Instructions/${id}`)}
              >
                INSTRUÇÕES PROPRIETÁRIO
              </Button>
              <Button
                height={8}
                colorScheme="whatsapp"
                onClick={() => openAutorizationModal()}
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
                isDisabled={pet.isBusy}
                height={8}
                colorScheme="whatsapp"
                onClick={() => navigate(`/WorkSpace/Exam/${id}`)}
              >
                EXAMES
              </Button>
              <Button
                isDisabled={pet.isBusy}
                onClick={() => navigate(`/WorkSpace/Procedures/${id}`)}
                height={8}
                colorScheme="whatsapp"
              >
                PROCEDIMENTOS
              </Button>
              <Button
                isDisabled={pet.isBusy}
                height={8}
                colorScheme="whatsapp"
                onClick={() => navigate(`/WorkSpace/Vaccines/${id}`)}
              >
                VACINAS
              </Button>
              <Button
                isDisabled={pet.isBusy}
                height={8}
                colorScheme="whatsapp"
                onClick={() => navigate(`/WorkSpace/Surgeries/${id}`)}
              >
                CIRURGIAS
              </Button>
              <Button
                isDisabled={pet.isBusy}
                height={8}
                colorScheme="whatsapp"
                onClick={() => navigate(`/WorkSpace/Admissions/${id}`)}
              >
                INTERNAR
              </Button>
              <Button
              leftIcon={<GiMedicines color="black" size={24}/>}
                isDisabled={pet.isBusy}
                height={8}
                gap={2}
                colorScheme="whatsapp"
                onClick={() => openMedicineModal()}
              >
                Medicar Animal
              </Button>

              <Button
                height={8}
                onClick={() => navigate(`/Pets/MedicineRecord/${id}`)}
                leftIcon={<MdPets />}
                colorScheme="messenger"
              >
                PRONTUÁRIO DO PET
              </Button>

              <ConfirmationDialog
                disabled={pet.queue?.petIsInQueue === false ? true : false}
                icon={<CiStethoscope fill="white" size={24} />}
                buttonTitle="Concluir Consulta"
                whatIsConfirmerd="Tem certeza que deseja encerrar consulta ?"
                describreConfirm="Encerrar a consulta registra todos débitos desta consulta no pet, e é uma ação irreversivel !!"
                callbackFn={handleCloseQuery}
              />

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
                  }).format(pet.totalAcc?.price)} Nesta Consulta
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
                    navigate(`/Recepcao/Consultas/Clientes/Pets/Edit/${id}`)
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
                {/* <Select
                    border="1px"
                    height="26px"
                    width="100%"
                    rounded="4px"
                    fontWeight="bold"
                    textAlign="center"
                    bgColor="gray.100"
                    placeholder="Selecione uma Opção"
                    value={pet.more != "" ? "PetLove" : "Sem plano de Saúde"}
                  >
                    <option value="option1">Não tenho plano de saúde</option>
                    <option value="option2">Pet Love</option>
                  </Select> */}
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
                        <Button onClick={() => handleOpenResultExams({isOnePart: exam?.reports[0]?.isOnePart, isMultiPart: exam?.reports[0]?.isMultiPart, isReportByText: exam.byText, examId: exam.id})} colorScheme="whatsapp" fontWeight="bold">
                          {exam.name}
                        </Button>
                      ) : (
                        <Button colorScheme="red" fontWeight="bold">
                          {exam.name}
                        </Button>
                      )}
                    </>
                    <Text>{new Intl.DateTimeFormat('pt-BR').format(new Date(exam.requestedData ? exam.requestedData : Date.now()))}</Text>
                  </Flex>
                ))
              ) : (
                <Text>Sem exame Solicitado</Text>
              )}
            </Flex>
          </Flex>
          <div className="div3">
            <HStack spacing={4} m="2" w="100%">
              <Button
                w="25%"
                colorScheme="whatsapp"
                onClick={() => setViewComponentPrint("Diagnóstico")}
              >
                Diagnóstico
              </Button>
              <Button
                w="25%"
                colorScheme="whatsapp"
                onClick={() => setViewComponentPrint("Prescrição")}
              >
                Prescrição
              </Button>
              <Button w="25%" colorScheme="whatsapp">
                Sintomas
              </Button>
              <Button  onClick={() => setViewComponentPrint("Solicitar Exame")} w="25%" colorScheme="whatsapp">
               Observações
              </Button>
            </HStack>
            <Flex>{ComponentPrint}</Flex>
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
              onClick={() => {
                viewComponentPrint === "Diagnóstico"
                  ? handleCreateInstruction(PdfDiagnostic)
                  : handleCreateInstruction(PdfPrescrition);
              }}
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
          <WeightPetInput onChange={(ev: ChangeEvent<HTMLInputElement> ) => setPetWeigth(ev.target.value)} />
          <Button onClick={() => handleChangePetWeight(petWeigth)}  colorScheme="yellow">Editar</Button>
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
         <SetMedicineInPet petId={pet?.id} accId={pet?.totalAcc?.id} />
      </GenericModal>
    </ChakraProvider>
  );
}
