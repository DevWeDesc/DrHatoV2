import {
  Box, Button, ChakraProvider,
  Checkbox,
  CheckboxGroup,
  Flex,
  FormControl,
  Heading,
  HStack,
  Text,
  Textarea,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react'
import { useContext, useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { Header } from '../../components/admin/Header'
import { Sidebar } from '../../components/admin/Sidebar'
import { DbContext } from '../../contexts/DbContext'
import { AdminContainer } from '../AdminDashboard/style'
import { api } from '../../lib/axios'
import { toast } from 'react-toastify'
import { Input } from '../../components/admin/Input'

export function ExamsEdit() {
  const { register, handleSubmit } = useForm()
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()


  const handleCreateExam: SubmitHandler<FieldValues> = async values => {
    let rangeAges = [values.minAge, values.maxAge]
    try {
     
      const data = {
       name: values.name,
       price: parseInt(values.price),
       available: values.available,
       examsType: values.examsType,
       applicableGender: values.applicableGender,
       subName: values.subName,
       description: values.description,
       ageRange: rangeAges
      }
      await api.put(`exams/${id}`, data)
      toast.success('Exame configurado com sucesso')
      navigate(0)
    } catch (error) {
      toast.error('Falha ao criar novo Exame')
    }
  }

  return (
    <ChakraProvider>
      <AdminContainer>
        <Flex direction="column" h="100vh">
          <Header title="Exames" />

          <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
            <Sidebar />
            <Box flex="1" borderRadius={8} bg="gray.100" p="8">
            <Heading size="lg" fontWeight="normal">
                  Exames
                </Heading>
              <Flex mb="8" justify="space-between" align="center">
             

                <FormControl
                  as="form"
                  onSubmit={handleSubmit(handleCreateExam)}
                  justifyContent="space-between"
                  display="flex"
                >
                  <Flex direction="column" align="center" margin="4" bg="white"
                  p="4"
                  rounded="4"
                  width={400}>
                    <Input
                      {...register('name')}
                      name="name"
                      label="Nome do Exame"
                    />
                    <Input {...register('price')} name="price"
                  
                     label="Preço" />

                    <HStack gap="2" margin={8}>
                      <label htmlFor="available">Disponivel ?</label>
                      <Checkbox
                        {...register('available')}
                        id="available"
                        name="available"
                        type="checkbox"
                        borderColor="gray.800"
                        _checked={{ background: '#FF0000' }}
                      />
                    </HStack>

                    <Text>Para qual laboratório?</Text>
                    <HStack spacing={4} margin="4">
                      <CheckboxGroup>
                       
                        <label htmlFor="">Lab Imagens</label>
                        <Checkbox
                          {...register('examsType')}
                          value={'image'}
                          type="radio"
                          colorScheme="green"
                          borderColor="gray.800"
                          name="examsType"
                        />

                        <label htmlFor="">Lab padrão</label>
                        <Checkbox
                          type="radio"
                          {...register('examsType')}
                          value={'lab'}
                          colorScheme="green"
                          name="examsType"
                          borderColor="gray.800"
                        />
                      </CheckboxGroup>
                    </HStack>
                    <Text>Sexo aplicável</Text>


                    <HStack spacing={4} margin="4">
                      <CheckboxGroup>
                       
                        <label htmlFor="">Femea</label>
                        <Checkbox
                          {...register('applicableGender')}
                          value={'femea'}
                          type="radio"
                          colorScheme="green"
                          borderColor="gray.800"
                          name="applicableGender"
                        />

                        <label htmlFor="">Macho</label>
                        <Checkbox
                          type="radio"
                          {...register('applicableGender')}
                          value={'macho'}
                          colorScheme="green"
                          name="applicableGender"
                          borderColor="gray.800"
                        />
                      </CheckboxGroup>
                    </HStack>



                    <Text m="4">Defina os limites de Idade em dias:</Text>
                    <HStack>
                      <label htmlFor="">Idade Minima</label>
                      <NumberInput  size='xs' name="minAge" maxW={16} >
                        <NumberInputField {...register('minAge')} name="minAge" />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>


                      <label htmlFor="">Idade Máxima</label>
                      <NumberInput size='xs'  maxW={16}  >
                        <NumberInputField {...register('maxAge')} name="maxAge"/>
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>

                    
                    </HStack>
                  </Flex>
                  <Flex direction="column" align="center" margin="4" bg="white"
                  p="4"
                  rounded="4"
                  width={400}>
                  <Input
                      {...register('subName')}
                      name="subName"
                      label="Titulo"
                    />
                        <label>Valor padrão</label>
                       <Textarea {...register('description')} name="description"  minHeight={300} minWidth={300}
                       borderColor="gray.900"
                       >
              
                        </Textarea>

                  </Flex>

                   <Button type="submit" colorScheme="green" m="2">
                     Configurar
                  </Button>


                </FormControl>
                
              </Flex>
                 
            </Box>
          </Flex>
        </Flex>
      </AdminContainer>
    </ChakraProvider>
  )
}
