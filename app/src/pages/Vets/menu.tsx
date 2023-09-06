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
  RadioGroup,
  Radio,
  Menu,
  MenuButton,
  MenuList,
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
import { Link, useNavigate } from "react-router-dom";
import { UniversalSearch } from "../../components/Search/universalSearch";
import { DbContext } from "../../contexts/DbContext";
import { StyledBox } from "../../components/Header/style";
import { MdPets as Burger } from "react-icons/all";
import { toast } from "react-toastify";
import { LoadingSpinner } from "../../components/Loading";
import { api } from "../../lib/axios";
import { Queue } from "phosphor-react";
import { VetsSearch } from "../../components/Search/vetsSearch";
import { Input } from "../../components/admin/Input";

interface QueueProps {
  response: [];
  totalInQueue: number;
}

export function MenuVet() {
  const [petValue, setPetValue] = useState("");
  const [petTotal, setPetTotal] = useState([]);
  const [inQueue, setInQueue] = useState<QueueProps[]>([]);
  const [totalInQueue, setTotalInQueue] = useState(0 as any);
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

  const handleNavigateWorkSpace = () => {
    if (!petValue) {
      toast.error("Selecione um PET");
      return;
    }
    navigate(`/Vets/Workspace/${petValue}`);
  };

  let typeTable: ReactNode;
  switch (true) {
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
                      <Checkbox border="2px" size="lg"  />
                      <FormLabel>Internados</FormLabel>
                      <Checkbox  border="2px" size="lg"  />
                    </VStack>
                  </HStack>
                    
                  </Flex>
          
                  <HStack mt="4" w="100%">
                   
                    <Input name="codPet" label="Código do Animal" />
                    <Input name="petName" label="Nome do Animal" />
                    <Input name="customerName" label="Nome do Cliente" />
                    
                    
                  </HStack>
                  <Button mt="4" colorScheme="whatsapp">FILTRAR</Button>
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
