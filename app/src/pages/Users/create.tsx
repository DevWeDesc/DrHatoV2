import {
  Text,
  Box,
  Button,
  ChakraProvider,
  Flex,
  Heading,
  Divider,
  VStack,
  SimpleGrid,
  HStack,
} from "@chakra-ui/react";
import { Header } from "../../components/admin/Header";
import { Sidebar } from "../../components/admin/Sidebar";
import { AdminContainer } from "../AdminDashboard/style";
import { FormContainer } from "./style";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { CreateUserFormData } from "../../interfaces";
import { Input } from "../../components/admin/Input";
import { SubmitHandler } from "react-hook-form/dist/types";
import { api } from "../../lib/axios";
import { toast } from "react-toastify";
import * as yup from "yup";

const schema = yup
  .object({
    name: yup.string().required("Login de usuario obrigatório"),
    username: yup.string().required("UserName de usuario obrigatório"),
    password: yup.string().required("Senha de usuario obrigatório"),
    isAdmin: yup.bool().required("Nível de usuario obrigatorio"),
  })
  .required();

export function CreateUser() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({});
  const navigate = useNavigate();

  const handleCreateUser: SubmitHandler<CreateUserFormData> = async (
    values
  ) => {
    try {
      await api.post("/users", {
        name: values.name,
        username: values.username,
        password: values.password,
        isAdmin: true,
      });
      toast.success("Usuário cadastrado");
    } catch (error) {
      toast.error("Usuário cadastrado");
    }
  };

  return (
    <ChakraProvider>
      <AdminContainer>
        <Flex direction="column" h="100vh">
          <Header title="USUÁRIOS" />

          <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
            <Sidebar />
            <Box
              flex="1"
              textAlign="center"
              maxHeight={500}
              maxWidth={800}
              borderRadius={8}
              bg="gray.200"
              p="8"
            >
              <Heading size="lg" fontWeight="normal">
                Criar usuário
              </Heading>
              <Divider my="6" borderColor="green.300" />

              <VStack spacing="6">
                <SimpleGrid minChildWidth="320px" spacing="8" w="100%">
                  <FormContainer>
                    <Flex
                      as="form"
                      align="center"
                      direction="column"
                      onSubmit={handleSubmit(handleCreateUser as any)}
                    >
                      <Input
                        {...register("name")}
                        label="Seu login"
                        maxWidth={400}
                        name="name"
                        id="name"
                        placeholder="insira o login de usuário"
                      />

                      <Input
                        {...register("password")}
                        label="Sua senha"
                        maxWidth={400}
                        name="password"
                        id="password"
                        type="password"
                        placeholder="insira a senha"
                      />

                      <Input
                        {...register("username")}
                        label="Nome de usuário"
                        alignItems="center"
                        maxWidth={400}
                        name="username"
                        id="username"
                        type="password"
                        placeholder="Nome de usuário"
                      />

                      <Text fontWeight="medium">
                        o usuário será administrador ?
                      </Text>

                      <HStack display="flex" align="center" textAlign="center">
                        <Input
                          {...register("isAdmin")}
                          maxWidth={4}
                          maxHeight={6}
                          label="sim"
                          name="isAdmin"
                          id="sim"
                          type="radio"
                          value="true"
                        />
                        <Input
                          {...register("isAdmin")}
                          maxWidth={4}
                          maxHeight={6}
                          label="não"
                          name="isAdmin"
                          id="não"
                          type="radio"
                          value="false"
                        />
                      </HStack>

                      <Flex mt="8" justify="center">
                        <HStack>
                          <Button
                            onClick={() => navigate("/Users")}
                            colorScheme="teal"
                          >
                            Cancelar
                          </Button>
                          <Button type="submit" colorScheme="whatsapp">
                            Cadastrar
                          </Button>
                        </HStack>
                      </Flex>
                    </Flex>
                  </FormContainer>
                </SimpleGrid>
              </VStack>
            </Box>
          </Flex>
        </Flex>
      </AdminContainer>
    </ChakraProvider>
  );
}
