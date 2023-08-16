import {
  Box,
  ChakraProvider,
  Flex,
  Table,
  Tr,
  Thead,
  Tbody,
  Th,
  Button,
  TableContainer,
  Input,
  Td,
} from "@chakra-ui/react";
import { Header } from "../../../components/admin/Header";
import { AdminContainer } from "../../AdminDashboard/style";
import { GenericLink } from "../../../components/Sidebars/GenericLink";
import { GenericSidebar } from "../../../components/Sidebars/GenericSideBar";
import { BiHome, BsCashCoin } from "react-icons/all";
import { useEffect, useState } from "react";
import { api } from "../../../lib/axios";
import { useNavigate, useParams } from "react-router-dom";
import { BsReception4 } from "react-icons/bs";
import { BiCalendarPlus, AiFillEdit } from "react-icons/all";
import { ICustomer } from "../../../interfaces";

export function BoxPaymentsDetails() {
  const [client, setClient] = useState({} as ICustomer);
  const [launchClient, setLaunchClient] = useState([]);
  const [cash, setCash] = useState("");
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // async function getCustomers() {
  //   const response = await api.get(`http://localhost:5000/customers/${id}`);
  //   setCostumers(response.data);
  // }
  async function getCustomers() {
    const customer = await api.get(`/customers/${id}`);
    setClient(customer.data);
  }
  useEffect(() => {
    getCustomers();
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
    <ChakraProvider>
      <AdminContainer>
        <Flex direction="column" h="100vh">
          <Header
            title="Painel de Conta Corrente"
            url="/Recepcao/Caixa/Pagamentos/"
          />
          <Flex w="100%" my="6" maxWidth={1580} mx="auto" px="6">
            <GenericSidebar>
              <GenericLink
                name="Recepção"
                icon={BsReception4}
                path={`/Recepcao/`}
              />
              <GenericLink
                name="Painel de Pagamentos"
                icon={BsCashCoin}
                path={`/Recepcao/Caixa/Pagamentos`}
              />
              <GenericLink
                name="Caixa"
                icon={BiCalendarPlus}
                path={`/Recepcao/Caixa`}
              />
              <GenericLink
                name="Devoluções"
                icon={AiFillEdit}
                path={`/Recepcao/Caixa/Returns`}
              />
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
                            value={client.name}
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
                            value={client.adress}
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
                            value={client.neighbour}
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
                            borderRight="2px solid black"
                            borderLeft="2px solid black"
                            borderBottom="0"
                            bg="white"
                            borderColor="black"
                            rounded="0"
                            value={client.cep === null ? "Sem CEP" : client.cep}
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
                            value={client.district}
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
                            value={client.phone}
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
                            onClick={() => console.log(client.balance)}
                            onChange={() => setCash("0")}
                            bg={BgInput(parseInt("0"))}
                            borderColor="black"
                            rounded="0"
                            value={client.balance}
                          />
                        </Td>
                      </Tr>
                    </>

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
                      <Th bg="blue.100" borderBottom="1px solid black"></Th>
                    </Tr>
                    <Tr border="1px solid black" bg="blue.400">
                      <Th border="1px solid black" fontSize="18" color="white">
                        Data
                      </Th>
                      <Th border="1px solid black" fontSize="18" color="white">
                        Caixa
                      </Th>
                      <Th border="1px solid black" fontSize="18" color="white">
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
                      <Th border="1px solid black" fontSize="18" color="white">
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
                    {launchClient.map((lanc: any) => (
                      <Tr
                        bg="white"
                        cursor="pointer"
                        onClick={() =>
                          navigate(`/Recepcao/Caixa/PagamentoCliente/${id}`)
                        }
                      >
                        <Td border="1px solid black">{lanc.date}</Td>
                        <Td
                          border="1px solid black"
                          isNumeric
                          fontWeight="bold"
                        >
                          Indefinido
                        </Td>
                        <Td border="1px solid black">{lanc.description}</Td>
                        <Td
                          border="1px solid black"
                          isNumeric
                          fontWeight="bold"
                          bg={lanc.debt <= 0 ? "green.100" : "red.100"}
                        >
                          {lanc.debt === "" ? "0.00" : lanc.debt}
                        </Td>
                        <Td
                          border="1px solid black"
                          bg={BgInput(
                            parseInt(lanc.credit === "" ? "0.00" : lanc.credit)
                          )}
                        >
                          {lanc.credit === "" ? "0.00" : lanc.credit}
                        </Td>
                        <Td border="1px solid black">{lanc.type}</Td>
                        <Td
                          border="1px solid black"
                          bg={BgInput(
                            parseInt(lanc.debt === "" ? 0 : lanc.debt) -
                              parseInt(lanc.credit === "" ? 0 : lanc.credit)
                          )}
                        >
                          {parseInt(lanc.debt === "" ? 0 : lanc.debt) -
                            parseInt(lanc.credit === "" ? 0 : lanc.credit)}
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
  );
}
