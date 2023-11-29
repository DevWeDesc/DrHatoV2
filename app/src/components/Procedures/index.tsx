import React, { useContext } from "react";
import {
  ChakraProvider,
  Flex,
  Table,
  Tr,
  Td,
  Th,
  Thead,
  Tbody,
  TableContainer,
  Button,
  Checkbox,
  HStack,
} from "@chakra-ui/react";
import moment from "moment";
import { useEffect, useState } from "react";
import {  useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Input } from "../../components/admin/Input";
import { PetDetaisl } from "../../interfaces";
import { api } from "../../lib/axios";
import { UrlContext } from "../../contexts/UrlContext";

interface ProceduresProps {
  id: number;
  name: string;
  price: number;
  priceTwo?: number;
  priceThree?: number;
  priceFour?: number;
  requestedDate: any;
}

export default function ProceduresVets() {
  const { id, queueId } = useParams<{ id: string; queueId: string }>();
  const [procedures, setProcedures] = useState<ProceduresProps[]>([]);
  const [petDetails, setPetDetails] = useState({} as PetDetaisl);
  const [reloadData, setReloadData] = useState(false);
  const user = JSON.parse(localStorage.getItem("user") as string);
  const { url } = useContext(UrlContext);
  const navigate = useNavigate();
  async function GetPet() {
    const pet = await api.get(`/pets/${id}`);
    setPetDetails(pet.data);
  }
  async function GetData() {
    const procedures = await api.get("/procedures");
    setProcedures(procedures.data.procedures);
  }

  async function setProcedureInPet (procedureId: number)  {
    try {
      const data = {
        RequestedByVetId: user.id, 
        RequestedByVetName: user.consultName, 
      };

      await api.post(
        `/procedures/${procedureId}/${petDetails.id}/${petDetails.totalAcc.id}/${queueId}`, data
      );
      setReloadData(true);
      toast.success("Procedimento incluido com sucesso!!");
    } catch (error) {
      console.log(error);
      toast.error("Falha ao acrescentar novo procedimento!!");
    }
  };
  const excludeProcedureInPet = async (
    id: number,
    procedPrice: string | number
  ) => {
    try {
      const confirm = window.confirm(
        "EXCLUIR E UMA OPERAÇÃO IRREVERSIVEL TEM CERTEZA QUE DESEJA CONTINUAR?"
      );
      if (confirm === true) {
        await api.delete(
          `/proceduresfp/${id}/${petDetails.totalAcc.id}/${procedPrice}`
        );
        setReloadData(true);
        toast.success("Procedimento excluido com sucesso!!");
      } else {
        return;
      }
    } catch (error) {
      console.log(error);
      toast.error("Falha ao excluir procedimento!!");
    }
  };

  useEffect(() => {
    GetData();
    GetPet();
  }, []);

  useEffect(() => {
    if (reloadData === true) {
      GetPet();
      setReloadData(false); // Reseta o estado para evitar chamadas infinitas
    }
  }, [reloadData]);

  return (
    <>
      <Flex
        w="100%"
        height={url === `/Admissions/${id}` ? "" : "45vh"}
        align="center"
     
      >
        <TableContainer w="100%" height="100%" >
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
              {url === `/Admissions/${id}` ? (
                <>
                  {" "}
                  {petDetails.exams?.map((exams) => (
                    <Tr key={exams.id}>
                      <Td
                        border="2px"
                        fontSize="1xl"
                        fontWeight="bold"
                        color="green.700"
                      >
                        1
                      </Td>
                      <Td border="2px" fontSize="1xl" fontWeight="bold">
                        {exams.name}
                      </Td>
                      <Td border="2px" fontSize="1xl" fontWeight="bold">
                        R${exams.price}
                      </Td>
                      <Td border="2px" fontSize="1xl" fontWeight="bold">
                        Total{" "}
                        {/* {new Intl.DateTimeFormat().format(procedure.requestedDate)} */}
                      </Td>
                      <Td border="2px" fontSize="1xl" fontWeight="bold">
                        {exams.requestedData}
                      </Td>
                      <Td border="2px" fontSize="1xl" fontWeight="bold">
                        --
                      </Td>
                      <Td border="2px" fontSize="1xl" fontWeight="bold">
                        <Button
                          onClick={() =>
                            excludeProcedureInPet(exams.id, exams.price)
                          }
                          colorScheme="red"
                        >
                          EXCLUIR
                        </Button>
                      </Td>
                    </Tr>
                  ))}
                  {petDetails.surgeries?.map((surgeries) => (
                    <Tr key={surgeries.id}>
                      <Td
                        border="2px"
                        fontSize="1xl"
                        fontWeight="bold"
                        color="green.700"
                      >
                        1
                      </Td>
                      <Td border="2px" fontSize="1xl" fontWeight="bold">
                        {surgeries.name}
                      </Td>
                      <Td border="2px" fontSize="1xl" fontWeight="bold">
                        R${surgeries.price}
                      </Td>
                      <Td border="2px" fontSize="1xl" fontWeight="bold">
                        Total{" "}
                        {/* {new Intl.DateTimeFormat().format(procedure.requestedDate)} */}
                      </Td>
                      <Td border="2px" fontSize="1xl" fontWeight="bold">
                        {new Intl.DateTimeFormat("pt-BR", {
                          month: "2-digit",
                          day: "2-digit",
                        }).format(
                          new Date(
                            surgeries.scheduledDate != null
                              ? surgeries.scheduledDate
                              : "21/08/2023"
                          )
                        )}
                      </Td>
                      <Td border="2px" fontSize="1xl" fontWeight="bold">
                        --
                      </Td>
                      <Td border="2px" fontSize="1xl" fontWeight="bold">
                        <Button
                          onClick={() =>
                            excludeProcedureInPet(surgeries.id, surgeries.price)
                          }
                          colorScheme="red"
                        >
                          EXCLUIR
                        </Button>
                      </Td>
                    </Tr>
                  ))}
                  {petDetails.procedures?.map((procedures) => (
                    <Tr key={procedures.id}>
                      <Td
                        border="2px"
                        fontSize="1xl"
                        fontWeight="bold"
                        color="green.700"
                      >
                        1
                      </Td>
                      <Td border="2px" fontSize="1xl" fontWeight="bold">
                        {procedures.name}
                      </Td>
                      <Td border="2px" fontSize="1xl" fontWeight="bold">
                        R${procedures.price}
                      </Td>
                      <Td border="2px" fontSize="1xl" fontWeight="bold">
                        Total{" "}
                        {/* {new Intl.DateTimeFormat().format(procedure.requestedDate)} */}
                      </Td>
                      <Td border="2px" fontSize="1xl" fontWeight="bold">
                        21/08/2023
                      </Td>
                      <Td border="2px" fontSize="1xl" fontWeight="bold">
                        --
                      </Td>
                      <Td border="2px" fontSize="1xl" fontWeight="bold">
                        <Button
                          onClick={() =>
                            excludeProcedureInPet(
                              procedures.id,
                              procedures.price
                            )
                          }
                          colorScheme="red"
                        >
                          EXCLUIR
                        </Button>
                      </Td>
                    </Tr>
                  ))}
                  {petDetails.vaccines?.map((vaccines) => (
                    <Tr key={vaccines.id}>
                      <Td
                        border="2px"
                        fontSize="1xl"
                        fontWeight="bold"
                        color="green.700"
                      >
                        1
                      </Td>
                      <Td border="2px" fontSize="1xl" fontWeight="bold">
                        {vaccines.name}
                      </Td>
                      <Td border="2px" fontSize="1xl" fontWeight="bold">
                        R${vaccines.price}
                      </Td>
                      <Td border="2px" fontSize="1xl" fontWeight="bold">
                        Total{" "}
                        {/* {new Intl.DateTimeFormat().format(procedure.requestedDate)} */}
                      </Td>
                      <Td border="2px" fontSize="1xl" fontWeight="bold">
                        21/08/2023
                      </Td>
                      <Td border="2px" fontSize="1xl" fontWeight="bold">
                        --
                      </Td>
                      <Td border="2px" fontSize="1xl" fontWeight="bold">
                        <Button
                          onClick={() =>
                            excludeProcedureInPet(vaccines.id, vaccines.price)
                          }
                          colorScheme="red"
                        >
                          EXCLUIR
                        </Button>
                      </Td>
                    </Tr>
                  ))}
                </>
              ) : (
                <>
                  {" "}
                  {petDetails.procedures?.map((procedure: ProceduresProps) => (
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
                        {new Intl.DateTimeFormat().format(
                          procedure.requestedDate
                        )}
                      </Td>
                      <Td border="2px" fontSize="1xl" fontWeight="bold">
                        --
                      </Td>
                      <Td border="2px" fontSize="1xl" fontWeight="bold">
                        <Button
                          onClick={() =>
                            excludeProcedureInPet(procedure.id, procedure.price)
                          }
                          colorScheme="red"
                        >
                          EXCLUIR
                        </Button>
                      </Td>
                    </Tr>
                  ))}
                </>
              )}
            </Tbody>
          </Table>
        </TableContainer>
      </Flex>
      {url != `/Admissions/${id}` && (
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
              {" "}
              <Button colorScheme="teal" w="300px">
                FILTRAR POR NOME
              </Button>{" "}
              <Input h="38px" name="filter" />
            </HStack>
          </Flex>
          <TableContainer w="100%" height="100%"    overflowY="auto">
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
                {procedures.map((procedure) => (
                  <Tr key={procedure.id}>
      
                    <Td border="2px">{procedure.name}</Td>
                    <Td border="2px">{ new Intl.NumberFormat("pt-BR", {style: "currency", currency: "BRL"}).format(Number(procedure?.price)) }</Td>
                    <Td border="2px">{ new Intl.NumberFormat("pt-BR", {style: "currency", currency: "BRL"}).format(Number(procedure?.priceTwo)) }</Td>
                    <Td border="2px">{ new Intl.NumberFormat("pt-BR", {style: "currency", currency: "BRL"}).format(Number(procedure?.priceThree)) }</Td>
                    <Td border="2px">{ new Intl.NumberFormat("pt-BR", {style: "currency", currency: "BRL"}).format(Number(procedure?.priceFour)) }</Td>
                    <Td border="2px"><Button colorScheme="whatsapp" onClick={() => setProcedureInPet(procedure.id)} >Incluir Procedimento</Button></Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Flex>
      )}
    </>
  );
}
