import {ChakraProvider, Flex, Table, Tr, Td, Th, Thead, Tbody, TableContainer, Button, Checkbox, HStack, Text } from "@chakra-ui/react"
import { BiHome } from "react-icons/bi";
import { TbArrowBack } from "react-icons/tb";
import { useNavigate, useParams } from "react-router-dom";
import { Input } from "../../../components/admin/Input";

export function VetExams () {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate()
  return (
    <ChakraProvider>
  <Flex width="100vw" height="100vh" bgColor="white" direction="column">
      <Flex w="100%" height="10vh" bgColor="gray.200">  
      <Flex align="center" gap="2" >
          <Text m="2" fontSize="2xl" fontWeight="bold">Exames Paciente</Text>
          <Button colorScheme="teal" leftIcon={<BiHome size={24}/>}
          onClick={() => navigate('/Home')}
          >Home</Button>

          <Button colorScheme="yellow" leftIcon={<TbArrowBack size={24}/>}
          onClick={() => navigate(`/Vets/Workspace/${id}`)}
          >Voltar</Button>
          </Flex>
      </Flex>

      <Flex w="100%" height="45vh" align="center" overflowY="auto">
        <TableContainer w="100%" height="100%">
        <Table>
          <Thead>
            <Tr bgColor="cyan.100" >
              <Th color="black" fontSize="1xl" border="2px" w="400px">
                NOME
              </Th>
              <Th   color="black" fontSize="1xl"  border="2px" w="200px">
                COLETA
              </Th>
              <Th  color="black" fontSize="1xl"  border="2px" w="200px">
                DATA
              </Th>
              <Th  color="black" fontSize="1xl"  border="2px" w="200px">
                REALIZADO ?
              </Th>

              <Th   color="black" fontSize="1xl"  border="2px" w="200px">
                EXCLUSÃO
              </Th>
              <Th   color="black" fontSize="1xl" border="2px" w="200px">
                ETIQUETA
              </Th>
            </Tr>

          </Thead>


          <Tbody>
            <Tr>
            <Td border="2px"  fontSize="1xl" fontWeight="bold" color="green.700">
               HEMOGRAMA COMPLETO
              </Td>
              <Td border="2px"  fontSize="1xl" fontWeight="bold">
                828
              </Td>
              <Td border="2px"  fontSize="1xl" fontWeight="bold">
                27/06/2023
              </Td>
              <Td border="2px"  fontSize="1xl" fontWeight="bold">
                PRONTO
              </Td>

              <Td border="2px"  fontSize="1xl" fontWeight="bold">
                --
              </Td>
              <Td border="2px"  fontSize="1xl" fontWeight="bold">
                ETIQUETA
              </Td>
            </Tr>
          </Tbody>
         </Table>
        </TableContainer>

   
      
      </Flex>

      <Flex w="100%" height="45vh"direction="column" >
          <Flex height="48px" w="100%" bgColor="cyan.100" align="center" justify="center" gap={4}>
             <HStack>  <Button colorScheme="teal" w="300px">FILTRAR POR NOME</Button> <Input height="38px" name="filter" /></HStack> <Button colorScheme="whatsapp">INCLUIR NOVO EXAME</Button>
          </Flex>
        <TableContainer w="100%" height="100%">
        <Table>
          <Thead>
            <Tr >
            <Th color="black" fontSize="1xl" border="2px" w="100px">
                SELECIONADO
              </Th>
              <Th color="black" fontSize="1xl" border="2px">
                NOME
              </Th>
              <Th   color="black" fontSize="1xl"  border="2px" w="200px">
                VALOR
              </Th>
              </Tr>
              </Thead>
              <Tbody>
                <Tr >
                  <Td border="2px">
                    <Checkbox borderColor="black" size="lg" />
                  </Td>
                  <Td  border="2px">
                    Exemplo 1
                  </Td>
                  <Td  border="2px">
                   R$ 299,99
                  </Td>
                </Tr>
              </Tbody>
            </Table>
             </TableContainer>
         </Flex>
    </Flex>
    </ChakraProvider>
   
  )
}