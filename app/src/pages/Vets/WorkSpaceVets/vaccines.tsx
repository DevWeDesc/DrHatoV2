import {
  Button,
  ChakraProvider,
  Flex,
  HStack,
  Input,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BiHome, BiLeftArrow, BiRightArrow } from "react-icons/bi";
import { TbArrowBack } from "react-icons/tb";
import { QueryClient, useQuery } from "react-query";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { LoadingSpinner } from "../../../components/Loading";
import { ConsultsPetDetails, PetDetaisl } from "../../../interfaces";
import { api } from "../../../lib/axios";

interface VaccinesProps {
  id: number;
  name: string;
  price: number;
  description: string;
}

type VaccineComponentProps = {
  InAdmission?: boolean;
  admissionQueueId?: string;
};

export function Vaccines({
  InAdmission,
  admissionQueueId,
}: VaccineComponentProps) {
  const [petDetails, setPetDetails] = useState({} as PetDetaisl);
  const [consultDetails, setConsultDetails] = useState(
    {} as ConsultsPetDetails
  );
  const [vaccines, setVaccines] = useState<VaccinesProps[]>([]);
  const [pagination, setPagination] = useState(1);
  const [paginationInfos, setPaginationInfos] = useState({
    totalPages: 0,
    currentPage: 0,
    totalProceds: 0,
  });
  const [vaccineName, setVaccineName] = useState("");
  const navigate = useNavigate();
  const { id, queueId } = useParams<{ id: string; queueId: string }>();
  const queryClient = new QueryClient();
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
  const user = JSON.parse(localStorage.getItem("user") as string);
  async function GetVaccine() {
    try {
      const vaccines = await api.get(`/vaccines?sex=${petDetails.sexo}`);
      const pet = await api.get(`/pets/${id}`);
      setPetDetails(pet.data);
      setVaccines(vaccines.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function getQueueDetails() {
    const response = await api.get(`/queue/details/${queueId}`);
    setConsultDetails(response.data);
  }

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

  const { isLoading, refetch } = useQuery("vaccinesSet", GetVaccine);
  useQuery("queueDetails", getQueueDetails);

  useEffect(() => {
    switch (true) {
      case vaccineName.length >= 1:
        getVaccinesByName();
        break;
      default:
        refetch();
        break;
    }
  }, [vaccineName]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  async function setVaccineInPet(vaccineId: number) {
    try {
      const data = {
        VetId: user.id,
        RequestedByVetName: user.consultName,
        RequestedCrm: user.crm,
        isAdmission: InAdmission,
        // RequestedByVetId: user.id,
        // RequestedByVetName: user.consultName,
        // InAdmission: InAdmission,
      };
      if (InAdmission) {
        await api.post(
          `/vaccinepet/${vaccineId}/${petDetails.id}/${petDetails.totalAcc.id}/${admissionQueueId}`,
          data
        );
        queryClient.invalidateQueries("vaccinesSet");
        toast.success("Vacina criada com Sucesso");
      } else {
        await api.post(
          `/vaccinepet/${vaccineId}/${petDetails.id}/${petDetails.totalAcc.id}/${queueId}`,
          data
        );

        refetch();

        toast.success("Vacina criada com Sucesso");
      }
    } catch (error) {
      toast.error("Falha ao cadastrar Vacina!");
    }
  }

  async function deleteVaccine(
    vaccineId: string | number,
    vaccPrice: string | number,
    linkedDebitId: number
  ) {
    try {
      const confirmation = window.confirm(
        "DELETAR E UMA AÇÃO IRREVERSIVEL TEM CERTEZA QUE DESEJA CONTINUAR?"
      );

      if (confirmation === true) {
        await api
          .delete(
            `petvaccine/${vaccineId}/${petDetails.totalAcc.id}/${vaccPrice}/${linkedDebitId}`
          )
          .then(() => {
            queryClient.invalidateQueries("vaccinesSet");
            refetch();
            toast.warning("Excluido com sucesso");
          });
      } else {
        return;
      }
    } catch (error) {
      toast.error("Falha ao Deletar!");
      console.log(error);
    }
  }

  async function getVaccinesByLetter(letter: string) {
    const response = await api.get(`/vaccines/${letter}/${pagination}?sex=${petDetails.sexo}`);
    setVaccines(response.data.vaccines);
  }

  async function getVaccinesByName() {
    const response = await api.get(`/vaccines/${vaccineName}/${pagination}?sex=${petDetails.sexo}`);
    setVaccines(response.data.vaccines);
  }

  async function getProcedureByHealthInsurance() {
    const response = await api.get(
      `/vaccines/health/${consultDetails.healthInsuranceName}/${pagination}`
    );
    setVaccines(response.data.vaccines);
    setPaginationInfos({
      currentPage: response.data.currentPage,
      totalPages: response.data.totalPages,
      totalProceds: response.data.totalProceds,
    });
  }

  return (
    <ChakraProvider>
      <Flex width="100vw" height="100vh" bgColor="white" direction="column">
        {!InAdmission && (
          <Flex w="100%" height="10vh" bgColor="gray.200">
            <Flex align="center" gap="2">
              <Text m="2" fontSize="2xl" fontWeight="bold">
                Vacinas
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
            </Flex>
          </Flex>
        )}

        <Flex height="90vh" w="100%">
          <Flex direction="column" height="100%" width="70%" bgColor="gray.100">
            <Flex height="40%" width="100%" direction="column">
              <TableContainer width="100%" height="100%" overflowY="auto">
                <Table>
                  <Thead>
                    <Tr>
                      <Th>DATA</Th>
                      <Th>Vacinas do Animal / Imprimir Programação</Th>
                      <Th>Valor</Th>
                      <Th>Compor</Th>
                      <Th>Exclusão</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    <Tr border="2px">
                      <Td></Td>
                      <Td></Td>
                      <Td></Td>
                      <Td></Td>
                      <Td></Td>
                    </Tr>
                  </Tbody>
                </Table>
              </TableContainer>
            </Flex>
            <Flex height="70%" width="100%" direction="column">
              <Flex
                width="100%"
                height="98px"
                direction="column"
                bgColor="gray.300"
                p="2"
                align="center"
                justify="center"
              >
                <Flex w={"full"} align="center" gap="2" p="2">
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
                  <Button
                    width={160}
                    onClick={() => getVaccinesByName()}
                    colorScheme="teal"
                  >
                    Particular
                  </Button>
                  <Input
                    bgColor="white"
                    name="filter"
                    onChange={(ev) => setVaccineName(ev.target.value)}
                    placeholder="Nome da Vacina"
                  />

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

                <HStack spacing={2} w="100%">
                  {SearchAlfabet.map((letter) => (
                    <Button
                      _hover={{
                        bgColor: "green.300",
                      }}
                      colorScheme="whatsapp"
                      onClick={() => getVaccinesByLetter(letter)}
                      fontWeight="bold"
                      fontSize="22px"
                    >
                      {letter.toUpperCase()}
                    </Button>
                  ))}
                </HStack>
              </Flex>

              <TableContainer
                w="100%"
                h="100%"
                overflowY="auto"
                textAlign="center"
              >
                <Table>
                  <Thead>
                    <Tr bgColor="cyan.100">
                      <Th>VACINAS</Th>
                      <Th>ATÉ 6KG</Th>
                      <Th>7 A 15KG</Th>
                      <Th>16 A 35KG</Th>
                      <Th>35KG +</Th>
                      <Th>Incluir Vacina</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {vaccines.map((vaccine) => (
                      <Tr key={vaccine.id}>
                        <Td>{vaccine.name}</Td>
                        <Td>
                          {new Intl.NumberFormat("pt-BR", {
                            currency: "BRL",
                            style: "currency",
                          }).format(vaccine?.price)}
                        </Td>
                        <Td>
                          {new Intl.NumberFormat("pt-BR", {
                            currency: "BRL",
                            style: "currency",
                          }).format(vaccine?.price)}
                        </Td>
                        <Td>
                          {new Intl.NumberFormat("pt-BR", {
                            currency: "BRL",
                            style: "currency",
                          }).format(vaccine?.price)}
                        </Td>
                        <Td>
                          {new Intl.NumberFormat("pt-BR", {
                            currency: "BRL",
                            style: "currency",
                          }).format(vaccine?.price)}
                        </Td>
                        <Td>
                          <Button
                            colorScheme="whatsapp"
                            onClick={() => {
                              // console.log(vaccine.id);
                              setVaccineInPet(vaccine.id);
                            }}
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
          <Flex height="100%" width="30%" bgColor="gray.200" direction="column">
            <Flex
              w="100%"
              bgColor="cyan.100"
              height="38px"
              align="center"
              justify="center"
            >
              <Text fontWeight="black" fontSize="lg">
                VACINAS DO ANIMAL
              </Text>
            </Flex>
            <Flex bgColor="white" height="100%" w="100%">
              <TableContainer height="100%" w="100%">
                <Table colorScheme="blackAlpha">
                  <Thead>
                    <Tr>
                      <Th>DATA SOLICITADA</Th>
                      <Th>VACINAS</Th>

                      <Th>Cancelar?</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {petDetails.vaccines?.map((vaccine) => (
                      <Tr key={vaccine.id}>
                        <Td>
                          {new Intl.DateTimeFormat("pt-BR").format(
                            new Date(vaccine?.requestedDate)
                          )}
                        </Td>
                        <Td>{vaccine.name}</Td>

                        <Td>
                          <Button
                            onClick={() => {
                              deleteVaccine(
                                vaccine.id,
                                vaccine.price,
                                vaccine.linkedConsultId
                              );
                            }}
                            w="89px"
                            colorScheme="red"
                          >
                            Excluir
                          </Button>
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </TableContainer>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </ChakraProvider>
  );
}
