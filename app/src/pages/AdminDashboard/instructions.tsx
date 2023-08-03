import { ChakraProvider, Flex } from "@chakra-ui/react";
import { Header } from "../../components/admin/Header";
import { Sidebar } from "../../components/admin/Sidebar";
import { AdminContainer } from "../AdminDashboard/style";
import { Instructions } from "../../components/Instructions";

export function InstructionsList() {
  return (
    <ChakraProvider>
      <AdminContainer>
        <Flex direction="column" h="100vh">
          <Header title="Instruções" url="/Admin/" />

          <Flex w="100%" my="6" maxWidth={1680} mx="auto" px="6" maxH="44rem">
            <Sidebar />
            <Instructions />
          </Flex>
        </Flex>
      </AdminContainer>
    </ChakraProvider>
  );
}
