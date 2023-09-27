import {
  ChakraProvider,
  Flex,
  Button,
  Text,
  TableContainer,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Link,
  Textarea,
} from "@chakra-ui/react";
import { useState, useEffect, Suspense } from "react";
import { BiHome } from "react-icons/bi";
import { TbArrowBack } from "react-icons/tb";
import { useNavigate, useParams } from "react-router-dom";
import { LoadingSpinner } from "../../../components/Loading";
import { ViewTableBioCompleto } from "../../../components/TablesLab/ViewTableBioCompleto";
import { api } from "../../../lib/axios";

type PetProps = {
  id: number;
  name: string;
  especie: string;
  race: string;
  sexo: string;
  weigth: string;
  customer: {
    name: string;
  };
};
interface ExamDetailsProps {
  id: number;
  name: string;
  requesteData: Date | string;
  requestedFor: string;
  responsibleForExam: string;
  isMultiPart: boolean;
  isReportByText: boolean;
  isOnePart: boolean;
  reportExams: Array<any>;
  medicine: {
    pet: PetProps;
  };
}

interface CharacProps {
multiparts: Array<{
  characteristics: Array<{
    id: number
    name: string
    especie: Array<{
      name: string
      refIdades: Array<{
        maxAge: number
        absoluto: string
        relativo: string
      }>
    }>
  }>
}>
}

export function ExamsDetails() {
  const [typeReport, setTypeReport] = useState(0);
  const { examId } = useParams<{ examId: string }>();
  const [examDetails, setExamDetails] = useState({} as ExamDetailsProps);
  const [examCharacs, setExamCharacs] = useState({} as CharacProps)
  const [typeTable, setTypeTable] = useState({} as any);
  const navigate = useNavigate();

  async function getExamDetails() {
    try {
      const response = await api.get(`/labexam/${examId}`);
      setExamDetails(response.data.examDetails);
      setExamCharacs(response.data.examRefs)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getExamDetails();
  }, [typeReport]);


  const characsByEspecie = examCharacs.multiparts ? examCharacs.multiparts?.flatMap((charac) => {
    return charac.characteristics?.flatMap((refs) => refs.especie?.filter(e => e.name === examDetails?.medicine?.pet?.especie))
  }) : null

  console.log("WTFFFF ", characsByEspecie)
  let typeReportInExibition;
  switch (true) {
    case examDetails?.isMultiPart === true:
      typeReportInExibition = (
        <Flex width="full" h="full">
          <TableContainer w="100%" h="100%">
            {examDetails.reportExams[0].report.map((data: { name: string, refs: Array<{abs: string, rel: string, charac: string}> }) => (
              <Table>
                <Thead>
                  <Tr key={data?.name}>
                    <Th
                      fontSize="15"
                      border="1px solid black"
                      bg="blue.400"
                      color="white"
                    >
                      {data?.name}
                    </Th>
                    <Th colSpan={2} border="1px solid black">
                      Resultado
                    </Th>
                    <Td>@Val</Td>
                  </Tr>
                </Thead>
                <Tbody>
                <Tr fontWeight="bold">
                    <Td border="1px solid black">Característica</Td>
                    <Td border="1px solid black">Absoluto</Td>
                    <Td border="1px solid black">Relativo</Td>
                   
           
             
                  </Tr>
                  {
                    data.refs.map((ref) => (
                      <Tr>
                        <Td  border="1px solid black" fontWeight="bold">{ref.charac}</Td>
                        <Td  border="1px solid black" fontWeight="bold">{ref.abs}</Td>
                        <Td  border="1px solid black" fontWeight="bold">{ref.rel}</Td>
                      </Tr>
                    ))
                  }
                </Tbody>
              </Table>
            ))}
          </TableContainer>
        </Flex>
      );
      break;
    case typeReport === 2:
      typeReportInExibition = (
        <Flex
          w="100vw"
          h="100vh"
          overflowY="auto"
          align="center"
          direction="column"
        >
          <Text mb="4" fontWeight="bold" fontSize="2xl">
            LISTAGEM DE ARQUIVOS PARA DOWLOAD NESTE EXAME
          </Text>
          <Flex h="78px" w="100%" align="center" justify="center">
            <TableContainer fontWeight="bold" fontSize="1xl">
              <Table>
                <Thead>
                  <Tr>
                    <Th>Nome do Exame</Th>
                    <Th>Data Solicitada</Th>
                    <Th>Responsável pelo Exame</Th>
                    <Th>Animal</Th>
                    <Th>Peso</Th>
                    <Th>Sexo</Th>
                    <Th>Especie</Th>
                    <Th>Raça</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>{examDetails.name}</Td>
                    <Td>
                      {new Intl.DateTimeFormat("pt-BR").format(
                        new Date(
                          examDetails.requesteData
                            ? examDetails.requesteData
                            : new Date()
                        )
                      )}
                    </Td>
                    <Td>
                      {examDetails.responsibleForExam
                        ? examDetails.responsibleForExam
                        : "Não Definido"}
                    </Td>
                    <Td>{examDetails?.medicine?.pet?.name}</Td>
                    <Td>{examDetails?.medicine?.pet?.weigth}</Td>
                    <Td>{examDetails?.medicine?.pet?.sexo}</Td>
                    <Td>{examDetails?.medicine?.pet?.especie}</Td>
                    <Td>{examDetails?.medicine?.pet?.race}</Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>
          </Flex>
          <Flex
            align="center"
            justify="center"
            flex="1"
            w="100%"
            gap="8"
            direction="column"
          >
            {examDetails ? (
              examDetails.reportExams.map((exam: any) => (
                <Flex align="center" h="100%" direction="column" key={exam.id}>
                  <Text>
                    Data de Laudo{" "}
                    {new Intl.DateTimeFormat("pt-BR").format(
                      new Date(exam.createdAt)
                    )}
                  </Text>

                  {exam.textReport ? (
                    <Textarea
                      minHeight={600}
                      minWidth={800}
                      border="2px"
                      defaultValue={exam.textReport}
                    />
                  ) : (
                    <h1>
                      Esse laudo não foi por texto verifique as outras opções!
                    </h1>
                  )}
                </Flex>
              ))
            ) : (
              <h1>SEM ARQUIVOS DISPONIVEIS</h1>
            )}
          </Flex>
        </Flex>
      );
      break;
    case typeReport === 3:
      typeReportInExibition = (
        <Suspense fallback={<LoadingSpinner />}>
          <Flex w="100%" h="auto" m="4">
            <ViewTableBioCompleto data={typeTable} />
          </Flex>
        </Suspense>
      );
      break;
    default:
      typeReportInExibition = (
        <Flex w="100%" h="100%" align="center" direction="column">
          <Text mb="4" fontWeight="bold" fontSize="2xl">
            LISTAGEM DE ARQUIVOS PARA DOWLOAD NESTE EXAME
          </Text>
          <Flex h="78px" w="100%" align="center" justify="center">
            <TableContainer fontWeight="bold" fontSize="1xl">
              <Table>
                <Thead>
                  <Tr>
                    <Th>Nome do Exame</Th>
                    <Th>Data Solicitada</Th>
                    <Th>Responsável pelo Exame</Th>
                    <Th>Animal</Th>
                    <Th>Peso</Th>
                    <Th>Sexo</Th>
                    <Th>Especie</Th>
                    <Th>Raça</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>{examDetails.name}</Td>
                    <Td>
                      {new Intl.DateTimeFormat("pt-BR").format(
                        new Date(
                          examDetails.requesteData
                            ? examDetails.requesteData
                            : new Date()
                        )
                      )}
                    </Td>
                    <Td>
                      {examDetails.responsibleForExam
                        ? examDetails.responsibleForExam
                        : "Não Definido"}
                    </Td>
                    <Td>{examDetails?.medicine?.pet?.name}</Td>
                    <Td>{examDetails?.medicine?.pet?.weigth}</Td>
                    <Td>{examDetails?.medicine?.pet?.sexo}</Td>
                    <Td>{examDetails?.medicine?.pet?.especie}</Td>
                    <Td>{examDetails?.medicine?.pet?.race}</Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>
          </Flex>
          <Flex mt="4" h="auto" w="auto" gap="8" wrap="wrap">
            {examDetails ? (
              examDetails?.reportExams?.map((exam: any) => (
                <Flex align="center" direction="column" key={exam.id}>
                  <Text>
                    Data de Laudo{" "}
                    {new Intl.DateTimeFormat("pt-BR").format(
                      new Date(exam.createdAt)
                    )}
                  </Text>

                  {exam.internalReport.length >= 1 ? (
                    exam.internalReport.map((arq: any) => (
                      <Link
                        bgColor="green.200"
                        border="2px"
                        rounded="full"
                        w="auto"
                        h="auto"
                        m="4"
                        p="4"
                        justifyContent="center"
                        target="_blank"
                        href={`http://localhost:5000/labfile/${arq}`}
                      >
                        {arq}
                      </Link>
                    ))
                  ) : (
                    <h1>Sem arquivos disponiveis verifique outras opções!</h1>
                  )}
                </Flex>
              ))
            ) : (
              <h1>SEM ARQUIVOS DISPONIVEIS</h1>
            )}
          </Flex>
        </Flex>
      );
  }

  return (
    <ChakraProvider>
      <Flex width="100vw" height="100vh" bgColor="white" direction="column">
        <Flex w="100%" height="10vh" bgColor="gray.200">
          <Flex align="center" gap="2">
            <Button colorScheme="teal" leftIcon={<BiHome size={24} />}>
              Home
            </Button>

            <Button
              onClick={() =>
                navigate(`/Vets/Workspace/${examDetails?.medicine?.pet.id}`)
              }
              colorScheme="yellow"
              leftIcon={<TbArrowBack size={24} />}
            >
              Voltar
            </Button>

            <Button onClick={() => setTypeReport(1)} colorScheme="whatsapp">
              Exibir Laudos por arquivos
            </Button>

            <Button onClick={() => setTypeReport(2)} colorScheme="whatsapp">
              Exibir Laudos por texto
            </Button>
          </Flex>
        </Flex>

        <Flex direction="column" h="90%" overflowY="auto" w="100%">
          {typeReportInExibition}
        </Flex>
      </Flex>
    </ChakraProvider>
  );
}
