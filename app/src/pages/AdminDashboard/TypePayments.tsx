import { ChakraProvider, Flex } from "@chakra-ui/react";
import { Sidebar } from "../../components/admin/Sidebar";
import { Header } from "../../components/admin/Header";
import { AdminContainer } from "./style";
import { TypePayments } from "../../components/administration/TypePayments";

export const TypePaymentsList = () => {
  return (
    <ChakraProvider>
      <AdminContainer>
        <Flex direction="column" h="100vh">
          <Header title="Instruções" url="/Admin/" />
          <Flex w="100%" my="6" maxWidth={1680} mx="auto" px="6" maxH="44rem">
            <Sidebar />
            <TypePayments />
          </Flex>
        </Flex>
      </AdminContainer>
    </ChakraProvider>
  );
};
