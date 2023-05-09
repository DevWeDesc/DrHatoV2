import { Text, Flex, Box, SimpleGrid, ChakraProvider,  Table, Thead, Tbody, Tr, Th, Td, FormControl, Button, HStack } from '@chakra-ui/react'
import { useState, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { Sidebar } from '../../components/admin/Sidebar'
import { api } from '../../lib/axios';





interface ExamProps {
  name: string
	price: number,
  available: boolean;
	examsType: [];
	applicableGender: [];
	subName: string
	description: string;
	ageRange: [];
}



export function ExamDetail() {
  const { id } = useParams<{ id: string }>();
  const [exams, setExams] = useState<ExamProps>({} as ExamProps)

  useEffect(() => {
    async function loadExam() {
      const response = await api.get(`/exams/${id}`);
      setExams(response.data) 
    }
    loadExam();
  }, [exams.name]);

  let labType = exams.examsType ? exams.examsType.join(',  ') : "Carregando..."

  const handleDeleteUser:any = async () => {
    try {
      const confirm = window.confirm('Deletar um usuário e uma operação irrevesivel, tem certeza que deseja continuar?')
      if(confirm === true) {
        await api.delete(`/users/${id}`)
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
                        <Th>Preço</Th>
                        <Th>Disponivel?</Th>
                        <Th>Laboratórios</Th>
                        <Th>Aplicavel á</Th>
                        <Th>Idade minima do animal</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      <Tr>
                        <Th>{exams.name}</Th>
                        <Th>{new Intl.NumberFormat("pt-BR", {style:'currency' ,currency: 'BRL'}).format(exams.price)}</Th>
                        <Th>{exams.available === true ? "Sim" : "Não"}</Th>
                        <Th>{
                          labType
                          }</Th>
                      </Tr>
                    </Tbody>
                </Table>
            </Flex>
          </Box>
        </SimpleGrid>
      </Flex>
    </Flex>
  </ChakraProvider>

  )
}