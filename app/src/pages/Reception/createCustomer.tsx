import { Flex, SimpleGrid, ChakraProvider } from "@chakra-ui/react";
import { ReceptionCreateNewConsultForm } from "../../components/Forms/ReceptionCreateNewConsultForm";
import { Header } from "../../components/admin/Header";
import { GenericLink } from "../../components/Sidebars/GenericLink";
import { GenericSidebar } from "../../components/Sidebars/GenericSideBar";
import { AiFillEdit } from "react-icons/ai";
import { BiCalendarPlus } from "react-icons/bi";

export function CreateCustomer() {
  return (
    <ChakraProvider>
      <Flex direction="column" h="100vh">
        <Header title="Cadastro de Clientes" url="/Recepcao" />
        <Flex w="100%" my="6" maxWidth={1680} mx="auto" px="6">
          <GenericSidebar>
            <GenericLink
              name="Cadastro de Consulta"
              icon={BiCalendarPlus}
              path={`/Recepcao/Consultas`}
            />
            <GenericLink
              name="Alterar Consulta"
              icon={AiFillEdit}
              path={`/Recepcao/Change`}
            />
          </GenericSidebar>
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
