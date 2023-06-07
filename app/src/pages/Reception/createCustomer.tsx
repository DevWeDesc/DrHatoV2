import {
    Text,
    Flex,
    Box,
    SimpleGrid,
    ChakraProvider,
  } from "@chakra-ui/react";
  import { ReceptionCreateNewConsultForm } from "../../components/Forms/ReceptionCreateNewConsultForm";
  import { ReceptionSidebar } from "../../components/Sidebars/ReceptionBar";
  
  export function CreateCustomer() {
    return (
      <ChakraProvider>
  
        <Flex direction="column" h="100vh">
          <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
            <ReceptionSidebar />
            <SimpleGrid
              flex="1"
              gap="4"
           
              align="flex-start"
              as={Flex}
            >
              <Flex direction="column"  p="2" textAlign="center" bg="gray.100" borderRadius={8} w="100%" overflow="auto">
               
                <ReceptionCreateNewConsultForm />
              </Flex>
            </SimpleGrid>
          </Flex>
        </Flex>
      </ChakraProvider>
    );
  }
  