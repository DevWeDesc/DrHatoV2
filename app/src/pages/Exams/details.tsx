import {
  Flex,
  Box,
  SimpleGrid,
  ChakraProvider,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Button,
  TableContainer,
} from "@chakra-ui/react";
import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Sidebar } from "../../components/admin/Sidebar";
import { DbContext } from "../../contexts/DbContext";
import { api } from "../../lib/axios";
import { Header } from "../../components/admin/Header";

interface ExamProps {
  name: string;
  price: number;
  available: boolean;
  examsType: [];
  applicableGender: [];
  subName: string;
  description: string;
  ageRange: [];
}

export function ExamDetail() {
  const { id } = useParams<{ id: string }>();
  const [exams, setExams] = useState<ExamProps>({} as ExamProps);
  const navigate = useNavigate();
  const { setRefresh } = useContext(DbContext);

  useEffect(() => {
    async function loadExam() {
      const response = await api.get(`/exams/${id}`);
      setExams(response.data);
    }
    loadExam();
  }, [exams.name]);

  let labType = exams.examsType ? exams.examsType.join(",  ") : "Carregando...";
  let petGender = exams.applicableGender
    ? exams.applicableGender.join(", ")
    : "Carregando...";
  let petAge = exams.ageRange ? exams.ageRange.join("  ,  ") : "Carregando...";
  const handleDeleteUser: any = async () => {
    try {
      const confirm = window.confirm(
        "Deletar um exame e uma operação irrevesivel, tem certeza que deseja continuar?"
      );
      if (confirm === true) {
        await api.delete(`/exams/${id}`);
        toast.warning("Exame deletado");
        setRefresh(true);
        navigate("/Admin/Exams");
      }
    } catch (error) {
      toast.error("Falha ao deletar usuário");
    }
  };

  return (
    <ChakraProvider>
      <Flex direction="column" h="100vh">
        <Header title="Detalhes do Exame" url="/Admin/Exams" />
        <Flex
          w="100%"
          my="6"
          direction={{ base: "column", xl: "row" }}
          mx="auto"
          px="6"
        >
          <Sidebar />

          <Flex
            py={{ base: 10, xl: 0 }}
            direction="column"
            gap="4"
            w="full"
            maxH="48rem"
          >
            <Box borderRadius={8} overflow="auto">
              <Flex
                w="100%"
                direction={"column"}
                justify="center"
                align="center"
              >
                <TableContainer w="full">
                  <Table colorScheme="blackAlpha">
                    <Thead>
                      <Tr>
                        <Th>Nome</Th>
                        <Th>Preço</Th>
                        <Th>Disponível</Th>
                        <Th>Laboratórios</Th>
                        <Th>Aplicavel á</Th>
                        <Th>Idade mínima e Máxima</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      <Tr>
                        <Th>
                          {exams.name ? exams.name : "Sem valor no banco"}
                        </Th>
                        <Th>
                          {new Intl.NumberFormat("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          }).format(exams.price)}
                        </Th>
                        <Th>
                          {exams.available
                            ? exams.available === true
                              ? "Sim"
                              : "Não"
                            : "Sem valor no banco"}
                        </Th>
                        <Th>{labType ? labType : "Sem valor no banco"}</Th>
                        <Th>{petGender ? petGender : "Sem valor no banco"}</Th>
                        <Th>{petAge ? petAge : "Sem valor no banco"}</Th>
                      </Tr>
                    </Tbody>
                  </Table>
                </TableContainer>
                <TableContainer w="full">
                  <Table colorScheme="blackAlpha">
                    <Thead>
                      <Tr>
                        <Th colSpan={2}>Título</Th>
                        <Th>Valor padrão</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      <Tr>
                        <Th colSpan={2}>
                          {exams.subName ? exams.name : "Sem valor no banco"}
                        </Th>
                        <Th>
                          {exams.description
                            ? exams.description
                            : "Sem valor no banco"}
                        </Th>
                      </Tr>
                    </Tbody>
                  </Table>
                </TableContainer>

                <Button
                  mt="4"
                  maxWidth={220}
                  colorScheme="red"
                  onClick={() => handleDeleteUser()}
                  fontSize={{ base: "sm", lg: "md" }}
                >
                  Deletar Exame
                </Button>
              </Flex>
            </Box>
          </Flex>
        </Flex>
      </Flex>
    </ChakraProvider>
  );
}
