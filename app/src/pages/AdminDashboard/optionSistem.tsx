import { Box, ChakraProvider, Flex, Grid, Input, Text } from "@chakra-ui/react";
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
          <Flex
            w="100%"
            my="6"
            direction={{ base: "column", xl: "row" }}
            mx="auto"
            px="6"
          >
            <Sidebar />
            <Flex
              py={{ base: 10, xl: 0 }}
              direction="column"
              gap="4"
              w="full"
              maxH="48rem"
            >
              <Box borderRadius={8} overflow="auto">
                <Flex
                  w="100%"
                  direction={"column"}
                  justify="center"
                  align="center"
                >
                  <Flex
                    w="100%"
                    alignItems="center"
                    justifyContent="center"
                    direction="column"
                  >
                    <Text
                      fontSize={{ base: "lg", lg: "2xl" }}
                      fontWeight="bold"
                      py="7"
                      w="full"
                    >
                      Opções Gerais do Sistema
                    </Text>

                    <Grid
                      w="100%"
                      templateColumns={{
                        base: "repeat(1,1fr)",
                        lg: "repeat(2, 1fr)",
                      }}
                    >
                      <Flex w="100%">
                        <TableContainer w="100%">
                          <Table>
                            <Tbody>
                              <Tr fontWeight="bold">
                                <Td
                                  py="4"
                                  fontSize={{ base: 12, lg: "sm" }}
                                  w="10%"
                                >
                                  Nome da Empresa
                                </Td>
                                <Td px="0" py="0" w="100%">
                                  <Input
                                    fontSize={{ base: 12, lg: "sm" }}
                                    w="100%"
                                    py={4}
                                    bg="white"
                                    borderColor="darkgray"
                                  />
                                </Td>
                              </Tr>
                              <Tr fontWeight="bold">
                                <Td py="4" fontSize={{ base: 12, lg: "sm" }}>
                                  Endereço
                                </Td>
                                <Td px="0" py="0">
                                  <Input
                                    fontSize={{ base: 12, lg: "sm" }}
                                    py={4}
                                    bg="white"
                                    borderColor="darkgray"
                                  />
                                </Td>
                              </Tr>
                              <Tr fontWeight="bold">
                                <Td py="4" fontSize={{ base: 12, lg: "sm" }}>
                                  Cidade
                                </Td>
                                <Td px="0" py="0">
                                  <Input
                                    fontSize={{ base: 12, lg: "sm" }}
                                    py={4}
                                    bg="white"
                                    borderColor="darkgray"
                                  />
                                </Td>
                              </Tr>
                              <Tr fontWeight="bold">
                                <Td py="4" fontSize={{ base: 12, lg: "sm" }}>
                                  Bairro
                                </Td>
                                <Td px="0" py="0">
                                  <Input
                                    fontSize={{ base: 12, lg: "sm" }}
                                    py={4}
                                    bg="white"
                                    borderColor="darkgray"
                                  />
                                </Td>
                              </Tr>
                              <Tr fontWeight="bold">
                                <Td py="4" fontSize={{ base: 12, lg: "sm" }}>
                                  Estado
                                </Td>
                                <Td px="0" py="0">
                                  <Input
                                    fontSize={{ base: 12, lg: "sm" }}
                                    py={4}
                                    bg="white"
                                    borderColor="darkgray"
                                  />
                                </Td>
                              </Tr>
                              <Tr fontWeight="bold">
                                <Td py="4" fontSize={{ base: 12, lg: "sm" }}>
                                  Telefone
                                </Td>
                                <Td px="0" py="0">
                                  <Input
                                    fontSize={{ base: 12, lg: "sm" }}
                                    py={4}
                                    bg="white"
                                    borderColor="darkgray"
                                  />
                                </Td>
                              </Tr>
                              <Tr fontWeight="bold">
                                <Td py="4" fontSize={{ base: 12, lg: "sm" }}>
                                  E-mail
                                </Td>
                                <Td px="0" py="0">
                                  <Input
                                    fontSize={{ base: 12, lg: "sm" }}
                                    py={4}
                                    bg="white"
                                    borderColor="darkgray"
                                  />
                                </Td>
                              </Tr>
                              <Tr fontWeight="bold">
                                <Td py="4" fontSize={{ base: 12, lg: "sm" }}>
                                  Web Site
                                </Td>
                                <Td px="0" py="0">
                                  <Input
                                    fontSize={{ base: 12, lg: "sm" }}
                                    py={4}
                                    bg="white"
                                    borderColor="darkgray"
                                  />
                                </Td>
                              </Tr>
                              <Tr fontWeight="bold">
                                <Td py="4" fontSize={{ base: 12, lg: "sm" }}>
                                  Meia Diária
                                </Td>
                                <Td px="0" py="0">
                                  <Input
                                    fontSize={{ base: 12, lg: "sm" }}
                                    py={4}
                                    bg="white"
                                    borderColor="darkgray"
                                  />
                                </Td>
                              </Tr>
                              <Tr fontWeight="bold">
                                <Td py="4" fontSize={{ base: 12, lg: "sm" }}>
                                  Tolerância Internações
                                </Td>
                                <Td px="0" py="0">
                                  <Input
                                    fontSize={{ base: 12, lg: "sm" }}
                                    py={4}
                                    bg="white"
                                    borderColor="darkgray"
                                  />
                                </Td>
                              </Tr>
                              <Tr fontWeight="bold">
                                <Td py="4" fontSize={{ base: 12, lg: "sm" }}>
                                  Prazo de Retorno
                                </Td>
                                <Td px="0" py="0">
                                  <Input
                                    fontSize={{ base: 12, lg: "sm" }}
                                    py={4}
                                    bg="white"
                                    borderColor="darkgray"
                                  />
                                </Td>
                              </Tr>
                              <Tr fontWeight="bold">
                                <Td py="4" fontSize={{ base: 12, lg: "sm" }}>
                                  Dias visiveis em pagamentos
                                </Td>
                                <Td px="0" py="0">
                                  <Input
                                    fontSize={{ base: 12, lg: "sm" }}
                                    py={4}
                                    bg="white"
                                    borderColor="darkgray"
                                  />
                                </Td>
                              </Tr>
                              <Tr fontWeight="bold">
                                <Td py="4" fontSize={{ base: 12, lg: "sm" }}>
                                  Exigir edição de cliente
                                </Td>
                                <Td px="0" py="0">
                                  <Input
                                    fontSize={{ base: 12, lg: "sm" }}
                                    py={4}
                                    bg="white"
                                    borderColor="darkgray"
                                  />
                                </Td>
                              </Tr>
                              <Tr fontWeight="bold">
                                <Td py="4" fontSize={{ base: 12, lg: "sm" }}>
                                  Slots de Cirurgias Diários
                                </Td>
                                <Td px="0" py="0">
                                  <Input
                                    fontSize={{ base: 12, lg: "sm" }}
                                    py={4}
                                    bg="white"
                                    borderColor="darkgray"
                                  />
                                </Td>
                              </Tr>
                            </Tbody>
                          </Table>
                        </TableContainer>
                      </Flex>
                      <Flex w="100%">
                        <TableContainer w="100%">
                          <Table variant="simple">
                            <Tbody>
                              <Tr fontWeight="bold">
                                <Td display="flex" py="4" gap="3">
                                  <Checkbox
                                    bg="white"
                                    borderColor="darkGray"
                                    size="lg"
                                    colorScheme="blue"
                                    defaultChecked
                                  ></Checkbox>
                                  <Text fontSize={{ base: 12, lg: "sm" }}>
                                    {" "}
                                    Limita Caixa para um dia
                                  </Text>
                                </Td>
                              </Tr>
                              <Tr fontWeight="bold">
                                <Td display="flex" py="4" gap="3">
                                  <Checkbox
                                    bg="white"
                                    borderColor="darkGray"
                                    size="lg"
                                    colorScheme="blue"
                                    defaultChecked
                                  ></Checkbox>
                                  <Text fontSize={{ base: 12, lg: "sm" }}>
                                    {" "}
                                    Sistema de Agendamento Cirurgico por Slots
                                  </Text>
                                </Td>
                              </Tr>

                              <Tr fontWeight="bold">
                                <Td display="flex" py="4" gap="3">
                                  <Checkbox
                                    bg="white"
                                    borderColor="darkGray"
                                    size="lg"
                                    colorScheme="blue"
                                    defaultChecked
                                  ></Checkbox>
                                  <Text fontSize={{ base: 12, lg: "sm" }}>
                                    {" "}
                                    Impedir alterações em consulta finalizada
                                  </Text>
                                </Td>
                              </Tr>
                              <Tr fontWeight="bold">
                                <Td display="flex" py="4" gap="3">
                                  <Checkbox
                                    bg="white"
                                    borderColor="darkGray"
                                    size="lg"
                                    colorScheme="blue"
                                    defaultChecked
                                  ></Checkbox>
                                  <Text fontSize={{ base: 12, lg: "sm" }}>
                                    {" "}
                                    Usar sistema de compensação
                                  </Text>
                                </Td>
                              </Tr>
                              <Tr fontWeight="bold">
                                <Td display="flex" py="4" gap="3">
                                  <Checkbox
                                    bg="white"
                                    borderColor="darkGray"
                                    size="lg"
                                    colorScheme="blue"
                                    defaultChecked
                                  ></Checkbox>
                                  <Text fontSize={{ base: 12, lg: "sm" }}>
                                    {" "}
                                    Usar sistema de fotos
                                  </Text>
                                </Td>
                              </Tr>
                              <Tr fontWeight="bold">
                                <Td display="flex" py="4" gap="3">
                                  <Checkbox
                                    bg="white"
                                    borderColor="darkGray"
                                    size="lg"
                                    colorScheme="blue"
                                    defaultChecked
                                  ></Checkbox>
                                  <Text fontSize={{ base: 12, lg: "sm" }}>
                                    {" "}
                                    Agenda com horário explicitado
                                  </Text>
                                </Td>
                              </Tr>
                              <Tr fontWeight="bold">
                                <Td display="flex" py="4" gap="3">
                                  <Checkbox
                                    bg="white"
                                    borderColor="darkGray"
                                    size="lg"
                                    colorScheme="blue"
                                    defaultChecked
                                  ></Checkbox>
                                  <Text fontSize={{ base: 12, lg: "sm" }}>
                                    Utilizar Sistema de preferência na agenda do
                                    consultório
                                  </Text>
                                </Td>
                              </Tr>
                              <Tr fontWeight="bold">
                                <Td display="flex" py="4" gap="3">
                                  <Checkbox
                                    bg="white"
                                    borderColor="darkGray"
                                    size="lg"
                                    colorScheme="blue"
                                    defaultChecked
                                  ></Checkbox>
                                  <Text fontSize={{ base: 12, lg: "sm" }}>
                                    Mostrar cabeçalho no RG do animal
                                  </Text>
                                </Td>
                              </Tr>
                            </Tbody>
                          </Table>
                        </TableContainer>
                      </Flex>
                    </Grid>
                  </Flex>
                </Flex>
              </Box>
            </Flex>
          </Flex>
        </Flex>
      </AdminContainer>
    </ChakraProvider>
  );
}
