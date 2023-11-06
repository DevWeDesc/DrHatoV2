import { ChakraProvider, Flex } from "@chakra-ui/react";
import { Header } from "../../components/admin/Header";
import { GenericLink } from "../../components/Sidebars/GenericLink";
import { GenericSidebar } from "../../components/Sidebars/GenericSideBar";
import {
  BsReception4,
  RiLockPasswordFill,
  GiCardDiscard,
  GiMedicines,
  GiHealthPotion,
  FaClipboardList,
  GiHealthIncrease,
} from "react-icons/all";
import { AdminContainer } from "../AdminDashboard/style";
import ListMedicines from "../../components/Lists/ListTypesMedicines";
import { useState, useEffect } from "react";

export function Medicines() {
  const [origem, setOrigem] = useState("Desconhecida");

  useEffect(() => {
    const origemArmazenada = localStorage.getItem("origem");
    if (origemArmazenada) {
      setOrigem(origemArmazenada);
    }
  }, []);

  return (
    <ChakraProvider>
      <AdminContainer>
        <Flex direction="column" h="100vh">
          <Header
            title="Painel Medicamentos"
            url={origem === "Desconhecida" ? "/Home" : "/Recepcao"}
          />
          <Flex w="100%" my="6" maxWidth={1680} mx="auto" px="6">
            <GenericSidebar>
              <GenericLink
                name="Medicamentos"
                icon={GiHealthPotion}
                path={`/Medicines/`}
              />
              <GenericLink
                name="Grupos"
                icon={FaClipboardList}
                path={"/Medicines/Groups"}
              />{" "}
                   <GenericLink
                name="Criar/Medicamento"
                icon={GiHealthIncrease}
                path={`/Medicines/Create`}
              />{" "}
        
            </GenericSidebar>
            <ListMedicines />
          </Flex>
        </Flex>
      </AdminContainer>
    </ChakraProvider>
  );
}
