import { Header } from "../../components/Header";
import { ChakraProvider, useConst } from "@chakra-ui/react";
import { HomeContainer } from "./style";
import { AsideMenu } from "../../components/AsideMenu";
import { PlantVetTable } from "../../components/Tables/PlantVetTable";
import { CardsMenu } from "../../components/CardsMenu";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";

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
        </div>
        <div className="section-2">
          <div className="cards">
            <CardsMenu />
          </div>
        </div>
        <div className="section-3">{/* <PlantVetTable />*/}</div>
      </HomeContainer>
    </ChakraProvider>
  );
  /*} else {
    return Redirect();
  }*/
}
