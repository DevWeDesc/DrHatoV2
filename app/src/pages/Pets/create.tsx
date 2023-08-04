import { Flex, Box, SimpleGrid, ChakraProvider } from "@chakra-ui/react";

import { BiLeftArrowAlt } from "react-icons/all";
import { useParams } from "react-router-dom";
import { Header } from "../../components/admin/Header";
import { CreatePetsForm } from "../../components/Forms/CreatePetsForm";
import { GenericLink } from "../../components/Sidebars/GenericLink";
import { GenericSidebar } from "../../components/Sidebars/GenericSideBar";

export function CreatePets() {
  const { id } = useParams<{ id: string }>();
  return (
    <ChakraProvider>
      <Flex direction="column" h="100vh">
        <Header
          title="Cadastro de Pets"
          url={`/Recepcao/Consultas/Clientes/${id}`}
        />
        <Flex w="100%" my="6" maxWidth={1680} mx="auto" px="6">
          <GenericSidebar>
            <GenericLink
              name="Voltar"
              path={`/Recepcao/Consultas/Clientes/${id}`}
              icon={BiLeftArrowAlt}
            />
          </GenericSidebar>
          <SimpleGrid
            flex="1"
            gap="4"
            minChildWidth="320px"
            align="flex-start"
            as={Flex}
          >
            <Box textAlign="center" p="8" bg="gray.100" borderRadius={8}>
              <Flex mt="8" justify="center" direction="column">
                <CreatePetsForm />
              </Flex>
            </Box>
          </SimpleGrid>
        </Flex>
      </Flex>
    </ChakraProvider>
  );
}
