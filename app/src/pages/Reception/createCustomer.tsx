import { Text, Flex, Box, SimpleGrid, ChakraProvider } from "@chakra-ui/react";
import { ReceptionCreateNewConsultForm } from "../../components/Forms/ReceptionCreateNewConsultForm";
import { ReceptionSidebar } from "../../components/Sidebars/ReceptionBar";
import { Header } from "../../components/admin/Header";

export function CreateCustomer() {
  return (
    <ChakraProvider>
      <Flex direction="column" h="100vh">
        <Header title="Cadastro de Clientes" />
        <Flex w="100%" my="6" maxWidth={1680} mx="auto" px="6">
          <ReceptionSidebar />
          <SimpleGrid flex="1" gap="4" align="flex-start" as={Flex}>
            <Flex
              direction="column"
              p="10"
              textAlign="center"
              bg="gray.100"
              borderRadius={8}
              w="100%"
              overflow="none"
            >
              <ReceptionCreateNewConsultForm />
            </Flex>
          </SimpleGrid>
        </Flex>
      </Flex>
    </ChakraProvider>
  );
}
