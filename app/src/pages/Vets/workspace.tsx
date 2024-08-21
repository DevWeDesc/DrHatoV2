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
  TableContainer,
  Th,
  Text,
  Flex,
  Grid,
  Checkbox,
} from "@chakra-ui/react";
import {
  AiFillMedicineBox,
  BiHome,
  MdPets,
  TbArrowBack,
  TbMedicalCrossFilled,
  GiMedicines,
  BsFillTrashFill,
  FaExchangeAlt,
} from "react-icons/all";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState, ChangeEvent, useContext } from "react";
import { api } from "../../lib/axios";
import { ConsultsPetDetails, ICustomer, PetDetaisl } from "../../interfaces";
import { toast } from "react-toastify";
import { Textarea } from "@chakra-ui/react";
import { ModalContext, ModalProvider } from "../../hooks/useModal";
import { GenericModal } from "../../components/Modal/GenericModal";
import { WorkVetAutorization } from "./WorkSpaceVets/autorizations";
import { WeightPetInput } from "../../components/InputMasks/WeightPetInput";
import { SetMedicineInPet } from "../../components/Medicine/SetMedicineInPet";
import { VetInstructions } from "./WorkSpaceVets/instructions";
import { EndConsults } from "./WorkSpaceVets/endconsults";
import { CardMedicineRecord } from "../../components/CardMedicineRecord/CardMedicineRecord";
import { ThrowDiagnoisticsInConsult } from "./WorkSpaceComponents/ThrowDiagnoticsInConsult";
import { QueryClient, useQuery } from "react-query";
import { LoadingSpinner } from "../../components/Loading";
import moment from "moment";
import { ConfirmationDialog } from "../../components/dialogConfirmComponent/ConfirmationDialog";
import ModalEditAnimal from "../../pages/Customer/modalEditAnimal";

type OpenExamProps = {
  isMultiPart: boolean;
  isReportByText: boolean;
  isOnePart: boolean;
  examId: number;
};

interface PetDetailsIncrement extends PetDetaisl {
  oneYear: {
    totalPrice: number;
  };
}

export function WorkSpaceVet() {
  const { id, queueId } = useParams<{ id: string; queueId: string }>();
  const queryClient = new QueryClient();
  const navigate = useNavigate();
  // const [pet, setPet] = useState({} as PetDetaisl);
  const [pet, setPet] = useState({} as PetDetailsIncrement);
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
    closeCustomerDetailsModal,
    setIsCustomerDetailsOpen,
    isCustomerDetailsOpen,
  } = useContext(ModalContext);
  const [handleViewComponent, setHandleViewComponent] = useState("");
  // petSelected, setIsModalUpdated, refetch, setPetSelected
  const [isModalUpdated, setIsModalUpdated] = useState(false);

  const [petWeigth, setPetWeigth] = useState("");
  const user = JSON.parse(localStorage.getItem("user") as string);
  const [customerDetails, setCustomerDetails] = useState({} as ICustomer);
  const [consultDetails, setConsultDetails] = useState(
    {} as ConsultsPetDetails
  );
  const [surgerieDetailsIsOpen, setSurgerieDetailsIsOpen] = useState(false);
  const [surgerieDetails, setSurgerieDetails] = useState({} as any);
  const GetDetailsCustomerById = async (id: number) => {
    const customer = await api.get(`/customers/${id}`);
    setCustomerDetails(customer.data.customer);
    setIsCustomerDetailsOpen(true);
  };

  const handleChangePet = async (newPetId: number) => {
    navigate(`/Vets/Workspace/${newPetId}`);
    queryClient.invalidateQueries("getPetDetailsInfos");
  };

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
      await api.put(`/pet/${id}/${weigth.replace(/kg/g, "")}`);
      await api.patch(
        `/queue/pet/weight/${queueId}/${weigth.replace(/kg/g, "")}`
      );
      queryClient.invalidateQueries("getPetDetailsInfos");
      toast.success("Peso editado com sucesso");
    } catch (error) {
      console.log(error);
      toast.error("Falha ao editar peso do animal!");
    }
  };

  async function isWithinOneYear(dateString: Date) {
    const currentDate = new Date();
    const inputDate = new Date(dateString);
  
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(currentDate.getFullYear() - 1);
  
    return inputDate >= oneYearAgo && inputDate <= currentDate;
  }

  async function getDetailsInformations() {
    await api.get(`/pets/${id}`).then(async (res) => {

      const pet = res.data;
      const examsWithinOneYear = pet.exams.filter((exam: any) =>  isWithinOneYear(exam.requestedDate));
      const vaccinesWithinOneYear = pet.vaccines.filter((vac: any) =>  isWithinOneYear(vac.requestedDate));
      const proceduresWithinOneYear = pet.procedures.filter((proc: any) => isWithinOneYear(proc.requestedDate));
      console.log(examsWithinOneYear, vaccinesWithinOneYear, proceduresWithinOneYear);
      const totalPriceOneYear = new Intl.NumberFormat("pt-BR", {
        currency: "BRL",
        style: "currency",
      }).format(
        Number(
          examsWithinOneYear?.reduce((acc: any, exam: any) => acc + Number(exam.price), 0) +
          vaccinesWithinOneYear?.reduce((acc: any, vac: any) => acc + Number(vac.price), 0) +
          proceduresWithinOneYear?.reduce((acc: any, proc: any) => acc + Number(proc.price), 0)
        )
      );


      setPet({
        ...pet,
        oneYear: {
          totalPrice: totalPriceOneYear ? totalPriceOneYear : "R$ 0,00",
        },
      });     

      if (queueId == "Sem consulta aberta") {
        return toast.error(
          "Impossivel concluir consulta neste animal sem consulta aberta"
        );
      }
      const resConsult = await api.get(`/queue/details/${queueId}`);
      setConsultDetails(resConsult.data);
    });
  }

  const { isLoading, refetch } = useQuery("getPetDetailsInfos", {
    queryFn: getDetailsInformations,
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const handleCloseQuery = async () => {
    try {
      const data = {
        responsibleVeterinarian: user.consultName,
        responsibleVeterinarianId: user.id,
        petWeight: pet.weigth,
        consultId: queueId,
      };

      await api.put(`/endqueue/${id}/${queueId}/${pet.customerId}`, data);

      toast.success("Consulta finalizada com sucesso!!");
      navigate("/Vets/Menu");
    } catch (error) {
      toast.error("Falha ao encerrar consulta!!");
      console.log(error);
    }
  };

  const handleClientIsVip = async () => {
    let value = false;

    !consultDetails?.clientIsVip && (value = true);

    await api
      .put(`/queue/setClientIsVip/${queueId}/${pet.customerId}/${value}`)
      .then(() => {
        toast.success("Cliente Vip atualizado com sucesso!");
      });
    queryClient.invalidateQueries("getPetDetailsInfos");
  };

  async function getSurgeriePetDetails(surgerieId: string | number) {
    const res = await api.get(`/surgerie/details/${surgerieId}`);
    setSurgerieDetails(res.data.surgerie);
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
                <Tr
                  cursor="pointer"
                  onClick={() => {
                    getSurgeriePetDetails(surgerie.id);
                    setSurgerieDetailsIsOpen(true);
                  }}
                  key={surgerie.id}
                >
                  <Td>
                    {surgerie.completedDate
                      ? new Intl.DateTimeFormat("pt-BR").format(
                          new Date(surgerie.completedDate)
                        )
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
          <Text fontWeight="bold" textAlign="center" fontSize={{ base: "sm" }}>
            Nada a Exibir!
          </Text>
        </>
      );
      break;
  }

  async function updateQueuePetPreference(petId: number) {
    if (consultDetails.vetPreference == "Sem preferência") {
      const data = {
        vetPreference: user.consultName,
        queueId: queueId,
      };
      await api.patch("/queue/vetpreference", data).then(() => {
        toast.success("Preferência atualizada com sucesso!");
      });
    } else {
      return toast.error("Animal já possui preferência!");
    }
  }
  return (
    <ChakraProvider>
      <WorkSpaceContainer>
        <WorkSpaceHeader>
          <Flex
            justify="space-between"
            align="center"
            width="100%"
            height="100%"
            direction={{ base: "column", md: "row" }}
          >
            <Flex align="center" gap="2">
              <Text m="2" fontSize="1xl" fontWeight="bold">
                WorkSpace Veterinário
              </Text>
              <Flex
                align="center"
                gap={2}
                direction={{ base: "row", md: "column" }}
              >
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
            </Flex>

            <Grid
              width="100%"
              templateColumns={{
                base: "repeat(2, 1fr)",
                sm: "repeat(3, 1fr)",
                md: "repeat(3, 1fr)",
                lg: "repeat(6, 1fr)",
              }}
              m="4"
              p="2"
              gap={2}
            >
              <Button
                onClick={() => setIsModalOpen(true)}
                py={4}
                whiteSpace="normal"
                colorScheme="whatsapp"
                fontSize={{ base: "sm" }}
              >
                Formulários
              </Button>

              <Button
                py={4}
                whiteSpace="normal"
                colorScheme="whatsapp"
                fontSize={{ base: "sm" }}
                onClick={() => setInstructionModalOpen(true)}
              >
                Instruções Proprietário
              </Button>
              <Button
                py={4}
                whiteSpace="normal"
                colorScheme="whatsapp"
                fontSize={{ base: "sm" }}
                onClick={() => setAutorizationModalOpen(true)}
              >
                Autorizações
              </Button>
              <Button
                py={4}
                whiteSpace="normal"
                colorScheme="whatsapp"
                fontSize={{ base: "sm" }}
                onClick={() => navigate(`/WorkSpace/Protocols/${id}`)}
              >
                Protocolos
              </Button>

              <Button
                leftIcon={<GiMedicines color="black" size={24} />}
                isDisabled={pet.isBusy}
                py={4}
                whiteSpace="normal"
                gap={2}
                colorScheme="whatsapp"
                fontSize={{ base: "sm" }}
                onClick={() => setMedicineModalOpen(true)}
              >
                Medicar Animal
              </Button>
              <Button
                py={4}
                whiteSpace="normal"
                onClick={() =>
                  // setIsMedicineRecordOpen(true)
                  navigate(`/Pets/MedicineRecord/${id}/${queueId}`)
                }
                leftIcon={<MdPets />}
                colorScheme="linkedin"
                fontSize={{ base: "sm" }}
              >
                Prontuário do Pet
              </Button>
              <Button
                isDisabled={pet.isBusy}
                py={4}
                whiteSpace="normal"
                colorScheme="whatsapp"
                fontSize={{ base: "sm" }}
                onClick={() =>
                  navigate(`/WorkSpace/Admissions/${id}/${queueId}`)
                }
              >
                Internar
              </Button>
              <Button
                isDisabled={pet.isBusy}
                py={4}
                whiteSpace="normal"
                colorScheme="whatsapp"
                fontSize={{ base: "sm" }}
                onClick={() =>
                  navigate(`/WorkSpace/Surgeries/${id}/${queueId}`)
                }
              >
                Cirurgias
              </Button>
              <Button
                isDisabled={pet.isBusy}
                py={4}
                whiteSpace="normal"
                colorScheme="whatsapp"
                fontSize={{ base: "sm" }}
                onClick={() => navigate(`/WorkSpace/Vaccines/${id}/${queueId}`)}
              >
                Vacinas
              </Button>
              <Button
                isDisabled={pet.isBusy}
                onClick={() =>
                  navigate(`/WorkSpace/Procedures/${id}/${queueId}`)
                }
                py={4}
                whiteSpace="normal"
                colorScheme="whatsapp"
                fontSize={{ base: "sm" }}
              >
                Procedimentos
              </Button>
              <Button
                isDisabled={pet.isBusy}
                py={4}
                whiteSpace="normal"
                colorScheme="whatsapp"
                fontSize={{ base: "sm" }}
                onClick={() => navigate(`/WorkSpace/Exam/${id}/${queueId}`)}
              >
                Exames
              </Button>

              <Button
                isDisabled={queueId != "Sem consulta aberta" ? false : true}
                colorScheme="red"
                fontSize={{ base: "sm" }}
                py={4}
                whiteSpace="normal"
                onClick={() => setIsEndConsultQueue(true)}
              >
                Concluir Consulta
              </Button>
            </Grid>
          </Flex>
        </WorkSpaceHeader>
        <WorkSpaceContent>
          <div className="div1">
            <TableContainer>
              <Table variant="simple" borderTop="1px solid black">
                <Thead>
                  <Tr>
                    <Th py={2} borderRight="1px solid black">
                      <Text fontWeight="bold">Cliente</Text>
                    </Th>
                    <Th py={2}>
                      {" "}
                      <Text
                        fontWeight="normal"
                        cursor="pointer"
                        onClick={() =>
                          GetDetailsCustomerById(Number(pet.customerId))
                        }
                      >
                        {`${pet.customerName} - (C) - ${new Intl.NumberFormat(
                          "pt-BR",
                          {
                            currency: "BRL",
                            style: "currency",
                          }
                        ).format(
                          Number(
                            pet?.exams?.reduce(
                              (acc, vac) => acc + Number(vac.price),
                              0
                            ) +
                              pet?.vaccines?.reduce(
                                (acc, vac) => acc + Number(vac.price),
                                0
                              ) +
                              pet?.procedures?.reduce(
                                (acc, vac) => acc + Number(vac.price),
                                0
                              )
                          )
                        )} em ${pet?.consultsPet?.length} visitas`}
                      </Text>
                    </Th>
                  </Tr>
                  <Tr>
                    <Th py={2} borderRight="1px solid black">
                      <Text fontWeight="bold">Gastos</Text>
                    </Th>
                    <Th display={"flex"}  gap={2} py={2}>
                      <Text rounded="4px" fontWeight="normal">
                        {new Intl.NumberFormat("pt-BR", {
                          currency: "BRL",
                          style: "currency",
                        }).format(pet.totalAcc?.price)}{" "}
                        Nesta Consulta
                       
                      </Text>
                      <Text fontWeight="normal">
                        {`- 12 Messes: ${pet.oneYear?.totalPrice} (${pet?.consultsPet?.length})`}
                      </Text>
                    </Th>
                  </Tr>
                  <Tr>
                    <Th py={2} borderRight="1px solid black">
                      <Text fontWeight="bold">Animal</Text>
                    </Th>
                    <Th py={0}>
                      <Grid
                        w="100%"
                        fontWeight="bold"
                        templateColumns="repeat(2, 1fr)"
                        alignItems="center"
                      >
                        <Text
                          fontWeight="bold"
                          // cursor="pointer"
                          // onClick={() =>
                          //   navigate(
                          //     `/Recepcao/Consultas/Clientes/Pets/Edit/${id}/${queueId}`
                          //   )
                          // }
                        >
                          {`${pet.name}, ${pet.especie}, ${pet.race}, Cód.: ${pet.codPet}`}
                        </Text>
                        <Button
                          size="sm"
                          h={7}
                          colorScheme="yellow"
                          // onClick={() => setModalWeigthPet(true)}
                          onClick={() => setIsModalUpdated(true)}
                        >
                          Editar Animal
                        </Button>
                      </Grid>
                    </Th>
                  </Tr>
                  <Tr>
                    <Th py={2} borderRight="1px solid black">
                      <Text fontWeight="bold">Detalhes</Text>
                    </Th>
                    <Th py={0}>
                      <Grid
                        w="100%"
                        fontWeight="bold"
                        templateColumns="repeat(2, 1fr)"
                        alignItems="center"
                      >
                        <Text>
                          {" "}
                          {`${pet.sexo}, ${pet.weigth} Kg, ${pet.bornDate}, ${
                            pet.corPet
                          }, ${
                            pet.chip ? "Microchipado" : "Não Microchipado"
                          }`}{" "}
                        </Text>{" "}
                        {/* <Button
                          size="sm"
                          colorScheme="yellow"
                          onClick={() => setModalWeigthPet(true)}
                        >
                          Editar Peso
                        </Button> */}
                      </Grid>
                    </Th>
                  </Tr>
                  <Tr>
                    <Th py={2} borderRight="1px solid black">
                      <Text fontWeight="bold">Horário</Text>
                    </Th>
                    <Th py={2}>
                      {new Intl.DateTimeFormat("pt-BR", {
                        hour: "numeric",
                        minute: "numeric",
                        second: "numeric",
                      }).format(
                        new Date(
                          consultDetails?.openedDate
                            ? consultDetails?.openedDate
                            : new Date()
                        )
                      )}
                    </Th>
                  </Tr>
                  <Tr>
                    <Th py={2} borderRight="1px solid black">
                      <Text fontWeight="bold">Internações</Text>
                    </Th>
                    <Th py={2} bg={pet.isBusy ? "red.200" : "green.100"}>
                      {pet.isBusy ? (
                        <Text fontWeight="bold">ANIMAL ESTÁ INTERNADO</Text>
                      ) : (
                        <Text rounded="4px">
                          ANIMAL NÃO SE ENCONTRA INTERNADO
                        </Text>
                      )}
                    </Th>
                  </Tr>
                  <Tr>
                    <Th py={2} borderRight="1px solid black">
                      <Text fontWeight="bold">Plano de Saúde</Text>
                    </Th>

                    {consultDetails.healthInsuranceId ? (
                      <Th py={2} fontWeight="black" bgColor="green.100">
                        {consultDetails.healthInsuranceName}
                      </Th>
                    ) : (
                      <Th py={2} fontWeight="bold">
                        Sem plano para está consulta
                      </Th>
                    )}
                  </Tr>
                </Thead>
              </Table>
            </TableContainer>

            <Flex direction="column" mx="4" my={2}>
              <Text fontSize="sm" mx="2" mt="0" fontWeight="bold">
                Observações da recepção
              </Text>
              <Textarea
                color="red.900"
                borderColor="black"
                overflowY={"scroll"}
                resize={"none"}
                value={pet.queue?.moreInfos}
              />
            </Flex>
          </div>

          <Flex
            fontSize={{ base: "sm", md: "md" }}
            direction="column"
            className="div2"
            borderTop="1px solid black"
          >
            <Flex
              borderBottom="1px solid black"
              display="flex"
              w="100%"
              gap={2}
              justifyContent="center"
              mr="1"
              py={2}
              fontWeight="bold"
              fontSize={{ base: "sm", md: "md" }}
            >
              <Text>Exames -</Text>
              <Text mr="2" color="red">
                Vermelho: Por fazer{" "}
              </Text>
              /
              <Text ml="2" color="green">
                Verde: pronto
              </Text>
            </Flex>

            <Flex m="2" direction="column" gap="2" overflow="auto">
              {pet.exams && pet.exams.length > 0 ? (
                pet.exams.map((exam) => (
                  <Flex
                    key={exam.id}
                    w="100%"
                    backgroundColor="gray.100"
                    p="2"
                    justify="space-between"
                    fontSize={{ base: "sm" }}
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
                          fontSize={{ base: "sm" }}
                        >
                          {exam.name}
                        </Button>
                      ) : (
                        <Button
                          colorScheme="red"
                          fontWeight="bold"
                          fontSize={{ base: "sm" }}
                        >
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
                <Text
                  textAlign="center"
                  fontWeight="bold"
                  fontSize={{ base: "sm" }}
                >
                  Sem exame Solicitado!
                </Text>
              )}
            </Flex>
          </Flex>
          <div className="div3">
            <ThrowDiagnoisticsInConsult />
          </div>
          <div className="div4">
            <Grid templateColumns="repeat(3, 1fr)" gap={2} px={2}>
              <Button
                leftIcon={<MdPets />}
                height={8}
                colorScheme="whatsapp"
                py="5"
                whiteSpace="normal"
                onClick={() => setHandleViewComponent("allPets")}
                fontSize={{ base: "sm" }}
              >
                Outros Animais
              </Button>
              <Button
                leftIcon={<TbMedicalCrossFilled />}
                height={8}
                colorScheme="whatsapp"
                py="5"
                whiteSpace="normal"
                onClick={() => setHandleViewComponent("vaccines")}
                fontSize={{ base: "sm" }}
              >
                Vacinas
              </Button>
              <Button
                leftIcon={<AiFillMedicineBox />}
                height={8}
                colorScheme="whatsapp"
                py="5"
                whiteSpace="normal"
                onClick={() => setHandleViewComponent("surgeries")}
                fontSize={{ base: "sm" }}
              >
                Cirurgias
              </Button>
            </Grid>

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
          
          <Grid
            gap={2}
            templateColumns={{ base: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" }}
            w={"67%"}
          >
            <Button
              whiteSpace="normal"
              colorScheme="teal"
              w="100%"
              mr="3"
              py="6"
              fontSize={{ base: "sm" }}

              // onClick={() => {
              //   viewComponentPrint === "Diagnóstico"
              //     ? handleCreateInstruction(PdfDiagnostic)
              //     : handleCreateInstruction(PdfPrescrition);
              // }}
            >
              Imprimir Receita
            </Button>
            <Button
              whiteSpace="normal"
              colorScheme="whatsapp"
              w="100%"
              mr="3"
              fontSize={{ base: "sm" }}
              py="6"
            >
              Imprimir Raio-X
            </Button>
            <Button
              whiteSpace="normal"
              colorScheme="whatsapp"
              w="100%"
              mr="3"
              py="6"
              fontSize={{ base: "sm" }}
            >
              Imprimir Solicitação Exames
            </Button>
            <ConfirmationDialog
              height="48px"
              icon={<FaExchangeAlt fill="white" size={16} />}
              buttonTitle="Alterar preferências"
              callbackFn={() => updateQueuePetPreference(pet.id)}
              describreConfirm="Deseja atribuir essa consulta a seu nome?"
              whatIsConfirmerd="Este animal está sem preferência"
              disabled={false}
            />
          </Grid>
          <Flex w={"33%"} mx={2} display={"flex"} color={"white"}>
            <Text width={"fit-content"} py="3" fontWeight={"bold"} borderLeftRadius={"md"} fontSize={{ base: "sm" }} px={4} bg={"teal.500"}>
              Veterinario:
            </Text>
            <Text width={"full"} py="3" fontWeight={"bold"} borderRightRadius={"md"} fontSize={{ base: "sm" }} px={4} bg={"whatsapp.400"}>
              {consultDetails?.vetPreference}
            </Text>
          </Flex>
        </WorkSpaceFooter>
      </WorkSpaceContainer>

      <GenericModal
        isOpen={isCustomerDetailsOpen}
        onRequestClose={closeCustomerDetailsModal}
      >
        <Text textAlign="center" fontWeight="bold" fontSize="2xl" pb={10}>
          {" "}
          Informações de cliente
        </Text>
        <Grid templateColumns="repeat(2, 1fr)" rowGap={2} px={5}>
          <Text fontWeight="bold">Nome do Cliente</Text>
          <Text>{customerDetails?.name}</Text>
          <Text fontWeight="bold">RG do Cliente</Text>
          <Text>{customerDetails?.rg}</Text>
          <Text fontWeight="bold">CPF do Cliente</Text>
          <Text>{customerDetails?.cpf}</Text>
          <Text fontWeight="bold">CEP do Cliente</Text>
          <Text>{customerDetails?.cep}</Text>
          <Text fontWeight="bold">Endereço</Text>
          <Text>{customerDetails?.adress}</Text>
          <Text fontWeight="bold">Email do Cliente</Text>
          <Text>{customerDetails?.email}</Text>
          <Text fontWeight="bold">Telefone do Cliente</Text>
          <Text>{customerDetails?.phone}</Text>
          <Text fontWeight="bold">Cliente é vip?</Text>
          <Checkbox
            onChange={handleClientIsVip}
            value={consultDetails?.clientIsVip ? "Sim" : "Não"}
            defaultChecked={consultDetails?.clientIsVip}
          >
            {consultDetails?.clientIsVip ? "Sim" : "Não"}
          </Checkbox>
        </Grid>
      </GenericModal>

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

      {/* <GenericModal
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
      </GenericModal> */}
      <GenericModal
        isOpen={surgerieDetailsIsOpen}
        onRequestClose={() => setSurgerieDetailsIsOpen(false)}
      >
        <Flex w={600} h={400} align="center" direction="column">
          <Text fontWeight="bold" p="2">
            Cirurgia: {surgerieDetails?.name}
          </Text>
          <Text fontWeight="bold" p="2">
            Laudado por: {surgerieDetails?.surgeriesReport?.reportedBy}
          </Text>
          <HStack justify="space-between" w="100%">
            <Text fontWeight="black">
              Data solicitada:{" "}
              {moment(surgerieDetails?.requestedDate).format("DD-MM-YYYY")}
            </Text>
            {surgerieDetails.completedDate ? (
              <Text fontWeight="black">
                Data finalizada:
                {moment(surgerieDetails?.completedDate).format("DD-MM-YYYY")}
              </Text>
            ) : (
              <Text fontWeight="black">Não laudado!</Text>
            )}
          </HStack>
          <HStack justify="space-between" w="100%" mt="4">
            <Text fontWeight="black">Laudo técnico:</Text>
            <Text fontWeight="black">
              Ultima atualização:
              {moment(surgerieDetails?.surgeriesReport?.reportedAt).format(
                "DD-MM-YYYY"
              )}
            </Text>
          </HStack>

          <Textarea value={surgerieDetails?.surgeriesReport?.reportedText} />
        </Flex>
      </GenericModal>
      <GenericModal
        isOpen={isModalUpdated}
        onRequestClose={() => setIsModalUpdated(false)}
      >
        <ModalEditAnimal
          setIsModalUpdated={setIsModalUpdated}
          petSelected={pet}
          refetch={() => refetch()}
        />
      </GenericModal>
    </ChakraProvider>
  );
}
