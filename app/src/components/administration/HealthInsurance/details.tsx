import { Flex, Heading, Box } from "@chakra-ui/layout";
import { useEffect, useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
  Grid,
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router";

export default function DetailsHealthInsurance() {
  const { id } = useParams<{ id: string }>();
  const [procedures, setProcedures] = useState([]);
  const [vaccines, setVaccines] = useState([]);
  const [exams, setExams] = useState([]);
  const [surgeries, setSurgeries] = useState([]);
  const [Health, setHealth] = useState<IHealth[] | any>([]);

  interface IHealth {
    name: string;
    id: number;
  }

  const HealthInsuranceList = [
    {
      id: 1,
      name: "PetLove",
    },
    {
      id: 2,
      name: "ComVet",
    },
    {
      id: 3,
      name: "PlanVet",
    },
  ];

  const navigate = useNavigate();
  const ProdeduresList = [
    {
      idPlano: 1,
      id: 1,
      name: "Vacinação",
      descricao:
        "Administre as vacinas recomendadas pelo veterinário para proteger o gato contra doenças infecciosas.",
    },
    {
      idPlano: 1,
      name: "Desparasitação",
      descricao:
        "Realize a desparasitação interna e externa conforme orientação do veterinário, para controlar vermes e parasitas.",
    },
    {
      idPlano: 1,
      id: 2,
      name: "Esterilização/Castração",
      descricao:
        "Considere a esterilização/castração para controlar a reprodução e reduzir riscos de doenças.",
    },
    {
      idPlano: 1,
      id: 3,
      name: "Check-ups Regulares",
      descricao:
        "Agende consultas periódicas com o veterinário para avaliar a saúde geral do gato e detectar problemas precocemente.",
    },
    {
      idPlano: 1,
      id: 4,
      name: "Tratamento de Doenças",
      descricao:
        "Administre medicamentos conforme prescrição do veterinário em casos de doenças ou infecções.",
    },
    {
      idPlano: 2,
      id: 5,
      name: "Cuidados Dentários",
      descricao:
        "Realize limpezas dentárias regulares e mantenha uma boa higiene oral para prevenir problemas dentários.",
    },
  ];
  const VaccinesList = [
    {
      idPlano: 1,
      id: 1,
      name: "Vacinação contra Raiva",
      descricao:
        "Administre as vacinas recomendadas pelo veterinário para proteger o gato contra doenças infecciosas.",
    },
    {
      idPlano: 1,
      name: "Vacinação V8 ou V10",
      descricao:
        "Realize a desparasitação interna e externa conforme orientação do veterinário, para controlar vermes e parasitas.",
    },
    {
      idPlano: 1,
      id: 2,
      name: "Vacinação contra Tosse dos Canis",
      descricao:
        "Considere a esterilização/castração para controlar a reprodução e reduzir riscos de doenças.",
    },
    {
      idPlano: 1,
      id: 3,
      name: "Vacinação contra Leptospirose",
      descricao:
        "Agende consultas periódicas com o veterinário para avaliar a saúde geral do gato e detectar problemas precocemente.",
    },
    {
      idPlano: 1,
      id: 4,
      name: "Vacinação contra Parainfluenza",
      descricao:
        "Administre medicamentos conforme prescrição do veterinário em casos de doenças ou infecções.",
    },
    {
      idPlano: 2,
      id: 5,
      name: "Vacinação contra Coronavírus Canino",
      descricao:
        "Realize limpezas dentárias regulares e mantenha uma boa higiene oral para prevenir problemas dentários.",
    },
  ];

  const ExamsList = [
    {
      idPlano: 1,
      id: 1,
      name: "Exame de Sangue Completo",
      descricao:
        "Administre as vacinas recomendadas pelo veterinário para proteger o gato contra doenças infecciosas.",
    },
    {
      idPlano: 1,
      name: "Exame de Urina",
      descricao:
        "Realize a desparasitação interna e externa conforme orientação do veterinário, para controlar vermes e parasitas.",
    },
    {
      idPlano: 1,
      id: 2,
      name: "Exame de Fezes",
      descricao:
        "Considere a esterilização/castração para controlar a reprodução e reduzir riscos de doenças.",
    },
    {
      idPlano: 1,
      id: 3,
      name: "Radiografia (Raio-X)",
      descricao:
        "Agende consultas periódicas com o veterinário para avaliar a saúde geral do gato e detectar problemas precocemente.",
    },
    {
      idPlano: 1,
      id: 4,
      name: "Ultrassonografia",
      descricao:
        "Administre medicamentos conforme prescrição do veterinário em casos de doenças ou infecções.",
    },
    {
      idPlano: 2,
      id: 5,
      name: "Exame de Sangue para Doenças Infecciosas",
      descricao:
        "Realize limpezas dentárias regulares e mantenha uma boa higiene oral para prevenir problemas dentários.",
    },
  ];

  const SurgeriesList = [
    {
      idPlano: 1,
      id: 1,
      name: "Exame de Sangue Completo",
      descricao:
        "Administre as vacinas recomendadas pelo veterinário para proteger o gato contra doenças infecciosas.",
    },
    {
      idPlano: 1,
      name: "Exame de Urina",
      descricao:
        "Realize a desparasitação interna e externa conforme orientação do veterinário, para controlar vermes e parasitas.",
    },
    {
      idPlano: 1,
      id: 2,
      name: "Exame de Fezes",
      descricao:
        "Considere a esterilização/castração para controlar a reprodução e reduzir riscos de doenças.",
    },
    {
      idPlano: 1,
      id: 3,
      name: "Radiografia (Raio-X)",
      descricao:
        "Agende consultas periódicas com o veterinário para avaliar a saúde geral do gato e detectar problemas precocemente.",
    },
    {
      idPlano: 1,
      id: 4,
      name: "Ultrassonografia",
      descricao:
        "Administre medicamentos conforme prescrição do veterinário em casos de doenças ou infecções.",
    },
    {
      idPlano: 2,
      id: 5,
      name: "Exame de Sangue para Doenças Infecciosas",
      descricao:
        "Realize limpezas dentárias regulares e mantenha uma boa higiene oral para prevenir problemas dentários.",
    },
  ];

  useEffect(() => {
    const proc: any = ProdeduresList.filter((procedure: any) =>
      procedure.idPlano == id ? procedure : null
    );
    setProcedures(proc);

    const Vaccines: any = VaccinesList.filter((vaccine: any) =>
      vaccine.idPlano == id ? vaccine : null
    );
    setVaccines(Vaccines);

    const Exams: any = ExamsList.filter((exam: any) =>
      exam.idPlano == id ? exam : null
    );
    setExams(Exams);

    const Surgeries: any = SurgeriesList.filter((surgerie: any) =>
      surgerie.idPlano == id ? surgerie : null
    );
    setSurgeries(Surgeries);

    const Health: any = HealthInsuranceList.filter((Health: any) =>
      Health.id == id ? setHealth(Health) : null
    );
  }, []);
  console.log(Health);

  return (
    <Flex
      py={{ base: 10, xl: 0 }}
      direction="column"
      gap="4"
      w="full"
      maxH="48rem"
    >
      <Box borderRadius={8} overflow="auto">
        <Flex w="100%" direction={"column"} justify="center" align="center">
          <Flex
            w="100%"
            alignItems="center"
            justifyContent="center"
            direction="column"
          >
            <Heading
              size="lg"
              fontSize={{ base: "lg", lg: "2xl" }}
              fontWeight="bold"
              w="100%"
              mb="5"
              display="flex"
              flexDirection={{ base: "column", xl: "row" }}
              gap={{ base: 5, xl: 0 }}
              justifyContent="space-between"
            >
              Edição de Plano de Saúde {Health.name}
              <Grid
                gap="1"
                templateColumns={{
                  base: "repeat(2, 1fr)",
                  lg: "repeat(4, 1fr)",
                }}
              >
                <Button
                  fontSize={{ base: "12", lg: "sm" }}
                  whiteSpace="normal"
                  colorScheme="whatsapp"
                  onClick={() => navigate("/Admin/Procedures")}
                >
                  Adicionar Procedimento
                </Button>
                <Button
                  fontSize={{ base: "12", lg: "sm" }}
                  whiteSpace="normal"
                  colorScheme="whatsapp"
                  onClick={() => navigate("/Admin/Vaccines")}
                >
                  Adicionar Vacinas
                </Button>
                <Button
                  fontSize={{ base: "12", lg: "sm" }}
                  whiteSpace="normal"
                  colorScheme="whatsapp"
                  onClick={() => navigate("/Admin/Exams")}
                >
                  Adicionar Exames
                </Button>
                <Button
                  fontSize={{ base: "12", lg: "sm" }}
                  whiteSpace="normal"
                  colorScheme="whatsapp"
                  onClick={() => navigate("/Admin/Surgeryes")}
                >
                  Adicionar Cirurgias
                </Button>
              </Grid>
            </Heading>

            <TableContainer
              w="100%"
              display="flex"
              flexDirection={{ base: "column", md: "row" }}
              maxH="15rem"
              overflowY="auto"
            >
              <Table variant="simple" w={{ base: "100%", md: "50%" }}>
                <Thead>
                  <Tr>
                    <Th color="black">Procedimentos</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {procedures.length === 0 ? (
                    <Tr>
                      <Td fontSize={{ base: "12", lg: "sm" }} fontWeight="bold">
                        Este plano no momento não tem Procedimentos no momento
                      </Td>
                    </Tr>
                  ) : (
                    procedures?.map((procedure: any) => (
                      <Tr>
                        <>
                          <Td fontSize={{ base: "12", lg: "sm" }}>
                            {procedure.name}
                          </Td>
                        </>
                      </Tr>
                    ))
                  )}
                </Tbody>
              </Table>
              <Table variant="simple" w="50%">
                <Thead>
                  <Tr>
                    <Th color="black">Vacinas</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {vaccines.length === 0 ? (
                    <Tr>
                      <Td fontWeight="bold" fontSize={{ base: "12", lg: "sm" }}>
                        Este plano no momento não tem Vacinas no momento
                      </Td>
                    </Tr>
                  ) : (
                    vaccines.map((vaccine: any) => (
                      <Tr>
                        <>
                          <Td fontSize={{ base: "12", lg: "sm" }}>
                            {vaccine.name}
                          </Td>
                        </>
                      </Tr>
                    ))
                  )}
                </Tbody>
              </Table>
            </TableContainer>
            <TableContainer
              w="100%"
              display="flex"
              maxH="15rem"
              overflowY="auto"
              flexDirection={{ base: "column", md: "row" }}
              mt="12"
            >
              <Table variant="simple" w={{ base: "100%", md: "50%" }}>
                <Thead>
                  <Tr>
                    <Th color="black">Exames</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {exams.length === 0 ? (
                    <Tr>
                      <Td fontWeight="bold" fontSize={{ base: "12", lg: "sm" }}>
                        Este plano no momento não tem Exames no momento
                      </Td>
                    </Tr>
                  ) : (
                    exams?.map((exam: any) => (
                      <Tr>
                        <>
                          <Td fontSize={{ base: "12", lg: "sm" }}>
                            {exam.name}
                          </Td>
                        </>
                      </Tr>
                    ))
                  )}
                </Tbody>
              </Table>
              <Table variant="simple" w="50%">
                <Thead>
                  <Tr>
                    <Th color="black">Cirurgias</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {surgeries.length === 0 ? (
                    <Tr>
                      <Td fontWeight="bold" fontSize={{ base: "12", lg: "sm" }}>
                        Este plano no momento não tem Cirurgias no momento
                      </Td>
                    </Tr>
                  ) : (
                    surgeries?.map((surgerie: any) => (
                      <Tr>
                        <>
                          <Td fontSize={{ base: "12", lg: "sm" }}>
                            {surgerie.name}
                          </Td>
                        </>
                      </Tr>
                    ))
                  )}
                </Tbody>
              </Table>
            </TableContainer>
          </Flex>
        </Flex>
      </Box>
    </Flex>
  );
}
