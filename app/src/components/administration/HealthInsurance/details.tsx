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
  useMenuState,
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router";
import { useQuery } from "react-query";
import { api } from "../../../lib/axios";
import { LoadingSpinner } from "../../Loading";


interface HealthInsurance {
  id:                    number;
  planName:              string;
  disponible:            boolean;
  planProvider:          string;
  graceDays:             number;
  coverageLimit:         number;
  admissionDeduction:    number;
  disponibleAtAdmission: boolean;
  exams:                 any[];
  procedures:            any[];
  surgeries:             any[];
  vaccines:              any[];
}

export default function DetailsHealthInsurance() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [healthInsurance, setHealthInsurance] = useState({} as HealthInsurance)


  async function getAllHealthInsuranceById() {
    const response = await api.get(`/health/insurance/${id}`)
    setHealthInsurance(response.data.healthInsurance)
  }

  const {isLoading} = useQuery('healthInsuranceDetails', getAllHealthInsuranceById)

  if(isLoading) {
    return <LoadingSpinner/>
  }







  

 

 


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
              Edição de Plano de Saúde {healthInsurance?.planName}
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
                  {healthInsurance?.procedures?.length === 0 ? (
                    <Tr>
                      <Td fontSize={{ base: "12", lg: "sm" }} fontWeight="bold">
                        Este plano no momento não tem Procedimentos no momento
                      </Td>
                    </Tr>
                  ) : (
                    healthInsurance?.procedures?.map((procedure: any) => (
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
                  {healthInsurance?.vaccines?.length === 0 ? (
                    <Tr>
                      <Td fontWeight="bold" fontSize={{ base: "12", lg: "sm" }}>
                        Este plano no momento não tem Vacinas no momento
                      </Td>
                    </Tr>
                  ) : (
                    healthInsurance?.vaccines?.map((vaccine: any) => (
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
                  {healthInsurance?.exams?.length === 0 ? (
                    <Tr>
                      <Td fontWeight="bold" fontSize={{ base: "12", lg: "sm" }}>
                        Este plano no momento não tem Exames no momento
                      </Td>
                    </Tr>
                  ) : (
                    healthInsurance?.exams?.map((exam: any) => (
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
                  {healthInsurance?.surgeries?.length === 0 ? (
                    <Tr>
                      <Td fontWeight="bold" fontSize={{ base: "12", lg: "sm" }}>
                        Este plano no momento não tem Cirurgias no momento
                      </Td>
                    </Tr>
                  ) : (
                    healthInsurance?.surgeries?.map((surgerie: any) => (
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
