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

interface QueueProps {
  response: [];
  totalInQueue: number;
}

export function LabExames() {
  let { dataCustomer, dataPet } = useContext(DbContext);
  const [labs, setLabs] = useState([] as any);
  const [inQueue, setInQueue] = useState<QueueProps[]>([]);
  const [totalInQueue, setTotalInQueue] = useState(0 as any);
  const [exams, setExams] = useState([] as any)
  const navigate = useNavigate();




  useEffect(() => {
    async function getQueue() {
      const response = await api.get("/pets/queue");
      const total = await api.get("/pets/queue");
      const labs = await api.get("/labs");
      // const total = await api.get("/pets/queue");
      setLabs(labs.data.exams);
      setExams(labs.data.allExams)
      setTotalInQueue(total.data);
      setInQueue(response.data.response);
    }
    getQueue();
  }, [inQueue.length]);


   

console.log('a',labs)
   
  let typeTable: ReactNode;
  switch (true) {
    case Object.keys(dataPet).length >= 1:
      typeTable = (
        <Table colorScheme="blackAlpha">
          <Thead>
            <Tr>
              <Th>Animal</Th>
              <Th>Procedimentos</Th>
              <Th>Código</Th>
              <Th>Data</Th>
              <Th>Hora</Th>
              <Th>Preferência</Th>
              <Th>Especialidade</Th>
            </Tr>
          </Thead>

          <Tbody>
            {dataPet.map((pet: any) => (
              <Tr key={pet.id}>
                <Td>
                  <Button
                    colorScheme="whatsapp"
                    onClick={() => navigate(`/Labs/Set/${pet.id}`)}
                  >
                    {pet.petName}
                  </Button>
                </Td>
                <Td>
                  <Text>{pet.name}</Text>
                </Td>
                <Td>92487</Td>
                <Td>04/04/2023</Td>

                <Td>25:53</Td>
                <Td>
                  {pet.vetPreference ? pet.vetPreference : "Sem Preferência"}
                </Td>
                <Td>Sem Especialidade</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      );
      break;
    case Object.keys(dataCustomer).length >= 1:
      typeTable = (
        <Table colorScheme="blackAlpha">
          <Thead>
            <Tr>
              <Th>Animal</Th>
              <Th>Procedimentos</Th>
              <Th>Código</Th>
              <Th>Data</Th>
              <Th>Hora</Th>
              <Th>Preferência</Th>
              <Th>Especialidade</Th>
            </Tr>
          </Thead>

          <Tbody>
            {dataCustomer.map((customer: any) => (
              <Tr key={customer.id}>
                <Td>{customer.petName}</Td>

                <Td>
                  <Button
                    colorScheme="whatsapp"
                    onClick={() => navigate(`/Labs/Set/${customer.id}`)}
                  >
                    {customer.name}
                  </Button>
    
                </Td>

                <Td>92487</Td>
                <Td>04/04/2023</Td>

                <Td>25:53</Td>
                <Td>
                  {customer.vetPreference
                    ? customer.vetPreference
                    : "Sem Preferência"}
                </Td>
                <Td>Sem Especialidade</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      );
      break;
    case labs.length >= 1:
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
                <VetsSearch path="labsearch" />
                <Button
                  colorScheme="teal"
                  onClick={() => navigate("/Queue/Labs")}
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
