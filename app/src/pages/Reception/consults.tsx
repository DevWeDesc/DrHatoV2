import {
  Flex,
  ChakraProvider,
  Table,
  Thead,
  Tr,
  Th,
  Td,
  Tbody,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { RecepetionSearch } from "../../components/Search/receptionSearch";
import { DbContext } from "../../contexts/DbContext";
import { api } from "../../lib/axios";
import { Header } from "../../components/admin/Header";
import { GenericLink } from "../../components/Sidebars/GenericLink";
import { GenericSidebar } from "../../components/Sidebars/GenericSideBar";
import { AiFillEdit } from "react-icons/ai";
import { FaUserPlus } from "react-icons/fa";

export function ReceptionConsults() {
  const { customer } = useContext(DbContext);
  const [dataCostumer, setDataCostumer] = useState([]);

  async function getCustomer() {
    const dataCostumer = await api.get("customers");
    setDataCostumer(dataCostumer.data.users);
  }
  useEffect(() => {
    getCustomer();
  }, []);

  return (
    <ChakraProvider>
      <Flex direction="column" h="100vh">
        <Header title="Menu Recepção" url="/Recepcao" />
        <Flex w="100%" my="6" maxWidth={1680} mx="auto" px="6">
          <GenericSidebar>
            <GenericLink
              name="Alterar Consulta"
              icon={AiFillEdit}
              path={`/Recepcao/Change`}
            />
            <GenericLink
              name="Cadastro de Clientes"
              icon={FaUserPlus}
              path={`/Recepcao/Create`}
            />{" "}
          </GenericSidebar>

          <Flex
            flex="1"
            direction="column"
            borderRadius={8}
            bg="gray.200"
            p="8"
            maxH="44rem"
            overflow="auto"
          >
            <RecepetionSearch path="/customersearch" />
            <Flex
              mb="8"
              gap="8"
              direction="column"
              align="center"
              overflow="auto"
              maxHeight="44rem"
              overflowY="auto"
            >
              <Flex
                textAlign="center"
                justify="center"
                w="100%"
                fontWeight="bold"
              >
                <Table mt="4" w="100%" colorScheme="blackAlpha">
                  <Thead>
                    <Tr>
                      <Th>Nome</Th>
                      <Th>Telefone</Th>
                      <Th>R.G</Th>
                      <Th>CPF/CNPJ</Th>
                    </Tr>
                  </Thead>
                  {customer ? (
                    customer.map((client: any) => (
                      <Tbody key={client.id}>
                        <Tr>
                          <Td>
                            <Link
                              to={`/Recepcao/Consultas/Clientes/${client.id}`}
                            >
                              {client.name}
                            </Link>
                          </Td>
                          <Td>{client.phone}</Td>
                          <Td>{client.rg}</Td>
                          <Td>{client.cpf}</Td>
                        </Tr>
                      </Tbody>
                    ))
                  ) : (
                    <Tbody>
                      <Tr>
                        <Td>Empty</Td>
                        <Td>Empty</Td>
                        <Td>Empty</Td>
                        <Td>Empty</Td>
                      </Tr>
                    </Tbody>
                  )}
                  {customer <= 0 && (
                    <>
                      {dataCostumer.map((client: any) => (
                        <Tbody key={client.id}>
                          <Tr>
                            <Td>
                              <Link
                                to={`/Recepcao/Consultas/Clientes/${client.id}`}
                              >
                                {client.name}
                              </Link>
                            </Td>
                            <Td>{client.phone}</Td>
                            <Td>{client.rg}</Td>
                            <Td>{client.cpf}</Td>
                          </Tr>
                        </Tbody>
                      ))}
                    </>
                  )}
            
                </Table>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </ChakraProvider>
  );
}
