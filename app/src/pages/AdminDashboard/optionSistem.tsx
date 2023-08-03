import { Box, ChakraProvider, Flex, Input, Text } from "@chakra-ui/react";
import { Header } from "../../components/admin/Header";
import { AdminContainer } from "../AdminDashboard/style";
import {
  Table,
  Tbody,
  Tr,
  Td,
  TableContainer,
  Checkbox,
} from "@chakra-ui/react";
import { Sidebar } from "../../components/admin/Sidebar";

export function OptionSistem() {
  return (
    <ChakraProvider>
      <AdminContainer>
        <Flex direction="column" h="100vh">
          <Header title="Opções Gerais do Sistema" url="/Admin/" />
          <Flex w="100%" my="6" maxWidth={1680} mx="auto" px="6">
            <Sidebar />
            <Box
              flex="1"
              borderRadius={8}
              bg="gray.200"
              p="8"
              maxH="44rem"
              overflow="auto"
            >
              <Flex direction="column">
                <Text
                  textAlign="center"
                  fontSize="18"
                  fontWeight="bold"
                  py="7"
                  bg="blue.100"
                  borderBottom="1px solid black"
                >
                  Opções Gerais do Sistema
                </Text>

                <Flex w="100%" justify="space-between">
                  <Flex w="55%">
                    <TableContainer w="100%">
                      <Table>
                        <Tbody>
                          <Tr fontWeight="bold" border="1px solid black">
                            <Td py="0" borderColor="black" w="10%">
                              Nome da Empresa
                            </Td>
                            <Td px="0" py="0" borderColor="black" w="100%">
                              <Input
                                w="100%"
                                borderLeft="2px solid black"
                                h="50px"
                                bg="white"
                                borderColor="black"
                                rounded="0"
                              />
                            </Td>
                          </Tr>
                          <Tr fontWeight="bold" border="1px solid black">
                            <Td py="0" borderColor="black">
                              Endereço
                            </Td>
                            <Td px="0" py="0" borderColor="black">
                              <Input
                                borderLeft="2px solid black"
                                h="50px"
                                bg="white"
                                borderColor="black"
                                rounded="0"
                              />
                            </Td>
                          </Tr>
                          <Tr fontWeight="bold" border="1px solid black">
                            <Td py="0" borderColor="black">
                              Cidade
                            </Td>
                            <Td px="0" py="0" borderColor="black">
                              <Input
                                borderLeft="2px solid black"
                                h="50px"
                                bg="white"
                                borderColor="black"
                                rounded="0"
                              />
                            </Td>
                          </Tr>
                          <Tr fontWeight="bold" border="1px solid black">
                            <Td py="0" borderColor="black">
                              Bairro
                            </Td>
                            <Td px="0" py="0" borderColor="black">
                              <Input
                                borderLeft="2px solid black"
                                h="50px"
                                bg="white"
                                borderColor="black"
                                rounded="0"
                              />
                            </Td>
                          </Tr>
                          <Tr fontWeight="bold" border="1px solid black">
                            <Td py="0" borderColor="black">
                              Estado
                            </Td>
                            <Td px="0" py="0" borderColor="black">
                              <Input
                                borderLeft="2px solid black"
                                h="50px"
                                bg="white"
                                borderColor="black"
                                rounded="0"
                              />
                            </Td>
                          </Tr>
                          <Tr fontWeight="bold" border="1px solid black">
                            <Td py="0" borderColor="black">
                              Telefone
                            </Td>
                            <Td px="0" py="0" borderColor="black">
                              <Input
                                borderLeft="2px solid black"
                                h="50px"
                                bg="white"
                                borderColor="black"
                                rounded="0"
                              />
                            </Td>
                          </Tr>
                          <Tr fontWeight="bold" border="1px solid black">
                            <Td py="0" borderColor="black">
                              E-mail
                            </Td>
                            <Td px="0" py="0" borderColor="black">
                              <Input
                                borderLeft="2px solid black"
                                h="50px"
                                bg="white"
                                borderColor="black"
                                rounded="0"
                              />
                            </Td>
                          </Tr>
                          <Tr fontWeight="bold" border="1px solid black">
                            <Td py="0" borderColor="black">
                              Web Site
                            </Td>
                            <Td px="0" py="0" borderColor="black">
                              <Input
                                borderLeft="2px solid black"
                                h="50px"
                                bg="white"
                                borderColor="black"
                                rounded="0"
                              />
                            </Td>
                          </Tr>
                          <Tr fontWeight="bold" border="1px solid black">
                            <Td py="0" borderColor="black">
                              Meia Diária
                            </Td>
                            <Td px="0" py="0" borderColor="black">
                              <Input
                                borderLeft="2px solid black"
                                h="50px"
                                bg="white"
                                borderColor="black"
                                rounded="0"
                              />
                            </Td>
                          </Tr>
                          <Tr fontWeight="bold" border="1px solid black">
                            <Td py="0" borderColor="black">
                              Tolerância Internações
                            </Td>
                            <Td px="0" py="0" borderColor="black">
                              <Input
                                borderLeft="2px solid black"
                                h="50px"
                                bg="white"
                                borderColor="black"
                                rounded="0"
                              />
                            </Td>
                          </Tr>
                          <Tr fontWeight="bold" border="1px solid black">
                            <Td py="0" borderColor="black">
                              Prazo de Retorno
                            </Td>
                            <Td px="0" py="0" borderColor="black">
                              <Input
                                borderLeft="2px solid black"
                                h="50px"
                                bg="white"
                                borderColor="black"
                                rounded="0"
                              />
                            </Td>
                          </Tr>
                          <Tr fontWeight="bold" border="1px solid black">
                            <Td py="0" borderColor="black">
                              Dias visiveis em pagamentos
                            </Td>
                            <Td px="0" py="0" borderColor="black">
                              <Input
                                borderLeft="2px solid black"
                                h="50px"
                                bg="white"
                                borderColor="black"
                                rounded="0"
                              />
                            </Td>
                          </Tr>
                          <Tr fontWeight="bold" border="1px solid black">
                            <Td py="0" borderColor="black">
                              Exigir edição de cliente
                            </Td>
                            <Td px="0" py="0" borderColor="black">
                              <Input
                                borderLeft="2px solid black"
                                h="50px"
                                bg="white"
                                borderColor="black"
                                rounded="0"
                              />
                            </Td>
                          </Tr>
                          <Tr fontWeight="bold" border="1px solid black">
                            <Td py="0" borderColor="black">
                              Slots de Cirurgias Diários
                            </Td>
                            <Td px="0" py="0" borderColor="black">
                              <Input
                                borderLeft="2px solid black"
                                h="50px"
                                bg="white"
                                borderColor="black"
                                rounded="0"
                              />
                            </Td>
                          </Tr>
                        </Tbody>
                      </Table>
                    </TableContainer>
                  </Flex>
                  <Flex w="45%">
                    <TableContainer w="100%">
                      <Table variant="simple">
                        <Tbody>
                          <Tr fontWeight="bold" border="1px solid black">
                            <Td display="flex" py="3" gap="3">
                              <Checkbox
                                bg="white"
                                borderColor="darkGray"
                                size="lg"
                                colorScheme="blue"
                                defaultChecked
                              ></Checkbox>
                              <Text> Limita Caixa para um dia</Text>
                            </Td>
                          </Tr>
                          <Tr fontWeight="bold" border="1px solid black">
                            <Td display="flex" py="3" gap="3">
                              <Checkbox
                                bg="white"
                                borderColor="darkGray"
                                size="lg"
                                colorScheme="blue"
                                defaultChecked
                              ></Checkbox>
                              <Text>
                                {" "}
                                Sistema de Agendamento Cirurgico por Slots
                              </Text>
                            </Td>
                          </Tr>

                          <Tr fontWeight="bold" border="1px solid black">
                            <Td display="flex" py="3" gap="3">
                              <Checkbox
                                bg="white"
                                borderColor="darkGray"
                                size="lg"
                                colorScheme="blue"
                                defaultChecked
                              ></Checkbox>
                              <Text>
                                {" "}
                                Impedir alterações em consulta finalizada
                              </Text>
                            </Td>
                          </Tr>
                          <Tr fontWeight="bold" border="1px solid black">
                            <Td display="flex" py="3" gap="3">
                              <Checkbox
                                bg="white"
                                borderColor="darkGray"
                                size="lg"
                                colorScheme="blue"
                                defaultChecked
                              ></Checkbox>
                              <Text> Usar sistema de compensação</Text>
                            </Td>
                          </Tr>
                          <Tr fontWeight="bold" border="1px solid black">
                            <Td display="flex" py="3" gap="3">
                              <Checkbox
                                bg="white"
                                borderColor="darkGray"
                                size="lg"
                                colorScheme="blue"
                                defaultChecked
                              ></Checkbox>
                              <Text> Usar sistema de fotos</Text>
                            </Td>
                          </Tr>
                          <Tr fontWeight="bold" border="1px solid black">
                            <Td display="flex" py="3" gap="3">
                              <Checkbox
                                bg="white"
                                borderColor="darkGray"
                                size="lg"
                                colorScheme="blue"
                                defaultChecked
                              ></Checkbox>
                              <Text> Agenda com horário explicitado</Text>
                            </Td>
                          </Tr>
                          <Tr fontWeight="bold" border="1px solid black">
                            <Td display="flex" py="3" gap="3">
                              <Checkbox
                                bg="white"
                                borderColor="darkGray"
                                size="lg"
                                colorScheme="blue"
                                defaultChecked
                              ></Checkbox>
                              <Text>
                                Utilizar Sistema de preferência na agenda do
                                consultório
                              </Text>
                            </Td>
                          </Tr>
                          <Tr fontWeight="bold" border="1px solid black">
                            <Td display="flex" py="3" gap="3">
                              <Checkbox
                                bg="white"
                                borderColor="darkGray"
                                size="lg"
                                colorScheme="blue"
                                defaultChecked
                              ></Checkbox>
                              <Text> Mostrar cabeçalho no RG do animal</Text>
                            </Td>
                          </Tr>
                        </Tbody>
                      </Table>
                    </TableContainer>
                  </Flex>
                </Flex>
              </Flex>
            </Box>
          </Flex>
        </Flex>
      </AdminContainer>
    </ChakraProvider>
  );
}
