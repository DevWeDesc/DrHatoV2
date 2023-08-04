import {
  Flex,
  ChakraProvider,
  Table,
  Thead,
  Tbody,
  Td,
  Th,
  Tr,
  Text,
  Button,
  TableContainer,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { BiHome, TbArrowBack } from "react-icons/all";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { api } from "../../lib/axios";
import { MedicineContainer } from "./style";
import { PetDetaisl } from "../../interfaces";

interface Customer {
  id: string | number;
  name: string;
}

interface PetProps {
  id: number;
  name: string;
  especie: string;
  corPet: string;
  observations: string;
  race: string;
  rga: number;
  sizePet: string;
  weigth: string;
  sexo: string;
  status: string;
  bornDate: string;
  customerName: string;
  codPet: string;
}

export function MedicineRecords() {
  const { id } = useParams<{ id: string }>();
  const [pets, setPets] = useState({} as PetDetaisl);
  const navigate = useNavigate();

  async function getPet() {
    try {
      const response = await api.get(`/pets/${id}`);
      setPets(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getPet();
  }, []);

  return (
    <ChakraProvider>
      <Flex direction="column" h="100vh" w="100vw">
        <Flex w="100%" height="10vh" bgColor="gray.200">
          <Flex align="center" gap="2">
            <Text m="2" fontSize="2xl" fontWeight="bold">
              Prontuário
            </Text>
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
              onClick={() => navigate(`/Vets/Workspace/${id}`)}
            >
              Voltar
            </Button>
          </Flex>
        </Flex>

        <MedicineContainer>
          <Flex
            direction="column"
            shadow="4px 0px 10px -2px rgba(0, 0, 0, 0.2)"
            zIndex="1"
            w="100%"
          >
            <Flex
              p="4"
              gap={4}
              w="100%"
              fontSize="18"
              justifyContent="center"
              direction="column"
            >
              <TableContainer w="100%">
                <Table variant="simple" w="100%">
                  <Tbody>
                    <Tr>
                      <Th py="0" px="0" fontSize="18" w="30px">
                        Cliente
                      </Th>
                      <Th py="0" px="0">
                        <Input
                          py="6"
                          rounded="0"
                          borderColor="black"
                          value={pets.customerName}
                        />
                      </Th>
                    </Tr>
                    <Tr>
                      <Th py="0" px="0" fontSize="18" color="black" w="30px">
                        Pet
                      </Th>
                      <Td py="0" px="0">
                        <Input
                          py="6"
                          rounded="0"
                          borderColor="black"
                          value={`Nome: ${pets.name}, Raça: ${pets.race}, Peso: ${pets.weigth}Kg's,  Sexo ${pets.sexo}, Cor: ${pets.corPet} `}
                        />
                      </Td>
                    </Tr>
                    <Tr py="0">
                      <Th
                        py="0"
                        px="0"
                        pr="5"
                        fontSize="18"
                        color="black"
                        w="30px"
                      >
                        Código Único
                      </Th>
                      <Td py="0" px="0">
                        <Input
                          py="6"
                          rounded="0"
                          borderColor="black"
                          value={pets.codPet}
                        />
                      </Td>
                    </Tr>
                  </Tbody>
                </Table>
              </TableContainer>
            </Flex>

            <Flex
              direction="column"
              w="100%"
              h="70%"
              bgColor="gray.100"
              rounded={4}
              className="secondmain"
            >
              <Flex w="100%" h="10%" justify="space-evenly" my="2">
                <Button colorScheme="whatsapp" w="32%">
                  Consultas
                </Button>
                <Button colorScheme="whatsapp" w="32%">
                  Internações
                </Button>
                <Button colorScheme="whatsapp" w="32%">
                  Outra Unidade
                </Button>
              </Flex>
              <Flex h="100%" w="100%" overflow="auto">
                <TableContainer w="100%" overflowY="auto">
                  <Table variant="simple" overflow="auto">
                    <Tbody overflow="auto">
                      <Tr>
                        <Th
                          colSpan={2}
                          fontSize="16"
                          borderColor="black"
                          borderTop="1px solid black"
                          bg="gray.300"
                        >
                          19/17/23 - Das 14:36 até 14:46 - Retorno - Dr.(a) José
                          Ricardo Fusaro Serra
                        </Th>
                      </Tr>
                      <Tr>
                        <Th
                          fontSize="16"
                          bg="gray.300"
                          borderColor="black"
                          w="30px"
                          borderRight="1px solid black"
                        >
                          Peso à Época
                        </Th>
                        <Th fontSize="16" borderColor="black">
                          3,45Kgs.
                        </Th>
                      </Tr>
                      <Tr p="0">
                        <Th
                          fontSize="16"
                          bg="gray.300"
                          borderColor="black"
                          w="30px"
                        >
                          Sintomas
                        </Th>
                        <Th p="0">
                          <Textarea
                            minH="110px"
                            h="100%"
                            bg="white"
                            borderColor="black"
                            rounded="0"
                            value="Retorno

Veio retirar resultado de exames com várias alterações, porém não trouxe paciente, irá retornar para aplicação de convênia e receita (estava com duas crianças que não a deixavam conversar)"
                          ></Textarea>
                        </Th>
                      </Tr>
                    </Tbody>
                    <Tbody>
                      <Tr>
                        <Th
                          colSpan={2}
                          fontSize="16"
                          borderColor="black"
                          borderTop="1px solid black"
                          bg="gray.300"
                        >
                          13/07/23 - Das 13:38 até : 15:21 - Telefone - Dr.(a)
                          José Ricardo Fusaro Serra
                        </Th>
                      </Tr>
                      <Tr>
                        <Th
                          fontSize="16"
                          bg="gray.300"
                          borderColor="black"
                          w="30px"
                          borderRight="1px solid black"
                        >
                          Peso à Época
                        </Th>
                        <Th fontSize="16" borderColor="black">
                          3,45Kgs.
                        </Th>
                      </Tr>
                      <Tr p="0">
                        <Th
                          fontSize="16"
                          bg="gray.300"
                          borderColor="black"
                          w="30px"
                        >
                          Sintomas
                        </Th>
                        <Th p="0">
                          <Textarea
                            minH="110px"
                            h="100%"
                            bg="white"
                            borderColor="black"
                            rounded="0"
                            value="Conversado com tutora sobre resultado de exames."
                          ></Textarea>
                        </Th>
                      </Tr>
                    </Tbody>
                    <Tbody>
                      <Tr>
                        <Th
                          colSpan={2}
                          fontSize="16"
                          borderColor="black"
                          borderTop="1px solid black"
                          bg="gray.300"
                        >
                          12/07/23 - Das 11:39 até : 12:14 - Retorno - Dr.(a)
                          Henrique Magoga
                        </Th>
                      </Tr>
                      <Tr>
                        <Th
                          fontSize="16"
                          bg="gray.300"
                          borderColor="black"
                          w="30px"
                          borderRight="1px solid black"
                        >
                          Peso à Época
                        </Th>
                        <Th fontSize="16" borderColor="black">
                          3,45Kgs.
                        </Th>
                      </Tr>
                      <Tr p="0">
                        <Th
                          fontSize="16"
                          bg="gray.300"
                          borderColor="black"
                          w="30px"
                        >
                          Sintomas
                        </Th>
                        <Th p="0">
                          <Textarea
                            minH="550px"
                            borderBottom="2px solid black"
                            bg="white"
                            borderColor="black"
                            rounded="0"
                            value="Retorno

Relata que apresentou diarreia de ontem para hoje.
Não apresentou emese.
Refere que depois da fluido o animal ficou mais esperto, se alimentou.
Animal tinha acesso a rua, há 6 meses esta confinado.
                            
TUTORA MUITO CONFUSA, NAO PARA DE ME CORTAR ENQUANTO EU FALO !!
                            
Passado resultado de ultrassom - ínfima quantidade de liquido livre;
Inflamação em alças intestinais;
Figado toxemico;
Pancreatopatia
Linfonodos jejunais aumentados.
                            
Conversado sobre possibilidade aumento de linfonodos / liquido livre ser devido ao processo inflamatório intenso, mas não descartando a possibilidade de linfoma primário ou secundário a felv (já que o animal tinha acesso a rua).
                            
Enquanto eu falava tutora ficou pedindo para passar antibiótico que o animal iria ficar bem
                            
Recoletado hemograma. 
                            
Ligar amanha para resultado do hg .. retornar em 10d ou antes se necessario"
                          ></Textarea>
                        </Th>
                      </Tr>
                      <Tr p="0">
                        <Th
                          fontSize="16"
                          bg="gray.300"
                          borderColor="black"
                          w="30px"
                        >
                          Prescrição
                        </Th>
                        <Th p="0">
                          <Textarea
                            minH="330px"
                            borderBottom="2px solid black"
                            bg="white"
                            borderColor="black"
                            rounded="0"
                            value="USO ORAL

GAVIZ 10 (VETERINARIO) ________________________ CX
ADMINISTRAR 1/2 (MEIO) COMPRIMIDO A CADA 12H DURANTE 10 DIAS
* 30 MINUTOS ANTES DAS OUTRAS MEDICACOES
                            
METRONIDAZOL 250 (HUMANO) ___________________CX
ADMINISTRAR 1/4 (UM QUARTO) DO COMPRIMIDO A CADA 12H DURANTE 10 DIAS
                            
PREDINISOLONA 5MG (HUMANO) __________________CX
ADMINISTRAR 3/4 (TRES QUARTOS) DO COMPRIMIDO A CADA 24H DURANTE 10 DIAS
                            
- LIGAR EM 24H PARA RESULTADO DO HEMOGRAMA
- RETORNAR EM 10 DIAS OU ANTES SE NECESSARIO"
                          ></Textarea>
                        </Th>
                      </Tr>
                    </Tbody>
                    <Tbody>
                      <Tr>
                        <Th
                          colSpan={2}
                          fontSize="16"
                          borderColor="black"
                          borderTop="1px solid black"
                          bg="gray.300"
                        >
                          11/07/23 - Das 12:24 até : 12:56 - Consulta - Dr.(a)
                          José Ricardo Fusaro Serra
                        </Th>
                      </Tr>
                      <Tr>
                        <Th
                          fontSize="16"
                          bg="gray.300"
                          borderColor="black"
                          w="30px"
                          borderRight="1px solid black"
                        >
                          Peso à Época
                        </Th>
                        <Th fontSize="16" borderColor="black">
                          3,45Kgs.
                        </Th>
                      </Tr>
                      <Tr p="0">
                        <Th
                          fontSize="16"
                          bg="gray.300"
                          borderColor="black"
                          w="30px"
                        >
                          Sintomas
                        </Th>
                        <Th p="0">
                          <Textarea
                            minH="330px"
                            h="100%"
                            borderBottom="2px solid black"
                            bg="white"
                            borderColor="black"
                            rounded="0"
                            value="Alega paciente apresentar êmese algumas vezes após se alimentar.
Alega paciente estar se alimentando normalmente
Alega Fezes e urina normais
Alega paciente com vacinas em dia porem não apresentou carteira de vacinação.
                            
                            
EF.: Paciente apresentou parâmetros normais, alerta e responsivo, eupineico, normocorado, não apresentou dor abdominal a palpação, apresenta desidratação moderada.
                            
Coletados Hemograma e bioquímico
                            
Aplicado R/L, Acetil e CB
                            
Solicirado Ultrassom Abdominal"
                          ></Textarea>
                        </Th>
                      </Tr>
                    </Tbody>
                  </Table>
                </TableContainer>
              </Flex>
            </Flex>
          </Flex>
          <Flex width="40%" direction="column" className="one">
            <Flex
              height="50%"
              w="100%"
              textAlign="center"
              direction="column"
              borderRight="1px solid black"
            >
              <Flex
                w="100%"
                height="38px"
                bgColor="gray.100"
                align="center"
                justify="center"
                py="2"
                borderTop="1px solid black"
              >
                <Text fontWeight="bold">VACINAS</Text>
              </Flex>
              <Flex
                w="100%"
                height="38px"
                bgColor="gray.200"
                gap={2}
                align="center"
                justify="space-evenly"
                borderTop="1px solid black"
              >
                <Text fontWeight="bold">TIPOS</Text>
                <Text fontWeight="bold">DATA</Text>
              </Flex>
              <Flex direction="row" w="100%" h="100%" overflowY="auto">
                <Flex
                  w="100%"
                  h="38px"
                  bgColor="cyan.100"
                  align="center"
                  borderY="2px"
                  justify="space-evenly"
                >
                  <Text fontWeight="bold">Anti Rabica</Text>
                  <Text fontWeight="bold">11/04/22</Text>
                </Flex>
              </Flex>
            </Flex>

            <Flex
              direction="column"
              height="50%"
              w="100%"
              textAlign="center"
              borderRight="1px solid black"
            >
              <Flex
                w="100%"
                height="38px"
                bgColor="gray.100"
                align="center"
                justify="center"
                borderTop="1px solid black"
              >
                <Text fontWeight="bold">CIRURGIAS</Text>
              </Flex>
              <Flex
                w="100%"
                height="38px"
                bgColor="gray.200"
                gap={2}
                align="center"
                justify="space-evenly"
                borderY="1px solid black"
              >
                <Text fontWeight="bold">TIPOS</Text>
                <Text fontWeight="bold">DATA</Text>
              </Flex>
            </Flex>
          </Flex>

          <Flex
            ml="1"
            width="40%"
            direction="column"
            className="two"
            borderLeft="1px solid black"
          >
            <Flex height="50%" w="100%" textAlign="center" direction="column">
              <Flex
                w="100%"
                height="38px"
                py="2"
                bgColor="gray.100"
                align="center"
                justify="center"
                borderTop="1px solid black"
              >
                <Text fontWeight="bold">EXAMES</Text>
              </Flex>
              <Flex
                w="100%"
                height="40px"
                bgColor="gray.200"
                gap={2}
                align="center"
                pl="6"
                pr="6"
                justify="space-between"
                borderTop="1px solid black"
              >
                <Text fontWeight="bold">TIPOS</Text>
                <Text fontWeight="bold">DATA</Text>
              </Flex>
              <Flex
                direction="column"
                height="100%"
                width="100%"
                overflowY="auto"
              >
                {pets.exams?.map((exam) => (
                  <Flex
                    key={exam.id}
                    borderY="1px"
                    bgColor="cyan.100"
                    align="center"
                    height="38px"
                    width="100%"
                    pl="6"
                    pr="6"
                    justify="space-between"
                  >
                    {exam.doneExam === true ? (
                      <Text color="green.400" fontWeight="bold">
                        {exam.name}
                      </Text>
                    ) : (
                      <Text color="red.400" fontWeight="bold">
                        {exam.name}
                      </Text>
                    )}
                    <Text fontWeight="bold" fontSize="lg">
                      {exam.requestedData}
                    </Text>
                  </Flex>
                ))}
              </Flex>
              <Flex
                w="100%"
                height="38px"
                bgColor="gray.100"
                gap={2}
                align="center"
                justify="space-evenly"
                borderTop="1px solid black"
              >
                <Text fontWeight="bold" color="red">
                  Vermelhos/Por Fazer
                </Text>
                <Text fontWeight="bold" color="green">
                  Verde/Pronto
                </Text>
              </Flex>
            </Flex>
            <Flex height="50%" w="100%" textAlign="center" direction="column">
              <Flex
                w="100%"
                height="38px"
                bgColor="gray.100"
                align="center"
                justify="center"
                borderTop="1px solid black"
              >
                <Text fontWeight="bold">INTERNAÇÕES</Text>
              </Flex>
              <Flex
                w="100%"
                height="38px"
                bgColor="gray.200"
                gap={2}
                align="center"
                justify="space-evenly"
                borderY="1px solid black"
              >
                <Text fontWeight="bold">TIPOS</Text>
                <Text fontWeight="bold">DATA</Text>
              </Flex>
            </Flex>
          </Flex>
        </MedicineContainer>
      </Flex>
    </ChakraProvider>
  );
}
