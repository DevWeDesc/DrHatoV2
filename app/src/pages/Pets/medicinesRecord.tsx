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
  TableContainer,
  Input,
  Textarea,
  HStack
} from '@chakra-ui/react'
import { BiHome, TbArrowBack } from 'react-icons/all'
import { useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { api } from '../../lib/axios'
import { MedicineContainer } from './style'
import { PetDetaisl } from '../../interfaces'

interface Customer {
  id: string | number
  name: string
}

interface PetProps {
  id: number
  name: string
  especie: string
  corPet: string
  observations: string
  race: string
  rga: number
  sizePet: string
  weigth: string
  sexo: string
  status: string
  bornDate: string
  customer: {
    name: string;
  }
  codPet: string

  medicineRecords: {
    petBeds: Array<{
      id: number;
      entryOur: string;
    }>
    petExams: Array<{
      id: number;
      name: string;
      requesteData: string
      doneExame: boolean
    }>
    petQueues: Array<{
      id: number
     queueEntry: string
     queueExit: string
     queryType: string
     responsibleVeterinarian: string
     petWeight: string
     observations: string
    }>
    petSurgeries: Array<{}>
    petVaccines: Array<{}>
  }
}

export function MedicineRecords() {
  const { id } = useParams<{ id: string }>()
  const [pets, setPets] = useState({} as PetProps)
  const navigate = useNavigate()

  async function getPet() {
    try {
      const response = await api.get(`/pets/history/${id}`)
      setPets(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getPet()
  }, [])


  console.log(pets)

  return (
    <ChakraProvider>
      <Flex direction="column" h="100vh" w="100vw">
        <Flex w="100%" height="10vh" bgColor="gray.200">
          <Flex align="center" gap="2">
            <Text m="2" fontSize="2xl" fontWeight="bold">
              Prontuário
            </Text>
            <Button
              colorScheme="teal"
              leftIcon={<BiHome size={24} />}
              onClick={() => navigate('/Home')}
            >
              Home
            </Button>

            <Button
              colorScheme="yellow"
              leftIcon={<TbArrowBack size={24} />}
              onClick={() => navigate(`/Vets/Workspace/${id}`)}
            >
              Voltar
            </Button>
          </Flex>
        </Flex>

        <MedicineContainer>
          <Flex
            direction="column"
            shadow="4px 0px 10px -2px rgba(0, 0, 0, 0.2)"
            zIndex="1"
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
                          value={pets?.customer?.name}
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
                          value={`Nome: ${pets.name}, Raça: ${pets.race}, Peso: ${pets.weigth},  Sexo ${pets.sexo}, Cor: ${pets.corPet} `}
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
                          value={pets.codPet}
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
                <Button colorScheme="whatsapp" w="32%">
                  Consultas
                </Button>
                <Button colorScheme="whatsapp" w="32%">
                  Internações
                </Button>
                <Button colorScheme="whatsapp" w="32%">
                  Outra Unidade
                </Button>
              </Flex>

              <Flex w="100%" h="100%" overflowY="auto">
                  <Flex direction="column"  w="100%" h="100%">
                  {
                    pets?.medicineRecords?.petQueues.map((queue) => (
                      <Flex  textAlign="center"  direction="column" w="100%" key={queue.id}>
                      <Text border="2px" fontSize="lg" color="black" fontWeight="bold">{`Entrada: ${new Intl.DateTimeFormat('pt-BR',{
                        day: '2-digit',
                        month: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit'
                      } ).format(new Date(queue.queueEntry))} 
                      - 
                      Saida: ${new Intl.DateTimeFormat('pt-BR',{
                        day: '2-digit',
                        month: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit'
                      } ).format(new Date(queue.queueExit))}
                      -
                      ${queue.queryType} - ${queue.responsibleVeterinarian}`}</Text>
                      <Flex m="2" align="center" textAlign="center" gap="2">
                      <Text border="2px"  fontWeight="bold"  fontSize="lg"  bgColor="gray.300" h="38px" w="20%"> Peso</Text>
                      <Text  border="2px"  fontWeight="black" fontSize="lg" bgColor="white"  h="38px" w="80%"> {queue.petWeight}</Text>
                      </Flex>
               
                        <Flex align="center" gap="2">
                        <Text  border="2px"  fontWeight="bold"  fontSize="lg"  bgColor="gray.300" h="38px" w="20%" > Observações</Text>
                        <Textarea bgColor="white"  fontSize="md" fontWeight="bold"  border="2px"  w="90%" defaultValue={queue.observations} />
                        </Flex>
                     
                     
                      </Flex>
                    ))}
                  
                  </Flex>
              </Flex>
            </Flex>
          </Flex>
          <Flex width="40%" direction="column" className="one">
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
              >
                <Text fontWeight="bold">VACINAS</Text>
              </Flex>
              <Flex
                w="100%"
                height="38px"
                bgColor="gray.200"
                gap={2}
                align="center"
                justify="space-evenly"
                borderTop="1px solid black"
              >
                <Text fontWeight="bold">TIPOS</Text>
                <Text fontWeight="bold">DATA</Text>
              </Flex>
              <Flex direction="row" w="100%" h="100%" overflowY="auto">
                <Flex
                  w="100%"
                  h="38px"
                  bgColor="cyan.100"
                  align="center"
                  borderY="2px"
                  justify="space-evenly"
                >
                  <Text fontWeight="bold">Anti Rabica</Text>
                  <Text fontWeight="bold">11/04/22</Text>
                </Flex>
              </Flex>
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
              >
                <Text fontWeight="bold">CIRURGIAS</Text>
              </Flex>
              <Flex
                w="100%"
                height="38px"
                bgColor="gray.200"
                gap={2}
                align="center"
                justify="space-evenly"
                borderY="1px solid black"
              >
                <Text fontWeight="bold">TIPOS</Text>
                <Text fontWeight="bold">DATA</Text>
              </Flex>
            </Flex>
          </Flex>

          <Flex
            ml="1"
            width="40%"
            direction="column"
            className="two"
            borderLeft="1px solid black"
          >
            <Flex height="50%" w="100%" textAlign="center" direction="column">
              <Flex
                w="100%"
                height="38px"
                py="2"
                bgColor="gray.100"
                align="center"
                justify="center"
                borderTop="1px solid black"
              >
                <Text fontWeight="bold">EXAMES</Text>
              </Flex>
              <Flex
                w="100%"
                height="40px"
                bgColor="gray.200"
                gap={2}
                align="center"
                pl="6"
                pr="6"
                justify="space-between"
                borderTop="1px solid black"
              >
                <Text fontWeight="bold">TIPOS</Text>
                <Text fontWeight="bold">DATA</Text>
              </Flex>
              <Flex
                direction="column"
                height="100%"
                width="100%"
                overflowY="auto"
              >
                {pets.medicineRecords?.petExams?.map(exam => (
                  <Flex
                    key={exam.id}
                    borderY="1px"
                    bgColor="cyan.100"
                    align="center"
                    height="38px"
                    width="100%"
                    pl="6"
                    pr="6"
                    justify="space-between"
                  >
                    {exam.doneExame === true ? (
                      <Text color="green.400" fontWeight="bold">
                        {exam.name}
                      </Text>
                    ) : (
                      <Text color="red.400" fontWeight="bold">
                        {exam.name}
                      </Text>
                    )}
                    <Text fontWeight="bold" fontSize="lg">
                      {new Intl.DateTimeFormat('pt-BR').format(
                        new Date(exam.requesteData ? exam.requesteData : Date.now() )
                      )}
                    </Text>
                  </Flex>
                ))}
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
            </Flex>
            <Flex height="50%" w="100%" textAlign="center" direction="column">
              <Flex
                w="100%"
                height="38px"
                bgColor="gray.100"
                align="center"
                justify="center"
                borderTop="1px solid black"
              >
                <Text fontWeight="bold">INTERNAÇÕES</Text>
              </Flex>
              <Flex
                w="100%"
                height="38px"
                bgColor="gray.200"
                gap={2}
                align="center"
                justify="space-evenly"
                borderY="1px solid black"
              >
                <Text fontWeight="bold">TIPOS</Text>
                <Text fontWeight="bold">DATA</Text>
              </Flex>
              {
                pets.medicineRecords?.petBeds?.map((admission) => (
                  <Flex
                  key={admission.id}
                  w="100%"
                  height="38px"
                  bgColor="cyan.100"
                  gap={2}
                  align="center"
                  justify="space-evenly"
                  borderY="1px solid black"

                >
                  <Text fontWeight="bold">Internação</Text>
                  <Text fontWeight="bold">{new Intl.DateTimeFormat('pt-BR').format(new Date(admission?.entryOur ? admission.entryOur : Date.now()))}</Text>
                </Flex>
                ) )
              }
        
         
            </Flex>
          </Flex>
        </MedicineContainer>
      </Flex>
    </ChakraProvider>
  )
}
