import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import { Text } from "@chakra-ui/layout";
import { BiHome } from "react-icons/bi";
import { TbArrowBack } from "react-icons/tb";
import { ChakraProvider, Flex, Button } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import { Textarea } from "@chakra-ui/react";
import { Checkbox } from "@chakra-ui/react";
import { api } from "../../lib/axios";
import { toast } from "react-toastify";
import { ConfirmationDialog } from "../../components/dialogConfirmComponent/ConfirmationDialog";
import { AiOutlineSend } from "react-icons/ai";

interface SugerieDetailsProps {
	petId: number,
	petName: string;
	petWeight: string;
	petEspecie: string;
	petRace: string;
	petAge: string;
	customerName: string;
	customerCpf: string;
	sugerieId: number;
	sugerieName: string;
  sugerieReport: string;
  sugerieReportBy: string;
}

export default function SurgeriesDetails() {
  const [surgeriesDetails, setSurgeriesDetails] = useState({} as SugerieDetailsProps);  const { id } = useParams<{ id: string }>();
  const [reloadSugeriesData, setReloadSugeriesData] = useState(false)
  const [endSurgerie, setEndSurgerie] = useState(false)
  const [reportText, setReportText] = useState("")

  const user = JSON.parse(localStorage.getItem("user") as string);


  const navigate = useNavigate();

  async function getSurgeriesDetails() {
    const sugerie = await api.get(`/surgeries/reports/started/${id}`);
    setSurgeriesDetails(sugerie.data);
  }


  async function reportPetSugerie() {
    try {

      const data = {
        reportedText: reportText, 
        reportedBy: user.username,
        finishReport: endSurgerie
      }

   
      await api.patch(`/surgeries/reports/${surgeriesDetails.sugerieId}`, data)

      if(endSurgerie === true) {
        toast.success("Cirurgia encerrada com sucesso!")
      }
      toast.success("Cirurgia laudada com sucesso!")
      setReloadSugeriesData(true)

    } catch (error) {
      toast.error("Falha ao laudar cirurgia!")
      console.log(error)
    } finally {
      setReloadSugeriesData(false)
    }
  }

  useEffect(() => {
    getSurgeriesDetails();
  }, [reloadSugeriesData]);

  


  return (
    <ChakraProvider>
      <Flex width="100vw" height="100vh" bgColor="white" direction="column">
        <Flex w="100%" height="15vh" bgColor="gray.200">
          <Flex align="center" gap="2" justify="space-between" w="100%" px="5">
            <Flex>
              <Text fontSize="2xl" fontWeight="bold">
                Cirurgias
              </Text>
            </Flex>
            <Flex gap="2">
              <Button
                colorScheme="teal"
                leftIcon={<BiHome size={24} />}
                onClick={() => navigate("/Home")}
              >
                Home
              </Button>

              <Button
                colorScheme="yellow"
                leftIcon={<TbArrowBack size={24} />}
                onClick={() => navigate(`/Surgeries/`)}
              >
                Voltar
              </Button>
            </Flex>
          </Flex>
        </Flex>
        <Flex width="100%" height="90vh" direction="column">
          <Flex color="black" bg="gray.700" direction="column" w="100vw">
            <Text
              fontSize="2xl"
              border="1px solid black"
              fontWeight="bold"
              color="white"
              pl="2"
              py="4"
            >
              {" "}
              Laudo de Cirurgia
            </Text>
          
  
                    <Flex
                      bg="gray.200"
                      border="1px solid black"
                      fontSize="20"
                      direction="column"
                      fontWeight="bold"
                    >
                      <Flex>
                        <Text
                          color="black"
                          border="1px solid black"
                          pl="2"
                          py="1"
                          w="12vw"
                        >
                          Pet
                        </Text>
                        <Input
                          defaultValue={surgeriesDetails.petName}
                          borderColor="black"
                          disabled
                          _disabled={{
                            textColor: 'black'
                          }}
                          rounded="0"
                          bg="white"
                          py="6"
                        />
                      </Flex>
                      <Flex>
                        <Text
                          color="black"
                          border="1px solid black"
                          pl="2"
                          py="1"
                          w="12vw"
                        >
                          Cliente
                        </Text>
                        <Input
                          defaultValue={surgeriesDetails.customerName}
                          disabled
                          _disabled={{
                            textColor: 'black'
                          }}
                          borderColor="black"
                          rounded="0"
                          bg="white"
                          py="6"
                        />
                      </Flex>
                      <Flex>
                        <Text
                          color="black"
                          border="1px solid black"
                          pl="2"
                          py="1"
                          w="11.7vw"
                        >
                          Laudado Por
                        </Text>
                        <Input
                          borderColor="black"
                          rounded="0"
                          bg="white"
                          disabled
                          _disabled={{
                            textColor: 'black'
                          }}
                          defaultValue={surgeriesDetails?.sugerieReportBy}
                          w="87.5vw"
                          py="6"
                        />
                        <Flex
                          justify="center"
                          w="10vw"
                          bg="gray.200"
                          border="1px solid black"
                        >
                          <Checkbox
                            onChange={(ev) => ev.target.checked === true ? setEndSurgerie(true) : setEndSurgerie(false) }
                            colorScheme="green"
                            size="lg"
                            py="2"
                            fontSize="20"
                            borderColor="black"
                          >
                            Concluida
                          </Checkbox>
                        </Flex>
                      </Flex>
                    </Flex>
          
        
          </Flex>
          <Flex
            direction="column"
            bg="gray.700"
            w="100vw"
            border="1px solid black"
          >
            <Text fontSize="2xl" fontWeight="bold" color="white" pl="2" py="4">
              Laudo
            </Text>
            <Flex
              bg="gray.200"
              border="1px solid black"
              fontSize="20"
              h="36.6vh"
            >
              <Textarea
              onChange={(ev) => setReportText(ev.target.value)}
              defaultValue={surgeriesDetails?.sugerieReport}
                rounded="0"
                h="100%"
                bg="white"
              />
            </Flex>
          </Flex>

          {
            endSurgerie === false ?   <Button
            onClick={() => reportPetSugerie() }
            py="10" fontSize="20" colorScheme="whatsapp">
              Gravar Cirurgia
            </Button> : <ConfirmationDialog h="72px" buttonTitle="Finalizar cirurgia" whatIsConfirmerd="Você tem certeza que deseja finalizar essa cirurgia?"
            describreConfirm="O campo de conclusão está marcado, caso ainda não queira encerrar o laudo desmaque-o" callbackFn={() => reportPetSugerie()} disabled={false}
            icon={<AiOutlineSend />}
            />
          }
        
        </Flex>
      </Flex>
    </ChakraProvider>
  );
}
