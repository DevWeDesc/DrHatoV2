import { useState, useContext, useEffect } from "react";
import {
  ChakraProvider,
  Flex,
  Box,
  Button,
  Text,
  Table,
  Tr,
  Td,
  Thead,
  Tbody,
  Input,
} from "@chakra-ui/react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { GenericSidebar } from "../../components/Sidebars/GenericSideBar";
import { GenericLink } from "../../components/Sidebars/GenericLink";
import {
  BsArrowLeft,
  AiOutlineMenu,
  IoIosFlask,
  BsImages,
} from "react-icons/all";
import { HemoTable } from "../../components/ProceduresTable/HemoTable";
import { Header } from "../../components/admin/Header";
import { api } from "../../lib/axios";

export function SetPetExam() {
  const { id } = useParams<{ id: string }>();
  const [option, setOption] = useState<null | object>([]);
  const [pet, setPet] = useState([]);
  const [petFilter, setPetFilter] = useState([]);

  useEffect(() => {
    async function Pets() {
      let pets = await api.get("http://localhost:5000/labs");
      setPet(pets.data);
    }
    Pets();
  }, []);

  useEffect(() => {
    const petFiltered = pet.filter((pet: any) => pet.id == id);
    setPetFilter(petFiltered);
  }, [petFilter]);

  //console.log(petFilter);

  return (
    <ChakraProvider>
      <Flex direction="column" h="100vh">
        <Header title="Tabela de Laboratórios" />
        <Flex w="100%" my="6" mx="auto" px="6">
          <GenericSidebar>
            <GenericLink icon={BsArrowLeft} name="Voltar" path="/Labs/Exames" />
            <GenericLink icon={AiOutlineMenu} name="Menu" path="/Home" />
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
            height={option != null ? "auto" : "55vh"}
            w="88%"
            borderRadius={8}
            bg="gray.200"
            p="8"
          >
            <Flex direction="column" align="center" mb="16">
              <Flex w="100%">
                <Box
                  flex="1"
                  display={"flex"}
                  flexDirection={"column"}
                  alignItems={"center"}
                  borderRadius={8}
                  bg="gray.200"
                  mb="10"
                >
                  <Flex
                    w={"100%"}
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
                  <Flex
                    direction={"column"}
                    w="94.5%"
                    border={"1px solid black"}
                  >
                    {petFilter.map((pet: any) => {
                      return (
                        <>
                          <Flex
                            alignItems={"center"}
                            borderBottom={"1px solid black"}
                          >
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
                              w="100%"
                              value={pet.id}
                            ></Input>
                          </Flex>
                          <Flex
                            alignItems={"center"}
                            borderBottom={"1px solid black"}
                          >
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
                              value={pet.medicine.pet.name}
                              w="100%"
                            ></Input>
                          </Flex>
                          <Flex
                            alignItems={"center"}
                            borderBottom={"1px solid black"}
                          >
                            <Text
                              paddingRight={"97px"}
                              paddingLeft={"5px"}
                              paddingTop={"7px"}
                              paddingBottom={"7px"}
                              backgroundColor={"gray.300"}
                            >
                              <strong> Exame</strong>
                            </Text>
                            <Input
                              bgColor="white"
                              borderBottom={"0"}
                              borderRadius={"0"}
                              borderColor={"black"}
                              value={pet.name}
                              w="50%"
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
                              value="Não definido"
                              w="30%"
                            ></Input>
                          </Flex>
                          <Flex
                            alignItems={"center"}
                            borderBottom={"1px solid black"}
                            h="41px"
                          >
                            <Text
                              paddingRight={"112px"}
                              paddingLeft={"5px"}
                              paddingTop={"7px"}
                              paddingBottom={"7px"}
                              backgroundColor={"gray.300"}
                            >
                              <strong> Data</strong>
                            </Text>
                            <Input
                              bgColor="white"
                              borderRadius={"0"}
                              borderColor={"black"}
                              w="50%"
                              value={pet.requesteData}
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
                              value="Não definido"
                              w="30%"
                            ></Input>
                          </Flex>
                        </>
                      );
                    })}
                  </Flex>
                  {/*<Button
                    marginTop={"20px"}
                    width={"28%"}
                    colorScheme="whatsapp"
                  >
                    Gravar
  </Button>*/}
                </Box>
              </Flex>
            </Flex>
            <HemoTable Option={petFilter} CloseOption={() => setOption(null)} />
          </Box>
        </Flex>
      </Flex>
    </ChakraProvider>
  );
}
