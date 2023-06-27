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
  Text,
  Button
} from "@chakra-ui/react";
import { GenericLink, } from "../../components/Sidebars/GenericLink";
import { GenericSidebar } from "../../components/Sidebars/GenericSideBar";
import {BiHome, BiLeftArrowAlt, TbArrowBack } from 'react-icons/all'
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect} from 'react'
import { api } from "../../lib/axios";
import { MedicineContainer } from "./style";


interface Customer {
  id: string | number;
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
  customerName: string;
  codPet: string;
}


export function MedicineRecords() {
  const { id } = useParams<{ id: string }>();
  const [pets, setPets] = useState({} as PetProps);
  const navigate = useNavigate();

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
      <Flex direction="column" h="100vh" w="100vw">
      <Flex w="100%" height="10vh" bgColor="gray.200">  
           <Flex align="center" gap="2" >
          <Text m="2" fontSize="2xl" fontWeight="bold">Prontuário</Text>
          <Button colorScheme="teal" leftIcon={<BiHome size={24}/>}
          onClick={() => navigate('/Home')}
          >Home</Button>

          <Button colorScheme="yellow" leftIcon={<TbArrowBack size={24}/>}
          onClick={() => navigate(`/Vets/Workspace/${id}`)}
          >Voltar</Button>
          </Flex>
      </Flex>


      <MedicineContainer>
        <Flex direction="column">
        <Flex w="100%" h="30%"  direction="row" justify="space-evenly" border="2px" rounded={4} align="center" className="onemain">
          <Flex p="4" gap={4} w="100%" h="100%" direction="column">
            <Text height="38px" fontWeight="bold">
              Cliente
            </Text>
            <Text  height="68px"  fontWeight="bold">
              Pet
            </Text>
            <Text height="48px" fontWeight="bold">
              Código Único 
            </Text>
          </Flex>
          <Flex  p="4" gap={4} w="100%" h="100%" direction="column">
            <Text fontWeight="bold" w="300px" border="2px" rounded={8} height="38px" textAlign="center" bgColor="gray.100" >
             {pets.customerName}
            </Text>
            <Text  fontWeight="bold" w="300px" border="2px"  height="68px" rounded={8} bgColor="gray.100" textAlign="center" >
              {`Nome: ${pets.name}, Raça: ${pets.race}, Peso: ${pets.weigth}Kg's,  Sexo ${pets.sexo}, Cor: ${pets.corPet} `}
            </Text>

            <Text fontWeight="bold" w="300px" height="48px" border="2px" rounded={8} bgColor="gray.100" textAlign="center" >
              {pets.codPet}
            </Text>
          </Flex>
        </Flex>
        <Flex  direction="column" w="100%" h="70%" bgColor="gray.100" border="2px" rounded={4}  className="secondmain">
          <Flex w="100%" h="10%" justify="space-evenly" m="2" >
            <Button colorScheme="whatsapp" >Consultas</Button>
            <Button colorScheme="whatsapp" >Internações</Button>
            <Button colorScheme="whatsapp" >Outra Unidade</Button>
          </Flex>
          <Flex h="90%"  w="100%" overflow="auto" >
          <Flex w="100%" h="88px" direction="column" border="2px" m="2">
            <Text border="2px" fontWeight="bold" w="100%" h="38px" bgColor="cyan.100" > 27/06/2023 - 17:30  Consulta ESP Dr Daniel Henrique</Text>
            <Text border="2px" fontWeight="bold"  w="100%" h="38px" bgColor="cyan.100"><span className="textSpan">Peso Época:</span> 5,9 Kgs</Text>
            <Text border="2px" fontWeight="bold"  w="100%" h="38px" bgColor="cyan.100">Observações: Não há observações registradas nessa consulta</Text>
          </Flex>
          </Flex>
        </Flex>
        </Flex>
     
        <Flex className="one"></Flex>
        <Flex className="two"></Flex>
        <Flex className="three"></Flex>
        <Flex className="four"></Flex>

      </MedicineContainer>
      </Flex>
    </ChakraProvider>
  );
}
