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
  
export function Admissions() {
    return (
        <ChakraProvider>
        <AdminContainer>
          <Flex direction="column" h="100vh">
            <Header title="Painel Internações" />
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
                          <Th>Proprietário</Th>
                          <Th>Animal</Th>
                          <Th>Espécie</Th>
                          <Th>Raça</Th>
                          <Th>Código</Th>
                          <Th>Canil</Th>
                          <Th>Leito</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        <Tr>
                          <Td>Ricardo Spera</Td>
                          <Td>Canina</Td>
                          <Td>Bulldog</Td>
                          <Td>05/04/2023</Td>
                          <Td>129707</Td>
                          <Td>Internação Semi-Intensiva</Td>
                          <Td>137</Td>
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