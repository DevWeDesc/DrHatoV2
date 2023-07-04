import React from "react";
import {
  ChakraProvider,
  Flex,
  Text,
  Input,
  Select,
  Button,
} from "@chakra-ui/react";
export function Createsurgeries() {
  return (
    <ChakraProvider>
      <Flex>
        <Flex
          color="black"
          direction="column"
          w="65vw"
          borderRight="2px solid black"
          fontWeight="bold"
        >
          <Text
            bg="gray.700"
            fontSize="2xl"
            border="1px solid black"
            fontWeight="bold"
            color="white"
            py="2"
            textAlign="center"
          >
            {" "}
            Agendamento de Cirurgias
          </Text>
          <Flex
            bg="gray.200"
            border="1px solid black"
            fontSize="20"
            w="65vw"
            h="41vh"
          >
            <Text color="black" border="1px solid black" pl="2" w="35vw" h="10">
              Abiação de canal auditivo unilateral
            </Text>
            <Text color="black" border="1px solid black" pl="2" w="20vw" h="10">
              1.250,00
            </Text>

            <Text color="black" border="1px solid black" pl="2" w="10vw" h="10">
              Excluir
            </Text>
          </Flex>
          <Flex direction="column" h="41vh">
            <Text
              bg="gray.700"
              fontSize="2xl"
              border="1px solid black"
              fontWeight="bold"
              color="white"
              py="2"
              textAlign="center"
              w="100%"
            >
              {" "}
              Adicione Cirurgias
            </Text>
            <Flex bg="gray.200" py="2" justify="center">
              <Flex border="1px solid black">
                <Input borderColor="black" rounded="0" w="20vw" bg="white" />
                <Button color="white" rounded="0" colorScheme="twitter">
                  Procurar
                </Button>
              </Flex>
            </Flex>
            <Flex border="1px solid black" fontSize="16">
              <Text border="1px solid black" pl="2" w="35vw">
                Cirurgia
              </Text>
              <Text border="1px solid black" pl="2" w="10vw">
                Até 6KG
              </Text>
              <Text bg="red.300" border="1px solid black" pl="1" w="10vw">
                De 7KG á 15KG
              </Text>
              <Text border="1px solid black" pl="2" w="10vw">
                + de 35KG
              </Text>
            </Flex>
          </Flex>
        </Flex>

        <Flex direction="column" w="35vw" border="1px solid black">
          <Text
            bg="gray.700"
            fontSize="2xl"
            fontWeight="bold"
            color="white"
            pl="2"
            py="2"
          >
            Consulta n° 10045
          </Text>
          <Flex
            bg="gray.200"
            border="1px solid black"
            fontSize="20"
            direction="column"
          >
            <Flex align="center">
              <Text
                border="1px solid black"
                borderRight="2px solid black"
                fontWeight="bold"
                pl="2"
                py="1"
                w="15rem"
              >
                Data
              </Text>
              <Input
                borderColor="black"
                type="date"
                rounded="0"
                fontWeight="bold"
                bg="white"
              />
            </Flex>
            <Flex align="center">
              <Text
                border="1px solid black"
                borderRight="2px solid black"
                fontWeight="bold"
                pl="2"
                py="1"
                w="14.4rem"
              >
                C. Cirúrgico
              </Text>
              <Select
                borderColor="black"
                rounded="0"
                fontWeight="bold"
                bg="white"
              >
                <option value="Centro Cirurgico">Centro Cirurgico</option>
              </Select>
            </Flex>
          </Flex>
          <Button
            bg="whatsapp.600"
            fontSize="2xl"
            fontWeight="bold"
            color="white"
            rounded="0"
            py="2"
            _hover={{ backgroundColor: "whatsapp.500" }}
          >
            Verificar
          </Button>
          <Flex direction="column">
            <Flex fontSize="20" fontWeight="bold" bg="gray.200">
              <Text pl="2" border="1px solid black" w="10vw">
                Slot
              </Text>
              <Text pl="2" border="1px solid black" w="10vw">
                Animal
              </Text>{" "}
              <Text pl="2" border="1px solid black" w="15vw">
                Cirurgia
              </Text>
            </Flex>
            <Flex bg="green.100">
              <Text pl="2" border="1px solid black" w="10vw">
                1
              </Text>
              <Text pl="2" border="1px solid black" w="10vw">
                -
              </Text>
              <Text pl="2" border="1px solid black" w="15vw">
                -
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </ChakraProvider>
  );
}
