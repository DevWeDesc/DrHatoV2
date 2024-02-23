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
} from "@chakra-ui/react";
import {  useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { api } from "../../lib/axios";
import { Input } from "../admin/Input";
import { GenericModal } from "../Modal/GenericModal";
import { useQuery, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { LoadingSpinner } from "../Loading";

export interface ExamsProps {
  codexam:           number;
  name:              string;
  price:             number;
  onePart:           boolean;
  twoPart:           boolean;
  byReport:          boolean;
  ageGroups:         number;
  disponible:        boolean;
  minAge:            number;
  maxAge:            number;
  applicableMales:   null;
  appicableFemales:  null;
  defaultMetodology: null;
  uniqueCod:         null;
  sector:            number;
  ImageLab:          null;
  defaultLab:        null;
  healthPlan:        null;
  impressName:       null;
  partExams:         Array<{
    partName: string
  }>;
}


export function EditExams() {
  const { register, handleSubmit } = useForm();
  const { id } = useParams<{ id: string }>();
   const [examsData, setExamsData] = useState({} as ExamsProps);
  const [isModalOpen, setModalIsOpen] = useState(false);
  const [onePartSessionName, setOnePartSessionName] = useState("")
  const queryClient = useQueryClient()

  async function getExamsData(): Promise<ExamsProps> {
    const response = await api.get(`/exams/${id}`);
    return response.data
  }

  const {isLoading} = useQuery('editExamDetails', {
    queryFn: getExamsData,
    onSuccess: (data) => {
      setExamsData(data)
    }

  })


  
   if(isLoading) {
    return <LoadingSpinner />
   }

  async function handleCreateSessionOnePartExam() {
    const data = {
      isMultiPart: false,
      isByText: false,
      partName: onePartSessionName
    }

    if(examsData.partExams.length >= 1) {
      toast.warning("Exames de uma parte podem possuir apenas uma sessão ")
      return 
    }

    await api.post(`/parts/exams/${id}`, data)
    queryClient.invalidateQueries('editExamDetails')
    toast.success('Sessão criada com sucesso!')

  }








  return (
    <Box flex="1" borderRadius={8} bg="gray.100" p="8">

      <FormControl
        as="form"
      
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
                  <Input 
                      value={examsData.minAge ? examsData.minAge : 0}
                      {...register("minAge")}
                      name="minAge"/>
                </Td>
                <Td py="1">
                  {" "}
                  <label htmlFor="" style={{ marginTop: "20px" }}>
                    Idade Máxima
                  </label>
                </Td>
                <Td py="1">
                <Input 
                      value={examsData.maxAge ? examsData.maxAge : 0}
                      {...register("maxAge")}
                      name="maxAge"/>
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
        <TableContainer>
          <Table variant="simple">
      
 
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
                  isChecked={examsData.byReport === null ? false : examsData.byReport}
                  disabled={examsData.onePart || examsData.twoPart }

                   
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
                    
                      isChecked={examsData.ImageLab === null ? false : examsData.ImageLab}
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
                      isChecked={examsData.appicableFemales === null ? false : examsData.appicableFemales}
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
                   isChecked={examsData.disponible === null ? false : examsData.disponible}
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
                    isChecked={examsData.defaultLab === null ? false : examsData.defaultLab}
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
                       isChecked={examsData.applicableMales === null ? false : examsData.applicableMales}
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
                    isChecked={examsData.onePart === null ? false : examsData.onePart}
                    disabled={examsData.twoPart || examsData.byReport }
                  
                    size="lg"
                    id="available"
                    name="available"
                    type="checkbox"
                    borderColor="gray.800"
                  />
                  <label htmlFor="available">Exame e uma parte?</label>
                </Td>
              </Tr>
              <Tr>
                <Td display="flex" gap={5}>
                  <Checkbox
                    isChecked={examsData.twoPart === null ? false : examsData.twoPart}
                    disabled={examsData.onePart || examsData.byReport }
                  
                    size="lg"
                    id="available"
                    name="available"
                    type="checkbox"
                    borderColor="gray.800"
                  />
                  <label htmlFor="available">Exame e duas partes?</label>
                </Td>
              </Tr>
            </Tbody>
          </Table>
          
          <Flex justifyContent="space-between">
                <Flex w="60%" gap={4}>
                <Button w="320px" colorScheme="yellow" onClick={() => handleCreateSessionOnePartExam()}>Adicionar Sessão</Button>
                  <Input placeholder="Nome da sessão"  name="sessioName" onChange={(ev) => setOnePartSessionName(ev.target.value)} />
               
                </Flex>
              
                <Button colorScheme="red">Gravar</Button>
              </Flex>
        </TableContainer>
          {
            examsData.partExams?.map((part) => 
            <HStack mt={12}>
            <Text fontWeight="bold">Sessão</Text>
              <Input name=""  w={262} defaultValue={part.partName} /> 
            </HStack>
            )
          }
    
        <TableContainer mt="8">
       
       

          <Table>

            <Thead>
              <Tr>
                <Th>Característica</Th>
                <Th>Uni ABS</Th>
                <Th>Uni REL</Th>
                <Th>Coluna 1</Th>
                <Th>Coluna 2</Th>
                <Th>Coluna 3</Th>
              </Tr>
            </Thead>
          </Table>

        </TableContainer>
        <Flex>
        <TableContainer>
            <Table variant="simple">
         
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
                      <Text>Lógica 1:</Text>
                      <Input name="" />
                    </Flex>
                  </Td>
                  <Td colSpan={2} p={1}>
                    <Flex alignItems="center">
                      <Text>Lógica 2:</Text>
                      <Input name="" />
                    </Flex>
                  </Td>
                  <Td colSpan={2} p={1}>
                    <Flex alignItems="center">
                      <Text>Lógica 3:</Text>
                      <Input name="" />
                    </Flex>
                  </Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        </Flex>



      </FormControl>
      <GenericModal
      isOpen={isModalOpen}
      onRequestClose={() => setModalIsOpen(false)}
      >
        <FormControl display="flex" flexDirection="column" alignItems="center">
        <TableContainer>
          <Table variant="simple">
          
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
       
            </Tbody>
          </Table>
        </TableContainer>
        
              <Button
              w="80%"
              mt="2"
                  colorScheme="yellow"
               
                >
                  Gravar
                </Button>
        </FormControl>

      </GenericModal>
    </Box>
  );
}
