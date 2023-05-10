import {
  Flex,
  Box,
  SimpleGrid,
  ChakraProvider,
  Table,
  Thead,
  Tbody,
  Td,
  Th,
  Tr,
  Image,
  useFocusEffect
} from "@chakra-ui/react";
import { GenericLink, } from "../../components/Sidebars/GenericLink";
import { GenericSidebar } from "../../components/Sidebars/GenericSideBar";
import {BiLeftArrowAlt } from 'react-icons/all'
import { useParams } from "react-router-dom";
import { useState, useEffect} from 'react'
import { api } from "../../lib/axios";


interface Customer {
  name: string
}

interface PetProps {
  id: number
  name: string;
  especie: string;
  corPet: string;
  observations: string;
  race: string;
  rga: number;
  sizePet: string;
  weigth: string;
  sexo: string;
  status: string;
  bornDate: string;
  customer: Customer
}


export function DetailsPets() {
  const { id } = useParams<{ id: string }>();
  const [pets, setPets] = useState({} as PetProps)

  useEffect(() => {
    async function getPet () {
      try {
        const response  = await api.get(`/pets/${id}`)
        setPets(response.data)
      } catch (error) {
        console.log(error)
      }
  
    }
    getPet()
  },[pets.id])


  return (
    <ChakraProvider>
      <Flex direction="column" h="100vh">
        <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <GenericSidebar>
          <GenericLink name="Voltar recepção" path="/Recepcao/" icon={BiLeftArrowAlt} />
          <GenericLink name="Voltar proprietário" path={`/Recepcao/Consultas/Clientes/${id}`} icon={BiLeftArrowAlt} />
         </GenericSidebar>
          <SimpleGrid
            flex="1"
            gap="4"
            minChildWidth="320px"
            align="flex-start"
            as={Flex}
          >
            <Box textAlign="center" p="8" bg="gray.100" borderRadius={8}>
              <Flex mt="8" justify="center" direction="column">
   
                <Table colorScheme="blackAlpha">
                  <Thead>
                    <Tr>
                      <Th>Nome</Th>
                      <Th>Sexo</Th>
                      <Th>Raça</Th>
                      <Th>Especie</Th>
                      <Th>Data de Nascimento</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    <Tr>
                      <Td>{pets.name}</Td>
                      <Td>{pets.sexo}</Td>
                      <Td>{pets.race}</Td>
                      <Td>{pets.especie}</Td>
                      <Td>{pets.bornDate}</Td>
                    </Tr>
                  </Tbody>
                </Table>

                <Table colorScheme="blackAlpha">
                  <Thead>
                    <Tr>
                    <Th>Proprietario</Th>
                      <Th>Porte</Th>
                      <Th>Pedigree/RGA</Th>
              
                    </Tr>
                  </Thead>
                  <Tbody>
                    <Tr>
                      <Td>{pets.customer?.name}</Td>
                      <Td>{pets.sizePet}</Td>
                      <Td>{pets.rga}</Td>
                 
                    </Tr>
                  </Tbody>
                </Table>

                
              </Flex>
            </Box>
          </SimpleGrid>
        </Flex>
      </Flex>
    </ChakraProvider>
  );
}
