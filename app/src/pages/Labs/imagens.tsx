import {
  Box,
  Button,
  ChakraProvider,
  Flex,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Text,
  Select,
  Checkbox,
  FormLabel,
  VStack,
} from "@chakra-ui/react";
import { Input } from "../../components/admin/Input";
import { Header } from "../../components/admin/Header";
import { DbContext } from "../../contexts/DbContext";
import { GenericLink } from "../../components/Sidebars/GenericLink";
import { GenericSidebar } from "../../components/Sidebars/GenericSideBar";
import {
  AiOutlineMenu,
  BsArrowLeft,
  IoIosFlask,
  BsImages,
} from "react-icons/all";
import { AdminContainer } from "../AdminDashboard/style";
import { LabsSearch } from "../../components/Search/labsSearch";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";
import { api } from "../../lib/axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";

interface LabImagensProps {
  id: number;
  name: string;
  doneExame: boolean;
  price: string;
  defaultMethodology: string | null;
  impressName: string | null;
  requesteData: string;
  requestedFor: string;
  requestedCrm: string;
  responsibleForExam: string | null;
  responsibleForCrm: string | null;
  onePart: boolean;
  twoPart: boolean;
  byReport: boolean;
  externalReport: string | null;
  medicine_id: number;
  linkedConsultDebitId: number;
  LinkedAdmissionDebitId: number | null;
  examsType: string[];
  updatedAt: string;
  medicine: {
    pet: {
      name: string;
      id: number;
    };
  };
}

export function LabImagens() {
  const [showEndExams, setShowEndExams] = useState(false);
  const [exams, setExams] = useState([] as any);

  const navigate = useNavigate();

  const { data: dataExams, isLoading } = useQuery({
    queryKey: ["labs", showEndExams],
    queryFn: async () => {

      if (showEndExams) {
        const response = await api.get('/labs/end')
        return response.data.exams.filter((exam: any) => exam.examsType[0] === "lab") as LabImagensProps[]

        }else {
          
        const response = await api.get("/labs");
        setExams(response.data.allExams);
        return response.data.exams.filter((exam: any) => exam.examsType[0] === "image") as LabImagensProps[];
      }
    },
  });




  return (
    <ChakraProvider>
      <AdminContainer>
        <Flex direction="column" h="100vh">
          <Header title="Painel Lab Imagens" />
          <Flex w="100%" my="6" maxWidth={1680} mx="auto" px="6">
            <GenericSidebar>
              <GenericLink icon={BsArrowLeft} name="Voltar" path="/Home" />
              <GenericLink icon={AiOutlineMenu} name="Menu" path="/Labs" />
              <GenericLink
                icon={IoIosFlask}
                name="Laboratório"
                path="/Labs/Exames"
              />
              <GenericLink
                icon={BsImages}
                name="Laboratório Imagens"
                path="/Labs/Imagens"
              />
            </GenericSidebar>
            <Box
              flex="1"
              borderRadius={8}
              bg="gray.200"
              p="8"
              maxH="44rem"
              overflow="auto"
            >
              <Flex mb="8" gap="8" direction="column" align="center">
                <Flex w="100%" direction="column" align="center">
                  <Text fontWeight="bold">SISTEMA DE EXAMES</Text>
                  <Flex w="100%" mb={4}>
                    <Flex align="center" gap={8}>
                      <Text>Tipo de Exame</Text>
                      <Select
                        placeholder="Selecione um exame"
                        w={320}
                        border="2px"
                      >
                        {exams.map((exam: { name: string; id: string }, index: { index: number }) => (
                          <option key={`${exam.id}-${index}`}>{exam.name}</option>
                        ))}
                      </Select>
                    </Flex>
                  </Flex>

                  <Flex w="100%" align="center" mb={4}>
                    <Flex align="center" gap={8}>
                      <Input
                        label="Data Inicial"
                        name="initialDate"
                        type="date"
                      />

                      <Input label="Data Final" name="finalDate" type="date" />

                      <VStack>
                        <FormLabel fontWeight="bold" htmlFor="finished">
                          Concluidos
                        </FormLabel>
                        <Checkbox
                          border="2px"
                          onChange={(ev) => setShowEndExams(ev.target.checked)}
                          name="finished"
                          id="finished"
                          size="lg"
                        />
                      </VStack>
                    </Flex>
                  </Flex>

                  <Flex w="100%" gap={8} align="center">
                    <Input
                      label="Nome do Animal"
                      name="petName"
                      // onChange={ev => setPetName(ev.target.value)}
                    />

                    <Input
                      label="Solicitante"
                      name="solicitedBy"
                      // onChange={ev => setSolicitedBy(ev.target.value)}
                    />

                    <Input
                      label="Código Animal"
                      name="petCode"
                      // onChange={ev => setCodPet(ev.target.value)}
                    />
                  </Flex>

                  <Button colorScheme="whatsapp" w="380px" mt="4" p={4}>
                    Filtrar
                  </Button>
                </Flex>
                <Button colorScheme="teal">
                  <>TOTAL NA FILA: 0000</>
                </Button>
                <Flex textAlign="center" justify="center">
                  <Table colorScheme="blackAlpha">
                    {(() => {
                      switch (true) {
                        case showEndExams:
                          return (
                            <>
                              <Thead>
                                <Tr>
                                  <Th>Data</Th>
                                  <Th>Animal</Th>
                                  <Th>Exame</Th>
                                  <Th>Veterinário</Th>
                                  <Th>Status</Th>
                                  <Th>Responsável</Th>
                                  <Th>Resultado</Th>
                                  <Th whiteSpace={"nowrap"}>
                                    Resultado por Email
                                  </Th>
                                  <Th>Impressão</Th>
                                </Tr>
                              </Thead>
                              <Tbody>
                                {dataExams &&
                                  dataExams.map((exam: any) => {
                                    return (
                                      <React.Fragment key={exam.id}>
                                        {exam.doneExame === true && (
                                          <Tr key={exam.id} cursor="pointer">
                                            <Td>
                                              {new Intl.DateTimeFormat(
                                                "pt-BR"
                                              ).format(
                                                new Date(exam?.requesteData)
                                              )}
                                            </Td>

                                            <Td>{exam.medicine?.pet.name}</Td>

                                            <Td>{exam.name}</Td>

                                            <Td>
                                              {exam.requestedFor
                                                ? exam.requestedFor
                                                : "Não definido"}
                                            </Td>
                                            <Td>
                                              {exam.doneExame
                                                ? "Laudado"
                                                : "A Fazer"}
                                            </Td>
                                            <Th>
                                              {exam.responsibleForExam
                                                ? exam.responsibleForExam
                                                : "Não Laudado"}
                                            </Th>
                                            <Th>
                                              <Button
                                                colorScheme="teal"
                                                //  onClick={() => handleOpenResultExams({
                                                //   examId: exam.id,
                                                //   isMultiPart: exam.twoPart,
                                                //   isOnePart: exam.onePart,
                                                //   isReportByText: exam.byReport
                                                //  })}
                                              >
                                                Visualizar
                                              </Button>
                                            </Th>
                                            <Th>
                                              <Button
                                                colorScheme="teal"
                                                //  onClick={() => handleSendEmailResultExams({
                                                //   examId: exam.id,
                                                //   isMultiPart: exam.twoPart,
                                                //   isOnePart: exam.onePart,
                                                //   isReportByText: exam.byReport
                                                //  })}
                                              >
                                                Enviar Email
                                              </Button>
                                            </Th>
                                            <Th>
                                              <Button
                                                colorScheme="teal"
                                                // onClick={() => printTag({
                                                //   examId: exam.id,
                                                //   isMultiPart: exam.twoPart,
                                                //   isOnePart: exam.onePart,
                                                //   isReportByText: exam.byReport
                                                // })}
                                              >
                                                Imprimir
                                              </Button>
                                            </Th>
                                          </Tr>
                                        )}
                                      </React.Fragment>
                                    );
                                  })}
                              </Tbody>
                            </>
                          );
                        default:
                          return (
                            <>
                              <Thead>
                                <Tr>
                                  <Th>Data</Th>
                                  <Th>Animal</Th>
                                  <Th>Exame</Th>
                                  <Th>Veterinário</Th>
                                  <Th>Status</Th>
                                  <Th>Responsável</Th>
                                </Tr>
                              </Thead>
                              <Tbody>
                                {dataExams && dataExams.map((exam) => {
                                  return (
                                    <React.Fragment key={exam.id}>
                                      {exam.doneExame === false && (
                                        <Tr
                                          key={exam.id}
                                          cursor="pointer"
                                          onClick={() =>
                                            navigate(
                                              `/Labs/Set/${exam.id}/${
                                                exams.find(
                                                  (data: any) =>
                                                    data.name === exam.name
                                                ).codexam
                                              }/${exam.medicine?.pet.id}`
                                            )
                                          }
                                        >
                                          <Td>
                                            {new Intl.DateTimeFormat(
                                              "pt-BR"
                                            ).format(
                                              new Date(exam?.requesteData)
                                            )}{" "}
                                          </Td>

                                          <Td>{exam.medicine?.pet.name}</Td>

                                          <Td>{exam.name}</Td>

                                          <Td>
                                            {exam.requestedFor
                                              ? exam.requestedFor
                                              : "Não definido"}
                                          </Td>
                                          <Td>
                                            {exam.doneExame
                                              ? "Laudado"
                                              : "A Fazer"}
                                          </Td>
                                          <Th>
                                            {exam.responsibleForExam
                                              ? exam.responsibleForExam
                                              : "Não Laudado"}
                                          </Th>
                                        </Tr>
                                      )}
                                    </React.Fragment>
                                  );
                                })}
                              </Tbody>
                            </>
                          );
                      }
                    })()}
                  </Table>
                </Flex>
              </Flex>
            </Box>
          </Flex>
        </Flex>
      </AdminContainer>
    </ChakraProvider>
  );
}
