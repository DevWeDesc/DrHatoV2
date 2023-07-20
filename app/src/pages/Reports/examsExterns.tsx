import {
  ChakraProvider,
  Flex,
  SimpleGrid,
  Text,
  Input,
  Select,
  Button,
} from "@chakra-ui/react";
import React from "react";
import { HeaderReports } from "../../components/Reports/HeaderReports";
import { SidebarRecords } from "../../components/Reports/SidebarReports";
import { AdminContainer } from "../AdminDashboard/style";

export function ReportsExamsExtern() {
  return (
    <ChakraProvider>
      <AdminContainer>
        <Flex direction="column" h="100vh">
          <HeaderReports title="Painel de Relatórios" />

          <Flex w="100%" my="6" maxWidth={"100%"} mx="auto" px="6">
            <SidebarRecords />
            <SimpleGrid flex="1" w="100%" align="flex-start" as={Flex}>
              <Flex direction="column" w="100%" h="100%" p="8">
                <Flex direction="column" border="2px solid black">
                  <Text
                    py="5"
                    bg="blue.400"
                    color="white"
                    textAlign="center"
                    fontWeight="bold"
                    fontSize="20"
                    borderBottom="2px solid black"
                  >
                    Relatório de Exames De Clínicas e Veterinários Externos
                  </Text>
                  <Text
                    fontSize="18"
                    px="4"
                    my="4"
                    fontWeight="bold"
                    color="red.600"
                  >
                    Atenção : Neste formulário, é necessário inserir ao menos
                    uma data inicial e uma data final válidos para obter algum
                    retorno.
                  </Text>
                  <Flex
                    borderY="1px solid black"
                    borderTop="2px solid black"
                    alignItems="center"
                  >
                    <Text fontSize="18" px="4" fontWeight="bold" py="4" w="20%">
                      Data Inicial
                    </Text>
                    <Input
                      borderColor="black"
                      rounded="0"
                      height="100%"
                      borderX="2px solid black"
                      borderTop="2px solid black"
                      type="date"
                      fontWeight="bold"
                    />
                  </Flex>
                  <Flex borderY="1px solid black" alignItems="center">
                    <Text fontSize="18" px="4" fontWeight="bold" py="4" w="20%">
                      Data Final
                    </Text>
                    <Input
                      type="date"
                      borderColor="black"
                      rounded="0"
                      borderX="2px solid black"
                      height="100%"
                      fontWeight="bold"
                    />
                  </Flex>

                  <Button
                    colorScheme="facebook"
                    fontWeight="bold"
                    fontSize="20"
                    py="8"
                    rounded="0"
                  >
                    Visualizar
                  </Button>
                </Flex>
              </Flex>
            </SimpleGrid>
          </Flex>
        </Flex>
      </AdminContainer>
    </ChakraProvider>
  );
}
