import { AdminContainer } from "./style";
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
import { motion } from "framer-motion";

export function AdminMain() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <ChakraProvider>
        <AdminContainer>
          <Flex direction="column" h="100vh">
            <Header title="Painel Administrativo" url="/Home" />

            <Flex w="100%" my="6" maxWidth={"100%"} mx="auto" px="6">
              <Sidebar />
              <SimpleGrid flex="1" w="100%" align="flex-start" as={Flex}>
                <Flex h="80vh" justify="center" gap="5">
                  <Flex direction="column" w="45%" gap="2">
                    <Link to="/Admin/Autorizations">
                      <Button colorScheme="whatsapp" w="100%" py="10">
                        Cadastro de Autorizações
                      </Button>
                    </Link>
                    <Link to="/Admin/Instructions">
                      <Button colorScheme="whatsapp" w="100%" py="10">
                        Cadastro de Instruções
                      </Button>
                    </Link>

                    <Link to="/Admin/Exams">
                      <Button colorScheme="whatsapp" w="100%" py="10">
                        Cadastro de Exames
                      </Button>
                    </Link>

                    <Link to="/Admin/Procedures">
                      <Button colorScheme="whatsapp" w="100%" py="10">
                        Cadastro de Procedimentos
                      </Button>
                    </Link>
                    <Link to="/Admin/Surgeryes">
                      <Button colorScheme="whatsapp" w="100%" py="10">
                        Cadastro de Cirurgias
                      </Button>
                    </Link>
                  </Flex>

                  <Flex direction="column" w="50%" gap="2">
                    <Link to="/Admin/OptionSistem">
                      <Button colorScheme="whatsapp" w="100%" py="10">
                        Opções do Sistema
                      </Button>
                    </Link>
                    <Link to="/Admin/Hospitalization">
                      <Button colorScheme="whatsapp" w="100%" py="10">
                        Cadastro de Leitos para Internação
                      </Button>
                    </Link>
                    <Link to="/Admin/Sectors">
                      <Button colorScheme="whatsapp" w="100%" py="10">
                        Cadastro de Setores/Grupos
                      </Button>
                    </Link>
                    <Link to="/Admin/SurgeryCenter">
                      <Button colorScheme="whatsapp" w="100%" py="10">
                        Cadastro de Centro Cirúrgico
                      </Button>
                    </Link>
                    <Link to="/Admin/Vaccines">
                      <Button colorScheme="whatsapp" w="100%" py="10">
                        Cadastro de Vacinas
                      </Button>
                    </Link>
                  </Flex>
                </Flex>
              </SimpleGrid>
            </Flex>
          </Flex>
        </AdminContainer>
      </ChakraProvider>
    </motion.div>
  );
}
