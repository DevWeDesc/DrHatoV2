import {
  Box,
  ChakraProvider,
  Flex,
 List,
 ListIcon,
 ListItem,
 Divider,
 Center,
 Text
} from '@chakra-ui/react'
import { Header } from '../../components/admin/Header'
import { GenericLink } from '../../components/Sidebars/GenericLink'
import { GenericSidebar } from '../../components/Sidebars/GenericSideBar'
import {  MdOutlineListAlt,GiHealthIncrease, BsArrowLeft, MdCheckCircle, FcCancel } from 'react-icons/all'
import { AdminContainer } from '../AdminDashboard/style'

export function Medicines() {
  return (
      <ChakraProvider>
      <AdminContainer>
        <Flex direction="column" h="100vh">
          <Header title="Painel Medicamentos" />
          <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
            <GenericSidebar>
              <GenericLink
                name="Voltar"
                icon={BsArrowLeft}
                path="/Home/"
              />
               <GenericLink
                name="Lista de Medicamentos"
                icon={MdOutlineListAlt}
                path="/Home/Medicines"
              />

              <GenericLink
                name="Incluir Medicamento"
                icon={GiHealthIncrease}
                path="/Home/Medicines/Create"
              />

            </GenericSidebar>
            <Flex flex="1"   borderRadius={8}  justify="center" bg="gray.200" p="8">
            
          <Flex  w="100%" justify="center">
            <Flex m={4} align="center" gap="4" minWidth={400} direction="column">
              <Text fontSize={22} fontWeight="bold">
                Silvestre
              </Text>
            <List spacing={3}>
            <ListItem>
              <ListIcon as={MdCheckCircle} color='green.500' />
             Antibióticos
            </ListItem>
            <ListItem>
              <ListIcon as={MdCheckCircle} color='green.500' />
           Anti-inflamatórios / Analgésicos
            </ListItem>
            <ListItem>
              <ListIcon as={MdCheckCircle} color='green.500' />
            Antimicóticos
            </ListItem>
          </List>
            </Flex>
            
        <Center bgColor="green" height='400px'>
          <Divider orientation='vertical' />
        </Center>
            <Flex m={4} align="center" gap="4"  minWidth={400} direction="column">
            <Text fontSize={22} fontWeight="bold">
               Medicamentos
              </Text>
            <List spacing={3}>
            <ListItem>
              <ListIcon as={MdCheckCircle} color='green.500' />
             Exemplo 1
            </ListItem>
            <ListItem>
              <ListIcon as={MdCheckCircle} color='green.500' />
             Exemplo 2
            </ListItem>
            <ListItem>
              <ListIcon as={FcCancel} color='green.500' />
             Exemplo 3 fora de Estoque
            </ListItem>
          </List>
            </Flex>
          </Flex>
            </Flex>
          </Flex>
        </Flex>
      </AdminContainer>
    </ChakraProvider>
  )
}