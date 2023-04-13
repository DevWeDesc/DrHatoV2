import { ChakraProvider,Flex,Table,Tbody, Thead, Td, Tr, Th, Heading, Text } from 
"@chakra-ui/react"
import {RiArrowGoBackLine} from 'react-icons/all'
import { Link } from "react-router-dom"
export function QueueSistem() {
  return (
    <ChakraProvider>
            <Flex m='2' justify="center" direction="column" textAlign="center">
              <Heading m="1" pb="2" fontSize={28
              } >Sistema de filas</Heading> <Link to="/Home"><Flex color="whatsapp.500" m="2" p="2" textAlign="center" align="center" gap="2"  direction="row"><Text>Voltar</Text> <RiArrowGoBackLine/></Flex></Link>
      <Table colorScheme="whatsapp">
          

                  <Thead>
                    <Tr>
                      <Th>Tipo</Th>
                      <Th>Cliente</Th>
                      <Th>Animal</Th>
                      <Th>Raça</Th>
                      <Th>Entrada</Th>
                      <Th>Codigo</Th>
                      <Th>Preferência</Th>
                      <Th>Prioridade</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    <Tr>
                      <Td>Consulta ESP</Td>
                      <Td>Elisangela</Td>
                      <Td>Maya</Td>
                      <Td>Canina</Td>
                      <Td>15/04</Td>
                      <Td>15745</Td>
                      <Td>Dr Daniel</Td>
                      <Td>FILA AZUL</Td>
                    </Tr>
                  </Tbody>
                </Table>
                </Flex>
    </ChakraProvider>
    
  )
}