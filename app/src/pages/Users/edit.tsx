import {
  Text,
  Flex,
  Box,
  SimpleGrid,
  ChakraProvider,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  FormControl,
  Button,
  HStack,
  Checkbox,
  VStack,
} from "@chakra-ui/react";
import { AxiosRequestConfig } from "axios";
import { useState, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Input } from "../../components/admin/Input";
import { Sidebar } from "../../components/admin/Sidebar";
import { api } from "../../lib/axios";
import { FormContainer } from "./style";
import { Header } from "../../components/admin/Header";

interface UserProps {
  id?: any;
  email: string;
  password: string;
  username: string;
  userType: string;
}

interface EditUserProps {
  id: any;
  email: string;
  password: string;
  username: string;
  userIsVet: boolean;
}

export function EditUser() {
  const { id } = useParams<{ id: string }>();
  const { register, handleSubmit } = useForm();
  const [customer, setCustomer] = useState<UserProps>({
    email: "",
    username: "",
    password: "",
    userType: "",
  });

  useEffect(() => {
    async function loadCustomer() {
      const response = await api.get(`/users/${id}`);

      setCustomer(response.data);
    }
    loadCustomer();
  }, [id]);

  const handleEditUser: SubmitHandler<EditUserProps> = async (values) => {
    console.log(values);
    const data = {
      email: values.email,
      username: values.username,
      password: values.password,
      userIsVet: values.userIsVet,
    };
    try {
      await api.put(`/users/${id}`, data);
      toast.success("usuário editado com sucesso");
    } catch (error) {
      toast.error("falha ao editar usuário");
    }
  };

  const handleDeleteUser: SubmitHandler<EditUserProps> = async () => {
    try {
      const confirm = window.confirm(
        "Deletar um usuário e uma operação irrevesivel, tem certeza que deseja continuar?"
      );
      if (confirm === true) {
        await api.delete(`/users/${id}`, customer.id);
        toast.warning("Usuário deletado");
      }
    } catch (error) {
      toast.error("Falha ao deletar usuário");
    }
  };
  return (
    <ChakraProvider>
      <Flex direction="column" h="100vh">
        <Header title="Edição de Usuários" url="/Users" />
        <Flex w="100%" my="6" maxWidth={1680} mx="auto" px="6">
          <Sidebar />
          <SimpleGrid
            flex="1"
            gap="4"
            minChildWidth="320px"
            align="flex-start"
            as={Flex}
          >
            <Box textAlign="center" p="8" bg="gray.100" borderRadius={8}>
              <Flex mt="8" justify="center" direction="column">
                <Table colorScheme="blackAlpha">
                  <Thead>
                    <Tr>
                      <Th>Email</Th>
                      <Th>Nome de Usuário</Th>
                      <Th>Senha</Th>
                      <Th>Tipo de Uusário</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    <Tr>
                      <Td>{customer.email}</Td>
                      <Td>{customer.username}</Td>
                      <Td>**********</Td>
                      <Td>
                        {customer.userType.includes("admin")
                          ? "ADMINISTRADOR"
                          : customer.userType.includes("vet")
                          ? "VETERINÁRIO"
                          : "USUÁRIO"}
                      </Td>
                    </Tr>
                  </Tbody>
                </Table>
                <FormControl as="form" alignItems="center">
                  <FormContainer>
                    <Input
                      {...register("email")}
                      name="email"
                      label="Novo email de usuário"
                    />
                    <Input
                      {...register("username")}
                      name="username"
                      label="Novo nome de usuário"
                    />
                    <Input
                      {...register("password")}
                      name="password"
                      label="Nova senha de usuário"
                    />

                    <HStack mt="4">
                      <VStack>
                        <label htmlFor="userIsVet">
                          USUÁRIO E VETERINÁRIO?
                        </label>
                        <Checkbox
                          size="lg"
                          colorScheme="whatsapp"
                          borderColor="gray.900"
                          {...register("userIsVet")}
                          name="userIsVet"
                          id="userIsVet"
                        />
                      </VStack>
                    </HStack>

                    <Flex align="center" justify="center" gap={4}>
                      <Button
                        mt="4"
                        colorScheme="whatsapp"
                        type="submit"
                        onClick={handleSubmit(handleEditUser as any)}
                      >
                        Editar
                      </Button>
                      <Button
                        mt="4"
                        colorScheme="red"
                        type="submit"
                        onClick={handleSubmit(handleDeleteUser as any)}
                      >
                        Deletar
                      </Button>
                    </Flex>
                  </FormContainer>
                </FormControl>
              </Flex>
            </Box>
          </SimpleGrid>
        </Flex>
      </Flex>
    </ChakraProvider>
  );
}
