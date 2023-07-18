import {
  Flex,
  Box,
  SimpleGrid,
  ChakraProvider,
  Table,
  Thead,
  Tbody,
  Td,
  Th,
  Tr,
  Text,
  Button,
} from "@chakra-ui/react";
import { GenericLink } from "../../components/Sidebars/GenericLink";
import { GenericSidebar } from "../../components/Sidebars/GenericSideBar";
import { BiHome, BiLeftArrowAlt, TbArrowBack } from "react-icons/all";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { api } from "../../lib/axios";
import { MedicineContainer } from "./style";
import { PetDetaisl } from "../../interfaces";

interface Customer {
  id: string | number;
  name: string;
}

interface PetProps {
  id: number;
  name: string;
  especie: string;
  corPet: string;
  observations: string;
  race: string;
  rga: number;
  sizePet: string;
  weigth: string;
  sexo: string;
  status: string;
  bornDate: string;
  customerName: string;
  codPet: string;
}

export function MedicineRecords() {
  const { id } = useParams<{ id: string }>();
  const [pets, setPets] = useState({} as PetDetaisl);
  const navigate = useNavigate();

  async function getPet() {
    try {
      const response = await api.get(`/pets/${id}`);
      setPets(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getPet();
  }, []);

  return (
    <ChakraProvider>
      <Flex direction="column" h="100vh" w="100vw">
        <Flex w="100%" height="10vh" bgColor="gray.200">
          <Flex align="center" gap="2">
            <Text m="2" fontSize="2xl" fontWeight="bold">
              Prontuário
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
              onClick={() => navigate(`/Vets/Workspace/${id}`)}
            >
              Voltar
            </Button>
          </Flex>
        </Flex>

        <MedicineContainer>
          <Flex
            direction="column"
            shadow="4px 0px 10px -2px rgba(0, 0, 0, 0.2)"
            zIndex="1"
            w="30%"
          >
            <Flex
              w="100%"
              h="30%"
              direction="row"
              justify="space-evenly"
              rounded={4}
              align="center"
              className="onemain"
            >
              <Flex
                p="4"
                gap={4}
                w="100%"
                fontSize="18"
                h="100%"
                justifyContent="center"
                direction="column"
              >
                <Flex alignItems="center">
                  <Text w="9rem" fontWeight="bold">
                    Cliente
                  </Text>
                  <Text
                    fontWeight="bold"
                    w="100%"
                    border="2px"
                    rounded={8}
                    p="2"
                    bgColor="gray.100"
                  >
                    {pets.customerName}
                  </Text>
                </Flex>
                <Flex alignItems="center">
                  <Text fontWeight="bold" w="9rem">
                    Pet
                  </Text>
                  <Text
                    fontWeight="bold"
                    w="100%"
                    display="flex"
                    alignItems="center"
                    px="3"
                    border="2px"
                    height="78px"
                    rounded={8}
                    bgColor="gray.100"
                  >
                    {`Nome: ${pets.name}, Raça: ${pets.race}, Peso: ${pets.weigth}Kg's,  Sexo ${pets.sexo}, Cor: ${pets.corPet} `}
                  </Text>
                </Flex>
                <Flex alignItems="center">
                  <Text fontWeight="bold" w="9rem">
                    Código Único
                  </Text>
                  <Text
                    fontWeight="bold"
                    w="100%"
                    display="flex"
                    alignItems="center"
                    px="3"
                    height="48px"
                    border="2px"
                    rounded={8}
                    bgColor="gray.100"
                    textAlign="center"
                  >
                    {pets.codPet}
                  </Text>
                </Flex>
              </Flex>
            </Flex>
            <Flex
              direction="column"
              w="100%"
              h="70%"
              bgColor="gray.100"
              rounded={4}
              className="secondmain"
            >
              <Flex w="100%" h="10%" justify="space-evenly" my="2">
                <Button colorScheme="whatsapp" w="32%">
                  Consultas
                </Button>
                <Button colorScheme="whatsapp" w="32%">
                  Internações
                </Button>
                <Button colorScheme="whatsapp" w="32%">
                  Outra Unidade
                </Button>
              </Flex>
              <Flex h="100%" w="100%" overflow="auto">
                <Flex w="100%" h="auto" direction="column" fontSize="17" m="2">
                  <Text
                    fontWeight="bold"
                    w="100%"
                    h="38px"
                    bgColor="cyan.50"
                    textDecoration="underline"
                  >
                    {" "}
                    27/06/2023 - 17:30 Consulta ESP Dr Daniel Henrique
                  </Text>
                  <Text
                    fontWeight="bold"
                    w="100%"
                    h="38px"
                    bgColor="cyan.50"
                    textDecoration="underline"
                  >
                    <span
                      className="textSpan"
                      style={{ backgroundColor: "#e3f1ef" }}
                    >
                      Peso Época:
                    </span>{" "}
                    5,9 Kgs
                  </Text>
                  <Text
                    fontWeight="bold"
                    w="100%"
                    h="58px"
                    bgColor="cyan.50"
                    textDecoration="underline"
                  >
                    Observações: Não há observações registradas nessa consulta
                  </Text>
                </Flex>
              </Flex>
            </Flex>
          </Flex>

          <Flex width="40%" direction="column" className="one">
            <Flex
              height="50%"
              w="100%"
              textAlign="center"
              direction="column"
              borderRight="1px solid black"
            >
              <Flex
                w="100%"
                height="38px"
                bgColor="gray.100"
                align="center"
                justify="center"
                py="2"
                borderTop="1px solid black"
              >
                <Text fontWeight="bold">VACINAS</Text>
              </Flex>
              <Flex
                w="100%"
                height="38px"
                bgColor="gray.200"
                gap={2}
                align="center"
                justify="space-evenly"
                borderTop="1px solid black"
              >
                <Text fontWeight="bold">TIPOS</Text>
                <Text fontWeight="bold">DATA</Text>
              </Flex>
              <Flex direction="row" w="100%" h="100%" overflowY="auto">
                <Flex
                  w="100%"
                  h="38px"
                  bgColor="cyan.100"
                  align="center"
                  borderY="2px"
                  justify="space-evenly"
                >
                  <Text fontWeight="bold">Anti Rabica</Text>
                  <Text fontWeight="bold">11/04/22</Text>
                </Flex>
              </Flex>
            </Flex>

            <Flex
              direction="column"
              height="50%"
              w="100%"
              textAlign="center"
              borderRight="1px solid black"
            >
              <Flex
                w="100%"
                height="38px"
                bgColor="gray.100"
                align="center"
                justify="center"
                borderTop="1px solid black"
              >
                <Text fontWeight="bold">CIRURGIAS</Text>
              </Flex>
              <Flex
                w="100%"
                height="38px"
                bgColor="gray.200"
                gap={2}
                align="center"
                justify="space-evenly"
                borderY="1px solid black"
              >
                <Text fontWeight="bold">TIPOS</Text>
                <Text fontWeight="bold">DATA</Text>
              </Flex>
            </Flex>
          </Flex>

          <Flex
            ml="1"
            width="40%"
            direction="column"
            className="two"
            borderLeft="1px solid black"
          >
            <Flex height="50%" w="100%" textAlign="center" direction="column">
              <Flex
                w="100%"
                height="38px"
                py="2"
                bgColor="gray.100"
                align="center"
                justify="center"
                borderTop="1px solid black"
              >
                <Text fontWeight="bold">EXAMES</Text>
              </Flex>
              <Flex
                w="100%"
                height="40px"
                bgColor="gray.200"
                gap={2}
                align="center"
                pl="6"
                pr="6"
                justify="space-between"
                borderTop="1px solid black"
              >
                <Text fontWeight="bold">TIPOS</Text>
                <Text fontWeight="bold">DATA</Text>
              </Flex>
              <Flex
                direction="column"
                height="100%"
                width="100%"
                overflowY="auto"
              >
                {pets.exams?.map((exam) => (
                  <Flex
                    key={exam.id}
                    borderY="1px"
                    bgColor="cyan.100"
                    align="center"
                    height="38px"
                    width="100%"
                    pl="6"
                    pr="6"
                    justify="space-between"
                  >
                    {exam.doneExam === true ? (
                      <Text color="green.400" fontWeight="bold">
                        {exam.name}
                      </Text>
                    ) : (
                      <Text color="red.400" fontWeight="bold">
                        {exam.name}
                      </Text>
                    )}
                    <Text fontWeight="bold" fontSize="lg">
                      {exam.requestedData}
                    </Text>
                  </Flex>
                ))}
              </Flex>
              <Flex
                w="100%"
                height="38px"
                bgColor="gray.100"
                gap={2}
                align="center"
                justify="space-evenly"
                borderTop="1px solid black"
              >
                <Text fontWeight="bold" color="red">
                  Vermelhos/Por Fazer
                </Text>
                <Text fontWeight="bold" color="green">
                  Verde/Pronto
                </Text>
              </Flex>
            </Flex>
            <Flex height="50%" w="100%" textAlign="center" direction="column">
              <Flex
                w="100%"
                height="38px"
                bgColor="gray.100"
                align="center"
                justify="center"
                borderTop="1px solid black"
              >
                <Text fontWeight="bold">INTERNAÇÕES</Text>
              </Flex>
              <Flex
                w="100%"
                height="38px"
                bgColor="gray.200"
                gap={2}
                align="center"
                justify="space-evenly"
                borderY="1px solid black"
              >
                <Text fontWeight="bold">TIPOS</Text>
                <Text fontWeight="bold">DATA</Text>
              </Flex>
            </Flex>
          </Flex>
        </MedicineContainer>
      </Flex>
    </ChakraProvider>
  );
}
