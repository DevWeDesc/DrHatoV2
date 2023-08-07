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
  Checkbox,
  HStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Input } from "../../components/admin/Input";
import { ExamsProps, PetDetaisl } from "../../interfaces";
import { api } from "../../lib/axios";

export function ExamsVet() {
  const { id } = useParams<{ id: string }>();
  const [petDetails, setPetDetails] = useState({} as PetDetaisl);
  const [exams, setExams] = useState([]);
  const [examId, setExamId] = useState(0);
  const [reloadData, setReloadData] = useState(false);
  const navigate = useNavigate();

  console.log(petDetails);

  async function getPetExams() {
    const response = await api.get(`/pets/${id}`);
    setPetDetails(response.data);

    const exams = await api.get("/exams");
    setExams(exams.data);
  }

  async function setExamInPet() {
    try {
      await api.post(`/setexam/${examId}/${petDetails.recordId}/${petDetails.totalAcc.id}`);
      setReloadData(true);
      toast.success("Exame criado com Sucesso");
    } catch (error) {
      toast.error("Falha ao cadastrar exame!");
    }
  }

  async function deleteExam(examId: string | number, examPrice: string | number) {
    try {
      const confirmation = window.confirm(
        "DELETAR E UMA AÇÃO IRREVERSIVEL TEM CERTEZA QUE DESEJA CONTINUAR?"
      );

      if (confirmation === true) {
        await api.delete(`/petexam/${examId}/${petDetails.totalAcc.id}/${examPrice}`);
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
    getPetExams();
  }, []);

  useEffect(() => {
    if (reloadData === true) {
      getPetExams();
      setReloadData(false); // Reseta o estado para evitar chamadas infinitas
    }
  }, [reloadData]);

  // console.log("ESTADO DE CHAMADA  API", petDetails);

  return (
    <>
      <Flex w="100%" height="45vh" align="center" overflowY="auto">
        <TableContainer overflowY="auto" w="100%" height="100%">
          <Table>
            <Thead>
              <Tr bgColor="cyan.100">
                <Th color="black" fontSize="1xl" border="2px" w="400px">
                  NOME
                </Th>
                <Th color="black" fontSize="1xl" border="2px" w="200px">
                  COLETA
                </Th>
                <Th color="black" fontSize="1xl" border="2px" w="200px">
                  DATA
                </Th>
                <Th color="black" fontSize="1xl" border="2px" w="200px">
                  REALIZADO ?
                </Th>

                <Th color="black" fontSize="1xl" border="2px" w="200px">
                  EXCLUSÃO
                </Th>
                <Th color="black" fontSize="1xl" border="2px" w="200px">
                  ETIQUETA
                </Th>
              </Tr>
            </Thead>

            <Tbody>
              {petDetails.exams?.map((exam) => (
                <Tr key={exam.id}>
                  <Td
                    border="2px"
                    fontSize="1xl"
                    fontWeight="bold"
                    color="green.700"
                  >
                    {exam.name}
                  </Td>
                  <Td border="2px" fontSize="1xl" fontWeight="bold">
                    {exam.coleted != null ? exam.coleted : "Sem coleta"}
                  </Td>
                  <Td border="2px" fontSize="1xl" fontWeight="bold">
                    {exam.requestedData}
                  </Td>
                  <Td border="2px" fontSize="1xl" fontWeight="bold">
                    {exam.doneExam === true ? "SIM" : "NÃO"}
                  </Td>

                  <Td border="2px" fontSize="1xl" fontWeight="bold">
                    <Button
                      colorScheme="red"
                      onClick={() => deleteExam(exam.id, exam.price)}
                    >
                      EXCLUIR ?
                    </Button>
                  </Td>
                  <Td border="2px" fontSize="1xl" fontWeight="bold">
                    ETIQUETA
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
          <HStack>
            {petDetails.more !== "" ? (
              <Button colorScheme="blue" w="300px">
                PetLove
              </Button>
            ) : (
              <></>
            )}
            <Input height="38px" name="filter" />
          </HStack>
          <Button onClick={setExamInPet} colorScheme="whatsapp">
            INCLUIR NOVO EXAME
          </Button>
        </Flex>
        <TableContainer w="100%" height="100%" overflowY="auto">
          <Table>
            <Thead>
              <Tr>
                <Th color="black" fontSize="1xl" border="2px" w="100px">
                  SELECIONADO
                </Th>
                <Th color="black" fontSize="1xl" border="2px">
                  NOME
                </Th>
                <Th color="black" fontSize="1xl" border="2px" w="200px">
                  VALOR
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {exams.map((exam: ExamsProps) => (
                <Tr key={exam.id}>
                  <Td border="2px">
                    <Checkbox
                      onChange={(ev) =>
                        ev.target.checked === true
                          ? setExamId(exam.id)
                          : setExamId(0)
                      }
                      value={exam.id}
                      borderColor="black"
                      size="lg"
                    />
                  </Td>
                  <Td border="2px">{exam.name}</Td>
                  <Td border="2px">R$ {exam.price}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Flex>
    </>
  );
}
