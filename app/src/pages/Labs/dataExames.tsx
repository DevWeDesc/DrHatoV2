import React from "react";
import {
  Box,
  ChakraProvider,
  Flex,
  Input,
  Text,
  Button,
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
            <Box
              flex="1"
              display={"flex"}
              flexDirection={"column"}
              alignItems={"end"}
              borderRadius={8}
              bg="gray.200"
              p="8"
            >
              <Flex
                w={"96.5%"}
                alignItems={"center"}
                justifyContent={"space-between"}
                marginBottom={"10px"}
              >
                <Box>
                  <Text fontSize="3xl">
                    <strong>Dados do Exame</strong>
                  </Text>
                </Box>
                <Button
                  colorScheme="twitter"
                  padding={"20px 0px"}
                  width={"30%"}
                >
                  Laudar com PDF
                </Button>
              </Flex>
              <Flex direction={"column"} border={"1px solid black"}>
                <Flex alignItems={"center"} borderBottom={"1px solid black"}>
                  <Text
                    paddingRight={"93.5px"}
                    paddingLeft={"5px"}
                    paddingTop={"8px"}
                    paddingBottom={"8px"}
                    backgroundColor={"gray.300"}
                  >
                    <strong> Cliente</strong>
                  </Text>
                  <Input
                    borderRadius={"0"}
                    borderColor={"black"}
                    bgColor="white"
                    w="55.15rem"
                  ></Input>
                </Flex>
                <Flex alignItems={"center"} borderBottom={"1px solid black"}>
                  <Text
                    paddingRight={"93px"}
                    paddingLeft={"5px"}
                    paddingTop={"8px"}
                    paddingBottom={"8px"}
                    backgroundColor={"gray.300"}
                  >
                    <strong> Animal</strong>
                  </Text>
                  <Input
                    bgColor="white"
                    borderBottom={"0"}
                    borderRadius={"0"}
                    borderColor={"black"}
                    w="55.16rem"
                  ></Input>
                </Flex>
                <Flex alignItems={"center"} borderBottom={"1px solid black"}>
                  <Text
                    paddingRight={"97px"}
                    paddingLeft={"5px"}
                    paddingTop={"8px"}
                    paddingBottom={"8px"}
                    backgroundColor={"gray.300"}
                  >
                    <strong> Exame</strong>
                  </Text>
                  <Input
                    bgColor="white"
                    borderBottom={"0"}
                    borderRadius={"0"}
                    borderColor={"black"}
                    w="30rem"
                  ></Input>
                  <Text
                    padding={"7px 51px"}
                    border={"1px solid black"}
                    backgroundColor={"red.200"}
                  >
                    <strong> Veterinario</strong>
                  </Text>
                  <Input
                    bgColor="white"
                    borderBottom={"0"}
                    borderRadius={"0"}
                    borderColor={"black"}
                    w="13rem"
                  ></Input>
                </Flex>
                <Flex alignItems={"center"} borderBottom={"1px solid black"}>
                  <Text
                    paddingRight={"112px"}
                    paddingLeft={"5px"}
                    paddingTop={"8px"}
                    paddingBottom={"8px"}
                    backgroundColor={"gray.300"}
                  >
                    <strong> Data</strong>
                  </Text>
                  <Input
                    bgColor="white"
                    borderRadius={"0"}
                    borderColor={"black"}
                    w="30rem"
                  ></Input>
                  <Text
                    border={"1px solid black"}
                    padding={"7px 73px"}
                    backgroundColor={"gray.300"}
                  >
                    <strong> CRMV</strong>
                  </Text>
                  <Input
                    bgColor="white"
                    borderRadius={"0"}
                    borderColor={"black"}
                    w="13rem"
                  ></Input>
                </Flex>
              </Flex>
              <Button marginTop={"20px"} width={"28%"} colorScheme="whatsapp">
                Gravar
              </Button>
            </Box>
          </Flex>
        </Flex>
      </AdminContainer>
    </ChakraProvider>
  );
}
