import {
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
import { Suspense, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Input } from "../../components/admin/Input";
import { ConsultsPetDetails, ExamsProps, PetDetaisl } from "../../interfaces";
import { api } from "../../lib/axios";
import { useQuery } from "react-query";
import { LoadingSpinner } from "../Loading";
import { NotAllowedError } from "../../errors/NotAllowedError";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";

type ExamsVetProps = {
  InAdmission: boolean;
  admissionQueueId?: string;
};

type ExamsDTO = {
  codexam: number;
  name: string;
  price: number;
};

export function ExamsVet({ InAdmission, admissionQueueId }: ExamsVetProps) {
  const { id, queueId } = useParams<{ id: string; queueId: string }>();
  const [petDetails, setPetDetails] = useState({} as PetDetaisl);
  const [exams, setExams] = useState<any[]>([])
  const user = JSON.parse(localStorage.getItem("user") as string);
  const [examName, setExamName] = useState("");
  const [searchByLetter, setSearchByLetter] = useState("");
  const [pagination, SetPagination] = useState(1)
  const [consultDetails, setConsultDetails] = useState(
    {} as ConsultsPetDetails
  );
  const SearchAlfabet = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ];
  const [paginationInfos, setPaginationInfos] = useState({
    totalPages: 0,
    currentPage: 0,
    totalProceds: 0
  })


  function incrementPage() {
    SetPagination(prevCount => pagination < paginationInfos.totalPages ? prevCount + 1 : paginationInfos.totalPages);
  }

  function decrementPage() {
    SetPagination(prevCount => pagination > 1 ? prevCount - 1 : 1);
  }

  async function getExamsByHealthInsurance() {
    const response = await api.get(`/exam/health/${consultDetails.healthInsuranceName}/${pagination}`)
    setExams(response.data.procedures);
    setPaginationInfos({
      currentPage: response.data.currentPage,
      totalPages: response.data.totalPages,
      totalProceds: response.data.totalProceds,
    });
  }
  async function getQueueDetails() {
    const response = await api.get(`/queue/details/${queueId}`)
    setConsultDetails(response.data)
  }

  async function getExams () {
    if (examName.length >= 1) {
      const response = await api.get(`/exams/old/${examName}`)
      setExams(response.data.exams)
      setPaginationInfos({
       currentPage: response.data.currentPage,
       totalPages: response.data.totalPages,
       totalProceds: response.data.totalProceds,
     });
    } else {
   const response = await api.get("/exams/old/all");
   setExams(response.data.exams)
   setPaginationInfos({
    currentPage: response.data.currentPage,
    totalPages: response.data.totalPages,
    totalProceds: response.data.totalProceds,
  });

    }
  }

  async function getPetExams() {
    const response = await api.get(`/pets/${id}`);
    setPetDetails(response.data);
  }

  useQuery('queueDetails', getQueueDetails)

  const {refetch: refetchPets} = useQuery('petExamsDetails', getPetExams)
  
  const {isLoading, refetch } = useQuery("examsDetails", getExams);


  async function searchExamByName() {
    const response = await api.get(`/exams/old/${examName}`);
    setExams(response.data);
    setPaginationInfos({
      currentPage: response.data.currentPage,
      totalPages: response.data.totalPages,
      totalProceds: response.data.totalProceds,
    });
  }

  async function searchByFirstLetter() {
    const response = await api.get(`/exams/old/letter/${searchByLetter}`);
    setExams(response.data);
    setPaginationInfos({
      currentPage: response.data.currentPage,
      totalPages: response.data.totalPages,
      totalProceds: response.data.totalProceds,
    });
  }

  async function setOldExamInPet(examId: number) {

    try {
      const allowedEspecie = exams.find((esp: any, ind: any) => esp.codexam === examId);
      const allowedSetExam =  allowedEspecie.appicableEspecies.map((esp: any) => {
           if(esp.name.includes(petDetails.especie)){
             throw new NotAllowedError('Especie não permitida!')
           }
   
     
         })
      const data = {
        RequestedByVetId: user.id,
        RequestedByVetName: user.consultName,
        RequestedCrm: user.crm,
        isAdmission: InAdmission,
      };

      if (InAdmission === true) {
        await api.post(
          `/exams/old/${examId}/${petDetails.id}/${petDetails.totalAcc.id}/${admissionQueueId}`,
          data
        );
        refetch()
        refetchPets()
        toast.success("Exame adicionado Ala Internação!");
      } else {
        await api.post(
          `/exams/old/${examId}/${petDetails.id}/${petDetails.totalAcc.id}/${queueId}`,
          data
        );
        refetch()
        refetchPets()
        toast.success("Exame adicionado Ala Veterinários");
      }
    } catch (error) {
  
      if(error instanceof NotAllowedError) {
        toast.error(error.message)
      } else {
        toast.error("Falha ao cadastar exame!")
      }
      
     
    }
  }

  async function deleteExam(
    examId: string | number,
    examPrice: string | number,
    linkedDebitId: number | null
  ) {
    try {
      const confirmation = window.confirm(
        "DELETAR E UMA AÇÃO IRREVERSIVEL TEM CERTEZA QUE DESEJA CONTINUAR?"
      );

      if (confirmation === true) {
        await api.delete(
          `/petexam/${examId}/${petDetails.totalAcc.id}/${examPrice}/${linkedDebitId}`
        );
        refetch()
        refetchPets()
        toast.warning("Deletado com sucesso!");
      } else {
        return;
      }
    } catch (error) {
      toast.error("Falha ao Deletar!");
      console.log(error);
    }
  }



  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <Flex w="100%" height="35vh" align="center" overflowY="auto">
        <TableContainer overflowY="auto" w="100%" height="100%">
          <Table>
            <Thead>
              <Tr bgColor="cyan.100">
                <Th color="black" fontSize="1xl" border="2px" w="400px">
                  NOME
                </Th>
                <Th color="black" fontSize="1xl" border="2px" w="200px">
                  COLETA
                </Th>
                <Th color="black" fontSize="1xl" border="2px" w="200px">
                  DATA
                </Th>
                <Th color="black" fontSize="1xl" border="2px" w="200px">
                  REALIZADO ?
                </Th>

                <Th color="black" fontSize="1xl" border="2px" w="200px">
                  EXCLUSÃO
                </Th>
                <Th color="black" fontSize="1xl" border="2px" w="200px">
                  ETIQUETA
                </Th>
              </Tr>
            </Thead>

            <Tbody>
              {petDetails.exams?.map((exam) => (
                <Tr key={exam.id}>
                  <Td
                    border="2px"
                    fontSize="1xl"
                    fontWeight="bold"
                    color="green.700"
                  >
                    {exam.name}
                  </Td>
                  <Td border="2px" fontSize="1xl" fontWeight="bold">
                    {exam.coleted != null ? exam.coleted : "Sem coleta"}
                  </Td>
                  <Td border="2px" fontSize="1xl" fontWeight="bold">
                    {new Intl.DateTimeFormat("pt-BR").format(
                      new Date(
                        exam.requestedData ? exam.requestedData : new Date()
                      )
                    )}
                  </Td>
                  <Td border="2px" fontSize="1xl" fontWeight="bold">
                    {exam.doneExam === true ? "SIM" : "NÃO"}
                  </Td>

                  <Td border="2px" fontSize="1xl" fontWeight="bold">
                    <Button
                      colorScheme="red"
                      isDisabled={exam.doneExam}
                      onClick={() => {
                        console.log(exam);
                        deleteExam(
                          exam.id,
                          exam.price,
                          exam.linkedConsultId != null
                            ? exam.linkedConsultId
                            : exam.linkedAdmissionId
                        );
                      }}
                    >
                      EXCLUIR ?
                    </Button>
                  </Td>
                  <Td border="2px" fontSize="1xl" fontWeight="bold">
                    ETIQUETA
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Flex>

      <Flex w="100%" height="65vh" direction="column">
        <Flex
          height="98px"
          w="100%"
          p={2}
          direction="column"
          bgColor="cyan.100"
          align="center"
          justify="center"
          gap={2}
        >
          <HStack>
            
   	      	{
                  consultDetails?.healthInsuranceId ? <Button onClick={() => getExamsByHealthInsurance()} colorScheme="whatsapp" w="300px">Plano de Saúde</Button> : <></>
                }
            <Button width="180px" onClick={() => getExams()} colorScheme="teal">Particular</Button>
            <Input
              placeholder="Nome do Exame"
              height="38px"
              name="filter"
              onChange={(ev) => {
                setExamName(ev.target.value)
                searchExamByName()
              }}
            />
            
      <HStack>
           
              <Button colorScheme="teal">
                Páginas {paginationInfos?.totalPages}
              </Button>
              <Button colorScheme="teal">
                Página Atual {paginationInfos?.currentPage}
              </Button>
              <Button
                colorScheme="yellow"
                gap={4}
                onClick={() => decrementPage()}
              >
                <BiLeftArrow />
                Página Anterior
              </Button>
              <Button
                colorScheme="yellow"
                gap={4}
                onClick={() => incrementPage()}
              >
                Próxima Página
                <BiRightArrow />
              </Button>
            </HStack>
          </HStack>
          <HStack spacing={2}>
            {SearchAlfabet.map((letter) => (
              <Button
                _hover={{
                  bgColor: "green.300",
                }}
                colorScheme="whatsapp"
                onClick={() => {
                  setSearchByLetter(letter)
                  searchByFirstLetter()}
                }
                fontWeight="bold"
                fontSize="22px"
              >
                {letter.toUpperCase()}
              </Button>
            ))}
          </HStack>
      
        </Flex>
        <TableContainer w="100%" height="100%" overflowY="auto">
          <Table>
            <Thead>
              <Tr>
                <Th color="black" fontSize="1xl" border="2px" w="40%">
                  NOME
                </Th>
                <Th color="black" fontSize="1xl" border="2px" w="40%">
                  VALOR
                </Th>
                <Th color="black" fontSize="1xl" border="2px">
                  INCLUIR EXAME
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {exams?.map((exam: ExamsDTO) => (
                <Tr key={exam.codexam}>
                  <Td border="2px">{exam.name}</Td>
                  <Td border="2px">R$ {exam.price}</Td>
                  <Td border="2px">
                    <Button
                      w="100%"
                      onClick={() => setOldExamInPet(exam.codexam)}
                      colorScheme="whatsapp"
                    >
                      INCLUIR EXAME
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Flex>
    </>
  );
}
