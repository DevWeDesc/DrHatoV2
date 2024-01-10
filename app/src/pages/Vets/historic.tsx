import {
  Box,
  Button,
  ChakraProvider,
  Checkbox,
  Flex,
  FormLabel,
  HStack,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  VStack,
  Text,
} from "@chakra-ui/react";
import { AdminContainer } from "../AdminDashboard/style";
import { Header } from "../../components/admin/Header";
import { AiOutlineSearch } from "react-icons/ai";
import { GenericLink } from "../../components/Sidebars/GenericLink";
import { GenericSidebar } from "../../components/Sidebars/GenericSideBar";
import { BiHome, BiLeftArrow, BiRightArrow } from "react-icons/bi";
import { Input } from "../../components/admin/Input";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../lib/axios";
import { OldConsults, PetOldConsult } from "../../interfaces";
import { formatDate } from "react-calendar/dist/cjs/shared/dateFormatter";
import { TbArrowBack } from "react-icons/tb";
import { WorkSpaceHeader } from "./styles";

export const Historic = () => {
  const [pagination, SetPagination] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [totalInQueue, setTotalInQueue] = useState(0 as any);
  const [initialDate, setInitialDate] = useState("");
  const [finalDate, setFinalDate] = useState("");

  const [historicPets, setHistoricPets] = useState<OldConsults>(
    {} as OldConsults
  );
  const { id } = useParams();
  const navigate = useNavigate();

  async function getAllConsultsPet() {
    const response = await api.get(`/pet/old/history/consults/${id}`);
    setHistoricPets(response.data.oldConsults);
  }
  console.log(historicPets.petOldConsults);

  function incrementPage() {
    SetPagination((prevCount) =>
      pagination < numberOfPages ? prevCount + 1 : numberOfPages
    );
  }

  function decrementPage() {
    SetPagination((prevCount) => (pagination > 1 ? prevCount - 1 : 1));
  }

  useEffect(() => {
    getAllConsultsPet();
  }, [historicPets]);

  return (
    <ChakraProvider>
      <AdminContainer>
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
                    height={8}
                    colorScheme="whatsapp"
                    onClick={() => navigate(`/WorkSpace/Protocols/${id}`)}
                  >
                    PROTOCOLOS
                  </Button>
                </HStack>
              </VStack>
            </Flex>
          </Flex>
        </WorkSpaceHeader>
        <Flex w="100%" my="6" maxWidth={1680} mx="auto" px="6">
          <Box flex="1" borderRadius={8} bg="gray.200" p="8">
            <Flex mb="8" gap="8" direction="column" align="center">
              <Flex direction="column">
                <Flex align="center" justify="center" gap="8" w="960px">
                  <HStack spacing={8}>
                    <Input
                      name="initialDate"
                      onChange={(ev) => setInitialDate(ev.target.value)}
                      label="data inicial"
                      type="date"
                    />
                    <Input
                      name="finalDate"
                      onChange={(ev) => setFinalDate(ev.target.value)}
                      label="data final"
                      type="date"
                    />
                  </HStack>
                </Flex>
                <Button mt="4" colorScheme="whatsapp">
                  FILTRAR
                </Button>
              </Flex>
              <Flex gap={8}>
                <Button colorScheme="teal" onClick={() => navigate("/Queue")}>
                  <>TOTAL NA FILA: {totalInQueue.totalInQueue}</>
                </Button>
                <Button colorScheme="whatsapp">
                  Total Paginas: {numberOfPages}
                </Button>
                <Button colorScheme="whatsapp">
                  Pagina Atual: {pagination}
                </Button>
                <Button
                  colorScheme="whatsapp"
                  gap={4}
                  onClick={() => decrementPage()}
                >
                  <BiLeftArrow />
                  Página Anterior
                </Button>
                <Button
                  colorScheme="whatsapp"
                  gap={4}
                  onClick={() => incrementPage()}
                >
                  Próxima Página
                  <BiRightArrow />
                </Button>
              </Flex>

              <Flex
                textAlign="center"
                h={300}
                justify="center"
                overflowY="auto"
              >
                {Object.keys(historicPets).length > 0 ? (
                  <Table colorScheme="blackAlpha">
                    <Thead>
                      <Tr>
                        <Th>Tipo de Consulta</Th>
                        <Th>Peso do animal</Th>
                        <Th>Data</Th>
                        <Th>Veterinário</Th>
                        <Th>Cod</Th>
                        <Th>Animal</Th>
                        <Th>Dono do Animal</Th>
                      </Tr>
                    </Thead>

                    <Tbody>
                      {historicPets?.petOldConsults?.map(
                        (consult: PetOldConsult) => (
                          <Tr
                            key={consult.CodAnimal}
                            cursor="pointer"
                            // onClick={() =>
                            //   // navigate(
                            //   //   `/Vets/Workspace/${consult?.id}/${consult.consultUniqueId}`
                            //   // )
                            // }
                          >
                            <Td>{consult.consulType}</Td>
                            <Td>{consult.petWeight}</Td>

                            <Td>
                              {" "}
                              {
                                <Text colorScheme="whatsapp">
                                  {new Intl.DateTimeFormat("pt-BR", {
                                    month: "2-digit",
                                    day: "2-digit",
                                    year: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  }).format(new Date(consult?.date))}
                                </Text>
                              }
                            </Td>

                            <Td>
                              {consult?.vetName
                                ? consult.vetName
                                : "Não encontrado"}
                            </Td>
                            <Td>
                              {consult?.CodAnimal
                                ? consult.CodAnimal
                                : "Não encontrado"}
                            </Td>
                            <Td>{consult?.petName}</Td>
                            <Td>
                              {" "}
                              {consult
                                ? consult.customerName
                                : "Sem preferência"}
                            </Td>
                          </Tr>
                        )
                      )}
                    </Tbody>
                  </Table>
                ) : (
                  <Text fontSize="2xl" fontWeight={"semibold"}>
                    Animal sem histórico de Consultas!!
                  </Text>
                )}
                {/* ) : (
                  <Table colorScheme="blackAlpha">
                    <Thead>
                      <Tr>
                        <Th>Dono</Th>
                        <Th>Animal</Th>
                        <Th>Data</Th>
                        <Th>Horário</Th>
                        <Th>Veterinário</Th>
                        <Th>Cod</Th>
                        <Th>Pago</Th>
                      </Tr>
                    </Thead>

                    <Tbody>
                      {petsByVetPreference
                        .map((pet: any) => (
                          <Tr
                            key={pet.id}
                            cursor="pointer"
                            // onClick={() =>
                            //   // navigate(
                            //   //   ` /Vets/Workspace/${pet.id}/${pet.consultUniqueId}`
                            //   // )
                            // }
                          >
                            <Td>
                              <Text colorScheme="whatsapp">
                                {pet.customerName}
                              </Text>
                            </Td>

                            <Td>{pet.name}</Td>

                            <Td
                              cursor="pointer"
                              onClick={() =>
                                navigate(`/Vets/Workspace/${pet.id}`)
                              }
                            >
                              {new Intl.DateTimeFormat("pt-BR", {
                                month: "2-digit",
                                day: "2-digit",
                                year: "2-digit",
                                hour: "2-digit",
                                minute: "2-digit",
                              }).format(new Date(pet?.queueEntry))}
                            </Td>
                            <Td>
                              {" "}
                              {new Intl.DateTimeFormat("pt-BR", {
                                hour: "2-digit",
                                minute: "2-digit",
                              }).format(new Date(pet?.queueEntry))}
                            </Td>
                            <Td>
                              {pet.vetPreference == user.consultName
                                ? pet.vetPreference
                                : "Sem preferência"}
                            </Td>
                            <Td>{pet.id}</Td>
                            <Td>Sim</Td>
                          </Tr>
                        ))
                        .reverse()}
                    </Tbody>
                  </Table>
                              )} */}
              </Flex>
            </Flex>
          </Box>
        </Flex>
      </AdminContainer>
    </ChakraProvider>
  );
};
