import { Button } from "@chakra-ui/button";
import { Flex } from "@chakra-ui/layout";
import { ChakraProvider } from "@chakra-ui/react";
import { Text } from "@chakra-ui/layout";
import React from "react";
import { BiHome } from "react-icons/bi";
import { TbArrowBack } from "react-icons/tb";
import { useNavigate, useParams } from "react-router";
import { Createsurgeries } from "../surgeries/createsurgeries";

export function SurgeriesAdmission() {
  const { id } = useParams();
  const navigate = useNavigate();
  return (
    <ChakraProvider>
      <Flex width="100vw" height="100vh" bgColor="white" direction="column">
        <Flex w="100%" height="10vh" bgColor="gray.200">
          <Flex w="100%" align="center" gap="2" justify="space-between">
            <Flex>
              <Text m="2" fontSize="2xl" fontWeight="bold">
                Cirurgias
              </Text>
            </Flex>
            <Flex gap="2" m="2">
              <Button
                colorScheme="teal"
                leftIcon={<BiHome size={24} />}
                onClick={() => navigate("/Home")}
              >
                Home
              </Button>

              <Button
                colorScheme="yellow"
                leftIcon={<TbArrowBack size={24} />}
                onClick={() => navigate(`/Admissions/${id}`)}
              >
                Voltar
              </Button>
            </Flex>
          </Flex>
        </Flex>
        <Createsurgeries />
      </Flex>
    </ChakraProvider>
  );
}
