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
  HStack,
  CheckboxGroup,
  Checkbox,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { RiAddLine, RiPencilLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { LoadingSpinner } from "../../../components/Loading";
import { GenericModal } from "../../../components/Modal/GenericModal";
import { api } from "../../../lib/axios";
import { toast } from "react-toastify";
import { Input } from "../../../components/admin/Input";
import { ConfirmationDialog } from "../../dialogConfirmComponent/ConfirmationDialog";
import { BsFillTrashFill } from "react-icons/bs";
import { NewCharacteristics } from "./newCharacteristics";

export function ListExams() {
  const { register, handleSubmit } = useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenTwo, setIsModalOpenTwo] = useState(false);
  const [isModalOpenThree, setIsModalOpenThree] = useState(false);
  const [loading, setLoading] = useState(false);
  const [exams, setExams] = useState([] as any);
  const [examsMerged, setExamsMerged] = useState([] as any);
  const [examsIds, setExamsIds] = useState<number[]>([])
  const [mergedExamName, setMergedExamName] = useState("")
  const [mergedExamPrice, setMergedExamPrice] = useState(0)


  function openModal() {
    setIsModalOpen(true);
  }
  function closeModal() {
    setIsModalOpen(false);
  }

  function openModalTwo() {
    setIsModalOpenTwo(true);
  }
  function closeModalTwo() {
    setIsModalOpenTwo(false);
  }

  function openModalThree() {
    setIsModalOpenThree(true);
  }
  function closeModalThree() {
    setIsModalOpenThree(false);
  }



  const handleCreateNewMergedExam = async () => {
    try {
      const data = {
        name: mergedExamName,
        price: mergedExamPrice,
        examsIds: examsIds
      }

      await api.post('/mergedexams', data)
      setLoading(true);
      toast.success("Exame criado com sucesso")
    } catch (error) {
      toast.error('Falha ao criar novo exame mesclado')
      console.log(error)
    }
  }
  
  function removeEspecie(itemToRemove: number ) {
    const indice = examsIds.indexOf(itemToRemove);
    if (indice !== -1) {
      examsIds.splice(indice, 1);
    }
    }
  

  const getExamesListData = async () => {
    const exams = await api.get("exams");
    const mergedExams = await api.get("/mergedexams")
    setExams(exams.data);
    setExamsMerged(mergedExams.data)
  };
  useEffect(() => {
    getExamesListData();
  }, []);

  useEffect(() => {
    if (loading === true) {
      getExamesListData();
      setLoading(false);
    }
  }, [loading]);

  const handleCreateExam: SubmitHandler<FieldValues> = async (values) => {
    try {
      const data = {
        name: values.name,
        price: Number(values.price),
        available: values.available,
        examsType: values.examsType,
      };
      await api.post("exams", data);
      setLoading(true);
      toast.success("Exame criada com sucesso");
    } catch (error) {
      toast.error("Falha ao criar novo Exame");
    }
  };

  async function DeleteExam(ExamId: string) {
    await api
      .delete(`/exams/${ExamId}`)
      .then(() => {
        toast.success("Exame deletado com sucesso!!");
        setLoading(true);
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
          onClick={() => openModal()}
        >
          Cadastrar novo Exame
        </Button>
        <Button
          w="100%"
          py="8"
          fontSize="20"
          colorScheme="whatsapp"
          mt="4"
          leftIcon={<Icon as={RiAddLine} />}
          onClick={() => openModalThree()}
        >
          Cadastrar novo Exame Mesclado
        </Button>
        <Button
        mt="4"
          w="100%"
          py="8"
          fontSize="20"
          colorScheme="whatsapp"
          leftIcon={<Icon as={RiAddLine} />}
          onClick={() => openModalTwo()}
        >
          Cadastrar nova Característica
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
              Disponivel ?
            </Th>
            <Th width="8" borderColor="black"></Th>
            <Th width="8" borderColor="black"></Th>
          </Tr>
        </Thead>

        <Tbody>
          {exams ? (
            exams.map((exam: any) => (
              <Tr key={exam.id} fontSize="18">
                <Td borderColor="black">
                  <Box>
                    <Link to={`/Admin/Exams/Details/${exam.id}`}>
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
                <Td borderColor="black">
                  {exam.available === true ? <p>SIM</p> : <p>NÃO</p>}
                </Td>
                <Td borderColor="black">
                  {" "}
                  <ConfirmationDialog
                    disabled={false}
                    icon={<BsFillTrashFill fill="white" size={16} />}
                    buttonTitle="Deletar Exame"
                    whatIsConfirmerd="Tem certeza que deseja Excluir esse Exame?"
                    describreConfirm="Excluir a Exame é uma ação irreversivel, tem certeza que deseja excluir?"
                    callbackFn={() => DeleteExam(exam.id)}
                  />
                </Td>
                <Td borderColor="black">
                  <Link to={`/Admin/Exams/${exam.id}`}>
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
            ))
          ) : (
            <LoadingSpinner />
          )}
          {
            examsMerged ? examsMerged.map((mexam: any) => (
              <Tr key={mexam.id} fontSize="18">
              <Td borderColor="black">
                <Box>
                  <Link to={`/Admin/Exams/Details/${mexam.id}`}>
                    <Text
                      fontWeight="bold"
                      color="gray.800"
                      borderColor="black"
                    >
                      {mexam.name}
                    </Text>
                  </Link>
                </Box>
              </Td>
              <Td borderColor="black">
                <Text fontWeight="bold" color="gray.800">
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(mexam.price)}
                </Text>
              </Td>
              <Td borderColor="black">
                Sim
              </Td>
              <Td borderColor="black">
                {" "}
                <ConfirmationDialog
                  disabled={true}
                  icon={<BsFillTrashFill fill="white" size={16} />}
                  buttonTitle="Deletar Exame"
                  whatIsConfirmerd="Tem certeza que deseja Excluir esse Exame?"
                  describreConfirm="Excluir a Exame é uma ação irreversivel, tem certeza que deseja excluir?"
                  callbackFn={() => DeleteExam(mexam.id)}
                />
              </Td>
              <Td borderColor="black">
                <Link to={`/Admin/Exams/${mexam.id}`}>
                  <Button
                    as="a"
                    size="sm"
                    fontSize="sm"
                    colorScheme="yellow"
                    leftIcon={<Icon as={RiPencilLine} />}
                   
                    isDisabled={true}
                  >
                    Configurar
                  </Button>
                </Link>
              </Td>
            </Tr>
            )): (<LoadingSpinner />)
          }
        </Tbody>
      </Table>
      <GenericModal isOpen={isModalOpen} onRequestClose={closeModal}>
        <FormControl as="form" onSubmit={handleSubmit(handleCreateExam)}>
          <Flex direction="column" align="center" margin="4">
            <Input {...register("name")} name="name" label="Nome do Exame" />
            <Input {...register("price")} name="price" label="Preço" />

            <HStack gap="2" margin={8}>
              <label htmlFor="available">Disponivel ?</label>
              <Checkbox
                {...register("available")}
                id="available"
                name="available"
                type="checkbox"
                _checked={{ background: "#FF0000" }}
              />
            </HStack>

            <HStack spacing={4} margin="4">
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

            <Button type="submit" colorScheme="green" m="2">
              Cadastrar
            </Button>
          </Flex>
        </FormControl>
      </GenericModal>
      <GenericModal isOpen={isModalOpenTwo} onRequestClose={closeModalTwo} >
            <NewCharacteristics />
      </GenericModal>
      <GenericModal isOpen={isModalOpenThree} onRequestClose={closeModalThree} >
          <Flex w="900px" h="600px" direction="column">
            <Input label="Nome do Exame"  name="nameMerged" value={mergedExamName} onChange={(ev) => setMergedExamName(ev.target.value)} />
            <Input label="Preço do Exame" name="priceMerged" value={mergedExamPrice} onChange={(ev) => setMergedExamPrice(Number(ev.target.value))} />

            <Flex w="100%" h="100%" overflowY="auto" direction="column" >
              <Flex w="100%" h="90%" wrap="wrap" overflowY="auto">
              {
                exams && exams.map((exam: {id:number, name: string}) => (
                <Flex key={exam.id} gap="2" m="4" align="center"  w="auto" h="48px" border="2px" 
                rounded={12} borderColor="cyan.300"
                p="2">
                  <Checkbox size="lg" borderColor="black"
                  onChange={(ev) =>
                    ev.target.checked === true
                      ? setExamsIds([...examsIds, exam.id])
                      :   removeEspecie(exam.id)
                  }
                  />
                  <Text>{exam.name}</Text>
                
                </Flex>
                ))
              }
              </Flex>
              
                <Button colorScheme="whatsapp" onClick={handleCreateNewMergedExam} >GRAVAR</Button>
           </Flex>
            

          </Flex>
      </GenericModal>
    </Box>
  );
}
