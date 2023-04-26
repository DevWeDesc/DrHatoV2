import { useNavigate } from "react-router-dom";
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
  MenuItem
} from "@chakra-ui/react";

import { LoadingSpinner } from "../Loading";
import { HeaderContainer } from "./style";
import { StyledBox } from "./style";
import { MenuBurger } from "../Menu";
import { ArrowDown } from "phosphor-react";

export function Header() {
  const navigate = useNavigate();
  const userStorage = localStorage.getItem("userSession");
  const userName = JSON.parse(userStorage as any);
  const logOut = () => {
    localStorage.clear();
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
        <Flex direction="column">
        <Menu>
          <MenuButton as={Button} rightIcon={<ArrowDown />}>
          {userName.name ? (
            <Text fontSize="18px" fontWeight="medium">
              {userName.username}
            </Text>
          ) : (
            <LoadingSpinner />
          )}
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
