import {
  Text,
  Heading,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Input,
  Flex,
  Box,
  TableContainer,
  Button,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { BoxProps, HistoryBoxProps } from "../../interfaces";
import { api } from "../../lib/axios";
export function OpenedBox() {
  const [fatherBoxs, setFathersBox] = useState({} as BoxProps);
  const [dailyBoxes, setDailyBoxes] = useState({} as HistoryBoxProps)
  const [reloadData, setReloadData] = useState(false);
  const [reloadState, setReloadState] = useState(false);
  const user = JSON.parse(localStorage.getItem("user") as string);
  async function getBoxs() {
    try {
     const response = await api.get("/vetbox")
      setFathersBox(response.data)
    } catch (error) {
      console.error(error);
    }
  }

 async function handleOpenBox() {
            try {
              const data = {
                entryValues: 1000, 
                exitValues: 500 , 
                openBy: user.username
              }
             await api.post(`/openhistbox/${fatherBoxs.id}`, data).then((res) => {
              setDailyBoxes(res.data)
              toast.success("Caixa aberto com sucesso")
              setReloadState(true)
             }).catch((err) => {
              toast.error("Houve algum erro durante a abertura de caixa!")
              console.log(err)
             })
             
            } catch (error) {
              toast.error("Falha ao abrir caixa!")
              console.log(error)
          }
  }



  useEffect(() => {
    getBoxs()
  },[])

  useEffect(() => {
    if (reloadData === true) {
      getBoxs();
      setReloadData(false); // Reseta o estado para evitar chamadas infinitas
    }
  }, [reloadData]);

  
  return (

   <>

    {
      reloadState === true ? (
        <Flex w="100%" justifyContent="space-between">
        <Flex direction="column" w="40%" borderRight="1px solid black">
          <Flex
            justify="space-between"
            direction="column"
            align="left"
            borderLeft="2px solid black"
            borderBottom="2px solid black"
          >
            <Heading
              bg="gray.700"
              color="white"
              size="lg"
              fontWeight="bold"
              w="100%"
              textAlign="center"
              py="5"
            >
             {fatherBoxs.name}
            </Heading>
  
            <Flex
              justify="space-between"
              align="center"
              bg="gray.300"
              borderY="1px solid black"
            >
              <Text
                w="40%"
                fontSize="18"
                fontWeight="bold"
                pl="5"
                py="3"
              >
              Abertura
              </Text>
              <Text
                h="51px"
                w="40%"
           
                bgColor="white"
                borderX="1px solid black"
                rounded="0"
              >
             
              </Text>
            </Flex>
            <Flex
              justify="space-between"
              align="center"
              bg="gray.300"
              borderY="1px solid black"
            >
              <Text w="40%" fontSize="18" fontWeight="bold" pl="5">
                Funcionário
              </Text>
              <Input
                h="51px"
                w="40%"
                bgColor="white"
                borderX="1px solid black"
                rounded="0"
                value={dailyBoxes?.openBy}
              />
            </Flex>
            <Flex
              w="100%"
              align="center"
              bg="gray.300"
              borderY="1px solid black"
            >
              <Text w="60%" fontSize="18" fontWeight="bold" pl="5">
                Dinheiro deixado pelo caixa anterior
              </Text>
              <Input
                h="51px"
                w="40%"
                bgColor="white"
                borderX="1px solid black"
                rounded="0"
              />
            </Flex>
            <Flex
              w="100%"
              align="center"
              bg="gray.300"
              borderY="1px solid black"
            >
              <Text
                w="60%"
                fontSize="18"
                fontWeight="bold"
                pl="5"
                color="blue.400"
              >
                Dinheiro para o próximo caixa
              </Text>
              <Input
                h="51px"
                w="40%"
                bgColor="white"
                borderX="1px solid black"
                rounded="0"
              />
            </Flex>
            <Flex
              w="100%"
              align="center"
              bg="gray.300"
              borderY="1px solid black"
            >
              <Text w="60%" fontSize="18" fontWeight="bold" pl="5">
                Devoluções
              </Text>
              <Input
                h="51px"
                w="40%"
                bgColor="white"
                borderX="1px solid black"
                rounded="0"
              />
            </Flex>
            <Flex
              w="100%"
              align="center"
              bg="gray.300"
              borderY="1px solid black"
            >
              <Text w="60%" fontSize="18" fontWeight="bold" pl="5">
                Dinheiro retirado para despesas
              </Text>
              <Input
                h="51px"
                w="40%"
                bgColor="white"
                borderX="1px solid black"
                rounded="0"
              />
            </Flex>
            <Flex
              w="100%"
              align="center"
              bg="gray.300"
              borderY="1px solid black"
            >
              <Text w="60%" fontSize="18" fontWeight="bold" pl="5">
                Não pago
              </Text>
              <Input
                h="51px"
                w="40%"
                bgColor="white"
                borderX="1px solid black"
                rounded="0"
              />
            </Flex>
            <Flex
              w="100%"
              align="center"
              bg="gray.300"
              borderY="1px solid black"
            >
              <Text w="60%" fontSize="18" fontWeight="bold" pl="5">
                Total em dinheiro no caixa
              </Text>
              <Input
                h="51px"
                w="40%"
                bgColor="white"
                borderX="1px solid black"
                rounded="0"
              />
            </Flex>
            <Flex
              w="100%"
              align="center"
              bg="gray.300"
              borderY="1px solid black"
            >
              <Text w="60%" fontSize="18" fontWeight="bold" pl="5">
                Total em movimento
              </Text>
              <Input
                h="51px"
                w="40%"
                bgColor="white"
                borderX="1px solid black"
                rounded="0"
              />
            </Flex>
            <Flex
              direction="column"
              w="100%"
              align="center"
              bg="gray.300"
              borderY="1px solid black"
            >
              <Text
                w="100%"
                fontSize="20"
                textAlign="center"
                fontWeight="bold"
                pl="5"
                py="3"
                bg="gray.700"
                color="white"
              >
                Totalização por tipo de pagamento
              </Text>
              <TableContainer w="100%">
                <Table variant="striped" colorScheme="teal">
                  <Thead>
                    <Tr>
                      <Th fontSize="18" border="1px solid black">
                        Tipo
                      </Th>
                      <Th
                        isNumeric
                        fontSize="18"
                        border="1px solid black"
                      >
                        Valor
                      </Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    <Tr>
                      <Td
                        style={{ border: "1px solid black" }}
                        border="1px solid black"
                        fontWeight="bold"
                      >
                        Dinheiro
                      </Td>
  
                      <Td
                        isNumeric
                        style={{ border: "1px solid black" }}
                        border="1px solid black"
                        fontWeight="bold"
                      >
                        25.4
                      </Td>
                    </Tr>
                    <Tr>
                      <Td
                        style={{ border: "1px solid black" }}
                        border="1px solid black"
                        fontWeight="bold"
                      >
                        Master Card 1X
                      </Td>
  
                      <Td
                        isNumeric
                        style={{ border: "1px solid black" }}
                        border="1px solid black"
                        fontWeight="bold"
                      >
                        30.48
                      </Td>
                    </Tr>
                    <Tr>
                      <Td
                        style={{ border: "1px solid black" }}
                        border="1px solid black"
                        fontWeight="bold"
                      >
                        Aura 3X
                      </Td>
                      <Td
                        isNumeric
                        style={{ border: "1px solid black" }}
                        border="1px solid black"
                        fontWeight="bold"
                      >
                        0.91444
                      </Td>
                    </Tr>
                    <Tr>
                      <Td
                        style={{ border: "1px solid black" }}
                        border="1px solid black"
                        fontWeight="bold"
                      >
                        Visa electron Débito
                      </Td>
                      <Td
                        isNumeric
                        style={{ border: "1px solid black" }}
                        border="1px solid black"
                        fontWeight="bold"
                      >
                        0.91444
                      </Td>
                    </Tr>
                    <Tr>
                      <Td
                        style={{ border: "1px solid black" }}
                        border="1px solid black"
                        fontWeight="bold"
                      >
                        Master Card Débito
                      </Td>
                      <Td
                        isNumeric
                        style={{ border: "1px solid black" }}
                        border="1px solid black"
                        fontWeight="bold"
                      >
                        0.91444
                      </Td>
                    </Tr>
                    <Tr>
                      <Td
                        style={{ border: "1px solid black" }}
                        border="1px solid black"
                        fontWeight="bold"
                      >
                        Depósito Bancário
                      </Td>
                      <Td
                        isNumeric
                        style={{ border: "1px solid black" }}
                        border="1px solid black"
                        fontWeight="bold"
                      >
                        0.91444
                      </Td>
                    </Tr>
                    <Tr>
                      <Td
                        style={{ border: "1px solid black" }}
                        border="1px solid black"
                        fontWeight="bold"
                      >
                        PetLove
                      </Td>
                      <Td
                        isNumeric
                        style={{ border: "1px solid black" }}
                        border="1px solid black"
                        fontWeight="bold"
                      >
                        0.91444
                      </Td>
                    </Tr>
                  </Tbody>
                </Table>
              </TableContainer>
            </Flex>
          </Flex>
        </Flex>
        <Flex w="60%" direction="column">
          <Flex
            justify="space-between"
            direction="column"
            align="center"
          >
            <Heading
              bg="gray.700"
              color="white"
              size="lg"
              fontWeight="bold"
              w="100%"
              textAlign="center"
              py="5"
            >
              Documentos Recebidos
            </Heading>
          </Flex>
  
          <TableContainer>
            <Table variant="striped" colorScheme="teal">
              <Thead>
                <Tr>
                  <Th border="1px solid black" fontSize="17">
                    Tipo
                  </Th>
                  <Th border="1px solid black" fontSize="17">
                    Cliente
                  </Th>
                  <Th border="1px solid black" fontSize="17" isNumeric>
                    Valor
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td style={{ border: "1px solid black" }}>
                    Depósito Bancário
                  </Td>
                  <Td
                    style={{ border: "1px solid black" }}
                    border="1px solid black"
                    fontWeight="bold"
                  >
                    Leiliane Pereira Do Nascimento
                  </Td>
                  <Td
                    style={{ border: "1px solid black" }}
                    border="1px solid black"
                    isNumeric
                    fontWeight="bold"
                  >
                    60,00
                  </Td>
                </Tr>
                <Tr>
                  <Td style={{ border: "1px solid black" }}>
                    Dinheiro
                  </Td>
                  <Td
                    style={{ border: "1px solid black" }}
                    border="1px solid black"
                    fontWeight="bold"
                  >
                    Djalma Rodrigues dos Santos
                  </Td>
                  <Td
                    style={{ border: "1px solid black" }}
                    border="1px solid black"
                    isNumeric
                    fontWeight="bold"
                  >
                    327,00
                  </Td>
                </Tr>
                <Tr>
                  <Td style={{ border: "1px solid black" }}>
                    Master Card Débito
                  </Td>
                  <Td
                    style={{ border: "1px solid black" }}
                    border="1px solid black"
                    fontWeight="bold"
                  >
                    Leiliane Pereira Do Nascimento
                  </Td>
                  <Td
                    style={{ border: "1px solid black" }}
                    border="1px solid black"
                    isNumeric
                    fontWeight="bold"
                  >
                    60,00
                  </Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        </Flex>
      </Flex>
      ) : 
      ( <Box flex="1" borderRadius={8} bg="gray.200" w="100%">
      <Flex direction="column" align="center" justify="center" w="100%" h="100%">
        <Text>
          Não existe caixa aberto no momento, abra um novo caixa para prosseguir!
        
        </Text>
        <Button mt="4" onClick={handleOpenBox} colorScheme="whatsapp">ABRIR CAIXA</Button>
      </Flex>
      </Box>)
    }

   </>
   
  )
}