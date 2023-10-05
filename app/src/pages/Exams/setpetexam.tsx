import { useState, useEffect } from "react";
import {
  ChakraProvider,
  Flex,
  Box,
  Text,
  Input,
  Button,
  Textarea,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
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
import { toast } from "react-toastify";
import { LoadingSpinner } from "../../components/Loading";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";



interface ExamProps {
  id: number;
  name: string;
  price: string;
  available: boolean;
  doneExam: boolean;
  isMultiPart: boolean;
  isReportByText: boolean;
  isOnePart: boolean;
  multiparts: Array<{
    id: number;
    name: string;
    characteristics: Array<{
      id: number;
      name:string;
      especie: Array<{
        name: string;
        refIdades: Array<{
          maxAge: number;
          absoluto: string;
          relativo: string;
        }>
      }>
    }>
  }>
  characteristics: Array<{
    id: number;
    name:string;
    especie: Array<{
      name: string;
      refIdades: Array<{
        maxAge: number;
        absoluto: string;
        relativo: string;
      }>
    }>
  }>
}
export function SetPetExam() {
  const { id, examId } = useParams<{ id: string, examId: string }>();
  const user = JSON.parse(localStorage.getItem("user") as string);
  const [pet, setPet] = useState({} as any);
  const [disableRequest, setDisableRequest] = useState(false)
  const [textReport, setTextReport] = useState("")
  const [exam, setExam] = useState({} as ExamProps)
  const {register, handleSubmit} = useForm()
 const navigate = useNavigate()
   async function Pets() {
    const pets = await api.get(`/labexam/${id}`);
    setPet(pets.data.examDetails);
  }
  async function Exam() {
    const exam = await api.get(`/exams/${examId}`);
    setExam(exam.data)
  }

  useEffect(() => {
    Pets();
    Exam();
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
//One Part
  const handleSetTableReport:  SubmitHandler<FieldValues>  = async (values) => {
    const refs = exam.characteristics.map((charac) => {
      let data = {
        charac: charac.name,
        abs: values[`abs${charac.name}`],
        rel: values[`rel${charac.name}`]
      }
      return data
    })

    const data = {
      report: refs,
      isOnePart: exam.isOnePart, 
      isMultiPart: exam.isMultiPart ,
      isReportByText: exam.isReportByText,
      requestedFor: user.username 
    }


    try {
      await api.patch(`/reportexam/${id}`,data)
      toast.success("Exame laudado com sucesso!")
    } catch (error) {
      console.log(error)
    }
  }

 //Multi Part 
 const handleSetMultTableReport: SubmitHandler<FieldValues> = async (values) => {
  try {
    const refs = exam.multiparts.map((charac) => {
      return {
        name: charac.name,
        refs: charac.characteristics.map((charac) => {
          let data = {
            charac: charac.name,
            abs: values[`abs${charac.name}`],
            rel: values[`rel${charac.name}`]
          }
          return data
        })
      }
  0
    })

    const data = {
      report: refs,
      isOnePart: exam.isOnePart, 
      isMultiPart: exam.isMultiPart ,
      isReportByText: exam.isReportByText,
      requestedFor: user.username  
    }
 
    await api.patch(`/reportexam/${id}`,data)
    setDisableRequest(true)
    toast.success("Exame laudado com sucesso!")
  } catch (error) {
    console.log(error)
  }
 }

   const tableRefs:any = exam.characteristics ?  exam.characteristics.map((charac) => {
    return charac?.especie.find((data: any) => data.name === pet?.medicine?.pet?.especie)
   }) : null

   const multRefs: any = exam.multiparts ? exam.multiparts.map((data) => {
    return data.characteristics.map((refs) => refs.especie.filter((esp) => esp.name === pet?.medicine?.pet?.especie))
 }) : null


   let typeTableView;
   switch(true) {
    case exam.isMultiPart === true:
    typeTableView = (
      <Flex as="form" direction="column" onSubmit={handleSubmit(handleSetMultTableReport)}>
        {exam ? (
          exam.multiparts.map(table => (
            

            
            <TableContainer  key={table.id}>
              <Table>
                <Thead>
                  <Tr>
                    <Th
                      fontSize="15"
                      border="1px solid black"
                      bg="blue.400"
                      color="white"
                    >
                      {table?.name}
                    </Th>
                    <Th colSpan={2} border="1px solid black">
                      Resultado
                    </Th>
                    <Th colSpan={2} border="1px solid black">
                      Unidades
                    </Th>


                    {
                      multRefs[0][0][0]?.refIdades?.flatMap((ref: any) => (
                     <Th key={`${ref.maxAge}${ref.absoluto}`} colSpan={2}  border="1px solid black">{`@Val Ref ${pet?.medicine?.pet?.especie} ${ref.maxAge}`}</Th>                
                      ))
     
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
                      multRefs[0][0][0]?.refIdades?.flatMap((ref: any) => (
                        <>
                        <Td key={ref?.absoluto} border="1px solid black">
                          Absoluto
                        </Td>
                        <Td key={ref?.relativo} border="1px solid black">
                          Relativo
                        </Td>
                      </>                
                      ))
     
                    }
             
                  </Tr>

                  {table ? (
                    table?.characteristics?.map(charac => {
                      const table = charac?.especie.find(
                        (data: any) => data.name === pet?.medicine?.pet?.especie
                      )
                      return (
                        <Tr key={charac.id} fontWeight="bold">
                          <Td border="1px solid black">{charac.name}</Td>
                          <Td border="1px solid black" bg="white">
                            <Input {...register(`abs${charac.name}`)} name={`abs${charac.name}`}  />
                          </Td>
                          <Td border="1px solid black" bg="white">
                            <Input  {...register(`rel${charac.name}`)} name={`rel${charac.name}`}  />
                          </Td>
                          <Td border="1px solid black" bg="white"></Td>
                          <Td border="1px solid black" bg="white">
                            mg/dl
                          </Td>
                          {table?.refIdades.map(ref => (
                            <>
                              <Td
                                key={ref.absoluto}
                                border="1px solid black"
                                bg="white"
                              >
                                {ref.absoluto}
                              </Td>
                              <Td
                                key={ref.relativo}
                                border="1px solid black"
                                bg="white"
                              >
                                {ref.relativo}
                              </Td>
                            </>
                          ))}
                        </Tr>
                      )
                    })
                  ) : (
                    <LoadingSpinner />
                  )}
                </Tbody>
              </Table>
             
            </TableContainer>
          
           
            
          ))
        ) : (
          <LoadingSpinner />
        )}
          <Button isDisabled={disableRequest} type="submit" colorScheme="whatsapp">Gravar</Button>
       </Flex>
    )
    break;
    case exam.isOnePart === true: 
    typeTableView = (
      <TableContainer as="form" onSubmit={handleSubmit(handleSetTableReport)} >
      <Table>
        <Thead>
        <Tr>
          <Th   fontSize="15"
        border="1px solid black"
        bg="blue.400"
        color="white">{pet?.name}</Th>
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

        {exam ? exam?.characteristics?.map((charac, index) => {
      const table = charac?.especie.find((data: any) => data.name === pet?.medicine?.pet?.especie)
      return (
        <Tr key={charac.id} fontWeight="bold">
        <Td border="1px solid black">{charac.name}</Td>
        <Td border="1px solid black" bg="white">
         <Input {...register(`abs${charac.name}`)} name={`abs${charac.name}`}   />
        </Td>
        <Td border="1px solid black" bg="white">
        <Input {...register(`rel${charac.name}`)} name={`rel${charac.name}`}  />
        </Td>
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
      <Button isDisabled={disableRequest} type="submit" w="100%"  mt="4" colorScheme="whatsapp">GRAVAR</Button>
    </TableContainer>
      
    )
    break;
    case exam.isReportByText === true: 
    typeTableView = (
      <Flex direction="column" align="center" m="4">
      <Text>LAUDO LIVRE</Text>
    <Textarea onChange={(ev) => setTextReport(ev.target.value)}  border="2px" bgColor="white" minWidth={600} minHeight={800} />
    <Button onClick={handleSetTextReport} colorScheme="whatsapp" mt="4">GRAVAR</Button>
    </Flex>
    )
    break;
    default:
      typeTableView = (
        <Flex align="center" justify="center" w="100%" h="100%">
            <Text>OPS.... Parece que houve uma falha na renderização desse exame,
              verifique as configurações dele!
            </Text>
            <Button colorScheme="yellow" onClick={() => navigate(`/Admin/Exams/${exam.id}`)}>Ir até configuração</Button>
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
                              defaultValue={pet?.medicine?.pet.name}
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
                              defaultValue={pet?.name}
                        
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
                                    {typeTableView}
                              
                            
                               
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
