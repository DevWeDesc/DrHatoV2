import {
  ChakraProvider,
  Flex,
  Text,
  Input,
  Select,
  Button,
  HStack,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Checkbox,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { PetDetaisl } from "../../interfaces";
import { api } from "../../lib/axios";


interface SugeriesProps {
  id: number;
  name: string;
  price: number | string;
}

export function Createsurgeries() {
  const [petDetails, setPetDetails] = useState({} as PetDetaisl);
    const [sugeries, setSugeries] = useState<SugeriesProps[]>([])
    const [sugeriesId, setSugeriesId] = useState(0)
    const [reloadData, setReloadData] = useState(false);
    const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();


    async function GetData() {
      try {
      const pet = await api.get(`/pets/${id}`);
      const sugeries = await api.get('/surgeries')
      setPetDetails(pet.data)
      setSugeries(sugeries.data)
      } catch (error) {
        console.error(error)
      }
    }

    useEffect(() => {},[
      GetData()
    ])

    useEffect(() => {
      if (reloadData === true) {
        GetData()
        setReloadData(false); // Reseta o estado para evitar chamadas infinitas
      }
    }, [reloadData])


    async function setSugeriesInPet ()  {
      try {
        await api.post(`surgeries/${sugeriesId}/${petDetails.recordId}`)
        setReloadData(true);
        toast.success("Cirurgia adicionada com Sucesso")
      } catch (error) {
        toast.error("Falha ao cadastrar Cirurgia!")
      }
    }
  
    const handleDeleteSugerie = async (did: number) => {
      try {
        const confirm = window.confirm("DELETAR E UMA AÇÃO IRREVERSIVEL TEM CERTEZA QUE DESEJA CONTINUAR?")

        if(confirm === true )
        {
          await api.delete(`/surgeries/${did}`).then((res) => {
            setReloadData(true);
           toast.warning("EXCLUIDO COM SUCESSO") 
          })
        } else { return}
      } catch (error) {
       toast.error("FALHA AO PROCESSAR EXCLUSÃO")
       console.log(error)
      }
    }

  return (
    <ChakraProvider>
      <Flex>
        <Flex
          color="black"
          direction="column"
          w="65vw"
          borderRight="2px solid black"
          fontWeight="bold"
        >
          <Text
            bg="gray.700"
            fontSize="2xl"
            border="1px solid black"
            fontWeight="bold"
            color="white"
            py="2"
            textAlign="center"
          >
            {" "}
            Agendamento de Cirurgias
          </Text>
          <Flex
              bg="gray.200"
              border="1px solid black"
              fontSize="20"
              w="65vw"
              h="41vh"
            
            >
                   <TableContainer width="100%" height="100%" overflowY="auto">
                <Table>
                <Thead>
                  <Tr>
                      <Th fontWeight="black" color="black"  fontSize="md" >NOME</Th>
                      <Th fontWeight="black" color="black"  fontSize="md" >VALOR</Th>
                      <Th fontWeight="black" color="black"  fontSize="md" >EXCLUIR?</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
          {
            petDetails.surgeries?.map((sugerie) => (
                    <Tr key={sugerie.id}>
                      <Td>{sugerie.name}</Td>
                      <Td>{sugerie.price}</Td>
                      <Td><Button colorScheme="red" onClick={() => handleDeleteSugerie(sugerie.id)} >EXCLUIR</Button></Td>
                    </Tr>
            ) )
          }
           </Tbody>
           </Table>
              </TableContainer>
         </Flex>
          <Flex direction="column" h="41vh">
            <Text
              bg="gray.700"
              fontSize="2xl"
              border="1px solid black"
              fontWeight="bold"
              color="white"
              py="2"
              textAlign="center"
              w="100%"
            >
              {" "}
              Adicione Cirurgias
            </Text>
            <Flex bg="gray.200" py="2" justify="center">
              <Flex>
                <Input borderColor="black" rounded="0" w="20vw" bg="white" />
                <HStack>
                <Button color="white" rounded="0" colorScheme="twitter">
                  Procurar
                </Button>

                <Button onClick={setSugeriesInPet} color="white" rounded="0" colorScheme="whatsapp">
                  ADICIONAR
                </Button>
                </HStack>
           
              </Flex>
            </Flex>
           
              <TableContainer>
                <Table>
                  <Thead>
                    <Tr>
                    <Th>Selecione</Th>
                      <Th>Cirurgia</Th>
                      <Th>Até 6kg</Th>
                      <Th>7kg á 15kg</Th>
                      <Th>16kg á 35kg</Th>
                      <Th>35kg+</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {
                      sugeries.map((sugerie) => (
                        <Tr key={sugerie.id}>
                        <Td><Checkbox size="lg" borderColor="black" onChange={(ev) => ev.target.checked === true ? setSugeriesId(sugerie.id) : setSugeriesId(0)}  /></Td>
                        <Td>{sugerie.name}</Td>
                        <Td>{sugerie.price}</Td>
                        <Td>{sugerie.price}</Td>
                        <Td>{sugerie.price}</Td>
                        <Td>{sugerie.price}</Td>
                      </Tr>
                      ))
                    }
                 
                  </Tbody>
                </Table>
              </TableContainer>
            </Flex>
   
        </Flex>

        <Flex direction="column" w="35vw" border="1px solid black">
          <Text
            bg="gray.700"
            fontSize="2xl"
            fontWeight="bold"
            color="white"
            pl="2"
            py="2"
          >
            Consulta n° 10045
          </Text>
          <Flex
            bg="gray.200"
            border="1px solid black"
            fontSize="20"
            direction="column"
          >
            <Flex align="center">
              <Text
                border="1px solid black"
                borderRight="2px solid black"
                fontWeight="bold"
                pl="2"
                py="1"
                w="15rem"
              >
                Data
              </Text>
              <Input
                borderColor="black"
                type="date"
                rounded="0"
                fontWeight="bold"
                bg="white"
              />
            </Flex>
            <Flex align="center">
              <Text
                border="1px solid black"
                borderRight="2px solid black"
                fontWeight="bold"
                pl="2"
                py="1"
                w="14.4rem"
              >
                C. Cirúrgico
              </Text>
              <Select
                borderColor="black"
                rounded="0"
                fontWeight="bold"
                bg="white"
              >
                <option value="Centro Cirurgico">Centro Cirurgico</option>
              </Select>
            </Flex>
          </Flex>
          <Button
            bg="whatsapp.600"
            fontSize="2xl"
            fontWeight="bold"
            color="white"
            rounded="0"
            py="2"
            _hover={{ backgroundColor: "whatsapp.500" }}
          >
            Verificar
          </Button>
          <Flex direction="column">
            <Flex fontSize="20" fontWeight="bold" bg="gray.200">
              <Text pl="2" border="1px solid black" w="10vw">
                Slot
              </Text>
              <Text pl="2" border="1px solid black" w="10vw">
                Animal
              </Text>{" "}
              <Text pl="2" border="1px solid black" w="15vw">
                Cirurgia
              </Text>
            </Flex>
            <Flex bg="green.100">
              <Text pl="2" border="1px solid black" w="10vw">
                1
              </Text>
              <Text pl="2" border="1px solid black" w="10vw">
                -
              </Text>
              <Text pl="2" border="1px solid black" w="15vw">
                -
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </ChakraProvider>
  );
}
