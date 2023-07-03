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
  useStatStyles,
  Select,
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

import { useState } from "react";
=======
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
  const [userType, setUserType] = useState("");

  const handleCreateUser: SubmitHandler<CreateUserFormData> = async (
    values
  ) => {


    if(userType === "null") {
      toast.error("Selecione o tipo de usuário");
      return
    } 
    try {
        await api.post("/users", {
          name: values.name,
          username: values.username,
          password: values.password,
          userType: [`${userType}`],
        });
        toast.success("Usuário cadastrado");
        
      console.log(values)
    } catch (error) {
      toast.error("Falha ao cadastrar usuário");
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
              borderRadius={8}
              bg="gray.200"
              p="8"
            >
              <Heading size="lg" mb="4" fontWeight="normal">
                Criar usuário
              </Heading>
    
              
                  <FormContainer>
                    <Flex
                     w="100%"
                     height="100%"
                      as="form"
                      align="center"
                      direction="column"
                      onSubmit={handleSubmit(handleCreateUser as any)}
                    >
                      <Input
                        {...register("name")}
                        label="Seu login"
                        maxWidth={450}
                        name="name"
                        id="name"
                        placeholder="insira o login de usuário"
                      />

                      <Input
                        {...register("password")}
                        label="Sua senha"
                        maxWidth={450}
                        name="password"
                        id="password"
                        type="password"
                        placeholder="insira a senha"
                      />

                      <Input
                        {...register("username")}
                        label="Nome de usuário"
                        alignItems="center"
                        maxWidth={450}
                        name="username"
                        id="username"
                        type="password"
                        placeholder="Nome de usuário"
                      />
                          <Select  name="userType" value="null" maxWidth={450} border="2px" mt="4" textAlign="center" onChange={(ev) => setUserType(ev.target.value)} >
                          <option value="null">SELECIONE O TIPO DE USUÁRIO</option>
                            <option value="admin">ADMINISTRADOR</option>
                            <option value="reception">RECEPCIONISTA</option>
                            <option value="vet">VETERINÁRIO</option>
                            
                          </Select>

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
                
            </Box>
          </Flex>
        </Flex>
      </AdminContainer>
    </ChakraProvider>
  );
}
