import {
  ChakraProvider,
  Flex,
  Table,
  Tbody,
  Thead,
  Td,
  Tr,
  Th,
  Heading,
  Text,
  Button,
} from "@chakra-ui/react";
import { RiArrowGoBackLine } from "react-icons/all";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { api } from "../lib/axios";

export function QueueLabs() {
  const path = useLocation();
  const [totLabs, setTotLabs] = useState([]);

  async function getLabs() {
    const labs = await api.get("/labs");
    // const total = await api.get("/pets/queue");
    setTotLabs(labs.data);
  }

  useEffect(() => {
    getLabs();
  }, []);

  let queue;
  switch (true) {
    case path.pathname === "/Queue/Labs":
      queue = (
        <ChakraProvider>
          <Flex
            m="2"
            justify="center"
            direction="column"
            textAlign="center"
            w="100vw"
          >
            <Flex justify="space-between" margin="4" align="center">
              <Heading fontSize={28} color="cyan.700">
                Sistema de filas
              </Heading>{" "}
              <Text fontWeight="bold" fontSize="2xl">
                Fila de Laboratório
              </Text>
              <Link to="/Home">
                <Button leftIcon={<RiArrowGoBackLine />} colorScheme="teal">
                  Voltar
                </Button>
              </Link>
            </Flex>

            <Flex gap="2">
              <Table colorScheme="whatsapp">
                <Thead>
                  <Tr>
                    <Th>Id</Th>
                    <Th>Animal</Th>
                    <Th>Exame</Th>
                    <Th>Entrada</Th>
                    <Th>Preço Exame</Th>
                    <Th>Preferência</Th>
                    <Th>Prioridade</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {totLabs != null ? (
                    totLabs.map((pet: any) => (
                      <Tr key={pet.id}>
                        <Td color="black">{pet.id}</Td>
                        <Td>{pet.medicine.pet.name}</Td>
                        <Td>{pet.name}</Td>

                        <Td>{pet.requesteData}</Td>
                        {/**<Td>{pet.queueEntry}</Td>*/}
                        <Td>{pet.price}</Td>
                        <Td>
                          {pet.vetPreference
                            ? pet.vetPreference
                            : "Sem Preferência"}
                        </Td>
                        <Td>FILA AZUL</Td>
                      </Tr>
                    ))
                  ) : (
                    <Tr>
                      <Td>Empty</Td>
                      <Td>Empty</Td>
                      <Td>Empty</Td>
                      <Td>Empty</Td>
                      <Td>Empty</Td>
                      <Td>Empty</Td>
                      <Td>Empty</Td>
                      <Td>Empty</Td>
                    </Tr>
                  )}
                </Tbody>
              </Table>
            </Flex>
          </Flex>
        </ChakraProvider>
      );
    default:
      break;
  }

  return <>{queue}</>;
}
