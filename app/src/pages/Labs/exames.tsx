import {
  Box,
  Button,
  ChakraProvider,
  Flex, Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Text, Select,
  Checkbox,
  FormLabel,
  VStack
} from '@chakra-ui/react'
import { Header } from '../../components/admin/Header'
import { ReactNode, useEffect, useState } from 'react'
import { GenericLink } from '../../components/Sidebars/GenericLink'
import { GenericSidebar } from '../../components/Sidebars/GenericSideBar'
import {
  AiOutlineSearch,
  TbVaccine,
  FaClipboardList
} from 'react-icons/all'
import { AdminContainer } from '../AdminDashboard/style'
import { useNavigate } from 'react-router-dom'
import { api } from '../../lib/axios'
import { BiHome } from 'react-icons/all'
import { Input } from '../../components/admin/Input'
import React from 'react'

interface QueueProps {
  response: []
  totalInQueue: number
}

interface ExamsDataProps {
  id: number
  CodAnimal: number
  name: string

  medicineRecords: {
    petExams: Array<{
      id: number
      name: string
      requestedFor: string
      doneExame: boolean
      requesteData: Date | null
      responsibleForExam: string | null
    }>
  }
}
type OpenExamProps = {
  isMultiPart: boolean,
  isReportByText: boolean,
  isOnePart: boolean,
  examId: number
}

type LabDefaultDTO = {
id: number;
name: string
doneExame: boolean,
onePart: boolean,
twoPart: boolean,
byReport: boolean,
requesteData: Date;
requestedFor: string;
requestedCrm: string;
responsibleForExam: string;
responsibleForCrm: string;
medicine: {
  pet: {
    name: string;
    id: number;
  }
}
}

export function LabExames() {
  const [labs, setLabs] = useState<LabDefaultDTO[]>([])
  const [inQueue, setInQueue] = useState<QueueProps[]>([])
  const [exams, setExams] = useState([] as any)
  const [examsData, setExamsData] = useState<ExamsDataProps[]>([])
  const [petName, setPetName] = useState('')
  const [codPet, setCodPet] = useState('')
  const [solicitedBy, setSolicitedBy] = useState('')
  const [showEndExams, setShowEndExams] = useState(false);

  const navigate = useNavigate()

  async function getQueue() {
    const response = await api.get('/pets/queue')
    const labs = await api.get('/labs')

    setLabs(labs.data.exams)
    setExams(labs.data.allExams)
    setInQueue(response.data.response)
  }

  function handleOpenResultExams({isOnePart, isMultiPart, isReportByText, examId}: OpenExamProps) {
    if (isOnePart === true) {
      window.open(`/WorkSpace/ExamResultsOnePart/${examId}`, '_blank');
    } 

    if (isMultiPart === true) {
      window.open(`/WorkSpace/ExamResultsMultiPart/${examId}`, '_blank');
    } 

    if (isReportByText === true) {
      window.open(`/WorkSpace/ExamResultsByText/${examId}`, '_blank');
    } 
  }

  async function handleSendEmailResultExams({isOnePart, isMultiPart, isReportByText, examId}: OpenExamProps) {
    // if (isOnePart === true) {
    //   window.open(`/WorkSpace/ExamResultsOnePart/${examId}`, '_blank');
    // } 

    // if (isMultiPart === true) {
    //   const response = await api.get(`/lab/multipart/${examId}`);

    //     const data = {
    //       examDetails: response.data.petExamResult,
    //       examCharacs: response.data.examRefs
    //     }
    //   const teste = await api.post(`/sendemail/onepart/multipart/${examId}`, data)
    //   console.log(teste)
    // } 

    // if (isReportByText === true) {
    //   const response = await api.get(`/lab/bytext/${examId}`);

    //     const data = {
    //       examDetails: response.data.petExamResult,
    //     }
    //   const teste = await api.post(`/sendemail/onepart/text/${examId}`, data)
    //   console.log(teste)
    // } 

    console.log(isOnePart, "isOnePart", isMultiPart, "isMultiPart", isReportByText, "isReportByText")
  }



  useEffect(() => {
    getQueue()
  }, [inQueue.length])

  let typeTable: ReactNode
  switch (true) {
    case examsData.length >= 1:
      typeTable = (
        <>
          <Table colorScheme="blackAlpha">
            <Thead>
              <Tr>
                <Th>Data</Th>
                <Th>Animal</Th>
                <Th>Exame</Th>
                <Th>Veterinário</Th>
                <Th>Status</Th>
                <Th>Responsável</Th>
              </Tr>
            </Thead>

            <Tbody>
              {examsData?.map(exam => {
                return exam?.medicineRecords?.petExams?.map(exams => (
                  <Tr key={exams.id}>
                    <Td>
                      {new Intl.DateTimeFormat('pt-BR').format(
                        new Date(
                          exams.requesteData ? exams.requesteData : Date.now()
                        )
                      )}
                    </Td>
                    <Td>{exam?.name}</Td>
                    <Td>{exams?.name}</Td>
                    <Td>
                      {exams?.requestedFor
                        ? exams.requestedFor
                        : 'Não definido'}
                    </Td>
                    <Td>{exams?.doneExame ? 'Laudado' : 'A Fazer'}</Td>
                    <Td>
                      {exams?.responsibleForExam
                        ? exams.responsibleForExam
                        : 'Não Laudado'}
                    </Td>
                  </Tr>
                ))
              })}
            </Tbody>
          </Table>
        </>
      )
      break
    case showEndExams === true: 
      typeTable = (
        <>
          <Table colorScheme="blackAlpha">
            <Thead>
              <Tr>
                <Th>Data</Th>
                <Th>Animal</Th>
                <Th>Exame</Th>
                <Th>Veterinário</Th>
                <Th>Status</Th>
                <Th>Responsável</Th>
                <Th>Resultado</Th>
                <Th whiteSpace={'nowrap'}>Resultado por Email</Th>
              </Tr>
            </Thead>

            <Tbody>
              {labs.map((exam) => {
                return (
                  <React.Fragment key={exam.id}>
                    {exam.doneExame === true && (
                      <Tr
                        key={exam.id}
                        cursor="pointer"
                      >
                        <Td>
                          {new Intl.DateTimeFormat('pt-BR').format(
                            new Date(exam?.requesteData)
                          )}{' '}
                        </Td>

                        <Td>{exam.medicine?.pet.name}</Td>

                        <Td>{exam.name}</Td>

                        <Td>
                          {exam.requestedFor
                            ? exam.requestedFor
                            : 'Não definido'}
                        </Td>
                        <Td>{exam.doneExame ? 'Laudado' : 'A Fazer'}</Td>
                        <Th>
                          {exam.responsibleForExam
                            ? exam.responsibleForExam
                            : 'Não Laudado'}
                        </Th>
                        <Th >
                         <Button colorScheme="teal" 
                         onClick={() => handleOpenResultExams({
                          examId: exam.id,
                          isMultiPart: exam.twoPart,
                          isOnePart: exam.onePart,
                          isReportByText: exam.byReport
                         })} >
                          Visualizar</Button> 
                        </Th>
                        <Th >
                         <Button colorScheme="teal" 
                         onClick={() => handleSendEmailResultExams({
                          examId: exam.id,
                          isMultiPart: exam.twoPart,
                          isOnePart: exam.onePart,
                          isReportByText: exam.byReport
                         })} >
                          Enviar Email</Button> 
                        </Th>
                        
                      </Tr>
                    )}
                  </React.Fragment>
                )
              })}
            </Tbody>
          </Table>
        </>
      )
      break
    default:
      typeTable = (
        <>
          <Table colorScheme="blackAlpha">
            <Thead>
              <Tr>
                <Th>Data</Th>
                <Th>Animal</Th>
                <Th>Exame</Th>
                <Th>Veterinário</Th>
                <Th>Status</Th>
                <Th>Responsável</Th>
              </Tr>
            </Thead>

            <Tbody>
              {labs.map((exam: any) => {
                return (
                  <React.Fragment key={exam.id}>
                    {exam.doneExame === false && (
                      <Tr
                        key={exam.id}
                        cursor="pointer"
                        onClick={() =>
                          navigate(
                            `/Labs/Set/${exam.id}/${
                              exams.find((data: any) => data.name === exam.name)
                                .codexam
                            }/${exam.medicine?.pet.id}`
                          )
                        }
                      >
                        <Td>
                          {new Intl.DateTimeFormat('pt-BR').format(
                            new Date(exam?.requesteData)
                          )}{' '}
                        </Td>

                        <Td>{exam.medicine?.pet.name}</Td>

                        <Td>{exam.name}</Td>

                        <Td>
                          {exam.requestedFor
                            ? exam.requestedFor
                            : 'Não definido'}
                        </Td>
                        <Td>{exam.doneExame ? 'Laudado' : 'A Fazer'}</Td>
                        <Th>
                          {exam.responsibleForExam
                            ? exam.responsibleForExam
                            : 'Não Laudado'}
                        </Th>
                      </Tr>
                    )}
                  </React.Fragment>
                )
              })}
            </Tbody>
          </Table>
        </>
      )
      break
  }

  async function searchDataLabs() {
    switch (true) {
      case petName?.length >= 1:
        await api.get(`labmenusearch?petName=${petName}`).then(res => {
          setExamsData(res.data.data)
        })
        break
      case codPet?.length >= 1:
        await api.get(`labmenusearch?petCode=${codPet}`).then(res => {
          setExamsData(res.data.data)
        })
        break
      case solicitedBy?.length >= 1:
        await api.get(`labmenusearch?solicitedBy=${solicitedBy}`).then(res => {
          setExamsData(res.data.data)
        })  
        break
      case showEndExams === true: 
      await api.get('/labs/end').then((res) => {
        console.log(res.data.exams, "labs.data.exams")
        setLabs(res.data.exams)
      })
      break;  
      case showEndExams === false: 
      const labs = await api.get('/labs')
      console.log(labs.data.exams, "labs.data.exams")
      setLabs(labs.data.exams)
      break;

    }
  }

  function clearExamData() {
    setExamsData([])
    setPetName('')
    setCodPet('')
    setSolicitedBy('')
  }
  useEffect(() => {
    searchDataLabs()
  }, [petName, codPet, solicitedBy, showEndExams])

  return (
    <ChakraProvider>
      <AdminContainer>
        <Flex direction="column" h="100vh">
          <Header title="Painel Veterinário" url="/Labs" />
          <Flex w="100%" my="6" maxWidth={1680} mx="auto" px="6">
            <GenericSidebar>
              <GenericLink
                name="Pesquisar Cliente"
                icon={AiOutlineSearch}
                path="/Vets/Menu"
              />
              <GenericLink
                name="Internações"
                icon={FaClipboardList}
                path="/Admissions"
              />
              <GenericLink
                name="Vacinas"
                icon={TbVaccine}
                path="/Recepcao/Internacoes/Vacinas"
              />
              <GenericLink name="Recepção" icon={BiHome} path="/Recepcao" />
            </GenericSidebar>
            <Box
              flex="1"
              borderRadius={8}
              bg="gray.200"
              p="8"
              maxH="44rem"
              overflow="auto"
            >
              <Flex mb="8" gap="8" direction="column" align="center">
                <Flex w="100%" direction="column" align="center">
                  <Text fontWeight="bold">SISTEMA DE EXAMES</Text>
                  <Flex w="100%" mb={4}>
                    <Flex align="center" gap={8}>
                      <Text>Tipo de Exame</Text>
                      <Select
                        placeholder="Selecione um exame"
                        w={320}
                        border="2px"
                      >
                        {exams.map((exam: { name: string; id: string }, index: { index: number }) => (
                          <option key={`${exam.id}-${index}`}>{exam.name}</option>
                        ))}
                      </Select>
                    </Flex>
                  </Flex>

                  <Flex w="100%" align="center" mb={4}>
                    <Flex align="center" gap={8}>
                      <Input
                        label="Data Inicial"
                        name="initialDate"
                        type="date"
                      />

                      <Input label="Data Final" name="finalDate" type="date" />

                      <VStack>
                        <FormLabel fontWeight="bold" htmlFor="finished">
                          Concluidos
                        </FormLabel>
                        <Checkbox
                          border="2px"
                          onChange={(ev) => setShowEndExams(ev.target.checked)}
                          name="finished"
                          id="finished"
                          size="lg"
                        />
                      </VStack>
                    </Flex>
                  </Flex>

                  <Flex w="100%" gap={8} align="center">
                    <Input
                      label="Nome do Animal"
                      name="petName"
                      onChange={ev => setPetName(ev.target.value)}
                    />

                    <Input
                      label="Solicitante"
                      name="solicitedBy"
                      onChange={ev => setSolicitedBy(ev.target.value)}
                    />

                    <Input
                      label="Código Animal"
                      name="petCode"
                      onChange={ev => setCodPet(ev.target.value)}
                    />
                  </Flex>

                  <Button colorScheme="whatsapp" w="380px" mt="4" p={4}>
                    Filtrar
                  </Button>
                </Flex>
                <Button colorScheme="teal" onClick={() => clearExamData()}>
                  <>TOTAL NA FILA: {labs.length}</>
                </Button>
                <Flex textAlign="center" justify="center">
                  {typeTable}
                </Flex>
              </Flex>
            </Box>
          </Flex>
        </Flex>
      </AdminContainer>
    </ChakraProvider>
  )
}