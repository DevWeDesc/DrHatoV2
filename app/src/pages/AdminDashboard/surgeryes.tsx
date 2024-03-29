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
  Grid,
  TableContainer,
} from "@chakra-ui/react";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { RiAddLine, RiPencilLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { Header } from "../../components/admin/Header";

import { Sidebar } from "../../components/admin/Sidebar";
import { LoadingSpinner } from "../../components/Loading";

import { GenericModal } from "../../components/Modal/GenericModal";
import { AdminContainer } from "../AdminDashboard/style";
import { api } from "../../lib/axios";
import { toast } from "react-toastify";
import { Input } from "../../components/admin/Input";
import { ConfirmationDialog } from "../../components/dialogConfirmComponent/ConfirmationDialog";
import { BsFillTrashFill } from "react-icons/bs";
import { Query, QueryClient, useQuery } from "react-query";
import data from "pdfkit/js/data";

interface ISurgery {
  id: number;
  name: string;
  price: string;
  applicableToMale: boolean;
  applicableToFemale: boolean;
  sector_id: number;
}

interface ISurgeryData {
  currentPage: number;
  totalPages: number;
  totalSurgeries: number;
  surgeries: ISurgery[];
}
const queryClient = new QueryClient();

export function AdminSurgery() {
  const { register, handleSubmit, reset } = useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenTwo, setIsModalOpenTwo] = useState(false);
  const [pageActual, setPageActual] = useState(1);
  const [surgerySelected, setSurgerySelected] = useState({} as ISurgery);

  console.log(surgerySelected);

  const handleCreateSurgerie: SubmitHandler<FieldValues> = async (values) => {
    try {
      const data = {
        name: values.name,
        price: parseInt(values.price),
      };
      await api.post("surgeries", data);
      queryClient.invalidateQueries("surgeries");
      refetch();
      reset();
      toast.success("Cirurgia criada com sucesso");
    } catch (error) {
      toast.error("Falha ao criar nova cirurgia");
    }
  };

  async function DeleteSurgery(id: string | number) {
    try {
      await api.delete(`surgeries/${id}`);
      queryClient.invalidateQueries("surgeries");
      toast.success("Vacina deletada com sucesso!!");
      refetch();
    } catch (error) {
      toast.error("Falha ao Excluir cirurgia!!");
    }
  }

  const handleEditSurgery: SubmitHandler<FieldValues> = async (values) => {
    try {
      const data = {
        name: surgerySelected.name,
        price: parseFloat(surgerySelected.price),
      };
      await api.put(`surgeries/${surgerySelected.id}`, data);
      toast.success("Cirurgia editada com sucesso");
      refetch();
    } catch (error) {
      toast.error("Falha ao editar cirurgia");
    }
  };

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["surgeries", pageActual],
    queryFn: async () =>
      await api.get(`/surgeries?page=${pageActual}`).then((res) => res.data),
  });

  const nextPage = () => {
    if (pageActual < data.totalPages) setPageActual((prev) => prev + 1);
  };

  const backPage = () => {
    if (pageActual > 1) setPageActual((prev) => prev - 1);
  };

  const handleSurgerySelected = (surgery: ISurgery) => {
    setSurgerySelected(surgery);
    setIsModalOpenTwo(true);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <ChakraProvider>
      <AdminContainer>
        <Flex direction="column" h="100vh">
          <Header title="Painel de Cirurgia" url="/Admin/" />

          <Flex
            w="100%"
            my="6"
            direction={{ base: "column", xl: "row" }}
            mx="auto"
            px="6"
          >
            <Sidebar />
            <Box
              flex="1"
              borderRadius={8}
              // bg="gray.200"
              py={{ base: "8", xl: "0" }}
              maxH="44rem"
              overflow="auto"
            >
              <Heading
                fontSize={{ base: "xl", lg: "2xl" }}
                fontWeight="bold"
                w="100%"
                mb="5"
                display="flex"
                flexDirection={{ base: "column", md: "row" }}
                justifyContent="space-between"
                gap={{ base: "2", md: 0 }}
              >
                Painel de Cirurgia
                <Button
                  width={{ base: "100%", md: "auto" }}
                  fontSize={{ base: "md", lg: "lg" }}
                  py="6"
                  colorScheme="whatsapp"
                  cursor="pointer"
                  leftIcon={<Icon as={RiAddLine} />}
                  onClick={() => setIsModalOpen(true)}
                >
                  Cadastrar nova Cirurgia
                </Button>
              </Heading>
              <Grid
                templateColumns={{
                  base: "repeat(1, 1fr)",
                  md: "repeat(3, 1fr)",
                }}
                placeItems="center"
                gap="2"
              >
                <Button
                  fontSize={{ base: "sm", lg: "md" }}
                  colorScheme="teal"
                  w="full"
                  onClick={backPage}
                >
                  Voltar Página
                </Button>
                <Button
                  fontSize={{ base: "sm", lg: "md" }}
                  colorScheme="teal"
                  w="full"
                >
                  Página atual:{pageActual}
                </Button>
                <Button
                  fontSize={{ base: "sm", lg: "md" }}
                  onClick={nextPage}
                  colorScheme="teal"
                  w="full"
                >
                  Próxima página
                </Button>
              </Grid>

              <TableContainer w="full">
                <Table colorScheme="blackAlpha">
                  <Thead>
                    <Tr>
                      <Th>Nome</Th>
                      <Th>Preço</Th>
                      <Th>Editar</Th>
                      <Th>Deletar</Th>
                    </Tr>
                  </Thead>

                  <Tbody>
                    {data?.surgeries?.length > 0 ? (
                      data?.surgeries.map((surgery: ISurgery) => (
                        <Tr key={surgery.id}>
                          <Td fontSize="sm">{surgery.name}</Td>
                          <Td fontSize="sm"> {surgery.price}</Td>
                          <Td>
                            {" "}
                            <Button
                              size="sm"
                              fontSize="sm"
                              colorScheme="yellow"
                              leftIcon={<Icon as={RiPencilLine} />}
                              onClick={() => handleSurgerySelected(surgery)}
                            >
                              Editar Cirurgia
                            </Button>
                          </Td>

                          <Td>
                            <ConfirmationDialog
                              disabled={false}
                              icon={<BsFillTrashFill fill="white" size={16} />}
                              buttonTitle="Deletar Cirurgia"
                              whatIsConfirmerd={`Tem certeza que deseja Excluir a Cirurgia ${surgery.name}?`}
                              describreConfirm="Excluir a Cirurgia é uma ação irreversivel, tem certeza que deseja excluir?"
                              callbackFn={() => DeleteSurgery(surgery.id)}
                            />
                          </Td>
                        </Tr>
                      ))
                    ) : (
                      <LoadingSpinner />
                    )}
                  </Tbody>
                </Table>
              </TableContainer>
              <GenericModal
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
              >
                <FormControl
                  as="form"
                  onSubmit={handleSubmit(handleCreateSurgerie)}
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

                  <Input
                    {...register("price")}
                    name="price"
                    label="Preço"
                    mb="4"
                  />

                  <Button w="100%" type="submit" colorScheme="green" m="2">
                    Cadastrar
                  </Button>
                </FormControl>
              </GenericModal>

              <GenericModal
                isOpen={isModalOpenTwo}
                onRequestClose={() => setIsModalOpenTwo(false)}
              >
                <FormControl
                  as="form"
                  onSubmit={handleSubmit(handleEditSurgery)}
                  display="flex"
                  flexDir="column"
                  alignItems="center"
                >
                  <Text pb="15">Editar Cirurgia</Text>

                  <Input
                    onChange={(ev) =>
                      setSurgerySelected({
                        ...surgerySelected,
                        name: ev.target.value,
                      })
                    }
                    value={surgerySelected.name}
                    name="name"
                    label="Nome da cirurgia"
                    mb="4"
                  />

                  <Input
                    onChange={(ev) =>
                      setSurgerySelected({
                        ...surgerySelected,
                        price: ev.target.value,
                      })
                    }
                    value={surgerySelected.price}
                    name="price"
                    label="Preço da cirurgia"
                    mb="4"
                  />

                  <Button w="100%" type="submit" colorScheme="yellow" m="2">
                    Editar
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
