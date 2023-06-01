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

export function ShowBeds() {
  return (
      <ChakraProvider>
      <AdminContainer>
        <Flex direction="column" h="100vh">
          <Header title="Painel Internações" />
          <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
            <GenericSidebar>
              <GenericLink
                name="Pesquisar"
                icon={AiOutlineSearch}
                path="/Admissions"
              />
            </GenericSidebar>
          
            <SimpleGrid 
            flex="1"
            gap="4"
            minChildWidth="320px"
            align="flex-start" as={Flex}
            >
              <Flex 
              p="8"
              bg="gray.100"
              borderRadius={8}
             direction="column"
             align="center"

              >
                <Text fontSize="lg" mb="4">
                  Pet Love
                </Text>
                <Flex justify="center" wrap="wrap" gap={2}>
                        <Flex direction="column" align="center">
                            <Text>Ocupante: Vazio</Text>
                          <MdOutlineBedroomChild color='green' size={44}/>
                        </Flex>
                        <Flex direction="column" align="center">
                            <Text>Ocupante: Teddy</Text>
                          <MdOutlineBedroomChild color='red' size={44}/>
                        </Flex>
                        <Flex direction="column" align="center">
                            <Text>Ocupante: Vazio</Text>
                          <MdOutlineBedroomChild color='green' size={44}/>
                        </Flex>
                        <Flex direction="column" align="center">
                            <Text>Ocupante: Vazio</Text>
                          <MdOutlineBedroomChild color='green' size={44}/>
                        </Flex>
                        <Flex direction="column" align="center">
                            <Text>Ocupante: Vazio</Text>
                          <MdOutlineBedroomChild color='green' size={44}/>
                        </Flex>
                        <Flex direction="column" align="center">
                            <Text>Ocupante: Vazio</Text>
                          <MdOutlineBedroomChild color='green' size={44}/>
                        </Flex>
                  </Flex>
              </Flex>
              <Flex 
              p="8"
              bg="gray.100"
              borderRadius={8}
             direction="column"
             align="center"

              >
                <Text fontSize="lg" mb="4">
                 Internação
                </Text>
                <Flex justify="center" wrap="wrap" gap={2}>
                        <Flex direction="column" align="center">
                            <Text>Ocupante: Vazio</Text>
                          <MdOutlineBedroomChild color='green' size={44}/>
                        </Flex>
                        <Flex direction="column" align="center">
                            <Text>Ocupante: Vazio</Text>
                          <MdOutlineBedroomChild color='green' size={44}/>
                        </Flex>
                        <Flex direction="column" align="center">
                            <Text>Ocupante: Vazio</Text>
                          <MdOutlineBedroomChild color='green' size={44}/>
                        </Flex>
                        <Flex direction="column" align="center">
                            <Text>Ocupante: Vazio</Text>
                          <MdOutlineBedroomChild color='green' size={44}/>
                        </Flex>
                        <Flex direction="column" align="center">
                            <Text>Ocupante: Vazio</Text>
                          <MdOutlineBedroomChild color='green' size={44}/>
                        </Flex>
                        <Flex direction="column" align="center">
                            <Text>Ocupante: Vazio</Text>
                          <MdOutlineBedroomChild color='green' size={44}/>
                        </Flex>
                  </Flex>
              </Flex>
            </SimpleGrid>
 
            </Flex>
          </Flex>
        
      </AdminContainer>
    </ChakraProvider>
  )
}