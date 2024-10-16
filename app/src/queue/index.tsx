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

type VetsProps = {
  username: string;
  id: number;
  consultName: string;
};

type IPetsInQueue = {
  codPet: number;
  customerCpf: string;
  customerName: string;
  especie: string;
  id: number;
  more: string;
  name: string;
  openedBy: string;
  petAdmitted: boolean;
  queryType: string;
  queueEntry: string;
  queueId: string;
  race: string;
  totalInQueue: number;
  vetPreference: string;
};

export function QueueSistem() {
  const [petsInQueue, setPetsInQueue] = useState<IPetsInQueue[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [queryType, setQueryType] = useState("");
  const user = JSON.parse(localStorage.getItem("user") as string);
  const [vetPreference, setVetPreference] = useState("");
  const navigate = useNavigate();
  const [userVets, setUserVets] = useState<VetsProps[]>([]);
  const [queueSelected, setQueueSelected] = useState({} as IPetsInQueue);
  function openModal() {
    setIsModalOpen(true);
  }
  function closeModal() {
    setIsModalOpen(false);
  }

  async function loadVets() {
    const response = await api.get(`/users/vets`);
    setUserVets(response.data.vets);
  }

  async function setPetInQueue(queueId: string | number) {
    const data = {
      consultType: queryType,
      vetPreference: vetPreference,
    };

    await api
      .patch(`queue/${queueId}`, data)
      .then(() => {
        toast.success("Pet atualizado na fila com sucesso!");
        navigate("/Recepcao/Consultas");
      })
      .catch(() => toast.error("Erro ao editar consulta!"));
  }

  async function GetPetQueue() {
    try {
      const response = await api.get("/pets/queue");
      const responseData: IPetsInQueue[] = response.data.response;
      setPetsInQueue(
        responseData.sort(
          (a, b) =>
            new Date(a.queueEntry).getTime() - new Date(b.queueEntry).getTime()
        )
      );
    } catch (error) {
      toast.error("Falha ao carregar Fila.");
    }
  }

  const path = useLocation();

  useEffect(() => {
    loadVets();
    GetPetQueue();
  }, []);

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
                  {petsInQueue.map((pet: IPetsInQueue) => (
                    <Tr key={pet.id}>
                      <Td color="black">{pet.queryType}</Td>
                      <Td>{pet.customerName}</Td>
                      <Td>
                        <Button
                          onClick={() => {
                            setQueueSelected(pet);
                            console.log(pet);
                            openModal();
                          }}
                          colorScheme="whatsapp"
                        >
                          {pet.name}
                        </Button>
                      </Td>
                      <Td>{pet.race}</Td>
                      <Td>
                        {Intl.DateTimeFormat("pt-br", {
                          dateStyle: "short",
                        }).format(new Date(pet.queueEntry))}
                      </Td>
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

                <GenericModal isOpen={isModalOpen} onRequestClose={closeModal}>
                  <Flex justify="center">
                    <Flex direction="column" overflow="auto" h={600}>
                      <Text mt="4" fontWeight="bold" pb="2">
                        SELECIONAR VETERINARIO
                      </Text>

                      {userVets.map((vet) => (
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
                              value={vet.consultName.toString()}
                            >
                              {vet.consultName}
                            </Radio>
                          </Flex>
                        </RadioGroup>
                      ))}
                    </Flex>
                    <Flex direction="column" overflow="auto" height="100%">
                      <Text mt="4" fontWeight="bold" pb="2">
                        SELECIONAR ATENDIMENTO
                      </Text>
                      <RadioGroup onChange={setQueryType} value={queryType}>
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
                    onClick={() => setPetInQueue(queueSelected.queueId)}
                  >
                    ATUALIZAR FILA
                  </Button>
                </GenericModal>
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
                    petsInQueue.map((pet: IPetsInQueue) => (
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
