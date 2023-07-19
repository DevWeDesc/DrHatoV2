import { ChakraProvider, Flex, Button, Text, Select } from "@chakra-ui/react"
import { useState, useEffect } from "react";
import { BiHome } from "react-icons/bi";
import { TbArrowBack } from "react-icons/tb";
import { useNavigate, useParams } from "react-router-dom";
import { Input } from "../../../components/admin/Input";
import { api } from "../../../lib/axios";
import { PetProps } from "../../Pets/details";


export function VetInstructions() {
  const [pet, setPet] = useState({} as PetProps);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  useEffect(() => {
    async function getPetDetails() {
      const response = await api.get(`/pets/${id}`);
      setPet(response.data);
    }
    getPetDetails();
  }, []);
  return (
    <ChakraProvider>
      <Flex width="100vw" height="100vh" bgColor="white" direction="column">
        <Flex w="100%" height="10vh" bgColor="gray.200">
          <Flex align="center" gap="2">
            <Text m="2" fontSize="2xl" fontWeight="bold">
              Instruções Proprietário
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
        <Flex justify="center">
          <Flex py="50" direction="column" w="90%">
            <Flex border="1px solid black" height="50px" align="center">
              <Text w="380px" py="3" px="5" bg="gray.200">
                Animal Selecionado
              </Text>
              <Input
                name="namePet"
                borderY="0"
                rounded="0"
                type="text"
                h="45px"
                value={pet.name ? pet.name : "N/A"}
              />
            </Flex>
            <Flex border="1px solid black">
              <Text
                w="380px"
                px="5"
                bg="gray.200"
                py="3"
                borderRight="1px solid black"
              >
                Instruções aos Proprietários
              </Text>
              <Select borderY="0" rounded="0" h="47px">
                <option value="option1">Selecione uma opção</option>
                <option value="option2">Cuidados com o filhote</option>
                <option value="option3">
                  Instruções para animais em tratamento quimioterápico
                </option>
                <option value="option4">Recomendações pré operatória</option>
              </Select>
            </Flex>
            <Button
              mt="5"
              bg="whatsapp.400"
              color="white"
              _hover={{ backgroundColor: "green.400" }}
            >
              Imprimir
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </ChakraProvider>
  );
}
