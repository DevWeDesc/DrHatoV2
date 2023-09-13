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
  FormLabel,
} from "@chakra-ui/react";
import { ReactNode, useContext, useEffect, useState } from "react";
import { Header } from "../../components/admin/Header";
import { GenericLink } from "../../components/Sidebars/GenericLink";
import { GenericSidebar } from "../../components/Sidebars/GenericSideBar";
import { AiOutlineSearch } from "react-icons/all";
import { AdminContainer } from "../AdminDashboard/style";
import {  useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { LoadingSpinner } from "../../components/Loading";
import { api } from "../../lib/axios";
import { Input } from "../../components/admin/Input";

interface QueueProps {
  response: [];
  totalInQueue: number;
}

interface SearchProps {
  isFinished?: boolean;
  initialDate?: Date;
  finalDate?: Date;

}

export function MenuVet() {
  const [petName, setPetName] = useState("");
  const [codPet, setCodPet] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [isFinishied, setIsFinishied] = useState(false);
  const [totalInQueue, setTotalInQueue] = useState(0 as any);
  const [petTotal, setPetTotal] = useState([]);
  const [inQueue, setInQueue] = useState<QueueProps[]>([]);
  const [petData, setPetData] = useState([] as any); 
  const [dataByFilter, setDataByFilter] = useState([] as any); 
  const navigate = useNavigate();

  useEffect(() => {
    async function getQueue() {
      const response = await api.get("/pets/queue");
      const total = await api.get("/pets/queue");
      setTotalInQueue(total.data);
      setInQueue(response.data.response);
      setPetTotal(total.data.response);
    }
    getQueue();
  }, [inQueue.length]);


  let typeTable: ReactNode;
  switch (true) {
    case petData.length >= 1:
    typeTable = (
      <>
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
          {petData.length >= 1 ?  petData?.map((pet: any) => (
            <Tr
              key={pet?.id}
              cursor="pointer"
              onClick={() => navigate(`/Vets/Workspace/${pet?.id}`)}
            >
              <Td>
                <Text colorScheme="whatsapp">{pet?.customer?.cpf}</Text>
              </Td>

              <Td>{pet?.customer?.name}</Td>

              <Td
                cursor="pointer"
                onClick={() => navigate(`/Vets/Workspace/${pet.id}`)}
              >
                {pet?.name}
              </Td>
              <Td>{pet?.codPet}</Td>
              <Td></Td>
              <Td></Td>
              <Td>
                Sem preferência
              </Td>
              <Td>0</Td>
            </Tr>
          )): (<LoadingSpinner/>)}
        </Tbody>
      </Table>
    </>
    )
    break;
    case dataByFilter.length >= 1:
      typeTable = (
        <Table>
          <Thead>
            <Th>Cliente</Th>
            <Th>Animal</Th>
            <Th>Veterinário responsável</Th>
            <Th>Tipo de Consulta</Th>
            <Th>Entrada</Th>
            <Th>Saída</Th>
          </Thead>
          <Tbody>
           {
            dataByFilter.length >= 1 ? dataByFilter?.map((data: any) => (
              <Tr key={data.id}  onClick={() => navigate(`/Vets/Workspace/${data?.medicine?.pet?.id}`)}  >
                  <Td>
                    {data?.medicine?.pet?.customer?.name}
                  </Td>
                  <Td>
                  {data?.medicine?.pet?.name}
                  </Td>
                  <Td>
                    {data?.responsibleVeterinarian}
                  </Td>
                  <Td>
                    {data?.queryType}
                  </Td>
                  <Td>{new Intl.DateTimeFormat('pt-BR').format(new Date(data?.queueEntry ? data?.queueEntry : Date.now()))}</Td>
                  <Td>{new Intl.DateTimeFormat('pt-BR').format(new Date(data?.queueExit ? data?.queueExit : Date.now()))}</Td>

              </Tr>
            ))  : (<LoadingSpinner />)
           }
          </Tbody>
        </Table>
      )
      break;
    default:
      typeTable = (
        <>
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
                    {pet.vetPreference ? pet.vetPreference : "Sem Preferência"}
                  </Td>
                  <Td>0</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </>
      );
      break;
  }


  async function searchDataVet() {
    let typeSearch;
    switch(true) {
      case petName.length >= 1:
        typeSearch  = await api.get(`filtredquery?petName=${petName}`)
      break;
      case codPet.length >= 1:
        typeSearch  = await api.get(`filtredquery?codPet=${codPet}`)
      break;
      case customerName.length >= 1:
        typeSearch  = await api.get(`filtredquery?customerName=${customerName}`)
      break;
    }

    if(typeSearch === null || typeSearch === undefined) return
    setPetData(typeSearch.data)
  }
  async function handleSearchData () {
    try {
      if(isFinishied === true) {
        const response = await api.get("/filtredquery?isFinished=1")
        setPetData("")
        setDataByFilter(response.data)
      } 
     
     toast.success("Pesquisa realizada!")
    } catch (error) {
      toast.error("Falha ao realizar busca!")
    }
  }

  useEffect(() => {
    searchDataVet() 
    
  },[petName, codPet, customerName])

  

  console.log(dataByFilter)

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
                    <Input name="initialData" label="data inicial" type="date" />
                    <Input name="finalData" label="data final" type="date" />
                    <VStack>
                      <FormLabel>Finalizados</FormLabel>
                      <Checkbox onChange={(ev) =>
                    ev.target.checked === true
                      ? setIsFinishied(true)
                      : setIsFinishied(false)
                  } border="2px" size="lg"  />
                      <FormLabel>Internados</FormLabel>
                      <Checkbox  border="2px" size="lg"  />
                    </VStack>
                  </HStack>
                    
                  </Flex>
          
                  <HStack mt="4" w="100%">
                   
                    <Input name="codPet" defaultValue="" onChange={(ev) => setCodPet(ev.target.value)} label="Código do Animal" />
                    <Input name="petName"  defaultValue="" onChange={(ev) => setPetName(ev.target.value) }  label="Nome do Animal" />
                    <Input name="customerName"  defaultValue="" onChange={(ev) => setCustomerName(ev.target.value)} label="Nome do Cliente" />
                    
                    
                  </HStack>
                  <Button onClick={() => handleSearchData()} mt="4" colorScheme="whatsapp">FILTRAR</Button>
                </Flex>
                <Button colorScheme="teal" onClick={() => navigate("/Queue")}>
                  <>TOTAL NA FILA: {totalInQueue.totalInQueue}</>
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
