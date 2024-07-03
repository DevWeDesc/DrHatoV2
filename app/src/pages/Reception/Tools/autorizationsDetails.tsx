import {
  Box,
  ChakraProvider,
  Flex,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Input,
} from "@chakra-ui/react";
import { Header } from "../../../components/admin/Header";
import { AdminContainer } from "../../AdminDashboard/style";
import { GenericSidebar } from "../../../components/Sidebars/GenericSideBar";
import { GenericLink } from "../../../components/Sidebars/GenericLink";
import { BsCashCoin } from "react-icons/bs";
import { BiHome } from "react-icons/all";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../../lib/axios";

export function ToolsAutorizationsDetails() {
  const { id } = useParams();
  const [customer, setCustomer] = useState([]);
  const [petsCustomer, setPetsCustomer] = useState([]);

  async function getCustomer() {
    const customer = await api.get("/customers");
    const customerfilter = customer.data.filter((cust: any) =>
      cust.id == id ? cust : null
    );
    setPetsCustomer(customerfilter[0].pets);
    setCustomer(customerfilter);
  }
  useEffect(() => {
    getCustomer();
  }, []);

  return (
    <ChakraProvider>
      <AdminContainer>
        <Flex direction="column" h="100vh">
          <Header
            title="Emissão de Autorizações"
            url="/Recepcao/Ferramentas/Autorizacao/"
          />
          <Flex w="100%" my="6" maxWidth={1680} mx="auto" px="6">
            <GenericSidebar>
              <GenericLink
                name="Painel de Pagamentos"
                icon={BsCashCoin}
                path="/Recepcao/Caixa/Pagamentos"
              />
              <GenericLink name="Recepção" icon={BiHome} path="/Recepcao/" />
              <GenericLink name="Home" icon={BiHome} path={`/Home/`} />
            </GenericSidebar>
            <Box flex="1" borderRadius={8} bg="gray.200" p="8">
              <TableContainer>
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th
                        colSpan={4}
                        textAlign="center"
                        py="6"
                        fontSize={18}
                        fontWeight="bold"
                        color="black"
                        bg="blue.100"
                      >
                        Detalhes de Autorizações
                      </Th>
                    </Tr>
                  </Thead>
                  {customer?.map((client: any) => (
                    <Tbody>
                      <Tr>
                        <Td p="0" pl="5" fontSize={20} fontWeight="bold">
                          Cliente
                        </Td>
                        <Td p="0" colSpan={2}>
                          <Input
                            rounded="0"
                            h="12"
                            bg="white"
                            borderColor="black"
                            value={client.name}
                          />
                        </Td>
                      </Tr>
                      <Tr>
                        <Td p="0" pl="5" fontSize={20} fontWeight="bold">
                          Endereço
                        </Td>
                        <Td p="0" colSpan={2}>
                          <Input
                            rounded="0"
                            h="12"
                            bg="white"
                            borderColor="black"
                            value={client.adress}
                          />
                        </Td>
                      </Tr>{" "}
                      <Tr>
                        <Td p="0" pl="5" fontSize={20} fontWeight="bold">
                          Autorização
                        </Td>
                        <Td p="0" colSpan={2}>
                          <Input
                            rounded="0"
                            h="12"
                            bg="white"
                            borderColor="black"
                            value={
                              client.autorizations == null
                                ? "Sem Autorização"
                                : client.autorizations
                            }
                          />
                        </Td>
                      </Tr>
                    </Tbody>
                  ))}
                </Table>
              </TableContainer>
              <TableContainer>
                <Table variant="simple" border="1px solid black">
                  {petsCustomer.length === 0 && (
                    <Thead>
                      <Tr>
                        <Th
                          colSpan={4}
                          textAlign="center"
                          py="6"
                          fontSize={18}
                          fontWeight="bold"
                          color="black"
                          bg="blue.100"
                          borderBottom="1px solid black"
                        >
                          O cliente não tem Nenhum Animal Cadastrado no Sistema!
                        </Th>
                      </Tr>
                    </Thead>
                  )}
                  {petsCustomer.length != 0 && (
                    <Thead>
                      <Tr>
                        <Th
                          colSpan={4}
                          textAlign="center"
                          py="6"
                          fontSize={18}
                          fontWeight="bold"
                          color="black"
                          bg="blue.100"
                          borderBottom="1px solid black"
                        >
                          Animais do Proprietário
                        </Th>
                      </Tr>
                      <Tr fontWeight="bold" fontSize={18} bg="gray.300">
                        <Td border="1px solid black">Animal</Td>
                        <Td border="1px solid black">Espécie</Td>
                        <Td border="1px solid black">Raça</Td>
                      </Tr>
                    </Thead>
                  )}
                  {petsCustomer.map((pet: any) => (
                    <Tbody>
                      <Tr fontWeight="bold" fontSize={18} cursor="pointer">
                        <Td border="1px solid black" color="blue.400">
                          {pet.name}
                        </Td>
                        <Td border="1px solid black">{pet.especie}</Td>
                        <Td border="1px solid black">{pet.race}</Td>
                      </Tr>
                    </Tbody>
                  ))}
                </Table>
              </TableContainer>
            </Box>
          </Flex>
        </Flex>
      </AdminContainer>
    </ChakraProvider>
  );
}
