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
} from "@chakra-ui/react";

import { Header } from "../../components/admin/Header";

import { AdminContainer } from "../AdminDashboard/style";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { api } from "../../lib/axios";
import { useParams } from "react-router-dom";
import { GenericLink } from "../../components/Sidebars/GenericLink";
import { GenericSidebar } from "../../components/Sidebars/GenericSideBar";
import { BiHome } from "react-icons/bi";
import { BsCashCoin } from "react-icons/bs";
import { GiCardDiscard } from "react-icons/gi";

export function BoxReturnsDetails() {
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
            <Flex w="100%" my="6" maxWidth={1680} mx="auto" px="6">
              <GenericSidebar>
                <GenericLink
                  name="Painel de Pagamentos"
                  icon={BsCashCoin}
                  path="/Recepcao/Caixa/Pagamentos"
                />
                <GenericLink
                  name="Painel de Devoluções"
                  icon={GiCardDiscard}
                  path="/Recepcao/Caixa/Returns"
                />
                <GenericLink name="Home" icon={BiHome} path={`/Home/`} />
              </GenericSidebar>
              <Box flex="1" borderRadius={8} bg="gray.200" p="8">
                <TableContainer>
                  <Table variant="simple">
                    <Thead>
                      <Tr>
                        <Th fontSize="18" py="8" color="black" bg="blue.100">
                          Dados do Cliente
                        </Th>
                        <Th bg="blue.100"></Th>
                        <Th bg="blue.100"></Th>
                        <Th bg="blue.100"></Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      <Tr>
                        <Td fontSize="18" fontWeight="bold">
                          Cliente
                        </Td>
                        <Td>
                          <Input bg="white" borderColor="black"></Input>
                        </Td>
                        <Td
                          pl="0"
                          textAlign="end"
                          fontSize="18"
                          fontWeight="bold"
                        >
                          Endereço
                        </Td>
                        <Td>
                          <Input bg="white" borderColor="black"></Input>
                        </Td>
                      </Tr>
                      <Tr>
                        <Td fontSize="18" fontWeight="bold">
                          Bairro
                        </Td>
                        <Td>
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
                        <Td>
                          <Input bg="white" borderColor="black"></Input>
                        </Td>
                      </Tr>
                      <Tr>
                        <Td fontSize="18" fontWeight="bold">
                          Estado
                        </Td>
                        <Td>
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
                        <Td>
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
                        <Th fontSize="18" py="8" color="black" bg="blue.100">
                          Dados da Devolução
                        </Th>
                        <Th bg="blue.100"></Th>
                        <Th bg="blue.100"></Th>
                        <Th bg="blue.100"></Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      <Tr>
                        <Td fontSize="18" fontWeight="bold">
                          Data
                        </Td>
                        <Td>
                          <Input
                            bg="white"
                            borderColor="black"
                            type="date"
                          ></Input>
                        </Td>
                        <Td
                          pl="0"
                          textAlign="end"
                          fontSize="18"
                          fontWeight="bold"
                        >
                          Horário
                        </Td>
                        <Td>
                          <Input bg="white" borderColor="black"></Input>
                        </Td>
                      </Tr>
                      <Tr>
                        <Td fontSize="18" fontWeight="bold">
                          Caixa
                        </Td>
                        <Td>
                          <Input bg="white" borderColor="black"></Input>
                        </Td>
                        <Td
                          pl="0"
                          textAlign="end"
                          fontSize="18"
                          fontWeight="bold"
                        >
                          Valor
                        </Td>
                        <Td>
                          <Input bg="white" borderColor="black"></Input>
                        </Td>
                      </Tr>
                      <Tr>
                        <Td fontSize="18" fontWeight="bold">
                          Seu Login
                        </Td>
                        <Td>
                          <Input bg="white" borderColor="black"></Input>
                        </Td>
                        <Td
                          pl="0"
                          textAlign="end"
                          fontSize="18"
                          fontWeight="bold"
                        >
                          Sua Senha
                        </Td>
                        <Td>
                          <Input bg="white" borderColor="black"></Input>
                        </Td>
                      </Tr>
                      <Tr>
                        <Td pl="5" fontSize="18" fontWeight="bold">
                          Motivo da Devolução
                        </Td>
                        <Td colSpan={3}>
                          <Textarea bg="white" borderColor="black" />
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
