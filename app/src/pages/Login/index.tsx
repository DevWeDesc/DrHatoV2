import { LoginForm } from "../../components/LoginForm";
import { FormLoginContainer, LoginContent } from "./styles";
import Logo from "../../assets/logoPadronizada.png";

export function Login() {
  console.log(localStorage);
  console.log(localStorage.user);
  return (
    <LoginContent>
      <FormLoginContainer>
        <img src={Logo} alt="" />

        <LoginForm />
      </FormLoginContainer>
    </LoginContent>
  );
}
