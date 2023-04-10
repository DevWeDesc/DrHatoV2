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
                <Link to="/Home/Admin/Autorizations">
                <Button colorScheme="whatsapp">Cadastro de Autorizações</Button>
                </Link>
                 
                 <Button colorScheme="whatsapp">Cadastro de Instruções</Button>
                 <Button colorScheme="whatsapp">Cadastro de Canis</Button>
                 <Button colorScheme="whatsapp">Cadastro de Centro Cirúrgico</Button>
                 <Button colorScheme="whatsapp">Cadastro de Especialidades</Button>
                 <Button colorScheme="whatsapp">Cadastro de Exames</Button>
                 <Button colorScheme="whatsapp">Cadastro de Malas Diretas</Button>
                 <Button colorScheme="whatsapp">Cadastro de Procedimentos</Button>
                 <Button colorScheme="whatsapp">Cadastro de Raças</Button>
                 <Button colorScheme="whatsapp">Cadastro de Setores</Button>
                 <Button colorScheme="whatsapp">Cadastro de Vacinas</Button>
                 <Button colorScheme="whatsapp">Cadastro de Origem</Button>
                 <Button colorScheme="whatsapp">Vouchers</Button>
                 <Button colorScheme="whatsapp">Opções do Sistema</Button>
                 <Button colorScheme="whatsapp">Usuários</Button>
                 <Button colorScheme="whatsapp">Tipos de Pagamento</Button>
                 <Button colorScheme="whatsapp">Tipos de Procedimentos</Button>
                 <Button colorScheme="whatsapp">Adicionar Tipos de Procedimentos</Button>
                 <Button colorScheme="whatsapp">Compêndio de Medicamentos</Button>
                 <Button colorScheme="whatsapp">Permissões de tipos de Eventos</Button>
                 <Button colorScheme="whatsapp">Unificação de Clientes</Button>
                 <Button colorScheme="whatsapp">Unificação de Animais</Button>
                 <Button colorScheme="whatsapp">Relatórios</Button>
                 <Button colorScheme="whatsapp">Consulta Opinião</Button>
                 <Button colorScheme="whatsapp">Protocolos</Button>
              </Flex>
          
            </SimpleGrid>
        </Flex>
        </Flex>
    </AdminContainer>
    </ChakraProvider>
  )
}