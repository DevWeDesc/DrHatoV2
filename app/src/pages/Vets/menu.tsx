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
import { useState } from "react";
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
  const [pagination, setPagination] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [totalInQueue, setTotalInQueue] = useState(0);
  const [initialDate, setInitialDate] = useState("");
  const [finalDate, setFinalDate] = useState("");
  const user = JSON.parse(localStorage.getItem("user") as string);
  const navigate = useNavigate();
  const [searchBody, setSearchBody] = useState({
    petName: "",
    codPet: "",
    customerName: "",
  });

  const {
    data: PetData,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["queueVets"],
    queryFn: async () => {
      const res = await api.get(
        `/pets/queuevets?isClosed=${isFinishied}&initialDate=${initialDate}&finalDate=${finalDate}&page=${pagination}&isAddmited=${isAddmited}&vetName=${
          showAllVets ? "" : user.consultName
        }&petName=${searchBody.petName}&customerName=${
          searchBody.customerName
        }&petCode=${searchBody.codPet}`
      );
      setTotalInQueue(res.data.totalInQueue);
      setNumberOfPages(res.data.totalPages);
      return res.data.response;
    },
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  function incrementPage() {
    setPagination((prevCount) =>
      pagination < numberOfPages ? prevCount + 1 : numberOfPages
    );
    refetch();
  }

  function decrementPage() {
    setPagination((prevCount) => (pagination > 1 ? prevCount - 1 : 1));
    refetch();
  }

  async function updateQueuePetPreference(queueId: string, petId: number) {
    const data = {
      vetPreference: user.consultName,
      queueId: queueId,
    };
    await api.patch("/queue/vetpreference", data).then(() => {
      navigate(`/Vets/Workspace/${petId}/${queueId}`);
    });
  }

  return (
    <ChakraProvider>
      <AdminContainer>
        <Flex direction="column" h="100vh">
          <Header title="Painel Veterinário" url="/Home" />
          <Flex w="100%" my="6" maxWidth={1680} mx="auto" px="6">
            <Box flex="1" borderRadius={8} minH={700} bg="gray.200" p="8">
              <Flex gap="8" direction="column">
                <Flex alignItems={"end"}>
                  <Flex direction="column" width={"full"}>
                    <Flex align="center" gap="8">
                      <HStack spacing={8}>
                        <Input
                          name="initialDate"
                          onChange={(ev) => setInitialDate(ev.target.value)}
                          label="Data Inicial"
                          type="date"
                          defaultValue={
                            new Date(
                              new Date().setMonth(new Date().getMonth() - 2)
                            )
                              .toISOString()
                              .split("T")[0]
                          }
                        />
                        <Input
                          name="finalDate"
                          onChange={(ev) => setFinalDate(ev.target.value)}
                          label="Data Final"
                          type="date"
                          defaultValue={new Date().toISOString().split("T")[0]}
                        />
                        <HStack align="center">
                          <VStack>
                            <FormLabel>Finalizados</FormLabel>
                            <Checkbox
                              onChange={(ev) =>
                                setIsFinishied(ev.target.checked)
                              }
                              border="2px"
                              size="lg"
                            />
                          </VStack>

                          <VStack>
                            <FormLabel>Internados</FormLabel>
                            <Checkbox
                              onChange={(ev) =>
                                setIsAddmited(ev.target.checked)
                              }
                              border="2px"
                              size="lg"
                            />
                          </VStack>

                          <VStack w={160}>
                            <FormLabel whiteSpace={"nowrap"}>
                              Todos Veterinários
                            </FormLabel>
                            <Checkbox
                              onChange={(ev) => {
                                setShowAllVets(ev.target.checked);
                              }}
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
                        type="number"
                        value={searchBody?.codPet}
                        onChange={(ev) =>
                          setSearchBody({
                            ...searchBody,
                            codPet: ev.target.value,
                          })
                        }
                        label="Código do Animal"
                      />
                      <Input
                        name="petName"
                        value={searchBody?.petName}
                        onChange={(ev) =>
                          setSearchBody({
                            ...searchBody,
                            petName: ev.target.value,
                          })
                        }
                        label="Nome do Animal"
                      />
                      <Input
                        name="customerName"
                        value={searchBody?.customerName}
                        onChange={(ev) =>
                          setSearchBody({
                            ...searchBody,
                            customerName: ev.target.value,
                          })
                        }
                        label="Nome do Cliente"
                      />
                    </HStack>
                  </Flex>
                  <Button
                    onClick={() => refetch()}
                    w={200}
                    p={5}
                    ml={8}
                    colorScheme="whatsapp"
                  >
                    FILTRAR
                  </Button>
                </Flex>
                <Flex>
                  <Flex width={"full"} bg={"gray.300"} py={2} px={2} gap={2}>
                    <Flex fontWeight={"bold"}>Usuário:</Flex>
                    <span>{user.consultName}</span>
                  </Flex>
                </Flex>
                <Flex
                  textAlign="center"
                  maxH={400}
                  justify="center"
                  overflowY="auto"
                >
                  <Table colorScheme="blackAlpha">
                    <Thead>
                      <Tr>
                        <Th border="1px">Tipo</Th>
                        <Th border="1px">Cliente</Th>
                        <Th border="1px">Animal</Th>
                        <Th border="1px">Código</Th>
                        <Th border="1px">Data</Th>
                        <Th border="1px">Hora</Th>
                        <Th border="1px">Preferência</Th>
                        <Th border="1px">Preferência Original</Th>
                        <Th border="1px">Especialidade</Th>
                      </Tr>
                    </Thead>

                    <Tbody>
                      {PetData.map((pet: any, index: number) => (
                        <Tr
                          onClick={() =>
                            navigate(`/Vets/Workspace/${pet.id}/${pet.queueId}`)
                          }
                          _hover={{ bg: "gray.300" }}
                          color={pet.petAdmitted ? "red.500" : "black"}
                          key={`${pet.id}-${index}`}
                          cursor="pointer"
                        >
                          <Td border="1px">
                            <Text colorScheme="whatsapp">{pet.queryType}</Text>
                          </Td>
                          <Td border="1px">{pet.customerName}</Td>

                          <Td
                            border="1px"
                            cursor="pointer"
                            onClick={() =>
                              navigate(`/Vets/Workspace/${pet.id}`)
                            }
                          >
                            {pet.name}
                          </Td>
                          <Td border="1px">{pet.codPet}</Td>
                          <Td border="1px">
                            {new Intl.DateTimeFormat("pt-BR", {
                              year: "2-digit",
                              month: "2-digit",
                              day: "2-digit",
                            }).format(new Date(pet?.queueEntry))}
                          </Td>
                          <Td border="1px">
                            {new Intl.DateTimeFormat("pt-BR", {
                              hour: "2-digit",
                              minute: "2-digit",
                            }).format(new Date(pet?.queueEntry))}
                          </Td>

                          {pet.vetPreference == "Sem preferência" ? (
                            <Td border="1px">Sem preferência</Td>
                          ) : (
                            <Td border="1px">
                              {pet.vetPreference == user.consultName
                                ? pet.vetPreference
                                : pet.vetPreference}
                            </Td>
                          )}
                          <Td border="1px">{pet.vetPreferenceOriginal}</Td>
                          <Td border="1px">0</Td>
                        </Tr>
                      )).reverse()}
                    </Tbody>
                  </Table>
                </Flex>
                <Flex direction={"column"} alignItems={"center"} gap={4}>
                  <Flex w={"full"} justifyContent={"center"} gap={4}>
                    <Button
                      colorScheme="whatsapp"
                      gap={4}
                      onClick={() => decrementPage()}
                    >
                      <BiLeftArrow />
                      Página Anterior
                    </Button>
                    <Flex
                      w={10}
                      alignItems={"center"}
                      justifyContent={"center"}
                      h={10}
                      color={"white"}
                      fontWeight={"bold"}
                      rounded={"full"}
                      bg={"whatsapp.500"}
                    >
                      {pagination}
                    </Flex>
                    <Button
                      colorScheme="whatsapp"
                      gap={4}
                      onClick={() => incrementPage()}
                    >
                      Próxima Página
                      <BiRightArrow />
                    </Button>
                  </Flex>
                  <Flex color={"whatsapp.500"} fontWeight={"bold"}>
                    Total Paginas: {numberOfPages}
                  </Flex>
                </Flex>
              </Flex>
            </Box>
          </Flex>
        </Flex>
      </AdminContainer>
    </ChakraProvider>
  );
}
