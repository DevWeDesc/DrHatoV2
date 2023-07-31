import { ChakraProvider, Flex } from "@chakra-ui/react";
import { Header } from "../../components/admin/Header";
import { GenericLink } from "../../components/Sidebars/GenericLink";
import { GenericSidebar } from "../../components/Sidebars/GenericSideBar";
import {
  MdOutlineListAlt,
  GiHealthIncrease,
  BsArrowLeft,
} from "react-icons/all";
import { AdminContainer } from "../AdminDashboard/style";
import ListMedicines from "../../components/Lists/ListTypesMedicines";

export function Medicines() {
  return (
    <ChakraProvider>
      <AdminContainer>
        <Flex direction="column" h="100vh">
          <Header title="Painel Medicamentos" />
          <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
            <GenericSidebar>
              <GenericLink name="Voltar" icon={BsArrowLeft} path="/Home/" />
              <GenericLink
                name="Lista de Medicamentos"
                icon={MdOutlineListAlt}
                path="/Medicines"
              />
              <GenericLink
                name="Recepção"
                icon={MdOutlineListAlt}
                path="/Recepcao"
              />
              <GenericLink
                name="Incluir Medicamento"
                icon={GiHealthIncrease}
                path="/Medicines/Create"
              />
            </GenericSidebar>
            <ListMedicines></ListMedicines>
          </Flex>
        </Flex>
      </AdminContainer>
    </ChakraProvider>
  );
}
