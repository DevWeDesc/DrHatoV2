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
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { RiAddLine, RiPencilLine } from "react-icons/ri";
import { AiOutlineDownload } from "react-icons/all";
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
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import { TDocumentDefinitions } from "pdfmake/interfaces";
import Surgeries from "../Surgeries";
import { motion } from "framer-motion";
//@ts-ignore
pdfMake.addVirtualFileSystem(pdfFonts);
// Create styles

export function InstructionsList() {
  //const { instructions } = useContext(DbContext);
  const { register, handleSubmit } = useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenTwo, setIsModalOpenTwo] = useState(false);
  const [reloadData, setReloadData] = useState<boolean>(false);
  const [allInstructions, setAllInstructions] = useState([]);

  const navigate = useNavigate();

  function handleCreateInstruction(name: string, description: string) {
    const docDefinition: TDocumentDefinitions = {
      content: [`Nome: ${name}\n\n ${description}`],
      pageMargins: [50, 50],
      pageSize: "A4",
    };
    pdfMake.createPdf(docDefinition).open();
  }
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
        description: values.description,
      };
      await api.post("instructions", data);
      setReloadData(true);
      toast.success("Instrução criada com sucesso");
    } catch (error) {
      toast.error("Falha ao criar nova Instrução");
    }
  };

  async function handleDeleteSector(id: string | number) {
    const confirm = window.confirm(
      "Deletar e uma operação irreversivel deseja mesmo continuar?"
    );
    try {
      if (confirm === true) {
        await api.delete(`instructions/${id}`);
        setReloadData(true);
        toast.success("Instrução deletada sucesso");
      }
    } catch (error) {
      toast.error("Falha ao deletar");
    }
  }

  const handleEditInstructions: SubmitHandler<FieldValues> = async (values) => {
    try {
      const data = {
        name: values.name,
        description: values.description,
      };
      await api.put(`instructions/${values.id}`, data);
      setReloadData(true);
      toast.success("Instrução editada com sucesso");
    } catch (error) {
      toast.error("Falha ao editar nova instrução");
    }
  };

  async function getInstructions() {
    const Instructions = await api.get("/instructions");
    setAllInstructions(Instructions.data);
  }

  useEffect(() => {
    getInstructions();
  }, []);

  useEffect(() => {
    if (reloadData === true) {
      getInstructions();
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
            <Header title="Instruções" />

            <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6" maxH="44rem">
              <Sidebar />
              <Box
                flex="1"
                borderRadius={8}
                bg="gray.200"
                overflow="auto"
                p="8"
              >
                <Flex
                  mb="8"
                  direction="column"
                  justify="space-between"
                  align="center"
                >
                  <Heading width="100%" fontSize="30" fontWeight="bold">
                    Instruções
                  </Heading>

                  <Button
                    as="a"
                    mt="5"
                    width="100%"
                    py="8"
                    cursor="pointer"
                    fontSize="20"
                    colorScheme="whatsapp"
                    leftIcon={<Icon as={RiAddLine} fontSize="20" />}
                    onClick={() => openModal()}
                  >
                    Cadastrar nova Instrução
                  </Button>
                </Flex>

                <Table colorScheme="blackAlpha">
                  <Thead>
                    <Tr borderColor="black">
                      <Th borderColor="black" fontSize="18">
                        Nome
                      </Th>
                      <Th borderColor="black" fontSize="18">
                        Id do Instrução
                      </Th>
                      <Th borderColor="black"></Th>
                    </Tr>
                  </Thead>

                  <Tbody>
                    {allInstructions ? (
                      allInstructions.map((sector: any) => (
                        <Tr key={sector.id}>
                          <Td borderColor="black">
                            <Text
                              fontWeight="bold"
                              fontSize="16"
                              color="gray.800"
                            >
                              {sector.name}
                            </Text>
                          </Td>
                          <Td
                            borderColor="black"
                            fontSize="16"
                            fontWeight="bold"
                          >
                            {sector.id}
                          </Td>

                          <Td borderColor="black">
                            <Flex ml="16%">
                              <Button
                                as="a"
                                size="md"
                                fontSize="md"
                                colorScheme="yellow"
                                mr="3"
                                leftIcon={<Icon as={RiPencilLine} />}
                                onClick={() => openModalTwo()}
                              >
                                Editar Instrução
                              </Button>

                              <Button
                                as="a"
                                size="md"
                                fontSize="md"
                                colorScheme="red"
                                leftIcon={<Icon as={RiPencilLine} />}
                                onClick={() => handleDeleteSector(sector.id)}
                                mr="3"
                              >
                                Deletar Instrução
                              </Button>

                              <Button
                                as="a"
                                size="md"
                                fontSize="md"
                                colorScheme="cyan"
                                mr="3"
                                color="white"
                                leftIcon={<Icon as={AiOutlineDownload} />}
                                onClick={() =>
                                  handleCreateInstruction(
                                    sector.name,
                                    sector.description
                                  )
                                }
                              >
                                Gerar PDF
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
                      label="Nome da Instrução"
                      mb="4"
                    />
                    <label>Descrição da Instrução</label>
                    <Textarea
                      {...register("description")}
                      name="description"
                      minHeight={300}
                      minWidth={300}
                      borderColor="gray.900"
                    ></Textarea>

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
                    onSubmit={handleSubmit(handleEditInstructions)}
                    display="flex"
                    flexDir="column"
                    alignItems="center"
                  >
                    <Text>Editar Setor</Text>
                    <Input
                      {...register("name")}
                      name="name"
                      label="Nome da Instrução"
                      mb="4"
                    />
                    <Input
                      {...register("id")}
                      name="id"
                      label="Id da Instrução"
                      mb="4"
                    />

                    <label>Descrição da Instrução</label>
                    <Textarea
                      {...register("description")}
                      name="description"
                      minHeight={300}
                      minWidth={300}
                      borderColor="gray.900"
                    ></Textarea>

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
