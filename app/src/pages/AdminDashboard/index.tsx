import { AdminContainer } from "./style";
import { Box, Button, ChakraProvider, SimpleGrid, Text, theme } from '@chakra-ui/react'
import { Flex } from "@chakra-ui/react"

import { Header } from "../../components/admin/Header";
import { Sidebar } from "../../components/admin/Sidebar";
import { Link } from "react-router-dom";




export function AdminMain() {
  
  return (
    <ChakraProvider>
      <AdminContainer>
        <Flex direction="column" h="100vh">
        <Header title="Painel Administrativo" />

        <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
            <Sidebar />

            <SimpleGrid 
            flex="1"
            gap="4"
            minChildWidth="320px"
            align="flex-start" as={Flex}
            >
              <Flex wrap="wrap" gap="4">
                <Link to="/Admin/Autorizations">
                <Button colorScheme="whatsapp">Cadastro de Autorizações</Button>
                </Link>
                <Link to="/Admin/Instructions">
                <Button colorScheme="whatsapp">Cadastro de Instruções</Button>
                </Link>
                
               
                 <Link to="/Admin/Exams">
                 <Button colorScheme="whatsapp">Cadastro de Exames</Button>
                 </Link>
            
                
                 <Button colorScheme="whatsapp">Cadastro de Procedimentos</Button>
               
                 <Link to="/Admin/">
                 <Button colorScheme="whatsapp">Cadastro de Setores</Button>
                 </Link>
                 <Button colorScheme="whatsapp">Cadastro de Vacinas</Button>

     
        
                 <Button colorScheme="whatsapp">Relatórios</Button>
         
              </Flex>
          
            </SimpleGrid>
        </Flex>
        </Flex>
    </AdminContainer>
    </ChakraProvider>
  )
}