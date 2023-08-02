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
  Textarea,
  FormLabel,
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

export function Hospitalization() {
  const { register, handleSubmit } = useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenTwo, setIsModalOpenTwo] = useState(false);
  const [beds, setBeds] = useState<any>([]);
  const [reloadData, setReloadData] = useState<boolean>(false);

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
        totalBeds: parseInt(values.totalBeds),
        description: values.description,
        price: Number(values.price),
      };
      await api.post("/admissions", data);
      setReloadData(true);
      toast.success("Leito criado com sucesso!");
    } catch (error) {
      toast.error("Falha ao criar novo Leito");
    }
  };

  async function handleDeleteSector(id: string | number) {
    const confirm = window.confirm(
      "Deletar e uma operação irreversivel deseja mesmo continuar?"
    );
    try {
      if (confirm === true) {
        await api.delete(`sectors/${id}`);
        setReloadData(true);
        toast.success("Leito deletado com sucesso");
      }
    } catch (error) {
      toast.error("Falha ao criar novo setor");
    }
  }

  const handleEditSector: SubmitHandler<FieldValues> = async (values) => {
    try {
      const data = {
        name: values.name,
        totalBeds: values.totalBeds,
      };
      await api.put(`sectors/${values.id}`, data);
      setReloadData(true);
      toast.success("Leitos editado com sucesso");
    } catch (error) {
      toast.error("Falha ao editar novo Leitos");
    }
  };

  async function getBeds() {
    try {
      const totalBeds = await api.get("/admissions");
      setBeds(totalBeds.data);
    } catch (error) {
      console.error("Erro para consumir", error);
    }
  }
  useEffect(() => {
    getBeds();
  }, []);

  useEffect(() => {
    if (reloadData === true) {
      getBeds();
      setReloadData(false);
    }
  }, [reloadData]);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <ChakraProvider>
        <AdminContainer>
          <Flex direction="column" h="100vh">
            <Header title="Leitos internação" url="/Admin/" />

            <Flex w="100%" my="6" maxWidth={1680} mx="auto" px="6" maxH="85vh">
              <Sidebar />
              <Box
                flex="1"
                borderRadius={8}
                bg="gray.200"
                p="8"
                overflow="auto"
              >
                <Flex
                  mb="8"
                  justify="space-between"
                  direction="column"
                  align="center"
                >
                  <Heading size="lg" fontWeight="bold" w="100%" mb="5">
                    Leitos para internação
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
                    Cadastrar novo Leitos de internação
                  </Button>
                </Flex>

                <Table colorScheme="blackAlpha">
                  <Thead>
                    <Tr>
                      <Th fontSize="18" borderColor="black" width="20%">
                        Nome
                      </Th>
                      <Th fontSize="18" borderColor="black">
                        Quantidade de Camas
                      </Th>
                      <Th fontSize="18" borderColor="black">
                        Preço diária
                      </Th>
                      <Th borderColor="black"></Th>
                    </Tr>
                  </Thead>

                  <Tbody>
                    {beds ? (
                      beds.map((bed: any) => (
                        <Tr key={bed.id}>
                          <Td borderColor="black">
                            <Text fontWeight="bold" color="gray.800">
                              {bed.name}
                            </Text>
                          </Td>
                          <Td borderColor="black">{bed.totalBeds}</Td>
                          <Td borderColor="black">{bed.price}</Td>
                          <Td borderColor="black">
                            <Flex gap="2" ml="40%">
                              <Button
                                alignItems="center"
                                size="md"
                                width={220}
                                fontSize="md"
                                colorScheme="yellow"
                                leftIcon={<Icon as={RiPencilLine} />}
                                onClick={() => openModalTwo()}
                              >
                                Editar Leito
                              </Button>
                              <Button
                                alignItems="center"
                                size="md"
                                width={220}
                                fontSize="md"
                                colorScheme="red"
                                leftIcon={<Icon as={RiPencilLine} />}
                                onClick={() => handleDeleteSector("")}
                              >
                                Deletar Leito
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
                    onSubmit={handleSubmit(handleCreateSector)}
                    display="flex"
                    flexDir="column"
                    alignItems="center"
                  >
                    <Input
                      {...register("name")}
                      name="name"
                      label="Nome do leito"
                      mb="4"
                    />
                    <Input
                      type="number"
                      {...register("price")}
                      name="price"
                      label="Preço da Diária"
                    />

                    <Input
                      {...register("totalBeds")}
                      name="totalBeds"
                      label="Quantidade de Camas"
                      type="number"
                      mb="4"
                    />

                    <FormLabel htmlFor="description">
                      Descrição ou Observação do leito:{" "}
                    </FormLabel>
                    <Textarea {...register("description")} name="description" />

                    <Button w="100%" type="submit" colorScheme="green" m="4">
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
                    <Text pb="15">Editar Leito</Text>
                    <Input
                      {...register("id")}
                      name="id"
                      label="Id do Leito"
                      mb="4"
                    />
                    <Input
                      {...register("name")}
                      name="name"
                      label="Nome do Leito"
                      mb="4"
                    />

                    <Input
                      {...register("id")}
                      name="id"
                      label="Quantidade de Leitos"
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
