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
import { CreateMedicineForm } from '../../components/Forms/CreateMedicineForm'

export function CreateMedicine() {
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
                path="/Medicines"
              />

              <GenericLink
                name="Incluir Medicamento"
                icon={GiHealthIncrease}
                path="/Vets/Menu"
              />
            </GenericSidebar>
            <Flex flex="1" maxHeight={800} borderRadius={8} align="center" justify="center" bg="gray.200" p="8">
          <CreateMedicineForm/>
    
            </Flex>
          </Flex>
        </Flex>
      </AdminContainer>
    </ChakraProvider>
  )
}