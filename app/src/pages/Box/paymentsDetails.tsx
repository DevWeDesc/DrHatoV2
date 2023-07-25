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
  Textarea,
  TableCaption,
  Tfoot,
} from "@chakra-ui/react";

import { Header } from "../../components/admin/Header";

import { AdminContainer } from "../AdminDashboard/style";
import { GenericLink } from "../../components/Sidebars/GenericLink";
import { GenericSidebar } from "../../components/Sidebars/GenericSideBar";
import { PaymentsSearch } from "../../components/Search/paymentsSearch";
import { BiHome, BsCashCoin } from "react-icons/all";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { api } from "../../lib/axios";
import { useNavigate, useParams } from "react-router-dom";

export function BoxPaymentsDetails() {
  const [customers, setCostumers] = useState([]);
  const { id } = useParams<{ id: string }>();
  const [cash, setCash] = useState<number | string>("");
  const navigate = useNavigate();

  async function getCustomers() {
    const response = await api.get(`http://localhost:5000/customers/${id}`);
    setCostumers(response.data);
  }

  useEffect(() => {
    getCustomers();
  }, []);

  console.log(cash);

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
                        <Th fontSize="18" py="8" color="black" bg="blue.100">
                          Dados do Cliente
                        </Th>
                        <Th bg="blue.100"></Th>
                        <Th bg="blue.100"></Th>
                        <Th bg="blue.100"></Th>
                        <Th bg="blue.100"></Th>
                        <Th bg="blue.100"></Th>
                        <Th bg="blue.100"></Th>
                      </Tr>
                      <Tr>
                        <Td fontSize="18" fontWeight="bold" w="10">
                          Cliente
                        </Td>
                        <Td colSpan={2}>
                          <Input bg="white" borderColor="black"></Input>
                        </Td>
                        <Td
                          pl="0"
                          textAlign="end"
                          fontSize="18"
                          fontWeight="bold"
                          w="10"
                        >
                          Endereço
                        </Td>
                        <Td colSpan={2}>
                          <Input bg="white" borderColor="black"></Input>
                        </Td>
                        <Td style={{ width: "0" }}></Td>
                      </Tr>
                      <Tr>
                        <Td fontSize="18" fontWeight="bold">
                          Bairro
                        </Td>
                        <Td colSpan={2}>
                          <Input bg="white" borderColor="black"></Input>
                        </Td>
                        <Td
                          fontSize="18"
                          fontWeight="bold"
                          pl="0"
                          textAlign="end"
                        >
                          CEP
                        </Td>
                        <Td colSpan={2}>
                          <Input bg="white" borderColor="black"></Input>
                        </Td>
                      </Tr>
                      <Tr>
                        <Td fontSize="18" fontWeight="bold">
                          Estado
                        </Td>
                        <Td colSpan={2}>
                          <Input bg="white" borderColor="black"></Input>
                        </Td>
                        <Td
                          fontSize="18"
                          fontWeight="bold"
                          pl="0"
                          textAlign="end"
                        >
                          Telefone
                        </Td>
                        <Td colSpan={2}>
                          <Input bg="white" borderColor="black"></Input>
                        </Td>
                      </Tr>
                      <Tr>
                        <Td fontSize="18" fontWeight="bold">
                          Saldo Atual
                        </Td>
                        <Td colSpan={5}>
                          <Input
                            value={cash}
                            onChange={(e) => setCash(e.target.value)}
                            bg={BgInput(cash)}
                            borderColor="black"
                          ></Input>
                        </Td>
                      </Tr>
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
                      <Tr
                        bg="white"
                        cursor="pointer"
                        onClick={() =>
                          navigate(`/Recepcao/Caixa/PagamentoCliente/${id}`)
                        }
                      >
                        <Td border="1px solid black">25/05/23</Td>
                        <Td border="1px solid black">
                          {" "}
                          Consulta nº 9921, animal :Mel{" "}
                        </Td>
                        <Td
                          border="1px solid black"
                          isNumeric
                          fontWeight="bold"
                        >
                          433,00
                        </Td>
                        <Td border="1px solid black" isNumeric>
                          216,50
                        </Td>
                        <Td border="1px solid black" isNumeric>
                          Master Card 2x
                        </Td>
                        <Td border="1px solid black" isNumeric>
                          -216,50
                        </Td>
                      </Tr>
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
