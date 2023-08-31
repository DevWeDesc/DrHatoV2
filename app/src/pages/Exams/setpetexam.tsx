import { useState, useEffect } from "react";
import {
  ChakraProvider,
  Flex,
  Box,
  Text,
  Input,
  Button,
  Textarea,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
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
import { TableHemogramaFelino } from "../../components/TablesLab/HemogramaFelino";
import { toast } from "react-toastify";


export function SetPetExam() {

  const { id, petId } = useParams<{ id: string, petId: string }>();
  const user = JSON.parse(localStorage.getItem("user") as string);
  const [pet, setPet] = useState({} as any);
  const [typeView, setTypeView] = useState(0);
  const [textReport, setTextReport] = useState("")

  async function Pets() {
    const pets = await api.get(`/labexam/${id}`);
    setPet(pets.data);
  }
  useEffect(() => {
    async function Pets() {
      let pets = await api.get("/labs");
      setPet(pets.data);
    }
    Pets();
  }, []);


  const handleSetTextReport = async () => {
    try {
      const data = {
        jsonString: textReport,
        responsible: user.username
      }
      await api.post(`/labreportexam/${id}`,data)
      toast.success("Exame laudado com sucesso!")
    } catch (error) {
      toast.error("Falha ao laudar com texto!")
    }
  }

  let tableView;
  switch(true) {
   case typeView === 1:
    tableView = (
      <TableHemogramaFelino />
    )
    break;
    case typeView === 2:
      tableView = (
        <Flex direction="column" align="center" m="4">
          <Text>LAUDO LIVRE</Text>
        <Textarea onChange={(ev) => setTextReport(ev.target.value)}  border="2px" bgColor="white" minWidth={600} minHeight={800} />
        <Button onClick={handleSetTextReport} colorScheme="whatsapp" mt="4">GRAVAR</Button>
        </Flex>
      
      )
    break;
  }
 
  return (
    <ChakraProvider>
      <Flex direction="column" h="100vh">
        <Header title="Tabela de Laboratórios" url="/Labs/Exames" />
        <Flex w="100%" my="6" mx="auto" px="6">
          <GenericSidebar>
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
          </GenericSidebar>
          <Box
            height="auto"
            w="88%"
            borderRadius={8}
            bg="gray.200"
            p="8"
          >
            <Flex direction="column" align="center" mb="16">
              <Flex w="100%">
                <Box
                  flex="1"
                  display={"flex"}
                  flexDirection={"column"}
                  alignItems={"center"}
                  borderRadius={8}
                  bg="gray.200"
                  mb="10"
                >
                  <Flex
                    w={"100%"}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                    marginBottom={"10px"}
                  >
                    <Flex  align="center" m="4" w="100%" justify="space-between">
                      <Text fontSize="3xl">
                        <strong>Dados do Exame</strong>
                      </Text>
                      <Flex   w="600px" wrap="wrap" height="120px" m="2" gap="2" >
                        <Button colorScheme="whatsapp">Tabela Hemograma Completo </Button>
                        <Button colorScheme="whatsapp">Tabela Biquimico </Button>
                        <Button colorScheme="whatsapp">Hemograma Canino </Button>
                        <Button onClick={() => setTypeView(1)} colorScheme="whatsapp">Hemograma Felino </Button>
                        <Button onClick={() => setTypeView(2)}colorScheme="whatsapp"> Laudo Livre com Texto </Button>
                      </Flex>
                      <FileUpload examId={`${id}`} />
                    </Flex>
                   
                  </Flex>
                  <Flex
                    direction={"column"}
                    w="94.5%"
                    border={"1px solid black"}
                  >
                
                          <Flex
                            alignItems={"center"}
                            borderBottom={"1px solid black"}
                          >
                            <Text
                              paddingRight={"93.5px"}
                              paddingLeft={"5px"}
                              paddingTop={"8px"}
                              paddingBottom={"8px"}
                              backgroundColor={"gray.300"}
                            >
                              <strong> Cliente</strong>
                            </Text>
                            <Input
                              borderRadius={"0"}
                              borderColor={"black"}
                              bgColor="white"
                              w="100%"
                              defaultValue={pet?.medicine?.pet?.customer?.name}
                             
                            ></Input>
                          </Flex>
                          <Flex
                            alignItems={"center"}
                            borderBottom={"1px solid black"}
                          >
                            <Text
                              paddingRight={"93px"}
                              paddingLeft={"5px"}
                              paddingTop={"8px"}
                              paddingBottom={"8px"}
                              backgroundColor={"gray.300"}
                            >
                              <strong> Animal</strong>
                            </Text>
                            <Input
                              bgColor="white"
                              borderBottom={"0"}
                              borderRadius={"0"}
                              borderColor={"black"}
                              defaultValue={pet?.name}
                              w="100%"
                            ></Input>
                          </Flex>
                          <Flex
                            alignItems={"center"}
                            borderBottom={"1px solid black"}
                          >
                            <Text
                              paddingRight={"97px"}
                              paddingLeft={"5px"}
                              paddingTop={"7px"}
                              paddingBottom={"7px"}
                              backgroundColor={"gray.300"}
                            >
                              <strong> Exame</strong>
                            </Text>
                            <Input
                              bgColor="white"
                              borderBottom={"0"}
                              borderRadius={"0"}
                              borderColor={"black"}
                          defaultValue={pet?.medicine?.pet.name}
                              w="50%"
                            ></Input>
                            <Text
                              padding={"7px 51px"}
                              border={"1px solid black"}
                              backgroundColor={"red.200"}
                            >
                              <strong> Veterinario</strong>
                            </Text>
                            <Input
                              bgColor="white"
                              borderBottom={"0"}
                              borderRadius={"0"}
                              borderColor={"black"}
                              w="30%"
                              defaultValue={pet.responsibleForExam ? pet.responsibleForExam : "Não definido"}
                            ></Input>
                          </Flex>
                          <Flex
                            alignItems={"center"}
                            borderBottom={"1px solid black"}
                            h="41px"
                          >
                            <Text
                              paddingRight={"112px"}
                              paddingLeft={"5px"}
                              paddingTop={"7px"}
                              paddingBottom={"7px"}
                              backgroundColor={"gray.300"}
                            >
                              <strong> Data</strong>
                            </Text>
                            <Text
                              bgColor="white"
                              borderRadius={"0"}
                              borderColor={"black"}
                              w="50%"
                           
                            >{ new Intl.DateTimeFormat('pt-BR').format(new Date(pet.requesteData ? pet.requesteData : Date.now() )) }</Text>
                            <Text
                              border={"1px solid black"}
                              padding={"7px 73px"}
                              backgroundColor={"gray.300"}
                            >
                              <strong> CRMV</strong>
                            </Text>
                            <Input
                              bgColor="white"
                              borderRadius={"0"}
                              borderColor={"black"}
                              defaultValue="Não definido"
                              w="30%"
                            ></Input>
                          </Flex>
                        {tableView}
                  </Flex>
                </Box>
              </Flex>
            </Flex>
          </Box>
        </Flex>
      </Flex>
    </ChakraProvider>
  );
}
