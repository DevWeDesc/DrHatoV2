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

export function SurgeryCenter() {
  const { register, handleSubmit } = useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenTwo, setIsModalOpenTwo] = useState(false);
  const [surgeryCenter, setSurgeryCenter] = useState([]);
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

  const handleCreateSurgeryCenter: SubmitHandler<FieldValues> = async (
    values
  ) => {
    try {
      const data = {
        name: values.name,
      };
      await api.post("/surgeryCenter", data);
      toast.success("Centro cirurgico criado com sucesso!!");
      navigate(0);
    } catch (error) {
      toast.error("Falha ao criar novo Centro cirurgico!!");
    }
  };

  async function DeleteSurgeryCenter(id: string | number) {
    try {
      await api.delete(`surgeryCenter/${id}`);
      toast.success("Centro Cirurgico deletado com sucesso!!");
      navigate(0);
    } catch (error) {
      toast.error("Falha ao Deletar Centro Cirurgico!!");
    }
  }

  const handleEditSurgeryCenter: SubmitHandler<FieldValues> = async (
    values
  ) => {
    try {
      const data = {
        name: values.name,
      };
      await api.put(`surgeryCenter/${values.id}`, data);
      toast.success("Centro Cirurgico editado com sucesso!!");
      navigate(0);
    } catch (error) {
      toast.error("Falha ao editar Centro Cirurgico!!");
    }
  };

  return (
    <ChakraProvider>
      <AdminContainer>
        <Flex direction="column" h="100vh">
          <Header title="Centro Cirúrgico" url="/Admin/" />

          <Flex
            w="100%"
            my="6"
            direction={{ base: "column", xl: "row" }}
            mx="auto"
            px="6"
          >
            <Sidebar />
            <Box flex="1" borderRadius={8} py={{ base: "8", xl: 0 }}>
              <Heading
                fontSize={{ base: "lg", lg: "2xl" }}
                fontWeight="bold"
                pl="2"
                w="100%"
                mb="5"
                display="flex"
                flexDirection={{ base: "column", md: "row" }}
                gap={{ base: 3, md: 0 }}
                justifyContent="space-between"
              >
                Centro Cirúrgico
                <Button
                  as="a"
                  py="6"
                  fontSize={{ base: "sm", lg: "md" }}
                  colorScheme="whatsapp"
                  cursor="pointer"
                  leftIcon={<Icon as={RiAddLine} />}
                  onClick={() => openModal()}
                >
                  Cadastrar novo Centro Cirúrgico
                </Button>
              </Heading>

              <Table colorScheme="blackAlpha">
                <Thead>
                  <Tr>
                    <Th>Nome</Th>
                    <Th>Slots</Th>
                    <Th />
                  </Tr>
                </Thead>

                <Tbody>
                  {surgeryCenter.length > 0 ? (
                    surgeryCenter.map((surgeryCenter) => (
                      <Tr key="0">
                        <Td fontSize={{ base: "12", lg: "sm" }}></Td>
                        <Td fontSize={{ base: "12", lg: "sm" }}></Td>

                        <Td>
                          <Flex gap="2" ml="40%">
                            <Button
                              as="a"
                              size="sm"
                              fontSize="sm"
                              colorScheme="yellow"
                              leftIcon={<Icon as={RiPencilLine} />}
                              onClick={() => openModalTwo()}
                            >
                              Editar Centro Cirúrgico
                            </Button>

                            <ConfirmationDialog
                              disabled={false}
                              icon={<BsFillTrashFill fill="white" size={16} />}
                              buttonTitle="Deletar Centro Cirurgico"
                              whatIsConfirmerd="Tem certeza que deseja Excluir esse Centro Cirurgico?"
                              describreConfirm="Excluir o Centro Cirurgico é uma ação irreversivel, tem certeza que deseja excluir?"
                              callbackFn={() => DeleteSurgeryCenter(1)}
                            />
                          </Flex>
                        </Td>
                      </Tr>
                    ))
                  ) : (
                    <Tr>
                      <Td fontSize={{ base: "12", lg: "sm" }} fontWeight="bold">
                        Sem Centro Cirurgico cadastrado até o momento!
                      </Td>
                    </Tr>
                  )}
                </Tbody>
              </Table>
              <GenericModal isOpen={isModalOpen} onRequestClose={closeModal}>
                <FormControl
                  as="form"
                  onSubmit={handleSubmit(handleCreateSurgeryCenter)}
                  display="flex"
                  flexDir="column"
                  alignItems="center"
                >
                  <Input
                    {...register("name")}
                    name="name"
                    label="Nome do Centro cirúrgico"
                    mb="4"
                  />

                  <Input
                    {...register("name")}
                    name="name"
                    label="Slots"
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
                  onSubmit={handleSubmit(handleEditSurgeryCenter)}
                  display="flex"
                  flexDir="column"
                  alignItems="center"
                >
                  <Text pb="15">Editar Centro cirúrgico</Text>
                  <Input
                    {...register("id")}
                    name="id"
                    label="Id do Centro cirúrgico"
                    mb="4"
                  />
                  <Input
                    {...register("name")}
                    name="name"
                    label="Nome do Centro cirúrgico"
                    mb="4"
                  />

                  <Input
                    {...register("id")}
                    name="id"
                    label="Slots do Centro cirúrgico"
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
