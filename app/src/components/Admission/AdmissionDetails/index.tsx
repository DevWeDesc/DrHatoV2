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
} from "@chakra-ui/react";
import { BiHome, MdPets, TbArrowBack } from "react-icons/all";
import { AdminContainer } from "../../../pages/AdminDashboard/style";
import { WorkSpaceHeader } from "../../../pages/Vets/styles";
import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import { api } from "../../../lib/axios";
import { PetDetaisl } from "../../../interfaces";
import moment from "moment";
export default function DetailsAdmissions() {
  const [admissiondiary, setAdmissionDiary] = useState<number | boolean>(false);
  const [confirmation, setConfirmation] = useState<boolean>(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const [petDetails, setPetDetails] = useState<any>({} as PetDetaisl);
  const entryDate = petDetails.bedInfos?.entry;

  const totalDaily = moment(new Date()).diff(entryDate, "minutes");

  let dailyValue;
  switch (true) {
    case totalDaily < 720:
      dailyValue = `${totalDaily} Minutos`;
      break;
    case totalDaily >= 720:
      dailyValue = `${totalDaily / 720} Diárias`;
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

  console.log(petDetails);

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
                  onClick={() => navigate(`/Admissions/Procedures/${id}`)}
                >
                  Procedimentos
                </Button>
                <Button
                  height={8}
                  colorScheme="whatsapp"
                  onClick={() => navigate(`/Admissions/Vaccines/${id}`)}
                >
                  Vacinas
                </Button>
                <Button
                  height={8}
                  colorScheme="whatsapp"
                  //onClick={() => openAutorizationModal()}
                  onClick={() => navigate(`/Admissions/Exams/${id}`)}
                >
                  Exames
                </Button>
                <Button
                  height={8}
                  colorScheme="whatsapp"
                  onClick={() => navigate(`/Admissions/Surgeries/${id}`)}
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
                          borderRight="2px"
                          borderBottom="2px"
                          bgColor="gray.300"
                          color="black"
                          fontWeight="extrabold"
                        >
                          Cliente
                        </Th>
                        <Th
                          borderRight="2px"
                          borderBottom="2px"
                          bgColor="gray.300"
                          color="black"
                          fontWeight="extrabold"
                        >
                          Detalhes Pet
                        </Th>
                        <Th
                          borderRight="2px"
                          borderBottom="2px"
                          bgColor="gray.300"
                          color="black"
                          fontWeight="extrabold"
                        >
                          Jejum
                        </Th>
                        <Th
                          borderRight="2px"
                          borderBottom="2px"
                          bgColor="gray.300"
                          color="black"
                          fontWeight="extrabold"
                        >
                          Canil
                        </Th>
                        <Th
                          borderRight="2px"
                          borderBottom="2px"
                          bgColor="gray.300"
                          color="black"
                          fontWeight="extrabold"
                        >
                          Data Internação
                        </Th>
                        <Th
                          borderRight="2px"
                          borderBottom="2px"
                          bgColor="gray.300"
                          color="black"
                          fontWeight="extrabold"
                        >
                          Preferência Veterinário
                        </Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      <Tr>
                        <Td borderRight="2px">{petDetails.customerName}</Td>
                        <Td w={300} borderRight="2px">
                          <Flex direction="column" gap="2">
                            <Text>
                              {" "}
                              {petDetails.name},{" " + petDetails.especie},
                              {" " + petDetails.race},
                            </Text>
                            <Text>
                              {" "}
                              {petDetails.sexo}, {" " + petDetails.bornDate}
                            </Text>
                            {petDetails.codPet}
                            <Text fontWeight="bold">
                              {petDetails.more !== ""
                                ? "PetLove"
                                : "Não possui Plano de Saúde"}
                            </Text>
                          </Flex>
                        </Td>
                        <Td borderRight="2px">
                          {petDetails.bedInfos?.fasting === true
                            ? "ANIMAL PRECISA DE JEJUM"
                            : "ANIMAL NÃO PRECISA DE JEJUM"}
                        </Td>
                        <Td borderRight="2px">
                          {petDetails &&
                          petDetails.bedInfos &&
                          Object.keys(petDetails.bedInfos).length === 0 &&
                          petDetails.bedInfos.kennelName &&
                          petDetails.bedInfos.kennelName.name
                            ? petDetails.bedInfos.kennelName.name
                            : "Sem Canil"}
                        </Td>
                        <Td borderRight="2px">{formattedDate}</Td>
                        <Td>
                          {petDetails.queue?.vetPreference != ""
                            ? petDetails.queue?.vetPreference
                            : "Sem Preferência"}
                        </Td>
                      </Tr>
                    </Tbody>
                  </Table>
                </TableContainer>

                <Button
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
                </Button>

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
                          bg="yellow.300"
                          w="100%"
                          textAlign="center"
                          py={2}
                          fontWeight="bold"
                        >
                          Tempo Restante até o final da diaría : 20 Horas e 49
                          minutos
                        </Text>
                        <Button
                          py="8"
                          bg="whatsapp.500"
                          fontSize="20"
                          fontWeight="bold"
                          color="white"
                          boxShadow="0px 4px 5px rgba(0, 0, 0, 0.6)"
                          _hover={{
                            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.5)",
                            backgroundColor: "whatsapp.600",
                          }}
                          _active={{
                            boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.2)",
                          }}
                        >
                          Encerrar Diárias
                        </Button>
                      </Flex>
                    </Box>
                  )}

                  {admissiondiary === true && (
                    <Flex direction="column">
                      <Flex>
                        <Text
                          w="12vw"
                          fontWeight="bold"
                          pl="2"
                          bg="blue.100"
                          fontSize="20"
                          height="40px"
                          border="1px solid black"
                        >
                          Data
                        </Text>
                        <Text
                          w="8vw"
                          fontWeight="bold"
                          pl="2"
                          bg="blue.100"
                          fontSize="20"
                          height="40px"
                          border="1px solid black"
                        >
                          Hora
                        </Text>
                        <Text
                          w="25vw"
                          fontWeight="bold"
                          pl="2"
                          bg="blue.100"
                          fontSize="20"
                          height="40px"
                          border="1px solid black"
                        >
                          Usuário
                        </Text>
                        <Text
                          w="9vw"
                          fontWeight="bold"
                          pl="2"
                          bg="blue.100"
                          fontSize="20"
                          height="40px"
                          border="1px solid black"
                        >
                          Quantidade
                        </Text>
                        <Text
                          w="19vw"
                          fontWeight="bold"
                          pl="2"
                          bg="blue.100"
                          fontSize="20"
                          height="40px"
                          border="1px solid black"
                        >
                          Ação
                        </Text>
                        <Text
                          w="12vw"
                          fontWeight="bold"
                          pl="2"
                          bg="blue.100"
                          fontSize="20"
                          height="40px"
                          border="1px solid black"
                        >
                          Unitário
                        </Text>
                        <Text
                          w="15vw"
                          fontWeight="bold"
                          pl="2"
                          bg="blue.100"
                          fontSize="20"
                          height="40px"
                          border="1px solid black"
                        >
                          Total
                        </Text>
                      </Flex>
                      <Flex>
                        <Input
                          type="date"
                          w="12vw"
                          fontWeight="bold"
                          pl="2"
                          bg="white"
                          fontSize="19"
                          height="40px"
                          border="1px solid black"
                          rounded="0"
                        />
                        <Input
                          type="time"
                          w="8vw"
                          fontWeight="bold"
                          pl="2"
                          bg="white"
                          fontSize="19"
                          height="40px"
                          border="1px solid black"
                          rounded="0"
                        />
                        <Input
                          w="25vw"
                          fontWeight="bold"
                          pl="2"
                          bg="white"
                          fontSize="19"
                          height="40px"
                          border="1px solid black"
                          rounded="0"
                        />
                        <Input
                          w="9vw"
                          fontWeight="bold"
                          pl="2"
                          bg="white"
                          fontSize="19"
                          height="40px"
                          border="1px solid black"
                          rounded="0"
                        />
                        <Input
                          w="19vw"
                          fontWeight="bold"
                          pl="2"
                          bg="white"
                          fontSize="19"
                          height="40px"
                          border="1px solid black"
                          rounded="0"
                        />
                        <Input
                          w="12vw"
                          fontWeight="bold"
                          pl="2"
                          bg="white"
                          fontSize="19"
                          height="40px"
                          border="1px solid black"
                          rounded="0"
                        />
                        <Input
                          w="15vw"
                          fontWeight="bold"
                          pl="2"
                          bg="white"
                          fontSize="19"
                          height="40px"
                          border="1px solid black"
                          rounded="0"
                        />
                      </Flex>
                      <Flex align="center" borderY="1px solid black">
                        <Text w="60vw"></Text>
                        <Text w="25vw" fontWeight="bold">
                          Valor total em procedimentos até o momento
                        </Text>
                        <Input
                          borderY="none"
                          w="15vw"
                          borderColor="black"
                          rounded={0}
                        ></Input>
                      </Flex>
                      <Flex align="center" borderY="1px solid black">
                        <Text w="70vw"></Text>
                        <Text w="15vw" fontWeight="bold">
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
                      <Flex align="center" borderY="1px solid black">
                        <Text w="82vw"></Text>
                        <Text w="3vw" fontWeight="bold">
                          Total
                        </Text>
                        <Input
                          borderY={0}
                          w="15vw"
                          borderColor="black"
                          rounded={0}
                        ></Input>
                      </Flex>
                      {totalDaily - 60 >= 60 ? (
                        <Text
                          fontSize="20"
                          bg="yellow.300"
                          w="100%"
                          textAlign="center"
                          py={2}
                          fontWeight="bold"
                          color="red"
                        >
                          Tempo de Tolerância Restante:{" "}
                          {60 - totalDaily < 60 ? "Esgotado" : "Em Tolerancia"}{" "}
                          Minutos
                        </Text>
                      ) : (
                        <Text
                          color="green"
                          fontSize="20"
                          bg="yellow.300"
                          w="100%"
                          textAlign="center"
                          py={2}
                          fontWeight="bold"
                        >
                          Tempo de Tolerância Restante:{" "}
                          {60 - totalDaily < 60 ? "Esgotado" : "Em Tolerancia"}{" "}
                          Minutos
                        </Text>
                      )}
                      <Text
                        fontSize="20"
                        bg="yellow.300"
                        w="100%"
                        textAlign="center"
                        py={2}
                        fontWeight="bold"
                      >
                        Tempo Restante até o final da meia diaría:{" "}
                        {Math.round((720 - totalDaily) / 60)} Horas
                      </Text>
                      <Text
                        fontSize="20"
                        bg="yellow.300"
                        w="100%"
                        textAlign="center"
                        py={2}
                        fontWeight="bold"
                      >
                        Tempo Restante até o final da diaría :{" "}
                        {Math.round((1440 - totalDaily) / 60)} Horas
                      </Text>
                      <Button
                        py="8"
                        bg="whatsapp.500"
                        fontSize="20"
                        fontWeight="bold"
                        color="white"
                        boxShadow="0px 4px 5px rgba(0, 0, 0, 0.6)"
                        _hover={{
                          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.5)",
                          backgroundColor: "whatsapp.600",
                        }}
                        _active={{
                          boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.2)",
                        }}
                        onClick={() => {
                          setAdmissionDiary(false);
                        }}
                      >
                        Encerrar Diárias
                      </Button>
                    </Flex>
                  )}
                </Flex>
              </Flex>
            </Box>
          </Flex>
        </Flex>
      </AdminContainer>
    </ChakraProvider>
  );
}
