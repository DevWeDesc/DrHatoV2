import {
  Box,
  ChakraProvider,
  Flex,
  Table,
  Td,
  Tr
} from '@chakra-ui/react'
import { Header } from '../../components/admin/Header'
import { SearchComponent } from '../../components/Search'
import { GenericLink } from '../../components/Sidebars/GenericLink'
import { GenericSidebar } from '../../components/Sidebars/GenericSideBar'
import { AiOutlineMenu, BsArrowLeft, IoIosFlask, BsImages } from "react-icons/all"
import { AdminContainer } from '../AdminDashboard/style'

export function LabExames() {
  return (
      <ChakraProvider>
      <AdminContainer>
        <Flex direction="column" h="100vh">
          <Header title="Painel Lab Exames" />
          <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
          <GenericSidebar>
          <GenericLink icon={BsArrowLeft}  name='Voltar' path="/Home"/>
          <GenericLink icon={AiOutlineMenu}  name='Menu' path="/Home/Labs"/>
          <GenericLink icon={IoIosFlask}  name='Laboratório' path="/Home/Labs/Exames"/>
          <GenericLink icon={BsImages}  name='Laboratório Imagens' path="/Home/Labs/Imagens"/>

           

        
          </GenericSidebar>
            <Box flex="1" borderRadius={8} bg="gray.200" p="8">
              <Flex mb="8" gap="8" direction="column" align="center">
                <SearchComponent />
                <Flex  textAlign="center" justify="center">
                  <Table colorScheme="blackAlpha">
                    <Tr>
                      <Td>Data Solicitação</Td>
                      <Td>Animal</Td>
                      <Td>Exame</Td>
                      <Td>Veterinário</Td>
                      <Td>Responsável</Td>
                      <Td>Imprimir</Td>

                    </Tr>
                  </Table>
                </Flex>
              </Flex>
            </Box>
          </Flex>
        </Flex>
      </AdminContainer>
    </ChakraProvider>
  )
}