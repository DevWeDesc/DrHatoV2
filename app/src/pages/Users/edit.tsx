import { Text, Flex, Box, SimpleGrid, ChakraProvider,  Table, Thead, Tbody, Tr, Th, Td, FormControl, Button, HStack } from '@chakra-ui/react'
import { AxiosRequestConfig } from 'axios';
import { useState, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Input } from '../../components/admin/Input';
import { Sidebar } from '../../components/admin/Sidebar'
import { api } from '../../lib/axios';
import { FormContainer } from './style';

interface UserProps {
  id?: any;
  name: string;
  password: string;
  username: string;
  isAdmin: boolean;
}

interface EditUserProps {
  id: any
  password: string;
  username: string;
  isAdmin: boolean;
}

export function EditUser() {
  const { id } = useParams<{ id: string }>();
  const { register, handleSubmit} = useForm()
  const [customer, setCustomer] = useState<UserProps>({
    name: '',
    username: '',
    password:'',
    isAdmin: false,
  })

  useEffect(() => {
    async function loadCustomer() {
      const response = await api.get(`/users/${id}`);
      console.log('ROTA EDIT USERS',response)
      setCustomer(response.data);
    }
    loadCustomer();
  }, [id]);

  const handleEditUser: SubmitHandler<EditUserProps> = async (values) => {
    const data = {
      username: values.username,
      password: values.password,
      isAdmin: Boolean(values.isAdmin)
    }
    try {
      await api.put(`/users/${id}`, data)
      toast.success('usuário editado com sucesso')
    } catch (error) {
      toast.error('falha ao editar usuário')
    }
  }
  const handleDeleteUser: SubmitHandler<EditUserProps> = async () => {
    try {
   
      const confirm = window.confirm('Deletar um usuário e uma operação irrevesivel, tem certeza que deseja continuar?')
      if(confirm === true) {
        await api.delete(`/users/${id}`, customer.id)
        toast.warning('Usuário deletado')
      }
    } catch (error) {
      toast.error('Falha ao deletar usuário')
    }
  }
  return (

    <ChakraProvider>
    <Flex direction="column" h="100vh">
      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />
        <SimpleGrid
          flex="1"
          gap="4"
          minChildWidth="320px"
          align="flex-start"
          as={Flex}
        >
          <Box textAlign="center" p="8" bg="gray.100" borderRadius={8}>
            <Flex mt="8" justify="center" direction="column">
            <Table  colorScheme="blackAlpha" >
                    <Thead>
                      <Tr>
                        <Th>Nome</Th>
                        <Th>Nome de Usuário</Th>
                        <Th>Senha</Th>
                        <Th>E Administrador ?</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      <Tr>
                        <Td>{customer.name}</Td>
                        <Td>{customer.username}</Td>
                        <Td>{customer.password}</Td>
                        <Td>{ customer.isAdmin === true ? 'ADMIN' : 'USER' }</Td>
                      </Tr>
                    </Tbody>
                </Table>
                  <FormControl as="form" alignItems="center">
                    <FormContainer>
                    <Input {...register('username')} name='username' label='Novo nome de usuário' />
                    <Input {...register('password')} name='password' label='Nova senha de usuário' />
                
                    <Flex mt="6" padding="4" textAlign="center" direction="column">
                    <Text fontWeight="medium">o usuário será administrador ?</Text>
                    <HStack >
                    <Input _focus={{ bg: "green" }}  {...register("isAdmin")} maxWidth={4} maxHeight={6} label="sim" name="isAdmin"   id="sim" type="radio"  value="true"/>
                    <Input _focus={{ bg: "green" }}  {...register("isAdmin")} maxWidth={4}  maxHeight={6} label="não"  name="isAdmin"   id="não" type="radio"  value="false"/>
                    </HStack>

                    <Button mt="4" colorScheme="whatsapp" type='submit'  onClick={handleSubmit(handleEditUser as any)}>Editar</Button>
                    <Button mt="4" colorScheme="red" type='submit'  onClick={handleSubmit(handleDeleteUser as any)}>Deletar</Button>
                    </Flex>
                    </FormContainer>
                   
                  </FormControl>

            </Flex>
          </Box>
        </SimpleGrid>
      </Flex>
    </Flex>
  </ChakraProvider>

  )
}