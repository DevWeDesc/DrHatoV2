import {
  ChakraProvider,
  Flex,
  Button,
  Text,
  TableContainer,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Link,
  Textarea
} from '@chakra-ui/react'
import { useState, ElementType, FunctionComponent, useEffect, Suspense } from 'react'
import { BiHome } from 'react-icons/bi'
import { TbArrowBack } from 'react-icons/tb'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { LoadingSpinner } from '../../../components/Loading'
import { api } from '../../../lib/axios'

export function ExamsDetails() {
  const [typeReport, setTypeReport] = useState(0)
  const { examId } = useParams<{ examId: string }>()
  const [examDetails, setExamDetails] = useState({} as any)
  const navigate = useNavigate()

  async function getExamDetails() {
    try {
      const response = await api.get(`/labexam/${examId}`)
      setExamDetails(response.data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getExamDetails()
  }, [])

  const handleDowloadArqs = async (arqPath: string) => {
    try {
        await api.get(`/labfile/${arqPath}`)

    } catch (error) {
      toast.error("Falha ao realizar dowload!!")
      console.log(error)
    }
  }

  let typeReportInExibition
  switch (true) {
    case typeReport === 1:
      typeReportInExibition = (
        <Flex w="100%" h="100%" align="center" direction="column">
          <Text mb="4" fontWeight="bold" fontSize="2xl">
            LISTAGEM DE ARQUIVOS PARA DOWLOAD NESTE EXAME
          </Text>
          <Flex h="78px" w="100%" align="center" justify="center">
            <TableContainer fontWeight="bold" fontSize="1xl">
              <Table>
                <Thead>
                  <Tr>
                    <Th>Nome do Exame</Th>
                    <Th>Data Solicitada</Th>
                    <Th>Responsável pelo Exame</Th>
                    <Th>Animal</Th>
                    <Th>Peso</Th>
                    <Th>Sexo</Th>
                    <Th>Especie</Th>
                    <Th>Raça</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>{examDetails.name}</Td>
                    <Td>
                      {new Intl.DateTimeFormat('pt-BR').format(
                        new Date(examDetails.requesteData)
                      )}
                    </Td>
                    <Td>
                      {examDetails.responsibleForExam
                        ? examDetails.responsibleForExam
                        : 'Não Definido'}
                    </Td>
                    <Td>{examDetails?.medicine?.pet?.name}</Td>
                    <Td>{examDetails?.medicine?.pet?.weigth}</Td>
                    <Td>{examDetails?.medicine?.pet?.sexo}</Td>
                    <Td>{examDetails?.medicine?.pet?.especie}</Td>
                    <Td>{examDetails?.medicine?.pet?.race}</Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>
          </Flex>
          <Flex mt="4" h="auto" w="auto" gap='8' wrap="wrap">
                        {
                          examDetails ? examDetails.reportExams.map((exam: any) => (
                            <Flex align="center" direction="column" key={exam.id}>
                            <Text>
                              Data de Laudo {new Intl.DateTimeFormat('pt-BR').format(new Date(exam.createdAt))}
                            </Text>

                              
                              {
                                exam.internalReport.length >= 1 ?   exam.internalReport.map((arq: any) => (
                                  <Link bgColor="green.200" border='2px' rounded="full" w="auto" h="auto" 
                                  m="4" 
                                  p="4" 
                                 justifyContent="center"
                                  target="_blank" href={`http://localhost:5000/labfile/${arq}`}>{arq}</Link>
                                )) : (
                                  <h1>Sem arquivos disponiveis verifique outras opções!</h1>
                                )
                              }
                            </Flex>
                          )) : (<h1>SEM ARQUIVOS DISPONIVEIS</h1>)
                        }
          </Flex>
        </Flex>
      )
      break
    case typeReport === 2:
      typeReportInExibition = (
        <Flex w="100vw" h="100vh" overflowY="auto" align="center" direction="column">
        <Text mb="4" fontWeight="bold" fontSize="2xl">
          LISTAGEM DE ARQUIVOS PARA DOWLOAD NESTE EXAME
        </Text>
        <Flex h="78px" w="100%" align="center" justify="center" >
          <TableContainer fontWeight="bold" fontSize="1xl">
            <Table>
              <Thead>
                <Tr>
                  <Th>Nome do Exame</Th>
                  <Th>Data Solicitada</Th>
                  <Th>Responsável pelo Exame</Th>
                  <Th>Animal</Th>
                  <Th>Peso</Th>
                  <Th>Sexo</Th>
                  <Th>Especie</Th>
                  <Th>Raça</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>{examDetails.name}</Td>
                  <Td>
                    {new Intl.DateTimeFormat('pt-BR').format(
                      new Date(examDetails.requesteData)
                    )}
                  </Td>
                  <Td>
                    {examDetails.responsibleForExam
                      ? examDetails.responsibleForExam
                      : 'Não Definido'}
                  </Td>
                  <Td>{examDetails?.medicine?.pet?.name}</Td>
                  <Td>{examDetails?.medicine?.pet?.weigth}</Td>
                  <Td>{examDetails?.medicine?.pet?.sexo}</Td>
                  <Td>{examDetails?.medicine?.pet?.especie}</Td>
                  <Td>{examDetails?.medicine?.pet?.race}</Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        </Flex>
        <Flex  align="center"  justify="center" flex="1" w="100%" gap='8' direction='column'>
                      {
                        examDetails ? examDetails.reportExams.map((exam: any) => (
                          <Flex align="center" h="100%"   direction="column" key={exam.id}>
                          <Text>
                            Data de Laudo {new Intl.DateTimeFormat('pt-BR').format(new Date(exam.createdAt))}
                          </Text>

                            {
                              exam.textReport ? <Textarea minHeight={600} minWidth={800}  border="2px" defaultValue={exam.textReport} /> : <h1>Esse laudo não foi por texto verifique as outras opções!</h1>
                            }
                              
                          </Flex>
                        )) : (<h1>SEM ARQUIVOS DISPONIVEIS</h1>)
                      }
        </Flex>
      </Flex>
      )
      break
  }

  
 
  return (
    <ChakraProvider>
      <Flex width="100vw" height="100vh" bgColor="white" direction="column">
        <Flex w="100%" height="10vh" bgColor="gray.200">
          <Flex align="center" gap="2">
            <Button colorScheme="teal" leftIcon={<BiHome size={24} />}>
              Home
            </Button>

            <Button 
            onClick={() => navigate(`/Vets/Workspace/${examDetails?.medicine?.pet.id}`)}
            colorScheme="yellow" leftIcon={<TbArrowBack size={24} />}>
              Voltar
            </Button>

            <Button onClick={() => setTypeReport(1)} colorScheme="whatsapp">
              Exibir Laudos por arquivos
            </Button>

            <Button onClick={() => setTypeReport(2)} colorScheme="whatsapp">
              Exibir Laudos por texto
            </Button>
             

             <Suspense fallback={<LoadingSpinner />}>
             {
              
              examDetails ? examDetails?.reportExams?.filter((report: any) => report?.hasTable === true).map((table: any) => (
                <Button colorScheme="whatsapp" key={table.id}>{table?.tableName}</Button>
              )) : (
                <Button >SEM TABELA</Button>
              )
             }
             </Suspense>
          
          </Flex>
        </Flex>

        <Flex  direction="column" h="90%" overflowY="auto" w="100%">
          {typeReportInExibition}
        </Flex>
      </Flex>
    </ChakraProvider>
  )
}
