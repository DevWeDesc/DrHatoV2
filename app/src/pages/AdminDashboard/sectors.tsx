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

export function SectorsList() {
  // const { sectors } = useContext(DbContext);
  const [sectors, setSectors] = useState([]);
  const [groups, setGroups] = useState([]);
  const { register, handleSubmit } = useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenTwo, setIsModalOpenTwo] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const getSectorsListData = async () => {
    const response = await api.get("sectors");
    setSectors(response.data);
  };

  const getGroupsListData = async () => {
    const response = await api.get("groups");
    setGroups(response.data);
  };

  useEffect(() => {
    getSectorsListData();
    getGroupsListData();
  }, []);

  useEffect(() => {
    if (loading === true) {
      getSectorsListData();
      getGroupsListData();
      setLoading(false);
    }
  }, [loading]);

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

  const handleCreateSector: SubmitHandler<FieldValues> = async (values) => {
    try {
      const data = {
        name: values.name,
      };
      await api.post("sectors", data);
      toast.success("Setor criado com sucesso");
      setLoading(true);
    } catch (error) {
      toast.error("Falha ao criar novo setor");
    }
  };

  const handleCreateGroups: SubmitHandler<FieldValues> = async (values) => {
    try {
      const data = {
        name: values.name,
      };
      await api.post("groups", data);
      toast.success("Grupo criado com sucesso");
      setLoading(true);
    } catch (error) {
      toast.error("Falha ao criar novo grupo");
    }
  };

  async function handleDeleteSector(id: string | number) {
    try {
      await api.delete(`sectors/${id}`);
      toast.success("Setor deletado com sucesso");
      setLoading(true);
    } catch (error) {
      toast.error("Falha ao deletar setor");
    }
  }

  async function handleDeleteGroup(id: string | number) {
    try {
      await api.delete(`groups/${id}`);
      toast.success("Grupo deletado com sucesso");
      setLoading(true);
    } catch (error) {
      toast.error("Falha ao deletar Grupo");
    }
  }

  const handleEditSector: SubmitHandler<FieldValues> = async (values) => {
    try {
      const data = {
        name: values.name,
      };
      await api.put(`sectors/${values.id}`, data);
      toast.success("Setor editado com sucesso");
      setLoading(true);
    } catch (error) {
      toast.error("Falha ao editar novo setor");
    }
  };

  return (
    <ChakraProvider>
      <AdminContainer>
        <Flex direction="column" h="100vh">
          <Header title="Setores e Grupos" url="/Admin" />
          <Flex w="100%" my="6" maxWidth={1680} mx="auto" px="6">
            <Sidebar />
            <Box
              flex="1"
              borderRadius={8}
              bg="gray.200"
              p="8"
              maxH="44rem"
              w="100%"
            >
              <Flex w="100%" justifyContent="space-between">
                <Flex
                  direction="column"
                  w="48%"
                  borderRight="1px solid black"
                  pr="1"
                  maxH="40rem"
                  overflowY="auto"
                >
                  <Flex
                    mb="8"
                    justify="space-between"
                    direction="column"
                    align="center"
                  >
                    <Heading size="lg" fontWeight="bold" w="100%" mb="5">
                      Setores
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
                    >
                      Cadastrar novo Setor
                    </Button>
                  </Flex>

                  <Table colorScheme="blackAlpha">
                    <Thead>
                      <Tr>
                        <Th fontSize="18" borderColor="black">
                          Nome
                        </Th>
                        <Th fontSize="18" borderColor="black">
                          Id do Setor
                        </Th>
                        <Th borderColor="black"></Th>
                      </Tr>
                    </Thead>

                    <Tbody>
                      {sectors ? (
                        sectors.map((sector: any) => (
                          <Tr key={sector.id}>
                            <Td borderColor="black">
                              <Text fontWeight="bold" color="gray.800">
                                {sector.name}
                              </Text>
                            </Td>
                            <Td borderColor="black">{sector.id}</Td>

                            <Td borderColor="black" pr="1">
                              <Flex gap="2" ml="5%">
                                <Button
                                  as="a"
                                  size="sm"
                                  fontSize="sm"
                                  colorScheme="yellow"
                                  leftIcon={<Icon as={RiPencilLine} />}
                                  onClick={() => openModalTwo()}
                                >
                                  Editar setor
                                </Button>
                                <ConfirmationDialog
                                  disabled={false}
                                  icon={
                                    <BsFillTrashFill fill="white" size={16} />
                                  }
                                  buttonTitle="Deletar Setor"
                                  whatIsConfirmerd="Tem certeza que deseja Excluir esse Setor?"
                                  describreConfirm="Excluir o Setor é uma ação irreversivel, tem certeza que deseja excluir?"
                                  callbackFn={() =>
                                    handleDeleteSector(sector.id)
                                  }
                                />
                                {/* <Button
                                  as="a"
                                  size="sm"
                                  fontSize="sm"
                                  colorScheme="red"
                                  leftIcon={<Icon as={RiPencilLine} />}
                                  onClick={() => handleDeleteSector(sector.id)}
                                >
                                  Deletar Setor
                                </Button> */}
                              </Flex>
                            </Td>
                          </Tr>
                        ))
                      ) : (
                        <LoadingSpinner />
                      )}
                    </Tbody>
                  </Table>
                </Flex>
                <Flex
                  w="52%"
                  direction="column"
                  pl="1"
                  maxH="40rem"
                  overflowY="auto"
                >
                  <Flex
                    mb="8"
                    justify="space-between"
                    direction="column"
                    align="center"
                  >
                    <Heading size="lg" fontWeight="bold" w="100%" mb="5">
                      Grupos
                    </Heading>

                    <Button
                      as="a"
                      width="100%"
                      fontSize="20"
                      py="8"
                      colorScheme="whatsapp"
                      cursor="pointer"
                      leftIcon={<Icon as={RiAddLine} />}
                      onClick={() => openModalTwo()}
                    >
                      Cadastrar novo Grupo
                    </Button>
                  </Flex>

                  <Table colorScheme="blackAlpha">
                    <Thead>
                      <Tr>
                        <Th fontSize="18" borderColor="black">
                          Nome
                        </Th>
                        <Th fontSize="18" borderColor="black">
                          Id do Grupo
                        </Th>
                        <Th borderColor="black"></Th>
                      </Tr>
                    </Thead>

                    <Tbody>
                      {groups ? (
                        groups.map((group: any) => (
                          <Tr key={group.id}>
                            <Td borderColor="black">
                              <Text fontWeight="bold" color="gray.800">
                                {group.name}
                              </Text>
                            </Td>
                            <Td borderColor="black">{group.id}</Td>

                            <Td borderColor="black">
                              <Flex gap="2" ml="10%">
                                <Button
                                  as="a"
                                  size="sm"
                                  fontSize="sm"
                                  colorScheme="yellow"
                                  leftIcon={<Icon as={RiPencilLine} />}
                                  onClick={() => openModalTwo()}
                                >
                                  Editar Grupo
                                </Button>
                                <ConfirmationDialog
                                  disabled={false}
                                  icon={
                                    <BsFillTrashFill fill="white" size={16} />
                                  }
                                  buttonTitle="Deletar Grupo"
                                  whatIsConfirmerd="Tem certeza que deseja Excluir esse Grupo?"
                                  describreConfirm="Excluir o Grupo é uma ação irreversivel, tem certeza que deseja excluir?"
                                  callbackFn={() =>
                                    handleDeleteSector(group.id)
                                  }
                                />
                                {/* <Button
                                  as="a"
                                  size="sm"
                                  fontSize="sm"
                                  colorScheme="red"
                                  leftIcon={<Icon as={RiPencilLine} />}
                                  onClick={() => handleDeleteSector(group.id)}
                                >
                                  Deletar Grupo
                                </Button> */}
                              </Flex>
                            </Td>
                          </Tr>
                        ))
                      ) : (
                        <LoadingSpinner />
                      )}
                    </Tbody>
                  </Table>
                </Flex>
              </Flex>
              <GenericModal isOpen={isModalOpen} onRequestClose={closeModal}>
                <FormControl
                  as="form"
                  onSubmit={handleSubmit(handleCreateSector)}
                  display="flex"
                  flexDir="column"
                  alignItems="center"
                >
                  <Input
                    {...register("name")}
                    name="name"
                    label="Nome do Setor"
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
                  onSubmit={handleSubmit(handleCreateGroups)}
                  display="flex"
                  flexDir="column"
                  alignItems="center"
                >
                  <Text>Editar Setor</Text>
                  <Input
                    {...register("name")}
                    name="name"
                    label="Nome do Setor"
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
