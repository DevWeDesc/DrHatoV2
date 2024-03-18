import { Link, useNavigate } from "react-router-dom";
import logoPadronizada from "../../assets/logoPadronizada.png";
import {
  Text,
  Button,
  Flex,
  ChakraProvider,
  Image,
  Menu,
  MenuButton,
  MenuList,
  useColorMode,
} from "@chakra-ui/react";
import { LoadingSpinner } from "../Loading";
import { HeaderContainer } from "./style";
import { StyledBox } from "./style";
import { ArrowDown } from "phosphor-react";
import { useContext } from "react";
import { DbContext } from "../../contexts/DbContext";
import Cookies from "js-cookie";
import { RiNotificationLine } from "react-icons/ri";
import { CiLight } from "react-icons/ci";
import { MdOutlineDarkMode } from "react-icons/md";

export function Header() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") as string);

  const logOut = () => {
    Cookies.remove("token");
    localStorage.removeItem("user");
    navigate("/");
  };
  return (
    <ChakraProvider>
      <HeaderContainer>
        <StyledBox>
          <Image src={logoPadronizada} alt="Logo vet Dr hato" />
        </StyledBox>
        <Text fontSize="18px" fontWeight="bold">
          Sistema veterinário
        </Text>
        <Flex align="center" gap="10">
          <RiNotificationLine
            size="20"
            cursor="pointer"
            onClick={() => navigate(`/Reminder`)}
          />

        <Link to="/releases" >
        <Text fontSize="18px" fontWeight="bold">
         Releases
        </Text>
        </Link>
     
        
          <Menu>
            <MenuButton as={Button} rightIcon={<ArrowDown />}>
              {user.consultName}
            </MenuButton>
            <MenuList>
              <Flex direction="column" gap="2">
                <Button
                  maxWidth={220}
                  maxHeight={6}
                  border="1px"
                  onClick={() => navigate("/Users")}
                >
                  Configurações de usuário
                </Button>
                <Button
                  maxWidth={220}
                  maxHeight={6}
                  border="1px"
                  onClick={() => logOut()}
                >
                  Sair
                </Button>
                <Button
                  maxWidth={220}
                  maxHeight={6}
                  border="1px"
                  onClick={() => navigate("/Queue")}
                >
                  Fila de Atendimento
                </Button>
              </Flex>
            </MenuList>
          </Menu>
        </Flex>
      </HeaderContainer>
    </ChakraProvider>
  );
}
