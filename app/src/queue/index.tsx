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
  RadioGroup,
  Radio,
} from "@chakra-ui/react";
import { RiArrowGoBackLine } from "react-icons/all";
import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { api } from "../lib/axios";
import { toast } from "react-toastify";
import { useAnimate } from "framer-motion";
import { GenericModal } from "../components/Modal/GenericModal";
import { DbContext } from "../contexts/DbContext";

interface PetsInQueue {
  id: number | string;
  name: string;
  customerName: string;
  race: string;
  codPet: string;
  queueEntry: string;
  queryType: string;
  vetPreference: string;
}

export function QueueSistem() {
  const [petsInQueue, setPetsInQueue] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [queryType, setQueryType] = useState("");
  const [vetPreference, setVetPreference] = useState("");
  const navigate = useNavigate();
  const { vets } = useContext(DbContext);
  function openModal() {
    setIsModalOpen(true);
  }
  function closeModal() {
    setIsModalOpen(false);
  }

  async function setPetInQueue(id: string | number) {
    try {
      const formattedData = new Date();
      const processData = new Intl.DateTimeFormat().format(formattedData);
      const formatter = new Intl.DateTimeFormat([], {
        timeZone: "America/Sao_Paulo",
        hour: "numeric",
        minute: "numeric",
      });
      const currentDateTime = formatter.format(new Date());

      const data = {
        vetPreference: vetPreference,
        queryType: queryType,
        queueEntry: processData,
        petIsInQueue: true,
        queueOur: currentDateTime,
      };

      await api.put(`queue/${id}`, data);
      toast.success("Pet atualizado na fila com sucesso!");
      navigate(0);
    } catch (error) {
      toast.error("Falha ao colocar na fila");
    }
  }

  const path = useLocation();
  useEffect(() => {
    async function GetPetQueue() {
      try {
        const response = await api.get("/pets/queue");
        setPetsInQueue(response.data.response);
      } catch (error) {
        toast.error("Falha ao carregar Fila.");
      }
    }

    GetPetQueue();
  }, []);
  console.log(petsInQueue);
  let queue;
  switch (true) {
    case path.pathname === "/Recepcao/Change":
      queue = (
        <ChakraProvider>
          <Flex
            flex="1"
            direction="column"
            borderRadius={8}
            bg="gray.200"
            p="8"
            maxH="44rem"
            overflow="auto"
          >
            <Flex gap="2">
              <Table colorScheme="whatsapp">
                <Thead>
                  <Tr>
                    <Th>Tipo</Th>
                    <Th>Cliente</Th>
                    <Th>Animal</Th>
                    <Th>Raça</Th>
                    <Th>Entrada</Th>
                    <Th>Codigo</Th>
                    <Th>Preferência</Th>
                    <Th>Prioridade</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {petsInQueue.map((pet: PetsInQueue) => (
                    <Tr key={pet.id}>
                      <Td color="black">{pet.queryType}</Td>
                      <Td>{pet.customerName}</Td>
                      <Td>
                        <GenericModal
                          isOpen={isModalOpen}
                          onRequestClose={closeModal}
                        >
                          <Flex justify="center">
                            <Flex
                              direction="column"
                              overflow="auto"
                              height="100%"
                            >
                              <Text mt="4" fontWeight="bold" pb="2">
                                SELECIONAR VETERINARIO
                              </Text>

                              {vets.map((vet) => (
                                <RadioGroup
                                  key={vet.id}
                                  onChange={setVetPreference}
                                  value={vetPreference}
                                >
                                  <Flex direction="column">
                                    <Radio
                                      mb="2"
                                      borderColor="teal.800"
                                      colorScheme="green"
                                      value={vet.username.toString()}
                                    >
                                      {vet.username}
                                    </Radio>
                                  </Flex>
                                </RadioGroup>
                              ))}
                            </Flex>
                            <Flex
                              direction="column"
                              overflow="auto"
                              height="100%"
                            >
                              <Text mt="4" fontWeight="bold" pb="2">
                                SELECIONAR ATENDIMENTO
                              </Text>
                              <RadioGroup
                                onChange={setQueryType}
                                value={queryType}
                              >
                                <Flex direction="column">
                                  <Radio
                                    mb="2"
                                    borderColor="teal.800"
                                    colorScheme="green"
                                    value="Avaliação"
                                  >
                                    Avaliação
                                  </Radio>
                                  <Radio
                                    mb="2"
                                    borderColor="teal.800"
                                    colorScheme="green"
                                    value="Cancelar"
                                  >
                                    Cancelar
                                  </Radio>
                                  <Radio
                                    mb="2"
                                    borderColor="teal.800"
                                    colorScheme="green"
                                    value="Consulta"
                                  >
                                    Consulta
                                  </Radio>
                                  <Radio
                                    mb="2"
                                    borderColor="teal.800"
                                    colorScheme="green"
                                    value="Consulta ESP"
                                  >
                                    Consulta ESP
                                  </Radio>
                                  <Radio
                                    mb="2"
                                    borderColor="teal.800"
                                    colorScheme="green"
                                    value="Consulta PetLove"
                                  >
                                    Consulta PetLove
                                  </Radio>
                                  <Radio
                                    mb="2"
                                    borderColor="teal.800"
                                    colorScheme="green"
                                    value="Consulta Triagem"
                                  >
                                    Consulta Triagem
                                  </Radio>
                                  <Radio
                                    mb="2"
                                    borderColor="teal.800"
                                    colorScheme="green"
                                    value="Exame Externo"
                                  >
                                    Exame Externo
                                  </Radio>
                                  <Radio
                                    mb="2"
                                    borderColor="teal.800"
                                    colorScheme="green"
                                    value="Orientação"
                                  >
                                    Orientação
                                  </Radio>
                                  <Radio
                                    mb="2"
                                    borderColor="teal.800"
                                    colorScheme="green"
                                    value="Retorno ESP"
                                  >
                                    Retorno ESP
                                  </Radio>
                                  <Radio
                                    mb="2"
                                    borderColor="teal.800"
                                    colorScheme="green"
                                    value="Telefone"
                                  >
                                    Telefone
                                  </Radio>
                                </Flex>
                              </RadioGroup>
                            </Flex>
                          </Flex>

                          <Button
                            colorScheme="teal"
                            onClick={() => setPetInQueue(pet.id)}
                          >
                            ATUALIZAR FILA
                          </Button>
                        </GenericModal>
                        <Button
                          onClick={() => openModal()}
                          colorScheme="whatsapp"
                        >
                          {pet.name}
                        </Button>
                      </Td>
                      <Td>{pet.race}</Td>
                      <Td>{pet.queueEntry}</Td>
                      <Td>{pet.codPet}</Td>
                      <Td>
                        {pet.vetPreference
                          ? pet.vetPreference
                          : "Sem Preferência"}
                      </Td>
                      <Td>FILA AZUL</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Flex>
          </Flex>
        </ChakraProvider>
      );

      break;
    case path.pathname === "/Queue":
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
                Fila de Atendimento
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
                    <Th>Tipo</Th>
                    <Th>Cliente</Th>
                    <Th>Animal</Th>
                    <Th>Raça</Th>
                    <Th>Entrada</Th>
                    <Th>Codigo</Th>
                    <Th>Preferência</Th>
                    <Th>Prioridade</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {petsInQueue != null ? (
                    petsInQueue.map((pet: PetsInQueue) => (
                      <Tr key={pet.id}>
                        <Td color="black">{pet.queryType}</Td>
                        <Td>{pet.customerName}</Td>
                        <Td>{pet.name}</Td>

                        <Td>{pet.race}</Td>
                        <Td>{pet.queueEntry}</Td>
                        <Td>{pet.codPet}</Td>
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
