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
  Checkbox,
  HStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Header } from "../../components/admin/Header";
import { GenericLink } from "../../components/Sidebars/GenericLink";
import { GenericSidebar } from "../../components/Sidebars/GenericSideBar";
import { FaClipboardList, TbVaccine } from "react-icons/all";
import { AdminContainer } from "../../pages/AdminDashboard/style";
import { useNavigate } from "react-router-dom";
import { api } from "../../lib/axios";
import { AdmissionSearch } from "../Search/admissionSearch";
import { BiHome } from "react-icons/all";
import { PetDetaisl } from "../../interfaces";
import moment from "moment";

interface QueueProps {
  response: [];
  totalInQueue: number;
}

export function SearchAdmission() {
  const [inQueue, setInQueue] = useState<QueueProps[]>([]);
  const [addmitedPets, setAdmmitedPets] = useState<PetDetaisl[]>([])
  const navigate = useNavigate();
  useEffect(() => {
    async function getQueue() {
      const response = await api.get("/petsadmitted")
      setAdmmitedPets(response.data)
    }
    getQueue();
  }, [inQueue.length]);





  return (
    <ChakraProvider>
      <AdminContainer>
        <Flex direction="column" h="100vh">
          <Header title="Painel de Internações" url="/Home" />
          <Flex w="100%" my="6" mx="auto" px="6">
            <GenericSidebar>
              <GenericLink
                name="Exames"
                icon={FaClipboardList}
                path="/Labs/Exames"
              />
              <GenericLink
                name="Vacinas"
                icon={TbVaccine}
                path="/Recepcao/Internacoes/Vacinas"
              />
              <GenericLink name="Recepção" icon={BiHome} path="/Recepcao" />
            </GenericSidebar>
            <Box w="100%" borderRadius={8} bg="gray.200" p="8">
              <Flex mb="8" gap="8" direction="column" align="center">
               
                <AdmissionSearch path="vetsearch" />

                <Flex align="center" gap={4}>
                <Text>Legenda:</Text> 
                <HStack>
                <Text fontWeight="bold">Abaixo de 48 horas</Text>
                <Box  border="1px"  bgColor="green.200"  w={4} h={4} />
                </HStack>
                <HStack>
                <Text  fontWeight="bold" >Acima de 48 horas </Text>
                <Box  border="1px" bgColor="red.200"  w={4} h={4} />
                <Text  fontWeight="hairline" >(prioridade)</Text>
                </HStack>
               
                </Flex>

                <Flex textAlign="center" justify="center">
                  <Table colorScheme="blackAlpha">
                    <Thead>
                      <Tr>
                        <Th>Proprietário</Th>
                        <Th>Animal</Th>
                        <Th>Espécie</Th>
                        <Th>Raça</Th>
                        <Th>Data</Th>
                        <Th>Código</Th>
                        <Th>Canil</Th>
                        <Th>Leito</Th>
                      </Tr>
                    </Thead>

                    <Tbody>
                          {
                            addmitedPets.length >= 1 ? addmitedPets.map((pet) => {
                              //@ts-ignore
                              const actualDate = moment(new Date()).diff(pet?.bed?.entryOur, 'minutes')
                              console.log("DIF MINUTES", actualDate)
                              return  <Tr 
                              bgColor={actualDate >= 2880 ? 'red.200' : 'green.200'}
                              onClick={() => navigate(`/Admissions/${pet.id}/${pet?.medicineRecords?.petBeds[0]?.openedAdmissionId}`)} key={pet.id}>
                              <Td>{pet.customer.name}</Td>
                              <Td>{pet.name}</Td>
                              <Td>{pet.especie}</Td>
                              <Td>{pet.race}</Td>
                              <Td>{new Intl.DateTimeFormat('pt-BR', {
                                    day: '2-digit',
                                    month: '2-digit',
                                    year: '2-digit',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                //@ts-ignore
                             }).format(new Date(pet?.bed?.entryOur))}</Td>
                             <Td>
                              {pet.CodAnimal}
                             </Td>
                             <Td>
                             
                              {
                                //@ts-ignore
                              pet?.bed?.kennel.name
                              }
                             </Td>
                             <Td>{
                             //@ts-ignore
                             pet?.bed?.id}</Td>
                          </Tr>
                            }
                              ) : 
                            (<Tr>
                                <h1>SEM ANIMAIS INTERNADOS NO MOMENTO</h1>
                            </Tr>)
                          }
                    </Tbody>
                  </Table>
                </Flex>
              </Flex>
            </Box>
          </Flex>
        </Flex>
      </AdminContainer>
    </ChakraProvider>
  );
}
