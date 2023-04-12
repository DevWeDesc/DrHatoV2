import { useContext  } from "react"
import { LoginFormContainer } from "./styles"
import { useNavigate} from 'react-router-dom'
import { AuthContext } from "../../contexts/AuthContext";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Button, ChakraProvider, Input, Flex } from "@chakra-ui/react";
import { defaultTheme } from "../../styles/themes/default";
import { DbContext } from "../../contexts/DbContext";
import { LoadingSpinner } from "../Loading";

export function LoginForm() {
    const { setUserPassword, setUserLogin, validateLogin} = useContext(AuthContext)
    const { dbLoaded } = useContext(DbContext)


    const navigate = useNavigate()
    const handleLogin = () =>  {
      
            if(validateLogin() === true) {
                    navigate('/Home')
            }else {
                toast.info('✋ login ou senha incorretos!',);
            }
            }
    return (

        <ChakraProvider theme={defaultTheme}>
        <LoginFormContainer>
          
            <h1> Bem vindo(a) <span className="waving-hand">&#9995;</span> </h1>
           <Flex className="submitLogin">
            <label htmlFor="login">Seu Login</label>
            <Input border="4px"  placeholder="seu login" type="text" onChange={ev => setUserLogin(ev.target.value) } />

            <label htmlFor="password">Sua senha</label>
            <Input   placeholder="sua senha" type="password" name="" id="" onChange={ev => setUserPassword(ev.target.value)} />

            {
                dbLoaded === true ? ( <Button colorScheme="whatsapp" border="8px" onClick={() => handleLogin()}>Entrar</Button>) : (<>Carregando base de Dados<LoadingSpinner/></>)
            }

           
 
            </Flex> 

        
      
        </LoginFormContainer>
        </ChakraProvider>
    )
}
