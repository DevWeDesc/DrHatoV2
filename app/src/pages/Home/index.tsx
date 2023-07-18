import { Header } from "../../components/Header";
import { ChakraProvider } from "@chakra-ui/react";
import { HomeContainer } from "./style";

import { AsideMenu } from "../../components/AsideMenu";
import { PlantVetTable } from "../../components/Tables/PlantVetTable";
import { CardsMenu } from "../../components/CardsMenu";
import { motion } from "framer-motion";
export function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
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
    </motion.div>
  );
}
