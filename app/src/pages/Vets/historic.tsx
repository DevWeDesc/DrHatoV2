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
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";
import { Input } from "../../components/admin/Input";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../lib/axios";

export const Historic = () => {
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

  return (
    <ChakraProvider>
      <AdminContainer>
        <Header title="Painel Administrativo" url="/vets/Menu" />
        <Flex w="100%" my="6" maxWidth={1680} mx="auto" px="6">
          <GenericSidebar>
            <GenericLink
              name="Pesquisar Cliente"
              icon={AiOutlineSearch}
              path="/Vets/Menu"
            />
          </GenericSidebar>
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
                <Button
                  onClick={handleGetDataWithParams}
                  mt="4"
                  colorScheme="whatsapp"
                >
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
                {petData.length >= 1 ? (
                  <Table colorScheme="blackAlpha">
                    <Thead>
                      <Tr>
                        <Th>Data</Th>
                        <Th>Horário</Th>
                        <Th>Veterinário</Th>
                        <Th>Cod</Th>
                        <Th>Animal</Th>
                        <Th>Pago</Th>
                      </Tr>
                    </Thead>

                    <Tbody>
                      {petData?.map((pet: any) => (
                        <Tr
                          key={pet?.id}
                          cursor="pointer"
                          onClick={() =>
                            navigate(
                              `/Vets/Workspace/${pet?.id}/${pet.consultUniqueId}`
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
                            {pet?.CodAnimal ? pet.CodAnimal : "Não encontrado"}
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
                ) : (
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
                            onClick={() =>
                              navigate(
                                ` /Vets/Workspace/${pet.id}/${pet.consultUniqueId}`
                              )
                            }
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
                )}
              </Flex>
            </Flex>
          </Box>
        </Flex>
      </AdminContainer>
    </ChakraProvider>
  );
};
