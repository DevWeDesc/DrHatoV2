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
  Text,
} from "@chakra-ui/react";
import { Suspense, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Input } from "../../components/admin/Input";
import { ExamsProps, PetDetaisl } from "../../interfaces";
import { api } from "../../lib/axios";

type ExamsVetProps = {
  InAdmission: boolean;
  admissionQueueId?: string;
}

type ExamsDTO = {
  codexam: number;
  name: string;
  price: number;
}

export function ExamsVet({InAdmission, admissionQueueId}: ExamsVetProps) {
  const { id , queueId} = useParams<{ id: string; queueId: string; }>();
  const [petDetails, setPetDetails] = useState({} as PetDetaisl);
  const [exams, setExams] = useState<ExamsDTO[]>([]);
  const [reloadData, setReloadData] = useState(false);
  const user = JSON.parse(localStorage.getItem("user") as string);
  const [examName, setExamName] = useState("");
  const [searchByLetter, setSearchByLetter] = useState("");

  async function getPetExams() {
    const response = await api.get(`/pets/${id}`);
    setPetDetails(response.data);

    const exams = await api.get("/exams/old/all");
    setExams(exams.data.exams);
  }

  async function searchExamByName() {
    const response = await api.get(`/exams/old/${examName}`);
    setExams(response.data);
  }

  async function searchByFirstLetter() {
    const response = await api.get(`/exams/old/letter/${searchByLetter}`);
    setExams(response.data);
  }
  
  async function setOldExamInPet(examId: number) {
    try {
      const data = {
        RequestedByVetId: user.id, 
        RequestedByVetName: user.consultName, 
        RequestedCrm: user.crm,
        isAdmission: InAdmission 
      };


      if(InAdmission === true) {
        await api.post(
          `/exams/old/${examId}/${petDetails.id}/${petDetails.totalAcc.id}/${admissionQueueId}`,data);
        setReloadData(true);
        toast.success("Exame adicionado Ala Internação!");
      } else {
        await api.post(
          `/exams/old/${examId}/${petDetails.id}/${petDetails.totalAcc.id}/${queueId}`,data);
        setReloadData(true);
        toast.success("Exame adicionado Ala Veterinários");
      }

    } catch (error) {
      toast.error("Falha ao cadastrar exame!");
    }
  }

  async function deleteExam(
    examId: string | number,
    examPrice: string | number
  ) {
    try {
      const confirmation = window.confirm(
        "DELETAR E UMA AÇÃO IRREVERSIVEL TEM CERTEZA QUE DESEJA CONTINUAR?"
      );

      if (confirmation === true) {
        await api.delete(
          `/petexam/${examId}/${petDetails.totalAcc.id}/${examPrice}`
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

  useEffect(() => {
    getPetExams();
  }, []);

  useEffect(() => {
    if (reloadData === true) {
      getPetExams();
      setReloadData(false); // Reseta o estado para evitar chamadas infinitas
    }
  }, [reloadData]);

  useEffect(() => {
    searchExamByName();
  }, [examName]);

  useEffect(() => {
    searchByFirstLetter();
  }, [searchByLetter]);

  return (
    <>
      <Flex w="100%" height="35vh" align="center" overflowY="auto">
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
                    {new Intl.DateTimeFormat("pt-BR").format(
                      new Date(
                        exam.requestedData ? exam.requestedData : new Date()
                      )
                    )}
                  </Td>
                  <Td border="2px" fontSize="1xl" fontWeight="bold">
                    {exam.doneExam === true ? "SIM" : "NÃO"}
                  </Td>

                  <Td border="2px" fontSize="1xl" fontWeight="bold">
                    <Button
                      colorScheme="red"
                      isDisabled={exam.doneExam}
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

      <Flex w="100%" height="65vh" direction="column">
        <Flex
          height="48px"
          w="100%"
          bgColor="cyan.100"
          align="center"
          justify="center"
          gap={4}
        >
          <HStack>
            <Button colorScheme="teal">Filtrar</Button>
            <Input
              placeholder="Nome do Exame"
              height="38px"
              name="filter"
              onChange={(ev) => setExamName(ev.target.value)}
            />
          </HStack>
          <HStack spacing={2}>
            {SearchAlfabet.map((letter) => (
              <Button
                _hover={{
                  bgColor: "green.300",
                }}
                colorScheme="whatsapp"
                onClick={() => setSearchByLetter(letter)}
                fontWeight="bold"
                fontSize="22px"
              >
                {letter.toUpperCase()}
              </Button>
            ))}
          </HStack>
        </Flex>
        <TableContainer w="100%" height="100%" overflowY="auto">
          <Table>
            <Thead>
              <Tr>
                <Th color="black" fontSize="1xl" border="2px" w="40%">
                  NOME
                </Th>
                <Th color="black" fontSize="1xl" border="2px" w="40%">
                  VALOR
                </Th>
                <Th color="black" fontSize="1xl" border="2px">
                  INCLUIR EXAME
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {exams.map((exam) => (
                <Tr key={exam.codexam}>
                  <Td border="2px">{exam.name}</Td>
                  <Td border="2px">R$ {exam.price}</Td>
                  <Td border="2px">
                    <Button
                      w="100%"
                      onClick={() => setOldExamInPet(exam.codexam)}
                      colorScheme="whatsapp"
                    >
                      INCLUIR EXAME
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
