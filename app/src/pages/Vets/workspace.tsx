import {
  WorkSpaceContainer,
  WorkSpaceHeader,
  WorkSpaceContent,
  WorkSpaceFooter,
} from "./styles";
import {
  Text,
  Button,
  ChakraProvider,
  Flex,
  Table,
  Thead,
  Tr,
  Td,
  Tbody,
  Textarea,
  HStack,
  VStack,
  Select,
  TableContainer,
  Th,
} from "@chakra-ui/react";
import {
  AiFillMedicineBox,
  BiHome,
  MdPets,
  TbArrowBack,
  TbMedicalCrossFilled,
} from "react-icons/all";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../../lib/axios";
import { LoadingSpinner } from "../../components/Loading";
import { SetExamForm } from "../../components/workspaceVet/SetExamForm";
import { GenericModal } from "../../components/Modal/GenericModal";
import { VetInstructions } from "./WorkSpaceVets/instructions";
import { WorkVetAutorization } from "./WorkSpaceVets/autorizations";
import { PetDetaisl } from "../../interfaces";
import { motion } from "framer-motion";

export function WorkSpaceVet() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [pet, setPet] = useState({} as PetDetaisl);
  const [handleViewComponent, setHandleViewComponent] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAutorizationModalOpen, setAutorizationModalOpen] = useState(false);
  const [reloadData, setReloadData] = useState(false);
  function openModal() {
    setIsModalOpen(true);
  }
  function closeModal() {
    setIsModalOpen(false);
  }
  function openAutorizationModal() {
    setAutorizationModalOpen(true);
  }
  function closeAutorizationModal() {
    setAutorizationModalOpen(false);
  }

  const handleChangePet = async (newPetId: number) => {
    navigate(`/Vets/Workspace/${newPetId}`);
    setReloadData(true);
  };
  async function getPetDetails() {
    const response = await api.get(`/pets/${id}`);
    setPet(response.data);
  }

  useEffect(() => {
    getPetDetails();
  }, []);

  useEffect(() => {
    if (reloadData === true) {
      getPetDetails();
      setReloadData(false); // Reseta o estado para evitar chamadas infinitas
    }
  }, [reloadData]);

  let viewComponent;
  switch (true) {
    case handleViewComponent == "allPets":
      viewComponent = (
        <TableContainer overflowY="auto" height="100%">
          <Table>
            <Thead>
              <Tr>
                <Th>IR ATÉ PET</Th>
                <Th>NOME</Th>
              </Tr>
            </Thead>
            <Tbody>
              {pet.customerPets?.map((pets) => (
                <Tr key={pets.id}>
                  <Td>
                    <Button
                      onClick={() => handleChangePet(pets.id)}
                      colorScheme="whatsapp"
                    >
                      IR ATÉ O PET
                    </Button>
                  </Td>
                  <Td>{pets.name ? pets.name : "SEM OUTROS ANIMAIS"}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      );
      break;
    case handleViewComponent == "vaccines":
      viewComponent = (
        <TableContainer overflowY="auto" height="100%">
          <Table>
            <Thead>
              <Tr>
                <Th>DATA</Th>
                <Th>NOME</Th>
              </Tr>
            </Thead>
            <Tbody>
              {pet.vaccines?.map((vacine) => (
                <Tr key={vacine.id}>
                  <Td>{vacine.requestedDate.toString()}</Td>
                  <Td>{vacine.name}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      );
      break;
    case handleViewComponent == "surgeries":
      viewComponent = (
        <TableContainer>
          <Table>
            <Thead>
              <Tr>
                <Th>DATA</Th>
                <Th>NOME</Th>
              </Tr>
            </Thead>
            <Tbody>
              {pet.surgeries?.map((surgerie) => (
                <Tr key={surgerie.id}>
                  <Td>
                    {surgerie.completedDate
                      ? surgerie.completedDate.toString()
                      : "NÃO CONCLUIDA"}
                  </Td>
                  <Td>{surgerie.name}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      );
      break;
    default:
      viewComponent = (
        <>
          {" "}
          <h1>NADA A EXIBIR</h1>{" "}
        </>
      );
      break;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <ChakraProvider>
        <WorkSpaceContainer>
          <WorkSpaceHeader>
            <Flex
              justify="space-between"
              align="center"
              width="100%"
              height="100%"
            >
              <Flex align="center" gap="2">
                <Text m="2" fontSize="2xl" fontWeight="bold">
                  WorkSpace Veterinário
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
                  onClick={() => navigate("/Vets/Menu")}
                >
                  Voltar
                </Button>
              </Flex>

              <Flex flexWrap="wrap" justify="start" gap="2" m="4" p="2">
                <Button
                  onClick={() => openModal()}
                  height={8}
                  colorScheme="whatsapp"
                >
                  FORMULÁRIOS
                </Button>
                <Button
                  height={8}
                  colorScheme="whatsapp"
                  onClick={() => navigate(`/WorkSpace/Instructions/${id}`)}
                >
                  INSTRUÇÕES PROPRIETÁRIO
                </Button>
                <Button
                  height={8}
                  colorScheme="whatsapp"
                  onClick={() => openAutorizationModal()}
                >
                  AUTORIZAÇÕES
                </Button>
                <Button
                  height={8}
                  colorScheme="whatsapp"
                  onClick={() => navigate(`/WorkSpace/Protocols/${id}`)}
                >
                  PROTOCOLOS
                </Button>
                <Button
                  height={8}
                  colorScheme="whatsapp"
                  onClick={() => navigate(`/WorkSpace/Exam/${id}`)}
                >
                  EXAMES
                </Button>
                <Button
                  onClick={() => navigate(`/WorkSpace/Procedures/${id}`)}
                  height={8}
                  colorScheme="whatsapp"
                >
                  PROCEDIMENTOS
                </Button>
                <Button
                  height={8}
                  colorScheme="whatsapp"
                  onClick={() => navigate(`/WorkSpace/Vaccines/${id}`)}
                >
                  VACINAS
                </Button>
                <Button
                  height={8}
                  colorScheme="whatsapp"
                  onClick={() => navigate(`/WorkSpace/Surgeries/${id}`)}
                >
                  CIRURGIAS
                </Button>
                <Button
                  height={8}
                  colorScheme="whatsapp"
                  onClick={() => navigate(`/WorkSpace/Admissions/${id}`)}
                >
                  INTERNAR
                </Button>

                <Button
                  height={8}
                  onClick={() => navigate(`/Pets/MedicineRecord/${id}`)}
                  leftIcon={<MdPets />}
                  colorScheme="messenger"
                >
                  PRONTUÁRIO DO PET
                </Button>
              </Flex>
            </Flex>
          </WorkSpaceHeader>
          <WorkSpaceContent>
            <div className="div1">
              <Flex m="4" gap="2" direction="row">
                <VStack>
                  <Text
                    fontWeight="bold"
                    w="150px"
                    display="flex"
                    justifyContent="center"
                  >
                    Cliente
                  </Text>
                  <Text
                    fontWeight="bold"
                    w="150px"
                    display="flex"
                    justifyContent="center"
                  >
                    Gastos
                  </Text>
                  <Text
                    fontWeight="bold"
                    w="150px"
                    display="flex"
                    justifyContent="center"
                  >
                    Animal
                  </Text>
                  <Text
                    fontWeight="bold"
                    w="150px"
                    display="flex"
                    justifyContent="center"
                  >
                    Horário
                  </Text>
                  <Text
                    fontWeight="bold"
                    w="150px"
                    display="flex"
                    justifyContent="center"
                  >
                    Internações
                  </Text>
                  <Text
                    fontWeight="bold"
                    w="150px"
                    display="flex"
                    justifyContent="center"
                  >
                    Plano de Saúde
                  </Text>
                </VStack>
                <VStack w="100%">
                  <Text
                    border="1px"
                    width="100%"
                    rounded="4px"
                    fontWeight="bold"
                    textAlign="center"
                    bgColor="gray.100"
                  >
                    {pet.customerName}
                  </Text>
                  <Text
                    width="100%"
                    border="1px"
                    rounded="4px"
                    fontWeight="bold"
                    textAlign="center"
                    bgColor="gray.100"
                  >
                    {new Intl.NumberFormat("pt-BR", {
                      currency: "BRL",
                      style: "currency",
                    }).format(pet.balance)}
                  </Text>
                  <Text
                    width="100%"
                    border="1px"
                    rounded="4px"
                    fontWeight="bold"
                    textAlign="center"
                    bgColor="gray.100"
                    cursor="pointer"
                    onClick={() =>
                      navigate(`/Recepcao/Consultas/Clientes/Pets/Edit/${id}`)
                    }
                  >
                    {`${pet.name}, ${pet.race}`}
                  </Text>

                  <Text
                    width="100%"
                    border="1px"
                    rounded="4px"
                    fontWeight="bold"
                    textAlign="center"
                    bgColor="gray.100"
                  >
                    {`${pet.sexo}, ${pet.weigth}`}
                  </Text>
                  {pet.isBusy === true ? (
                    <Text
                      width="100%"
                      border="1px"
                      rounded="4px"
                      fontWeight="bold"
                      textAlign="center"
                      bgColor="red.200"
                    >
                      ANIMAL ESTÁ INTERNADO
                    </Text>
                  ) : (
                    <Text
                      width="100%"
                      border="1px"
                      rounded="4px"
                      fontWeight="bold"
                      textAlign="center"
                      bgColor="green.100"
                    >
                      ANIMAL NÃO SE ENCONTRA INTERNADO
                    </Text>
                  )}
                  <Select
                    border="1px"
                    height="26px"
                    width="100%"
                    rounded="4px"
                    fontWeight="bold"
                    textAlign="center"
                    bgColor="gray.100"
                    placeholder="Selecione uma Opção"
                  >
                    <option value="option1">Não tenho plano de saúde</option>
                    <option value="option2">Pet Love</option>
                  </Select>
                </VStack>
              </Flex>
              <Flex direction="column" mx="4">
                <Text fontSize="md" mx="2" mt="0" fontWeight="bold">
                  Observações
                </Text>
                <Textarea
                  color="red.900"
                  borderColor="black"
                  value={pet.queue?.moreInfos}
                ></Textarea>
              </Flex>
            </div>
            <Flex direction="column" className="div2">
              <Flex
                backgroundColor="cyan.100"
                w="100%"
                h="48px"
                direction="row"
                align="center"
                justify="center"
              >
                <Text mr="1">Exames - </Text>
                <Text mr="2" color="red">
                  Vermelho: Por fazer{" "}
                </Text>
                /
                <Text ml="2" color="green">
                  Verde: pronto
                </Text>
              </Flex>

              <Flex m="2" direction="column" gap="2" overflow="auto">
                {pet.exams ? (
                  pet.exams.map((exam) => (
                    <Flex
                      key={exam.id}
                      w="100%"
                      backgroundColor="gray.100"
                      p="2"
                      justify="space-between"
                    >
                      <>
                        {exam.doneExam === true ? (
                          <Text color="green.400" fontWeight="bold">
                            {exam.name}
                          </Text>
                        ) : (
                          <Text color="red.400" fontWeight="bold">
                            {exam.name}
                          </Text>
                        )}
                      </>
                      <Text>{exam.requestedData}</Text>
                    </Flex>
                  ))
                ) : (
                  <Text>Sem exame Solicitado</Text>
                )}
              </Flex>
            </Flex>
            <div className="div3">
              <HStack spacing={4} m="2" w="100%">
                <Button w="25%" colorScheme="whatsapp">
                  Diagnóstico
                </Button>
                <Button w="25%" colorScheme="whatsapp">
                  Prescrição
                </Button>
                <Button w="25%" colorScheme="whatsapp">
                  Sintomas
                </Button>
                <Button w="25%" colorScheme="whatsapp">
                  Solicitar Exame
                </Button>
              </HStack>
              <Textarea
                border="1px"
                minHeight={220}
                m="2"
                maxWidth="100%"
              ></Textarea>
            </div>
            <div className="div4">
              <Flex justify="space-between" gap="2" m="2">
                <Button
                  leftIcon={<MdPets />}
                  height={8}
                  colorScheme="whatsapp"
                  w="33%"
                  py="5"
                  onClick={() => setHandleViewComponent("allPets")}
                >
                  Outros Animais
                </Button>
                <Button
                  leftIcon={<TbMedicalCrossFilled />}
                  height={8}
                  colorScheme="whatsapp"
                  w="33%"
                  py="5"
                  onClick={() => setHandleViewComponent("vaccines")}
                >
                  Vacinas
                </Button>
                <Button
                  leftIcon={<AiFillMedicineBox />}
                  height={8}
                  colorScheme="whatsapp"
                  w="33%"
                  py="5"
                  onClick={() => setHandleViewComponent("surgeries")}
                >
                  Cirurgias
                </Button>
              </Flex>

              <Flex
                width="100%"
                maxHeight="800px"
                m="2"
                direction="column"
                gap="2"
                overflowY="auto"
              >
                {viewComponent}
              </Flex>
            </div>
          </WorkSpaceContent>
          <WorkSpaceFooter>
            <Flex
              justify="space-evenly"
              align="center"
              width="100%"
              height="100%"
              px="2"
            >
              <Button colorScheme="teal" w="25%" mr="3" py="6">
                Imprimir Receita
              </Button>
              <Button colorScheme="whatsapp" w="25%" mr="3" py="6">
                Imprimir Raio-X
              </Button>
              <Button colorScheme="whatsapp" w="25%" mr="3" py="6">
                Imprimir Solicitação Exames
              </Button>
              <Button colorScheme="red" w="25%" py="6">
                Gravar Alterações
              </Button>
            </Flex>
          </WorkSpaceFooter>
        </WorkSpaceContainer>
        <GenericModal isOpen={isModalOpen} onRequestClose={closeModal}>
          <Flex direction="column" gap="4" border="2px" m="4" p="4" rounded={8}>
            <Button colorScheme="whatsapp">
              FICHA ANESTÉSICA PERSONALIZADA
            </Button>
            <Button colorScheme="whatsapp">FICHA ANESTÉSICA TOMOGRAFIA</Button>

            <Button colorScheme="whatsapp">FICHA DE PARÂMETROS</Button>
            <Button colorScheme="whatsapp">FICHA DE MEDICAÇÃO</Button>
          </Flex>
        </GenericModal>

        <GenericModal
          isOpen={isAutorizationModalOpen}
          onRequestClose={closeAutorizationModal}
        >
          <Flex direction="column" align="center" gap="8">
            <Text fontWeight="bold" fontSize="2xl">
              {pet.name}
            </Text>
            <Select
              bgColor="gray.100"
              borderColor="black"
              placeholder="Selecione a Autorização"
            >
              <option value="option1">Option 1 </option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </Select>
            <WorkVetAutorization />
          </Flex>
        </GenericModal>
      </ChakraProvider>
    </motion.div>
  );
}
