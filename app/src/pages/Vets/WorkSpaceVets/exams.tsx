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
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BiHome } from "react-icons/bi";
import { TbArrowBack } from "react-icons/tb";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Input } from "../../../components/admin/Input";
import { ExamsVet } from "../../../components/Exams";
import { ExamsProps, PetDetaisl } from "../../../interfaces";
import { api } from "../../../lib/axios";

export function VetExams() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  // const [petDetails, setPetDetails] = useState({} as PetDetaisl);
  // const [exams, setExams] = useState([]);
  // const [examId, setExamId] = useState(0);
  // const [reloadData, setReloadData] = useState(false);

  // console.log(petDetails);

  // async function getPetExams() {
  //   const response = await api.get(`/pets/${id}`);
  //   setPetDetails(response.data);

  //   const exams = await api.get("/exams");
  //   setExams(exams.data);
  // }

  // async function setExamInPet() {
  //   try {
  //     await api.post(`/setexam/${examId}/${petDetails.recordId}`);
  //     setReloadData(true);
  //     toast.success("Exame criado com Sucesso");
  //   } catch (error) {
  //     toast.error("Falha ao cadastrar exame!");
  //   }
  // }

  // async function deleteExam(examId: string | number) {
  //   try {
  //     const confirmation = window.confirm(
  //       "DELETAR E UMA AÇÃO IRREVERSIVEL TEM CERTEZA QUE DESEJA CONTINUAR?"
  //     );

  //     if (confirmation === true) {
  //       await api.delete(`/petexam/${examId}`);
  //       setReloadData(true);
  //       toast.warning("Deletado com sucesso!");
  //     } else {
  //       return;
  //     }
  //   } catch (error) {
  //     toast.error("Falha ao Deletar!");
  //     console.log(error);
  //   }
  // }

  // useEffect(() => {
  //   getPetExams();
  // }, []);

  // useEffect(() => {
  //   if (reloadData === true) {
  //     getPetExams();
  //     setReloadData(false); // Reseta o estado para evitar chamadas infinitas
  //   }
  // }, [reloadData]);

  // // console.log("ESTADO DE CHAMADA  API", petDetails);

  return (
    <ChakraProvider>
      <Flex width="100vw" height="100vh" bgColor="white" direction="column">
        <Flex w="100%" height="10vh" bgColor="gray.200">
          <Flex align="center" gap="2">
            <Text m="2" fontSize="2xl" fontWeight="bold">
              Exames Paciente
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
              onClick={() => navigate(`/Vets/Workspace/${id}`)}
            >
              Voltar
            </Button>
          </Flex>
        </Flex>
        <ExamsVet />
      </Flex>
    </ChakraProvider>
  );
}
