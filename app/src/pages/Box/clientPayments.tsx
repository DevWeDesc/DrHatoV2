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

export function BoxNewPaymentsClient() {
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
            <Header title="Painel de Devoluções" />
            <Flex w="100%" my="6" maxWidth={1680} mx="auto" px="6">
              <GenericSidebar>
                <GenericLink
                  name="Painel de Pagamentos"
                  icon={BsCashCoin}
                  path="/Recepcao/Caixa/Pagamentos"
                />
                <GenericLink
                  name="Pagamentos Consultas"
                  icon={BsCashCoin}
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
                          color="black"
                          bg="blue.100"
                          colSpan={5}
                        >
                          Visualização de Consulta
                        </Th>
                      </Tr>
                      <Tr>
                        <Th px="0" pl="5" fontSize="18" color="black">
                          Nome do Cliente
                        </Th>
                        <Th px="0" colSpan={2}>
                          <Input bg="white" borderColor="black" />
                        </Th>
                        <Th px="0" pl="5" fontSize="18" color="black">
                          Nome do Animal
                        </Th>
                        <Th colSpan={1}>
                          <Input bg="white" borderColor="black" />
                        </Th>
                      </Tr>
                      <Tr>
                        <Th px="0" pl="5" fontSize="18" color="black">
                          Data da Consulta
                        </Th>
                        <Th px="0" colSpan={2}>
                          <Input
                            bg="white"
                            borderColor="black"
                            type="datetime-local"
                          />
                        </Th>
                        <Th px="0" pl="5" fontSize="18" color="black">
                          Veterinário
                        </Th>
                        <Th colSpan={1}>
                          <Input bg="white" borderColor="black" />
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
                          colSpan={5}
                        >
                          Produtos / Serviços nesta consulta
                        </Th>
                      </Tr>
                    </Tbody>
                    <Thead>
                      <Tr bg="blue.400">
                        <Th
                          border="1px solid black"
                          fontSize="18"
                          color="white"
                          colSpan={1}
                        >
                          Quantidade
                        </Th>
                        <Th
                          colSpan={1}
                          border="1px solid black"
                          fontSize="18"
                          color="white"
                        >
                          Produto / Serviço
                        </Th>
                        <Th
                          colSpan={1}
                          border="1px solid black"
                          fontSize="18"
                          isNumeric
                          color="white"
                        >
                          Tabela
                        </Th>
                        <Th
                          colSpan={1}
                          border="1px solid black"
                          fontSize="18"
                          isNumeric
                          color="white"
                        >
                          Desconto
                        </Th>
                        <Th
                          colSpan={1}
                          border="1px solid black"
                          fontSize="18"
                          color="white"
                        >
                          Valor Cobrado
                        </Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      <Tr bg="white" cursor="pointer" fontWeight="bold">
                        <Td border="1px solid black">1</Td>
                        <Td border="1px solid black"> Consulta </Td>
                        <Td
                          border="1px solid black"
                          isNumeric
                          fontWeight="bold"
                        >
                          130,00
                        </Td>
                        <Td border="1px solid black" isNumeric>
                          0%
                        </Td>
                        <Td border="1px solid black" isNumeric>
                          130,00
                        </Td>
                      </Tr>
                      <Tr bg="white" cursor="pointer" fontWeight="bold">
                        <Td border="1px solid black">1</Td>
                        <Td border="1px solid black"> Consulta </Td>
                        <Td
                          border="1px solid black"
                          isNumeric
                          fontWeight="bold"
                        >
                          130,00
                        </Td>
                        <Td border="1px solid black" isNumeric>
                          0%
                        </Td>
                        <Td border="1px solid black" isNumeric>
                          130,00
                        </Td>
                      </Tr>
                      <Tr bg="white" cursor="pointer" fontWeight="bold">
                        <Td border="1px solid black">1</Td>
                        <Td border="1px solid black"> Consulta </Td>
                        <Td
                          border="1px solid black"
                          isNumeric
                          fontWeight="bold"
                        >
                          130,00
                        </Td>
                        <Td border="1px solid black" isNumeric>
                          0%
                        </Td>
                        <Td border="1px solid black" isNumeric>
                          130,00
                        </Td>
                      </Tr>
                      <Tr bg="white" cursor="pointer" fontWeight="bold">
                        <Td border="1px solid black">1</Td>
                        <Td border="1px solid black"> Consulta </Td>
                        <Td
                          border="1px solid black"
                          isNumeric
                          fontWeight="bold"
                        >
                          130,00
                        </Td>
                        <Td border="1px solid black" isNumeric>
                          0%
                        </Td>
                        <Td border="1px solid black" isNumeric>
                          130,00
                        </Td>
                      </Tr>
                      <Tr bg="white" cursor="pointer" fontWeight="bold">
                        <Td colSpan={4} border="1px solid black" isNumeric>
                          Total
                        </Td>
                        <Td border="1px solid black" isNumeric>
                          R$ 520,00
                        </Td>
                      </Tr>
                    </Tbody>
                  </Table>
                </TableContainer>
              </Box>
            </Flex>
          </Flex>
        </AdminContainer>
      </ChakraProvider>
    </motion.div>
  );
}
