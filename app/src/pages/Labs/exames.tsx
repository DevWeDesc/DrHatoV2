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
import { Header } from "../../components/admin/Header";
import { ReactNode, useEffect, useState } from "react";
import { GenericLink } from "../../components/Sidebars/GenericLink";
import { GenericSidebar } from "../../components/Sidebars/GenericSideBar";
import { AiOutlineSearch, TbVaccine, FaClipboardList } from "react-icons/all";
import { AdminContainer } from "../AdminDashboard/style";
import { useNavigate } from "react-router-dom";
import { api } from "../../lib/axios";
import { BiHome } from "react-icons/all";
import { Input } from "../../components/admin/Input";
import React from "react";
import { toast } from "react-toastify";
import { useQuery } from "react-query";

interface QueueProps {
  response: [];
  totalInQueue: number;
}


type OpenExamProps = {
  isMultiPart: boolean;
  isReportByText: boolean;
  isOnePart: boolean;
  examId: number;
};

interface LabDefaultDTO {
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

type filterDates = {
  initialDate: string;
  finalDate: string;
};

export function LabExames() {
  const [labs, setLabs] = useState<LabDefaultDTO[]>([]);
  const [inQueue, setInQueue] = useState<QueueProps[]>([]);
  const [exams, setExams] = useState([] as any);
  const [petName, setPetName] = useState("");
  const [codExam, setCodExam] = useState("");
  const [codPet, setCodPet] = useState("");
  const [solicitedBy, setSolicitedBy] = useState("");
  const [showEndExams, setShowEndExams] = useState("false");
  const [isLoading, setIsLoading] = useState(false);
  const [filterDates, setFilterDates] = useState<filterDates>({
    initialDate: "",
    finalDate: "",
  });

  const navigate = useNavigate();

  async function getQueue() {
    const response = await api.get("/pets/queue");
    const labs = await api.get("/labs");
    const filteredLabs = labs.data.exams.filter(
      (exam: any) => exam.examsType[0] === "lab"
    );
    setLabs(filteredLabs);
    setExams(labs.data.allExams);
    setInQueue(response.data.response);
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

      setIsLoading(true);
      const res = await api.post(`/sendemail/report/onepart/${examId}`, data);

      if (res.status === 200) {
        toast.success("Email enviado com sucesso");
        setIsLoading(false);
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

  useEffect(() => {
    getQueue();
  }, [inQueue.length]);

  const { refetch } = useQuery(
    [
      "exams",
      petName,
      codPet,
      solicitedBy,
      showEndExams,
      codExam,
      filterDates.finalDate,
      filterDates.initialDate,
    ],
    async () => {
      const res = await api.get(
        `/labmenusearch?petCode=${codPet}&petName=${petName}&solicitedBy=${solicitedBy}&initialDate=${
          filterDates.initialDate
        }&finalDate=${filterDates.finalDate}&codeExam=${codExam}&showEndExams=${showEndExams}`
      );
      
      setLabs(
        res.data.exams.filter(
          (exam: LabDefaultDTO) => exam.examsType[0] === "lab"
        )
      );
    },{
      refetchOnWindowFocus: false,
    }
  );

  async function searchDataLabs() {
    switch (true) {
      case showEndExams === "":
        await api.get("/labs/all").then((res) => {
          const filteredLabs = res.data.exams.filter(
            (exam: any) => exam.examsType[0] === "lab"
          );
          setLabs(filteredLabs);
        });

        break;

      case showEndExams === "true":
        await api.get("/labs/end").then((res) => {
          const filteredLabs = res.data.exams.filter(
            (exam: any) => exam.examsType[0] === "lab"
          );
          setLabs(filteredLabs);
        });
        break;

      case showEndExams === "false":
        const labs = await api.get("/labs");
        const filteredLabs = labs.data.exams.filter(
          (exam: any) => exam.examsType[0] === "lab"
        );
        setLabs(filteredLabs);
        break;
    }
  }

  function clearExamData() {
    setPetName("");
    setCodPet("");
    setSolicitedBy("");
  }

  useEffect(() => {
    searchDataLabs();
  }, [showEndExams]);

  return (
    <ChakraProvider>
      <AdminContainer>
        <Flex direction="column" h="100vh">
          <Header title="Painel Veterinário" />
          <Flex w="100%" my="6" maxWidth={1680} mx="auto" px="6">
            <GenericSidebar>
              <GenericLink
                name="Pesquisar Cliente"
                icon={AiOutlineSearch}
                path="/Vets/Menu"
              />
              <GenericLink
                name="Internações"
                icon={FaClipboardList}
                path="/Admissions"
              />
              <GenericLink
                name="Vacinas"
                icon={TbVaccine}
                path="/Recepcao/Internacoes/Vacinas"
              />
              <GenericLink name="Recepção" icon={BiHome} path="/Recepcao" />
            </GenericSidebar>
            <Box
              flex="1"
              borderRadius={8}
              bg="gray.200"
              p="8"
              minH="44rem"
              // maxH="44rem"
              // overflow="auto"
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
                            exam: { name: string; codexam: string },
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
                        defaultValue={ new Date(new Date().setMonth(new Date().getMonth() - 2)).toISOString().split('T')[0]}
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
                        defaultValue={ new Date().toISOString().split('T')[0]}
                      />

                      <VStack display={"flex"} alignItems={"start"}>
                        <FormLabel marginBottom={0}  htmlFor="finished">
                          Realizados
                        </FormLabel>
                        <Select
                        id="finished"
                          focusBorderColor="green.200"
                          border="1px"
                          bgColor="white"
                          variant="filled"
                          w={150}
                          _hover={{
                            bgColor: "gray.100",
                          }}
                          fontSize={{ base: "sm", md: "md", lg: "lg" }}
                          onChange={(ev) => setShowEndExams(ev.target.value)}
                        >
                          <option selected value="false">Não</option>
                          <option value="true">Sim</option>
                          <option value="">Todos</option>
                        </Select>
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
                      type="number"
                      onChange={(ev) => {
                        setCodPet(ev.target.value);
                      }}
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
                <Flex textAlign="center" justify="center">
                  {/* {typeTable} */}
                  <Table colorScheme="blackAlpha">
                    <Thead>
                      <Tr>
                        <Th border="1px">Data</Th>
                        <Th border="1px">Animal</Th>
                        <Th border="1px">Exame</Th>
                        <Th border="1px">Veterinário</Th>
                        <Th border="1px">Status</Th>
                        <Th border="1px">Responsável</Th>
                        <Th border="1px">Resultado</Th>
                        <Th border="1px" whiteSpace={"nowrap"}>Resultado por Email</Th>
                        <Th border="1px">Impressão</Th>
                      </Tr>
                    </Thead>

                    <Tbody maxH="60vh" overflowY="scroll">
                      {labs?.map((exam) => {
                        return (
                          <React.Fragment key={exam.id}>
                            <Tr
                              key={exam.id}
                              cursor="pointer"
                              _hover={{ bg: "gray.300" }}
                              onClick={(ev: any) => {
                                if (
                                  ev.target.type !== "button" &&
                                  exam.doneExame === false
                                ) {
                                  navigate(
                                    `/Labs/Set/${exam.id}/${
                                      exams.find(
                                        (data: any) => data.name === exam.name
                                      ).codexam
                                    }/${exam.medicine?.pet.id}`
                                  );
                                }
                              }}
                            >
                              <Td border="1px">
                                {new Intl.DateTimeFormat("pt-BR").format(
                                  new Date(exam?.requesteData)
                                )}{" "}
                              </Td>

                              <Td border="1px">{exam.medicine?.pet.name}</Td>

                              <Td border="1px">{exam.name}</Td>

                              <Td border="1px">
                                {exam.requestedFor
                                  ? exam.requestedFor
                                  : "Não definido"}
                              </Td>
                              <Td border="1px" whiteSpace={"nowrap"}>
                                {exam.doneExame ? "Laudado" : "A Fazer"}
                              </Td>
                              <Th border="1px">
                                {exam.responsibleForExam
                                  ? exam.responsibleForExam
                                  : "Não Laudado"}
                              </Th>
                              <Th border="1px">
                                <Button
                                  isDisabled={exam.doneExame === false}
                                  colorScheme="teal"
                                  onClick={() =>
                                    handleOpenResultExams({
                                      examId: exam.id,
                                      isMultiPart: exam.twoPart,
                                      isOnePart: exam.onePart,
                                      isReportByText: exam.byReport,
                                    })
                                  }
                                >
                                  Visualizar
                                </Button>
                              </Th>
                              <Th border="1px">
                                <Button
                                  isDisabled={exam.doneExame === false}
                                  colorScheme="teal"
                                  onClick={() =>
                                    handleSendEmailResultExams({
                                      examId: exam.id,
                                      isMultiPart: exam.twoPart,
                                      isOnePart: exam.onePart,
                                      isReportByText: exam.byReport,
                                    })
                                  }
                                >
                                  Enviar Email
                                </Button>
                              </Th>
                              <Th border="1px">
                                <Button
                                  colorScheme="teal"
                                  onClick={() =>
                                    printTag({
                                      examId: exam.id,
                                      isMultiPart: exam.twoPart,
                                      isOnePart: exam.onePart,
                                      isReportByText: exam.byReport,
                                    })
                                  }
                                >
                                  Imprimir
                                </Button>
                              </Th>
                            </Tr>
                          </React.Fragment>
                        );
                      })}
                    </Tbody>
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
