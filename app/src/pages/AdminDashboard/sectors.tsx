import {
  Text,
  Box,
  Button,
  ChakraProvider,
  Flex,
  Heading,
  Icon,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  FormControl,
  HStack, CheckboxGroup,
  Checkbox
} from '@chakra-ui/react'
import { useContext, useEffect, useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { RiAddLine, RiPencilLine } from 'react-icons/ri'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { Header } from '../../components/admin/Header'
import { Paginaton } from '../../components/admin/Pagination'
import { Sidebar } from '../../components/admin/Sidebar'
import { LoadingSpinner } from '../../components/Loading'
import { DbContext } from '../../contexts/DbContext'
import { GenericModal } from '../../components/Modal/GenericModal'
import { AdminContainer } from '../AdminDashboard/style'
import { api } from '../../lib/axios'
import { toast } from 'react-toastify'
import { Input } from '../../components/admin/Input'


export function SectorsList() {
  const { sectors } = useContext(DbContext)
  const { register, handleSubmit } = useForm()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isModalOpenTwo, setIsModalOpenTwo] = useState(false)
  const navigate = useNavigate()

  function openModal() {
    setIsModalOpen(true)
  }
  function closeModal() {
    setIsModalOpen(false)
  }


  function openModalTwo() {
    setIsModalOpenTwo(true)
  }
  function closeModalTwo() {
    setIsModalOpenTwo(false)
  }




  const handleCreateSector: SubmitHandler<FieldValues> = async values => {
    try {
      const data = {
        name: values.name,
      }
      await api.post('sectors', data)
      toast.success('Setor criado com sucesso')
      navigate(0)
    } catch (error) {
      toast.error('Falha ao criar novo setor')
    }
  }

  async function handleDeleteSector(id: string | number) {
    const confirm = window.confirm("Deletar e uma operação irreversivel deseja mesmo continuar?")
    try {
      if(confirm === true) {
        await api.delete(`sectors/${id}`)
        toast.success('Setor deletdo com sucesso')
        navigate(0)
      }
    } catch (error) {
      toast.error('Falha ao criar novo setor')
    }
  }


  
  const handleEditSector: SubmitHandler<FieldValues> = async values => {
    try {
      const data = {
        name: values.name,
      }
      await api.put(`sectors/${values.id}`, data)
      toast.success('Setor editado com sucesso')
      navigate(0)
    } catch (error) {
      toast.error('Falha ao editar novo setor')
    }
  }






  return (
    <ChakraProvider>
      <AdminContainer>
        <Flex direction="column" h="100vh">
          <Header title="Exames" />

          <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
            <Sidebar />
            <Box flex="1" borderRadius={8} bg="gray.200" p="8">
              <Flex mb="8" justify="space-between" align="center">
                <Heading size="lg" fontWeight="normal">
                  Setores
                </Heading>

                <Button
                  as="a"
                  size="sm"
                  fontSize="sm"
                  colorScheme="green"
                  leftIcon={<Icon as={RiAddLine} />}
                  onClick={() => openModal()}
                >
                  Cadastrar novo Setor
                </Button>
              </Flex>

              <Table colorScheme="blackAlpha">
                <Thead>
                  <Tr>
                    <Th>Nome</Th>
                    <Th>Id do Setor</Th>
                  </Tr>
                  <Tr>

                  </Tr>
                </Thead>

                <Tbody>
                  {sectors ? (
                    sectors.map(sector => (
                      <Tr key={sector.id}>
                        <Td>
                          
                          
                            <Text fontWeight="bold" color="gray.800">
                              {sector.name}
                            </Text>
                          
                         
                        </Td>
                        <Td>{sector.id}</Td>
                       
                       

                        <Td>
                          
                            <Button
                              as="a"
                              size="sm"
                              fontSize="sm"
                              colorScheme="yellow"
                              leftIcon={<Icon as={RiPencilLine} />}
                              onClick={() => openModalTwo()}
                            >
                              Editar setor
                            </Button>
                       
                        </Td>
                        <Td>
                            <Button
                              as="a"
                              size="sm"
                              fontSize="sm"
                              colorScheme="red"
                              leftIcon={<Icon as={RiPencilLine} />}
                              onClick={() => handleDeleteSector(sector.id)}
                            >
                              Deletar Setor
                            </Button>
                        </Td>
                      </Tr>
                    ))
                  ) : (
                    <LoadingSpinner />
                  )}
                </Tbody>
              </Table>
              <GenericModal isOpen={isModalOpen} onRequestClose={closeModal}>
                <FormControl
                  as="form"
                  onSubmit={handleSubmit(handleCreateSector)}
                 display="flex"
                 flexDir="column"
                 alignItems="center"
                >
               
                    <Input
                      {...register('name')}
                      name="name"
                      label="Nome do Setor"
                      mb="4"
                    
                    />

                 
                   
                    <Button 
                      w="100%"
                    type="submit" colorScheme="green" m="2">
                      Cadastrar
                    </Button>
                 
                </FormControl>
              </GenericModal>


              <GenericModal isOpen={isModalOpenTwo} onRequestClose={closeModalTwo}>
                <FormControl
                  as="form"
                  onSubmit={handleSubmit(handleEditSector)}
                 display="flex"
                 flexDir="column"
                 alignItems="center"
                >
                    <Text>Editar Setor</Text>
                    <Input
                      {...register('name')}
                      name="name"
                      label="Nome do Setor"
                      mb="4"
                    
                    />
                         <Input
                      {...register('id')}
                      name="id"
                      label="Id do setor"
                      mb="4"
                    
                    />
                   
                    <Button 
                      w="100%"
                    type="submit" colorScheme="green" m="2">
                      Cadastrar
                    </Button>
                 
                </FormControl>
              </GenericModal>

              <Paginaton />
            </Box>
          </Flex>
        </Flex>
      </AdminContainer>
    </ChakraProvider>
  )
}
