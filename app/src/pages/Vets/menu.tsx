import {
  Box,
  ChakraProvider,
  Flex,
  Table,
  Tr,
  Td,
  Thead,
  Tbody,
  Th,
  Text,
  Button,
  HStack,
  VStack,
  Checkbox,
  FormLabel,
  Grid,
  TableContainer,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Header } from "../../components/admin/Header";
import { GenericLink } from "../../components/Sidebars/GenericLink";
import { GenericSidebar } from "../../components/Sidebars/GenericSideBar";
import { AiOutlineSearch, BiLeftArrow, BiRightArrow } from "react-icons/all";
import { AdminContainer } from "../AdminDashboard/style";
import { useNavigate } from "react-router-dom";
import { api } from "../../lib/axios";
import { Input } from "../../components/admin/Input";
import { MenuVetSeach } from "../../components/Search/menuVetSeach";

export function MenuVet() {
  const [petName, setPetName] = useState("");
  const [codPet, setCodPet] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [isFinishied, setIsFinishied] = useState(false);
  const [isAddmited, setIsAddmited] = useState(false);
  const [showAllVets, setShowAllVets] = useState(false);
  const [pagination, SetPagination] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [totalInQueue, setTotalInQueue] = useState(0 as any);
  const [petsByVetPreference, setPetsByVetPreference] = useState([]);
  const [petData, setPetData] = useState([] as any);
  const [initialDate, setInitialDate] = useState("");
  const [finalDate, setFinalDate] = useState("");
  const user = JSON.parse(localStorage.getItem("user") as string);

  async function getQueueVetPreference() {
    if (showAllVets === true) {
      const response = await api.get("/pets/queue");
      setTotalInQueue(response.data);
      setPetsByVetPreference(response.data.response);
    } else {
      const response = await api.get(
        `/pets/queue/preference/${user.consultName}`
      );
      setPetsByVetPreference(response.data.response);
    }
  }

  function incrementPage() {
    SetPagination((prevCount) =>
      pagination < numberOfPages ? prevCount + 1 : numberOfPages
    );
  }

  function decrementPage() {
    SetPagination((prevCount) => (pagination > 1 ? prevCount - 1 : 1));
  }

  const navigate = useNavigate();

  async function searchDataVet() {
    switch (true) {
      case petName?.length >= 1:
        await api
          .get(`vetmenusearch/${pagination}?petName=${petName}`)
          .then((res) => {
            setPetData(res.data.data);
            setNumberOfPages(res.data.totalPages);
          });
        break;
      case customerName?.length >= 1:
        await api
          .get(`vetmenusearch/${pagination}?customerName=${customerName}`)
          .then((res) => {
            setPetData(res.data.data);
            setNumberOfPages(res.data.totalPages);
          });
        break;
      case isFinishied === true:
        await api
          .get(`vetmenusearch?/${pagination}isFinished=true`)
          .then((res) => {
            setPetData(res.data);
            console.log(res.data.data);
          });
        break;
      case isAddmited === true:
        await api
          .get(`vetmenusearch/${pagination}?isAddmited=true`)
          .then((res) => {
            setPetData(res.data.data);
          });
        break;
    }
  }

  const handleGetDataWithParams = async () => {
    switch (true) {
      case !!codPet:
        await api.get(`searchcodpet/${codPet}`).then((res) => {
          setPetData(res.data);
        });
        break;
      case isFinishied === true:
        await api
          .get(
            `vetmenusearch/${pagination}?isFinished=true&initialDate=${initialDate}&finalDate=${finalDate}`
          )
          .then((res) => {
            setPetData(res.data.data);
          });
        break;
      case isAddmited === true:
        await api
          .get(
            `vetmenusearch/${pagination}?isAddmited=true&initialDate=${initialDate}&finalDate=${finalDate}`
          )
          .then((res) => {
            setPetData(res.data.data);
          });
        break;
    }
  };

  useEffect(() => {
    getQueueVetPreference();
  }, [showAllVets]);

  useEffect(() => {
    searchDataVet();
  }, [petName, codPet, customerName, isFinishied, isAddmited, pagination]);

  console.log(petData);

  return (
    <ChakraProvider>
      <AdminContainer>
        <Flex direction="column" h="100vh">
          <Header title="Painel Veterinário" url="/Home" />
          <Flex
            w="100%"
            my="6"
            direction={{ base: "column", lg: "row" }}
            maxWidth={1680}
            mx="auto"
            px="6"
          >
            <GenericSidebar>
              <GenericLink
                name="Pesquisar Cliente"
                icon={AiOutlineSearch}
                path="/Vets/Menu"
              />
            </GenericSidebar>
            <Box w="100%" borderRadius={8} bg="gray.200" p="8">
              <Flex mb="8" gap="8" direction="column" align="center">
                <MenuVetSeach
                  setCodPet={(ev) => setCodPet(ev)}
                  setCustomerName={(ev) => setCustomerName(ev)}
                  setFinalDate={(ev) => setFinalDate(ev)}
                  setInitialDate={(ev) => setInitialDate(ev)}
                  setIsAddmited={(ev) => setIsAddmited(ev)}
                  setIsFinishied={(ev) => setIsFinishied(ev)}
                  setPetName={(ev) => setPetName(ev)}
                  setShowAllVets={(ev) => setShowAllVets(ev)}
                  values={{ codPet, customerName, petName }}
                  handleGetDataWithParams={() => handleGetDataWithParams()}
                />
                <Grid
                  templateColumns={{
                    base: "repeat(2, 1fr)",
                    lg: "repeat(5, 1fr)",
                  }}
                  gap={8}
                >
                  <Button
                    whiteSpace="normal"
                    colorScheme="teal"
                    onClick={() => navigate("/Queue")}
                  >
                    <>TOTAL NA FILA: {totalInQueue.totalInQueue}</>
                  </Button>
                  <Button whiteSpace="normal" colorScheme="whatsapp">
                    Total Paginas: {numberOfPages}
                  </Button>
                  <Button whiteSpace="normal" colorScheme="whatsapp">
                    Pagina Atual: {pagination}
                  </Button>
                  <Button
                    whiteSpace="normal"
                    colorScheme="whatsapp"
                    gap={4}
                    onClick={() => decrementPage()}
                  >
                    <BiLeftArrow />
                    Página Anterior
                  </Button>
                  <Button
                    whiteSpace="normal"
                    colorScheme="whatsapp"
                    gap={4}
                    onClick={() => incrementPage()}
                  >
                    Próxima Página
                    <BiRightArrow />
                  </Button>
                </Grid>

                <Flex
                  textAlign="center"
                  h={300}
                  justify="center"
                  overflowY="auto"
                >
                  {petData.length >= 1 ? (
                    <TableContainer>
                      <Table colorScheme="blackAlpha">
                        <Thead>
                          <Tr>
                            <Th>CPF</Th>
                            <Th>Cliente</Th>
                            <Th>Animal</Th>
                            <Th>Cod</Th>
                            <Th>Peso</Th>
                            <Th>Preferência</Th>
                          </Tr>
                        </Thead>

                        <Tbody>
                          {petData?.map((pet: any) => (
                            <Tr
                              key={pet?.id}
                              cursor="pointer"
                              onClick={() =>
                                navigate(
                                  `/Vets/Workspace/${pet?.id}/${
                                    pet.queueId != undefined && pet.queueId
                                      ? pet.queueId
                                      : "Sem consulta aberta"
                                  }`
                                )
                              }
                            >
                              <Td>
                                <Text colorScheme="whatsapp">
                                  {pet?.customer.cpf
                                    ? pet.customer.cpf
                                    : "Não encontrado"}
                                </Text>
                              </Td>

                              <Td>
                                {pet?.customer.name
                                  ? pet.customer.name
                                  : "Não encontrado"}
                              </Td>

                              <Td>{pet?.name ? pet.name : "Não encontrado"}</Td>
                              <Td>
                                {pet?.CodAnimal
                                  ? pet.CodAnimal
                                  : "Não encontrado"}
                              </Td>
                              <Td>{pet?.weigth}</Td>
                              <Td>
                                {" "}
                                {pet.customer.vetPreference == user.consultName
                                  ? pet.vetPreference
                                  : "Sem preferência"}
                              </Td>
                            </Tr>
                          ))}
                        </Tbody>
                      </Table>
                    </TableContainer>
                  ) : (
                    <TableContainer>
                      <Table colorScheme="blackAlpha">
                        <Thead>
                          <Tr>
                            <Th>CPF</Th>
                            <Th>Cliente</Th>
                            <Th>Animal</Th>
                            <Th>Código</Th>
                            <Th>Data</Th>
                            <Th>Preferência</Th>
                            <Th>Especialidade</Th>
                          </Tr>
                        </Thead>

                        <Tbody>
                          {petsByVetPreference
                            .map((pet: any) => (
                              <Tr
                                key={pet.id}
                                cursor="pointer"
                                onClick={() =>
                                  navigate(
                                    `/Vets/Workspace/${pet.id}/${pet.queueId}`
                                  )
                                }
                              >
                                <Td>
                                  <Text colorScheme="whatsapp">
                                    {pet.customerCpf}
                                  </Text>
                                </Td>

                                <Td>{pet.customerName}</Td>

                                <Td
                                  cursor="pointer"
                                  onClick={() =>
                                    navigate(`/Vets/Workspace/${pet.id}`)
                                  }
                                >
                                  {pet.name}
                                </Td>
                                <Td>{pet.codPet}</Td>
                                <Td>
                                  {new Intl.DateTimeFormat("pt-BR", {
                                    month: "2-digit",
                                    day: "2-digit",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  }).format(new Date(pet?.queueEntry))}
                                </Td>

                                <Td>
                                  {pet.vetPreference == user.consultName
                                    ? pet.vetPreference
                                    : pet.vetPreference}
                                </Td>
                                <Td>0</Td>
                              </Tr>
                            ))
                            .reverse()}
                        </Tbody>
                      </Table>
                    </TableContainer>
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
