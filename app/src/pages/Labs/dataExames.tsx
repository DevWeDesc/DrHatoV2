import React from "react";
import {
  Box,
  ChakraProvider,
  Flex,
  Input,
  Text,
  SimpleGrid,
} from "@chakra-ui/react";
import { useContext } from "react";
import { Header } from "../../components/admin/Header";
import { DbContext } from "../../contexts/DbContext";
import { GenericLink } from "../../components/Sidebars/GenericLink";
import { GenericSidebar } from "../../components/Sidebars/GenericSideBar";
import {
  AiOutlineMenu,
  BsArrowLeft,
  IoIosFlask,
  BsImages,
} from "react-icons/all";
import { AdminContainer } from "../AdminDashboard/style";
import { Link } from "react-router-dom";

export function DataExames() {
  const { labData } = useContext(DbContext);
  return (
    <ChakraProvider>
      <AdminContainer>
        <Flex direction="column" h="100vh">
          <Header title="Dados Do Exame" />
          <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
            <GenericSidebar>
              <GenericLink icon={BsArrowLeft} name="Voltar" path="/Home" />
              <GenericLink icon={AiOutlineMenu} name="Menu" path="/Labs" />
              <GenericLink
                icon={IoIosFlask}
                name="Laboratório"
                path="/Labs/Exames"
              />
              <GenericLink
                icon={BsImages}
                name="Laboratório Imagens"
                path="/Labs/Imagens"
              />
            </GenericSidebar>
            <Box flex="1" borderRadius={8} bg="gray.200" p="8">
              <Flex direction={"column"}>
                <Flex alignItems={"center"}>
                  <Text paddingRight={"100px"}>Cliente</Text>
                  <Input borderColor={"black"} w="57vw"></Input>
                </Flex>
                <Flex alignItems={"center"}>
                  <Text paddingRight={"99px"}>Animal</Text>
                  <Input borderColor={"black"} w="57vw"></Input>
                </Flex>
                <Flex alignItems={"center"}>
                  <Text paddingRight={"100px"}>Exame</Text>
                  <Input borderColor={"black"} w="25.1vw"></Input>
                  <Text padding={"7px 50px"} border={"1px solid black"}>
                    Veterinario
                  </Text>
                  <Input borderColor={"black"} w="20vw"></Input>
                </Flex>
                <Flex alignItems={"center"}>
                  <Text paddingRight={"115px"}>Data</Text>
                  <Input borderColor={"black"} w="25vw"></Input>
                  <Text border={"1px solid black"} padding={"7px 70px"}>
                    CRMV
                  </Text>
                  <Input borderColor={"black"} w="20vw"></Input>
                </Flex>
              </Flex>
            </Box>
          </Flex>
        </Flex>
      </AdminContainer>
    </ChakraProvider>
  );
}
