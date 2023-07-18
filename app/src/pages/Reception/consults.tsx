import {
  Text,
  Flex,
  Box,
  SimpleGrid,
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
import { ReceptionSidebar } from "../../components/Sidebars/ReceptionBar";
import { DbContext } from "../../contexts/DbContext";
import { api } from "../../lib/axios";
import { Header } from "../../components/admin/Header";
import { motion } from "framer-motion";

export function ReceptionConsults() {
  const { customer } = useContext(DbContext);
  const [dataCostumer, setDataCostumer] = useState([]);

  async function getCustomer() {
    const dataCostumer = await api.get("customers");
    setDataCostumer(dataCostumer.data);
  }
  useEffect(() => {
    getCustomer();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <ChakraProvider>
        <Flex direction="column" h="100vh">
          <Header title="Menu Recepção" />
          <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
            <ReceptionSidebar />
            <Flex
              flex="1"
              direction="column"
              borderRadius={8}
              bg="gray.200"
              p="8"
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
    </motion.div>
  );
}
