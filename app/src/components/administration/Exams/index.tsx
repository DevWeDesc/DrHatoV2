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
} from "@chakra-ui/react";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { RiAddLine, RiPencilLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { GenericModal } from "../../../components/Modal/GenericModal";
import { api } from "../../../lib/axios";
import { toast } from "react-toastify";
import { Input } from "../../../components/admin/Input";
import { ConfirmationDialog } from "../../dialogConfirmComponent/ConfirmationDialog";
import { BsFillTrashFill } from "react-icons/bs";
import { useQuery, useQueryClient, useMutation } from "react-query";

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
  available: boolean;
  examsType: any;
};

export function ListExams() {
  const { register, handleSubmit } = useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [exams, setExams] = useState<ExamsDTO[]>([]);

  async function getExamesListData() {
    const exams = await api.get("/exams/old/all");
    setExams(exams.data.exams);
  }

  const queryClient = useQueryClient();
  const { isLoading, error } = useQuery("adminExams", () => getExamesListData);
  const { mutate } = useMutation(
    (data: CreateExamsDTO) => api.post("exams", data),
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

  const handleCreateExam: SubmitHandler<FieldValues> = (values) => {
    try {
      mutate({
        name: values.name,
        price: Number(values.price),
        available: values.available,
        examsType: values.examsType,
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
    <Box
      flex="1"
      borderRadius={8}
      bg="gray.200"
      p="8"
      maxH="44rem"
      overflow="auto"
    >
      <Flex direction="column" mb="8" align="left">
        <Heading fontSize="30" fontWeight="bold" mb="5">
          Painel de Exames
        </Heading>

        <Button
          w="100%"
          py="8"
          fontSize="20"
          colorScheme="whatsapp"
          leftIcon={<Icon as={RiAddLine} />}
          onClick={() => setIsModalOpen(true)}
        >
          Cadastrar novo Exame
        </Button>
      </Flex>

      <Table colorScheme="blackAlpha">
        <Thead>
          <Tr borderColor="black">
            <Th fontSize="21" borderColor="black">
              Nome
            </Th>
            <Th fontSize="21" borderColor="black">
              Preço
            </Th>
            <Th fontSize="21" borderColor="black">
              Disponivel
            </Th>
            <Th fontSize="21" borderColor="black">
              Duas Partes
            </Th>

            <Th width="8" borderColor="black"></Th>
            <Th width="8" borderColor="black"></Th>
          </Tr>
        </Thead>

        <Tbody>
          {exams.map((exam) => (
            <Tr key={exam.codexam} fontSize="18">
              <Td borderColor="black">
                <Box>
                  <Link to={`/Admin/Exams/Details/${exam.codexam}`}>
                    <Text
                      fontWeight="bold"
                      color="gray.800"
                      borderColor="black"
                    >
                      {exam.name}
                    </Text>
                  </Link>
                </Box>
              </Td>
              <Td borderColor="black">
                <Text fontWeight="bold" color="gray.800">
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(exam.price)}
                </Text>
              </Td>
              <Td
                fontWeight="bold"
                color="gray.800"
                borderColor="black"
                bgColor={exam.disponible ? "green.200" : "red.100"}
              >
                {exam.disponible ? "SIM" : "NÃO"}
              </Td>
              <Td fontWeight="bold" color="gray.800" borderColor="black">
                {exam.twoPart ? "SIM" : "NÃO"}
              </Td>
              <Td borderColor="black">
                <ConfirmationDialog
                  disabled={false}
                  icon={<BsFillTrashFill fill="white" size={16} />}
                  buttonTitle="Deletar Exame"
                  whatIsConfirmerd="Tem certeza que deseja Excluir esse Exame?"
                  describreConfirm="Excluir a Exame é uma ação irreversivel, tem certeza que deseja excluir?"
                  callbackFn={() => DeleteExam(exam.codexam.toString())}
                />
              </Td>
              <Td borderColor="black">
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
            </Tr>
          ))}
        </Tbody>
      </Table>
      <GenericModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
      >
        <FormControl as="form" onSubmit={handleSubmit(handleCreateExam)}>
          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th colSpan={2} textAlign="center">
                    Cadastro de Exames
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td py={1}>Nome do Exame</Td>
                  <Td py={1}>
                    <Input {...register("name")} name="name" />
                  </Td>
                </Tr>
                <Tr>
                  <Td py={1}>Preço</Td>
                  <Td py={1}>
                    <Input {...register("price")} name="price" />
                  </Td>
                </Tr>
                <Tr>
                  <Td py={1}>Faixas Etárias</Td>
                  <Td py={1}>
                    <Input name="" />
                  </Td>
                </Tr>
                <Tr>
                  <Td py={1}>Setor</Td>
                  <Td py={1}>
                    <Select
                      borderColor="blackAlpha.800"
                      _hover={{
                        backgroundColor: "gray.100",
                        borderColor: "blackAlpha.800",
                      }}
                    >
                      <option value="Veterinário">Veterinário</option>
                      <option value="Laboratório">Laboratório</option>
                      <option value="Internação">Internação</option>
                    </Select>
                  </Td>
                </Tr>
              </Tbody>
            </Table>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th colSpan={2} textAlign="center">
                    Uma Parte
                  </Th>
                  <Th colSpan={2} textAlign="center">
                    Duas Partes
                  </Th>
                  <Th colSpan={2} textAlign="center">
                    Formato de Laudo
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Th colSpan={2} textAlign="center">
                    <Checkbox borderColor="blackAlpha.500" />
                  </Th>
                  <Th colSpan={2} textAlign="center">
                    <Checkbox borderColor="blackAlpha.500" />
                  </Th>
                  <Th colSpan={2} textAlign="center">
                    <Checkbox borderColor="blackAlpha.500" />
                  </Th>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
          {/* <Flex direction="column" align="center" margin="4"> */}
          {/* <Input {...register("price")} name="price" label="Preço" /> */}
          {/* <Flex direction="column" gap={4} my={2}>
              <HStack gap="2">
                <label htmlFor="available">Formato de Laudo ?</label>
                <Checkbox
                  {...register("available")}
                  id="available"
                  name="available"
                  type="checkbox"
                  _checked={{ background: "#FF0000" }}
                />
              </HStack>

              <HStack gap="2">
                <label htmlFor="available">Disponivel ?</label>
                <Checkbox
                  {...register("available")}
                  id="available"
                  name="available"
                  type="checkbox"
                  _checked={{ background: "#FF0000" }}
                />
              </HStack>
              <HStack spacing={4}>
                <CheckboxGroup>
                  <label htmlFor="">Lab Imagens</label>
                  <Checkbox
                    {...register("examsType")}
                    value={"image"}
                    type="radio"
                    colorScheme="green"
                    name="examsType"
                  />

                  <label htmlFor="">Labs</label>
                  <Checkbox
                    type="radio"
                    {...register("examsType")}
                    value={"lab"}
                    colorScheme="green"
                    name="examsType"
                  />
                </CheckboxGroup>
              </HStack>
            </Flex> */}

          {/* </Flex> */}
          <Button
            width="100%"
            type="submit"
            colorScheme="green"
            m="2"
            isLoading={isLoading}
          >
            Cadastrar
          </Button>
        </FormControl>
      </GenericModal>
    </Box>
  );
}
