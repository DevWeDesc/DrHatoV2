import {
  Box,
  ChakraProvider,
  Flex,
  Table
} from '@chakra-ui/react'
import { Header } from '../../components/admin/Header'
import { SearchComponent } from '../../components/Search'
import { GenericLink } from '../../components/Sidebars/GenericLink'
import { GenericSidebar } from '../../components/Sidebars/GenericSideBar'
import { AiOutlineMenu, BsArrowLeft, IoIosFlask, BsImages } from "react-icons/all"
import { AdminContainer } from '../AdminDashboard/style'

export function LabImagens() {
  return (
      <ChakraProvider>
      <AdminContainer>
        <Flex direction="column" h="100vh">
          <Header title="Painel Lab Imagens" />
          <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
          <GenericSidebar>
          <GenericLink icon={BsArrowLeft}  name='Voltar' path="/Home"/>
          <GenericLink icon={AiOutlineMenu}  name='Menu' path="/Labs"/>
          <GenericLink icon={IoIosFlask}  name='Laboratório' path="/Labs/Exames"/>
          <GenericLink icon={BsImages}  name='Laboratório Imagens' path="/Labs/Imagens"/>
          </GenericSidebar>
            <Box flex="1" borderRadius={8} bg="gray.200" p="8">
              <Flex mb="8" gap="8" direction="column" align="center">
                <SearchComponent />
                <Flex  textAlign="center" justify="center">
                  <Table colorScheme="blackAlpha">
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