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
  Input,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { BiHome } from "react-icons/bi";
import { TbArrowBack } from "react-icons/tb";
import { useNavigate, useParams } from "react-router-dom";
import { LoadingSpinner } from "../../../components/Loading";
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
export interface ExamDetailsProps {
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

export interface CharacProps {
  name:string;
  id: number;
  characteristics: Array<
  {
    id: number;
    name: string;
    especie: Array<{
      name: string;
      refIdades: Array<{
        maxAge: number;
        absoluto: string
        relativo: string
      }>
    }>

  }>
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
  const { examId } = useParams<{ examId: string }>();
  const [examDetails, setExamDetails] = useState({} as ExamDetailsProps);
  const [examCharacs, setExamCharacs] = useState({} as CharacProps)
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
  }, []);


  const characsMapped: any = examCharacs.multiparts ? examCharacs.multiparts.flatMap((ch) => {
    return ch.characteristics.map((chs) => {
      return {
        id: chs.id,
        name: chs.name,
        refs: chs.especie.filter((e) => e.name === examDetails.medicine.pet.especie)
      }
    })
  }) : null

  const tableRefs:any = examCharacs?.characteristics ?  examCharacs?.characteristics.map((charac) => {
    return charac?.especie.find((data: any) => data.name === examDetails?.medicine?.pet?.especie)
   }) : null

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
                      <Tr key={ref.charac}>
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
    case examDetails?.isOnePart === true: 
    typeReportInExibition = (
      <Flex w="full" h="full" direction="column">
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
         <TableContainer w="100%" >
      <Table>
        <Thead>
        <Tr>
          <Th   fontSize="15"
        border="1px solid black"
        bg="blue.400"
        color="white">{examDetails.medicine.pet.name} </Th>
          <Th colSpan={2} border="1px solid black">Resultado</Th>
          <Th colSpan={2} border="1px solid black">Unidades</Th>
      
        {
          tableRefs ?  tableRefs[0]?.refIdades.map((ref: any) => <Th  colSpan={2}  border="1px solid black" key={`${tableRefs[0]?.name ? tableRefs[0]?.name : ""}${ref.maxAge ? ref.maxAge: "1"}`}>{`@VAL. REF ${tableRefs[0]?.name ? tableRefs[0]?.name : ""} ${ref.maxAge ? ref.maxAge: "1"}`}</Th>)  : 
          (<LoadingSpinner />)
        }
       
        


        </Tr>
        </Thead>
        <Tbody>
        <Tr fontWeight="bold">
        <Td border="1px solid black">Característica</Td>
        <Td border="1px solid black">Absoluto</Td>
        <Td border="1px solid black">Relativo</Td>
        <Td border="1px solid black">Un. Abs.</Td>
        <Td border="1px solid black">Un. Rel.</Td>
     
          {
            tableRefs ?  tableRefs[0]?.refIdades.map((ref: any) => <>
            <Td key={ref?.absoluto} border="1px solid black">Absoluto</Td>
           <Td key={ref?.relativo} border="1px solid black">Relativo</Td>
            </>)  : 
            (<LoadingSpinner />)
          }

      
        </Tr>

        {examCharacs ? examCharacs.characteristics?.map((charac, index) => {
      const table = charac?.especie.find((data: any) => data.name === examDetails.medicine.pet.especie)
      return (
        <Tr key={charac.id} fontWeight="bold">
        <Td border="1px solid black">{charac.name}</Td>
        {
          examDetails.reportExams[0].report.map((refs: {abs: string, rel: string, charac: string}) => (
            <>
              <Td border="1px solid black" bg="white">
         <Input defaultValue={refs.abs}  />
        </Td>
    
            </>
          ))
        }
      
        <Td border="1px solid black" bg="white"></Td>
        <Td border="1px solid black" bg="white">
          mg/dl
        </Td>
        {
          table?.refIdades.map((ref) => (
            <> 
            <Td key={ref.absoluto} border="1px solid black" bg="white">
            {ref.absoluto}
            </Td>
            <Td key={ref.relativo} border="1px solid black" bg="white">
            {ref.relativo}
            </Td>
        
              </>
         
          ))
        }
      </Tr>
             )
      }) : (<LoadingSpinner />) }
          
        </Tbody>
      </Table>

    </TableContainer>

      </Flex>
     
    )
    break;
    case examDetails?.isReportByText === true:
      typeReportInExibition = (
        <Flex width="full" h="full" direction="column">
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
          <Textarea minWidth={1100} minHeight="80%" defaultValue={examDetails?.reportExams[0]?.textReport} />
        </Flex>
      )
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
                        // href={`http://localhost:5000/labfile/${arq}`}
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
            <Button 
             onClick={() =>
              navigate(`/Home`)
            }
            colorScheme="teal" leftIcon={<BiHome size={24} />}>
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
          </Flex>
        </Flex>

        <Flex direction="column" h="90%" overflowY="auto" w="100%">
          {typeReportInExibition}
        </Flex>
      </Flex>
    </ChakraProvider>
  );
}
