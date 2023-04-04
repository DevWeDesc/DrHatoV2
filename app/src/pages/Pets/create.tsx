import {
  Flex,
  Box,
  SimpleGrid,
  ChakraProvider,
} from "@chakra-ui/react";

import { BiLeftArrowAlt  } from 'react-icons/all'
import { CreatePetsForm } from "../../components/Forms/CreatePetsForm";
import { GenericLink } from "../../components/Sidebars/GenericLink";
import { GenericSidebar } from "../../components/Sidebars/GenericSideBar";

export function CreatePets() {
  return (
    <ChakraProvider>
      <Flex direction="column" h="100vh">
        <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
         <GenericSidebar>
          <GenericLink name="Voltar" path="/Home/Recepcao/Consultas/Clientes/1" icon={BiLeftArrowAlt} />
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
