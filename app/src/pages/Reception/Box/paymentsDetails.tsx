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
  Button,
  TableContainer,
  Input,
} from "@chakra-ui/react";
import { Header } from "../../../components/admin/Header";
import { AdminContainer } from "../../AdminDashboard/style";
import { GenericLink } from "../../../components/Sidebars/GenericLink";
import { GenericSidebar } from "../../../components/Sidebars/GenericSideBar";
import { BiHome, BsCashCoin } from "react-icons/all";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { api } from "../../../lib/axios";
import { useNavigate, useParams } from "react-router-dom";

export function BoxPaymentsDetails() {
  const [client, setClient] = useState([]);
  const { id } = useParams<{ id: string }>();
  const [cash, setCash] = useState<number | string>("");
  const navigate = useNavigate();

  // async function getCustomers() {
  //   const response = await api.get(`http://localhost:5000/customers/${id}`);
  //   setCostumers(response.data);
  // }
  const clientes = [
    {
      id: 1,
      name: "Junior Ferreira Campos",
      animal: "Mel",
      date: "24/07/23",
      our: "10:04",
      balance: "-90,00",
      state: "Campinas",
      cep: "13051-207",
      bairro: "Jardim Santa Cruz",
      adress: "Avenida Maria Clara Machado",
      phone: "(11) 98379-0437",
    },
    {
      id: 2,
      name: "Junior Ferreira Campos Teste 2",
      animal: "Mel",
      date: "24/07/23",
      our: "10:04",
      balance: "-90,00",
      state: "Campinas",
      cep: "13051-207",
      bairro: "Jardim Santa Cruz",
      adress: "Avenida Maria Clara Machado",
      phone: "(11) 98379-0437",
    },
  ];

  const launch = [
    {
      date: "25/05/23",
      description: "Consulta nº 9921, animal :Mel",
      debt: "433,00",
      credit: "",
      type: "-",
      balance: "-433,00",
    },
    {
      date: "25/05/23",
      description: "Pagamento recebido. Caixa :803",
      debt: "",
      credit: "216,50",
      type: "Master Card 2x",
      balance: "-216,50",
    },
    {
      date: "25/05/23",
      description: "Pagamento recebido. Caixa :803",
      debt: "",
      credit: "216,50",
      type: "Master Card 2x",
      balance: "0,00",
    },
  ];

  useEffect(() => {
    const clientesFilter: any = clientes.filter((user: any) => user.id == id);
    setClient(clientesFilter);
  }, []);

  function BgInput(cash: string | number) {
    if (cash === "") {
      return "white";
    } else if (cash >= 0) {
      return "green.100";
    } else if (cash < 0) {
      return "red.100";
    } else {
      return "white";
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <ChakraProvider>
        <AdminContainer>
          <Flex direction="column" h="100vh">
            <Header title="Painel de Conta Corrente" />
            <Flex w="100%" my="6" maxWidth={1680} mx="auto" px="6">
              <GenericSidebar>
                <GenericLink
                  name="Painel de Pagamentos"
                  icon={BsCashCoin}
                  path="/Recepcao/Caixa/Pagamentos"
                />
                <GenericLink name="Home" icon={BiHome} path={`/Home/`} />
              </GenericSidebar>
              <Box flex="1" borderRadius={8} bg="gray.200" p="8">
                <TableContainer>
                  <Table variant="simple">
                    <Thead>
                      <Tr>
                        <Th fontSize="18" py="8" color="black" bg="blue.100">
                          Pesquisa e filtragem
                        </Th>
                        <Th bg="blue.100"></Th>
                        <Th bg="blue.100"></Th>
                        <Th bg="blue.100"></Th>
                        <Th bg="blue.100"></Th>
                        <Th bg="blue.100"></Th>
                        <Th bg="blue.100"></Th>
                      </Tr>
                      <Tr>
                        <Th fontSize="18" color="black">
                          Data Inicial
                        </Th>
                        <Th>
                          <Input
                            w="300px"
                            bg="white"
                            borderColor="black"
                            type="date"
                          />
                        </Th>
                        <Th fontSize="18" color="black">
                          Data Final
                        </Th>
                        <Th colSpan={2}>
                          <Input
                            w="300px"
                            bg="white"
                            borderColor="black"
                            type="date"
                          />
                        </Th>
                        <Th>
                          <Button size="lg" colorScheme="twitter">
                            Filtrar
                          </Button>
                        </Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      <Tr>
                        <Th
                          fontSize="18"
                          py="8"
                          color="black"
                          bg="blue.100"
                          borderBottom="1px solid black"
                        >
                          Dados do Cliente
                        </Th>
                        <Th bg="blue.100" borderBottom="1px solid black"></Th>
                        <Th bg="blue.100" borderBottom="1px solid black"></Th>
                        <Th bg="blue.100" borderBottom="1px solid black"></Th>
                        <Th bg="blue.100" borderBottom="1px solid black"></Th>
                        <Th bg="blue.100" borderBottom="1px solid black"></Th>
                        <Th bg="blue.100" borderBottom="1px solid black"></Th>
                      </Tr>
                      {client.map((user: any) => (
                        <>
                          <Tr border="1px solid black">
                            <Td
                              fontSize="18"
                              p="0"
                              pl="5"
                              fontWeight="bold"
                              w="10"
                              borderColor="black"
                            >
                              Cliente
                            </Td>
                            <Td colSpan={2} py="0" borderColor="black">
                              <Input
                                borderTop="1px solid black"
                                borderRight="2px solid black"
                                borderLeft="2px solid black"
                                borderBottom="0"
                                bg="white"
                                borderColor="black"
                                rounded="0"
                                value={user.name}
                              />
                            </Td>
                            <Td
                              pl="0"
                              textAlign="end"
                              fontSize="18"
                              fontWeight="bold"
                              w="10"
                              py="0"
                              borderColor="black"
                            >
                              Endereço
                            </Td>
                            <Td colSpan={3} py="0" borderColor="black" pr="0">
                              <Input
                                borderTop="1px solid black"
                                borderLeft="2px solid black"
                                borderBottom="0"
                                bg="white"
                                borderColor="black"
                                w="100%"
                                rounded="0"
                                value={user.adress}
                              />
                            </Td>
                          </Tr>
                          <Tr border="1px solid black">
                            <Td
                              borderColor="black"
                              fontSize="18"
                              py="0"
                              pl="5"
                              fontWeight="bold"
                            >
                              Bairro
                            </Td>
                            <Td colSpan={2} py="0" borderColor="black">
                              <Input
                                borderRight="2px solid black"
                                borderLeft="2px solid black"
                                borderBottom="0"
                                bg="white"
                                borderColor="black"
                                rounded="0"
                                value={user.bairro}
                              />
                            </Td>
                            <Td
                              py="0"
                              fontSize="18"
                              fontWeight="bold"
                              pl="0"
                              textAlign="end"
                              borderColor="black"
                            >
                              CEP
                            </Td>
                            <Td colSpan={3} pr="0" py="0" borderColor="black">
                              <Input
                                borderLeft="2px solid black"
                                borderBottom="0"
                                bg="white"
                                borderColor="black"
                                rounded="0"
                                value={user.cep}
                              />
                            </Td>
                          </Tr>
                          <Tr border="1px solid black">
                            <Td
                              py="0"
                              fontSize="18"
                              pl="5"
                              fontWeight="bold"
                              borderColor="black"
                            >
                              Estado
                            </Td>
                            <Td colSpan={2} py="0" borderColor="black">
                              <Input
                                borderRight="2px solid black"
                                borderLeft="2px solid black"
                                borderBottom="0"
                                bg="white"
                                borderColor="black"
                                rounded="0"
                                value={user.state}
                              />
                            </Td>
                            <Td
                              fontSize="18"
                              fontWeight="bold"
                              py="0"
                              pl="0"
                              textAlign="end"
                              borderColor="black"
                            >
                              Telefone
                            </Td>
                            <Td colSpan={3} py="0" borderColor="black" pr="0">
                              <Input
                                borderLeft="2px solid black"
                                borderBottom="0"
                                bg="white"
                                borderColor="black"
                                rounded="0"
                                value={user.phone}
                              />
                            </Td>
                          </Tr>
                          <Tr border="1px solid black">
                            <Td
                              fontSize="18"
                              py="0"
                              pl="5"
                              fontWeight="bold"
                              borderColor="black"
                            >
                              Saldo Atual
                            </Td>
                            <Td colSpan={6} py="0" borderColor="black" pr="0">
                              <Input
                                borderLeft="2px solid black"
                                borderBottom="1px solid black"
                                onClick={() => console.log(user.balance)}
                                //onChange={() => setCash(user.balance)}
                                bg={BgInput(parseInt(user.balance))}
                                borderColor="black"
                                rounded="0"
                                value={user.balance}
                              />
                            </Td>
                          </Tr>
                        </>
                      ))}

                      <Tr>
                        <Td p="0" py="4" colSpan={8}>
                          <Button
                            py="8"
                            w="100%"
                            colorScheme="facebook"
                            onClick={() =>
                              navigate(`/Recepcao/Caixa/NovoPagamento/${id}`)
                            }
                          >
                            Novo Pagamento
                          </Button>
                        </Td>
                      </Tr>
                    </Tbody>
                  </Table>
                </TableContainer>
                <TableContainer>
                  <Table variant="simple">
                    <Thead>
                      <Tr>
                        <Th
                          fontSize="18"
                          py="8"
                          color="black"
                          mb="40"
                          bg="blue.100"
                          borderBottom="1px solid black"
                        >
                          Exibindo todos os lançamentos
                        </Th>
                        <Th bg="blue.100" borderBottom="1px solid black"></Th>
                        <Th bg="blue.100" borderBottom="1px solid black"></Th>
                        <Th bg="blue.100" borderBottom="1px solid black"></Th>
                        <Th bg="blue.100" borderBottom="1px solid black"></Th>
                        <Th bg="blue.100" borderBottom="1px solid black"></Th>
                      </Tr>
                      <Tr border="1px solid black" bg="blue.400">
                        <Th
                          border="1px solid black"
                          fontSize="18"
                          color="white"
                        >
                          Data
                        </Th>
                        <Th
                          border="1px solid black"
                          fontSize="18"
                          color="white"
                        >
                          Descrição
                        </Th>
                        <Th
                          border="1px solid black"
                          fontSize="18"
                          isNumeric
                          color="white"
                        >
                          Débito
                        </Th>
                        <Th
                          border="1px solid black"
                          fontSize="18"
                          isNumeric
                          color="white"
                        >
                          Crédito
                        </Th>
                        <Th
                          border="1px solid black"
                          fontSize="18"
                          color="white"
                        >
                          Tipo
                        </Th>
                        <Th
                          border="1px solid black"
                          fontSize="18"
                          isNumeric
                          color="white"
                        >
                          Saldo
                        </Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {launch.map((lanc: any) => (
                        <Tr
                          bg="white"
                          cursor="pointer"
                          onClick={() =>
                            navigate(`/Recepcao/Caixa/PagamentoCliente/${id}`)
                          }
                        >
                          <Td border="1px solid black">{lanc.date}</Td>
                          <Td border="1px solid black">{lanc.description}</Td>
                          <Td
                            border="1px solid black"
                            isNumeric
                            fontWeight="bold"
                            bg={lanc.debt <= 0 ? "green.100" : "red.100"}
                          >
                            {lanc.debt}
                          </Td>
                          <Td
                            border="1px solid black"
                            bg={BgInput(parseInt(lanc.credit))}
                          >
                            {lanc.credit}
                          </Td>
                          <Td border="1px solid black">{lanc.type}</Td>
                          <Td
                            border="1px solid black"
                            bg={BgInput(parseInt(lanc.balance))}
                          >
                            {lanc.balance}
                          </Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </TableContainer>
                <Button w="100%" py="8" colorScheme="whatsapp">
                  Gravar
                </Button>
              </Box>
            </Flex>
          </Flex>
        </AdminContainer>
      </ChakraProvider>
    </motion.div>
  );
}
