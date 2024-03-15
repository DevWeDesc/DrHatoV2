import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  Text,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  TableCaption,
  HStack,
  VStack,
  Divider,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { api } from "../../lib/axios";
import { Input } from "../admin/Input";
import { useQuery, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { LoadingSpinner } from "../Loading";
import { CreateExamTest } from "./createExamTest";
import { GenericModal } from "../Modal/GenericModal";

export interface ExamsProps {
  codexam: number;
  name: string;
  price: number;
  onePart: boolean;
  twoPart: boolean;
  byReport: boolean;
  ageGroups: number;
  disponible: boolean;
  minAge: number;
  maxAge: number;
  applicableMales: null;
  appicableFemales: null;
  defaultMetodology: null;
  uniqueCod: null;
  sector: number;
  ImageLab: null;
  defaultLab: null;
  healthPlan: null;
  impressName: null;
  appicableEspecies: Array<{
    id: number;
    name: string;
  }>;
  partExams: Array<{
    id: number;
    partName: string;
    examsDetails: Array<{
      id: number;
      caracteristic: string;
      absoluteUnit: string;
      relativeUnit: string;
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
type EspeciesDTO = {
  id: number;
  name: string;
  race: Array<{
    id: number;
    name: string;
    codEspOld: number;
    especiesId: number;
  }>;
};
export function EditExams() {
  const { register } = useForm();
  const { id } = useParams<{ id: string }>();
  const [examsData, setExamsData] = useState({} as ExamsProps);
  const [onePartSessionName, setOnePartSessionName] = useState("");
  const [especies, setEspecies] = useState<EspeciesDTO[]>([]);
  const [especiesModalIsOpen, setEspeciesModalIsOpen] = useState(false);
  const queryClient = useQueryClient();

  async function getExamsData(): Promise<ExamsProps> {
    const response = await api.get(`/exams/${id}`);
    return response.data;
  }

  async function getEspeciesData() {
    const response = await api.get("/pets/especie");
    return response.data;
  }

  async function removeEspecieInProcedure(especieId: string | number) {
    await api.patch(`/exams/especies/remove/${id}/${especieId}`);
    queryClient.invalidateQueries("editExamDetails");
    toast.success("Especie removida!!");
  }

  async function setEspecieInExam(especieId: number | string) {
    await api.patch(`/exams/especies/${id}/${especieId}`);
    queryClient.invalidateQueries("editExamDetails");
    toast.success("Especie Adicionada!");
  }

  useQuery("getEspecies", {
    queryFn: getEspeciesData,
    onSuccess: (data) => {
      setEspecies(data);
    },
  });

  const { isLoading } = useQuery("editExamDetails", {
    queryFn: getExamsData,
    onSuccess: (data) => {
      setExamsData(data);
    },
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  async function handleCreateSessionOnePartExam() {
    const data = {
      isMultiPart: false,
      isByText: false,
      partName: onePartSessionName,
    };

    if (examsData.onePart && examsData.partExams.length >= 1) {
      toast.warning("Exames de uma parte podem possuir apenas uma sessão ");
      return;
    }

    if (examsData.twoPart && examsData.partExams.length >= 2) {
      toast.warning("Exame permite apenas duas partes!");
      return;
    }

    if (examsData.byReport) {
      toast.warning("Exame e laudado apenas por texto!");
      return;
    }

    await api.post(`/parts/exams/${id}`, data);
    queryClient.invalidateQueries("editExamDetails");
    toast.success("Sessão criada com sucesso!");
  }

  return (
    <Flex
      py={{ base: 10, xl: 0 }}
      direction="column"
      gap="4"
      w="full"
      maxH="48rem"
    >
      <Box borderRadius={8} overflow="auto">
        <Flex w="100%" direction={"column"} justify="center" align="center">
          <FormControl
            as="form"
            justifyContent="space-between"
            display="flex"
            flexDirection="column"
          >
            <TableContainer w="full">
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th
                      colSpan={4}
                      fontSize={{ base: "lg", lg: "2xl" }}
                      textAlign="center"
                    >
                      Editando Exame: {examsData.name}
                    </Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td fontSize={{ base: "12", lg: "sm" }} py="1">
                      Nome do Exame
                    </Td>
                    <Td py="1">
                      <Input
                        w="-moz-fit-content"
                        fontSize={{ base: "12", lg: "sm" }}
                        defaultValue={examsData ? examsData.name : ""}
                        {...register("name")}
                        name="name"
                      />
                    </Td>
                    <Td fontSize={{ base: "12", lg: "sm" }} py="1">
                      Preço
                    </Td>
                    <Td py="1">
                      <Input
                        fontSize={{ base: "12", lg: "sm" }}
                        w="-moz-fit-content"
                        defaultValue={examsData ? examsData.price : 0}
                        {...register("price")}
                        name="price"
                      />
                    </Td>
                  </Tr>
                  <Tr>
                    <Td fontSize={{ base: "12", lg: "sm" }} py="1">
                      Idade Minima
                    </Td>
                    <Td py="1">
                      <Input
                        fontSize={{ base: "12", lg: "sm" }}
                        w="-moz-fit-content"
                        value={examsData.minAge ? examsData.minAge : 0}
                        {...register("minAge")}
                        name="minAge"
                      />
                    </Td>
                    <Td fontSize={{ base: "12", lg: "sm" }} py="1">
                      Idade Máxima
                    </Td>
                    <Td py="1">
                      <Input
                        fontSize={{ base: "12", lg: "sm" }}
                        w="-moz-fit-content"
                        value={examsData.maxAge ? examsData.maxAge : 0}
                        {...register("maxAge")}
                        name="maxAge"
                      />
                    </Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>
            <TableContainer w="full">
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th fontSize={{ base: "md", lg: "xl" }}>Disponibilidade</Th>
                    <Th fontSize={{ base: "md", lg: "xl" }}>Laboratórios</Th>
                    <Th fontSize={{ base: "md", lg: "xl" }}>Gênero</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td display="flex" gap={5}>
                      <Checkbox
                        isChecked={
                          examsData.byReport === null
                            ? false
                            : examsData.byReport
                        }
                        disabled={examsData.onePart || examsData.twoPart}
                        size="lg"
                        id="available"
                        name="available"
                        type="checkbox"
                        borderColor="gray.800"
                      />
                      <Text fontSize={{ base: "sm", lg: "md" }}>
                        Laudado por texto?
                      </Text>
                    </Td>
                    <Td>
                      <Flex gap={5}>
                        <Checkbox
                          isChecked={
                            examsData.ImageLab === null
                              ? false
                              : examsData.ImageLab
                          }
                          size="lg"
                          {...register("examsType")}
                          value={"image"}
                          type="radio"
                          colorScheme="green"
                          borderColor="gray.800"
                          name="examsType"
                        />
                        <Text fontSize={{ base: "sm", lg: "md" }}>
                          Lab Imagens
                        </Text>
                      </Flex>
                    </Td>
                    <Td>
                      <Flex gap="4">
                        <Checkbox
                          size="lg"
                          isChecked={
                            examsData.appicableFemales === null
                              ? false
                              : examsData.appicableFemales
                          }
                          {...register("applicableGender")}
                          value={"femea"}
                          type="radio"
                          colorScheme="green"
                          borderColor="gray.800"
                          name="applicableGender"
                        />
                        <Text fontSize={{ base: "sm", lg: "md" }}>Fêmea</Text>
                      </Flex>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td display="flex" gap={5}>
                      <Checkbox
                        isChecked={
                          examsData.disponible === null
                            ? false
                            : examsData.disponible
                        }
                        {...register("available")}
                        size="lg"
                        id="available"
                        name="available"
                        type="checkbox"
                        borderColor="gray.800"
                      />
                      <Text fontSize={{ base: "sm", lg: "md" }}>
                        Disponível
                      </Text>
                    </Td>
                    <Td>
                      <Flex gap={5}>
                        <Checkbox
                          isChecked={
                            examsData.defaultLab === null
                              ? false
                              : examsData.defaultLab
                          }
                          size="lg"
                          type="radio"
                          {...register("examsType")}
                          value={"lab"}
                          colorScheme="green"
                          name="examsType"
                          borderColor="gray.800"
                        />
                        <Text fontSize={{ base: "sm", lg: "md" }}>
                          Lab padrão
                        </Text>
                      </Flex>
                    </Td>
                    <Td>
                      {" "}
                      <Flex gap="4">
                        <Checkbox
                          isChecked={
                            examsData.applicableMales === null
                              ? false
                              : examsData.applicableMales
                          }
                          size="lg"
                          type="radio"
                          {...register("applicableGender")}
                          value={"macho"}
                          colorScheme="green"
                          name="applicableGender"
                          borderColor="gray.800"
                        />
                        <Text fontSize={{ base: "sm", lg: "md" }}>Macho</Text>
                      </Flex>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td display="flex" gap={5}>
                      {" "}
                      <Checkbox
                        isChecked={
                          examsData.onePart === null ? false : examsData.onePart
                        }
                        disabled={examsData.twoPart || examsData.byReport}
                        size="lg"
                        id="available"
                        name="available"
                        type="checkbox"
                        borderColor="gray.800"
                      />
                      <Text fontSize={{ base: "sm", lg: "md" }}>
                        Exame e uma parte?
                      </Text>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td display="flex" gap={5}>
                      <Checkbox
                        isChecked={
                          examsData.twoPart === null ? false : examsData.twoPart
                        }
                        disabled={examsData.onePart || examsData.byReport}
                        size="lg"
                        id="available"
                        name="available"
                        type="checkbox"
                        borderColor="gray.800"
                      />
                      <Text fontSize={{ base: "sm", lg: "md" }}>
                        Exame e duas partes?
                      </Text>
                    </Td>
                  </Tr>
                </Tbody>
              </Table>

              <Table>
                <Th>
                  <Button
                    fontSize={{ base: "sm", lg: "md" }}
                    onClick={() => setEspeciesModalIsOpen(true)}
                    colorScheme="linkedin"
                  >
                    Permissão de especies
                  </Button>
                </Th>
                <Th>
                  <Button
                    fontSize={{ base: "sm", lg: "md" }}
                    colorScheme="yellow"
                    onClick={() => handleCreateSessionOnePartExam()}
                  >
                    Adicionar Sessão
                  </Button>
                </Th>
                <Th>
                  <Input
                    fontSize={{ base: "sm", lg: "md" }}
                    w="-moz-fit-content"
                    placeholder="Nome da sessão"
                    name="sessioName"
                    onChange={(ev) => setOnePartSessionName(ev.target.value)}
                  />{" "}
                </Th>
                <Th>
                  <Button fontSize={{ base: "sm", lg: "md" }} colorScheme="red">
                    Gravar
                  </Button>{" "}
                </Th>
              </Table>
            </TableContainer>
            {examsData.partExams?.map((part, index) => {
              return (
                <>
                  <HStack key={part.id} mt={12}>
                    <Text fontSize={{ base: "sm", lg: "md" }} fontWeight="bold">
                      Sessão
                    </Text>
                    <Input
                      fontSize={{ base: "sm", lg: "md" }}
                      name=""
                      defaultValue={part.partName}
                    />
                  </HStack>
                  <TableContainer mt="8">
                    <Table>
                      <Thead>
                        <Tr>
                          <Th>Característica</Th>
                          <Th>Uni ABS</Th>
                          <Th>Uni REL</Th>
                          <Th>
                            {
                              examsData?.partExams[index]?.examsDetails[0]
                                ?.agesOne
                            }
                          </Th>
                          <Th>
                            {
                              examsData?.partExams[index]?.examsDetails[0]
                                ?.agesTwo
                            }
                          </Th>
                          <Th>
                            {
                              examsData?.partExams[index]?.examsDetails[0]
                                ?.agesThree
                            }
                          </Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {examsData.partExams[index].examsDetails.map(
                          (detail) => (
                            <Tr>
                              <Td fontSize={{ base: "sm", lg: "md" }}>
                                {detail.caracteristic}
                              </Td>
                              <Td fontSize={{ base: "sm", lg: "md" }}>
                                {detail.absoluteUnit}
                              </Td>
                              <Td fontSize={{ base: "sm", lg: "md" }}>
                                {detail.relativeUnit}
                              </Td>
                              <Td fontSize={{ base: "sm", lg: "md" }}>
                                Abs - {detail.minAgesOne} : Rel -{" "}
                                {detail.maxAgesOne}
                              </Td>
                              <Td fontSize={{ base: "sm", lg: "md" }}>
                                Abs - {detail.minAgesTwo} : Rel -{" "}
                                {detail.maxAgesTwo}
                              </Td>
                              <Td fontSize={{ base: "sm", lg: "md" }}>
                                Abs - {detail.minAgesThree} : Rel -{" "}
                                {detail.maxAgesThree}
                              </Td>
                            </Tr>
                          )
                        )}
                      </Tbody>
                    </Table>
                  </TableContainer>
                  <Flex>
                    <CreateExamTest sessionId={part.id} />
                  </Flex>
                </>
              );
            })}
          </FormControl>
          <GenericModal
            isOpen={especiesModalIsOpen}
            onRequestClose={() => setEspeciesModalIsOpen(false)}
          >
            <Flex w="460px" h="500px" justify="space-between">
              <VStack h="100%" w="50%" overflowY="scroll">
                <Text fontWeight="bold">Especies Bloqueadas</Text>
                {examsData?.appicableEspecies?.map((esp) => (
                  <Button
                    onClick={() => removeEspecieInProcedure(esp.id)}
                    key={esp.id}
                    colorScheme="facebook"
                  >
                    {esp.name}
                  </Button>
                ))}
              </VStack>

              <Divider border="1px" orientation="vertical" />

              <VStack h="100%" w="50%" overflowY="scroll">
                <Text fontWeight="bold">Especies Disponiveis</Text>
                {especies.map((esp) => (
                  <Button
                    key={esp.id}
                    onClick={() => setEspecieInExam(esp.id)}
                    colorScheme="teal"
                  >
                    {esp.name}
                  </Button>
                ))}
              </VStack>
            </Flex>
          </GenericModal>
        </Flex>
      </Box>
    </Flex>
  );
}
