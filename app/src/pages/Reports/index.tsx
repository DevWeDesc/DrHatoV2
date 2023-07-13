import { AdminContainer } from "../AdminDashboard/style";
import {
  Box,
  Button,
  ChakraProvider,
  SimpleGrid,
  Text,
  theme,
} from "@chakra-ui/react";
import { Flex } from "@chakra-ui/react";

import { Header } from "../../components/admin/Header";
import { Sidebar } from "../../components/admin/Sidebar";
import { Link } from "react-router-dom";

export function Reports() {
  return (
    <ChakraProvider>
      <AdminContainer>
        <Flex direction="column" h="100vh">
          <Header title="Painel de Relatórios" />

          <Flex w="100%" my="6" maxWidth={"100%"} mx="auto" px="6">
            <Sidebar />
            <SimpleGrid flex="1" w="100%" align="flex-start" as={Flex}>
              <Flex h="80vh" justify="center" gap="5">
                <Flex direction="column" w="45%" gap="2">
                  <Link to="/Admin/Autorizations">
                    <Button colorScheme="whatsapp" w="100%" py="10">
                      Relatórios de Autorizações
                    </Button>
                  </Link>
                  <Link to="/Admin/Instructions">
                    <Button colorScheme="whatsapp" w="100%" py="10">
                      Relatórios de Instruções
                    </Button>
                  </Link>

                  <Link to="/Admin/Exams">
                    <Button colorScheme="whatsapp" w="100%" py="10">
                      Relatórios de Exames
                    </Button>
                  </Link>

                  <Link to="/Admin/Procedures">
                    <Button colorScheme="whatsapp" w="100%" py="10">
                      Relatórios de Procedimentos
                    </Button>
                  </Link>
                </Flex>

                <Flex direction="column" w="50%" gap="2">
                  <Link to="/Admin/Hospitalization">
                    <Button colorScheme="whatsapp" w="100%" py="10">
                      Relatórios de Leitos para Internação
                    </Button>
                  </Link>
                  <Link to="/Admin/Sectors">
                    <Button colorScheme="whatsapp" w="100%" py="10">
                      Relatórios de Setores
                    </Button>
                  </Link>
                  <Link to="/Admin/SurgeryCenter">
                    <Button colorScheme="whatsapp" w="100%" py="10">
                      Relatórios de Centro Cirurgico
                    </Button>
                  </Link>
                  <Link to="/Admin/Vaccines">
                    <Button colorScheme="whatsapp" w="100%" py="10">
                      Relatórios de Vacinas
                    </Button>
                  </Link>
                </Flex>
              </Flex>
            </SimpleGrid>
          </Flex>
        </Flex>
      </AdminContainer>
    </ChakraProvider>
  );
}
