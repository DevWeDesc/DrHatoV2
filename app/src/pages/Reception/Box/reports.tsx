import {
  Text,
  Button,
  ChakraProvider,
  Heading,
  Table,
  Tbody,
  Td,
  Tr,
  Flex,
  TableContainer,
  Textarea,
  Input,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { AdminContainer } from "../../AdminDashboard/style";
import { motion } from "framer-motion";
import { Box } from "@chakra-ui/react";
import { BiHome } from "react-icons/bi";
import { TbArrowBack } from "react-icons/tb";

export function BoxReports() {
  const navigate = useNavigate();
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <ChakraProvider>
        <AdminContainer>
          <Flex direction="column">
            <Flex
              align="center"
              gap="2"
              px="5%"
              h="12vh"
              justifyContent="space-between"
            >
              <Flex align="center">
                <Text m="2" fontSize="2xl" fontWeight="bold">
                  Despesas
                </Text>
                <Flex gap="2">
                  <Button
                    colorScheme="teal"
                    leftIcon={<BiHome size={24} />}
                    onClick={() => navigate("/Home")}
                  >
                    Home
                  </Button>
                  <Button
                    colorScheme="yellow"
                    leftIcon={<TbArrowBack size={24} />}
                    onClick={() => navigate("/Recepcao/Caixa")}
                  >
                    Voltar
                  </Button>
                </Flex>
              </Flex>
            </Flex>

            <Flex w="100%" maxWidth={1580} mx="auto" px="6">
              {/* <Sidebar /> */}
              <Box flex="1" borderRadius={8} bg="gray.200" w="100%">
                <Flex direction="column">
                  <Flex w="100%" justifyContent="space-between">
                    <Flex
                      direction="column"
                      w="40%"
                      borderRight="1px solid black"
                    >
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
                          Caixa
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
                          <Text w="60%" fontSize="18" fontWeight="bold" pl="5">
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
                            bgColor="gray.400"
                            color="red.600"
                            fontWeight="bold"
                            fontSize="18"
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
                            Nova Retirada (Todos Campos são Obrigatórios)
                          </Text>
                          <TableContainer w="100%">
                            <Table variant="simple">
                              <Tbody>
                                <Tr>
                                  <Td
                                    w="50%"
                                    style={{
                                      borderRight: "1px solid black",
                                      borderBottom: "1px solid black",
                                    }}
                                  >
                                    <Text fontWeight="bold"> Login</Text>
                                  </Td>

                                  <Td p="0">
                                    <Input
                                      h="52.44px"
                                      bg="white"
                                      border="1px solid black"
                                      rounded="0"
                                    ></Input>
                                  </Td>
                                </Tr>
                                <Tr>
                                  <Td
                                    style={{
                                      borderRight: "1px solid black",
                                      borderBottom: "1px solid black",
                                    }}
                                  >
                                    <Text fontWeight="bold"> Senha</Text>
                                  </Td>

                                  <Td p="0">
                                    <Input
                                      h="52.44px"
                                      bg="white"
                                      border="1px solid black"
                                      rounded="0"
                                    ></Input>
                                  </Td>
                                </Tr>
                                <Tr>
                                  <Td
                                    style={{
                                      borderRight: "1px solid black",
                                      borderBottom: "1px solid black",
                                    }}
                                  >
                                    <Text fontWeight="bold"> Valor</Text>
                                  </Td>
                                  <Td p="0">
                                    <Input
                                      h="52.44"
                                      bg="white"
                                      border="1px solid black"
                                      rounded="0"
                                    ></Input>
                                  </Td>
                                </Tr>
                              </Tbody>
                            </Table>
                          </TableContainer>
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
                            bg="blue.300"
                            color="white"
                          >
                            Motivo da Retirada
                          </Text>
                          <Textarea bg="white" rounded="0"></Textarea>
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
                          Retirada de dinheiro para despesas
                        </Heading>
                      </Flex>

                      {/* <TableContainer>
                      <Table variant="striped" colorScheme="teal">
                        <Thead>
                          <Tr>
                            <Th border="1px solid black" fontSize="17">
                              Tipo
                            </Th>
                            <Th border="1px solid black" fontSize="17">
                              Cliente
                            </Th>
                            <Th
                              border="1px solid black"
                              fontSize="17"
                              isNumeric
                            >
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
                    </TableContainer> */}
                    </Flex>
                  </Flex>
                  <Button colorScheme="whatsapp" mt="2" py="8">
                    Gravar
                  </Button>
                </Flex>
              </Box>
            </Flex>
          </Flex>
        </AdminContainer>
      </ChakraProvider>
    </motion.div>
  );
}
