import {
  Button,
  ChakraProvider,
  Checkbox,
  Flex,
  HStack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { BiHome } from "react-icons/bi";
import { TbArrowBack } from "react-icons/tb";
import { QueryClient, useQuery } from "react-query";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Input } from "../../../components/admin/Input";
import { LoadingSpinner } from "../../../components/Loading";
import { PetDetaisl } from "../../../interfaces";
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
  const [vaccines, setVaccines] = useState<VaccinesProps[]>([]);
  const [pagination, setPagination] = useState(1)
  const [vaccineName, setVaccineName] = useState("")
  const navigate = useNavigate();
  const { id, queueId } = useParams<{ id: string; queueId: string }>();
  const queryClient = new QueryClient()
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
      const vaccines = await api.get("/vaccines");
      const pet = await api.get(`/pets/${id}`);
      setPetDetails(pet.data);
      setVaccines(vaccines.data);
    } catch (error) {
      console.log(error);
    }
  }


  const {isLoading} = useQuery('vaccinesSet', GetVaccine)

  if(isLoading) {
    return <LoadingSpinner/>
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
        queryClient.invalidateQueries('vaccinesSet')
        toast.success("Vacina criada com Sucesso");
      } else {
        await api.post(
          `/vaccinepet/${vaccineId}/${petDetails.id}/${petDetails.totalAcc.id}/${queueId}`,
          data
        );
      
        queryClient.invalidateQueries('vaccinesSet')

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
          
        queryClient.invalidateQueries('vaccinesSet')

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
    const response = await api.get(`/vaccines/${letter}/${pagination}`)
    setVaccines(response.data.vaccines);
  }

  async function getVaccinesByName() {
    const response = await api.get(`/vaccines/${vaccineName}/${pagination}`)
    setVaccines(response.data.vaccines);
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
          <Flex direction="column" height="100%" width="60%" bgColor="gray.100">
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
            <Flex height="70%" width="100" direction="column">
              <Flex
                width="100%"
                height="48px"
                bgColor="gray.300"
                p="2"
                align="center"
                justify="center"
              >
       
                <Flex align="center" gap="2" p="4">
                  <Button onClick={() => getVaccinesByName()} colorScheme="teal">FILTRAR</Button>
                  <Input  name="filter" onChange={(ev) => setVaccineName(ev.target.value)} placeholder="Nome da Vacina" />
                </Flex>
    
              </Flex>
              <HStack spacing={2} w="600px">
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
          <Flex height="100%" width="40%" bgColor="gray.200" direction="column">
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
