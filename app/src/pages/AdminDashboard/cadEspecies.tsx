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
    FormControl,
    HStack,
    CheckboxGroup,
    Checkbox,
  } from "@chakra-ui/react";
  import { useContext, useEffect, useState } from "react";
  import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
  import { RiAddLine, RiPencilLine } from "react-icons/ri";
  import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
  import { Header } from "../../components/admin/Header";
  import { Paginaton } from "../../components/admin/Pagination";
  import { Sidebar } from "../../components/admin/Sidebar";
  import { LoadingSpinner } from "../../components/Loading";
  import { DbContext } from "../../contexts/DbContext";
  import { GenericModal } from "../../components/Modal/GenericModal";
  import { AdminContainer } from "../AdminDashboard/style";
  import { api } from "../../lib/axios";
  import { toast } from "react-toastify";
  import { Input } from "../../components/admin/Input";
  import { ConfirmationDialog } from "../../components/dialogConfirmComponent/ConfirmationDialog";
  import { BsFillTrashFill } from "react-icons/bs";
  
  export function AdminCadEspecies() {
    const { register, handleSubmit } = useForm();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpenTwo, setIsModalOpenTwo] = useState(false);
    const [especies, setEspecies] = useState([]);
    const [reloadData, setReloadData] = useState<boolean>(false);
  
    const navigate = useNavigate();
  
    function openModal() {
      setIsModalOpen(true);
    }
    function closeModal() {
      setIsModalOpen(false);
    }
  
    function openModalTwo() {
      setIsModalOpenTwo(true);
    }
    function closeModalTwo() {
      setIsModalOpenTwo(false);
    }
  

  
    async function getEspecies() {
      const Surgeries = await api.get("/pets/especie");
      setEspecies(Surgeries.data);
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
                    Painel de Cirurgia
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
                  <Button
                    as="a"
                    width="100%"
                    fontSize="20"
                    py="8"
                    colorScheme="whatsapp"
                    cursor="pointer"
                    leftIcon={<Icon as={RiAddLine} />}
                    onClick={() => openModal()}
                  >
                    Cadastrar nova Raça
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
                                onClick={() => openModalTwo()}
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
                      {...register("name")}
                      name="name"
                      label="Nome da Cirurgia"
                      mb="4"
                    />
  
                  


  
                    <Button w="100%" type="submit" colorScheme="green" m="2">
                      Cadastrar
                    </Button>
                  </FormControl>
                </GenericModal>
  
                <GenericModal
                  isOpen={isModalOpenTwo}
                  onRequestClose={closeModalTwo}
                >
                  <FormControl
                    as="form"
                 
                    display="flex"
                    flexDir="column"
                    alignItems="center"
                  >
                    <Text pb="15">Editar Centro cirurgico</Text>
                    <Input
                      {...register("id")}
                      name="id"
                      label="Id da cirurgia"
                      mb="4"
                    />
                    <Input
                      {...register("name")}
                      name="name"
                      label="Nome da cirurgia"
                      mb="4"
                    />
  
                    <Input
                      {...register("id")}
                      name="id"
                      label="Preço da cirurgia"
                      mb="4"
                    />
  
                    <Button w="100%" type="submit" colorScheme="green" m="2">
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
  