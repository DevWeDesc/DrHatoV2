import { LoginForm } from "../../components/LoginForm";
import { FormLoginContainer, ImageLoginContainer, LoginContent } from "./styles";
import Logo from  '../../assets/logoPadronizada.png'



export function Login () {
    return (
        <LoginContent>
            <FormLoginContainer>
            <img src={Logo} alt="" />
            
            <LoginForm />
            </FormLoginContainer>
           
        </LoginContent>
      
    )
}