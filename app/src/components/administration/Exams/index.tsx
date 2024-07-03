import {
  Text,
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  FormControl,
  Checkbox,
  TableContainer,
  Select,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { RiAddLine, RiPencilLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { GenericModal } from "../../../components/Modal/GenericModal";
import { api } from "../../../lib/axios";
import { toast } from "react-toastify";
import { ConfirmationDialog } from "../../dialogConfirmComponent/ConfirmationDialog";
import { BsFillTrashFill } from "react-icons/bs";
import { useQuery, useQueryClient, useMutation } from "react-query";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";

type ExamsDTO = {
  codexam: number;
  name: string;
  price: number;
  disponible: boolean;
  onePart: boolean;
  twoPart: boolean;
  byReport: boolean;
};

type CreateExamsDTO = {
  name: string;
  price: number;
  disponible: boolean;
  sector: number;
  onePart: boolean;
  twoPart: boolean;
  report: boolean;
};

interface SectorsDto {
  name: string;
  id: number;
}

interface PaginationInfos {
  totalPages: number;
  currentPage: number;
  totalExams: number;
}

export function ListExams() {
  const { register, handleSubmit } = useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [exams, setExams] = useState<ExamsDTO[]>([]);
  const [examsBackup, setExamsBackup] = useState<ExamsDTO[]>([]);
  const [sectors, setSectors] = useState<SectorsDto[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationInfos, setPaginationInfos] = useState<PaginationInfos>({
    totalPages: 0,
    currentPage: 0,
    totalExams: 0,
  });
  const [query, setQuery] = useState("");
  const SearchAlfabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];


  async function filterExams() {
    if (query === '') {
      setExams(examsBackup);
    } else {
      const filteredExams = examsBackup.filter(exam => 
        exam.name.toLowerCase().includes(query.toLowerCase())
      );
      setExams(filteredExams);
    }
  }

  useEffect(() => { 
    filterExams();
  }, [query, examsBackup]);

  async function getExamesListData() {
    const exams = await api.get(`/exams/old/all?page=${currentPage}`);
    setExams(exams.data.exams);
    setExamsBackup(exams.data.exams);
    setPaginationInfos({
      currentPage: exams.data.currentPage,
      totalPages: exams.data.totalPages,
      totalExams: exams.data.totalProceds,
    });

  }

  async function getSectors() {
    const sectors = await api.get("/sectors");
    setSectors(sectors.data);
  }

  async function getProcedureByLetter(letter: string){
    const response = await api.get(`/exams/old/letter/${letter}`);
    setExams(response.data);
    setExamsBackup(response.data);
    setPaginationInfos({
      currentPage: response.data.currentPage,
      totalPages: response.data.totalPages,
      totalExams: response.data.totalExams,
    });
  }

  const {data, isLoading} = useQuery({
    queryKey: ['adminExams', currentPage],
    queryFn: getExamesListData,
  })

   const queryClient = useQueryClient();
  const {
    isLoading: sectorLoading,
    error: sectorError,
    data: sectorsData,
  } = useQuery("sectors", () => getSectors);

  const { mutate } = useMutation(
    (data: CreateExamsDTO) => api.post("/exams", data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("adminExams");
        toast.success("Exame criado com sucesso");
      },
      onError: (error) => {
        toast.error("Falha ao criar novo Exame");
        console.error(error);
      },
    }
  );

  function incrementPage() {
    setCurrentPage(prevCount => paginationInfos.currentPage < paginationInfos.totalPages ? prevCount + 1 : paginationInfos.totalPages);
  }

  function decrementPage() {
    setCurrentPage(prevCount => paginationInfos.currentPage > 1 ? prevCount - 1 : 1);
    
  }

  const handleCreateExam: SubmitHandler<FieldValues> = (values) => {
    try {
      mutate({
        name: values.name,
        price: Number(values.price),
        disponible: values.disponible,
        onePart: values.onePart,
        twoPart: values.twoPart,
        report: values.report,
        sector: values.sector,
      });
    } catch (error) {
      console.error(error);
    }
  };

  async function DeleteExam(ExamId: string) {
    await api
      .delete(`/exams/${ExamId}`)
      .then(() => {
        toast.success("Exame deletado com sucesso!!");
      })
      .catch(() => toast.error("Algo deu errado!!"));
  }

  return (
    <Flex
      py={{ base: 10, xl: 0 }}
      direction="column"
      gap="4"
      w="full"
      maxH="48rem"
      overflow="hidden"
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
              fontSize={{ base: "lg", lg: "2xl" }}
              fontWeight="bold"
              pl="2"
              w="100%"
              mb="5"
              display="flex"
              flexDirection={{ base: "column", md: "row" }}
              gap={{ base: 3, md: 0 }}
              justifyContent="space-between"
            >
              Painel de Exames
              <Button
                py="6"
                fontSize={{ base: "sm", lg: "md" }}
                onClick={() => setIsModalOpen(true)}
                colorScheme="whatsapp"
                leftIcon={
                  <Icon
                    as={RiAddLine}
                    fontWeight="bold"
                    fontSize={{ base: "md", lg: "xl" }}
                  />
                }
              >
                Cadastrar Exame
              </Button>
            </Heading>
            <Flex mb="2"
            direction={{ base: "column", lg: "row" }}
            align="center"
            w="100%">
              <Flex
              alignItems="center"
              gap={1}
              mb={{ base: 2, lg: 0 }}
              w={{ base: "full", lg: "auto" }}
              pr="2"
            >
              <Text fontWeight="bold" fontSize={{ base: "sm", lg: "md" }}>
                Pesquisar
              </Text>
              <InputGroup
                w="-moz-fit-content"
                fontSize={{ base: "sm", lg: "md" }}
              >
                <InputLeftElement pointerEvents="none">
                  <AiOutlineSearch />
                </InputLeftElement>
                <Input
                  fontSize={{ base: "sm", lg: "md" }}
                  border="1px"
                  bgColor="white"
                  placeholder="Nome do Exame"
                  value={query}
                  onChange={(ev) => setQuery(ev.target.value)}
                />
              </InputGroup>
            </Flex>   
              <HStack >
              <Button colorScheme="teal">
                  Total de Exames {paginationInfos.totalExams}
                </Button>
                <Button colorScheme="teal">
                  Páginas {paginationInfos.totalPages}
                </Button>
                <Button colorScheme="teal">
                  Página Atual {paginationInfos.currentPage}
                </Button>
                <Button
                  colorScheme="yellow"
                  gap={4}
                  onClick={()=> {decrementPage()}}
                >
                  <BiLeftArrow />
                  Página Anterior
                </Button>
                <Button
                  colorScheme="yellow"
                  gap={4}
                  onClick={()=> {incrementPage()}}
                >
                  Próxima Página
                  <BiRightArrow />
                </Button>
              </HStack>
            </Flex>
            <HStack spacing={2} m="2" w={"full"}>
            {SearchAlfabet.map((letter) => (
              <Button
                _hover={{
                  bgColor: "green.300",
                }}
                colorScheme="whatsapp"
                 onClick={() => getProcedureByLetter(letter.toUpperCase())}
                fontWeight="bold"
                fontSize="22px"
              >
                {letter.toUpperCase()}
              </Button>
            ))}
          </HStack>
            <TableContainer w="full">
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Nome</Th>
                    <Th>Preço</Th>
                    <Th>Disponivel</Th>
                    <Th>Duas Partes</Th>
                    <Th textAlign="center">Configurar</Th>
                    <Th textAlign="center">Deletar</Th>
                  </Tr>
                </Thead>

                <Tbody>
                  {exams.map((exam) => (
                    <Tr key={exam.codexam} fontSize="18">
                      <Td fontSize={{ base: "12", lg: "sm" }}>
                        <Box>
                          <Link to={`/Admin/Exams/Details/${exam.codexam}`}>
                            <Text fontWeight="bold" color="gray.800">
                              {exam.name}
                            </Text>
                          </Link>
                        </Box>
                      </Td>
                      <Td fontSize={{ base: "12", lg: "sm" }}>
                        <Text fontWeight="bold" color="gray.800">
                          {new Intl.NumberFormat("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          }).format(exam.price)}
                        </Text>
                      </Td>
                      <Td
                        fontSize={{ base: "12", lg: "sm" }}
                        fontWeight="bold"
                        color="gray.800"
                        textAlign="center"
                        bgColor={exam.disponible ? "green.200" : "red.100"}
                      >
                        {exam.disponible ? "SIM" : "NÃO"}
                      </Td>
                      <Td
                        fontSize={{ base: "12", lg: "sm" }}
                        textAlign="center"
                        fontWeight="bold"
                        color="gray.800"
                      >
                        {exam.twoPart ? "SIM" : "NÃO"}
                      </Td>

                      <Td>
                        <Link to={`/Admin/Exams/${exam.codexam}`}>
                          <Button
                            as="a"
                            size="sm"
                            fontSize="sm"
                            colorScheme="yellow"
                            leftIcon={<Icon as={RiPencilLine} />}
                          >
                            Configurar
                          </Button>
                        </Link>
                      </Td>
                      <Td>
                        <ConfirmationDialog
                          disabled={false}
                          icon={<BsFillTrashFill fill="white" size={16} />}
                          buttonTitle="Deletar Exame"
                          whatIsConfirmerd="Tem certeza que deseja Excluir esse Exame?"
                          describreConfirm="Excluir a Exame é uma ação irreversivel, tem certeza que deseja excluir?"
                          callbackFn={() => DeleteExam(exam.codexam.toString())}
                        />
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </Flex>

          <GenericModal
            isOpen={isModalOpen}
            onRequestClose={() => setIsModalOpen(false)}
          >
            <FormControl as="form" onSubmit={handleSubmit(handleCreateExam)}>
              <TableContainer>
                <Table
                  w="full"
                  variant="simple"
                  size={{ base: "sm", lg: "lg" }}
                  display={{ base: "none", md: "block" }}
                >
                  <Thead>
                    <Tr>
                      <Th
                        fontSize={{ base: "sm", lg: "md" }}
                        colSpan={2}
                        textAlign="center"
                      >
                        Cadastro de Exames
                      </Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    <Tr>
                      <Td fontSize={{ base: "sm", lg: "md" }} py={1}>
                        Nome do Exame
                      </Td>
                      <Td fontSize={{ base: "sm", lg: "md" }} py={1}>
                        <Input {...register("name")} name="name" />
                      </Td>
                    </Tr>
                    <Tr>
                      <Td
                        fontSize={{ base: "sm", lg: "md" }}
                        fontWeight="medium"
                        py={1}
                      >
                        Preço
                      </Td>
                      <Td py={1}>
                        <Input {...register("price")} name="price" />
                      </Td>
                    </Tr>
                    <Tr>
                      <Td
                        fontSize={{ base: "sm", lg: "md" }}
                        fontWeight="medium"
                        py={1}
                      >
                        Disponivel
                      </Td>
                      <Td py={1}>
                        <Checkbox
                          border="2px"
                          {...register("disponible")}
                          name="disponible"
                        />
                      </Td>
                    </Tr>
                    <Tr>
                      <Td
                        fontSize={{ base: "sm", lg: "md" }}
                        fontWeight="medium"
                        py={1}
                      >
                        Laboratório{" "}
                      </Td>
                      <Td py={1}>
                        <Select
                          borderColor="blackAlpha.800"
                          _hover={{
                            backgroundColor: "gray.100",
                            borderColor: "blackAlpha.800",
                          }}
                          // {...register("sector")}
                          name="sector"
                        >
                          <option value="Veterinário">Não Terceirizado</option>
                          <option value="Veterinário">
                            Laboratório de imagem
                          </option>
                        </Select>
                      </Td>
                    </Tr>
                    <Tr>
                      <Td
                        fontSize={{ base: "sm", lg: "md" }}
                        fontWeight="medium"
                        py={1}
                      >
                        Setor
                      </Td>
                      <Td py={1}>
                        <Select
                          borderColor="blackAlpha.800"
                          _hover={{
                            backgroundColor: "gray.100",
                            borderColor: "blackAlpha.800",
                          }}
                          {...register("sector")}
                          name="sector"
                        >
                          {sectors.map((sector) => (
                            <option key={sector.id} value={sector.id}>
                              {sector.name}
                            </option>
                          ))}
                          <option value="Veterinário">Veterinário</option>
                          <option value="Laboratório">Laboratório</option>
                          <option value="Internação">Internação</option>
                        </Select>
                      </Td>
                    </Tr>
                  </Tbody>
                </Table>
                <Table variant="simple" display={{ base: "none", md: "block" }}>
                  <Thead>
                    <Tr>
                      <Th
                        fontSize={{ base: "sm", lg: "md" }}
                        fontWeight="medium"
                        colSpan={2}
                        textAlign="center"
                      >
                        Uma Parte
                      </Th>
                      <Th
                        fontSize={{ base: "sm", lg: "md" }}
                        fontWeight="medium"
                        colSpan={2}
                        textAlign="center"
                      >
                        Duas Partes
                      </Th>
                      <Th
                        fontSize={{ base: "sm", lg: "md" }}
                        fontWeight="medium"
                        colSpan={2}
                        textAlign="center"
                      >
                        Formato de Laudo
                      </Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    <Tr>
                      <Th colSpan={2} textAlign="center">
                        <Checkbox
                          {...register("onePart")}
                          name="onePart"
                          borderColor="blackAlpha.500"
                        />
                      </Th>
                      <Th colSpan={2} textAlign="center">
                        <Checkbox
                          {...register("twoPart")}
                          name="twoPart"
                          borderColor="blackAlpha.500"
                        />
                      </Th>
                      <Th colSpan={2} textAlign="center">
                        <Checkbox
                          {...register("report")}
                          name="report"
                          borderColor="blackAlpha.500"
                        />
                      </Th>
                    </Tr>
                  </Tbody>
                </Table>
                {/* Mobile */}
                <Table
                  w="full"
                  variant="simple"
                  size={{ base: "sm", lg: "lg" }}
                  display={{ md: "none" }}
                >
                  <Thead>
                    <Tr>
                      <Th
                        fontSize={{ base: "sm", lg: "md" }}
                        colSpan={2}
                        textAlign="center"
                      >
                        Cadastro de Exames
                      </Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    <Tr>
                      <Td fontSize={{ base: "sm", lg: "md" }} py={1}>
                        Nome do Exame
                      </Td>
                    </Tr>
                    <Tr>
                      <Td fontSize={{ base: "sm", lg: "md" }} py={1}>
                        <Input {...register("name")} name="name" />
                      </Td>
                    </Tr>
                    <Tr>
                      <Td
                        fontSize={{ base: "sm", lg: "md" }}
                        fontWeight="medium"
                        py={1}
                      >
                        Preço
                      </Td>
                    </Tr>
                    <Tr>
                      {" "}
                      <Td py={1}>
                        <Input {...register("price")} name="price" />
                      </Td>
                    </Tr>

                    <Tr>
                      {" "}
                      <Td
                        display="flex"
                        justifyContent="space-between"
                        gap={4}
                        textAlign="center"
                        fontSize={{ base: "sm", lg: "md" }}
                        fontWeight="medium"
                        colSpan={2}
                      >
                        Disponivel{" "}
                        <Checkbox
                          px="10px"
                          borderColor="blackAlpha.500"
                          {...register("disponible")}
                          name="disponible"
                        ></Checkbox>
                      </Td>
                    </Tr>

                    <Tr>
                      <Td
                        fontSize={{ base: "sm", lg: "md" }}
                        fontWeight="medium"
                        py={1}
                      >
                        Setor
                      </Td>
                    </Tr>
                    <Tr>
                      {" "}
                      <Td py={1}>
                        <Select
                          fontSize={{ base: "sm", lg: "md" }}
                          borderColor="blackAlpha.800"
                          _hover={{
                            backgroundColor: "gray.100",
                            borderColor: "blackAlpha.800",
                          }}
                          {...register("sector")}
                          name="sector"
                        >
                          {sectors.map((sector) => (
                            <option key={sector.id} value={sector.id}>
                              {sector.name}
                            </option>
                          ))}
                          <option value="Veterinário">Veterinário</option>
                          <option value="Laboratório">Laboratório</option>
                          <option value="Internação">Internação</option>
                        </Select>
                      </Td>
                    </Tr>
                  </Tbody>
                </Table>
                <Table variant="simple" display={{ md: "none" }}>
                  <Thead>
                    <Tr>
                      <Td
                        fontSize={{ base: "sm", lg: "md" }}
                        fontWeight="medium"
                        colSpan={2}
                      >
                        Uma Parte
                      </Td>
                      <Td colSpan={2} textAlign="center">
                        <Checkbox
                          {...register("onePart")}
                          name="onePart"
                          borderColor="blackAlpha.500"
                        />
                      </Td>
                    </Tr>
                    <Tr>
                      <Td
                        fontSize={{ base: "sm", lg: "md" }}
                        fontWeight="medium"
                        colSpan={2}
                      >
                        Duas Partes
                      </Td>{" "}
                      <Td colSpan={2} textAlign="center">
                        <Checkbox
                          {...register("twoPart")}
                          name="twoPart"
                          borderColor="blackAlpha.500"
                        />
                      </Td>
                    </Tr>
                    <Tr>
                      <Td
                        fontSize={{ base: "sm", lg: "md" }}
                        fontWeight="medium"
                        colSpan={2}
                      >
                        Formato de Laudo
                      </Td>
                      <Td colSpan={2} textAlign="center">
                        <Checkbox
                          {...register("report")}
                          name="report"
                          borderColor="blackAlpha.500"
                        />
                      </Td>
                    </Tr>
                  </Thead>
                  <Tbody>
                    <Tr></Tr>
                  </Tbody>
                </Table>
              </TableContainer>
              <Button
                width="full"
                type="submit"
                colorScheme="green"
                isLoading={isLoading}
              >
                Cadastrar
              </Button>
            </FormControl>
          </GenericModal>
        </Flex>
      </Box>
    </Flex>
  );
}
