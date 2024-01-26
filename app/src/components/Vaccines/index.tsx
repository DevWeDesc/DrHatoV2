import {
  Button,
  Checkbox,
  Flex,
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
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Input } from "../../components/admin/Input";
import { PetDetaisl } from "../../interfaces";
import { api } from "../../lib/axios";

interface VaccinesProps {
  id: number;
  name: string;
  price: number;
  description: string;
}

type VaccinesVetProps = {
  InAdmission: boolean;
  admissionQueueId?: string;
};

export default function VaccinesVets({
  InAdmission,
  admissionQueueId,
}: VaccinesVetProps) {
  const [petDetails, setPetDetails] = useState({} as PetDetaisl);
  const [vaccines, setVaccines] = useState<VaccinesProps[]>([]);
  const [vaccineId, setVaccineId] = useState(0);
  const [reloadData, setReloadData] = useState(false);
  const navigate = useNavigate();
  const { id, queueId } = useParams<{ id: string; queueId: string }>();
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

  async function setVaccineInPet() {
    try {
      const data = {
        RequestedByVetId: user.id,
        RequestedByVetName: user.consultName,
        RequestedCrm: user.crm,
        isAdmission: InAdmission,
      };

      if (InAdmission === true) {
        await api.post(
          `/vaccinepet/${vaccineId}/${petDetails.recordId}/${petDetails.totalAcc.id}/${admissionQueueId}`,
          data
        );
        setReloadData(true);
        toast.success("Vacina adicionada - Internações");
      } else {
        await api.post(
          `/vaccinepet/${vaccineId}/${petDetails.recordId}/${petDetails.totalAcc.id}/${queueId}`,
          data
        );
        setReloadData(true);
        toast.success("Vacina adicionada - Veterinários");
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
        await api.delete(
          `/petvaccine/${vaccineId}/${petDetails.totalAcc.id}/${vaccPrice}/${linkedDebitId}`
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

  useEffect(() => {
    GetVaccine();
  }, []);

  useEffect(() => {
    if (reloadData === true) {
      GetVaccine();
      setReloadData(false); // Reseta o estado para evitar chamadas infinitas
    }
  }, [reloadData]);
  return (
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
        <Flex height="60%" width="100" direction="column">
          <Flex
            width="100%"
            height="48px"
            bgColor="gray.300"
            p="2"
            align="center"
            justify="center"
          >
            <Button colorScheme="whatsapp" onClick={setVaccineInPet}>
              INCLUIR VACINA
            </Button>
            <Flex align="center" gap="2" p="4">
              <Button colorScheme="teal">FILTRAR</Button>
              <Input name="filter" />
            </Flex>
          </Flex>
          <TableContainer w="100%" h="100%" overflowY="auto" textAlign="center">
            <Table>
              <Thead>
                <Tr bgColor="cyan.100">
                  <Th>Selecione</Th>
                  <Th>VACINAS</Th>
                  <Th>ATÉ 6KG</Th>
                  <Th>7 A 15KG</Th>
                  <Th>16 A 35KG</Th>
                  <Th>35KG +</Th>
                </Tr>
              </Thead>
              <Tbody>
                {vaccines.map((vaccine) => (
                  <Tr key={vaccine.id}>
                    <Td>
                      <Checkbox
                        onChange={(ev) =>
                          ev.target.checked === true
                            ? setVaccineId(vaccine.id)
                            : setVaccineId(0)
                        }
                        value={vaccine.id}
                        size="lg"
                        borderColor="black"
                      />{" "}
                    </Td>
                    <Td>{vaccine.name}</Td>
                    <Td>R${vaccine.price}</Td>
                    <Td>R${vaccine.price}</Td>
                    <Td>R${vaccine.price}</Td>
                    <Td>R${vaccine.price}</Td>
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
                  <Th>STATUS</Th>
                  <Th>EXCLUIR?</Th>
                </Tr>
              </Thead>
              <Tbody>
                {petDetails.vaccines?.map((vaccine) => (
                  <Tr key={vaccine.id}>
                    <Td>{vaccine.requestedDate.toString()}</Td>
                    <Td>{vaccine.name}</Td>
                    <Td color="red">A FAZER</Td>
                    <Td>
                      <Button
                        colorScheme="red"
                        onClick={() => {
                          deleteVaccine(
                            vaccine.id,
                            vaccine.price,
                            vaccine.linkedDebitId
                          );
                        }}
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
  );
}
