import {
  Text,
  Button,
  ChakraProvider,
  Heading,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Input,
  Flex,
  TableContainer,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { AdminContainer } from "../../AdminDashboard/style";

import { Box } from "@chakra-ui/react";
import { BiHome } from "react-icons/bi";
import { TbArrowBack } from "react-icons/tb";
import { Header } from "../../../components/admin/Header";
import { GenericLink } from "../../../components/Sidebars/GenericLink";
import { GenericSidebar } from "../../../components/Sidebars/GenericSideBar";
import { AiFillEdit } from "react-icons/ai";
import { BiCalendarPlus } from "react-icons/bi";
import { RiSafeFill } from "react-icons/ri";
import { AiFillPrinter } from "react-icons/ai";
import { TbCashBanknoteOff } from "react-icons/tb";

export function BoxReception() {
  const navigate = useNavigate();
  return (
    <ChakraProvider>
      <AdminContainer>
        <Flex direction="column">
          <Header title="Caixa" url="/Recepcao" />
          <Flex w="100%" maxWidth={1680} mx="auto" px="6">
            <GenericSidebar>
              <GenericLink
                name="Pagamentos"
                icon={BiCalendarPlus}
                path={`/Recepcao/Caixa/Pagamentos`}
              />
              <GenericLink
                name="Devoluções"
                icon={AiFillEdit}
                path={`/Recepcao/Caixa/Returns`}
              />
              <Text fontWeight="bold" fontSize="2xxl" mt="6">
                OPÇÕES DO CAIXA
              </Text>
              <GenericLink
                name="Fechar Caixa"
                icon={RiSafeFill}
                // path={`/Recepcao/Change`}
              />
              <GenericLink
                name="Despesas"
                icon={TbCashBanknoteOff}
                path={`/Recepcao/Caixa/Despesas`}
              />
              <GenericLink
                name="Imprimir"
                icon={AiFillPrinter}
                //path={`/Recepcao/Change`}
              />
            </GenericSidebar>
            {/* <Sidebar /> */}
            <Box flex="1" borderRadius={8} bg="gray.200" w="100%">
              <Flex w="100%" justifyContent="space-between">
                <Flex direction="column" w="40%" borderRight="1px solid black">
                  <Flex
                    justify="space-between"
                    direction="column"
                    align="left"
                    borderLeft="2px solid black"
                    borderBottom="2px solid black"
                  >
                    <Heading
                      bg="gray.700"
                      color="white"
                      size="lg"
                      fontWeight="bold"
                      w="100%"
                      textAlign="center"
                      py="5"
                    >
                      Caixa - Código 805
                    </Heading>

                    <Flex
                      justify="space-between"
                      align="center"
                      bg="gray.300"
                      borderY="1px solid black"
                    >
                      <Text
                        w="40%"
                        fontSize="18"
                        fontWeight="bold"
                        pl="5"
                        py="3"
                      >
                        Data do Caixa
                      </Text>
                      <Input
                        h="51px"
                        w="40%"
                        type="date"
                        bgColor="white"
                        borderX="1px solid black"
                        rounded="0"
                      />
                    </Flex>
                    <Flex
                      justify="space-between"
                      align="center"
                      bg="gray.300"
                      borderY="1px solid black"
                    >
                      <Text w="40%" fontSize="18" fontWeight="bold" pl="5">
                        Funcionário
                      </Text>
                      <Input
                        h="51px"
                        w="40%"
                        bgColor="white"
                        borderX="1px solid black"
                        rounded="0"
                      />
                    </Flex>
                    <Flex
                      w="100%"
                      align="center"
                      bg="gray.300"
                      borderY="1px solid black"
                    >
                      <Text w="60%" fontSize="18" fontWeight="bold" pl="5">
                        Dinheiro deixado pelo caixa anterior
                      </Text>
                      <Input
                        h="51px"
                        w="40%"
                        bgColor="white"
                        borderX="1px solid black"
                        rounded="0"
                      />
                    </Flex>
                    <Flex
                      w="100%"
                      align="center"
                      bg="gray.300"
                      borderY="1px solid black"
                    >
                      <Text
                        w="60%"
                        fontSize="18"
                        fontWeight="bold"
                        pl="5"
                        color="blue.400"
                      >
                        Dinheiro para o próximo caixa
                      </Text>
                      <Input
                        h="51px"
                        w="40%"
                        bgColor="white"
                        borderX="1px solid black"
                        rounded="0"
                      />
                    </Flex>
                    <Flex
                      w="100%"
                      align="center"
                      bg="gray.300"
                      borderY="1px solid black"
                    >
                      <Text w="60%" fontSize="18" fontWeight="bold" pl="5">
                        Devoluções
                      </Text>
                      <Input
                        h="51px"
                        w="40%"
                        bgColor="white"
                        borderX="1px solid black"
                        rounded="0"
                      />
                    </Flex>
                    <Flex
                      w="100%"
                      align="center"
                      bg="gray.300"
                      borderY="1px solid black"
                    >
                      <Text w="60%" fontSize="18" fontWeight="bold" pl="5">
                        Dinheiro retirado para despesas
                      </Text>
                      <Input
                        h="51px"
                        w="40%"
                        bgColor="white"
                        borderX="1px solid black"
                        rounded="0"
                      />
                    </Flex>
                    <Flex
                      w="100%"
                      align="center"
                      bg="gray.300"
                      borderY="1px solid black"
                    >
                      <Text w="60%" fontSize="18" fontWeight="bold" pl="5">
                        Não pago
                      </Text>
                      <Input
                        h="51px"
                        w="40%"
                        bgColor="white"
                        borderX="1px solid black"
                        rounded="0"
                      />
                    </Flex>
                    <Flex
                      w="100%"
                      align="center"
                      bg="gray.300"
                      borderY="1px solid black"
                    >
                      <Text w="60%" fontSize="18" fontWeight="bold" pl="5">
                        Total em dinheiro no caixa
                      </Text>
                      <Input
                        h="51px"
                        w="40%"
                        bgColor="white"
                        borderX="1px solid black"
                        rounded="0"
                      />
                    </Flex>
                    <Flex
                      w="100%"
                      align="center"
                      bg="gray.300"
                      borderY="1px solid black"
                    >
                      <Text w="60%" fontSize="18" fontWeight="bold" pl="5">
                        Total em movimento
                      </Text>
                      <Input
                        h="51px"
                        w="40%"
                        bgColor="white"
                        borderX="1px solid black"
                        rounded="0"
                      />
                    </Flex>
                    <Flex
                      direction="column"
                      w="100%"
                      align="center"
                      bg="gray.300"
                      borderY="1px solid black"
                    >
                      <Text
                        w="100%"
                        fontSize="20"
                        textAlign="center"
                        fontWeight="bold"
                        pl="5"
                        py="3"
                        bg="gray.700"
                        color="white"
                      >
                        Totalização por tipo de pagamento
                      </Text>
                      <TableContainer w="100%">
                        <Table variant="striped" colorScheme="teal">
                          <Thead>
                            <Tr>
                              <Th fontSize="18" border="1px solid black">
                                Tipo
                              </Th>
                              <Th
                                isNumeric
                                fontSize="18"
                                border="1px solid black"
                              >
                                Valor
                              </Th>
                            </Tr>
                          </Thead>
                          <Tbody>
                            <Tr>
                              <Td
                                style={{ border: "1px solid black" }}
                                border="1px solid black"
                                fontWeight="bold"
                              >
                                Dinheiro
                              </Td>

                              <Td
                                isNumeric
                                style={{ border: "1px solid black" }}
                                border="1px solid black"
                                fontWeight="bold"
                              >
                                25.4
                              </Td>
                            </Tr>
                            <Tr>
                              <Td
                                style={{ border: "1px solid black" }}
                                border="1px solid black"
                                fontWeight="bold"
                              >
                                Master Card 1X
                              </Td>

                              <Td
                                isNumeric
                                style={{ border: "1px solid black" }}
                                border="1px solid black"
                                fontWeight="bold"
                              >
                                30.48
                              </Td>
                            </Tr>
                            <Tr>
                              <Td
                                style={{ border: "1px solid black" }}
                                border="1px solid black"
                                fontWeight="bold"
                              >
                                Aura 3X
                              </Td>
                              <Td
                                isNumeric
                                style={{ border: "1px solid black" }}
                                border="1px solid black"
                                fontWeight="bold"
                              >
                                0.91444
                              </Td>
                            </Tr>
                            <Tr>
                              <Td
                                style={{ border: "1px solid black" }}
                                border="1px solid black"
                                fontWeight="bold"
                              >
                                Visa electron Débito
                              </Td>
                              <Td
                                isNumeric
                                style={{ border: "1px solid black" }}
                                border="1px solid black"
                                fontWeight="bold"
                              >
                                0.91444
                              </Td>
                            </Tr>
                            <Tr>
                              <Td
                                style={{ border: "1px solid black" }}
                                border="1px solid black"
                                fontWeight="bold"
                              >
                                Master Card Débito
                              </Td>
                              <Td
                                isNumeric
                                style={{ border: "1px solid black" }}
                                border="1px solid black"
                                fontWeight="bold"
                              >
                                0.91444
                              </Td>
                            </Tr>
                            <Tr>
                              <Td
                                style={{ border: "1px solid black" }}
                                border="1px solid black"
                                fontWeight="bold"
                              >
                                Depósito Bancário
                              </Td>
                              <Td
                                isNumeric
                                style={{ border: "1px solid black" }}
                                border="1px solid black"
                                fontWeight="bold"
                              >
                                0.91444
                              </Td>
                            </Tr>
                            <Tr>
                              <Td
                                style={{ border: "1px solid black" }}
                                border="1px solid black"
                                fontWeight="bold"
                              >
                                PetLove
                              </Td>
                              <Td
                                isNumeric
                                style={{ border: "1px solid black" }}
                                border="1px solid black"
                                fontWeight="bold"
                              >
                                0.91444
                              </Td>
                            </Tr>
                          </Tbody>
                        </Table>
                      </TableContainer>
                    </Flex>
                  </Flex>
                </Flex>
                <Flex w="60%" direction="column">
                  <Flex
                    justify="space-between"
                    direction="column"
                    align="center"
                  >
                    <Heading
                      bg="gray.700"
                      color="white"
                      size="lg"
                      fontWeight="bold"
                      w="100%"
                      textAlign="center"
                      py="5"
                    >
                      Documentos Recebidos
                    </Heading>
                  </Flex>

                  <TableContainer>
                    <Table variant="striped" colorScheme="teal">
                      <Thead>
                        <Tr>
                          <Th border="1px solid black" fontSize="17">
                            Tipo
                          </Th>
                          <Th border="1px solid black" fontSize="17">
                            Cliente
                          </Th>
                          <Th border="1px solid black" fontSize="17" isNumeric>
                            Valor
                          </Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        <Tr>
                          <Td style={{ border: "1px solid black" }}>
                            Depósito Bancário
                          </Td>
                          <Td
                            style={{ border: "1px solid black" }}
                            border="1px solid black"
                            fontWeight="bold"
                          >
                            Leiliane Pereira Do Nascimento
                          </Td>
                          <Td
                            style={{ border: "1px solid black" }}
                            border="1px solid black"
                            isNumeric
                            fontWeight="bold"
                          >
                            60,00
                          </Td>
                        </Tr>
                        <Tr>
                          <Td style={{ border: "1px solid black" }}>
                            Dinheiro
                          </Td>
                          <Td
                            style={{ border: "1px solid black" }}
                            border="1px solid black"
                            fontWeight="bold"
                          >
                            Djalma Rodrigues dos Santos
                          </Td>
                          <Td
                            style={{ border: "1px solid black" }}
                            border="1px solid black"
                            isNumeric
                            fontWeight="bold"
                          >
                            327,00
                          </Td>
                        </Tr>
                        <Tr>
                          <Td style={{ border: "1px solid black" }}>
                            Master Card Débito
                          </Td>
                          <Td
                            style={{ border: "1px solid black" }}
                            border="1px solid black"
                            fontWeight="bold"
                          >
                            Leiliane Pereira Do Nascimento
                          </Td>
                          <Td
                            style={{ border: "1px solid black" }}
                            border="1px solid black"
                            isNumeric
                            fontWeight="bold"
                          >
                            60,00
                          </Td>
                        </Tr>
                      </Tbody>
                    </Table>
                  </TableContainer>
                </Flex>
              </Flex>
            </Box>
          </Flex>
        </Flex>
      </AdminContainer>
    </ChakraProvider>
  );
}
