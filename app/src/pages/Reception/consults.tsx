import {
    Text,
    Flex,
    Box,
    SimpleGrid,
    ChakraProvider,
  } from "@chakra-ui/react";
  import { ReceptionCreateNewConsultForm } from "../../components/Forms/ReceptionCreateNewConsultForm";
  import { SearchConsultForm } from "../../components/Forms/SearchConsultForm";
  import { ReceptionSidebar } from "../../components/Sidebars/ReceptionBar";
  
  export function ReceptionConsults() {
    return (
      <ChakraProvider>
  
        <Flex direction="column" h="100vh">
          <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
            <ReceptionSidebar />
            <SimpleGrid
              flex="1"
              gap="4"
              minChildWidth="320px"
              align="flex-start"
              as={Flex}
            >
              <Box textAlign="center" p="8" bg="gray.100" borderRadius={8}>
                <Text fontSize="lg" mb="4">
                  Consultar Cliente
                </Text>
                <SearchConsultForm />
              </Box>
            </SimpleGrid>
          </Flex>
        </Flex>
      </ChakraProvider>
    );
  }
  