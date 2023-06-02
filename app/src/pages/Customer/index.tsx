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
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { StyledBox } from "../../components/Header/style";
import { ReceptionSidebar } from "../../components/Sidebars/ReceptionBar";
import { AiFillTags, MdPets as Burger } from "react-icons/all";

import { api } from "../../lib/axios";
import { WorkSpaceContent } from "../Vets/styles";
import { PetProps } from "../Pets/details";

interface CustomerProps {
  name: string;
  adress: string;
  phone: string;
  cpf: number;
  email: string;
  balance: number;
  birthday: string | number;
  cep: string
  pets: [];
  tell: string;
  rg: string;
}

export function Customer() {
  const { id } = useParams<{ id: string }>();
  const [customer, setCustomer] = useState<CustomerProps>({
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
              <Button mb="2" colorScheme="teal" height="28px">ou adicione um novo animal</Button>
              <Flex overflow="auto">
                <Table>
                  <Thead bgColor="linkedin.100" border="2px">
                    <Tr>
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
                      <Td fontWeight="bold">
                        Etiqueta
                      </Td>
                    </Tr>
                  </Thead>
                  {

                     customer.pets ? customer.pets.map((pet: PetProps) => (
                      <Tbody>
                      <Tr bgColor="white" height="22px">
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
              <Flex gap={4} align="center" justify="center">
                <Flex direction="column">  
                  <Text>SELECIONAR VETERINARIO</Text>
                  <Button colorScheme="whatsapp">DANIEL</Button>

                </Flex>
                
                <Flex direction="column">  
                  <Text>SELECIONAR ATENDIMENTO</Text>
                  <Button colorScheme="whatsapp">RETORNO</Button>

                </Flex>
                <Button colorScheme="linkedin">GRAVAR</Button>

              </Flex>
               
                  
            </Flex>
        </WorkSpaceContent>
        </Flex>
      </Flex>
    </ChakraProvider>
  );
}
