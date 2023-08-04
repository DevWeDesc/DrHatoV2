import { Header } from "../../components/Header";
import { ChakraProvider } from "@chakra-ui/react";
import { HomeContainer } from "./style";

import { AsideMenu } from "../../components/AsideMenu";
import { PlantVetTable } from "../../components/Tables/PlantVetTable";
import { CardsMenu } from "../../components/CardsMenu";
export function Home() {
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
}
