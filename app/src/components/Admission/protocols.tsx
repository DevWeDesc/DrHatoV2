import {
  ChakraProvider,
  Flex,
  Button,
  Input,
  Box,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { BiHome } from "react-icons/bi";
import { TbArrowBack } from "react-icons/tb";
import { useNavigate, useParams } from "react-router-dom";
import { AdminContainer } from "../../pages/AdminDashboard/style";
import { WorkSpaceHeader } from "../../pages/Vets/styles";
import ProceduresAdmissions from "./procedures";

export function ProtocolsAdmission() {
  const [group, setGroup] = useState<string>("");
  const navigate = useNavigate();
  return (
    <ChakraProvider>
      <AdminContainer>
        <Flex direction="column" h="100vh">
          <WorkSpaceHeader>
            <Flex
              justify="space-between"
              align="center"
              width="100%"
              height="100%"
            >
              <Flex align="center" gap="2" justify="space-between">
                <Flex>
                  <Text m="2" fontSize="2xl" fontWeight="bold">
                    Protocolos
                  </Text>
                </Flex>
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
                  onClick={() => navigate(`/Admissions/`)}
                >
                  Voltar
                </Button>
              </Flex>
            </Flex>
          </WorkSpaceHeader>
          <Flex w="100%" mx="auto">
            <Box w="100%" borderRadius={8}>
              <Flex direction="column">
                <Flex direction="column">
                  <Text
                    w="100%"
                    textAlign="center"
                    bg="gray.700"
                    fontWeight="bold"
                    fontSize="4xl"
                    color="white"
                    py="2"
                  >
                    Protocolos
                  </Text>
                  <Flex>
                    <Flex direction="column" w="50%">
                      <Flex
                        border="1px solid black"
                        fontSize="16"
                        bg="blue.400"
                      >
                        <Text
                          border="1px solid black"
                          pl="2"
                          w="100%"
                          fontWeight="bold"
                          fontSize="27"
                          color="white"
                        >
                          Grupos
                        </Text>
                      </Flex>
                      <Flex>
                        <Input
                          w="100%"
                          pl="2"
                          bg="white"
                          fontWeight="bold"
                          fontSize="20"
                          border="1px solid black"
                          rounded="none"
                          value="Cardio"
                          type="button"
                          cursor="pointer"
                          onClick={() => setGroup("Hipertensão")}
                          textAlign="left"
                        />
                        <Button
                          borderY="1px solid black"
                          rounded="0"
                          colorScheme="yellow"
                          onClick={() => navigate(`/Admissions/Protocols/${1}`)}
                        >
                          Editar
                        </Button>
                      </Flex>
                      <Flex>
                        <Input
                          w="100%"
                          pl="2"
                          bg="white"
                          fontWeight="bold"
                          fontSize="20"
                          border="1px solid black"
                          rounded="none"
                          value="Endócrinio"
                          cursor="pointer"
                          onClick={() => setGroup("Cat")}
                          type="button"
                          textAlign="left"
                        />
                        <Button
                          borderY="1px solid black"
                          rounded="0"
                          colorScheme="yellow"
                          onClick={() => navigate(`/Admissions/Protocols/${2}`)}
                        >
                          Editar
                        </Button>
                      </Flex>
                      <Flex>
                        <Input
                          w="100%"
                          pl="2"
                          bg="white"
                          fontWeight="bold"
                          fontSize="20"
                          border="1px solid black"
                          rounded="none"
                          value="Hemanato"
                          cursor="pointer"
                          onClick={() => setGroup("Transfusões")}
                          type="button"
                          textAlign="left"
                        />
                        <Button
                          borderY="1px solid black"
                          rounded="0"
                          colorScheme="yellow"
                          onClick={() => {
                            navigate(`/Admissions/Protocols/${3}`);
                          }}
                        >
                          Editar
                        </Button>
                      </Flex>
                    </Flex>

                    <Flex w="50%" direction="column">
                      <Flex border="1px solid black" fontSize="16">
                        <Text
                          border="1px solid black"
                          pl="2"
                          w="100%"
                          bg="blue.400"
                          fontWeight="bold"
                          fontSize="27"
                          color="white"
                        >
                          Protocolos
                        </Text>
                      </Flex>
                      <Flex>
                        <Input
                          w="100%"
                          pl="2"
                          bg="white"
                          fontWeight="bold"
                          fontSize="20"
                          border="1px solid black"
                          rounded="none"
                          value={group}
                          type="button"
                          cursor="pointer"
                          textAlign="left"
                        />
                      </Flex>
                      <Flex>
                        <Input
                          w="100%"
                          pl="2"
                          bg="white"
                          fontWeight="bold"
                          fontSize="20"
                          border="1px solid black"
                          rounded="none"
                          cursor="pointer"
                          value=""
                          type="button"
                          textAlign="left"
                          _active={{
                            bg: "#dddfe2",
                            transform: "scale(0.98)",
                            borderColor: "#bec3c9",
                          }}
                        />
                      </Flex>
                      <Flex>
                        <Input
                          w="100%"
                          pl="2"
                          bg="white"
                          fontWeight="bold"
                          fontSize="20"
                          border="1px solid black"
                          rounded="none"
                          cursor="pointer"
                          value=""
                          type="button"
                          textAlign="left"
                        />
                      </Flex>
                    </Flex>
                  </Flex>
                </Flex>
              </Flex>
            </Box>
          </Flex>
        </Flex>
      </AdminContainer>
    </ChakraProvider>
  );
}
