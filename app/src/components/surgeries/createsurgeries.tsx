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
} from "@chakra-ui/react";
import { useState } from "react";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";
import { useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { ConsultsPetDetails, PetDetaisl } from "../../interfaces";
import { api } from "../../lib/axios";
import { LoadingSpinner } from "../Loading";

interface SugeriesProps {
  id: number;
  name: string;
  price: number | string;
}

type SurgerieVetProps = {
  InAdmission: boolean;
  admissionQueueId?: string;
};

export interface SurgerieCentral {
  id: number;
  centralName: string;
  closedHours: string;
  openHours: string;
  isOpen: boolean;
  maxSlots: number;
  surgerieSlots: Array<{
    id: number;
    petName: string;
    petId: number;
    surgerieName: string;
    vetName: string;
    vetCrmv: string;
    surgeriesCentralId: number;
  }>;
}

interface ConsultsPetDetailsSurgeries extends ConsultsPetDetails {
  idConsult: number;
}

export function Createsurgeries({
  InAdmission,
  admissionQueueId,
}: SurgerieVetProps) {
  const [petDetails, setPetDetails] = useState({} as PetDetaisl);
  const [sugeries, setSugeries] = useState<SugeriesProps[]>([]);
  const [pagination, setPagination] = useState(1);
  const user = JSON.parse(localStorage.getItem("user") as string);
  const [surgerieCentral, setSurgerieCentral] = useState({} as SurgerieCentral);
  const { id, queueId } = useParams<{ id: string; queueId: string }>();
  const [surgerieName, setSurgerieName] = useState("");
  const [selectedCentral, setSelectedCentral] = useState(0);
  const [dateSurgery, setDateSurgery] = useState(new Date());
  const [paginationInfos, setPaginationInfos] = useState({
    totalPages: 0,
    currentPage: 0,
    totalProceds: 0,
  });
  const [consultDetails, setConsultDetails] = useState(
    {} as ConsultsPetDetailsSurgeries
  );
  const queryClient = useQueryClient();

  function incrementPage() {
    setPagination((prevCount) =>
      pagination < paginationInfos.totalPages
        ? prevCount + 1
        : paginationInfos.totalPages
    );
  }

  function decrementPage() {
    setPagination((prevCount) => (pagination > 1 ? prevCount - 1 : 1));
  }
  async function getSurgeriesData() {
    const pet = await api.get(`/pets/${id}`);
    setPetDetails(pet.data);
    const sugeries = await api.get(
      `/surgeries?page=${pagination}&sex=${petDetails.sexo}`
    );
    setSugeries(sugeries.data.surgeries);
  }
  async function getQueueDetails() {
    const response = await api.get(`/queue/details/${queueId}`);
    setConsultDetails(response.data);
  }

  async function getSurgerieByLetter(letter: string) {
    const response = await api.get(`/surgerie/letter/${letter}/${pagination}`);
    setSugeries(response.data.surgeries);
  }

  async function getSurgerieByName() {
    const response = await api.get(
      `/surgerie/name/${surgerieName}/${pagination}`
    );
    setSugeries(response.data.surgeries);
  }

  async function getProcedureByHealthInsurance() {
    const response = await api.get(
      `/surgerie/health/${consultDetails.healthInsuranceName}/${pagination}`
    );
    setSugeries(response.data.surgeries);
    setPaginationInfos({
      currentPage: response.data.currentPage,
      totalPages: response.data.totalPages,
      totalProceds: response.data.totalProceds,
    });
  }

  async function getCentralSurgeries(): Promise<SurgerieCentral[]> {
    const response = await api.get("/surgeries/central");
    return response.data.centralSurgerie;
  }

  async function getCentralSurgerieById() {
    const response = await api.get(`/surgeries/central/${selectedCentral}`);
    setSurgerieCentral(response.data.centralSurgerie);
  }

  const { refetch: refetchGetCentralSurgerieById } = useQuery({
    queryKey: "getCentralSurgerieById",
    queryFn: getCentralSurgerieById,
    enabled: false,
  });

  async function setSugeriesInPet(surgerieId: number) {
    try {
      let slotFound = false;
      let hasSurgerie = false;

      const reservedSlot = surgerieCentral?.surgerieSlots?.map(
        (slot, index) => {
          if (
            !slot.petName?.includes(petDetails?.name) ||
            !slot.petId?.toString().includes(petDetails?.id?.toString())
          ) {
            return null;
          }
          slotFound = true;
          return slot;
        }
      );

      petDetails.surgeries.map((surgerie) => {
        if (
          surgerie.name == reservedSlot.find((s) => s?.id != null)?.surgerieName
        ) {
          hasSurgerie = true;
        }
      });

      if (!slotFound) {
        toast.warning("Reserve ao menos 1 slot para cirurgia");
        return;
      }

      if (hasSurgerie) {
        toast.warning("Animal já possui cirurgia em andamento");
        return;
      }

      const data = {
        dateSurgerie: dateSurgery,
        RequestedByVetId: user.id,
        RequestedByVetName: user.consultName,
        isAdmission: InAdmission,
        slotId: reservedSlot.find((s) => s?.id != null)?.id,
      };

      if (InAdmission === true) {
        await api.post(
          `surgeries/${surgerieId}/${petDetails.id}/${petDetails.totalAcc.id}/${admissionQueueId}`,
          data
        );
        queryClient.invalidateQueries("surgeriesData");
        toast.success("Cirurgia adicionada - Internações");
        refetchGetCentralSurgerieById();
      } else {
        await api.post(
          `surgeries/${surgerieId}/${petDetails.id}/${petDetails.totalAcc.id}/${queueId}`,
          data
        );
        queryClient.invalidateQueries("surgeriesData");
        toast.success("Cirurgia adicionada - Veterinários");
        refetchGetCentralSurgerieById();
      }
    } catch (error) {
      console.log(error);
      toast.error("Falha ao cadastrar Cirurgia!");
    }
  }
  const { data: centralSurgeries, refetch } = useQuery({
    queryKey: "centralSurgeries",
    queryFn: getCentralSurgeries,
    onSuccess: (data) => {
      if (selectedCentral === 0 && data.length > 0) {
        setSelectedCentral(data[0].id);
      }
    },
    refetchOnWindowFocus: false,
  });

  const handleDeleteSugerie = async (
    slotId: number,
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
            `/petsurgery/${slotId}/${petDetails.totalAcc.id}/${sugPrice}/${linkedConsultId}`
          )
          .then((res) => {
            queryClient.invalidateQueries("surgeriesData");
            refetchGetCentralSurgerieById();
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

  const { isLoading, refetch: refetchGetSurgeriesData } = useQuery("surgeriesData", getSurgeriesData);

  async function reserveSurgerieSlot(slotId: number) {
    try {
      let slotFound = false;

      surgerieCentral?.surgerieSlots.map((slot, index) => {
        if (
          !slot.petName?.includes(petDetails?.name) ||
          !slot.petId?.toString().includes(petDetails?.id?.toString())
        ) {
          return null;
        } else {
          slotFound = true;
        }
      });

      if (!slotFound) {
        const data = {
          slotId: slotId,
          petName: petDetails.name,
          petId: petDetails.id,
          vetName: user.consultName,
          vetCrmv: user.crm,
        };

        await api.put("/surgeries/central/reserve", data);
        refetch();
        toast.success("Reserva efetuada com sucesso!");
      } else {
        toast.warning("Animal já possui reserva!");
      }
    } catch (error) {
      toast.error("Falha ao efetuar reserva!");
    }
  }

  async function handleClearFilter() {
    setSurgerieName("");
    setPagination(1);
    refetchGetSurgeriesData();
  }

  useQuery("queueDetails", getQueueDetails);
  const SearchAlfabet = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ];

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <ChakraProvider>
      <Flex w="100vw" h="100vh">
        <Flex
          color="black"
          direction="column"
          w="70vw"
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
                              surgerie.slotId,
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
            <HStack px={2} py={1} spacing={2}>
              {SearchAlfabet.map((letter) => (
                <Button
                  _hover={{
                    bgColor: "green.300",
                  }}
                  colorScheme="whatsapp"
                  onClick={() => getSurgerieByLetter(letter)}
                  fontWeight="bold"
                  fontSize="22px"
                >
                  {letter.toUpperCase()}
                </Button>
              ))}
            </HStack>
            <Flex bg="gray.200" py="2" justify="center">
              <Flex w={"full"} px={2} gap={2}>
                {consultDetails?.healthInsuranceId ? (
                  <Button
                    onClick={() => getProcedureByHealthInsurance()}
                    colorScheme="whatsapp"
                    w="300px"
                  >
                    Plano de Saúde
                  </Button>
                ) : (
                  <></>
                )}
                <Input
                  borderColor="black"
                  bg="white"
                  value={surgerieName}
                  name="name"
                  placeholder="Nome da cirurgia"
                  onChange={(ev) => {
                    setSurgerieName(ev.target.value);
                    getSurgerieByName();
                  }}
                />
                <Button
                  onClick={() => handleClearFilter()}
                  color="white"
                  w={260}
                  colorScheme="whatsapp"
                >
                  Limpar Filtros
                </Button>
                <HStack>
                  <Button colorScheme="teal">
                    Páginas{" "}
                    {paginationInfos?.totalPages
                      ? paginationInfos?.totalPages
                      : 1}
                  </Button>
                  <Button colorScheme="teal">
                    Página Atual{" "}
                    {paginationInfos?.currentPage
                      ? paginationInfos?.currentPage
                      : 1}
                  </Button>
                  <Button
                    colorScheme="yellow"
                    gap={4}
                    onClick={() => decrementPage()}
                  >
                    <BiLeftArrow />
                    Página Anterior
                  </Button>
                  <Button
                    colorScheme="yellow"
                    gap={4}
                    onClick={() => incrementPage()}
                  >
                    Próxima Página
                    <BiRightArrow />
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

        <Flex direction="column" w="30vw" border="1px solid black">
          <Text
            bg="gray.700"
            fontSize="2xl"
            fontWeight="bold"
            color="white"
            pl="2"
            py="2"
          >
            ID da Consulta {consultDetails?.idConsult}
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
                w="14.4rem"
              >
                C. Cirúrgico
              </Text>
              <Select
                onChange={(ev) => setSelectedCentral(Number(ev.target.value))}
                borderColor="black"
                rounded="0"
                fontWeight="bold"
                bg="white"
              >
                {centralSurgeries?.map((central) => (
                  <option key={central.id} value={central.id}>
                    {central.centralName}
                  </option>
                ))}
              </Select>
            </Flex>
            <Flex align="center">
              <Text
                border="1px solid black"
                borderRight="2px solid black"
                fontWeight="bold"
                pl="5"
                py="1"
                w="14.4rem"
              >
                Data
              </Text>
              <Input
                borderColor="black"
                rounded="0"
                fontWeight="bold"
                bg="white"
                type="date"
                onChange={(ev) => setDateSurgery(new Date(ev.target.value))}
                defaultValue={new Date().toISOString().split("T")[0]}
              />
            </Flex>
          </Flex>
          <Button
            onClick={() => refetchGetCentralSurgerieById()}
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
            <Table>
              <Thead>
                <Tr bg="gray.200">
                  <Th color="black" pl="2" border="1px " w="10vw">
                    Slot
                  </Th>
                  <Th color="black" pl="2" border="1px" w="10vw">
                    Animal
                  </Th>
                  <Th color="black" pl="2" border="1px" w="10vw">
                    Cirurgia
                  </Th>
                  <Th color="black" pl="2" border="1px" w="10vw">
                    Incluir
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {surgerieCentral ? (
                  surgerieCentral?.surgerieSlots
                    ?.sort((slotA, slotB) => slotA.id - slotB.id)
                    ?.map((slot, index) => (
                      <Tr key={slot.id} bg="green.100">
                        <Td pl="2" border="1px solid black" w="10vw">
                          {index + 1}
                        </Td>
                        <Td pl="2" border="1px solid black" w="10vw">
                          {slot?.petName}
                        </Td>
                        <Td pl="2" border="1px solid black" w="10vw">
                          {slot?.surgerieName}
                        </Td>
                        <Td pl="2" border="1px solid black" w="10vw">
                          <Button
                            onClick={() => reserveSurgerieSlot(slot.id)}
                            w="90%"
                            colorScheme="facebook"
                          >
                            Reservar
                          </Button>
                        </Td>
                      </Tr>
                    ))
                ) : (
                  <Tr bg="green.100">
                    <Td pl="2" border="1px solid black" w="10vw">
                      1
                    </Td>
                    <Td pl="2" border="1px solid black" w="10vw">
                      -
                    </Td>
                    <Td pl="2" border="1px solid black" w="10vw">
                      -
                    </Td>
                  </Tr>
                )}
              </Tbody>
            </Table>
          </Flex>
        </Flex>
      </Flex>
    </ChakraProvider>
  );
}
