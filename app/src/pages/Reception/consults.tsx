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
    Tbody
  } from "@chakra-ui/react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { RecepetionSearch } from "../../components/Search/receptionSearch";
  import { ReceptionSidebar } from "../../components/Sidebars/ReceptionBar";
import { DbContext } from "../../contexts/DbContext";
  
  export function ReceptionConsults() {
    const {customer} = useContext(DbContext)
    console.log(customer)
    return (
      <ChakraProvider>
  
        <Flex direction="column" h="100vh">
          <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
            <ReceptionSidebar />
            <Flex flex="1" direction="column" borderRadius={8} bg="gray.200" p="8">
              <RecepetionSearch path="/customersearch"/>
                <Flex mb="8" gap="8" direction="column" align="center" height={500} overflow="auto">
                  <Flex   textAlign="center" justify="center" w="100%" fontWeight="bold">
                    <Table mt="4" w="100%"  colorScheme="blackAlpha">
                      <Thead>
                        <Tr>
                          <Th>Nome</Th>
                          <Th>Telefone</Th>
                          <Th>R.G</Th>
                          <Th>CPF/CNPJ</Th>
                
                        </Tr>
                      </Thead>
                    {
                      customer ? customer.map((client: any) => (
                        <Tbody key={client.id}>
                        <Tr>
                          <Td><Link to={`/Recepcao/Consultas/Clientes/${client.id}`}>{client.name}</Link></Td>
                          <Td>{client.phone}</Td>
                          <Td>{client.rg}</Td>
                          <Td>{client.cpf}</Td>
                         
                        </Tr>
                      </Tbody>
                      )) : 
                      (<Tbody>
                        <Tr>
                          <Td>Empty</Td>
                          <Td>Empty</Td>
                          <Td>Empty</Td>
                          <Td>Empty</Td>
                         
                        </Tr>
                      </Tbody>)
                    }
                    </Table>
                  </Flex>
                </Flex>
              </Flex>
          </Flex>
        </Flex>
      </ChakraProvider>
    );
  }
  