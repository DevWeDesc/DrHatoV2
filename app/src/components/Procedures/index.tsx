import React from "react";
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
  Text,
  Select,
} from "@chakra-ui/react";
import moment from "moment";
import { useEffect, useState } from "react";
import { BiHome } from "react-icons/bi";
import { TbArrowBack } from "react-icons/tb";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Input } from "../../components/admin/Input";
import { PetDetaisl } from "../../interfaces";
import { api } from "../../lib/axios";

interface ProceduresProps {
  id: number;
  name: string;
  price: number;
  requestedDate: any;
}

export default function ProceduresVets() {
  const { id } = useParams<{ id: string }>();
  const [procedures, setProcedures] = useState<ProceduresProps[]>([]);
  const [petDetails, setPetDetails] = useState({} as PetDetaisl);
  const [reloadData, setReloadData] = useState(false);
  const [procedureId, setProcedureId] = useState(0);
  const navigate = useNavigate();
  async function GetPet() {
    const pet = await api.get(`/pets/${id}`);
    setPetDetails(pet.data);
  }
  async function GetData() {
    const procedures = await api.get("/procedures");
    setProcedures(procedures.data);
  }

  const setProcedureInPet = async () => {
    try {
      const now = new Date();
      const actualDate = moment(now).format("DD/MM/YYYY");
      console.log("DATA ATUAL", actualDate);

      await api.post(`/procedures/${petDetails.recordId}/${procedureId}/${petDetails.totalAcc.id}`);
      setReloadData(true);
      toast.success("Procedimento incluido com sucesso!!");
    } catch (error) {
      console.log(error);
      toast.error("Falha ao acrescentar novo procedimento!!");
    }
  };

  const excludeProcedureInPet = async (id: number, procedPrice: string | number) => {
    try {
      const confirm = window.confirm(
        "EXCLUIR E UMA OPERAÇÃO IRREVERSIVEL TEM CERTEZA QUE DESEJA CONTINUAR?"
      );
      if (confirm === true) {
        await api.delete(`/proceduresfp/${id}/${petDetails.totalAcc.id}/${procedPrice}`);
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
      <Flex w="100%" height="45vh" align="center" overflowY="auto">
        <TableContainer w="100%" height="100%">
          <Table>
            <Thead>
              <Tr bgColor="cyan.100">
                <Th color="black" fontSize="1xl" border="2px" w="200px">
                  Quantidade
                </Th>
                <Th color="black" fontSize="1xl" border="2px" w="200px">
                  Procedimentos Já Concluidos
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
                    {new Intl.DateTimeFormat().format(procedure.requestedDate)}
                  </Td>
                  <Td border="2px" fontSize="1xl" fontWeight="bold">
                    --
                  </Td>
                  <Td border="2px" fontSize="1xl" fontWeight="bold">
                    <Button
                      onClick={() => excludeProcedureInPet(procedure.id, procedure.price)}
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

      <Flex w="100%" height="45vh" direction="column">
        <Flex
          height="48px"
          w="100%"
          bgColor="cyan.100"
          align="center"
          justify="center"
          gap={4}
        >
          {/* 
      <HStack>
        <Select onChange={ev => setCovenant(ev.target.value)} borderColor="black" bgColor="gray.100">
        <option value="Particular">Particular</option>
       <option value="Petlove">Petlove</option>
        </Select>
       
      </HStack>
       */}
          <HStack>
            {" "}
            <Button colorScheme="teal" w="300px">
              FILTRAR POR NOME
            </Button>{" "}
            <Input h="38px" name="filter" />
          </HStack>
          <Button colorScheme="whatsapp" onClick={setProcedureInPet}>
            INCLUIR NOVO PROCEDIMENTO
          </Button>
        </Flex>
        <TableContainer w="100%" height="100%">
          <Table>
            <Thead>
              <Tr>
                <Th color="black" fontSize="1xl" border="2px" w="100px">
                  SELECIONADO
                </Th>
                <Th
                  color="black"
                  bgColor="whatsapp.100"
                  fontSize="1xl"
                  border="2px"
                >
                  NOME - PARTICULAR
                </Th>
                <Th color="black" fontSize="1xl" border="2px" w="200px">
                  VALOR POR PESO
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {procedures.map((procedure) => (
                <Tr key={procedure.id}>
                  <Td border="2px">
                    <Checkbox
                      onChange={(ev) =>
                        ev.target.checked === true
                          ? setProcedureId(procedure.id)
                          : setProcedureId(0)
                      }
                      value={procedure.id}
                      borderColor="black"
                      size="lg"
                    />
                  </Td>
                  <Td border="2px">{procedure.name}</Td>
                  <Td border="2px">R$ {procedure.price}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Flex>
    </>
  );
}
