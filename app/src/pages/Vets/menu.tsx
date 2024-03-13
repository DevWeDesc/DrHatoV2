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
import { useQuery } from "react-query";
import { LoadingSpinner } from "../../components/Loading";

export function MenuVet() {
  const [isFinishied, setIsFinishied] = useState(false);
  const [isAddmited, setIsAddmited] = useState(false);
  const [showAllVets, setShowAllVets] = useState(false);
  const [pagination, SetPagination] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [totalInQueue, setTotalInQueue] = useState(0);
  const [petsByVetPreference, setPetsByVetPreference] = useState([]);
  const [petData, setPetData] = useState([] as any);
  const [initialDate, setInitialDate] = useState("");
  const [finalDate, setFinalDate] = useState("");
  const user = JSON.parse(localStorage.getItem("user") as string);
  const navigate = useNavigate();
  const [searchBody, setSearchBody] = useState({
    petName: "",
    codPet: "",
    customerName: ""
  })


  async function getDefaultQueue() {
    const response = await api.get(
      `/pets/queue/preference/${user.consultName}`
    );
    setPetsByVetPreference(response.data.response);
  }

  const {isLoading} = useQuery('queueVets', getDefaultQueue)

  if(isLoading) {
    return <LoadingSpinner/>
  }
  
  async function getQueueVetPreference() {
      const response = await api.get("/pets/queue");
      setPetData([])
      setTotalInQueue(response.data.totalInQueue);
      setPetsByVetPreference(response.data.response);
  }


  async function searchDataVet() {
    const data = {
      page: pagination,
      petCode: searchBody.codPet,
      customerName: searchBody.customerName,
      petName: searchBody.petName,
      isFinished: isFinishied,
      isAddmited: isAddmited,
      initialDate: initialDate,
      finalDate: finalDate
    }
    const response = await api.post("/engine/veterinary", data)
    setPetData(response.data.data);
    
    setNumberOfPages(response.data.totalPages);   
  }



  function incrementPage() {
    SetPagination((prevCount) => pagination < numberOfPages ? prevCount + 1 : numberOfPages );
    searchDataVet()
  }

  function decrementPage() {
    SetPagination((prevCount) => (pagination > 1 ? prevCount - 1 : 1));
    searchDataVet()
  }



  // useEffect(() => {
  //   if(showAllVets === true) {
  //     getQueueVetPreference();
  //   }
  // }, [showAllVets]);



  return (
    <ChakraProvider>
      <AdminContainer>
        <Flex direction="column" h="100vh">
          <Header title="Painel Veterinário" url="/Home" />
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
                      <HStack align="center">
                        <VStack>
                          <FormLabel>Finalizados</FormLabel>
                          <Checkbox
                            onChange={(ev) =>
                              ev.target.checked === true
                                ? setIsFinishied(true)
                                : setIsFinishied(false)
                            }
                            border="2px"
                            size="lg"
                          />
                        </VStack>

                        <VStack>
                          <FormLabel>Internados</FormLabel>
                          <Checkbox
                            onChange={(ev) =>
                              ev.target.checked === true
                                ? setIsAddmited(true)
                                : setIsAddmited(false)
                            }
                            border="2px"
                            size="lg"
                          />
                        </VStack>

                        <VStack w={160}>
                          <FormLabel>Todos Veterinários</FormLabel>
                          <Checkbox
                            onChange={(ev) => 
                            {  
                              setShowAllVets(ev.target.checked)
                              getQueueVetPreference()
                            }
                            
                            }
                      
                            border="2px"
                            size="lg"
                          />
                        </VStack>
                      </HStack>
                    </HStack>
                  </Flex>

                  <HStack mt="4" w="100%">
                    <Input
                      name="codPet"
                      value={searchBody?.codPet}
                      onChange={(ev) => setSearchBody({
                        customerName: '',
                        codPet: ev.target.value,
                        petName: '',
                      })}
                      label="Código do Animal"
                    />
                    <Input
                      name="petName"
                      value={searchBody?.petName}
                      onChange={(ev) => setSearchBody({
                        customerName: '',
                        codPet: '',
                        petName: ev.target.value,
                      })}
                      label="Nome do Animal"
                    />
                    <Input
                      name="customerName"
                      value={searchBody?.customerName}
                      onChange={(ev) => setSearchBody({
                        customerName: ev.target.value,
                        codPet: '',
                        petName: ''
                      })}
                      label="Nome do Cliente"
                    />
                  </HStack>
                  <Button
                    isDisabled={showAllVets}
                    onClick={() => searchDataVet()}
                    mt="4"
                    colorScheme="whatsapp"
                  >
                    FILTRAR
                  </Button>
                </Flex>
                <Flex gap={8}>
                  <Button colorScheme="teal" onClick={() => navigate("/Queue")}>
                    <>TOTAL NA FILA: {totalInQueue}</>
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
                                {pet?.customer?.cpf
                                  ? pet?.customer?.cpf
                                  : "Não encontrado"}
                              </Text>
                            </Td>

                            <Td>
                              {pet?.customer?.name
                                ? pet?.customer?.name
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
                              {pet?.customer?.vetPreference == user?.consultName
                                ? pet?.vetPreference
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
