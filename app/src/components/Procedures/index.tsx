import {
  Flex,
  Table,
  Tr,
  Td,
  Th,
  Thead,
  Tbody,
  TableContainer,
  Button,
  HStack,
  InputGroup,
  InputLeftElement,
  Input,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { ConsultsPetDetails, PetDetaisl } from "../../interfaces";
import { api } from "../../lib/axios";

interface ProceduresProps {
  id: number;
  name: string;
  price: number;
  priceTwo?: number;
  priceThree?: number;
  priceFour?: number;
  requestedDate: any;
  appicableEspecies?: Array<{
    id?: number;
    name: string;
  }>;
}

type ProceduresAdmissionProps = {
  InAdmission: boolean;
  admissionQueueId?: string;
};

export default function ProceduresVets({
  InAdmission,
  admissionQueueId,
}: ProceduresAdmissionProps) {
  const { id, queueId } = useParams<{ id: string; queueId: string }>();
  const [procedures, setProcedures] = useState<ProceduresProps[]>([]);
  const [query, setQuery] = useState("");
  const [petDetails, setPetDetails] = useState({} as PetDetaisl);
  const [reloadData, setReloadData] = useState(false);
  const user = JSON.parse(localStorage.getItem("user") as string);
  const [pagination, SetPagination] = useState(1)
  const [consultDetails, setConsultDetails] = useState(
    {} as ConsultsPetDetails
  );
  const [paginationInfos, setPaginationInfos] = useState({
    totalPages: 0,
    currentPage: 0,
    totalProceds: 0
  })
  function incrementPage() {
    SetPagination(prevCount => pagination < paginationInfos.totalPages ? prevCount + 1 : paginationInfos.totalPages);
  }

  function decrementPage() {
    SetPagination(prevCount => pagination > 1 ? prevCount - 1 : 1);
  }

  async function GetPet() {
    const pet = await api.get(`/pets/${id}`);
    setPetDetails(pet.data);
  }

  async function getQueueDetails() {
    const response = await api.get(`/queue/details/${queueId}`)
    setConsultDetails(response.data)
  }


 useQuery('queueDetails', getQueueDetails)

  async function GetData() {
    switch (true) {
      case query.length >= 1:
        const response = await api.get(
          `/procedures/query?q=${query}&sex=${petDetails.sexo}&page=${pagination}`
        );
        setProcedures(response.data.procedures);
        setPaginationInfos({
          currentPage: response.data.currentPage,
          totalPages: response.data.totalPages,
          totalProceds: response.data.totalProceds,
        });
        setReloadData(true);
        break;
      default:
        const procedures = await api.get(`/procedures?sex=${petDetails.sexo}&page=${pagination}`);
        setProcedures(procedures.data.procedures);
        setPaginationInfos({
          currentPage: procedures.data.currentPage,
          totalPages: procedures.data.totalPages,
          totalProceds: procedures.data.totalProceds,
        });
        break;
    }
  }

  async function setProcedureInPet(procedureId: number) {
    try {
      const data = {
        RequestedByVetId: user.id,
        RequestedByVetName: user.consultName,
        InAdmission,
      };

      const validateEspecie = procedures
        .find((p) => p.id === procedureId)
        ?.appicableEspecies?.some((e) => e.name === petDetails.especie);



      if (validateEspecie === false) {
        return toast.warning(
          "Essa especie não e permitida para esse procedimento!"
        );
      }

      if (InAdmission === true) {
        await api.post(
          `/procedures/${procedureId}/${petDetails.id}/${petDetails.totalAcc.id}/${admissionQueueId}`,
          data
        );
        setReloadData(true);
        toast.success("Procedimento incluido - Internação");
      } else {
        await api.post(
          `/procedures/${procedureId}/${petDetails.id}/${petDetails.totalAcc.id}/${queueId}`,
          data
        );
        setReloadData(true);
        toast.success("Procedimento incluido - Veterinários");
      }
    } catch (error) {
      console.log(error);
      toast.error("Falha ao acrescentar novo procedimento!!");
    }
  }

  async function deleteProcedure(
    ProcedureId: string | number,
    ProcedurePrice: string | number,
    linkedDebitId: number | null
  ) {
    try {
      const confirmation = window.confirm(
        "DELETAR E UMA AÇÃO IRREVERSIVEL TEM CERTEZA QUE DESEJA CONTINUAR?"
      );

      if (confirmation === true) {
        await api.delete(
          `/petprocedure/${ProcedureId}/${petDetails.totalAcc.id}/${ProcedurePrice}/${linkedDebitId}`
        );
        setReloadData(true);
        toast.warning("Deletado com sucesso!");
      } else {
        return;
      }
    } catch (error) {
      toast.error("Falha ao Deletar!");
      console.log(error);
    }
  }


  async function getProcedureByHealthInsurance() {
    const response = await api.get(`/procedures/health/${consultDetails.healthInsuranceName}/${pagination}`)
    setProcedures(response.data.procedures);
    setPaginationInfos({
      currentPage: response.data.currentPage,
      totalPages: response.data.totalPages,
      totalProceds: response.data.totalProceds,
    });
  }
  useEffect(() => {
    GetData();
    GetPet();
  }, []);

  useEffect(() => {
    GetPet();
    GetData();
    setReloadData(false); // Reseta o estado para evitar chamadas infinitas
  }, [reloadData, query, pagination]);

  return (
    <>
      <Flex w="100%" height="45vh" align="center">
        <TableContainer w="100%" height="100%">
          <Table>
            <Thead>
              <Tr bgColor="cyan.100">
                <Th color="black" fontSize="1xl" border="2px" w="200px">
                  Quantidade
                </Th>
                <Th color="black" fontSize="1xl" border="2px" w="200px">
                  Procedimentos
                </Th>
                <Th color="black" fontSize="1xl" border="2px" w="200px">
                  Unitário
                </Th>
                <Th color="black" fontSize="1xl" border="2px" w="200px">
                  Total
                </Th>

                <Th color="black" fontSize="1xl" border="2px" w="200px">
                  Data
                </Th>
                <Th color="black" fontSize="1xl" border="2px" w="200px">
                  Compor
                </Th>
                <Th color="black" fontSize="1xl" border="2px" w="200px">
                  Exclusão
                </Th>
              </Tr>
            </Thead>

            <Tbody>
              {petDetails.procedures?.map((procedure) => (
                <Tr key={procedure.id}>
                  <Td
                    border="2px"
                    fontSize="1xl"
                    fontWeight="bold"
                    color="green.700"
                  >
                    1
                  </Td>
                  <Td border="2px" fontSize="1xl" fontWeight="bold">
                    {procedure.name}
                  </Td>
                  <Td border="2px" fontSize="1xl" fontWeight="bold">
                    R$ {procedure.price}
                  </Td>
                  <Td border="2px" fontSize="1xl" fontWeight="bold">
                    R$ {procedure.price}
                  </Td>

                  <Td border="2px" fontSize="1xl" fontWeight="bold">
                    {new Intl.DateTimeFormat().format(procedure.requestedDate)}
                  </Td>
                  <Td border="2px" fontSize="1xl" fontWeight="bold">
                    --
                  </Td>
                  <Td border="2px" fontSize="1xl" fontWeight="bold">
                    <Button
                      onClick={() => {
                        // excludeProcedureInPet(procedure.id, procedure.price);
                        deleteProcedure(
                          procedure.id,
                          procedure.price,
                          procedure.linkedConsultId
                        );
                      }}
                      colorScheme="red"
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
      <Flex w="100%" height="55vh" direction="column">
        <Flex
          height="48px"
          w="100%"
          bgColor="cyan.100"
          align="center"
          justify="center"
          gap={4}
          overflowY="auto"
        >
          <HStack>
      
                {
                  consultDetails ? <Button onClick={() => getProcedureByHealthInsurance()} colorScheme="whatsapp" w="300px">Plano de Saúde</Button> : <></>
                }
            <Button colorScheme="teal" w="300px">
              Pesquisar
            </Button>
          
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <AiOutlineSearch />
              </InputLeftElement>
              <Input
                border="1px"
                bgColor="white"
                name="query"
                placeholder="Nome do Procedimento"
                value={query}
                onChange={(ev) => setQuery(ev.target.value)}
              />
            </InputGroup>
            <HStack>
              <Button colorScheme="teal">
                Total de Procedimentos {paginationInfos?.totalProceds}
              </Button>
              <Button colorScheme="teal">
                Páginas {paginationInfos?.totalPages}
              </Button>
              <Button colorScheme="teal">
                Página Atual {paginationInfos?.currentPage}
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
          </HStack>
        </Flex>
        <TableContainer w="100%" height="100%" overflowY="auto">
          <Table>
            <Thead>
              <Tr>
                <Th
                  color="black"
                  bgColor="whatsapp.100"
                  fontSize="1xl"
                  border="2px"
                >
                  NOME - PARTICULAR
                </Th>
                <Th color="black" fontSize="1xl" border="2px" w="200px">
                  ATÉ 6KG
                </Th>
                <Th color="black" fontSize="1xl" border="2px" w="200px">
                  Entre 7 e 15KG
                </Th>
                <Th color="black" fontSize="1xl" border="2px" w="200px">
                  Entre 16 e 35KG
                </Th>
                <Th color="black" fontSize="1xl" border="2px" w="200px">
                  ACIMA DE 35KG
                </Th>
                <Th color="black" fontSize="1xl" border="2px" w="200px">
                  INCLUIR
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {procedures.map((procedure: ProceduresProps) => (
                <Tr key={procedure.id}>
                  <Td border="2px">{procedure.name}</Td>
                  <Td border="2px">
                    {new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(Number(procedure?.price))}
                  </Td>
                  <Td border="2px">
                    {new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(Number(procedure?.priceTwo))}
                  </Td>
                  <Td border="2px">
                    {new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(Number(procedure?.priceThree))}
                  </Td>
                  <Td border="2px">
                    {new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(Number(procedure?.priceFour))}
                  </Td>
                  <Td border="2px">
                    <Button
                      colorScheme="whatsapp"
                      onClick={() => {
                        // console.log(procedure.id);
                        setProcedureInPet(procedure.id);
                      }}
                    >
                      Incluir Procedimento
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Flex>
    </>
  );
}
