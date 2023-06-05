import {
  ChakraProvider,
  Flex,
  Table,
  Tbody,
  Thead,
  Td,
  Tr,
  Th,
  Heading,
  Text,
  Button
} from "@chakra-ui/react";
import { RiArrowGoBackLine } from "react-icons/all";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../lib/axios";
import { toast } from "react-toastify";





interface PetsInQueue {
  id: number | string;
  name: string;
  customerName: string;
  race: string;
  codPet: string;
 queueEntry: string;
 queryType: string;
 vetPreference: string;
}

export function QueueSistem() {
const [petsInQueue, setPetsInQueue] = useState<PetsInQueue[]>([])

  useEffect(() => {
    async function GetPetQueue() {
      try {
        const response = await api.get("http://localhost:5000/pets/queue")
        setPetsInQueue(response.data)
      } catch (error) {
        toast.error("Falha ao carregar Fila.")
      }
    }

    GetPetQueue()
  }, [])

  console.log(petsInQueue)
  return (
    <ChakraProvider>
      <Flex m="2" justify="center" direction="column" textAlign="center" w="100vw">

        <Flex justify="space-between" margin="4" align="center">
        <Heading fontSize={28} color="cyan.700">
          Sistema de filas
        </Heading>{" "}


        <Text fontWeight="bold" fontSize="2xl">Fila de Atendimento</Text>
        <Link to="/Home">
  
            <Button leftIcon={<RiArrowGoBackLine />} colorScheme="teal">Voltar</Button> 
  
        </Link>
        </Flex>
   
        <Flex gap="2" >
         
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
                {
                  petsInQueue != null ? petsInQueue.map((pet) => (
                      <Tr key={pet.id}>
                      <Td color="black">{pet.queryType}</Td>  
                      <Td>{pet.name}</Td>
                      <Td>{pet.customerName}</Td>
                      <Td>{pet.race}</Td>
                      <Td>{pet.queueEntry ? pet.queueEntry : "Sem data definida" }</Td>
                      <Td>{pet.codPet}</Td>
                      <Td>{pet.vetPreference ? pet.vetPreference : "Sem Preferência"}</Td>
                      <Td>FILA AZUL</Td>
                    </Tr>
                    
                  )) : (
                    <Tr>
                  <Td>Empty</Td>
                  <Td>Empty</Td>
                  <Td>Empty</Td>
                  <Td>Empty</Td>
                  <Td>Empty</Td>
                  <Td>Empty</Td>
                  <Td>Empty</Td>
                  <Td>Empty</Td>
                </Tr>
                   )
                }
              </Tbody>
            </Table>
          </Flex>
    
      </Flex>
    </ChakraProvider>
  );
}
