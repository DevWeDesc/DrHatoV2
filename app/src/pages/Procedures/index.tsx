import { ChakraProvider, Flex } from "@chakra-ui/react";
import { Header } from "../../components/admin/Header";
import { Sidebar } from "../../components/admin/Sidebar";
import ListProcedures from "../../components/administration/Procedures";
import { AdminContainer } from "../AdminDashboard/style";

export function ProceduresList() {
  return (
    <ChakraProvider>
      <AdminContainer>
        <Flex direction="column" h="100vh">
          <Header title="Procedimentos" url="/Admin/" />
          <Flex
            w="100%"
            my="6"
            direction={{ base: "column", xl: "row" }}
            mx="auto"
            px="6"
          >
            <Sidebar />
            <ListProcedures />
          </Flex>
        </Flex>
      </AdminContainer>
    </ChakraProvider>
  );
}
