import { AdminContainer } from "./style";
import { ChakraProvider } from "@chakra-ui/react";
import { Flex } from "@chakra-ui/react";
import { Header } from "../../components/admin/Header";
import { Sidebar } from "../../components/admin/Sidebar";
import EditAutorizations from "../../components/administration/Autorizations/editAutorizations";

export function AutorizationsEdit() {
  return (
    <ChakraProvider>
      <AdminContainer>
        <Flex direction="column" h="100vh">
          <Header title="Painel de Autorizações" url="/Admin/Autorizations" />
          <Flex w="100%" my="6" maxWidth={1680} mx="auto" px="6">
            <Sidebar />
            <EditAutorizations />
          </Flex>
        </Flex>
      </AdminContainer>
    </ChakraProvider>
  );
}
