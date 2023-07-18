import { Text } from "@chakra-ui/layout";
import { BiHome } from "react-icons/bi";
import { CgAdd } from "react-icons/cg";
import { TbArrowBack } from "react-icons/tb";
import { ListIcon } from "@chakra-ui/layout";
import { useNavigate, useParams } from "react-router";
import React, { useEffect, useState } from "react";
import { Surgierslist } from "../../components/surgeries/surgierslist";
import { Createsurgeries } from "../../components/surgeries/createsurgeries";
import { ChakraProvider, Flex, Button } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import { Textarea } from "@chakra-ui/react";
import { Checkbox } from "@chakra-ui/react";
import { api } from "../../lib/axios";
import { motion } from "framer-motion";

export default function SurgeriesDetails() {
  const [surgeriesDetails, setSurgeriesDetails] = useState([]);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  async function getSurgeriesDetails() {
    const totalSurgeries = await api.get("http://localhost:5000/pets/queue");
    setSurgeriesDetails(totalSurgeries.data.response);
  }

  useEffect(() => {
    getSurgeriesDetails();
  }, []);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <ChakraProvider>
        <Flex width="100vw" height="100vh" bgColor="white" direction="column">
          <Flex w="100%" height="15vh" bgColor="gray.200">
            <Flex
              align="center"
              gap="2"
              justify="space-between"
              w="100%"
              px="5"
            >
              <Flex>
                <Text fontSize="2xl" fontWeight="bold">
                  Cirurgias
                </Text>
              </Flex>
              <Flex gap="2">
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
                  onClick={() => navigate(`/Surgeries/`)}
                >
                  Voltar
                </Button>
              </Flex>
            </Flex>
          </Flex>
          <Flex width="100%" height="90vh" direction="column">
            <Flex color="black" bg="gray.700" direction="column" w="100vw">
              <Text
                fontSize="2xl"
                border="1px solid black"
                fontWeight="bold"
                color="white"
                pl="2"
                py="4"
              >
                {" "}
                Laudo de Cirurgia
              </Text>
              {surgeriesDetails.map((surgeries: any) => (
                <>
                  {surgeries.id == id && (
                    <React.Fragment key={surgeries.id}>
                      <Flex
                        bg="gray.200"
                        border="1px solid black"
                        fontSize="20"
                        direction="column"
                        fontWeight="bold"
                      >
                        <Flex>
                          <Text
                            color="black"
                            border="1px solid black"
                            pl="2"
                            py="1"
                            w="12vw"
                          >
                            Pet
                          </Text>
                          <Input
                            value={surgeries.name}
                            borderColor="black"
                            rounded="0"
                            bg="white"
                            py="6"
                          />
                        </Flex>
                        <Flex>
                          <Text
                            color="black"
                            border="1px solid black"
                            pl="2"
                            py="1"
                            w="12vw"
                          >
                            Cliente
                          </Text>
                          <Input
                            value={surgeries.customerName}
                            borderColor="black"
                            rounded="0"
                            bg="white"
                            py="6"
                          />
                        </Flex>
                        <Flex>
                          <Text
                            color="black"
                            border="1px solid black"
                            pl="2"
                            py="1"
                            w="11.7vw"
                          >
                            Laudado Por
                          </Text>
                          <Input
                            borderColor="black"
                            rounded="0"
                            bg="white"
                            w="87.5vw"
                            py="6"
                          />
                          <Flex
                            justify="center"
                            w="10vw"
                            bg="gray.200"
                            border="1px solid black"
                          >
                            <Checkbox
                              colorScheme="green"
                              size="lg"
                              py="2"
                              fontSize="20"
                              borderColor="black"
                            >
                              Concluida
                            </Checkbox>
                          </Flex>
                        </Flex>
                      </Flex>
                    </React.Fragment>
                  )}
                </>
              ))}
            </Flex>
            <Flex
              direction="column"
              bg="gray.700"
              w="100vw"
              border="1px solid black"
            >
              <Text
                fontSize="2xl"
                fontWeight="bold"
                color="white"
                pl="2"
                py="4"
              >
                Laudo
              </Text>
              <Flex
                bg="gray.200"
                border="1px solid black"
                fontSize="20"
                h="36.6vh"
              >
                <Textarea
                  rounded="0"
                  h="100%"
                  value="Ainda não há um laudo pré cadastrado para este tipo de cirurgia"
                  bg="white"
                />
              </Flex>
            </Flex>
            <Button py="10" fontSize="20" colorScheme="whatsapp">
              Gravar Cirurgia
            </Button>
          </Flex>
        </Flex>
      </ChakraProvider>
    </motion.div>
  );
}
