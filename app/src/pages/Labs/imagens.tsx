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
import { GenericLink } from "../../components/Sidebars/GenericLink";
import { GenericSidebar } from "../../components/Sidebars/GenericSideBar";
import {
  AiOutlineMenu,
  BsArrowLeft,
  IoIosFlask,
  BsImages,
} from "react-icons/all";
import { AdminContainer } from "../AdminDashboard/style";
import { useQuery } from "react-query";
import { api } from "../../lib/axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";
import { toast } from "react-toastify";

interface LabImagensProps {
  id: number;
  codeExam: number;
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

type OpenExamProps = {
  isMultiPart: boolean;
  isReportByText: boolean;
  isOnePart: boolean;
  examId: number;
};

type filterDates = {
  initialDate: string;
  finalDate: string;
};

export function LabImagens() {
  const [showEndExams, setShowEndExams] = useState(false);
  const [exams, setExams] = useState([] as any);
  const [petName, setPetName] = useState("");
  const [codPet, setCodPet] = useState("");
  const [codExam, setCodExam] = useState("");
  const [solicitedBy, setSolicitedBy] = useState("");
  const [filterDates, setFilterDates] = useState<filterDates>({
    initialDate: "",
    finalDate: "",
  });
  const navigate = useNavigate();

  const { data } = useQuery({
    queryKey: ["allExams"],
    queryFn: async () => {
      const res = await api.get("/labs");
      setExams(res.data.allExams);
      return res.data.allExams;
    },
  });

  const { data: dataExams, refetch } = useQuery({
    queryKey: ["labs", showEndExams, codPet, solicitedBy, petName, codExam],
    queryFn: async () => {
      switch (true) {
        case true:
          const res = await api.get(
            `/labmenusearch?petCode=${codPet}&petName=${petName}&solicitedBy=${solicitedBy}&initialDate=${filterDates.initialDate}&finalDate=${filterDates.finalDate}&codeExam=${codExam}&showEndExams=${showEndExams}`
          );

          return res.data.exams.filter(
            (exam: LabImagensProps) => exam.examsType[0] === "image"
          ) as LabImagensProps[];

        default:
          const resDef = await api.get("/labs");
          setExams(resDef.data.allExams);
          return resDef.data.exams.filter(
            (exam: LabImagensProps) => exam.examsType[0] === "image"
          ) as LabImagensProps[];
      }
    },
  });

  async function handleSendEmailResultExams({
    isOnePart,
    isMultiPart,
    isReportByText,
    examId,
  }: OpenExamProps) {
    if (isOnePart === true) {
      const response = await api.get(`/lab/onepart/${examId}`);
      const data = {
        examDetails: response.data.petExamResult,
        examCharacs: response.data.petExamRefs,
      };

      const res = await api.post(`/sendemail/report/onepart/${examId}`, data);

      if (res.status === 200) {
        toast.success("Email enviado com sucesso");
      }
    }

    if (isMultiPart === true) {
      const response = await api.get(`/lab/multipart/${examId}`);

      const data = {
        examDetails: response.data.petExamResult,
        examCharacs: response.data.examRefs,
      };
      const res = await api.post(`/sendemail/report/multipart/${examId}`, data);

      if (res.status === 200) {
        toast.success("Email enviado com sucesso");
      }
    }

    if (isReportByText === true) {
      const response = await api.get(`/lab/bytext/${examId}`);

      const data = {
        examDetails: response.data.petExamResult,
      };
      const res = await api.post(`/sendemail/report/text/${examId}`, data);

      if (res.status === 200) {
        toast.success("Email enviado com sucesso");
      }
    }
  }

  async function handlePrintTag(response: any) {
    const {
      petCod,
      petCustomer,
      petEspecie,
      petName,
      petRace,
      petSex,
      petAge,
      solicitedBy,
      reportedByCrm,
    } = response.data.petExamResult;

    const printWindow = window.open("", "", "width=800,height=600");

    if (!printWindow) {
      return;
    }

    const container = printWindow.document.createElement("div");

    container.innerHTML = `
        <div class="label-container">
            <p class="hospital-name">HOSPITAL VETERINARIO DR.HATO</p>
            <p><span>Cod:</span> ${petCod}</p>
            <p><span>Prop:</span> ${petCustomer}, ${petEspecie}, ${petName}, ${petRace}, ${petSex}, ${petAge}</p>
            <p><span>Dr:</span> ${solicitedBy} - <span>CRMV:</span> ${reportedByCrm}</p>
            <p>${new Date().toLocaleDateString()}</p>
        </div>`;

    printWindow.document.body.appendChild(container);

    const style = printWindow.document.createElement("style");
    style.textContent = `
      @media print {
        @page {
          size: 8cm 4cm;
          margin: 0;
        }
        body {
          margin: 0;
          padding: 0;
          font-family: Arial, sans-serif;
      }
      .label-container {
          width: 8cm;
          height: 4cm;
          padding: 5px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          box-sizing: border-box;
          padding: 0px 50px;
      }
      .hospital-name {
          font-size: 12px;
          font-weight: bold;
          text-align: center;
          margin-bottom: 5px;
      }
      p {
          font-size: 10px;
          margin: 2px 0;
      }
      span {
          font-weight: bold;       
      }
    `;
    printWindow.document.head.appendChild(style);

    setTimeout(() => {
      printWindow.focus();
      printWindow.print();
      printWindow.close();
    }, 1000);
  }

  async function printTag({
    isOnePart,
    isMultiPart,
    isReportByText,
    examId,
  }: OpenExamProps) {
    if (isOnePart === true) {
      const response = await api.get(`/lab/onepart/${examId}`);
      await handlePrintTag(response);
    }

    if (isMultiPart === true) {
      const response = await api.get(`/lab/multipart/${examId}`);
      await handlePrintTag(response);
    }

    if (isReportByText === true) {
      const response = await api.get(`/lab/bytext/${examId}`);
      await handlePrintTag(response);
    }
  }

  function handleOpenResultExams({
    isOnePart,
    isMultiPart,
    isReportByText,
    examId,
  }: OpenExamProps) {
    if (isOnePart === true) {
      window.open(`/WorkSpace/ExamResultsOnePart/${examId}`, "_blank");
    }

    if (isMultiPart === true) {
      window.open(`/WorkSpace/ExamResultsMultiPart/${examId}`, "_blank");
    }

    if (isReportByText === true) {
      window.open(`/WorkSpace/ExamResultsByText/${examId}`, "_blank");
    }
  }

  return (
    <ChakraProvider>
      <AdminContainer>
        <Flex direction="column" h="100vh">
          <Header title="Painel Lab Imagens" url="/Labs" />
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
                        onChange={(ev) => setCodExam(ev.target.value)}
                      >
                        {exams.map(
                          (
                            exam: { name: string; codexam: number },
                            index: { index: number }
                          ) => (
                            <option
                              value={exam.codexam}
                              key={`${exam.codexam}-${index}`}
                            >
                              {exam.name}
                            </option>
                          )
                        )}
                      </Select>
                    </Flex>
                  </Flex>

                  <Flex w="100%" align="center" mb={4}>
                    <Flex align="center" gap={8}>
                      <Input
                        label="Data Inicial"
                        name="initialDate"
                        type="date"
                        onChange={(ev) => {
                          setFilterDates({
                            ...filterDates,
                            initialDate: ev.target.value,
                          });
                        }}
                      />

                      <Input
                        label="Data Final"
                        name="finalDate"
                        type="date"
                        onChange={(ev) => {
                          setFilterDates({
                            ...filterDates,
                            finalDate: ev.target.value,
                          });
                        }}
                      />

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
                      onChange={(ev) => setPetName(ev.target.value)}
                    />

                    <Input
                      label="Solicitante"
                      name="solicitedBy"
                      onChange={(ev) => setSolicitedBy(ev.target.value)}
                    />

                    <Input
                      label="Código Animal"
                      name="petCode"
                      onChange={(ev) => setCodPet(ev.target.value)}
                    />
                  </Flex>

                  <Button
                    colorScheme="whatsapp"
                    w="380px"
                    mt="4"
                    p={4}
                    onClick={() => refetch()}
                  >
                    Filtrar
                  </Button>
                </Flex>
                <Button colorScheme="teal">
                  <>
                    TOTAL NA FILA:{" "}
                    {
                      dataExams?.filter(
                        (exam) =>
                          exam.examsType[0] === "image" &&
                          exam.doneExame === showEndExams
                      )?.length
                    }
                  </>
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
                                                onClick={() =>
                                                  handleOpenResultExams({
                                                    examId: exam.id,
                                                    isMultiPart: exam.twoPart,
                                                    isOnePart: exam.onePart,
                                                    isReportByText:
                                                      exam.byReport,
                                                  })
                                                }
                                              >
                                                Visualizar
                                              </Button>
                                            </Th>
                                            <Th>
                                              <Button
                                                colorScheme="teal"
                                                onClick={() =>
                                                  handleSendEmailResultExams({
                                                    examId: exam.id,
                                                    isMultiPart: exam.twoPart,
                                                    isOnePart: exam.onePart,
                                                    isReportByText:
                                                      exam.byReport,
                                                  })
                                                }
                                              >
                                                Enviar Email
                                              </Button>
                                            </Th>
                                            <Th>
                                              <Button
                                                colorScheme="teal"
                                                onClick={() =>
                                                  printTag({
                                                    examId: exam.id,
                                                    isMultiPart: exam.twoPart,
                                                    isOnePart: exam.onePart,
                                                    isReportByText:
                                                      exam.byReport,
                                                  })
                                                }
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
                                  <Th>Impressão</Th>
                                </Tr>
                              </Thead>
                              <Tbody>
                                {dataExams &&
                                  dataExams.map((exam: any) => {
                                    return (
                                      <React.Fragment key={exam.id}>
                                        {exam.doneExame === false && (
                                          <Tr
                                            key={exam.id}
                                            cursor="pointer"
                                            onClick={(ev: any) => {
                                              if (ev.target.type !== "button") {
                                                navigate(
                                                  `/Labs/Set/${exam.id}/${exam.codeExam}/${exam.medicine?.pet.id}`
                                                );
                                              }
                                            }}
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
                                            <Th>
                                              <Button
                                                colorScheme="teal"
                                                onClick={() =>
                                                  printTag({
                                                    examId: exam.id,
                                                    isMultiPart: exam.twoPart,
                                                    isOnePart: exam.onePart,
                                                    isReportByText:
                                                      exam.byReport,
                                                  })
                                                }
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
