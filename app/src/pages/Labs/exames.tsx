import {
  Box,
  Button,
  ChakraProvider,
  Flex,
  Table,
  Tbody,
  Td,
  Tr
} from '@chakra-ui/react'
import { Header } from '../../components/admin/Header'
import { useContext } from 'react'
import { GenericLink } from '../../components/Sidebars/GenericLink'
import { GenericSidebar } from '../../components/Sidebars/GenericSideBar'
import { AiOutlineMenu, BsArrowLeft, IoIosFlask, BsImages } from "react-icons/all"
import { AdminContainer } from '../AdminDashboard/style'
import { LabsSearch } from '../../components/Search/labsSearch'
import { DbContext } from '../../contexts/DbContext'

export function LabExames() {
  const { labData} = useContext(DbContext)
  return (
      <ChakraProvider>
      <AdminContainer>
        <Flex direction="column" h="100vh">
          <Header title="Painel Lab Exames" />
          <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
          <GenericSidebar>
          <GenericLink icon={BsArrowLeft}  name='Voltar' path="/Home"/>
          <GenericLink icon={AiOutlineMenu}  name='Menu' path="/Labs"/>
          <GenericLink icon={IoIosFlask}  name='Laboratório' path="/Labs/Exames"/>
          <GenericLink icon={BsImages}  name='Laboratório Imagens' path="/Labs/Imagens"/>

           

        
          </GenericSidebar>
            <Box flex="1" borderRadius={8} bg="gray.200" p="8">
              <Flex mb="8" gap="8" direction="column" align="center">
                <LabsSearch path='labsearch'/>
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
                    <Tbody>
                    {
                      labData ? labData.map((exam: any) => (
                        <Tr>
                          <Td>
                            {exam.data}
                          </Td>
                          <Td>
                            {exam.petName}
                          </Td>
                          <Td>
                            {exam.name}
                          </Td>
                          <Td>
                            Empty
                          </Td>
                          <Td>
                            Empty
                          </Td>
                          <Td>
                            <Button colorScheme="green">Etiqueta</Button>
                          </Td>

                        </Tr>
                      )) : ( <Tr>

                        </Tr>)
                     
                    }

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