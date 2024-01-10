import { Header } from "../../components/Header";
import { ChakraProvider } from "@chakra-ui/react";
import { HomeContainer } from "./style";
import { AsideMenu } from "../../components/AsideMenu";
import { CardsMenu } from "../../components/CardsMenu";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

import { useNavigate } from "react-router-dom";

export function Home() {
  const navigate = useNavigate();
  const { token }: any = useContext(AuthContext);

  function Redirect() {
    navigate("/");
  }
  //if (token != undefined && token != null && token === Cookies.get("token")) {
  return (
    <ChakraProvider>
      <Header />
      <HomeContainer>
        <div className="section-1">
          <AsideMenu />
          {/* <Reminder /> */}
        </div>
        <div className="section-2">
          <div className="cards">
            <CardsMenu />
          </div>
        </div>
      </HomeContainer>
    </ChakraProvider>
  );
  /*} else {
    return Redirect();
  }*/
}
