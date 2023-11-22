import {
  Box,
  Button,
  ChakraProvider,
  Flex,
  Menu,
  MenuButton,
  MenuList,
  Radio,
  RadioGroup,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Text,
  HStack,
  Select,
} from "@chakra-ui/react";
import { Header } from "../../components/admin/Header";
import { ReactNode, useContext, useEffect, useState } from "react";
import { GenericLink } from "../../components/Sidebars/GenericLink";
import { GenericSidebar } from "../../components/Sidebars/GenericSideBar";
import {
  AiOutlineMenu,
  BsArrowLeft,
  IoIosFlask,
  BsImages,
  AiOutlineSearch,
  TbVaccine,
  FaClipboardList,
} from "react-icons/all";
import { AdminContainer } from "../AdminDashboard/style";
import { LabsSearch } from "../../components/Search/labsSearch";
import { DbContext } from "../../contexts/DbContext";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { StyledBox } from "../../components/Header/style";
import { VetsSearch } from "../../components/Search/vetsSearch";
import { api } from "../../lib/axios";
import { MdPets as Burger } from "react-icons/all";
import { BiHome } from "react-icons/all";
import { Input } from "../../components/admin/Input";

interface QueueProps {
  response: [];
  totalInQueue: number;
}

interface ExamsDataProps {
  id: number;
  CodAnimal: number;
  name: string;

  medicineRecords: {
    petExams: Array< {
       id: number;
       name: string;
       requestedFor: string;
       doneExame: boolean;
       requesteData: Date | null
       responsibleForExam: string | null;

    }>
  }

}

export function LabExames() {
  const [labs, setLabs] = useState([] as any);
  const [inQueue, setInQueue] = useState<QueueProps[]>([]);
  const [exams, setExams] = useState([] as any)
  const [examsData, setExamsData] = useState<ExamsDataProps[]>([])
  const [petName, setPetName] = useState('')
  const [codPet, setCodPet] = useState('')
  const [solicitedBy, setSolicitedBy] = useState('')


  const navigate = useNavigate();


  async function getQueue() {
    const response = await api.get("/pets/queue");
    const labs = await api.get("/labs");
    
    setLabs(labs.data.exams);
    setExams(labs.data.allExams)
    setInQueue(response.data.response);
  }

  useEffect(() => { 
    
    getQueue();
  }, [inQueue.length]);


   
   
  let typeTable: ReactNode;
  switch (true) {
    case examsData.length >= 1 : 
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
            {examsData?.map((exam) => {
              
              return exam?.medicineRecords?.petExams?.map((exams) => (
                <Tr key={exams.id} >
                  <Td>{new Intl.DateTimeFormat("pt-BR").format(new Date(exams.requesteData? exams.requesteData : Date.now()))}</Td>
                  <Td>{exam?.name}</Td>
                  <Td>{exams?.name}</Td>
                  <Td>{exams?.requestedFor ? exams.requestedFor : "Não definido"}</Td>
                  <Td>{exams?.doneExame ? "Laudado"  : "A Fazer"}</Td>
                  <Td>{exams?.responsibleForExam ? exams.responsibleForExam : "Não Laudado"}</Td>
                </Tr>
              ))
               
            })}
          </Tbody>
        </Table>
      </>
    );
    break;
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
                  <>
                  	{
                  exam.doneExame === false && (
                    <Tr
                      key={exam.id}
                      cursor="pointer"
                      onClick={() => navigate(`/Labs/Set/${exam.id}/${exams.find((data: any) => data.name === exam.name).id}`)}
                    >
                      <Td>{new Intl.DateTimeFormat('pt-BR').format(new Date(exam?.requesteData))} </Td>

                      <Td>{exam.medicine?.pet.name}</Td>

                      <Td>{exam.name}</Td>

                      <Td>
                        {exam.responsibleForExam === null
                          ? "Não Adicionado"
                          : exam.responsibleForExam}
                      </Td>
                      <Td>À Fazer</Td>
                      <Th>Não Adicionado</Th>
                    </Tr>
                  )}

                  </>
                )
              })}
            </Tbody>
          </Table>
        </>
      );
      break;
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
        await api
          .get(`labmenusearch?solicitedBy=${solicitedBy}`)
          .then(res => {
            setExamsData(res.data.data)
          })
        break
    }
  }

  function clearExamData() {
    setExamsData([])
    setPetName("")
    setCodPet("")
    setSolicitedBy("")
  }
  useEffect(() => {
    searchDataLabs()
  }, [petName,codPet,solicitedBy])
  
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
                    <Text >Tipo de Exame</Text>
                  <Select placeholder="Selecione um exame" w={320} border="2px">
                  {
                    exams.map((exam: {name: string; id: string}) => <option key={exam.id}>{exam?.name}</option>)
                  }
                  </Select>
                 
                    </Flex>
                  
            
              </Flex>

              <Flex w="100%"   mb={4}>
                <Flex align="center"  gap={8} >
                 <Input label="Data Inicial" name="initialDate" type="date"   />

                 <Input label="Data Final" name="finalDate" type="date"   />
                </Flex>
              </Flex>

              
              <Flex w="100%" gap={8} align="center" >
       
               
                 <Input label="Nome do Animal" name="petName" onChange={(ev) => setPetName(ev.target.value)} />
          
    
              
                 <Input label="Solicitante" name="solicitedBy"  onChange={(ev) => setSolicitedBy(ev.target.value)} />
        

    
               
                 <Input label="Código Animal" name="petCode"  onChange={(ev) => setCodPet(ev.target.value)} />
              
              </Flex>

              <Button colorScheme="whatsapp" w="380px"  mt="4" p={4}>Filtrar</Button>
               </Flex>
                <Button
                  colorScheme="teal"
                  onClick={() => clearExamData()}
                >
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
  );
}
