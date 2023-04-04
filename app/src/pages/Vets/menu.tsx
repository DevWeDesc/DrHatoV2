import {
  Box,
  ChakraProvider,
  Flex,
  Table,
  Tr,
  Td,
  Thead,
  Tbody,
  Th
} from '@chakra-ui/react'
import { Header } from '../../components/admin/Header'
import { SearchComponent } from '../../components/Search'
import { GenericLink } from '../../components/Sidebars/GenericLink'
import { GenericSidebar } from '../../components/Sidebars/GenericSideBar'
import { AiOutlineSearch } from 'react-icons/all'
import { AdminContainer } from '../AdminDashboard/style'

export function MenuVet() {
  return (
    <ChakraProvider>
      <AdminContainer>
        <Flex direction="column" h="100vh">
          <Header title="Painel Veterinário" />
          <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
            <GenericSidebar>
              <GenericLink
                name="Pesquisar Cliente"
                icon={AiOutlineSearch}
                path="/Home/Vets/Menu"
              />
            </GenericSidebar>
            <Box flex="1" borderRadius={8} bg="gray.200" p="8">
              <Flex mb="8" gap="8" direction="column" align="center">
                <SearchComponent />
                <Flex  textAlign="center" justify="center">
                  <Table colorScheme="blackAlpha">
                    <Thead>
                      <Tr>
                        <Th>Tipo</Th>
                        <Th>Cliente</Th>
                        <Th>Animal</Th>
                        <Th>Código</Th>
                        <Th>Data</Th>
                        <Th>Hora</Th>
                        <Th>Preferência</Th>
                        <Th>Especialidade</Th>
                      </Tr>
                    </Thead>

                    <Tbody>
                      <Tr>
                        <Td>Telefone</Td>
                        <Td>Caroline Paschoal</Td>
                        <Td>Manolo</Td>
                        <Td>92487</Td>
                        <Td>  04/04/2023</Td>
                      
                        <Td>25:53</Td>
                        <Td>Sem Preferência</Td>
                        <Td>0</Td>
                      </Tr>
                    </Tbody>
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
