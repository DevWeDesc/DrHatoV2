import {
  Text,
  Flex,
  Box,
  SimpleGrid,
  ChakraProvider,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Menu,
  MenuButton,
  MenuList,
  Button,
  HStack,
  Textarea,
  RadioGroup,
  Radio,
} from "@chakra-ui/react";
import { useEffect, useState, useContext } from "react";
import { StyledBox } from "../../components/Header/style";
import { ReceptionSidebar } from "../../components/Sidebars/ReceptionBar";
import { AiFillTags, MdPets as Burger } from "react-icons/all";
import { toast } from "react-toastify";
import moment from 'moment';
import { useNavigate, useParams, Link } from "react-router-dom";
import { api } from "../../lib/axios";
import { WorkSpaceContent } from "../Vets/styles";
import { PetProps } from "../Pets/details";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { DbContext } from "../../contexts/DbContext";


interface CustomerProps {
  id: string | number;
  name: string;
  adress: string;
  phone: string;
  cpf: number;
  email: string;
  balance: number;
  birthday: string | number;
  cep: string
  pets: PetProps[];
  tell: string;
  rg: string;
}

export function Customer() {
  const { id } = useParams<{ id: string }>();
  const  navigate = useNavigate()
  const { vets } = useContext(DbContext)
  const [petId, setPetId] = useState("")
  const [queryType, setQueryType] = useState("")
  const [vetPreference, setVetPreference] = useState("")
  const [customer, setCustomer] = useState<CustomerProps>({
    id: "",
    name: "",
    adress: "",
    email: "",
    cpf: 0,
    birthday: "",
    phone: "",
    cep: "",
    balance: 0,
    pets: [],
    tell: "",
    rg: ""
  });


  useEffect(() => {
    async function loadCustomer() {
      const response = await api.get(`/customers/${id}`);
      setCustomer(response.data);
    }
    loadCustomer();
  }, [id]);
  
async function setPetInQueue () {


  if(queryType == "" || petId == "" || vetPreference == ""){
    toast.error(`Antes de colocar o Pet na Fila e necessário selecionar todos campos obrigatórios\n
    1. Selecione o Pet\n,
    2. Selecione o Tipo de Atendimento\n
    3. Selecione o Veterinário`)
  }

  try {
    const formattedData = new Date()
    const processData = new Intl.DateTimeFormat().format(formattedData)

    const data = {
      vetPreference: vetPreference,
      queryType: queryType,
      queueEntry: processData,
      petIsInQueue: true
    }


    await api.put(`queue/${petId}`, data)
    toast.success('Pet colocado na fila com sucesso!') 
  } catch (error) {
    toast.error('Falha ao colocar na fila')
  }
}




  return (
    <ChakraProvider>
      <Flex direction="column" h="100vh">
        <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
          <ReceptionSidebar />
        
        <WorkSpaceContent>
        <Flex  direction="column"  bgColor="gray.100" rounded={4} p="4" className="div1" justify="center" >
     
          <HStack>
          <Flex direction="column"   gap={2}>
                  <Text fontWeight="bold" >Cliente:</Text>
                  <Text fontWeight="bold" >E-mail:</Text>
                  <Text fontWeight="bold" >Endereço:</Text>
                  <Text fontWeight="bold" >Telefone:</Text>
                  <Text fontWeight="bold" >Celular:</Text>
                  <Text fontWeight="bold" >CPF / CNPJ:</Text>
                  <Text fontWeight="bold" >R.G / I.E:</Text>

              </Flex>

              <Flex direction="column" gap={2}>
                  <Text fontWeight="black"  bgColor="white" width="400px" rounded={4} >{customer.name}</Text>
                  <Text fontWeight="black" bgColor="white" width="400px" rounded={4}  >{customer.email}</Text>
                  <Text fontWeight="black" bgColor="white" width="400px" rounded={4}  >{customer.adress}</Text>
                  <Text fontWeight="black" bgColor="white" width="400px" rounded={4}  >{customer.tell ? customer.tell : "Não informado"}</Text>
                  <Text fontWeight="black" bgColor="white" width="400px" rounded={4}  >{customer.phone}</Text>
                  <Text fontWeight="black" bgColor="white" width="400px" rounded={4}  >{customer.cpf}</Text>
                  <Text fontWeight="black" bgColor="white" width="400px" rounded={4}  >{customer.rg ? customer.rg : "Não informado"}</Text>
               
                 
              </Flex>
          </HStack>
          
              <HStack mt="4" >

<Button colorScheme="whatsapp">Editar</Button>     <Button colorScheme="whatsapp">Historico</Button>

</HStack>

            </Flex>



            <Flex  direction="column"  bgColor="gray.100" rounded={4} p="2" className="div2" align="center" textAlign="center" >
              <Text fontWeight="black" bgColor="green.100" width="500px" rounded={4}  >SELECIONE UM ANIMAL PARA CONTINUAR</Text>
              <Button onClick={() => navigate(`/Recepcao/Consultas/Clientes/Pets/Create/${customer.id}`)} mb="2" colorScheme="teal" height="28px">ou adicione um novo animal</Button>
              <Flex overflow="auto" overflowX="auto" w="100%" height="100%">
             
                <Table  flexDirection="column" >
                  
                  <Thead >
                    <Tr>
                      <Td fontWeight="bold" border="2px">
                        Selecione o pet
                      </Td>
                      <Td fontWeight="bold" border="2px">
                        Nome 
                      </Td>
                      <Td fontWeight="bold" border="2px">
                        Especie
                      </Td>
                      <Td fontWeight="bold" border="2px">
                        Raça
                      </Td >
                      <Td fontWeight="bold" border="2px">
                        Idade
                      </Td>
                      <Td fontWeight="bold"  border="2px">
                        Etiqueta
                      </Td>
                    </Tr>
                  </Thead>
                  {

                     customer.pets ? customer.pets.map((pet: PetProps) => (
                      <Tbody  >
                      <Tr  key={pet.id} bgColor="white">
                        <Td >
                        <RadioGroup onChange={setPetId} value={petId}>
                        <Radio borderColor="teal.800"   colorScheme="green" value={pet.id.toString()} />
                        </RadioGroup>
                        </Td>
                        <Td fontWeight="black">
                         {pet.name}
                        </Td>
                        <Td  fontWeight="black" >
                          {pet.especie}
                        </Td>
                        <Td fontWeight="black">
                          {pet.race}
                        </Td>
                        <Td fontWeight="black">
                          {pet.bornDate}
                        </Td>
                        <Td>
                          <AiFillTags  size={28} color="green"/>
                        </Td>
                      </Tr>
                      
                    </Tbody>
                     )) : 
                     ( <Tbody>
                      <Tr>
                        <Td>
                          Sem pet cadastrado
                        </Td>
                        <Td>
                          Empty
                        </Td>
                        <Td>
                          Empty
                        </Td>
                        <Td>
                          Empty
                        </Td>
                        <Td>
                          Empty
                        </Td>
                      </Tr>
                    </Tbody>) 

                  }
                 

                </Table>
              </Flex>
     


            </Flex>


            <Flex  direction="column"  bgColor="gray.100" rounded={4} p="2" className="div3" align="center" textAlign="center" >
                  <Text>INFORMAÇÕES ADICIONAIS</Text>
                  <Textarea m="2" borderColor="gray.900" bgColor="white" height="80%"></Textarea>
            </Flex>

            <Flex  direction="column"  bgColor="gray.100" rounded={4} p="2" className="div4" align="center" textAlign="center" >
         
              <Flex gap={8} justify="center" w="100%" overflow="auto" height="100%">
                <Flex  direction="column" overflow="auto" height="100%" >  
                  <Text  mt="4" fontWeight="bold" pb="2">SELECIONAR VETERINARIO</Text>
                  
                      {
                        vets.map((vet) => (
                          <RadioGroup key={vet.id} onChange={setVetPreference} value={vetPreference}>
                            <Flex direction="column">   
                              
                              <Radio  mb="2"  borderColor="teal.800"   colorScheme="green"  value={vet.name.toString()}>{vet.name}</Radio>

                            </Flex>
                         
                          </RadioGroup>
                        ))
                      }
                </Flex>
                
                <Flex direction="column" overflow="auto" height="100%">  
                  <Text mt="4" fontWeight="bold" pb="2">SELECIONAR ATENDIMENTO</Text>
                  <RadioGroup  onChange={setQueryType} value={queryType}>
                    <Flex direction="column" >

                  <Radio mb="2"  borderColor="teal.800"   colorScheme="green" value='Avaliação'>Avaliação</Radio>
                  <Radio mb="2" borderColor="teal.800"   colorScheme="green"  value='Cancelar'>Cancelar</Radio>
                  <Radio mb="2" borderColor="teal.800"   colorScheme="green"  value='Consulta'>Consulta</Radio>
                  <Radio mb="2" borderColor="teal.800"   colorScheme="green"  value="Consulta ESP">Consulta ESP</Radio>
                  <Radio mb="2" borderColor="teal.800"   colorScheme="green"  value="Consulta PetLove">Consulta PetLove</Radio>
                  <Radio mb="2" borderColor="teal.800"   colorScheme="green"  value="Consulta Triagem">Consulta Triagem</Radio>
                  <Radio mb="2" borderColor="teal.800"   colorScheme="green"  value="Exame Externo">Exame Externo</Radio>
                  <Radio mb="2" borderColor="teal.800"   colorScheme="green"  value="Orientação">Orientação</Radio>
                  <Radio mb="2" borderColor="teal.800"   colorScheme="green"  value="Retorno ESP">Retorno ESP</Radio>
                  <Radio mb="2" borderColor="teal.800"   colorScheme="green"  value="Telefone">Telefone</Radio>
                    </Flex>
              
             
                    
                  </RadioGroup>

                </Flex>
             
              </Flex>
               
              <Button mt="2" m="4" onClick={() => setPetInQueue()} colorScheme="teal">GRAVAR</Button>
            </Flex>
        </WorkSpaceContent>
        </Flex>
      </Flex>
    </ChakraProvider>
  );
}
