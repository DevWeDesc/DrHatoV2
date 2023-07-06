import {
  Box,
  ChakraProvider,
  Flex,
  Text,
  Input,
  Button,
  Radio,
  RadioGroup,
  Stack,
  background,
} from "@chakra-ui/react";

//import { Header } from "../admin/Header";
//import { GenericLink } from "../Sidebars/GenericLink";
//import { GenericSidebar } from "../Sidebars/GenericSideBar";

import { BiHome, MdPets, TbArrowBack } from "react-icons/all";
import { AdminContainer } from "../../../pages/AdminDashboard/style";
import { WorkSpaceHeader } from "../../../pages/Vets/styles";
import { useNavigate, useParams } from "react-router";
import { useState } from "react";

export default function DetailsAdmissions() {
  const [admissiondiary, setAdmissionDiary] = useState<number | any>(0);
  const { id } = useParams();
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
              <Flex align="center" gap="2">
                <Text m="2" fontSize="2xl" fontWeight="bold">
                  Painel de Internação
                </Text>
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
                  onClick={() => navigate("/Admissions/")}
                >
                  Voltar
                </Button>
              </Flex>

              <Flex flexWrap="wrap" justify="start" gap="2" m="4" p="2">
                <Button
                  //onClick={() => openModal()}
                  height={8}
                  colorScheme="whatsapp"
                >
                  Procedimentos
                </Button>
                <Button
                  height={8}
                  colorScheme="whatsapp"
                  //onClick={() => navigate(`/WorkSpace/Instructions/${id}`)}
                >
                  Vacinas
                </Button>
                <Button
                  height={8}
                  colorScheme="whatsapp"
                  //onClick={() => openAutorizationModal()}
                >
                  Exames
                </Button>
                <Button
                  height={8}
                  colorScheme="whatsapp"
                  onClick={() => navigate(`/Admissions/Surgeries/${id}`)}
                >
                  Cirurgias
                </Button>
              </Flex>
            </Flex>
          </WorkSpaceHeader>
          <Flex w="100%" mx="auto">
            <Box w="100%" borderRadius={8}>
              <Flex w="100%" direction="column">
                <Text
                  textAlign="center"
                  bg="gray.900"
                  fontWeight="bold"
                  fontSize="4xl"
                  color="white"
                  py="2"
                >
                  Internação
                </Text>
                <Flex border="1px solid black">
                  <Text
                    w="50rem"
                    pl="2"
                    bg="gray.200"
                    fontWeight="bold"
                    fontSize="20"
                  >
                    Cliente
                  </Text>
                  <Input borderY="0" borderColor="black" rounded="0" />
                  <Text
                    w="50rem"
                    fontWeight="bold"
                    pl="2"
                    bg="gray.200"
                    fontSize="20"
                  >
                    Canil
                  </Text>
                  <Input borderColor="black" rounded="0" borderY="0" />
                </Flex>
                <Flex border="1px solid black">
                  <Text
                    w="50rem"
                    pl="2"
                    bg="gray.200"
                    fontWeight="bold"
                    fontSize="20"
                  >
                    Pet
                  </Text>
                  <Input borderY="0" borderColor="black" rounded="0" />
                  <Text
                    w="50rem"
                    fontWeight="bold"
                    pl="2"
                    bg="gray.200"
                    fontSize="20"
                  >
                    Data de internação
                  </Text>
                  <Input borderColor="black" rounded="0" borderY="0" />
                </Flex>
                <Flex border="1px solid black">
                  <Text
                    w="50rem"
                    pl="2"
                    bg="gray.200"
                    fontWeight="bold"
                    fontSize="20"
                  >
                    Animal
                  </Text>
                  <Input borderY="0" borderColor="black" rounded="0" />
                  <Text
                    w="50rem"
                    fontWeight="bold"
                    pl="2"
                    bg="gray.200"
                    fontSize="20"
                  >
                    Veterinario
                  </Text>
                  <Input borderColor="black" rounded="0" borderY="0" />
                </Flex>
                <Flex border="1px solid black">
                  <Text
                    w="50rem"
                    pl="2"
                    bg="gray.200"
                    fontWeight="bold"
                    fontSize="20"
                  >
                    Cliente
                  </Text>
                  <Input borderY="0" borderColor="black" rounded="0" />
                  <Text
                    w="50rem"
                    fontWeight="bold"
                    pl="2"
                    bg="gray.200"
                    fontSize="20"
                  >
                    Canil
                  </Text>
                  <Input borderColor="black" rounded="0" borderY="0" />
                </Flex>
                <RadioGroup h="40px">
                  <Stack direction="row" borderBottom="1px solid black">
                    <Text
                      w="16.2rem"
                      fontWeight="bold"
                      pl="2"
                      bg="gray.200"
                      fontSize="20"
                      height="40px"
                      border="1px solid black"
                    >
                      Jejum
                    </Text>
                    <Radio value="Sim">Sim</Radio>
                    <Radio value="Não">Não</Radio>
                  </Stack>
                </RadioGroup>
                <Button
                  bg="blue.400"
                  color="white"
                  py="8"
                  mb="1"
                  fontSize="20"
                  fontWeight="bold"
                  boxShadow="0px 4px 5px rgba(0, 0, 0, 0.6)"
                  _hover={{
                    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.5)",
                    backgroundColor: "blue.500",
                  }}
                  _active={{ boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.5)" }}
                  onClick={() => {
                    console.log(admissiondiary);
                    setAdmissionDiary(admissiondiary + 1);
                  }}
                >
                  {" "}
                  Internação Diaria
                </Button>

                <Flex>
                  {admissiondiary === 0 && (
                    <Box w="100%">
                      <Flex direction="column" w="100">
                        <Text
                          fontSize="20"
                          bg="yellow.300"
                          w="100%"
                          textAlign="center"
                          py={2}
                          fontWeight="bold"
                        >
                          Ainda não foi inserido nenhum item diario sobre
                          internação
                        </Text>
                        <Text
                          fontSize="20"
                          bg="yellow.300"
                          w="100%"
                          textAlign="center"
                          py={2}
                          fontWeight="bold"
                        >
                          Tempo Restante até o final da diaría : 20 Horas e 49
                          minutos
                        </Text>
                        <Button
                          py="8"
                          bg="whatsapp.500"
                          fontSize="20"
                          fontWeight="bold"
                          color="white"
                          boxShadow="0px 4px 5px rgba(0, 0, 0, 0.6)"
                          _hover={{
                            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.5)",
                            backgroundColor: "whatsapp.600",
                          }}
                          _active={{
                            boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.2)",
                          }}
                        >
                          Encerrar Diárias
                        </Button>
                      </Flex>
                    </Box>
                  )}
                  {admissiondiary > 0 && (
                    <Flex direction="column">
                      <Flex>
                        <Text
                          w="12vw"
                          fontWeight="bold"
                          pl="2"
                          bg="blue.100"
                          fontSize="20"
                          height="40px"
                          border="1px solid black"
                        >
                          Data
                        </Text>
                        <Text
                          w="8vw"
                          fontWeight="bold"
                          pl="2"
                          bg="blue.100"
                          fontSize="20"
                          height="40px"
                          border="1px solid black"
                        >
                          Hora
                        </Text>
                        <Text
                          w="25vw"
                          fontWeight="bold"
                          pl="2"
                          bg="blue.100"
                          fontSize="20"
                          height="40px"
                          border="1px solid black"
                        >
                          Usuário
                        </Text>
                        <Text
                          w="9vw"
                          fontWeight="bold"
                          pl="2"
                          bg="blue.100"
                          fontSize="20"
                          height="40px"
                          border="1px solid black"
                        >
                          Quantidade
                        </Text>
                        <Text
                          w="19vw"
                          fontWeight="bold"
                          pl="2"
                          bg="blue.100"
                          fontSize="20"
                          height="40px"
                          border="1px solid black"
                        >
                          Ação
                        </Text>
                        <Text
                          w="12vw"
                          fontWeight="bold"
                          pl="2"
                          bg="blue.100"
                          fontSize="20"
                          height="40px"
                          border="1px solid black"
                        >
                          Unitário
                        </Text>
                        <Text
                          w="15vw"
                          fontWeight="bold"
                          pl="2"
                          bg="blue.100"
                          fontSize="20"
                          height="40px"
                          border="1px solid black"
                        >
                          Total
                        </Text>
                      </Flex>
                      <Flex>
                        <Input
                          type="date"
                          w="12vw"
                          fontWeight="bold"
                          pl="2"
                          bg="white"
                          fontSize="19"
                          height="40px"
                          border="1px solid black"
                          rounded="0"
                        />
                        <Input
                          type="time"
                          w="8vw"
                          fontWeight="bold"
                          pl="2"
                          bg="white"
                          fontSize="19"
                          height="40px"
                          border="1px solid black"
                          rounded="0"
                        />
                        <Input
                          w="25vw"
                          fontWeight="bold"
                          pl="2"
                          bg="white"
                          fontSize="19"
                          height="40px"
                          border="1px solid black"
                          rounded="0"
                        />
                        <Input
                          w="9vw"
                          fontWeight="bold"
                          pl="2"
                          bg="white"
                          fontSize="19"
                          height="40px"
                          border="1px solid black"
                          rounded="0"
                        />
                        <Input
                          w="19vw"
                          fontWeight="bold"
                          pl="2"
                          bg="white"
                          fontSize="19"
                          height="40px"
                          border="1px solid black"
                          rounded="0"
                        />
                        <Input
                          w="12vw"
                          fontWeight="bold"
                          pl="2"
                          bg="white"
                          fontSize="19"
                          height="40px"
                          border="1px solid black"
                          rounded="0"
                        />
                        <Input
                          w="15vw"
                          fontWeight="bold"
                          pl="2"
                          bg="white"
                          fontSize="19"
                          height="40px"
                          border="1px solid black"
                          rounded="0"
                        />
                      </Flex>
                      <Flex align="center" borderY="1px solid black">
                        <Text w="60vw"></Text>
                        <Text w="25vw" fontWeight="bold">
                          Valor total em procedimentos até o momento
                        </Text>
                        <Input
                          borderY="none"
                          w="15vw"
                          borderColor="black"
                          rounded={0}
                        ></Input>
                      </Flex>
                      <Flex align="center" borderY="1px solid black">
                        <Text w="70vw"></Text>
                        <Text w="15vw" fontWeight="bold">
                          Diaria(S) até o momento
                        </Text>
                        <Input
                          borderY={0}
                          w="15vw"
                          borderColor="black"
                          rounded={0}
                        ></Input>
                      </Flex>
                      <Flex align="center" borderY="1px solid black">
                        <Text w="82vw"></Text>
                        <Text w="3vw" fontWeight="bold">
                          Total
                        </Text>
                        <Input
                          borderY={0}
                          w="15vw"
                          borderColor="black"
                          rounded={0}
                        ></Input>
                      </Flex>
                      <Text
                        fontSize="20"
                        bg="yellow.300"
                        w="100%"
                        textAlign="center"
                        py={2}
                        fontWeight="bold"
                      >
                        Tempo Restante até o final da meia diaría: 8 Horas e 49
                        minutos
                      </Text>
                      <Text
                        fontSize="20"
                        bg="yellow.300"
                        w="100%"
                        textAlign="center"
                        py={2}
                        fontWeight="bold"
                      >
                        Tempo Restante até o final da diaría : 20 Horas e 49
                        minutos
                      </Text>
                      <Button
                        py="8"
                        bg="whatsapp.500"
                        fontSize="20"
                        fontWeight="bold"
                        color="white"
                        boxShadow="0px 4px 5px rgba(0, 0, 0, 0.6)"
                        _hover={{
                          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.5)",
                          backgroundColor: "whatsapp.600",
                        }}
                        _active={{
                          boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.2)",
                        }}
                        onClick={() => setAdmissionDiary(0)}
                      >
                        Encerrar Diárias
                      </Button>
                    </Flex>
                  )}
                </Flex>
              </Flex>
            </Box>
          </Flex>
        </Flex>
      </AdminContainer>
    </ChakraProvider>
  );
}