import { Text,Box, Button, ChakraProvider,  Flex, Heading, Icon, Table, Tbody, Td, Th, Thead, Tr, FormControl, HStack, background, Radio, RadioGroup, CheckboxGroup, Checkbox, VStack,  } from "@chakra-ui/react";
import { useContext, useState} from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { RiAddLine, RiPencilLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { Header } from "../../components/admin/Header";
import { Paginaton } from "../../components/admin/Pagination";
import { Sidebar } from "../../components/admin/Sidebar";
import { LoadingSpinner } from "../../components/Loading";
import { DbContext } from "../../contexts/DbContext";
import { GenericModal } from "../../components/Modal/GenericModal";
import { AdminContainer } from "../AdminDashboard/style";
import { api } from "../../lib/axios";
import { toast } from "react-toastify";
import { Input } from "../../components/admin/Input";

  export function ExamesList()
  {
   interface InputOption {
      lab: string;
      image: string;
    }
    const { exams  } = useContext(DbContext)
    const { register, handleSubmit} = useForm()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectOption, setSelectOption] = useState<InputOption>();

    function openModal() {
      setIsModalOpen(true);
    }
    function closeModal() {
      setIsModalOpen(false);
    }

  const handleCreateExam: SubmitHandler<FieldValues> = async (values) => {
    try {
      const data = {
        name: values.name,
        price: parseInt(values.price),
        available: values.available,
        examsType: values.examsType
      }
      await api.post('exams', data )
      toast.success("Exame criada com sucesso")
    } catch (error) {
      toast.error("Falha ao criar novo Exame")
    }
      
  }

  return (
    <ChakraProvider>
      <AdminContainer>
        <Flex direction="column" h="100vh">
        <Header title="Exames" />

        <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
            <Sidebar />
          <Box
          flex="1"
          borderRadius={8}
          bg="gray.200"
          p="8"
          >
            <Flex mb="8" justify="space-between" align="center">
              <Heading size="lg" fontWeight="normal">Exames</Heading>
              
              
              <Button as="a"size="sm" fontSize="sm" colorScheme="green"
              leftIcon={<Icon as={RiAddLine}/>}
              onClick={()=>openModal()}
              >
                  Cadastrar novo Exame
              </Button>
         


            
            </Flex>

            <Table  colorScheme="blackAlpha">
              <Thead>
                <Tr>
                 
                  <Th>
                  Nome
                  </Th>
                  <Th>
                    Preço
                  </Th>
                  <Th>
                    Disponivel ?
                  </Th>
                  <Th width="8">
                  </Th>
                </Tr>
              </Thead>
              
                  <Tbody>

                    {exams ? exams.map( (exam) => 
                  (
                
                    <Tr key={exam.id}>
                 
                    <Td>
                      <Box>
                        <Text fontWeight="bold" color="gray.800">{exam.name}</Text>
                      </Box>
                    </Td>
                    <Td>
                      <Text fontWeight="bold" color="gray.800">{ new Intl.NumberFormat('pt-BR', {
                         style: 'currency',
                        currency: 'BRL'
                      }).format(exam.price) }</Text>
                    </Td>
                    <Td>
                      {exam.available === true ? ( <p>SIM</p> ) : ( <p>NÃO</p> )} 
                    </Td>
  
                    
                  <Td>
                    
                    <Link to={`/Examas/Edit/${exam.id}`}> 
                    <Button as="a"size="sm" fontSize="sm" colorScheme="yellow"
                      leftIcon={<Icon as={RiPencilLine}/>}
                      >
                        Editar
                    </Button>
                  </Link>
                 
                    </Td>
                  </Tr>
           
                  )
                 ) : ( <LoadingSpinner />) }
               
                </Tbody>

        
                </Table>
                   <GenericModal
                      isOpen={isModalOpen}
                      onRequestClose={closeModal}
                    >
                            
                      <FormControl as="form" onSubmit={handleSubmit(handleCreateExam)} >
                        <Flex direction="column" align="center" margin="4">
                          
                        <Input  {...register("name")} name="name" label="Nome do Exame"/>
                       <Input  {...register("price")} name="price" label="Preço" />



                        <HStack gap="2" margin={8}>

                        <label htmlFor="available">Disponivel ?</label>
                       <Checkbox  {...register('available')} id="available" name="available" type="checkbox"  _checked={{ background: "#FF0000" }} />

                        </HStack>
                   



                        <HStack spacing={4} margin="4">     
                          <CheckboxGroup>

                <label htmlFor="">Lab Imagens</label>
                <Checkbox {...register("examsType")} value={"image"} type="radio" colorScheme="green"  name="examsType"   /> 


                <label htmlFor="">Labs</label>
                <Checkbox type="radio" {...register("examsType")} value={"lab"}  colorScheme="green"  name="examsType"   /> 
                    </CheckboxGroup>

                        </HStack >
                 

                       <Button type="submit" colorScheme="green" m="2">
                          Cadastrar
                        </Button>

                        </Flex>
                      
                   
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