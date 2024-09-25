import {
  Box,
  ChakraProvider,
  Flex,
  Table,
  Tr,
  Td,
  Thead,
  Tbody,
  Th,
  Text,
  Checkbox,
  HStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Header } from "../../components/admin/Header";
import { AdminContainer } from "../../pages/AdminDashboard/style";
import { useNavigate } from "react-router-dom";
import { api } from "../../lib/axios";
import { AdmissionSearch } from "../Search/admissionSearch";
import { PetDetaisl } from "../../interfaces";
import moment from "moment";
import { useQuery } from "react-query";

interface QueueProps {
  response: [];
  totalInQueue: number;
}

export function SearchAdmission() {
  const [finished, setFinished] = useState(false);
  const [addmitedPets, setAdmmitedPets] = useState<PetDetaisl[]>([]);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") as string);

  async function getQueue(): Promise<PetDetaisl[]> {
    const response = await api.get("/petsadmitted");
    return response.data;
  }
  async function getQueueFinished(): Promise<PetDetaisl[]> {
    const response = await api.get("/petsadmittedclosed");
    return response.data;
  }

  useQuery<PetDetaisl[]>({
    queryKey: ["petsadmitted", finished],
    queryFn: finished ? getQueueFinished : getQueue,
    onSuccess: (data) => {
      setAdmmitedPets(data);
    },
  });

  return (
    <ChakraProvider>
      <AdminContainer>
        <Flex direction="column" h="100vh">
          <Header title="Painel de Internações" url="/Home" />
          <Flex w="100%" my="6" maxWidth={1680} mx="auto" px="6">
            <Box
              w="100%"
              borderRadius={8}
              minH={700}
              mx={"auto"}
              bg="gray.200"
              p="8"
            >
              <Flex mb="8" gap="8" direction="column">
                <Flex direction={"column"} gap={2}>
                  <Flex gap={1}>
                    Olá <Text fontWeight={"bold"}>{user?.consultName}.</Text>{" "}
                    Seja bem vindo ao sistema de internações.{" "}
                    <Text>
                      {addmitedPets?.length.toString().padStart(2, "0")}
                    </Text>{" "}
                    animais Internados.
                  </Flex>
                  <Text>
                    Seu último logon no sistema ocorreu em{" "}
                    {moment().format("DD/MM/YYYY")}
                  </Text>
                </Flex>
                <AdmissionSearch setFinished={setFinished} path="vetsearch" />
                <Flex align="center" gap={4}>
                  <Text>Legenda:</Text>
                  <HStack>
                    <Text fontWeight="bold">Abaixo de 48 horas</Text>
                    <Box border="1px" bgColor="green.200" w={4} h={4} />
                  </HStack>
                  <HStack>
                    <Text fontWeight="bold">Acima de 48 horas </Text>
                    <Box border="1px" bgColor="red.200" w={4} h={4} />
                    <Text fontWeight="hairline">(prioridade)</Text>
                  </HStack>
                </Flex>

                <Flex textAlign="center" justify="center">
                  <Table colorScheme="blackAlpha">
                    <Thead>
                      <Tr>
                        <Th border={"1px"}>Proprietário</Th>
                        <Th border={"1px"}>Animal</Th>
                        <Th border={"1px"}>Espécie</Th>
                        <Th border={"1px"}>Raça</Th>
                        <Th border={"1px"}>Data</Th>
                        <Th border={"1px"}>Código</Th>
                        <Th border={"1px"}>Canil</Th>
                        <Th border={"1px"}>Leito</Th>
                      </Tr>
                    </Thead>

                    <Tbody>
                      {addmitedPets.length >= 1 ? (
                        addmitedPets.map((pet) => {
                          //@ts-ignore
                          const actualDate = moment(pet?.bed?.entryOur).diff(
                            new Date(),
                            "minutes"
                          );
                          return (
                            <Tr
                              bgColor={
                                actualDate >= 2880 ? "red.200" : "green.200"
                              }
                              cursor={"pointer"}
                              onClick={() =>
                                navigate(
                                  `/Admissions/${pet.id}/${pet?.medicineRecords?.petBeds[0]?.openedAdmissionId}`
                                )
                              }
                              key={pet.id}
                            >
                              <Td border={"1px"}>{pet.customer.name}</Td>
                              <Td border={"1px"}>{pet.name}</Td>
                              <Td border={"1px"}>{pet.especie}</Td>
                              <Td border={"1px"}>{pet.race}</Td>
                              <Td border={"1px"}>
                                {new Intl.DateTimeFormat("pt-BR", {
                                  day: "2-digit",
                                  month: "2-digit",
                                  year: "2-digit",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                  //@ts-ignore
                                }).format(new Date(pet?.bed?.entryOur))}
                              </Td>
                              <Td border={"1px"}>{pet.CodAnimal}</Td>
                              <Td border={"1px"}>
                                {
                                  //@ts-ignore
                                  pet?.bed?.kennel.name
                                }
                              </Td>
                              <Td border={"1px"}>
                                {
                                  //@ts-ignore
                                  pet?.bed?.id
                                }
                              </Td>
                            </Tr>
                          );
                        })
                      ) : (
                        <Tr border={"1px"}>
                          SEM ANIMAIS INTERNADOS NO MOMENTO
                        </Tr>
                      )}
                    </Tbody>
                  </Table>
                </Flex>
              </Flex>
            </Box>
          </Flex>
        </Flex>
      </AdminContainer>
    </ChakraProvider>
  );
}
