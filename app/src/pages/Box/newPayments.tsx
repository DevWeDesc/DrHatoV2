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
  Select,
  TableCaption,
} from "@chakra-ui/react";

import { Header } from "../../components/admin/Header";

import { AdminContainer } from "../AdminDashboard/style";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { api } from "../../lib/axios";
import { useParams } from "react-router-dom";
import { GenericSidebar } from "../../components/Sidebars/GenericSideBar";
import { GenericLink } from "../../components/Sidebars/GenericLink";
import { AiOutlineSearch } from "react-icons/ai";
import { GiCardDiscard } from "react-icons/gi";
import { BsCashCoin } from "react-icons/bs";

export function BoxNewPayments() {
  const [customers, setCostumers] = useState([]);
  const { id } = useParams<{ id: string }>();
  const [cash, setCash] = useState<number | string>("");

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
          <Flex direction="column" h="100vh" maxWidth={1680}>
            <Header title=" Conta Corrente - Novo Lançamento" />
            <Flex w="100%" my="6" maxWidth={1680} mx="auto" px="6">
              <GenericSidebar>
                <GenericLink
                  name="Painel de Pagamentos"
                  icon={BsCashCoin}
                  path="/Recepcao/Caixa/Pagamentos"
                />
                <GenericLink
                  name="Painel de conta Corrente"
                  icon={GiCardDiscard}
                  path={`/Recepcao/Caixa/Pagamentos/${id}`}
                />
              </GenericSidebar>
              <Box flex="1" borderRadius={8} bg="gray.200" p="8">
                <TableContainer>
                  <Table variant="simple">
                    <Thead>
                      <Tr>
                        <Th
                          fontSize="18"
                          py="8"
                          color="white"
                          bg="blue.800"
                          roundedTopStart="8px"
                        >
                          Conta Corrente - Novo Lançamento
                        </Th>
                        <Th bg="blue.800"></Th>
                        <Th bg="blue.800"></Th>
                        <Th bg="blue.800"></Th>
                        <Th bg="blue.800"></Th>
                        <Th bg="blue.800"></Th>
                        <Th bg="blue.800" roundedTopEnd="8px"></Th>
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
                      <Tr border="1px solid black">
                        <Td
                          borderBottom="2px solid black"
                          fontSize="18"
                          fontWeight="bold"
                          w="10"
                          p="0"
                          pl="5"
                        >
                          Nome do Cliente
                        </Td>
                        <Td borderBottom="1px solid black" colSpan={6} p="0">
                          <Input
                            borderLeft="2px solid black"
                            h="12"
                            rounded="0"
                            bg="white"
                            borderColor="black"
                          ></Input>
                        </Td>
                      </Tr>
                      <Tr border="1px solid black">
                        <Td
                          borderBottom="2px solid black"
                          fontSize="18"
                          fontWeight="bold"
                          p="0"
                          pl="5"
                        >
                          Endereço
                        </Td>
                        <Td borderBottom="1px solid black" colSpan={6} p="0">
                          <Input
                            borderLeft="2px solid black"
                            h="12"
                            rounded="0"
                            bg="white"
                            borderColor="black"
                          ></Input>
                        </Td>
                      </Tr>
                      <Tr border="1px solid black">
                        <Td
                          p="0"
                          pl="5"
                          borderBottom="2px solid black"
                          fontSize="18"
                          fontWeight="bold"
                          textAlign="start"
                        >
                          Telefone / Celular
                        </Td>
                        <Td borderBottom="1px solid black" colSpan={6} p="0">
                          <Input
                            borderLeft="2px solid black"
                            h="12"
                            rounded="0"
                            bg="white"
                            borderColor="black"
                          ></Input>
                        </Td>
                      </Tr>
                      <Tr border="1px solid black">
                        <Td
                          p="0"
                          pl="5"
                          borderBottom="2px solid black"
                          fontSize="18"
                          fontWeight="bold"
                          textAlign="start"
                        >
                          Saldo Atual
                        </Td>
                        <Td borderBottom="1px solid black" colSpan={6} p="0">
                          <Input
                            borderLeft="2px solid black"
                            h="12"
                            rounded="0"
                            bg="white"
                            borderColor="black"
                          ></Input>
                        </Td>
                      </Tr>
                      <Tr border="1px solid black">
                        <Td
                          p="0"
                          py="8"
                          bg="blue.700"
                          fontSize="20"
                          fontWeight="bold"
                          color="white"
                          textAlign="center"
                          colSpan={8}
                        >
                          Para Iniciar um lançamento, selecione o tipo de
                          pagamento
                        </Td>
                      </Tr>
                    </Tbody>
                  </Table>
                </TableContainer>
                <TableContainer>
                  <Table variant="simple">
                    <Tbody>
                      <Tr>
                        <Td px="0">
                          {" "}
                          <Select
                            bg="white"
                            borderColor="black"
                            w=""
                            textAlign="center"
                            fontWeight="bold"
                          >
                            <option> Selecione um tipo de pagamento</option>
                            <option> Débito</option>
                            <option> Crédito</option>
                            <option> Dinheiro</option>
                          </Select>
                        </Td>
                        <Td textAlign="end" fontWeight="bold">
                          Cupom de Desconto
                        </Td>
                        <Td px="0">
                          <Input
                            bg="white"
                            borderColor="black"
                            placeholder="Insira código do cupom"
                          ></Input>
                        </Td>
                      </Tr>
                    </Tbody>
                  </Table>
                </TableContainer>
                <Flex></Flex>
                <Button w="100%" py="8" colorScheme="whatsapp">
                  Continuar
                </Button>
              </Box>
            </Flex>
          </Flex>
        </AdminContainer>
      </ChakraProvider>
    </motion.div>
  );
}
