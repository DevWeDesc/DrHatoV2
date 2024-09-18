import React from "react";
import {
  ChakraProvider,
  Text,
  Flex,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
} from "@chakra-ui/react";
import { useMutation, useQuery } from "react-query";
import { api } from "../../lib/axios";
import { useParams } from "react-router-dom";
import { ref } from "yup";

export function Surgierslist() {
  const { id: idConsult } = useParams<{ id: string }>();

  async function handleGetAllSurgiersForConsult() {
    try {
      return await api.get(`/surgerie/consultation/${idConsult}`);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDeleteSurgeriesByConsult() {
    try {
      return await api.delete(`/surgerie/consultation/${idConsult}`);
    } catch (error) {
      console.log(error);
    }
  }

  const { data, refetch } = useQuery({
    queryKey: "surgeriesAll",
    queryFn: handleGetAllSurgiersForConsult,
  });

  const mutate = useMutation({
    mutationFn: handleDeleteSurgeriesByConsult,
    onSuccess: () => refetch(),
  });

  return (
    <ChakraProvider>
      <Flex>
        <Flex color="black" bg="gray.700" direction="column" w="65vw">
          <Text
            fontSize="2xl"
            border="1px solid black"
            fontWeight="bold"
            color="white"
            pl="2"
            py="2"
          >
            {" "}
            Cirurgias Incluidas nesta Consulta
          </Text>
          <Table bg="gray.200" border="1px solid black" fontSize="20">
            <Thead>
              <Tr>
                <Th
                  fontSize="20"
                  color="black"
                  border="1px solid black"
                  pl="2"
                  pr="33vw"
                >
                  Cirurgia
                </Th>
                <Th
                  fontSize="20"
                  color="black"
                  border="1px solid black"
                  pl="2"
                  pr="3vw"
                >
                  Valor
                </Th>
                <Th
                  fontSize="20"
                  color="black"
                  border="1px solid black"
                  pl="2"
                  pr="3vw"
                >
                  Data
                </Th>
                <Th
                  fontSize="20"
                  color="black"
                  border="1px solid black"
                  pl="2"
                  pr="3vw"
                >
                  Exclusão
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {data?.data.map((surgery: any) => {
                return (
                  <Tr key={surgery.id}>
                    <Th
                      fontWeight={"normal"}
                      color={"black"}
                      fontSize="16"
                      border="1px solid black"
                      pl="2"
                      pr="33vw"
                      whiteSpace={"nowrap"}
                    >
                      {surgery.name}
                    </Th>
                    <Th
                      fontWeight={"normal"}
                      color={"black"}
                      fontSize="16"
                      border="1px solid black"
                      pl="2"
                      pr="3vw"
                    >
                      {new Intl.NumberFormat("pt-BR", {
                        currency: "BRL",
                        style: "currency",
                      }).format(surgery.price)}
                    </Th>
                    <Th
                      fontWeight={"normal"}
                      color={"black"}
                      fontSize="16"
                      border="1px solid black"
                      pl="2"
                      pr="3vw"
                    >
                      {new Intl.DateTimeFormat("pt-BR").format(
                        new Date(surgery.dateSurgerie)
                      )}
                    </Th>
                    <Th
                      fontWeight={"bold"}
                      color={"red.500"}
                      fontSize="16"
                      border="1px solid black"
                      pl="2"
                      pr="3vw"
                      onClick={() => mutate.mutate()}
                      cursor={"pointer"}
                      _hover={{
                        color: "red.600",
                      }}
                    >
                      Excluir
                    </Th>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </Flex>
        <Flex
          direction="column"
          bg="gray.700"
          w="35vw"
          border="1px solid black"
        >
          <Text fontSize="2xl" fontWeight="bold" color="white" pl="2" py="2">
            Cirurgias
          </Text>
          <Flex bg="gray.200" border="1px solid black" fontSize="20">
            <Text border="1px solid black" pl="2" w="25vw">
              Tipo
            </Text>
            <Text border="1px solid black" pl="2" w="10vw">
              Data
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </ChakraProvider>
  );
}
