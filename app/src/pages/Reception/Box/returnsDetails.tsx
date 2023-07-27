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

import { Header } from "../../../components/admin/Header";

import { AdminContainer } from "../../AdminDashboard/style";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { api } from "../../../lib/axios";
import { useParams } from "react-router-dom";
import { GenericLink } from "../../../components/Sidebars/GenericLink";
import { GenericSidebar } from "../../../components/Sidebars/GenericSideBar";
import { BiHome } from "react-icons/bi";
import { BsCashCoin } from "react-icons/bs";
import { GiCardDiscard } from "react-icons/gi";

export function BoxReturnsDetails() {
  const [customers, setCostumers] = useState([]);
  const { id } = useParams<{ id: any }>();

  useEffect(() => {
    async function getCustomer() {
      const response = await api.get(`/customers`);
      const responseFiltered = response.data.filter((res: any) =>
        res.id == id ? res : null
      );
      setCostumers(responseFiltered);
    }
    getCustomer();
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
                      </Tr>
                    </Thead>
                    {customers?.map((user: any) => (
                      <Tbody>
                        <Tr border="1px solid black">
                          <>
                            {" "}
                            <Td
                              fontSize="18"
                              fontWeight="bold"
                              py="0"
                              borderColor="black"
                            >
                              Cliente
                            </Td>
                            <Td py="0" borderColor="black">
                              <Input
                                borderLeft="2px solid black"
                                bg="white"
                                borderColor="black"
                                value={user.name}
                                rounded="0"
                                pr="0"
                                w="100%"
                              />
                            </Td>
                          </>

                          <Td
                            borderColor="black"
                            py="0"
                            pl="0"
                            textAlign="end"
                            fontSize="18"
                            fontWeight="bold"
                          >
                            Endereço
                          </Td>
                          <Td py="0" pr="0" borderColor="black">
                            <Input
                              bg="white"
                              borderColor="black"
                              value={user.adress}
                              rounded="0"
                              pr="0"
                              w="100%"
                            />
                          </Td>
                        </Tr>
                        <Tr border="1px solid black">
                          <Td
                            py="0"
                            fontSize="18"
                            fontWeight="bold"
                            borderColor="black"
                          >
                            Bairro
                          </Td>
                          <Td py="0" borderColor="black">
                            <Input
                              borderLeft="2px solid black"
                              bg="white"
                              borderColor="black"
                              value={user.neighbour}
                              rounded="0"
                              pr="0"
                              w="100%"
                            />
                          </Td>
                          <Td
                            borderColor="black"
                            py="0"
                            fontSize="18"
                            fontWeight="bold"
                            pl="0"
                            textAlign="end"
                          >
                            CEP
                          </Td>
                          <Td py="0" pr="0" borderColor="black">
                            <Input
                              bg="white"
                              borderColor="black"
                              value={user.cep}
                              rounded="0"
                              pr="0"
                              w="100%"
                            />
                          </Td>
                        </Tr>
                        <Tr border="1px solid black" p="0" m="0">
                          <Td
                            fontSize="18"
                            fontWeight="bold"
                            py="0"
                            borderColor="black"
                          >
                            Estado
                          </Td>
                          <Td py="0" borderColor="black">
                            <Input
                              borderLeft="2px solid black"
                              bg="white"
                              borderColor="black"
                              value={user.district}
                              rounded="0"
                              pr="0"
                              w="100%"
                            />
                          </Td>
                          <Td
                            borderColor="black"
                            py="0"
                            fontSize="18"
                            fontWeight="bold"
                            pl="0"
                            textAlign="end"
                          >
                            Telefone
                          </Td>
                          <Td py="0" pr="0" borderColor="black">
                            <Input
                              bg="white"
                              borderColor="black"
                              value={user.phone}
                              rounded="0"
                              pr="0"
                              w="100%"
                            />
                          </Td>
                        </Tr>
                      </Tbody>
                    ))}
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
                          bg="blue.100"
                          borderBottom="1px solid black"
                        >
                          Dados da Devolução
                        </Th>
                        <Th bg="blue.100" borderBottom="1px solid black"></Th>
                        <Th bg="blue.100" borderBottom="1px solid black"></Th>
                        <Th bg="blue.100" borderBottom="1px solid black"></Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      <Tr border="1px solid black">
                        <Td
                          fontSize="18"
                          fontWeight="bold"
                          py="0"
                          borderColor="black"
                          w="355px"
                        >
                          Data
                        </Td>
                        <Td py="0" borderColor="black">
                          <Input
                            borderLeft="2px solid black"
                            bg="white"
                            borderColor="black"
                            type="date"
                            rounded="0"
                          />
                        </Td>
                        <Td
                          borderColor="black"
                          py="0"
                          pl="0"
                          textAlign="end"
                          fontSize="18"
                          fontWeight="bold"
                        >
                          Horário
                        </Td>
                        <Td borderColor="black" py="0" pr="0">
                          <Input bg="white" borderColor="black" rounded="0" />
                        </Td>
                      </Tr>
                      <Tr border="1px solid black">
                        <Td
                          borderColor="black"
                          py="0"
                          fontSize="18"
                          fontWeight="bold"
                        >
                          Caixa
                        </Td>
                        <Td borderColor="black" py="0">
                          <Input
                            borderLeft="2px solid black"
                            bg="white"
                            borderColor="black"
                            rounded="0"
                          />
                        </Td>
                        <Td
                          borderColor="black"
                          py="0"
                          pl="0"
                          textAlign="end"
                          fontSize="18"
                          fontWeight="bold"
                        >
                          Valor
                        </Td>
                        <Td borderColor="black" py="0" pr="0">
                          <Input bg="white" borderColor="black" rounded="0" />
                        </Td>
                      </Tr>
                      <Tr border="1px solid black">
                        <Td
                          borderColor="black"
                          py="0"
                          fontSize="18"
                          fontWeight="bold"
                        >
                          Seu Login
                        </Td>
                        <Td borderColor="black" py="0">
                          <Input
                            borderLeft="2px solid black"
                            bg="white"
                            borderColor="black"
                            rounded="0"
                          />
                        </Td>
                        <Td
                          borderColor="black"
                          py="0"
                          pl="0"
                          textAlign="end"
                          fontSize="18"
                          fontWeight="bold"
                        >
                          Sua Senha
                        </Td>
                        <Td py="0" pr="0" borderColor="black">
                          <Input bg="white" borderColor="black" rounded="0" />
                        </Td>
                      </Tr>
                      <Tr border="1px solid black">
                        <Td
                          py="0"
                          pl="5"
                          fontSize="18"
                          fontWeight="bold"
                          borderColor="black"
                        >
                          Motivo da Devolução
                        </Td>
                        <Td py="0" colSpan={3} pr="0" borderColor="black">
                          <Textarea
                            borderLeft="2px solid black"
                            rounded="0"
                            bg="white"
                            borderColor="black"
                          />
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
