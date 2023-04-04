import { Box, ChakraProvider, Flex } from '@chakra-ui/react'
import { Header } from '../../components/admin/Header'
import { Sidebar } from '../../components/admin/Sidebar'
import { CreateVetForm } from '../../components/Forms/CreateVetForm'

import { AdminContainer } from '../AdminDashboard/style'

export function CreateVet() {
  return (
    <ChakraProvider>
      <AdminContainer>
        <Flex direction="column" h="100vh">
          <Header title='Painel Administrativo' />
          <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
            <Sidebar />
            <Box flex="1" borderRadius={8} bg="gray.200" p="8">
              <Flex mb="8" justify="space-between" align="center">
                <CreateVetForm />
              </Flex>
            </Box>
          </Flex>
        </Flex>
      </AdminContainer>
    </ChakraProvider>
  )
}
