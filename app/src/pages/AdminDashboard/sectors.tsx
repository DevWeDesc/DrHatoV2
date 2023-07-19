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
import { motion } from "framer-motion";

export function SectorsList() {
  // const { sectors } = useContext(DbContext);
  const [sectors, setSectors] = useState([]);
  const { register, handleSubmit } = useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenTwo, setIsModalOpenTwo] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const getSectorsListData = async () => {
    const response = await api.get("sectors");
    setSectors(response.data);
  };
  useEffect(() => {
    getSectorsListData();
  }, []);

  useEffect(() => {
    if (loading === true) {
      getSectorsListData();
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

  async function handleDeleteSector(id: string | number) {
    const confirm = window.confirm(
      "Deletar e uma operação irreversivel deseja mesmo continuar?"
    );
    try {
      if (confirm === true) {
        await api.delete(`sectors/${id}`);
        toast.success("Setor deletdo com sucesso");
        setLoading(true);
      }
    } catch (error) {
      toast.error("Falha ao criar novo setor");
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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <ChakraProvider>
        <AdminContainer>
          <Flex direction="column" h="100vh">
            <Header title="Setores e Grupos" />

            <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
              <Sidebar />
              <Box
                flex="1"
                borderRadius={8}
                bg="gray.200"
                p="8"
                maxH="44rem"
                overflowY="auto"
                overflowX="none"
                w="100%"
              >
                <Flex w="100%" alignItems="center" overflowX="none">
                  <Flex
                    direction="column"
                    w="48%"
                    borderRight="1px solid black"
                    pr="1"
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
                                  <Button
                                    as="a"
                                    size="sm"
                                    fontSize="sm"
                                    colorScheme="red"
                                    leftIcon={<Icon as={RiPencilLine} />}
                                    onClick={() =>
                                      handleDeleteSector(sector.id)
                                    }
                                  >
                                    Deletar Setor
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
                  </Flex>
                  <Flex w="48%" direction="column" pl="1">
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
                        onClick={() => openModal()}
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
                        {sectors ? (
                          sectors.map((sector: any) => (
                            <Tr key={sector.id}>
                              <Td borderColor="black">
                                <Text fontWeight="bold" color="gray.800">
                                  {sector.name}
                                </Text>
                              </Td>
                              <Td borderColor="black">{sector.id}</Td>

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
                                  <Button
                                    as="a"
                                    size="sm"
                                    fontSize="sm"
                                    colorScheme="red"
                                    leftIcon={<Icon as={RiPencilLine} />}
                                    onClick={() =>
                                      handleDeleteSector(sector.id)
                                    }
                                  >
                                    Deletar Grupo
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
                    onSubmit={handleSubmit(handleEditSector)}
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
                    <Input
                      {...register("id")}
                      name="id"
                      label="Id do setor"
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
    </motion.div>
  );
}
