import {
  Box,
  ChakraProvider,
  Flex,
  Text,
  Input,
  Button,
  Stack,
  TableContainer,
  Table,
  Thead,
  Tbody,
  Tr,
  Td,
  Th,
  Textarea,
} from "@chakra-ui/react";
import { BiHome, TbArrowBack } from "react-icons/all";
import { AdminContainer } from "../../../pages/AdminDashboard/style";
import { WorkSpaceHeader } from "../../../pages/Vets/styles";
import { useNavigate, useParams } from "react-router";
import { useContext, useEffect, useMemo, useState } from "react";
import { api } from "../../../lib/axios";
import { PetDetaisl } from "../../../interfaces";
import moment from "moment";
import { toast } from "react-toastify";
import { GenericModal } from "../../Modal/GenericModal";
import { EndConsults } from "../../../pages/Vets/WorkSpaceVets/endconsults";

export default function DetailsAdmissions() {
  const [admissiondiary, setAdmissionDiary] = useState<number | boolean>(false);
  const [endModalIsOpen, setEndModalIsOpen] = useState(false);
  const [endAdmission, setEndAdmission] = useState(false);
  const [dailyObservations, setDailyObservations] = useState("");
  const { id, queueId } = useParams<{ id: string; queueId: string }>();
  const navigate = useNavigate();
  const [petDetails, setPetDetails] = useState({} as PetDetaisl);
  const user = JSON.parse(localStorage.getItem("user") as string);
  const entryDate = petDetails.bedInfos?.entry;

  const totalDaily = moment(new Date()).diff(entryDate, "minutes");


  console.log(petDetails)

  function handleWithPriceChanges() {
    const differenceBetweenDates = moment(new Date()).diff(
      entryDate,
      "minutes"
    );
    let totalToPay = 0;
    let price = Number(petDetails?.bedInfos?.kennelName?.price);
    if (differenceBetweenDates > 60) {
      totalToPay += price / 2;
      if (differenceBetweenDates >= 720) {
        let diffToPay = Math.ceil(differenceBetweenDates / 720);
        totalToPay += diffToPay * (price / 2) - 150;
      }
    }
    return totalToPay;
  }

  async function handlePrintTag(petDetails: PetDetaisl) {

    const printWindow = window.open("", "", "width=800,height=600");

    if (!printWindow) {
      return;
    }

    const container = printWindow.document.createElement("div");

    container.innerHTML = `
        <div class="label-container">
            <p class="hospital-name">HOSPITAL VETERINARIO DR.HATO</p>
            <p><span>Cod:</span> ${petDetails.codPet}</p>
            <p><span>Prop:</span> ${petDetails.customerName}, ${petDetails.especie}, ${petDetails.name}, ${petDetails.race}, ${petDetails.sexo}, ${petDetails.bornDate}</p>
            <p><span>Dr:</span> ${petDetails.bedInfos.vetPreference} - <span>CRMV:</span>-</p>
            <p>${new Date().toLocaleDateString()}</p>
        </div>`;

    printWindow.document.body.appendChild(container);

    const style = printWindow.document.createElement("style");
    style.textContent = `
      @media print {
        @page {
          size: 8cm 4cm;
          margin: 0;
        }
        body {
          margin: 0;
          padding: 0;
          font-family: Arial, sans-serif;
      }
      .label-container {
          width: 8cm;
          height: 4cm;
          padding: 5px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          box-sizing: border-box;
          padding: 0px 50px;
      }
      .hospital-name {
          font-size: 12px;
          font-weight: bold;
          text-align: center;
          margin-bottom: 5px;
      }
      p {
          font-size: 10px;
          margin: 2px 0;
      }
      span {
          font-weight: bold;       
      }
    `;
    printWindow.document.head.appendChild(style);

    setTimeout(() => {
      printWindow.focus();
      printWindow.print();
      printWindow.close();
    }, 1000);
  }

  const totalToPayInTimeAdmmited = handleWithPriceChanges();

  function getNextPaymentHour(hourParam: number) {
    const IntervalsMinutes = totalDaily / hourParam;
    const nextPayment = Math.round(IntervalsMinutes + hourParam);
    const restTime = (nextPayment - (totalDaily % hourParam)) / 60;
    return restTime.toFixed(1);
  }

  let dailyValue;
  switch (true) {
    case totalDaily < 720:
      dailyValue = `${totalDaily} Minutos`;
      break;
    case totalDaily >= 720:
      dailyValue = `${(totalDaily / 720).toFixed(2)} Diárias`;

      break;
    default:
      dailyValue = `${totalDaily}`;
      break;
  }

  const formattedDate = moment(entryDate).format("DD/MM/YYYY");
  async function getAdmissionDetails() {
    const response = await api.get(`pets/${id}`);
    setPetDetails(response.data);
  }

  useEffect(() => {
    getAdmissionDetails();
  }, []);

  const handleEndAdmission = async () => {
    try {
      const confirmation = window.confirm(
        "VOCÊ ESTÁ ENCERRANDO UMA INTERNAÇÃO TEM CERTEZA QUE DESEJA CONTINUAR?"
      );

      if (confirmation === true) {
        const data = {
          queueId: queueId?.toString(),
          petId: Number(id),
          responsibleVeterinarianId: user?.id,
          responsibleVeterinarian: user?.consultName,
          bedId: petDetails?.bedInfos?.id,
          admissionId: petDetails?.admissions[0]?.id,
          totalInAdmission: Number(petDetails.totalAcc?.price),
        };

        console.log(data);
        await api.put("/endadmission", data);
        toast.success("Internação finalizada com Sucesso!");
        navigate("/Admissions");
      } else {
        toast.warning("Confirmação recusada, ANIMAL CONTINUA INTERNADO!");
        return;
      }
    } catch (error) {
      console.error(error);
      toast.error("Falha ao finalizar Internação!");
    }
  };

  const handleHospDiary = async () => {
    try {
      const data = {
        observations: dailyObservations,
      };

      await api.post(`/admissions/diary/${petDetails?.admissions[0].id}`, data);

      toast.success("Gravado com sucesso");
    } catch (error) {
      toast.error("Falha ao gravar no diário");
      console.log(error);
    }
  };

  const totalSum = useMemo(() => {
    return (
      Number(totalToPayInTimeAdmmited) + Number(petDetails.totalAcc?.price)
    );
  }, [totalToPayInTimeAdmmited, petDetails.totalAcc?.price]);

  return (
    <ChakraProvider>
      <AdminContainer>
        <Flex direction="column" h="100vh">
          <WorkSpaceHeader>
            <Flex
              justify="space-between"
              align="center"
              width="100%"
              height="100%"
            >
              <Flex align="center" gap="2">
                <Text m="2" fontSize="2xl" fontWeight="bold">
                  Painel de Internação
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
                  onClick={() => navigate("/Admissions/")}
                >
                  Voltar
                </Button>
              </Flex>

              <Flex flexWrap="wrap" justify="start" gap="2" m="4" p="2">
                <Button
                  //onClick={() => openModal()}
                  height={8}
                  colorScheme="whatsapp"
                  onClick={() => setAdmissionDiary(false)}
                >
                  Adicionar novo item do diário
                </Button>
                <Button
                  //onClick={() => openModal()}
                  height={8}
                  colorScheme="twitter"
                  onClick={() => navigate(`/Pets/MedicineRecord/${id}/${queueId}`)}
                >
                  Histórico da Internação
                </Button>
                <Button
                  //onClick={() => openModal()}
                  height={8}
                  colorScheme="whatsapp"
                  onClick={() => alert("TODOO")}
                >
                  Impressão
                </Button>
                <Button
                  //onClick={() => openModal()}
                  height={8}
                  colorScheme="whatsapp"
                  onClick={() => handlePrintTag(petDetails)}
                >
                  Etiqueta
                </Button>
                <Button
                  //onClick={() => openModal()}
                  height={8}
                  colorScheme="whatsapp"
                  onClick={() => {
                    navigate(
                      `/Admissions/Procedures/${petDetails.recordId}/${queueId}`
                    );
                  }}
                >
                  Procedimentos
                </Button>
                <Button
                  height={8}
                  colorScheme="whatsapp"
                  onClick={() =>
                    navigate(`/Admissions/Vaccines/${id}/${queueId}`)
                  }
                >
                  Vacinas
                </Button>
                <Button
                  height={8}
                  colorScheme="whatsapp"
                  //onClick={() => openAutorizationModal()}
                  onClick={() => navigate(`/Admissions/Exams/${id}/${queueId}`)}
                >
                  Exames
                </Button>
                <Button
                  height={8}
                  colorScheme="whatsapp"
                  onClick={() =>
                    navigate(`/Admissions/Surgeries/${id}/${queueId}`)
                  }
                >
                  Cirurgias
                </Button>
              </Flex>
            </Flex>
          </WorkSpaceHeader>
          <Flex w="100%" mx="auto">
            <Box w="100%" borderRadius={8}>
              <Flex w="100%" direction="column">
                <Text
                  textAlign="center"
                  bg="gray.900"
                  fontWeight="bold"
                  fontSize="4xl"
                  color="white"
                  py="2"
                >
                  Internação
                </Text>

                <TableContainer>
                  <Table>
                    <Thead>
                      <Tr>
                        <Th
                          border={"2px"}
                          borderColor={"black"}
                          color={"black"}
                          fontWeight={"bold"}
                          bg="gray.300"
                        >
                          <Text>Cliente</Text>
                        </Th>
                        <Th
                          border={"2px"}
                          borderColor={"black"}
                          color={"black"}
                          fontWeight={"bold"}
                        >
                          <Text>{petDetails?.customerName}</Text>
                        </Th>
                        <Th
                          border={"2px"}
                          borderColor={"black"}
                          color={"black"}
                          fontWeight={"bold"}
                          bg="gray.300"
                        >
                          Canil
                        </Th>
                        <Th
                          border={"2px"}
                          borderColor={"black"}
                          color={"black"}
                          fontWeight={"bold"}
                        >
                          {" "}
                          {petDetails.bedInfos?.kennelName?.name}
                        </Th>
                      </Tr>

                      <Tr>
                        <Th
                          border={"2px"}
                          borderColor={"black"}
                          color={"black"}
                          fontWeight={"bold"}
                          bg="gray.300"
                        >
                          <Text>Pet</Text>
                        </Th>
                        <Th
                          border={"2px"}
                          borderColor={"black"}
                          color={"black"}
                          fontWeight={"bold"}
                        >
                          <Text>
                            {petDetails.name} - {petDetails.especie},
                            {petDetails.race}, Cod:{petDetails.codPet}
                          </Text>
                        </Th>
                        <Th
                          border={"2px"}
                          borderColor={"black"}
                          color={"black"}
                          fontWeight={"bold"}
                          bg="gray.300"
                        >
                          Data de internação
                        </Th>
                        <Th
                          border={"2px"}
                          borderColor={"black"}
                          color={"black"}
                          fontWeight={"bold"}
                        >
                          {formattedDate}
                        </Th>
                      </Tr>

                      <Tr>
                        <Th
                          border={"2px"}
                          borderColor={"black"}
                          color={"black"}
                          fontWeight={"bold"}
                          bg="gray.300"
                        >
                          <Text></Text>
                        </Th>
                        <Th
                          border={"2px"}
                          borderColor={"black"}
                          color={"black"}
                          fontWeight={"bold"}
                        >
                          <Text>
                            {petDetails.weigth} Kg, {petDetails.sexo},{" "}
                            {petDetails.bornDate}, {petDetails.corPet}
                          </Text>
                        </Th>
                        <Th
                          border={"2px"}
                          borderColor={"black"}
                          color={"black"}
                          fontWeight={"bold"}
                          bg="gray.300"
                        >
                          Veterinário
                        </Th>
                        <Th
                          border={"2px"}
                          borderColor={"black"}
                          color={"black"}
                          fontWeight={"bold"}
                        >
                          {petDetails.bedInfos?.vetPreference}
                        </Th>
                      </Tr>

                      <Tr>
                        <Th
                          border={"2px"}
                          borderColor={"black"}
                          color={"black"}
                          fontWeight={"bold"}
                          bg="gray.300"
                        >
                          <Text>Jejum</Text>
                        </Th>
                        <Th
                          border={"2px"}
                          borderColor={"black"}
                          color={"black"}
                          fontWeight={"bold"}
                          bg={"red.200"}
                        >
                          <Text>
                            {petDetails.bedInfos?.fasting === true
                              ? "ANIMAL PRECISA DE JEJUM"
                              : "ANIMAL NÃO PRECISA DE JEJUM"}
                          </Text>
                        </Th>
                        <Th
                          border={"2px"}
                          borderColor={"black"}
                          color={"black"}
                          fontWeight={"bold"}
                          bg="gray.300"
                        >
                          Plano de Saude
                        </Th>
                        <Th
                          border={"2px"}
                          borderColor={"black"}
                          color={"black"}
                          fontWeight={"bold"}
                        >
                          {petDetails?.admissionsHealthPlan?.[0]
                            ?.healthInsuranceName ?? "Não Possui"}
                        </Th>
                      </Tr>
                    </Thead>
                  </Table>
                </TableContainer>

                {/* <Button
                  bg="blue.400"
                  color="white"
                  py="8"
                  mb="1"
                  fontSize="20"
                  fontWeight="bold"
                  boxShadow="0px 4px 5px rgba(0, 0, 0, 0.6)"
                  _hover={{
                    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.5)",
                    backgroundColor: "blue.500",
                  }}
                  _active={{ boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.5)" }}
                  onClick={() => {
                    console.log(admissiondiary);
                    setAdmissionDiary(true);
                  }}
                >
                  {" "}
                  Internação Diaria
                </Button> */}

                <Flex>
                  {admissiondiary === false && (
                    <Box w="100%">
                      <Flex direction="column" w="100">
                        <Text
                          fontSize="20"
                          bg="yellow.300"
                          w="100%"
                          textAlign="center"
                          py={2}
                          fontWeight="bold"
                        >
                          Ainda não foi inserido nenhum item diario sobre
                          internação
                        </Text>
                        <Text
                          fontSize="20"
                          bg="blue.300"
                          w="100%"
                          textAlign="center"
                          py={2}
                          fontWeight="bold"
                        >
                          Inserir novo item do diário da internação
                        </Text>
                        <Flex p={2} borderBottom={"1px"}>
                          <Textarea
                            border={"1px"}
                            pt="6"
                            minH="40"
                            onChange={(ev) =>
                              setDailyObservations(ev.target.value)
                            }
                            defaultValue={`Evolução de quadro clinico:
Mudanças de Protocolo:
Metas para as próximas 12h horas:
Prognóstico: 
Previsão de alta:`}
                          ></Textarea>
                        </Flex>
                        <Flex py={2} justifyContent={"center"}>
                          <Button
                            onClick={handleHospDiary}
                            colorScheme="whatsapp"
                          >
                            Gravar
                          </Button>
                        </Flex>
                        <Flex direction="column">
                          <Flex
                            align="center"
                            borderY="1px solid black"
                            bg={"gray.200"}
                          >
                            <Text w="60vw"></Text>
                            <Text
                              w="25vw"
                              fontWeight="bold"
                              mr="4"
                              textAlign={"right"}
                            >
                              Valor total em procedimentos até o momento
                            </Text>
                            <Input
                              value={new Intl.NumberFormat("pt-BR", {
                                currency: "BRL",
                                style: "currency",
                              }).format(Number(petDetails.totalAcc?.price))}
                              borderY="none"
                              w="15vw"
                              borderColor="black"
                              rounded={0}
                            ></Input>
                          </Flex>
                          <Flex
                            align="center"
                            borderY="1px solid black"
                            bg={"gray.200"}
                          >
                            <Text w="70vw"></Text>
                            <Text
                              w="15vw"
                              fontWeight="bold"
                              pl="4"
                              mr="4"
                              textAlign={"right"}
                            >
                              Diaria(S) até o momento
                            </Text>
                            <Input
                              value={dailyValue}
                              borderY={0}
                              w="15vw"
                              borderColor="black"
                              rounded={0}
                            ></Input>
                          </Flex>

                          <Flex
                            align="center"
                            border="1px"
                            height="38px"
                            justify="flex-end"
                            textAlign="center"
                            bg={"gray.200"}
                          >
                            <Text
                              justifyContent="center"
                              align="center"
                              w="3vw"
                              textAlign={"right"}
                              fontWeight="bold"
                              mr="4"
                            >
                              Total
                            </Text>
                            <Text
                              py="1"
                              borderY="0px"
                              borderX="1px solid black"
                              w="14.7vw"
                              textAlign="start"
                              pl="4"
                            >
                              {new Intl.NumberFormat("pt-BR", {
                                currency: "BRL",
                                style: "currency",
                              }).format(totalSum)}
                            </Text>
                          </Flex>

                          {totalDaily >= 60 ? (
                            <Text
                              fontSize="20"
                              bg={"gray.200"}
                              border={"1px"}
                              w="100%"
                              textAlign="center"
                              py={2}
                              fontWeight="bold"
                              color="red"
                            >
                              Tempo de Tolerância Restante:{" "}
                              {totalDaily >= 60 ? "Esgotado" : "Em Tolerancia"}
                            </Text>
                          ) : (
                            <Text
                              color="green"
                              fontSize="20"
                              bg={"gray.200"}
                              border={"1px"}
                              w="100%"
                              textAlign="center"
                              py={2}
                              fontWeight="bold"
                            >
                              Tempo de Tolerância Restante:{" "}
                              {totalDaily >= 60 ? "Esgotado" : "Em Tolerancia"}
                            </Text>
                          )}
                          <Text
                            fontSize="20"
                            bg={"gray.200"}
                            border={"1px"}
                            w="100%"
                            textAlign="center"
                            py={2}
                            fontWeight="bold"
                          >
                            Tempo Restante até o final da meia diaría:{" "}
                            {getNextPaymentHour(720)}
                          </Text>
                        </Flex>
                        <Text
                          fontSize="20"
                          bg={"gray.200"}
                          border={"1px"}
                          w="100%"
                          textAlign="center"
                          py={2}
                          fontWeight="bold"
                        >
                          Tempo Restante até o final da diaría:{" "}
                          {getNextPaymentHour(1440)}
                        </Text>
                        <Button
                          py="8"
                          // bg="whatsapp.500"
                          fontSize="20"
                          fontWeight="bold"
                          color="white"
                          boxShadow="0px 4px 5px rgba(0, 0, 0, 0.6)"
                          bg="blue.300"
                          _hover={{
                            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.5)",
                            backgroundColor: "blue.400",
                          }}
                          _active={{
                            boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.2)",
                          }}
                          onClick={() => setEndAdmission(true)}
                        >
                          Encerrar Diárias
                        </Button>
                      </Flex>
                    </Box>
                  )}
                </Flex>
              </Flex>
            </Box>
          </Flex>
          {endAdmission && (
            <>
              <Flex
                position={"absolute"}
                border={"2px"}
                bottom={5}
                w="full"
                bg={"white"}
                direction={"column"}
                zIndex={2}
              >
                <Text textAlign={"center"} bg={"blue.300"} py={2} fontWeight={"bold"} borderBottom={"2px"}  >Deseja mesmo Encerrar as diárias desta internação ?</Text>

                <Flex gap={20} py={"10"} justifyContent={"center"}>
                  <Flex
                    _hover={{
                      bg: "green.600",
                    }}
                    justifyContent={"center"}
                    color={"white"}
                    fontSize={"3xl"}
                    cursor={"pointer"}
                    fontWeight={"bold"}
                    alignItems={"center"}
                    borderRadius={"full"}
                    bg={"green.500"}
                    h={"20vh"}
                    w={"20vh"}
                    onClick={() => handleEndAdmission()}
                  >
                    Sim
                  </Flex>
                  <Flex
                    _hover={{
                      bg: "red.600",
                    }}
                    justifyContent={"center"}
                    color={"white"}
                    fontSize={"3xl"}
                    cursor={"pointer"}
                    fontWeight={"bold"}
                    alignItems={"center"}
                    borderRadius={"full"}
                    bg={"red.500"}
                    h={"20vh"}
                    w={"20vh"}
                    onClick={() => setEndAdmission(false)}
                  >
                    Não
                  </Flex>
                </Flex>
              </Flex>
            </>
          )}
        </Flex>
      </AdminContainer>
      <GenericModal
        isOpen={endModalIsOpen}
        onRequestClose={() => setEndModalIsOpen(false)}
      >
        <EndConsults
          handleCloseAdmission={handleEndAdmission}
          setEndModalIsOpen={setEndModalIsOpen}
          isAdmission={true}
        />
      </GenericModal>
    </ChakraProvider>
  );
}
