import { Button, ChakraProvider, Flex, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { BiHome } from "react-icons/bi";
import { TbArrowBack } from "react-icons/tb";
import { useParams, useNavigate } from "react-router-dom";
import { Input } from "../../../components/admin/Input";

export function Vaccines() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  return (
    <ChakraProvider>
      <Flex width="100vw" height="100vh" bgColor="white" direction="column">
        <Flex w="100%" height="10vh" bgColor="gray.200">
          <Flex align="center" gap="2">
            <Text m="2" fontSize="2xl" fontWeight="bold">
              Vacinas
            </Text>
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
              onClick={() => navigate(`/Vets/Workspace/${id}`)}
            >
              Voltar
            </Button>
          </Flex>
        </Flex>
        <Flex height="90vh" w="100%"> 
        <Flex direction="column" height="100%" width="60%" bgColor="gray.100">
            <Flex height="40%" width="100%" direction="column">
                <TableContainer width="100%" height="100%" overflowY="auto">
                <Table>
                    <Thead>
                        <Tr>
                            <Th>DATA</Th>
                            <Th>Vacinas do Animal / Imprimir Programação</Th>
                            <Th>Valor</Th>
                            <Th>Compor</Th>
                            <Th>Exclusão</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        <Tr border="2px">
                            <Td></Td>
                            <Td></Td>
                            <Td></Td>
                            <Td></Td>
                            <Td></Td>
                        </Tr>
                    </Tbody>
                </Table>
                </TableContainer>   
            </Flex> 
            <Flex height="60%" width="100" direction="column">
                 <Flex width="100%" height="48px" bgColor="gray.300" p="2" align="center" justify="center">
                    <Button colorScheme="whatsapp">INCLUIR VACINA</Button>
                    <Flex align="center" gap="2" p="4">
                         <Button colorScheme="teal">FILTRAR</Button>
                        <Input name="filter"   />
                       
                    </Flex>
                </Flex>
                <TableContainer w="100%" h="100%" overflowY="auto">
                    <Table>
                        <Thead>
                            <Tr bgColor="cyan.100">
                                <Th>VACINAS</Th>
                                <Th>ATÉ 6KG</Th>
                                <Th>7 A 15KG</Th>
                                <Th>16 A 35KG</Th>
                                <Th>35KG +</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            <Tr>
                                <Td>Anti rabica</Td>
                                <Td>R$60,00</Td>
                                <Td>R$60,00</Td>
                                <Td>R$60,00</Td>
                                <Td>R$60,00</Td>
                            </Tr>
                        </Tbody>
                    </Table>
                </TableContainer>
            </Flex>

        </Flex>
        <Flex height="100%" width="40%" bgColor="gray.200" direction="column">
            <Flex w="100%" bgColor="cyan.100" height="38px" align="center" justify="center" >
                <Text fontWeight="black" fontSize="lg" >VACINAS DO ANIMAL</Text>
            </Flex>
            <Flex bgColor="white" height="100%" w="100%">
                    <TableContainer height="100%" w="100%">
                        <Table colorScheme="blackAlpha">
                            <Thead>
                                <Tr>
                                    <Th>DATA</Th>
                                    <Th>VACINAS</Th>                                
                                    </Tr>
                            </Thead>
                            <Tbody>
                                <Tbody>
                                    <Tr>
                                        <Td></Td>
                                        <Td></Td>
                                    </Tr>
                                </Tbody>
                            </Tbody>
                        </Table>
                    </TableContainer>
            </Flex>

        </Flex>

        </Flex>
      </Flex>
    </ChakraProvider>
  );
}
