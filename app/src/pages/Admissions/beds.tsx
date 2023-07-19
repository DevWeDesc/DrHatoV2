import {
  Box,
  ChakraProvider,
  Flex,
  Table,
  Tr,
  Td,
  Thead,
  Tbody,
  Th,
  SimpleGrid,
  Text
} from '@chakra-ui/react'
import { Header } from '../../components/admin/Header'
import { SearchComponent } from '../../components/Search'
import { GenericLink } from '../../components/Sidebars/GenericLink'
import { GenericSidebar } from '../../components/Sidebars/GenericSideBar'
import { FaHospital, AiOutlineSearch, MdOutlineBedroomChild } from 'react-icons/all'
import { AdminContainer } from '../AdminDashboard/style'
import { useState, useEffect} from 'react'
import { api } from '../../lib/axios'

type beds = {
 id: number,
 busy: boolean,
 fasting: boolean,
 petName?: string
}
interface Kennels {
  name: string
  beds: beds[]
  totalOcupedBeds: number
}


export function ShowBeds() {
  const [beds, setBeds] = useState<Kennels[]>([])

  async function GetAllBeds() {
    const response = await api.get("/admittedpet")
    setBeds(response.data)
  }
  useEffect(() => {

    GetAllBeds()
  },[])


  return (
            <SimpleGrid 
            flex="1"
            gap="4"
            minChildWidth="320px"
            align="flex-start" as={Flex}
            >
              {
                beds ? beds.map((bed) => (
                  <Flex 
                  p="8"
                  bg="gray.100"
                  borderRadius={8}
                 direction="column"
                 align="center"
    
                  >
                    <Text fontSize="lg" mb="4">
                     {bed.name}
                    </Text>
                    <Flex justify="center" wrap="wrap" gap={2}>

                      {bed.beds.map((bed) => (
                        <Flex  _hover={{bgColor: "cyan.100"}} borderColor="black" border="2px" rounded={8} direction="column" align="center" p="4">

                            <Flex direction="column" align="center" gap={4}>
                            <Text>{bed.petName ? bed.petName : "Vazio"}</Text>
                            <Text>Leito Nº {bed.id}</Text>
                            </Flex>

                      
                    {bed.busy === true ? (  <MdOutlineBedroomChild  color='red' size={44}/>) : (  <MdOutlineBedroomChild color='green' size={44}/>)}
                    </Flex>
                      ))}
                            
                      
                      </Flex>
                  </Flex>
                )) : ("Sem internações no momento!")
              }
              
            </SimpleGrid>
  )
}