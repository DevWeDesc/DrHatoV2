import {
  Flex,
  ChakraProvider,
  Table,
  Thead,
  Tbody,
  Td,
  Th,
  Tr,
  Text,
  Button,
  Input,
  Textarea,
  TableContainer,
} from "@chakra-ui/react";
import { BiHome, GiMedicines, TbArrowBack, MdHistory  } from "react-icons/all";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../lib/axios";
import { MedicineContainer } from "./style";
import { useQuery, useQueryClient } from "react-query";
import { LoadingSpinner } from "../../components/Loading";
import { useEffect, useState } from "react";

interface PetProps {
  id: number;
  name: string;
  especie: string;
  corPet: string;
  observations: string;
  race: string;
  rga: number;
  sizePet: string;
  weigth: string;
  sexo: string;
  status: string;
  bornDate: string;
  customer: {
    name: string;
    pets: Array<{
      id: number
      name: string
      race: string
    }>
  };
  CodAnimal: string;
  codPet: string;

  medicineRecords: {
    petBeds: Array<{
      id: number;
      entryOur: string;
    }>;
    petExams: Array<{
      id: number;
      name: string;
      requesteData: string;
      doneExame: boolean;
    }>;
    petConsults: Array<{
      id: string;
      openedDate: Date ;
      closedDate: Date | null;
      consultType: string;
      vetPreference: string;
      petWeight: string;
      observations: string;
      symptoms: string;
			request: string;
			diagnostic: string;
    }>;
    petSurgeries: Array<{
      id: number;
      name: string;
      requestedDate: Date;
      completedDate: Date | null;
      status: string;
    }>;
    petVaccines: Array<{
      id: number;
      name: string;
      requestedDate: Date;
      applicationDate: Date | null;
      isDone: boolean;
    }>;
  };
}

export interface OldConsultsHistories {
  id:             number;
  CodCli:         number;
  CodAnimal:      number;
  name:           string;
  especie:        string;
  sexo:           string;
  race:           string;
  weigth:         string;
  haveChip:       boolean;
  corPet:         string;
  sizePet:        string;
  bornDate:       string;
  dateAge:        null;
  observations:   string;
  customer_id:    number;
  codPet:         string;
  isCastred:      boolean;
  debits:         string;
  petOldConsults: PetOldConsult[];
  customer:       Customer;
}

export interface Customer {
  id:            number;
  CodCli:        number;
  name:          string;
  adress:        string;
  district:      string;
  cep:           string;
  neighbour:     string;
  state:         string;
  phone:         string;
  tell:          null;
  cpf:           string;
  rg:            string;
  email:         string;
  birthday:      string;
  balance:       number;
  kindPerson:    string;
  vetPreference: null;
  howKnowUs:     null;
}

export interface PetOldConsult {
  id:           number;
  codConsulta:  number;
  date:         Date;
  startAt:      string;
  endAt:        string;
  vetId:        number;
  vetName:      string;
  petWeight:    number;
  petName:      string;
  customerName: string;
  consulType:   string;
  CodAnimal:    number;
  CodCli:       number;
  petsId:       number;
  symptoms: string;
  diagnostic: string;
  request: string;
}

interface OldExamsHistorie {
  id:         number;
  name:       string;
  vetId:      number;
  codConsult: number;
  CodExamConsulta: number;
  codExam:    number;
  codAnimal:  number;
  codCli:     number;
  madeAt:     Date;
  vetName:    string;
  obsOne:     string;
  obsTwo:     string;
  metodology: string;
  image:      boolean;
  laboratory: boolean;
  petsId:     number;
}

type OpenOldExamsProps = {
CodCli: number;
CodConsulta: number;
}

export function MedicineRecordOld() {
  const { id, queueId } = useParams<{ id: string; queueId: string }>();
  const [typeShowHistorie, setTypeShowHistorie] = useState("")
  const navigate = useNavigate();
  const [pets, setPets] = useState({} as PetProps);

  function handleOpenOldResultExams({ CodCli, CodConsulta }: OpenOldExamsProps) {
    window.open(`https://drhatomf.ddns.net/vet/scr/PrintExamNewONLINE.asp?CodCli=${CodCli}&text=|${CodConsulta}|`, "_blank");
  }

  async function getOldHistorieAdmission(): Promise<any[]> {
    try {
      const response =  await api.get(`/admission/historie/old/all/${consultsData?.CodAnimal}`)
      console.log(response.data.oldAdmissions, "Entrei3")
      return  response.data.oldAdmissions

    } catch (error) {
      throw error
    }
  }

  async function getPet() {
    try {
      const response = await api.get(`/pets/history/${id}`);
      setPets(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function getConsults(): Promise<OldConsultsHistories> {
    try {
      const response =  await api.get(`/pet/old/history/consults/${id}`)

      if(!response) {
        throw new Error()
      }

      return response.data.oldConsults
    } catch (error) { 
      throw error
    }
  }

  async function getOldExamsHistorie(): Promise<OldExamsHistorie[]> {
    try {
      const response =  await api.get(`/exams/historie/old/${id}`)
      return  response.data.examsHistorie
    } catch (error) {
        throw error
    }
  }
  
  useEffect(() => {
    getPet();
  }, []);
  const { data: consultsData, isLoading: consultsLoading } = useQuery('oldHistory', {queryFn: getConsults})
  const { data: examsData, isLoading: examsLoading } = useQuery('oldExams', {queryFn: getOldExamsHistorie})
  const { data: oldHistorieData } = useQuery('oldHistorie', () => getOldHistorieAdmission(),{ enabled: !!consultsData?.CodAnimal });

  if(consultsLoading || examsLoading) {
    return <LoadingSpinner/>
  }

  let typeShowHistorieComponent;
  switch(true) {
    case typeShowHistorie == "Internações":
      typeShowHistorieComponent = (
       <Flex direction="column" w="100%" h="100%">
          {
            oldHistorieData?.map((historie) => (
              <Flex direction="column" textAlign="center" key={historie.id}> 
                <Text color="black"  fontWeight="bold" border="2px"  fontSize="lg" w="100%" bgColor="gray.300">
                  {`Inicio da internação: ${new Intl.DateTimeFormat("pt-BR", {
                    day: "2-digit",
                    month: "2-digit",
                    year: '2-digit'
                }).format(new Date(historie.entryDay))} - ${historie.entryHour}. Fim da internação ${new Intl.DateTimeFormat("pt-BR", {
                  day: "2-digit",
                  month: "2-digit",
                  year: '2-digit'
              }).format(new Date(historie.exitDay))} - ${historie.exitHour}`}
                </Text>
                <Flex direction="column" w="100%" h="100%"> 
                     <TableContainer>
                          <Table>
                            <Thead>
                              <Tr bgColor="white">
                                <Th fontWeight="bold" fontSize="md" color="black" border="2px">Procedimento</Th>
                                <Th fontWeight="bold" fontSize="md" color="black" border="2px">Valor</Th>
                                </Tr></Thead>
                            <Tbody>
                              <Tr bgColor="white">
                                <Td   fontWeight="bold" fontSize="md" color="black" border="2px"  >{ historie?.OldAdmissionProcedures?.procedureName}</Td>
                                <Td   fontWeight="bold" fontSize="md" color="black" border="2px"  >{
                                  new Intl.NumberFormat("pt-BR", {currency: 'BRL', style: 'currency'}).format(Number(historie?.OldAdmissionProcedures?.procedureValue))
                                }</Td>
                                </Tr></Tbody>
                          </Table>
                        </TableContainer>
               
                </Flex>
              </Flex>
            ))
          }
       </Flex>
      )
    break;
    case typeShowHistorie == "Consultas":
      typeShowHistorieComponent = (
        <Flex  color="black"  fontWeight="bold"   fontSize="lg" border="2px" direction="column" w="100%" h="100%">
        {consultsData?.petOldConsults?.map((consult) => (
          <Flex
            textAlign="center"
            direction="column"
            w="100%"
            key={consult.id}
          >
            <Text
              border="2px"
              fontSize="lg"
              bg="gray.300"
              color="black"
              fontWeight="bold"
            >{`Entrada: ${new Intl.DateTimeFormat("pt-BR", {
              day: "2-digit",
              month: "2-digit",
              year: '2-digit'
            }).format(new Date(consult.date))}: ${consult.startAt} 
            - 
            Saida: ${new Intl.DateTimeFormat("pt-BR", {
              day: "2-digit",
              month: "2-digit",
              year: '2-digit'
            }).format(new Date(consult.date))}: ${consult.endAt}
            -
            ${consult.consulType} - ${consult.vetName}`}</Text>
            <Flex align="center" textAlign="center" gap="0">
              <Text
                borderY="2px"
                fontWeight="bold"
                fontSize="lg"
                bgColor="gray.300"
                h="38px"
                w="20%"
              >
                Peso
              </Text>
              <Text
                border="2px"
                fontWeight="black"
                fontSize="lg"
                bgColor="white"
                h="38px"
                w="80%"
              >
                {consult.petWeight != 0 ? `${consult.petWeight}Kgs` : "Não informado"} 
              </Text>
              <Button
                maxH="38px"
                borderRadius="0px"
                colorScheme="red"
                isDisabled
              >
                Desconcluir
              </Button>
            </Flex>

            <Flex direction="column">
              <Text
                pl="40px"
                textAlign="left"
                border="2px"
                fontWeight="bold"
                fontSize="lg"
                bgColor="gray.300"
                py="4px"
                w="100%"
              >
                {" "}
                Sintomas
              </Text>
              <Textarea
                borderRadius="0"
                bgColor="white"
                fontSize="md"
                fontWeight="bold"
                border="2px"
                w="100%"
               
                defaultValue={consult.symptoms}
              />
              {
                consult.diagnostic.length >= 1  ? (<>
                   <Text
                pl="40px"
                textAlign="left"
                border="2px"
                fontWeight="bold"
                fontSize="lg"
                bgColor="gray.300"
                py="4px"
                w="100%"
              >
                {" "}
                Diagnóstico
              </Text>
              <Textarea
                borderRadius="0"
                bgColor="white"
                fontSize="md"
                fontWeight="bold"
                border="2px"
                w="100%"
               
                defaultValue={consult.diagnostic}
              />
                </>) : (<></>)
              }
                         {
                consult.request.length >= 1  ? (<>
                   <Text
                pl="40px"
                textAlign="left"
                border="2px"
                fontWeight="bold"
                fontSize="lg"
                bgColor="gray.300"
                py="4px"
                w="100%"
              >
                {" "}
                Solicitação
              </Text>
              <Textarea
                borderRadius="0"
                bgColor="white"
                fontSize="md"
                fontWeight="bold"
                border="2px"
                w="100%"
               
                defaultValue={consult.request}
              />
                </>) : (<></>)
              }
              
            </Flex>
          </Flex>
        ))}
      </Flex>
      )

    break;
    default: 
    typeShowHistorieComponent = (
      <Flex direction="column" w="100%" h="100%">
      {consultsData?.petOldConsults?.map((consult) => (
        <Flex
          textAlign="center"
          direction="column"
          w="100%"
          key={consult.id}
        >
          <Text
            border="2px"
            fontSize="lg"
            bg="gray.300"
            color="black"
            fontWeight="bold"
          >{`Entrada: ${new Intl.DateTimeFormat("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: '2-digit'
          }).format(new Date(consult.date))}: ${consult.startAt} 
          - 
          Saida: ${new Intl.DateTimeFormat("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: '2-digit'
          }).format(new Date(consult.date))}: ${consult.endAt}
          -
          ${consult.consulType} - ${consult.vetName}`}</Text>
          <Flex align="center" textAlign="center" gap="0">
            <Text
              borderY="2px"
              fontWeight="bold"
              fontSize="lg"
              bgColor="gray.300"
              h="38px"
              w="20%"
            >
              Peso
            </Text>
            <Text
              border="2px"
              fontWeight="black"
              fontSize="lg"
              bgColor="white"
              h="38px"
              w="80%"
            >
              {consult.petWeight != 0 ? `${consult.petWeight}Kgs` : "Não informado"} 
            </Text>
            <Button
              maxH="38px"
              borderRadius="0px"
              colorScheme="red"
              isDisabled
            >
              Desconcluir
            </Button>
          </Flex>

          <Flex direction="column">
            <Text
              pl="40px"
              textAlign="left"
              border="2px"
              fontWeight="bold"
              fontSize="lg"
              bgColor="gray.300"
              py="4px"
              w="100%"
            >
              {" "}
              Sintomas
            </Text>
            <Textarea
              borderRadius="0"
              bgColor="white"
              fontSize="md"
              fontWeight="bold"
              border="2px"
              w="100%"
             
              defaultValue={consult.symptoms}
            />
            {
              consult.diagnostic.length >= 1  ? (<>
                 <Text
              pl="40px"
              textAlign="left"
              border="2px"
              fontWeight="bold"
              fontSize="lg"
              bgColor="gray.300"
              py="4px"
              w="100%"
            >
              {" "}
              Diagnóstico
            </Text>
            <Textarea
              borderRadius="0"
              bgColor="white"
              fontSize="md"
              fontWeight="bold"
              border="2px"
              w="100%"
             
              defaultValue={consult.diagnostic}
            />
              </>) : (<></>)
            }
                       {
              consult.request.length >= 1  ? (<>
                 <Text
              pl="40px"
              textAlign="left"
              border="2px"
              fontWeight="bold"
              fontSize="lg"
              bgColor="gray.300"
              py="4px"
              w="100%"
            >
              {" "}
              Solicitação
            </Text>
            <Textarea
              borderRadius="0"
              bgColor="white"
              fontSize="md"
              fontWeight="bold"
              border="2px"
              w="100%"
             
              defaultValue={consult.request}
            />
              </>) : (<></>)
            }
            
          </Flex>
        </Flex>
      ))}
    </Flex>
    )
    break;
  }

  console.log(oldHistorieData)
  return (
    <ChakraProvider>
      <Flex direction="column" h="100vh" w="100vw">
        <Flex w="100%" height="10vh" bgColor="gray.200">
          <Flex align="center" gap="2">
            <Text m="2" fontSize="2xl" fontWeight="bold">
              Prontuário do Sistema Antigo
            </Text>
            <Button
              colorScheme="teal"
              leftIcon={<BiHome size={24} />}
              onClick={() => navigate("/Home")}
            >
              Home
            </Button>

            <Button
              colorScheme="yellow"
              leftIcon={<TbArrowBack size={24} />}
              // onClick={() => navigate(`/Vets/Workspace/${id}/${queueId}`)}
              onClick={() => navigate(-1)}
            >
              Voltar
            </Button>
            <Button colorScheme="cyan" leftIcon={<GiMedicines size={24} />}>
              Histórico de medicação
            </Button>
            <Button leftIcon={<MdHistory size={24} />}
              colorScheme="red"
              onClick={() => navigate(`/Pets/MedicineRecord/${id}/${queueId}`)}
            >
              Prontuário Atual
            </Button>

          </Flex>
        </Flex>

        
         
        <MedicineContainer>
          <Flex
            direction="column"
            shadow="4px 0px 10px -2px rgba(0, 0, 0, 0.2)"
            w="100%"
          >
            
            <Flex
              p="4"
              gap={4}
              w="100%"
              fontSize="18"
              justifyContent="center"
              direction="column"
            >
              <TableContainer w="100%">
                <Table variant="simple" w="100%">
                  <Tbody>
                    <Tr>
                      <Th py="0" px="0" fontSize="18" w="30px">
                        Cliente
                      </Th>
                      <Th py="0" px="0">
                        <Input
                          py="6"
                          rounded="0"
                          borderColor="black"
                          defaultValue={consultsData?.customer?.name}
                        />
                      </Th>
                    </Tr>
                    <Tr>
                      <Th py="0" px="0" fontSize="18" color="black" w="30px">
                        Pet
                      </Th>
                      <Td py="0" px="0">
                        <Input
                          py="6"
                          rounded="0"
                          borderColor="black"
                          value={`Nome: ${consultsData?.name}, Raça: ${consultsData?.race}, Peso: ${consultsData?.weigth}Kgs, Sexo: ${consultsData?.sexo}, Cor:${consultsData?.corPet}`}
                          // value={`Nome: ${pets.name}, Raça: ${pets.race}, Peso: ${pets.weigth},  Sexo ${pets.sexo}, Cor: ${pets.corPet} `}
                        />
                      </Td>
                    </Tr>
                    <Tr py="0">
                      <Th
                        py="0"
                        px="0"
                        pr="5"
                        fontSize="18"
                        color="black"
                        w="30px"
                      >
                        Código Único
                      </Th>
                      <Td py="0" px="0">
                        <Input
                          py="6"
                          rounded="0"
                          borderColor="black"
                          defaultValue={consultsData?.CodAnimal}
                        />
                      </Td>
                    </Tr>
                  </Tbody>
                </Table>
              </TableContainer>
            </Flex>



            
            <Flex
              direction="column"
              w="100%"
              h="70%"
              bgColor="gray.100"
              rounded={4}
              className="secondmain"
            >
              <Flex w="100%" h="10%" justify="space-evenly" my="2">
                <Button
                  colorScheme="whatsapp"
                  w="33.3%"
                  borderX="2px solid green"
                  borderY="4px solid green"
                  borderLeft="4px solid green"
                  borderRadius={0}
                  onClick={() => setTypeShowHistorie("Consultas")}
                >
                  Consultas
                </Button>
                <Button
                  colorScheme="whatsapp"
                  w="33.3%"
                  borderX="2px solid green"
                  borderY="4px solid green"
                  borderRadius={0}
                  onClick={() => setTypeShowHistorie("Internações")}
                >
                  Internações
                </Button>
                <Button
                  colorScheme="whatsapp"
                  w="33.3%"
                  borderY="4px solid green"
                  borderX="2px solid green"
                  borderRight="4px solid green"
                  borderRadius={0}
                >
                  Outra Unidade
                </Button>
              </Flex>
              
        
              <Flex w="100%" h="100%" overflowY="auto">
                {
                  typeShowHistorieComponent
                }
               
              </Flex>

            </Flex>









          </Flex>
          <Flex width="50%" direction="column" className="one">
            <Flex
              height="50%"
              w="100%"
              textAlign="center"
              direction="column"
              borderRight="1px solid black"
            >
              <Flex
                w="100%"
                height="38px"
                bgColor="gray.100"
                align="center"
                justify="center"
                py="2"
                borderTop="1px solid black"
                bg="gray.600"
                textColor="white"
              >
                <Text fontWeight="bold">VACINAS</Text>
              </Flex>
              <TableContainer>
                <Table variant="striped">
                  <Thead>
                    <Tr>
                      <Th>Tipo</Th>
                      <Th></Th>
                      <Th borderLeft="2px solid black">Data</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {/* {pets.medicineRecords?.petVaccines?.map((vaccine) => (
                      <Tr key={vaccine.id}>
                        {vaccine.isDone === true ? (
                          <Td borderY="1px solid black">{vaccine.name}</Td>
                        ) : (
                          <Td borderY="1px solid black">{vaccine.name}</Td>
                        )}
                        <Td borderY="1px solid black"></Td>

                        <Td
                          borderY="1px solid black"
                          borderLeft="2px solid black"
                        >
                          {new Intl.DateTimeFormat("pt-BR").format(
                            new Date(
                              vaccine.requestedDate
                                ? vaccine.requestedDate
                                : Date.now()
                            )
                          )}
                        </Td>
                      </Tr>
                    ))} */}
                  </Tbody>
                </Table>
              </TableContainer>
            </Flex>

            <Flex
              direction="column"
              height="50%"
              w="100%"
              textAlign="center"
              borderRight="1px solid black"
            >
              <Flex
                w="100%"
                height="38px"
                bgColor="gray.100"
                align="center"
                justify="center"
                borderTop="1px solid black"
                bg="gray.600"
                textColor="white"
              >
                <Text fontWeight="bold">CIRURGIAS</Text>
              </Flex>
              <TableContainer>
                <Table>
                  <Thead>
                    <Tr>
                      <Th>Tipo</Th>
                      <Th></Th>
                      <Th borderLeft="2px solid black">Data</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {/* {pets.medicineRecords?.petSurgeries?.map((surgerie) => (
                      <Tr key={surgerie.id}>
                        {surgerie.status === "FINISHED" ? (
                          <Td borderY="1px solid black">{surgerie.name}</Td>
                        ) : (
                          <Td borderY="1px solid black">{surgerie.name}</Td>
                        )}
                        <Td borderY="1px solid black"></Td>

                        <Td
                          borderY="1px solid black"
                          borderLeft="2px solid black"
                        >
                          {new Intl.DateTimeFormat("pt-BR").format(
                            new Date(
                              surgerie.requestedDate
                                ? surgerie.requestedDate
                                : Date.now()
                            )
                          )}
                        </Td>
                      </Tr>
                    ))} */}
                  </Tbody>
                </Table>
              </TableContainer>
            </Flex>
          </Flex>

          <Flex
            width="50%"
            direction="column"
            className="two"
            borderLeft="1px solid black"
          >
           
            <Flex height="50%" w="100%" textAlign="center" direction="column">
              <Flex
                w="100%"
                height="38px"
                bgColor="gray.600"
                textColor="white"
                align="center"
                justify="center"
                borderTop="1px solid black"
              >
                <Text fontWeight="bold">Outros Pets</Text>
              </Flex>
              <TableContainer>
                <Table variant="striped">
                  <Thead>
                    <Tr>
                      <Th>Nome</Th>
        
                      <Th borderX="2px solid black">Data</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                  {pets?.customer?.pets.map((pet) => (
                      <Tr border="2px" bgColor="gray.200" key={pet.id}>
                        

                        <Td borderY="1px solid black">{pet.name}</Td>

                        <Td
                          borderY="1px solid black"
                          borderLeft="2px solid black"
                        >
                          {pet.race}
                        </Td>
                      </Tr>
                    ))}
                    {/* {pets.medicineRecords?.petBeds?.map((admission) => (
                      <Tr key={admission.id}>
                        <Td borderY="1px solid black">Internação</Td>

                        <Td borderY="1px solid black"></Td>

                        <Td
                          borderY="1px solid black"
                          borderLeft="2px solid black"
                        >
                          {new Intl.DateTimeFormat("pt-BR").format(
                            new Date(
                              admission?.entryOur
                                ? admission.entryOur
                                : Date.now()
                            )
                          )}
                        </Td>
                      </Tr>
                    ))} */}
                  </Tbody>
                </Table>
              </TableContainer>
            </Flex>

            <Flex height="50%" w="100%" textAlign="center" direction="column">
              <Flex
                w="100%"
                height="38px"
                py="2"
                bgColor="gray.600"
                textColor="white"
                align="center"
                justify="center"
                borderTop="1px solid black"
              >
                <Text fontWeight="bold">EXAMES</Text>
              </Flex>
              <Flex
                w="100%"
                height="38px"
                bgColor="gray.100"
                gap={2}
                align="center"
                justify="space-evenly"
                borderTop="1px solid black"
              >
                <Text fontWeight="bold" color="red">
                  Vermelhos/Por Fazer
                </Text>
                <Text fontWeight="bold" color="green">
                  Verde/Pronto
                </Text>
              </Flex>
              <TableContainer w="100%">
                <Table  variant="unstyled">
                  <Thead>
                    <Tr>
                      <Th>Tipo</Th>
                      
                      <Th borderLeft="2px solid black">Data</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                     {examsData?.map((exam) => (
                      <Tr
                      onClick={() => handleOpenOldResultExams({CodCli: exam.codCli, CodConsulta: exam.CodExamConsulta})}
                      bgColor="green.200" key={exam.id}>
                 
                      <Td borderY="1px solid black">{exam.name}</Td>
                    
                        <Td
                          borderY="1px solid black"
                          borderLeft="2px solid black"
                        >
                          {new Intl.DateTimeFormat("pt-BR").format(
                            new Date(
                              exam.madeAt ? exam.madeAt : Date.now()
                            )
                          )}
                        </Td>
                      </Tr>
                    ))} 
                  </Tbody>
                </Table>
              </TableContainer>

          
            </Flex>
          </Flex>
        </MedicineContainer>
   
      </Flex>
    </ChakraProvider>
  );
}
