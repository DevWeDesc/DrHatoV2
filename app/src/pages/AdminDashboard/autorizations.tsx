import { AdminContainer } from "./style";
import {
  Box,
  Button,
  ChakraProvider,
  SimpleGrid,
  Text,
  UnorderedList,
  ListItem,
} from "@chakra-ui/react";
import { Flex } from "@chakra-ui/react";

import { Header } from "../../components/admin/Header";
import { Sidebar } from "../../components/admin/Sidebar";
import { useState } from "react";
import { GenericModal } from "../../components/Modal/GenericModal";

export function Autorizations() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  function openModal() {
    setIsModalOpen(true);
  }
  function closeModal() {
    setIsModalOpen(false);
  }

  return (
    <ChakraProvider>
      <AdminContainer>
        <Flex direction="column" h="100vh">
          <Header title="Painel de Autorizações" />

          <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
            <Sidebar />

            <SimpleGrid
              flex="1"
              gap="4"
              minChildWidth="320px"
              align="flex-start"
              as={Flex}
            >
              <Flex direction="column" gap="4">
                <Box flex="1" borderRadius={8} bg="gray.200" p="8" m="4">
                  <Flex
                    direction={"column"}
                    m="4"
                    justify="center"
                    align="center"
                  >
                    <Button onClick={() => openModal()} colorScheme="whatsapp">
                      Cadastrar Autorização
                    </Button>
                

                    <Text fontSize="bold" m="4">
                      Nome
                    </Text>
                    <UnorderedList>
                      <ListItem>Alta condicional</ListItem>
                      <ListItem>Atestado de óbito</ListItem>
                      <ListItem>Atestado de saúde</ListItem>
                      
                    </UnorderedList>
                    <GenericModal
                      isOpen={isModalOpen}
                      onRequestClose={closeModal}
                    >
                      <Text color="black">Cadastrar novo medicamento</Text>
                    </GenericModal>
                  </Flex>
                </Box>
              </Flex>
            </SimpleGrid>
          </Flex>
        </Flex>
      </AdminContainer>
    </ChakraProvider>
  );
}
