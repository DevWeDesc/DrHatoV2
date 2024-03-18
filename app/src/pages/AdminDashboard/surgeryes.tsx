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
import { QueryClient, useQuery } from "react-query";

export function AdminSurgery() {
  const { register, handleSubmit } = useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenTwo, setIsModalOpenTwo] = useState(false);
  const [surgeries, setSurgeries] = useState([]);
  const queryClient = new QueryClient()

  const navigate = useNavigate();



  const handleCreateSurgerie: SubmitHandler<FieldValues> = async (values) => {
    try {
      const data = {
        name: values.name,
        price: parseInt(values.price),
      };
      await api.post("surgeries", data);
      queryClient.invalidateQueries("surgeries")
    
      toast.success("Cirurgia criada com sucesso");
    } catch (error) {
      toast.error("Falha ao criar nova cirurgia");
    }
  };

  async function DeleteSurgery(id: string | number) {
    try {
      await api.delete(`surgeries/${id}`);
      queryClient.invalidateQueries("surgeries")
      toast.success("Vacina deletada com sucesso!!");
    } catch (error) {
      toast.error("Falha ao Excluir Vacina!!");
    }
  }

  const handleEditSector: SubmitHandler<FieldValues> = async (values) => {
    try {
      const data = {
        name: values.name,
      };
      await api.put(`sectors/${values.id}`, data);
      toast.success("Setor editado com sucesso");
      navigate(0);
    } catch (error) {
      toast.error("Falha ao editar novo setor");
    }
  };

  async function getAllSurgeries() {
    const Surgeries = await api.get("/surgeries");
    setSurgeries(Surgeries.data.surgeries);
  }

  const { isLoading} = useQuery("surgeries", getAllSurgeries)

  if(isLoading) {
    return <LoadingSpinner/>
  }


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
                  onClick={() => setIsModalOpen(true)}
                >
                  Cadastrar nova Cirurgia
                </Button>
              </Flex>

              <Table colorScheme="blackAlpha">
                <Thead>
                  <Tr>
                    <Th fontSize="18" borderColor="black">
                      Nome
                    </Th>
                    <Th fontSize="18" borderColor="black">
                      Preço
                    </Th>
                    <Th borderColor="black"></Th>
                  </Tr>
                </Thead>

                <Tbody>
                  {surgeries ? (
                    surgeries.map((surgery: any) => (
                      <Tr key={surgery.id}>
                        <Td borderColor="black">
                          <Text fontWeight="bold" color="gray.800">
                            {surgery.name}
                          </Text>
                        </Td>
                        <Td borderColor="black" fontWeight="bold">
                          {" "}
                          {surgery.price}
                        </Td>

                        <Td borderColor="black">
                          <Flex gap="2" ml="30%">
                            <Button
                              as="a"
                              size="sm"
                              fontSize="sm"
                              colorScheme="yellow"
                              leftIcon={<Icon as={RiPencilLine} />}
                              onClick={() => setIsModalOpenTwo(true)}
                            >
                              Editar Cirurgia
                            </Button>
                            {/* <Button
                              as="a"
                              size="md"
                              fontSize="md"
                              colorScheme="red"
                              leftIcon={<Icon as={RiPencilLine} />}
                              onClick={() => handleDeleteSector("")}
                            >
                              Deletar Cirurgia
                            </Button> */}

                            <ConfirmationDialog
                              disabled={false}
                              icon={<BsFillTrashFill fill="white" size={16} />}
                              buttonTitle="Deletar Cirurgia"
                              whatIsConfirmerd="Tem certeza que deseja Excluir essa Cirurgia?"
                              describreConfirm="Excluir a Cirurgia é uma ação irreversivel, tem certeza que deseja excluir?"
                              callbackFn={() => DeleteSurgery(surgery.id)}
                            />
                          </Flex>
                        </Td>
                      </Tr>
                    ))
                  ) : (
                    <LoadingSpinner />
                  )}
                </Tbody>
              </Table>
              <GenericModal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}>
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
                  onSubmit={handleSubmit(handleEditSector)}
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
