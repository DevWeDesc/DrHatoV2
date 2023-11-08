import {
  Text,
  Box,
  Button,
  ChakraProvider,
  Flex,
  Heading,
  Icon,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  FormControl
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { RiAddLine, RiPencilLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { Header } from "../../components/admin/Header";
import { Sidebar } from "../../components/admin/Sidebar";
import { LoadingSpinner } from "../../components/Loading";
import { GenericModal } from "../../components/Modal/GenericModal";
import { AdminContainer } from "../AdminDashboard/style";
import { api } from "../../lib/axios";
import { Input } from "../../components/admin/Input";
import { toast } from "react-toastify";
  
  export function AdminCadEspecies() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [especies, setEspecies] = useState([]);
    const [reloadData, setReloadData] = useState<boolean>(false);
    const [especieName, setEspecieName] = useState("")
  
    const navigate = useNavigate();
  
    function openModal() {
      setIsModalOpen(true);
    }
    function closeModal() {
      setIsModalOpen(false);
    }
  

  
    async function getEspecies() {
      const Surgeries = await api.get("/pets/especie");
      setEspecies(Surgeries.data);
    }

    async function createEspecie() {
      try {
        const data = {
          name: especieName
        }
        await api.post('/pets/especie', data)

        setReloadData(true)

        toast.success("Especie cadastrada com sucesso!")


      } catch (error) {
        toast.error("Falha ao cadastrar especie!")
        console.log(error)
      }
    }
  
    useEffect(() => {
        getEspecies()
    }, []);
  
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
            <Header title="Painel de Cirurgia" url="/Admin/" />
  
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
                    Painel de Especies
                  </Heading>
  
                  <Button
                    as="a"
                    width="100%"
                    fontSize="20"
                    py="8"
                    colorScheme="whatsapp"
                    cursor="pointer"
                    leftIcon={<Icon as={RiAddLine} />}
                    onClick={() => openModal()}
                    mb="2"
                  >
                    Cadastrar nova Especie
                  </Button>
                </Flex>
  
                <Table colorScheme="blackAlpha">
                  <Thead>
                    <Tr>
                      <Th fontSize="18" borderColor="black">
                        Nome
                      </Th>
                    
                      <Th fontSize="18"  borderColor="black"></Th>
                    </Tr>
                  </Thead>
  
                  <Tbody>
                    {especies ? (
                      especies.map((esp: any) => (
                        <Tr key={esp.id}>
                          <Td borderColor="black">
                            <Text fontWeight="bold" color="gray.800">
                              {esp.name}
                            </Text>
                          </Td>
                      
  
                          <Td borderColor="black">
                            <Flex gap="2" ml="30%">
                              <Button
                                as="a"
                                size="sm"
                                fontSize="sm"
                                colorScheme="yellow"
                                leftIcon={<Icon as={RiPencilLine} />}
                                onClick={() => navigate(`/Admin/Races/${esp.id}`)}
                              >
                                Visualizar especies
                              </Button>
                
                            </Flex>
                          </Td>
                        </Tr>
                      ))
                    ) : (
                      <LoadingSpinner />
                    )}
                  </Tbody>
                </Table>
                <GenericModal isOpen={isModalOpen} onRequestClose={closeModal}>
                  <FormControl
                    as="form"
                    
                    display="flex"
                    flexDir="column"
                    alignItems="center"
                  >
                    <Input
                     onChange={(ev) => setEspecieName(ev.target.value)}
                      name="name"
                      label="Nome da Especie"
                      mb="4"
                    />
  
                
  
                    <Button w="100%" onClick={() => createEspecie()} colorScheme="green" m="2">
                      Cadastrar
                    </Button>
                  </FormControl>
                </GenericModal>
  
          
              </Box>
            </Flex>
          </Flex>
        </AdminContainer>
      </ChakraProvider>
    );
  }
  