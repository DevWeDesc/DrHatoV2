import { useState, useEffect } from "react";
import {
  ChakraProvider,
  Flex,
  Box,
  Text,
  Input,
  Button,
  Textarea,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { GenericSidebar } from "../../components/Sidebars/GenericSideBar";
import { GenericLink } from "../../components/Sidebars/GenericLink";
import {
  BsArrowLeft,
  AiOutlineMenu,
  IoIosFlask,
  BsImages,
} from "react-icons/all";
import { Header } from "../../components/admin/Header";
import { api } from "../../lib/axios";
import FileUpload from "../../components/FileUpload";
import { toast } from "react-toastify";
import { LoadingSpinner } from "../../components/Loading";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import moment from "moment";

interface ExamProps {
  id: number;
  name: string;
  price: string;
  available: boolean;
  doneExam: boolean;
  onePart: boolean;
  twoPart: boolean;
  byReport: boolean;
  ageGroup: number;
  defaultMetodology: string;
  partExams: Array<{
    id: number;
    codpart: number;
    oldExamsCodexam: number;
    partName: string;
    isFirst: boolean;
    examsDetails: Array<{
      id: number;
      codDetalhe: number;
      partExamsCodpart: number;
      caracteristic: string;
      relativeUnit: string;
      absoluteUnit: string;
      agesOne: string;
      minAgesOne: string;
      maxAgesOne: string;
      agesTwo: string;
      minAgesTwo: string;
      maxAgesTwo: string;
      agesThree: string;
      minAgesThree: string;
      maxAgesThree: string;
      parts: number;
    }>;
  }>;
}

export interface PetProps {
  id: number;
  CodCli: number;
  CodAnimal: number;
  name: string;
  especie: string;
  sexo: string;
  race: string;
  weigth: string;
  haveChip: boolean;
  corPet: string;
  sizePet: string;
  bornDate: string;
  dateAge: null;
  observations: string;
  customer_id: number;
  codPet: string;
  isCastred: boolean;
  debits: string;
  customer: Customer;
  medicineRecords: MedicineRecords;
}

export interface Customer {
  name: string;
}

export interface MedicineRecords {
  id: number;
  observations: string[];
  petId: number;
  petExams: PetExam[];
}

export interface PetExam {
  id: number;
  name: string;
  price: string;
  defaultMethodology: null;
  impressName: null;
  requesteData: Date;
  requestedFor: string;
  requestedCrm: string;
  responsibleForExam: null;
  responsibleForCrm: null;
  doneExame: boolean;
  onePart: boolean;
  twoPart: boolean;
  byReport: boolean;
  externalReport: null;
  medicine_id: number;
  linkedConsultDebitId: number;
  LinkedAdmissionDebitId: null;
  examsType: string[];
  updatedAt: Date;
}

export function SetPetExam() {
  const { id, examId, codAnimal } = useParams<{
    id: string;
    examId: string;
    codAnimal: string;
  }>();
  const user = JSON.parse(localStorage.getItem("user") as string);
  const [pet, setPet] = useState({} as PetProps);
  const [disableRequest, setDisableRequest] = useState(false);
  const [textReport, setTextReport] = useState("");
  const [exam, setExam] = useState({} as ExamProps);
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  async function Pets() {
    const pets = await api.get(`/labexam/${codAnimal}`);
    setPet(pets.data);
  }
  async function Exam() {
    const exam = await api.get(`/exams/${examId}`);
    setExam(exam.data);
  }

  useEffect(() => {
    Pets();
    Exam();
  }, []);

  console.log(pet);
  const handleSetTextReport = async () => {
    try {
      const data = {
        jsonString: textReport,
        responsible: user.consultName,
        responsibleCrm: user.crm,
      };
      await api.post(`/labreportexam/${id}`, data);
      toast.success("Exame laudado com sucesso!");
      navigate("/Labs/Exames");
    } catch (error) {
      toast.error("Falha ao laudar com texto!");
    }
  };

  //One Part
  const handleSetTableReport: SubmitHandler<FieldValues> = async (values) => {
    const refs = exam.partExams[0].examsDetails.map((charac) => {
      let data = {
        charac: charac.caracteristic.replace(/\./g, "").trim(),
        abs: values[`abs${charac.caracteristic.replace(/\./g, "").trim()}`],
        rel: values[`rel${charac.caracteristic.replace(/\./g, "").trim()}`],
      };
      return data;
    });

    const data = {
      report: {
        refs,
        obs: values.obsOnePart,
      },
      reportedFor: user.consultName,
      reportedForCrm: user.crm,
    };

    try {
      console.log(data);
      await api.patch(`/reportexam/${id}`, data);
      toast.success("Exame laudado com sucesso!");
      navigate("/Labs/Exames");
    } catch (error) {
      console.log(error);
    }
  };

  //Multi Part
  const handleSetMultTableReport: SubmitHandler<FieldValues> = async (
    values
  ) => {
    try {
      const refs = exam.partExams.map((charac) => {
        return {
          name: charac.partName.replace(/\./g, "").trim(),
          refs: charac.examsDetails.map((charac) => {
            let data = {
              charac: charac.caracteristic,
              abs: values[
                `abs${charac.caracteristic.replace(/\./g, "").trim()}`
              ],
              rel: values[
                `rel${charac.caracteristic.replace(/\./g, "").trim()}`
              ],
            };
            return data;
          }),
        };
        0;
      });

      const data = {
        report: {
          refs,
          obs: [values.obsPartOne, values.obsPartTwo],
        },
        reportedFor: user.consultName,
        reportedForCrm: user.crm,
      };

      await api.patch(`/reportexam/${id}`, data);
      toast.success("Exame laudado com sucesso!");
      navigate("/Labs/Exames");
    } catch (error) {
      console.log(error);
    }
  };

  let typeTableView;
  switch (true) {
    case exam.twoPart === true:
      typeTableView = (
        <Flex
          as="form"
          direction="column"
          onSubmit={handleSubmit(handleSetMultTableReport)}
        >
          {exam?.partExams[0]?.isFirst === true ? (
            <TableContainer>
              <Table>
                <Thead>
                  <Tr>
                    <Th
                      fontSize="15"
                      border="1px solid black"
                      bg="blue.400"
                      color="white"
                    >
                      {exam.partExams[0].partName}
                    </Th>
                    <Th colSpan={2} border="1px solid black">
                      Resultado
                    </Th>
                    <Th colSpan={2} border="1px solid black">
                      Unidades
                    </Th>

                    <Th colSpan={2} border="1px solid black">
                      @Ref {exam?.partExams[0]?.examsDetails[0]?.agesOne}
                    </Th>
                    <Th colSpan={2} border="1px solid black">
                      @Ref Idade {exam?.partExams[0]?.examsDetails[0]?.agesTwo}
                    </Th>
                    <Th colSpan={2} border="1px solid black">
                      @Ref Idade{" "}
                      {exam?.partExams[0]?.examsDetails[0]?.agesThree}
                    </Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr fontWeight="bold">
                    <Td border="1px solid black">Característica</Td>
                    <Td border="1px solid black">Absoluto</Td>
                    <Td border="1px solid black">Relativo</Td>
                    <Td border="1px solid black">Un. Abs.</Td>
                    <Td border="1px solid black">Un. Rel.</Td>
                    <Td border="1px solid black">Absoluto</Td>
                    <Td border="1px solid black">Relativo</Td>
                    <Td border="1px solid black">Absoluto</Td>
                    <Td border="1px solid black">Relativo</Td>
                    <Td border="1px solid black">Absoluto</Td>
                    <Td border="1px solid black">Relativo</Td>
                  </Tr>

                  {exam?.partExams[0]?.examsDetails?.map((items) => (
                    <Tr>
                      <Td>{items.caracteristic}</Td>
                      <Td border="1px solid black" bg="white">
                        <Input
                          {...register(
                            `abs${items.caracteristic
                              .replace(/\./g, "")
                              .trim()}`
                          )}
                          name={`abs${items.caracteristic
                            .replace(/\./g, "")
                            .trim()}`}
                        />
                      </Td>
                      <Td border="1px solid black" bg="white">
                        <Input
                          {...register(
                            `rel${items.caracteristic
                              .replace(/\./g, "")
                              .trim()}`
                          )}
                          name={`rel${items.caracteristic
                            .replace(/\./g, "")
                            .trim()}`}
                        />
                      </Td>
                      <Td border="1px solid black" bg="white">
                        {items.absoluteUnit}
                      </Td>
                      <Td border="1px solid black" bg="white">
                        {items.relativeUnit}
                      </Td>

                      <Td border="1px" bg="white">
                        {items.minAgesOne}
                      </Td>
                      <Td border="1px" bg="white">
                        {items.maxAgesOne}
                      </Td>
                      <Td border="1px" bg="white">
                        {items.minAgesTwo}
                      </Td>
                      <Td border="1px" bg="white">
                        {items.maxAgesTwo}
                      </Td>
                      <Td border="1px" bg="white">
                        {items.minAgesThree}
                      </Td>
                      <Td border="1px" bg="white">
                        {items.maxAgesThree}
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
              <Flex m="4" gap={4} align="center" w="100%">
                <Text>Observações</Text>
                <Input
                  {...register("obsPartOne")}
                  name="obsPartOne"
                  width="80%"
                  bgColor="white"
                  border="2px"
                />
              </Flex>
            </TableContainer>
          ) : (
            <h1>FALHA NA RENDERIZAÇÃO DO EXAME</h1>
          )}
          {exam?.partExams[1]?.isFirst === false ? (
            <TableContainer>
              <Table>
                <Thead>
                  <Tr>
                    <Th
                      fontSize="15"
                      border="1px solid black"
                      bg="blue.400"
                      color="white"
                    >
                      {exam.partExams[1].partName}
                    </Th>
                    <Th colSpan={2} border="1px solid black">
                      Resultado
                    </Th>
                    <Th colSpan={2} border="1px solid black">
                      Unidades
                    </Th>

                    <Th colSpan={2} border="1px solid black">
                      @Ref {exam?.partExams[1]?.examsDetails[0]?.agesOne}
                    </Th>
                    <Th colSpan={2} border="1px solid black">
                      @Ref Idade {exam?.partExams[1]?.examsDetails[0]?.agesTwo}
                    </Th>
                    <Th colSpan={2} border="1px solid black">
                      @Ref Idade{" "}
                      {exam?.partExams[1]?.examsDetails[0]?.agesThree}
                    </Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr fontWeight="bold">
                    <Td border="1px solid black">Característica</Td>
                    <Td border="1px solid black">Absoluto</Td>
                    <Td border="1px solid black">Relativo</Td>
                    <Td border="1px solid black">Un. Abs.</Td>
                    <Td border="1px solid black">Un. Rel.</Td>
                    <Td border="1px solid black">Absoluto</Td>
                    <Td border="1px solid black">Relativo</Td>
                    <Td border="1px solid black">Absoluto</Td>
                    <Td border="1px solid black">Relativo</Td>
                    <Td border="1px solid black">Absoluto</Td>
                    <Td border="1px solid black">Relativo</Td>
                  </Tr>

                  {exam?.partExams[1]?.examsDetails?.map((items) => (
                    <Tr>
                      <Td>{items.caracteristic}</Td>
                      <Td border="1px solid black" bg="white">
                        <Input
                          {...register(
                            `abs${items.caracteristic
                              .replace(/\./g, "")
                              .trim()}`
                          )}
                          name={`abs${items.caracteristic
                            .replace(/\./g, "")
                            .trim()}`}
                        />
                      </Td>
                      <Td border="1px solid black" bg="white">
                        <Input
                          {...register(
                            `rel${items.caracteristic
                              .replace(/\./g, "")
                              .trim()}`
                          )}
                          name={`rel${items.caracteristic
                            .replace(/\./g, "")
                            .trim()}`}
                        />
                      </Td>
                      <Td border="1px solid black" bg="white">
                        {items.absoluteUnit}
                      </Td>
                      <Td border="1px solid black" bg="white">
                        {items.relativeUnit}
                      </Td>

                      <Td border="1px" bg="white">
                        {items.minAgesOne}
                      </Td>
                      <Td border="1px" bg="white">
                        {items.maxAgesOne}
                      </Td>
                      <Td border="1px" bg="white">
                        {items.minAgesTwo}
                      </Td>
                      <Td border="1px" bg="white">
                        {items.maxAgesTwo}
                      </Td>
                      <Td border="1px" bg="white">
                        {items.minAgesThree}
                      </Td>
                      <Td border="1px" bg="white">
                        {items.maxAgesThree}
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
              <Flex m="4" gap={4} align="center" w="100%">
                <Text>Observações</Text>
                <Input
                  {...register("obsPartTwo")}
                  name="obsPartTwo"
                  width="80%"
                  bgColor="white"
                  border="2px"
                />
              </Flex>
            </TableContainer>
          ) : (
            <h1>FALHA NA RENDERIZAÇÃO DO EXAME</h1>
          )}

          <Button
            isDisabled={disableRequest}
            type="submit"
            colorScheme="whatsapp"
          >
            Gravar
          </Button>
        </Flex>
      );
      break;
    case exam.onePart === true:
      typeTableView = (
        <TableContainer as="form" onSubmit={handleSubmit(handleSetTableReport)}>
          <Table>
            <Thead>
              <Tr>
                <Th
                  fontSize="15"
                  border="1px solid black"
                  bg="blue.400"
                  color="white"
                >
                  {pet?.name}
                </Th>
                <Th colSpan={2} border="1px solid black">
                  Resultado
                </Th>
                <Th colSpan={2} border="1px solid black">
                  Unidades
                </Th>

                <Th colSpan={2} border="1px solid black">
                  @Ref {exam?.partExams[0]?.examsDetails[0]?.agesOne}
                </Th>
                <Th colSpan={2} border="1px solid black">
                  @Ref Idade {exam?.partExams[0]?.examsDetails[0]?.agesTwo}
                </Th>
                <Th colSpan={2} border="1px solid black">
                  @Ref Idade {exam?.partExams[0]?.examsDetails[0]?.agesThree}
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr fontWeight="bold">
                <Td border="1px solid black">Característica</Td>
                <Td border="1px solid black">Absoluto</Td>
                <Td border="1px solid black">Relativo</Td>
                <Td border="1px solid black">Un. Abs.</Td>
                <Td border="1px solid black">Un. Rel.</Td>

                <Td border="1px solid black">Absoluto</Td>
                <Td border="1px solid black">Relativo</Td>
                <Td border="1px solid black">Absoluto</Td>
                <Td border="1px solid black">Relativo</Td>
                <Td border="1px solid black">Absoluto</Td>
                <Td border="1px solid black">Relativo</Td>
              </Tr>
              {exam?.partExams[0]?.examsDetails?.map((items) => (
                <Tr>
                  <Td>{items.caracteristic}</Td>
                  <Td border="1px solid black" bg="white">
                    <Input
                      {...register(
                        `abs${items.caracteristic.replace(/\./g, "").trim()}`
                      )}
                      name={`abs${items.caracteristic
                        .replace(/\./g, "")
                        .trim()}`}
                    />
                  </Td>
                  <Td border="1px solid black" bg="white">
                    <Input
                      {...register(
                        `rel${items.caracteristic.replace(/\./g, "").trim()}`
                      )}
                      name={`rel${items.caracteristic
                        .replace(/\./g, "")
                        .trim()}`}
                    />
                  </Td>
                  <Td border="1px solid black" bg="white">
                    {items.absoluteUnit}
                  </Td>
                  <Td border="1px solid black" bg="white">
                    {items.relativeUnit}
                  </Td>

                  <Td border="1px" bg="white">
                    {items.minAgesOne}
                  </Td>
                  <Td border="1px" bg="white">
                    {items.maxAgesOne}
                  </Td>
                  <Td border="1px" bg="white">
                    {items.minAgesTwo}
                  </Td>
                  <Td border="1px" bg="white">
                    {items.maxAgesTwo}
                  </Td>
                  <Td border="1px" bg="white">
                    {items.minAgesThree}
                  </Td>
                  <Td border="1px" bg="white">
                    {items.maxAgesThree}
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
          <Button
            isDisabled={disableRequest}
            type="submit"
            w="100%"
            mt="4"
            colorScheme="whatsapp"
          >
            GRAVAR
          </Button>
          <Flex m="4" gap={4} align="center" w="100%">
            <Text>Observações</Text>
            <Input
              width="80%"
              bgColor="white"
              border="2px"
              {...register("obsOnePart")}
              name="obsOnePart"
            />
          </Flex>
        </TableContainer>
      );
      break;
    case exam.byReport === true:
      typeTableView = (
        <Flex direction="column" align="center" m="4">
          <Text>LAUDO LIVRE</Text>
          <Textarea
            onChange={(ev) => setTextReport(ev.target.value)}
            border="2px"
            bgColor="white"
            minWidth={600}
            minHeight={800}
          />
          <Button onClick={handleSetTextReport} colorScheme="whatsapp" mt="4">
            GRAVAR
          </Button>
        </Flex>
      );
      break;
    default:
      typeTableView = (
        <Flex align="center" justify="center" w="100%" h="100%">
          <Text>
            OPS.... Parece que houve uma falha na renderização desse exame,
            verifique as configurações dele!
          </Text>
          <Button
            colorScheme="yellow"
            onClick={() => navigate(`/Admin/Exams/${exam.id}`)}
          >
            Ir até configuração
          </Button>
        </Flex>
      );
      break;
  }

  const examRequestedData = moment(
    pet?.medicineRecords?.petExams.find((exam) => exam.name === exam.name)
      ?.requesteData
  ).toDate();
  return (
    <ChakraProvider>
      <Flex direction="column" h="100vh">
        {/* <Header title="Tabela de Laboratórios" url="/Labs/Exames" /> */}
        <Flex
          w="100%"
          my="6"
          mx="auto"
          px="6"
          direction={{ base: "column", lg: "row" }}
        >
          {/* <GenericSidebar>
            <GenericLink icon={BsArrowLeft} name="Voltar" path="/Labs/Exames" />
            <GenericLink icon={AiOutlineMenu} name="Menu" path="/Home" />
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
          </GenericSidebar> */}
          <Box height="auto" w="100%" borderRadius={8} bg="gray.200" p="8">
            <Flex
              direction={{ base: "column", lg: "row" }}
              gap={{ base: 6, lg: 0 }}
              align="center"
              m="4"
              w="100%"
              justify="space-between"
            >
              <Text fontSize="3xl">
                <strong>Dados do Exame</strong>
              </Text>
              <FileUpload examId={`${id}`} />
            </Flex>
            <TableContainer>
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th textColor="black">Caracteristicas</Th>
                    <Th textColor="black" colSpan={3}>
                      Informações
                    </Th>
                    {/* <Th textColor="black">Caracteristicas do Veterinário</Th> */}
                    <Th textColor="black">Dados do Veterinário</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td py={0} fontWeight="bold">
                      Cliente
                    </Td>
                    <Td py={3} colSpan={5} bg="white" borderX="1px solid black">
                      {pet?.customer?.name}
                    </Td>
                  </Tr>
                  <Tr>
                    <Td py={0} fontWeight="bold">
                      Animal
                    </Td>
                    <Td py={3} colSpan={5} bg="white" borderX="1px solid black">
                      {pet?.name}
                    </Td>
                  </Tr>
                  <Tr>
                    <Td py={0} fontWeight="bold">
                      Exame
                    </Td>
                    <Td py={3} colSpan={2} bg="white" borderX="1px solid black">
                      {
                        pet?.medicineRecords?.petExams.find(
                          (exam) => exam.name === exam.name
                        )?.name
                      }
                    </Td>
                    <Td
                      py={0}
                      fontWeight="bold"
                      bg="red.200"
                      textAlign="center"
                    >
                      Veterinário
                    </Td>
                    <Td py={3} colSpan={2} bg="white" borderX="1px solid black">
                      {
                        pet?.medicineRecords?.petExams.find(
                          (exam) => exam.name === exam.name
                        )?.requestedFor
                      }
                    </Td>
                  </Tr>
                  <Tr>
                    <Td py={0} fontWeight="bold">
                      Exame
                    </Td>
                    <Td py={3} colSpan={2} bg="white" borderX="1px solid black">
                      {new Intl.DateTimeFormat("pt-BR", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "2-digit",
                      }).format(examRequestedData)}
                    </Td>
                    <Td
                      py={0}
                      fontWeight="bold"
                      bg="gray.200"
                      textAlign="center"
                    >
                      CRMV
                    </Td>
                    <Td py={3} colSpan={2} bg="white" borderX="1px solid black">
                      {
                        pet?.medicineRecords?.petExams.find(
                          (exam) => exam.name === exam.name
                        )?.requestedCrm
                      }
                    </Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>

            {typeTableView}
          </Box>
        </Flex>
      </Flex>
    </ChakraProvider>
  );
}
