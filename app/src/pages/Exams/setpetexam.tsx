import { useState, useEffect } from "react";
import {
  ChakraProvider,
  Flex,
  Box,
  Text,
  Input,
  Button,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { GenericSidebar } from "../../components/Sidebars/GenericSideBar";
import { GenericLink } from "../../components/Sidebars/GenericLink";
import {
  BsArrowLeft,
  AiOutlineMenu,
  IoIosFlask,
  BsImages,
} from "react-icons/all";
import { Header } from "../../components/admin/Header";
import { api } from "../../lib/axios";
import FileUpload from "../../components/FileUpload";

export function SetPetExam() {
  const { id, petId } = useParams<{ id: string, petId: string }>();
  const [pet, setPet] = useState({} as any);
  async function Pets() {
    let pets = await api.get(`/labpetexam/${id}/${petId}`);
    setPet(pets.data);
  }
  useEffect(() => {
    Pets();
  }, []);

  return (
    <ChakraProvider>
      <Flex direction="column" h="100vh">
        <Header title="Tabela de Laboratórios" url="/Labs/Exames" />
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
            height="auto"
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
                    <Flex  align="center" m="4" w="100%" justify="space-between">
                      <Text fontSize="3xl">
                        <strong>Dados do Exame</strong>
                      </Text>
                      <Flex   w="600px" wrap="wrap" height="120px" m="2" gap="2" >
                        <Button colorScheme="whatsapp">Tabela Hemograma Completo </Button>
                        <Button colorScheme="whatsapp">Tabela Biquimico </Button>
                        <Button colorScheme="whatsapp">Hemograma Canino </Button>
                        <Button colorScheme="whatsapp">Hemograma Felino </Button>
                        <Button colorScheme="whatsapp"> Laudo Livre com Texto </Button>
                      </Flex>
                      <FileUpload examId={`${id}`} />
                    </Flex>
                   
                  </Flex>
                  <Flex
                    direction={"column"}
                    w="94.5%"
                    border={"1px solid black"}
                  >
                
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
                              defaultValue={pet?.customer?.name}
                             
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
                              defaultValue={pet.name}
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
          </Box>
        </Flex>
      </Flex>
    </ChakraProvider>
  );
}
