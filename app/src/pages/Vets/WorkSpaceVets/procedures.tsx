import {ChakraProvider, Flex, Table, Tr, Td, Th, Thead, Tbody, TableContainer, Button, Checkbox, HStack, Text, Select } from "@chakra-ui/react";
import { useState } from "react";
import { BiHome } from "react-icons/bi";
import { TbArrowBack } from "react-icons/tb";
import { useNavigate, useParams } from "react-router-dom";
import { Input } from "../../../components/admin/Input";




export function ProceduresVet () {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [covenant, setCovenant] = useState("");
    let table;
    switch(true) {
      case covenant === "Particular":
      table = (
        <Table>
          <Thead>
            <Tr >
            <Th color="black" fontSize="1xl" border="2px" w="100px">
                SELECIONADO
              </Th>
              <Th color="black" bgColor="whatsapp.100" fontSize="1xl" border="2px">
                NOME - PARTICULAR
              </Th>
              <Th   color="black" fontSize="1xl"  border="2px" w="200px">
                VALOR POR PESO
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
      );
      break;
      case covenant === "Petlove": 
      table = (
        <Table>
          <Thead>
            <Tr >
            <Th color="black" fontSize="1xl" border="2px" w="100px">
                SELECIONADO
              </Th>
              <Th color="black" bgColor="yellow.100" fontSize="1xl" border="2px">
                NOME - PETLOVE
              </Th>
              <Th   color="black" fontSize="1xl"  border="2px" w="200px">
                VALOR POR PESO
              </Th>
              </Tr>
              </Thead>
              <Tbody>
                <Tr >
                  <Td border="2px">
                    <Checkbox borderColor="black" size="lg" />
                  </Td>
                  <Td  border="2px">
                    Petlove 1
                  </Td>
                  <Td  border="2px">
                   R$ 299,99
                  </Td>
                </Tr>
              </Tbody>
  </Table>
      )
      break;
      default: 
      table === (
        <Table>
        <Thead>
          <Tr >
          <Th color="black" fontSize="1xl" border="2px" w="100px">
              SELECIONADO
            </Th>
            <Th color="black" bgColor="whatsapp.100" fontSize="1xl" border="2px">
              NOME - PARTICULAR
            </Th>
            <Th   color="black" fontSize="1xl"  border="2px" w="200px">
              VALOR POR PESO
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
     
      )
      break;
    }
 

  return (
    <ChakraProvider>
      <Flex width="100vw" height="100vh" bgColor="white" direction="column">
      <Flex w="100%" height="10vh" bgColor="gray.200">  
      <Flex align="center" gap="2" >
          <Text m="2" fontSize="2xl" fontWeight="bold">Procedimentos</Text>
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
              <Th color="black" fontSize="1xl" border="2px" w="200px">
                Quantidade
              </Th>
              <Th   color="black" fontSize="1xl"  border="2px" w="200px">
                Procedimentos Já Concluidos
              </Th>
              <Th  color="black" fontSize="1xl"  border="2px" w="200px">
                Unitário
              </Th>
              <Th  color="black" fontSize="1xl"  border="2px" w="200px">
                Total
              </Th>

              <Th   color="black" fontSize="1xl"  border="2px" w="200px">
                Data
              </Th>
              <Th   color="black" fontSize="1xl" border="2px" w="200px">
                Compor
              </Th>
              <Th   color="black" fontSize="1xl" border="2px" w="200px">
                Exclusão
              </Th>
            </Tr>

          </Thead>


          <Tbody>
            <Tr>
            <Td border="2px"  fontSize="1xl" fontWeight="bold" color="green.700">
               1
              </Td>
              <Td border="2px"  fontSize="1xl" fontWeight="bold">
              HEMOGRAMA COMPLETO
              </Td>
              <Td border="2px"  fontSize="1xl" fontWeight="bold">
                R$ 130,00
              </Td>
              <Td border="2px"  fontSize="1xl" fontWeight="bold">
              R$ 130,00
              </Td>

              <Td border="2px"  fontSize="1xl" fontWeight="bold">
                27/06/2023
              </Td>
              <Td border="2px"  fontSize="1xl" fontWeight="bold">
                --
              </Td>
                <Td border="2px"  fontSize="1xl" fontWeight="bold">
                --
              </Td>
            </Tr>
          </Tbody>
         </Table>
        </TableContainer>

   
      
      </Flex>

      <Flex w="100%" height="45vh"direction="column" >
          <Flex height="48px" w="100%" bgColor="cyan.100" align="center" justify="center" gap={4}>
            <HStack>
              <Select onChange={ev => setCovenant(ev.target.value)} borderColor="black" bgColor="gray.100">
              <option value="Particular">Particular</option>
             <option value="Petlove">Petlove</option>
              </Select>
            </HStack>
             <HStack>  <Button colorScheme="teal" w="300px">FILTRAR POR NOME</Button> <Input h="38px" name="filter" /></HStack> <Button colorScheme="whatsapp">INCLUIR NOVO PROCEDIMENTO</Button>
          </Flex>
            <TableContainer w="100%" height="100%">
              <>{table}</>
             </TableContainer>
         </Flex>
    </Flex>
    </ChakraProvider>
   
  )
}