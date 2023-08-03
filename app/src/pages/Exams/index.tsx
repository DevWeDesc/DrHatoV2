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

export function ExamesList() {
  const { refresh, setRefresh } = useContext(DbContext);
  const { register, handleSubmit } = useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [exams, setExams] = useState([]);

  function openModal() {
    setIsModalOpen(true);
  }
  function closeModal() {
    setIsModalOpen(false);
  }

  const getExamesListData = async () => {
    const response = await api.get("exams");
    setExams(response.data);
  };
  useEffect(() => {
    getExamesListData();
  }, []);

  useEffect(() => {
    if (loading === true) {
      getExamesListData();
      setLoading(false);
    }
  }, [loading]);

  const handleCreateExam: SubmitHandler<FieldValues> = async (values) => {
    try {
      const data = {
        name: values.name,
        price: Number(values.price),
        available: values.available,
        examsType: values.examsType,
      };
      await api.post("exams", data);
      setLoading(true);
      toast.success("Exame criada com sucesso");
    } catch (error) {
      toast.error("Falha ao criar novo Exame");
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
            <Header title="Exames" url="/Admin/" />

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
                <Flex direction="column" mb="8" align="left">
                  <Heading fontSize="30" fontWeight="bold" mb="5">
                    Exames
                  </Heading>

                  <Button
                    w="100%"
                    py="8"
                    fontSize="20"
                    colorScheme="whatsapp"
                    leftIcon={<Icon as={RiAddLine} />}
                    onClick={() => openModal()}
                  >
                    Cadastrar novo Exame
                  </Button>
                </Flex>

                <Table colorScheme="blackAlpha">
                  <Thead>
                    <Tr borderColor="black">
                      <Th fontSize="21" borderColor="black">
                        Nome
                      </Th>
                      <Th fontSize="21" borderColor="black">
                        Preço
                      </Th>
                      <Th fontSize="21" borderColor="black">
                        Disponivel ?
                      </Th>
                      <Th width="8" borderColor="black"></Th>
                    </Tr>
                  </Thead>

                  <Tbody>
                    {exams ? (
                      exams.map((exam: any) => (
                        <Tr key={exam.id} fontSize="18">
                          <Td borderColor="black">
                            <Box>
                              <Link to={`/Admin/Exams/Details/${exam.id}`}>
                                <Text
                                  fontWeight="bold"
                                  color="gray.800"
                                  borderColor="black"
                                >
                                  {exam.name}
                                </Text>
                              </Link>
                            </Box>
                          </Td>
                          <Td borderColor="black">
                            <Text fontWeight="bold" color="gray.800">
                              {new Intl.NumberFormat("pt-BR", {
                                style: "currency",
                                currency: "BRL",
                              }).format(exam.price)}
                            </Text>
                          </Td>
                          <Td borderColor="black">
                            {exam.available === true ? <p>SIM</p> : <p>NÃO</p>}
                          </Td>

                          <Td borderColor="black">
                            <Link to={`/Admin/Exams/${exam.id}`}>
                              <Button
                                as="a"
                                size="md"
                                fontSize="md"
                                colorScheme="yellow"
                                leftIcon={<Icon as={RiPencilLine} />}
                              >
                                Configurar
                              </Button>
                            </Link>
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
                    onSubmit={handleSubmit(handleCreateExam)}
                  >
                    <Flex direction="column" align="center" margin="4">
                      <Input
                        {...register("name")}
                        name="name"
                        label="Nome do Exame"
                      />
                      <Input
                        {...register("price")}
                        name="price"
                        label="Preço"
                      />

                      <HStack gap="2" margin={8}>
                        <label htmlFor="available">Disponivel ?</label>
                        <Checkbox
                          {...register("available")}
                          id="available"
                          name="available"
                          type="checkbox"
                          _checked={{ background: "#FF0000" }}
                        />
                      </HStack>

                      <HStack spacing={4} margin="4">
                        <CheckboxGroup>
                          <label htmlFor="">Lab Imagens</label>
                          <Checkbox
                            {...register("examsType")}
                            value={"image"}
                            type="radio"
                            colorScheme="green"
                            name="examsType"
                          />

                          <label htmlFor="">Labs</label>
                          <Checkbox
                            type="radio"
                            {...register("examsType")}
                            value={"lab"}
                            colorScheme="green"
                            name="examsType"
                          />
                        </CheckboxGroup>
                      </HStack>

                      <Button type="submit" colorScheme="green" m="2">
                        Cadastrar
                      </Button>
                    </Flex>
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
