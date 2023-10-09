import {
    Box,
    Button,
    ChakraProvider,
    Flex,
    FormControl,
    Heading,
    Icon,
    Table,
    Tbody,
    Td,
    Th,
    Thead,
    Tr
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { RiAddLine, RiPencilLine } from "react-icons/ri";
import { useParams } from "react-router-dom";
import { Header } from "../../components/admin/Header";
import { Sidebar } from "../../components/admin/Sidebar";
import { AdminContainer } from "../AdminDashboard/style";
import { api } from "../../lib/axios";
import { GenericModal } from "../../components/Modal/GenericModal";
import { Input } from "../../components/admin/Input";
import { toast } from "react-toastify";

  interface EspProps {
    id: number;
    name: string
    race: Array<
    {
       id: number;
       name: string; 
    }>
  }

  export function AdminCadRaces() {
    const [especies, setEspecies] = useState({} as EspProps);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [reloadData, setReloadData] = useState(false);
    const { espId} = useParams<{ espId: string }>();
    const [raceName, setRaceName] = useState("")
  

  
    async function getEspecies() {
      const especie = await api.get(`/pets/especie/${espId}`);
      setEspecies(especie.data.esp);
    }
  
    useEffect(() => {
        getEspecies()
    }, []);

    
    function openModal() {
        setIsModalOpen(true);
      }
      function closeModal() {
        setIsModalOpen(false);
      }
    
    async function hadleNewRace() {
        try {
            const data = {
                espId: Number(espId),
                name: raceName
            }
            await api.post(`/pets/races`, data)
            toast.success("Raça cadastrada com sucesso")
            setReloadData(true)
        } catch (error) {
            toast.error("Falha ao realizar cadastro de nova raça")
        }
    }

    useEffect(() => {
        if (reloadData === true) {
          getEspecies()
          setReloadData(false);
        }
      }, [reloadData]);
  
    return (
      <ChakraProvider>
        <AdminContainer>
          <Flex direction="column" h="100vh">
            <Header title="Painel de Cirurgia" url="/Admin/Especies" />
           
  
            <Flex w="100%" my="6" maxWidth={1680} mx="auto" px="6">
              <Sidebar />
              <Box
                flex="1"
                borderRadius={8}
                bg="gray.200"
                p="8"
                maxH="44rem"
                overflow="auto"
              >
                <Flex
                  mb="8"
                  justify="space-between"
                  direction="column"
                  align="center"
                >
                  <Heading size="lg" fontWeight="bold" w="100%" mb="5">
                    Painel de Raças - Especie: {especies.name}
                  </Heading>
  
                  <Button
                    as="a"
                    width="100%"
                    fontSize="20"
                    py="8"
                    colorScheme="whatsapp"
                    cursor="pointer"
                    leftIcon={<Icon as={RiAddLine} />}
                    mb="2"
                    onClick={() => setIsModalOpen(true)}
                  >
                    Cadastrar nova Raça
                  </Button>
                </Flex>
  
                <Table colorScheme="blackAlpha">
                  <Thead>
                    <Tr>
                      <Th fontSize="18" borderColor="black">
                        Raça
                      </Th>
                      <Th fontSize="18" borderColor="black">
                        Excluir?
                      </Th>
                    
                     
                    </Tr>
                  </Thead>
  
                  <Tbody>
                 
                    {
                        especies?.race?.map((race) => (
                            <Tr key={race.id} >
                            <Td borderColor="black">
                              {race.name}
                            </Td>
                        
    
                            <Td borderColor="black">
                           
                                <Button
                                  as="a"
                                  size="sm"
                                  fontSize="sm"
                                  colorScheme="red"
                                  leftIcon={<Icon as={RiPencilLine} />}
                               
                                >
                                  Excluir raça
                                </Button>
                  
                        
                            </Td>
                          </Tr>
                        ))
                    }

                        
                
                  </Tbody>
                </Table>
               
  
          
              </Box>
            </Flex>
          </Flex>
        </AdminContainer>
        <GenericModal isOpen={isModalOpen} onRequestClose={closeModal}>
               
                    <Input
                    onChange={(ev) => setRaceName(ev.target.value)}
                      name="name"
                      label="Nome da Raça"
                      mb="4"
                    />
  
                
  
                    <Button 
                    onClick={() => hadleNewRace()}
                    w="100%"  colorScheme="green" m="2">
                      Cadastrar
                    </Button>
                 
                </GenericModal>
      </ChakraProvider>
    );
  }
  