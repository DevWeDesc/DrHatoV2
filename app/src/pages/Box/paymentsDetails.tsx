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

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { api } from "../../lib/axios";
import { useParams } from "react-router-dom";

export function BoxPaymentsDetails() {
  const [customers, setCostumers] = useState([]);
  const { id } = useParams<{ id: string }>();

  async function getCustomers() {
    const response = await api.get(`http://localhost:5000/customers/${id}`);
    setCostumers(response.data);
  }

  useEffect(() => {
    getCustomers();
  }, []);

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
            <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
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
                          <Input bg="white" borderColor="black"></Input>
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
                      <Tr border="1px solid black">
                        <Th border="1px solid black" fontSize="18">
                          Data
                        </Th>
                        <Th border="1px solid black" fontSize="18">
                          Descrição
                        </Th>
                        <Th border="1px solid black" fontSize="18" isNumeric>
                          Débito
                        </Th>
                        <Th border="1px solid black" fontSize="18" isNumeric>
                          Crédito
                        </Th>
                        <Th border="1px solid black" fontSize="18">
                          Tipo
                        </Th>
                        <Th border="1px solid black" fontSize="18" isNumeric>
                          Saldo
                        </Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      <Tr>
                        <Td border="1px solid black">25/05/23</Td>
                        <Td border="1px solid black">
                          {" "}
                          Consulta nº 9921, animal :Mel{" "}
                        </Td>
                        <Td border="1px solid black" isNumeric>
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
