import { AdminContainer } from "./style";
import { ChakraProvider } from "@chakra-ui/react";
import { Flex } from "@chakra-ui/react";
import { Header } from "../../components/admin/Header";
import { Sidebar } from "../../components/admin/Sidebar";
import Charts from "../../components/administration/Charts";

export function AdminCharts() {
  return (
    <ChakraProvider>
      <AdminContainer>
        <Flex direction="column" h="100vh">
          <Header title="Gráficos" url="/Admin/" />
          <Flex w="100%" my="6" maxWidth={1680} mx="auto" px="6">
            <Sidebar />
            <Charts />
          </Flex>
        </Flex>
      </AdminContainer>
    </ChakraProvider>
  );
}
