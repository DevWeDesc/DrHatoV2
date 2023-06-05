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
  Button,
  Text,
  Checkbox,
  HStack,
  FormControl,
} from "@chakra-ui/react";
import { GenericLink, } from "../../components/Sidebars/GenericLink";
import { GenericSidebar } from "../../components/Sidebars/GenericSideBar";
import {BiLeftArrowAlt } from 'react-icons/all'
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect} from 'react'
import { api } from "../../lib/axios";
import { GenericModal } from "../../components/Modal/GenericModal";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Input } from "../../components/admin/Input";



type Customer = {
  id: number;
  name: string;
  balance: number;
}
 type queueProps = {
  id: number | string;
  returnQueue?: boolean,
  serviceQueue?: boolean
}
export interface PetProps {
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
  queue: queueProps
}


export function DetailsPets() {
  const { id } = useParams<{ id: string }>();
  const [pets, setPets] = useState({} as PetProps)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { register, handleSubmit } = useForm()
  const navigate = useNavigate()

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
  },[])

  function openModal() {
    setIsModalOpen(true);
  }
  function closeModal() {
    setIsModalOpen(false);
  }
const PetIsInQueue = pets.queue ? pets.queue : false
let  petIsInQueue
//@ts-ignore
if(PetIsInQueue.returnQueue === true || PetIsInQueue.serviceQueue === true) {
  petIsInQueue = "SIM"
} else {
  petIsInQueue = "NÃO"
}
 


  return (
    <ChakraProvider>
      <Flex direction="column" h="100vh">
        <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <GenericSidebar>
          <GenericLink name="Voltar recepção" path="/Recepcao/" icon={BiLeftArrowAlt} />
          <GenericLink name="Voltar proprietário" path={`/Recepcao/Consultas/Clientes/${pets.customer?.id}`} icon={BiLeftArrowAlt} />
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
                <Flex direction="column" align='center' gap="2">

                  <Flex justify="space-between" w="100%">

                  <div>
                  <Button colorScheme="whatsapp" maxWidth={300}
                onClick={() => navigate(`/Pets/MedicineRecord/${pets.id}`)}
                >Prontuário</Button>
                <Text mb="4">Veja o histórico do Pet no prontuário</Text>
                  </div>

                  <div>
                  <Button colorScheme="orange" maxWidth={300}
                    onClick={() => openModal()}
                >Colocar na Fila</Button>
                <Text mb="4">Coloque o pet na fila de Atendimento</Text>
                  </div>

                  </Flex>
          
              
                </Flex>
                
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
                    <GenericModal
                      isOpen={isModalOpen}
                      onRequestClose={closeModal}
 
                    >
                      <FormControl   as="form"
                  onSubmit={handleSubmit(handleSetFile)}>
                      <Flex direction="column" width={300} height={300} align="center" p="4">
                      <Text fontSize="lg" mb="4" fontWeight="bold">Qual Fila? </Text>

                                  <HStack m="2">
                                  <label>
                                    Fila de Atendimento
                                  </label>
                                  <Checkbox {...register("returnQueue")} name="returnQueue"/>

                                  </HStack>


                                  <HStack m="2">
                                  <label>
                                    Fila de Retorno
                                  </label>
                                  <Checkbox {...register("serviceQueue")} name="serviceQueue"/>

                                  </HStack>
                            <Input label="Tipo de Atendimento" mt="2" {...register("queryType")} name="queryType"/>
                      <Button mt="4" type="submit" colorScheme="whatsapp">Enviar a Fila</Button>
                      </Flex> 
                      </FormControl>
                      
                    
                    </GenericModal>
                <Table colorScheme="blackAlpha">
                  <Thead>
                    <Tr>
                    <Th>Proprietario</Th>
                      <Th>Porte</Th>
                      <Th>Pedigree/RGA</Th>
                      <Th>
                        Está em Fila?
                      </Th>
              
                    </Tr>
                  </Thead>
                  <Tbody>
                    <Tr>
                      <Td>{pets.customer?.name}</Td>
                      <Td>{pets.sizePet}</Td>
                      <Td>{pets.rga}</Td>
                      <Td>{petIsInQueue}</Td>
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
