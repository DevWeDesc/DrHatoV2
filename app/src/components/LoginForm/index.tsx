import { useContext, useState } from "react";
import { LoginFormContainer } from "./styles";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, ChakraProvider, Flex, Text } from "@chakra-ui/react";
import { defaultTheme } from "../../styles/themes/default";
import { LoadingSpinner } from "../Loading";
import { Input } from "../admin/Input";
import * as yup from "yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { api } from "../../lib/axios";
import Cookies from "js-cookie";
import { DbContext } from "../../contexts/DbContext";
import { AuthContext } from "../../contexts/AuthContext";

export function LoginForm() {
  const { setToken } = useContext(AuthContext);
  const navigate = useNavigate();
  interface SignInProps {
    email: string;
    password: string;
  }

  const SignInSchema = yup.object().shape({
    email: yup.string().required("E-mail Obrigatório").email(),
    password: yup.string().required("Senha Obrigatória"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(SignInSchema),
  });

  const handleLogin: SubmitHandler<SignInProps> = async (
    values: SignInProps
  ) => {
    const data = {
      email: values.email,
      password: values.password,
    };

    try {
      await api
        .post("/login", data)
        .then((res) => {
          setToken(res.data.token);
          Cookies.set("token", res.data.token, { expires: 2 / 48 });
          const token = Cookies.get("token");

          if (!token || token === undefined || token === null) {
            toast.error("Falha ao realizar login");
          } else {
            localStorage.setItem(
              "user",
              JSON.stringify({
                email: res.data.userData.email,
                username: res.data.userData.username,
              })
            );
            //console.log(localStorage);
            navigate("/Home");
            toast.success("Sucesso ao realizar login");
          }
        })
        .catch((err) => {
          toast.error("Falha ao realizar login");
          console.log(err);
        });
    } catch (error) {
      toast.error("Falha ao realizar login");
      console.log(error);
    }
  };

  return (
    <ChakraProvider theme={defaultTheme}>
      <LoginFormContainer onSubmit={handleSubmit(handleLogin)}>
        <Flex className="submitLogin" marginTop="2rem">
          <Flex direction="column">
            <label htmlFor="email">Insira seu E-mail</label>
            <Input
              id="email"
              {...register("email")}
              error={errors.email}
              name="email"
              border="4px"
              placeholder="Insira seu e-mail"
              type="text"
            />
          </Flex>
          <Flex direction="column" mt="12" mb="10">
            <label htmlFor="password">Insira sua senha</label>
            <Input
              {...register("password")}
              placeholder="Insira sua senha"
              type="password"
              name="password"
              id="password"
              error={errors.password}
            />
          </Flex>

          <Button colorScheme="whatsapp" type="submit">
            ENTRAR
          </Button>
        </Flex>
      </LoginFormContainer>
    </ChakraProvider>
  );
}
