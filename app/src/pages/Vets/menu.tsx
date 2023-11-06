import {
  Box,
  ChakraProvider,
  Flex,
  Table,
  Tr,
  Td,
  Thead,
  Tbody,
  Th,
  Text,
  Button,
  HStack,
  VStack,
  Checkbox,
  FormLabel
} from '@chakra-ui/react'
import {  useEffect, useState } from 'react'
import { Header } from '../../components/admin/Header'
import { GenericLink } from '../../components/Sidebars/GenericLink'
import { GenericSidebar } from '../../components/Sidebars/GenericSideBar'
import { AiOutlineSearch } from 'react-icons/all'
import { AdminContainer } from '../AdminDashboard/style'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { api } from '../../lib/axios'
import { Input } from '../../components/admin/Input'
interface QueueProps {
  response: []
  totalInQueue: number
}



export function MenuVet() {
  const [petName, setPetName] = useState('')
  const [codPet, setCodPet] = useState('')
  const [customerName, setCustomerName] = useState('')
  const [isFinishied, setIsFinishied] = useState(false)
  const [isAddmited, setIsAddmited] = useState(false)
  const [totalInQueue, setTotalInQueue] = useState(0 as any)
  const [petTotal, setPetTotal] = useState([])
  const [inQueue, setInQueue] = useState<QueueProps[]>([])
  const [petData, setPetData] = useState([] as any)
  const [dataByFilter, setDataByFilter] = useState([] as any)
  const [initialDate, setInitialDate] = useState("");
  const [finalDate, setFinalDate] = useState("");

  const navigate = useNavigate()

  useEffect(() => {
    async function getQueue() {
      const response = await api.get('/pets/queue')
      const total = await api.get('/pets/queue')
      setTotalInQueue(total.data)
      setInQueue(response.data.response)
      setPetTotal(total.data.response)
    }
    getQueue()
  }, [inQueue.length])

  

  async function searchDataVet() {
    switch (true) {
      case petName?.length >= 1:
        await api.get(`vetmenusearch?petName=${petName}`).then(res => {
          setPetData(res.data)
        })
        break
      case codPet?.length >= 1:
        await api.get(`vetmenusearch?petCode=${codPet}`).then(res => {
          setPetData(res.data)
        })
        break
      case customerName?.length >= 1:
        await api
          .get(`vetmenusearch?customerName=${customerName}`)
          .then(res => {
            setPetData(res.data)
          })
        break
      case isFinishied === true:
        await api.get(`vetmenusearch?isFinished=true`).then(res => {
          setPetData(res.data)
          console.log(res.data)
        })
        break
        case isAddmited === true:
          await api.get(`vetmenusearch?isAddmited=true`).then(res => {
            setPetData(res.data)
          })
        break;
    }
  }

 const handleGetDataWithParams =  async () => {

  switch(true) {
    case isFinishied === true:
      await api.get(`vetmenusearch?isFinished=true&initialDate=${initialDate}&finalDate=${finalDate}`).then((res) =>
      {  setPetData(res.data)
      })
    break
    case isAddmited === true:
      await api.get(`vetmenusearch?isAddmited=true&initialDate=${initialDate}&finalDate=${finalDate}`).then((res) =>
      {  setPetData(res.data)
        console.log(res.data)
      })
    break
  }
      
  }

  useEffect(() => {
    searchDataVet()
  }, [petName, codPet, customerName, isFinishied, isAddmited])


 

  return (
    <ChakraProvider>
      <AdminContainer>
        <Flex direction="column" h="100vh">
          <Header title="Painel Veterinário" url="/Home" />
          <Flex w="100%" my="6" maxWidth={1680} mx="auto" px="6">
            <GenericSidebar>
              <GenericLink
                name="Pesquisar Cliente"
                icon={AiOutlineSearch}
                path="/Vets/Menu"
              />
            </GenericSidebar>
            <Box flex="1" borderRadius={8} bg="gray.200" p="8">
              <Flex mb="8" gap="8" direction="column" align="center">
                <Flex direction="column">
                  <Flex align="center" justify="center" gap="8">
                    <HStack spacing={8}>
                      <Input
                        name="initialDate"
                        onChange={(ev) => setInitialDate(ev.target.value)}
                        label="data inicial"
                        type="date"
                      />
                      <Input 
                      name="finalDate" 
                      onChange={(ev) => setFinalDate(ev.target.value)}
                      label="data final" 
                      type="date" />
                      <VStack>
                        <FormLabel>Finalizados</FormLabel>
                        <Checkbox
                          onChange={ev =>
                            ev.target.checked === true
                              ? setIsFinishied(true)
                              : setIsFinishied(false)
                          }
                          border="2px"
                          size="lg"
                        />
                        <FormLabel>Internados</FormLabel>
                        <Checkbox
                         onChange={ev =>
                          ev.target.checked === true
                            ? setIsAddmited(true)
                            : setIsAddmited(false)
                        }
                        
                        border="2px" size="lg" />
                      </VStack>
                    </HStack>
                  </Flex>

                  <HStack mt="4" w="100%">
                    <Input
                      name="codPet"
                      value={codPet}
                      onChange={ev => setCodPet(ev.target.value)}
                      label="Código do Animal"
                    />
                    <Input
                      name="petName"
                      value={petName}
                      onChange={ev => setPetName(ev.target.value)}
                      label="Nome do Animal"
                    />
                    <Input
                      name="customerName"
                      value={customerName}
                      onChange={ev => setCustomerName(ev.target.value)}
                      label="Nome do Cliente"
                    />
                  </HStack>
                  <Button
                    onClick={handleGetDataWithParams}
                    mt="4"
                    colorScheme="whatsapp"
                    
                  >
                    FILTRAR
                  </Button>
                </Flex>
                <Button colorScheme="teal" onClick={() => navigate('/Queue')}>
                  <>TOTAL NA FILA: {totalInQueue.totalInQueue}</>
                </Button>
                <Flex textAlign="center" justify="center">

                            
             
                    {
                      petData.length >=1 ? (
                        <Table colorScheme="blackAlpha">
                                  <Thead>
                                    <Tr>
                                      <Th>CPF</Th>
                                      <Th>Cliente</Th>
                                      <Th>Animal</Th>
                                      <Th>Cod</Th>
                                      <Th>Peso</Th>
                                      <Th>Preferência</Th>
                                    
                                    </Tr>
                                  </Thead>
                      
                                  <Tbody>
                                    {petData?.map(
                                      (pet: any) => (
                                        <Tr
                                          key={pet?.id}
                                          cursor="pointer"
                                          onClick={() => navigate(`/Vets/Workspace/${pet?.id}`)}
                                        >
                                          <Td>
                                            <Text colorScheme="whatsapp">
                                              {pet?.customer.cpf}
                                            </Text>
                                          </Td>
                      
                                          <Td>{pet?.customer.name}</Td>
                      
                                          <Td
                                            cursor="pointer"
                                            onClick={() => navigate(`/Vets/Workspace/${pet.id}`)}
                                          >
                                            {pet?.name}
                                          </Td>
                                          <Td>
                                            {pet?.codPet}
                                          </Td>
                                          <Td>{pet?.weigth}</Td>
                                          <Td>{pet?.customer.vetPreference ? pet?.customer.vetPreference : "Sem Preferência"}</Td>
                                          
                                        </Tr>
                                      )
                                    )}
                                  </Tbody>
                                </Table>
                      ) : (
                        <Table colorScheme="blackAlpha">
                        <Thead>
                          <Tr>
                            <Th>CPF</Th>
                            <Th>Cliente</Th>
                            <Th>Animal</Th>
                            <Th>Código</Th>
                            <Th>Data</Th>
                            <Th>Hora</Th>
                            <Th>Preferência</Th>
                            <Th>Especialidade</Th>
                          </Tr>
                        </Thead>
            
                        <Tbody>
                          {petTotal.map((pet: any) => (
                            <Tr
                              key={pet.id}
                              cursor="pointer"
                              onClick={() => navigate(`/Vets/Workspace/${pet.id}`)}
                            >
                              <Td>
                                <Text colorScheme="whatsapp">{pet.customerCpf}</Text>
                              </Td>
            
                              <Td>{pet.customerName}</Td>
            
                              <Td
                                cursor="pointer"
                                onClick={() => navigate(`/Vets/Workspace/${pet.id}`)}
                              >
                                {pet.name}
                              </Td>
                              <Td>{pet.codPet}</Td>
                              <Td>{pet.queueEntry}</Td>
                              <Td>{pet.ouor}</Td>
                              <Td>
                                {pet.vetPreference ? pet.vetPreference : 'Sem Preferência'}
                              </Td>
                              <Td>0</Td>
                            </Tr>
                          ))}
                        </Tbody>
                      </Table>
                      )
                    }




                  
                </Flex>
              </Flex>
            </Box>
          </Flex>
        </Flex>
      </AdminContainer>
    </ChakraProvider>
  )
}
