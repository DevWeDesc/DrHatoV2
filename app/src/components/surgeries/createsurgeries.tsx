import {
  ChakraProvider,
  Flex,
  Text,
  Input,
  Select,
  Button,
  HStack,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Checkbox,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { PetDetaisl } from "../../interfaces";
import { api } from "../../lib/axios";

interface SugeriesProps {
  id: number;
  name: string;
  price: number | string;
}

type SurgerieVetProps = {
  InAdmission: boolean;
  admissionQueueId?: string;
};

export function Createsurgeries({
  InAdmission,
  admissionQueueId,
}: SurgerieVetProps) {
  const [petDetails, setPetDetails] = useState({} as PetDetaisl);
  const [sugeries, setSugeries] = useState<SugeriesProps[]>([]);
  const [reloadData, setReloadData] = useState(true);
  const [pagination, setPagination] = useState(1);
  const user = JSON.parse(localStorage.getItem("user") as string);
  const navigate = useNavigate();
  const { id, queueId } = useParams<{ id: string; queueId: string }>();

  async function getPetData() {
    const pet = await api.get(`/pets/${id}`);
    setPetDetails(pet.data);
  }
  async function GetData() {
    try {
      const sugeries = await api.get(
        `/surgeries?page=${pagination}&sex=${petDetails.sexo}`
      );
      setSugeries(sugeries.data.surgeries);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    GetData();
  }, []);

  useEffect(() => {
    if (reloadData === true) {
      getPetData();
      setReloadData(false);
    }
  }, [reloadData]);

  async function setSugeriesInPet(surgerieId: number) {
    try {
      const data = {
        RequestedByVetId: user.id,
        RequestedByVetName: user.consultName,
        isAdmission: InAdmission,
      };

      if (InAdmission === true) {
        await api.post(
          `surgeries/${surgerieId}/${petDetails.id}/${petDetails.totalAcc.id}/${admissionQueueId}`,
          data
        );
        setReloadData(true);
        toast.success("Cirurgia adicionada - Internações");
      } else {
        await api.post(
          `surgeries/${surgerieId}/${petDetails.id}/${petDetails.totalAcc.id}/${queueId}`,
          data
        );
        setReloadData(true);
        toast.success("Cirurgia adicionada - Veterinários");
      }
    } catch (error) {
      toast.error("Falha ao cadastrar Cirurgia!");
    }
  }

  const handleDeleteSugerie = async (
    did: number,
    sugPrice: string | number,
    linkedConsultId: number
  ) => {
    try {
      const confirm = window.confirm(
        "DELETAR E UMA AÇÃO IRREVERSIVEL TEM CERTEZA QUE DESEJA CONTINUAR?"
      );

      if (confirm === true) {
        await api
          .delete(
            `/petsurgery/${did}/${petDetails.totalAcc.id}/${sugPrice}/${linkedConsultId}`
          )
          .then((res) => {
            setReloadData(true);
            toast.warning("EXCLUIDO COM SUCESSO");
          });
      } else {
        return;
      }
    } catch (error) {
      toast.error("FALHA AO PROCESSAR EXCLUSÃO");
      console.log(error);
    }
  };

  return (
    <ChakraProvider>
      <Flex w="100vw" h="100vh">
        <Flex
          color="black"
          direction="column"
          w="65vw"
          h="90vh"
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
            h="25vh"
          >
            <TableContainer width="100%" height="100%" overflowY="auto">
              <Table>
                <Thead>
                  <Tr>
                    <Th fontWeight="black" color="black" fontSize="md">
                      NOME
                    </Th>
                    <Th fontWeight="black" color="black" fontSize="md">
                      VALOR
                    </Th>
                    <Th fontWeight="black" color="black" fontSize="md">
                      EXCLUIR?
                    </Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {petDetails.surgeries?.map((surgerie) => (
                    <Tr key={surgerie.id}>
                      <Td>{surgerie.name}</Td>
                      <Td>
                        {new Intl.NumberFormat("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        }).format(Number(surgerie.price))}
                      </Td>
                      <Td>
                        <Button
                          colorScheme="red"
                          isDisabled={surgerie.surgerieStatus === "FINISHED"}
                          onClick={() =>
                            handleDeleteSugerie(
                              surgerie.id,
                              surgerie.price,
                              surgerie.linkedConsultId
                            )
                          }
                        >
                          EXCLUIR
                        </Button>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </Flex>
          <Flex direction="column" h="65vh">
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
              <Flex>
                <Input borderColor="black" rounded="0" w="20vw" bg="white" />
                <HStack>
                  <Button color="white" rounded="0" colorScheme="twitter">
                    Procurar
                  </Button>
                </HStack>
              </Flex>
            </Flex>

            <TableContainer overflowY="auto">
              <Table>
                <Thead>
                  <Tr>
                    <Th>Cirurgia</Th>
                    <Th>Até 6kg</Th>
                    <Th>7kg á 15kg</Th>
                    <Th>16kg á 35kg</Th>
                    <Th>35kg+</Th>
                    <Th>Incluir</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {sugeries.map((sugerie) => (
                    <Tr key={sugerie.id}>
                      <Td>{sugerie.name}</Td>
                      <Td>
                        {new Intl.NumberFormat("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        }).format(Number(sugerie?.price))}
                      </Td>
                      <Td>
                        {new Intl.NumberFormat("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        }).format(Number(sugerie?.price))}
                      </Td>
                      <Td>
                        {new Intl.NumberFormat("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        }).format(Number(sugerie?.price))}
                      </Td>
                      <Td>
                        {new Intl.NumberFormat("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        }).format(Number(sugerie?.price))}
                      </Td>
                      <Td>
                        <Button
                          onClick={() => setSugeriesInPet(sugerie.id)}
                          colorScheme="whatsapp"
                        >
                          Incluir
                        </Button>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
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
