import { ChakraProvider, Flex } from "@chakra-ui/react";
import { Header } from "../../components/admin/Header";
import { GenericLink } from "../../components/Sidebars/GenericLink";
import { GenericSidebar } from "../../components/Sidebars/GenericSideBar";
import {
  MdOutlineListAlt,
  GiHealthIncrease,
  BsArrowLeft,
  BsReception4,
  RiLockPasswordFill,
  GiCardDiscard,
  GiMedicines,
} from "react-icons/all";
import { AdminContainer } from "../AdminDashboard/style";
import ListMedicines from "../../components/Lists/ListTypesMedicines";
import { useLocation } from "react-router-dom";
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
                name="Recepção"
                icon={BsReception4}
                path={`/Recepcao/`}
              />
              <GenericLink
                name="Trocar Senha"
                icon={RiLockPasswordFill}
                path={`/Recepcao/Ferramentas/TrocaDeSenha/${1}`}
              />{" "}
              <GenericLink
                name="Autorizações"
                icon={GiCardDiscard}
                path={`/Recepcao/Ferramentas/Autorizacao`}
              />{" "}
              <GenericLink
                name="Tabela de Preços"
                icon={GiMedicines}
                path={`/Recepcao/Ferramentas/Tabela`}
              />{" "}
            </GenericSidebar>
            <ListMedicines></ListMedicines>
          </Flex>
        </Flex>
      </AdminContainer>
    </ChakraProvider>
  );
}
