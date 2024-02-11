import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
  Flex,
  FormControl,
  Heading,
  Text,
  Textarea,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  HStack,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  TableCaption,
} from "@chakra-ui/react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { api } from "../../lib/axios";
import { toast } from "react-toastify";
import { Input } from "../admin/Input";

interface ExamProps {
  name: string;
  price: string;
}
interface CharacProps {
  data: Array<{
    id: number;
    name: string;
  }>;
}

export function EditExams() {
  const { register, handleSubmit } = useForm();
  const [characters, setCharacters] = useState({} as CharacProps);
  const [characIdArray, setCharacIdArray] = useState([] as any);
  const [examsIdArray, setExamsIdArray] = useState([] as any);
  const [isMultiPart, setIsMultiPart] = useState(false);
  const [isReportByText, setisReportByText] = useState(false);
  const [isOnePart, setisOnePart] = useState(false);
  const [examsData, setExamsData] = useState({} as ExamProps);
  const [allExams, setAllExams] = useState([]);
  const [caractersIsVisible, setCaractersIsVisible] = useState(false);
  const { id } = useParams<{ id: string }>();

  const handleCreateExam: SubmitHandler<FieldValues> = async (values) => {
    let rangeAges = [values.minAge, values.maxAge];
    try {
      const data = {
        name: values.name ? values.name : examsData.name,
        price: values.price
          ? parseInt(values.price)
          : parseInt(examsData.price),
        available: values.available,
        examsType: values.examsType,
        applicableGender: values.applicableGender,
        subName: values.subName,
        description: values.description,
        ageRange: rangeAges,
        characters: characIdArray,
        isMultiPart,
        exams: examsIdArray,
        isReportByText,
        isOnePart,
      };

      await api.put(`exams/${id}`, data);
      toast.success("Exame configurado com sucesso");
      // navigate(0);
    } catch (error) {
      toast.error("Falha ao criar novo Exame");
    }
  };

  async function getCharacteristics() {
    try {
      const res = await api.get("/examcharac");
      setCharacters(res.data);
    } catch (error) {
      console.error(error);
    }
  }

  async function getExamsData() {
    try {
      const response = await api.get(`/exams/${id}`);
      setExamsData(response.data);
      const allexams = await api.get("/exams");
      setAllExams(allexams.data);
    } catch (error) {
      console.log(error);
    }
  }

  console.log("CHARACS", characters);

  function removeIds(itemToRemove: string) {
    const indice = characIdArray.indexOf(itemToRemove);
    if (indice !== -1) {
      characIdArray.splice(indice, 1);
    }
  }

  function removeExamsIds(itemToRemove: string) {
    const indice = examsIdArray.indexOf(itemToRemove);
    if (indice !== -1) {
      examsIdArray.splice(indice, 1);
    }
  }

  useEffect(() => {
    setCaractersIsVisible(false);
    getExamsData();
    getCharacteristics();
  }, []);

  return (
    <Box flex="1" borderRadius={8} bg="gray.100" p="8">
      {/* <Heading size="lg" fontWeight="normal">
        Exames
      </Heading> */}
      <FormControl
        as="form"
        onSubmit={handleSubmit(handleCreateExam)}
        justifyContent="space-between"
        display="flex"
        flexDirection="column"
      >
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th colSpan={4} fontSize="xl" textAlign="center">
                  Editando Exame: {examsData.name}
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td py="1">
                  <label htmlFor="">Nome do Exame</label>
                </Td>
                <Td py="1">
                  <Input
                    defaultValue={examsData ? examsData.name : ""}
                    {...register("name")}
                    name="name"
                  />
                </Td>
                <Td py="1">
                  <label htmlFor="" style={{ marginTop: "20px" }}>
                    Preço
                  </label>
                </Td>
                <Td py="1">
                  <Input
                    defaultValue={examsData ? examsData.price : 0}
                    {...register("price")}
                    name="price"
                  />
                </Td>
              </Tr>
              <Tr>
                <Td py="1">
                  <label htmlFor="" style={{ marginTop: "20px" }}>
                    Idade Minima
                  </label>
                </Td>
                <Td py="1">
                  <NumberInput size="xs" name="minAge" maxW={"100%"} w="100%">
                    <NumberInputField
                      py="5"
                      rounded="md"
                      border="1px solid black"
                      fontSize="18"
                      bg="white"
                      w="100%"
                      {...register("minAge")}
                      name="minAge"
                    />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </Td>
                <Td py="1">
                  {" "}
                  <label htmlFor="" style={{ marginTop: "20px" }}>
                    Idade Máxima
                  </label>
                </Td>
                <Td py="1">
                  {" "}
                  <NumberInput size="xs" name="minAge" maxW={"100%"} w="100%">
                    <NumberInputField
                      py="5"
                      rounded="md"
                      border="1px solid black"
                      fontSize="18"
                      bg="white"
                      w="100%"
                      {...register("maxAge")}
                      name="maxAge"
                    />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
        <TableContainer>
          <Table variant="simple">
            <TableCaption>
              <Flex justifyContent="end">
                <Button colorScheme="whatsapp">Gravar</Button>
              </Flex>
            </TableCaption>
            <Thead>
              <Tr>
                <Th fontSize="xl">Disponibilidade</Th>
                <Th fontSize="xl">Laboratórios</Th>
                <Th fontSize="xl">Gênero</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td display="flex" gap={5}>
                  <Checkbox
                    disabled={isMultiPart || isOnePart}
                    onChange={(ev) => setisReportByText(ev.target.checked)}
                    size="lg"
                    id="available"
                    name="available"
                    type="checkbox"
                    borderColor="gray.800"
                  />
                  <label htmlFor="available">Laudado por texto?</label>
                </Td>
                <Td>
                  <Flex gap={5}>
                    <Checkbox
                      size="lg"
                      {...register("examsType")}
                      value={"image"}
                      type="radio"
                      colorScheme="green"
                      borderColor="gray.800"
                      name="examsType"
                    />
                    <label htmlFor="">Lab Imagens</label>
                  </Flex>
                </Td>
                <Td>
                  <Flex gap="4">
                    <Checkbox
                      size="lg"
                      {...register("applicableGender")}
                      value={"femea"}
                      type="radio"
                      colorScheme="green"
                      borderColor="gray.800"
                      name="applicableGender"
                    />
                    <label htmlFor="">Fêmea</label>
                  </Flex>
                </Td>
              </Tr>
              <Tr>
                <Td display="flex" gap={5}>
                  <Checkbox
                    {...register("available")}
                    size="lg"
                    id="available"
                    name="available"
                    type="checkbox"
                    borderColor="gray.800"
                  />
                  <label htmlFor="available">Disponível</label>
                </Td>
                <Td>
                  <Flex gap={5}>
                    <Checkbox
                      size="lg"
                      type="radio"
                      {...register("examsType")}
                      value={"lab"}
                      colorScheme="green"
                      name="examsType"
                      borderColor="gray.800"
                    />
                    <label htmlFor="">Lab padrão</label>
                  </Flex>
                </Td>
                <Td>
                  {" "}
                  <Flex gap="4">
                    <Checkbox
                      size="lg"
                      type="radio"
                      {...register("applicableGender")}
                      value={"macho"}
                      colorScheme="green"
                      name="applicableGender"
                      borderColor="gray.800"
                    />
                    <label htmlFor="">Macho</label>
                  </Flex>
                </Td>
              </Tr>
              <Tr>
                <Td display="flex" gap={5}>
                  {" "}
                  <Checkbox
                    disabled={isMultiPart || isReportByText}
                    onChange={(ev) => setisOnePart(ev.target.checked)}
                    size="lg"
                    id="available"
                    name="available"
                    type="checkbox"
                    borderColor="gray.800"
                  />
                  <label htmlFor="available">Exame e único?</label>
                </Td>
              </Tr>
              <Tr>
                <Td display="flex" gap={5}>
                  <Checkbox
                    onChange={(ev) => setIsMultiPart(ev.target.checked)}
                    disabled={isReportByText || isOnePart}
                    size="lg"
                    id="available"
                    name="available"
                    type="checkbox"
                    borderColor="gray.800"
                  />
                  <label htmlFor="available">Exame Multipart?</label>
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
        <TableContainer>
          <Table variant="simple">
            <TableCaption>
              <Flex justifyContent="end">
                <Button
                  colorScheme="whatsapp"
                  onClick={() => setCaractersIsVisible(true)}
                >
                  Gravar
                </Button>
              </Flex>
            </TableCaption>
            <Thead>
              <Tr>
                <Th textAlign="center" fontSize="lg" colSpan={2}>
                  Criar Sessão
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td py={1}>Nome da Sessão</Td>
                <Td py={1}>
                  <Input name="" />
                </Td>
                <Td></Td>
              </Tr>
              <Tr>
                <Td py={1}>Emprimir Primeira coluna para as espécies:</Td>
                <Td py={1}>
                  <Input name="" />
                </Td>
              </Tr>
              <Tr>
                <Td py={1}>Emprimir Segunda coluna para as espécies:</Td>
                <Td py={1}>
                  <Input name="" />
                </Td>
              </Tr>
              <Tr>
                <Td py={1}>Emprimir Terceira coluna para as espécies:</Td>
                <Td py={1}>
                  <Input name="" />
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
        {caractersIsVisible && (
          <TableContainer>
            <Table variant="simple">
              <TableCaption>
                <Flex justifyContent="end">
                  <Button
                    colorScheme="whatsapp"
                    onClick={() => setCaractersIsVisible(true)}
                  >
                    Gravar
                  </Button>
                </Flex>
              </TableCaption>
              <Thead>
                <Tr>
                  <Th textAlign="center" fontSize="lg" colSpan={9}>
                    Adicionar nova Característica
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td py={1}>Característica</Td>
                  <Td py={1}>Un Abs.</Td>
                  <Td>Un Rel.</Td>
                  <Td colSpan={2}>
                    <Flex alignItems="center">
                      <Text>Coluna 1:</Text>
                      <Input name="" />
                    </Flex>
                  </Td>
                  <Td colSpan={2}>
                    <Flex alignItems="center">
                      <Text>Coluna 2:</Text>
                      <Input name="" />
                    </Flex>
                  </Td>
                  <Td colSpan={2}>
                    <Flex alignItems="center">
                      <Text>Coluna 3:</Text>
                      <Input name="" />
                    </Flex>
                  </Td>
                </Tr>
                <Tr>
                  <Td p={1}>
                    <Input name="" />
                  </Td>
                  <Td p={1}>
                    <Input name="" />
                  </Td>
                  <Td p={1}>
                    <Input name="" />
                  </Td>
                  <Td p={1}>
                    <Flex alignItems="center">
                      <Text>Abs - </Text>
                      <Input name="" />
                    </Flex>
                  </Td>
                  <Td p={1}>
                    <Flex alignItems="center">
                      <Text>Rel - </Text>
                      <Input name="" />
                    </Flex>
                  </Td>
                  <Td p={1}>
                    <Flex alignItems="center">
                      <Text>Abs - </Text>
                      <Input name="" />
                    </Flex>
                  </Td>
                  <Td p={1}>
                    <Flex alignItems="center">
                      <Text>Rel - </Text>
                      <Input name="" />
                    </Flex>
                  </Td>
                  <Td p={1}>
                    <Flex alignItems="center">
                      <Text>Abs - </Text>
                      <Input name="" />
                    </Flex>
                  </Td>
                  <Td p={1}>
                    <Flex alignItems="center">
                      <Text>Rel - </Text>
                      <Input name="" />
                    </Flex>
                  </Td>
                </Tr>
                <Tr>
                  <Td colSpan={3}>
                    <Text>Logicas de avaliação de idade:</Text>
                  </Td>
                  <Td colSpan={2} p={1}>
                    <Flex alignItems="center">
                      <Text>Coluna 3:</Text>
                      <Input name="" />
                    </Flex>
                  </Td>
                  <Td colSpan={2} p={1}>
                    <Flex alignItems="center">
                      <Text>Coluna 3:</Text>
                      <Input name="" />
                    </Flex>
                  </Td>
                  <Td colSpan={2} p={1}>
                    <Flex alignItems="center">
                      <Text>Coluna 3:</Text>
                      <Input name="" />
                    </Flex>
                  </Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        )}

        {/* <Flex mb="8" justify="space-between" align="center">
        
          <Flex justify="center" w="100%">
            <Flex
              direction="column"
              margin="4"
              p="4"
              rounded="4"
              w="70%"
              fontSize="20"
              fontWeight="bold"
            >
              <Flex>
                <Flex direction="column" mt="4" align="center" gap={4}>
                  <Text fontWeight="black">
                    Selecione os exames adicionais que farão parte deste.
                  </Text>
                  <Text fontSize="md" color="gray.800">
                    O Exame herdara os subexames e suas caracteristicas{" "}
                  </Text>
                  <Flex wrap="wrap" gap="4">
                    
                  </Flex>
                </Flex>
              </Flex>
            </Flex>
            <Flex
              direction="column"
              margin="4"
              bg="white"
              p="10"
              rounded="4"
              w="40%"
              fontSize="25"
              fontWeight="bold"
              height="900px"
              shadow="0px 0px 10px rgba(0, 0, 0, 0.5)"
              overflowY="auto"
            >
              <Text>Diponibilidade</Text>
              <Flex gap="4"></Flex>
              <Flex gap="4"></Flex>
              <Flex gap="4"></Flex>
              <Flex gap="4"></Flex>

              <CheckboxGroup>
                <Text mt="10">Laboratórios</Text>
                <Flex gap="4"></Flex>
                <Flex gap="4"></Flex>
              </CheckboxGroup>
              <CheckboxGroup>
                <Text mt="10">Gênero</Text>
              </CheckboxGroup>

              <Flex height="auto" direction="column">
                <Text>Caractéristicas desse exame</Text>
                <Flex wrap="wrap" gap={4}>
                  {characters ? (
                    characters.data?.map((char: any) => {
                      return (
                        <>
                          <label>{char?.name}</label>
                          <Checkbox
                            disabled={isMultiPart || isReportByText}
                            onChange={(ev) =>
                              ev.target.checked === true
                                ? setCharacIdArray([...characIdArray, char?.id])
                                : removeIds(char?.id)
                            }
                            defaultValue={`${char?.id}`}
                            size="lg"
                            borderColor="black"
                          />
                        </>
                      );
                    })
                  ) : (
                    <LoadingSpinner />
                  )}
                </Flex>
              </Flex>
            </Flex>
          </Flex> */}
        {/* </Flex> */}

        <Button type="submit" colorScheme="yellow" m="2" py="8">
          Configurar
        </Button>
      </FormControl>
    </Box>
  );
}
