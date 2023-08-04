import {
  Box,
  ChakraProvider,
  Flex,
  Table,
  Tr,
  Td,
  Thead,
  Tbody,
  Th,
} from "@chakra-ui/react";
import { Header } from "../../components/admin/Header";
import { SearchComponent } from "../../components/Search";
import { GenericLink } from "../../components/Sidebars/GenericLink";
import { GenericSidebar } from "../../components/Sidebars/GenericSideBar";
import { FaHospital, BiHome } from "react-icons/all";
import { AdminContainer } from "../AdminDashboard/style";
import { SearchAdmission } from "../../components/Admission/admissions";

export function Admissions() {
  return (
    <ChakraProvider>
      <AdminContainer>
        <Flex direction="column" h="100vh">
          <SearchAdmission />
        </Flex>
      </AdminContainer>
    </ChakraProvider>
  );
}
