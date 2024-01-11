import {
  Flex,
  ChakraProvider,
  Table,
  Thead,
  Tbody,
  Td,
  Th,
  Tr,
  Text,
  Button,
  Input,
  Textarea,
  HStack,
  FormLabel,
  TableCaption,
  Tfoot,
  TableContainer,
} from "@chakra-ui/react";
import { BiHome, GiMedicines, TbArrowBack } from "react-icons/all";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { api } from "../../lib/axios";
import { MedicineContainer } from "./style";
import { GenericModal } from "../../components/Modal/GenericModal";
import { MedicinesHistory } from "./MedicinesHistory";
import { toast } from "react-toastify";

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
  customer: {
    name: string;
  };
  codPet: string;

  medicineRecords: {
    petBeds: Array<{
      id: number;
      entryOur: string;
    }>;
    petExams: Array<{
      id: number;
      name: string;
      requesteData: string;
      doneExame: boolean;
    }>;
    petQueues: Array<{
      id: number;
      queueEntry: string;
      queueExit: string;
      queryType: string;
      responsibleVeterinarian: string;
      petWeight: string;
      observations: string;
    }>;
    petSurgeries: Array<{
      id: number;
      name: string;
      requestedDate: Date;
      completedDate: Date | null;
      status: string;
    }>;
    petVaccines: Array<{
      id: number;
      name: string;
      requestedDate: Date;
      applicationDate: Date | null;
      isDone: boolean;
    }>;
  };
}

export function MedicineRecords() {
  const { id, queueId } = useParams<{ id: string; queueId: string }>();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalUnconclude, setModalUnconclude] = useState(false);
  const [masterPassword, setMasterPassword] = useState("");
  const [unconcludeObs, setUnconcludeObs] = useState("");
  const [endQueueId, setEndQueueId] = useState(0);
  const [pets, setPets] = useState({} as PetProps);
  const user: {
    id: number;
    role: string;
  } = JSON.parse(localStorage.getItem("user") as string);
  const navigate = useNavigate();

  function openModal() {
    setModalIsOpen(true);
  }
  function closeModal() {
    setModalIsOpen(false);
  }

  function openUnconcludeModal() {
    setModalUnconclude(true);
  }

  function closeUnconcludeModal() {
    setModalUnconclude(false);
  }

  async function getPet() {
    try {
      const response = await api.get(`/pets/history/${id}`);
      setPets(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function unclocludeQueue(queueId: number) {
    const data = {
      masterPassword,
      unconcludeObs,
      userId: user.id,
      queueId,
    };
    if (user.role != "MASTER") {
      toast.warning("Função apenas de usuário MASTER!");
    } else {
      await api.put("/queue/unconclude", data);
      toast.success("Consulta desconcluida!!");
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
              onClick={() => navigate(`/Vets/Workspace/${id}/${queueId}`)}
            >
              Voltar
            </Button>
            <Button
              colorScheme="cyan"
              leftIcon={<GiMedicines size={24} />}
              onClick={() => openModal()}
            >
              Histórico de medicação
            </Button>
          </Flex>
        </Flex>

        <MedicineContainer>
          <Flex
            direction="column"
            shadow="4px 0px 10px -2px rgba(0, 0, 0, 0.2)"
            w="100%"
          >
            <Flex
              p="4"
              gap={4}
              w="100%"
              fontSize="18"
              justifyContent="center"
              direction="column"
            >
              <TableContainer w="100%">
                <Table variant="simple" w="100%">
                  <Tbody>
                    <Tr>
                      <Th py="0" px="0" fontSize="18" w="30px">
                        Cliente
                      </Th>
                      <Th py="0" px="0">
                        <Input
                          py="6"
                          rounded="0"
                          borderColor="black"
                          value={pets?.customer?.name}
                        />
                      </Th>
                    </Tr>
                    <Tr>
                      <Th py="0" px="0" fontSize="18" color="black" w="30px">
                        Pet
                      </Th>
                      <Td py="0" px="0">
                        <Input
                          py="6"
                          rounded="0"
                          borderColor="black"
                          value={`Nome: ${pets.name}, Raça: ${pets.race}, Peso: ${pets.weigth},  Sexo ${pets.sexo}, Cor: ${pets.corPet} `}
                        />
                      </Td>
                    </Tr>
                    <Tr py="0">
                      <Th
                        py="0"
                        px="0"
                        pr="5"
                        fontSize="18"
                        color="black"
                        w="30px"
                      >
                        Código Único
                      </Th>
                      <Td py="0" px="0">
                        <Input
                          py="6"
                          rounded="0"
                          borderColor="black"
                          value={pets.codPet}
                        />
                      </Td>
                    </Tr>
                  </Tbody>
                </Table>
              </TableContainer>
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
                <Button
                  colorScheme="whatsapp"
                  w="33.3%"
                  borderX="2px solid green"
                  borderY="4px solid green"
                  borderLeft="4px solid green"
                  borderRadius={0}
                >
                  Consultas
                </Button>
                <Button
                  colorScheme="whatsapp"
                  w="33.3%"
                  borderX="2px solid green"
                  borderY="4px solid green"
                  borderRadius={0}
                >
                  Internações
                </Button>
                <Button
                  colorScheme="whatsapp"
                  w="33.3%"
                  borderY="4px solid green"
                  borderX="2px solid green"
                  borderRight="4px solid green"
                  borderRadius={0}
                >
                  Outra Unidade
                </Button>
              </Flex>

              <Flex w="100%" h="100%" overflowY="auto">
                <Flex direction="column" w="100%" h="100%">
                  {pets?.medicineRecords?.petQueues.map((queue) => (
                    <Flex
                      textAlign="center"
                      direction="column"
                      w="100%"
                      key={queue.id}
                    >
                      <Text
                        border="2px"
                        fontSize="lg"
                        bg="gray.300"
                        color="black"
                        fontWeight="bold"
                      >{`Entrada: ${new Intl.DateTimeFormat("pt-BR", {
                        day: "2-digit",
                        month: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                      }).format(new Date(queue.queueEntry))} 
                      - 
                      Saida: ${new Intl.DateTimeFormat("pt-BR", {
                        day: "2-digit",
                        month: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                      }).format(new Date(queue.queueExit))}
                      -
                      ${queue.queryType} - ${
                        queue.responsibleVeterinarian
                      }`}</Text>
                      <Flex align="center" textAlign="center" gap="0">
                        <Text
                          borderY="2px"
                          fontWeight="bold"
                          fontSize="lg"
                          bgColor="gray.300"
                          h="38px"
                          w="20%"
                        >
                          {" "}
                          Peso
                        </Text>
                        <Text
                          border="2px"
                          fontWeight="black"
                          fontSize="lg"
                          bgColor="white"
                          h="38px"
                          w="80%"
                        >
                          {" "}
                          {queue.petWeight}
                        </Text>
                        <Button
                          maxH="38px"
                          borderRadius="0px"
                          colorScheme="red"
                          onClick={() => {
                            setEndQueueId(queue.id);
                            openUnconcludeModal();
                          }}
                        >
                          Desconcluir
                        </Button>
                      </Flex>

                      <Flex direction="column">
                        <Text
                          pl="40px"
                          textAlign="left"
                          border="2px"
                          fontWeight="bold"
                          fontSize="lg"
                          bgColor="gray.300"
                          py="4px"
                          w="100%"
                        >
                          {" "}
                          Sintomas
                        </Text>
                        <Textarea
                          borderRadius="0"
                          bgColor="white"
                          fontSize="md"
                          fontWeight="bold"
                          border="2px"
                          w="100%"
                          defaultValue={queue.observations}
                        />
                      </Flex>
                    </Flex>
                  ))}
                </Flex>
              </Flex>
            </Flex>
          </Flex>
          <Flex width="50%" direction="column" className="one">
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
                bg="gray.600"
                textColor="white"
              >
                <Text fontWeight="bold">VACINAS</Text>
              </Flex>
              <TableContainer>
                <Table variant="striped">
                  <Thead>
                    <Tr>
                      <Th>Tipo</Th>
                      <Th></Th>
                      <Th borderLeft="2px solid black">Data</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {pets.medicineRecords?.petVaccines?.map((vaccine) => (
                      <Tr key={vaccine.id}>
                        {vaccine.isDone === true ? (
                          <Td borderY="1px solid black">{vaccine.name}</Td>
                        ) : (
                          <Td borderY="1px solid black">{vaccine.name}</Td>
                        )}
                        <Td borderY="1px solid black"></Td>

                        <Td
                          borderY="1px solid black"
                          borderLeft="2px solid black"
                        >
                          {new Intl.DateTimeFormat("pt-BR").format(
                            new Date(
                              vaccine.requestedDate
                                ? vaccine.requestedDate
                                : Date.now()
                            )
                          )}
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </TableContainer>
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
                bg="gray.600"
                textColor="white"
              >
                <Text fontWeight="bold">CIRURGIAS</Text>
              </Flex>
              <TableContainer>
                <Table>
                  <Thead>
                    <Tr>
                      <Th>Tipo</Th>
                      <Th></Th>
                      <Th borderLeft="2px solid black">Data</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {pets.medicineRecords?.petSurgeries?.map((surgerie) => (
                      <Tr key={surgerie.id}>
                        {surgerie.status === "FINISHED" ? (
                          <Td borderY="1px solid black">{surgerie.name}</Td>
                        ) : (
                          <Td borderY="1px solid black">{surgerie.name}</Td>
                        )}
                        <Td borderY="1px solid black"></Td>

                        <Td
                          borderY="1px solid black"
                          borderLeft="2px solid black"
                        >
                          {new Intl.DateTimeFormat("pt-BR").format(
                            new Date(
                              surgerie.requestedDate
                                ? surgerie.requestedDate
                                : Date.now()
                            )
                          )}
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </TableContainer>
            </Flex>
          </Flex>

          <Flex
            width="50%"
            direction="column"
            className="two"
            borderLeft="1px solid black"
          >
            <Flex height="50%" w="100%" textAlign="center" direction="column">
              <Flex
                w="100%"
                height="38px"
                py="2"
                bgColor="gray.600"
                textColor="white"
                align="center"
                justify="center"
                borderTop="1px solid black"
              >
                <Text fontWeight="bold">EXAMES</Text>
              </Flex>
              <TableContainer>
                <Table variant="striped">
                  <Thead>
                    <Tr>
                      <Th>Tipo</Th>
                      <Th></Th>
                      <Th borderLeft="2px solid black">Data</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {pets.medicineRecords?.petExams?.map((exam) => (
                      <Tr key={exam.id}>
                        {exam.doneExame === true ? (
                          <Td borderY="1px solid black">{exam.name}</Td>
                        ) : (
                          <Td borderY="1px solid black">{exam.name}</Td>
                        )}
                        <Td borderY="1px solid black"></Td>

                        <Td
                          borderY="1px solid black"
                          borderLeft="2px solid black"
                        >
                          {new Intl.DateTimeFormat("pt-BR").format(
                            new Date(
                              exam.requesteData ? exam.requesteData : Date.now()
                            )
                          )}
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </TableContainer>

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
                bgColor="gray.600"
                textColor="white"
                align="center"
                justify="center"
                borderTop="1px solid black"
              >
                <Text fontWeight="bold">INTERNAÇÕES</Text>
              </Flex>
              <TableContainer>
                <Table variant="striped">
                  <Thead>
                    <Tr>
                      <Th>Tipo</Th>
                      <Th></Th>
                      <Th borderX="2px solid black">Data</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {pets.medicineRecords?.petBeds?.map((admission) => (
                      <Tr key={admission.id}>
                        <Td borderY="1px solid black">Internação</Td>

                        <Td borderY="1px solid black"></Td>

                        <Td
                          borderY="1px solid black"
                          borderLeft="2px solid black"
                        >
                          {new Intl.DateTimeFormat("pt-BR").format(
                            new Date(
                              admission?.entryOur
                                ? admission.entryOur
                                : Date.now()
                            )
                          )}
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </TableContainer>
            </Flex>
          </Flex>
        </MedicineContainer>
      </Flex>
      <GenericModal isOpen={modalIsOpen} onRequestClose={closeModal}>
        <MedicinesHistory />
      </GenericModal>
      <GenericModal
        isOpen={modalUnconclude}
        onRequestClose={closeUnconcludeModal}
      >
        <Flex w={400} h={200} align="center" direction="column">
          <Text fontWeight="bold">
            Apenas MASTER's podem desconcluir consultas:
          </Text>

          <Textarea
            onChange={(ev) => setUnconcludeObs(ev.target.value)}
            border="1px"
            placeholder="Opcional: Motivo Desconclusão "
          />
          <Input
            mt="2"
            onChange={(ev) => setMasterPassword(ev.target.value)}
            border="1px"
            name="masterPassword"
            type="password"
            placeholder="Senha usuário Master"
          />
          <Button
            mt="4"
            colorScheme="teal"
            onClick={() => unclocludeQueue(endQueueId)}
          >
            Desconcluir
          </Button>
        </Flex>
      </GenericModal>
    </ChakraProvider>
  );
}
