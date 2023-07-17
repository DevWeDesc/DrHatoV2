import { useContext, useState } from "react";
import { LoginFormContainer } from "./styles";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, ChakraProvider, Flex, Text } from "@chakra-ui/react";
import { defaultTheme } from "../../styles/themes/default";
import { DbContext } from "../../contexts/DbContext";
import { LoadingSpinner } from "../Loading";
import { Input } from "../admin/Input";

export function LoginForm() {
  const {
    setUserPassword,
    setUserLogin,
    validateLogin,
    userPassword,
    userLogin,
  } = useContext(AuthContext);
  const { dbLoaded } = useContext(DbContext);
  const [errors, setErrors] = useState<Boolean>(false);

  const navigate = useNavigate();
  const handleLogin = () => {
    if (validateLogin() === true) {
      navigate("/Home");
      toast.success("Usuario logado com sucesso!");
    } else {
      toast.info("✋ login ou senha incorretos!");
    }
  };

  return (
    <ChakraProvider theme={defaultTheme}>
      <LoginFormContainer>
        {/*<h1>
          {" "}
          Bem vindo(a) <span className="waving-hand">&#9995;</span>{" "}
  </h1>*/}
        <Flex className="submitLogin" marginTop="2rem">
          <Flex direction="column">
            <label htmlFor="login">Insira seu Login</label>
            <Input
              id="UserLogin"
              name="UserLogin"
              border="4px"
              placeholder="Insira seu Login"
              type="text"
              onChange={(ev) => setUserLogin(ev.target.value)}
            />
          </Flex>
          <Flex direction="column" mt="12" mb="10">
            <label htmlFor="password">Insira sua senha</label>
            <Input
              placeholder="Insira sua senha"
              type="password"
              name="UserPassword"
              id="UserPassword"
              onChange={(ev) => setUserPassword(ev.target.value)}
            />
          </Flex>

          {!!errors && (
            <Text color="red" fontWeight="bold">
              Preencha todos os Campos!
            </Text>
          )}
          {dbLoaded === true ? (
            <Button
              colorScheme="whatsapp"
              border="8px"
              onClick={() => {
                if (userPassword != "" && userLogin != "") {
                  handleLogin();
                  setErrors(false);
                } else setErrors(true);
              }}
            >
              Entrar
            </Button>
          ) : (
            <>
              Carregando base de Dados
              <LoadingSpinner />
            </>
          )}
        </Flex>
      </LoginFormContainer>
    </ChakraProvider>
  );
}
