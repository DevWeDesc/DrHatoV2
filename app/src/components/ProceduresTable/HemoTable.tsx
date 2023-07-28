import {
  Table,
  Thead,
  Tbody,
  Tr,
  Td,
  Flex,
  Button,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { Input } from "../admin/Input";

type Props = {
  Option: any;
  CloseOption: any;
};

export function HemoTable({ Option, CloseOption }: Props): any {
  return (
    <>
      {Option.map((option: any) => (
        <>
          {option.name == "Exame branquela" && (
            <Table colorScheme="blackAlpha" w="100%">
              <Thead>
                <Tr fontWeight="bold" fontSize="19">
                  <Td borderColor="black" color="white" bg="blue.500">
                    {option.name}
                  </Td>
                  <Td borderColor="black">Resultados</Td>
                  <Td borderColor="black">Unidades</Td>
                  <Td borderColor="black">1 a 8 anos</Td>
                  <Td borderColor="black">Acima de 8 anos</Td>
                </Tr>
              </Thead>
              <Tbody>
                <Td>
                  <Flex
                    direction="column"
                    fontWeight="bold"
                    justifyContent="center"
                    gap="10"
                  >
                    <Text>Caracteristicas</Text>
                    <Text>Hemácias</Text>
                    <Text>Hemoglobina</Text>
                    <Text>Hematócrito</Text>
                    <Text>V.C.M</Text>
                    <Text>M.C.M</Text>
                    <Text>C.H.C.M</Text>
                    <Text>Proteína Total</Text>
                    <Text>Eritroblastos</Text>
                  </Flex>
                </Td>

                <Td>
                  <Flex>
                    <Flex direction="column" gap="5">
                      <Text fontWeight="bold" mt="3">
                        Absoluto
                      </Text>
                      <Input maxWidth="120px" name="ex" mt="4" />
                      <Input maxWidth="120px" name="ex" />
                      <Input maxWidth="120px" name="ex" />
                      <Input maxWidth="120px" name="ex" />
                      <Input maxWidth="120px" name="ex" />
                      <Input maxWidth="120px" name="ex" />
                      <Input maxWidth="120px" name="ex" />
                      <Input maxWidth="120px" name="ex" />
                    </Flex>
                    <Flex direction="column" gap="5">
                      <Text fontWeight="bold" mt="3">
                        Relativo
                      </Text>
                      <Td></Td>
                      <Td></Td>
                      <Td></Td>
                      <Td></Td>
                      <Td></Td>
                      <Td></Td>
                      <Td></Td>
                      <Td> </Td>
                    </Flex>
                  </Flex>
                </Td>
                <Td>
                  <Flex direction="row">
                    <Flex direction="column" fontWeight="bold" gap="5">
                      <Text w="116px" mt="3">
                        Un. Abs
                      </Text>
                      <Input maxWidth="120px" name="ex" mt="4" />
                      <Input maxWidth="120px" name="ex" />
                      <Input maxWidth="120px" name="ex" />
                      <Input maxWidth="120px" name="ex" />
                      <Input maxWidth="120px" name="ex" />
                      <Input maxWidth="120px" name="ex" />
                      <Input maxWidth="120px" name="ex" />
                      <Input maxWidth="120px" name="ex" />
                    </Flex>
                    <Flex direction="column" gap="10" pl="2">
                      <Text mt="3" fontWeight="bold">
                        Un. Relativa
                      </Text>
                      <Text>milhões/mm3</Text>
                      <Text>g/dl</Text>
                      <Text>%</Text>
                      <Text>u3</Text>
                      <Text>M.C.M</Text>
                      <Text>Uug</Text>
                      <Text>%</Text>
                      <Text>g/dl</Text>
                    </Flex>
                  </Flex>
                </Td>
                <Td>
                  <Flex direction="row">
                    <Flex direction="column" gap="5">
                      <Text fontWeight="bold" mt="3">
                        Absoluto
                      </Text>
                      <Input maxWidth="120px" name="ex" mt="4" />
                      <Input maxWidth="120px" name="ex" />
                      <Input maxWidth="120px" name="ex" />
                      <Input maxWidth="120px" name="ex" />
                      <Input maxWidth="120px" name="ex" />
                      <Input maxWidth="120px" name="ex" />
                      <Input maxWidth="120px" name="ex" />
                      <Input maxWidth="120px" name="ex" />
                    </Flex>
                    <Flex direction="column" ml="5">
                      <Text fontWeight="bold" mt="3">
                        Relativo
                      </Text>
                      <Td></Td>
                      <Td></Td>
                      <Td></Td>
                      <Td></Td>
                      <Td></Td>
                      <Td></Td>
                      <Td></Td>
                      <Td> </Td>
                      <Td></Td>
                    </Flex>
                  </Flex>
                </Td>
                <Td>
                  <Flex direction="row">
                    <Flex direction="column" gap="5">
                      <Text fontWeight="bold" mt="2">
                        Absoluto
                      </Text>
                      <Input maxWidth="120px" name="ex" mt="2" />
                      <Input maxWidth="120px" name="ex" />
                      <Input maxWidth="120px" name="ex" />
                      <Input maxWidth="120px" name="ex" />
                      <Input maxWidth="120px" name="ex" />
                      <Input maxWidth="120px" name="ex" />
                      <Input maxWidth="120px" name="ex" />
                      <Input maxWidth="120px" name="ex" />
                    </Flex>
                    <Flex direction="column" gap="5" ml="4">
                      <Text fontWeight="bold" mt="2">
                        Relativo
                      </Text>
                      <Td></Td>
                      <Td></Td>
                      <Td></Td>
                      <Td></Td>
                      <Td></Td>
                      <Td></Td>
                      <Td></Td>
                      <Td> </Td>
                      <Td></Td>
                    </Flex>
                  </Flex>
                </Td>
              </Tbody>
              <Button w="100%" colorScheme="blue" onClick={() => CloseOption()}>
                Ocultar Tabela
              </Button>
            </Table>
          )}
          <>
            {option.name === "Hemograma Felino" && (
              <>
                <Table colorScheme="blackAlpha" w="100%">
                  <Thead>
                    <Tr
                      fontWeight="bold"
                      fontSize="19"
                      borderTop="1px solid black"
                    >
                      <Td borderColor="black" color="white" bg="blue.500">
                        Eritograma
                      </Td>
                      <Td borderColor="black">Resultados</Td>
                      <Td borderColor="black">Unidades</Td>
                      <Td borderColor="black">1 a 8 anos</Td>
                      <Td borderColor="black">Acima de 8 anos</Td>
                    </Tr>
                  </Thead>
                  <Tbody>
                    <Td>
                      <Flex
                        direction="column"
                        fontWeight="bold"
                        justifyContent="center"
                        gap="10"
                      >
                        <Text>Caracteristicas</Text>
                        <Text>Hemácias</Text>
                        <Text>Hemoglobina</Text>
                        <Text>Hematócrito</Text>
                        <Text>V.C.M</Text>
                        <Text>M.C.M</Text>
                        <Text>C.H.C.M</Text>
                        <Text>Proteína Total</Text>
                        <Text>Eritroblastos</Text>
                      </Flex>
                    </Td>

                    <Td>
                      <Flex>
                        <Flex direction="column" gap="5">
                          <Text fontWeight="bold" mt="3">
                            Absoluto
                          </Text>
                          <Input maxWidth="120px" name="ex" mt="4" />
                          <Input maxWidth="120px" name="ex" />
                          <Input maxWidth="120px" name="ex" />
                          <Input maxWidth="120px" name="ex" />
                          <Input maxWidth="120px" name="ex" />
                          <Input maxWidth="120px" name="ex" />
                          <Input maxWidth="120px" name="ex" />
                          <Input maxWidth="120px" name="ex" />
                        </Flex>
                        <Flex direction="column" gap="5">
                          <Text fontWeight="bold" mt="3">
                            Relativo
                          </Text>
                          <Td></Td>
                          <Td></Td>
                          <Td></Td>
                          <Td></Td>
                          <Td></Td>
                          <Td></Td>
                          <Td></Td>
                          <Td> </Td>
                        </Flex>
                      </Flex>
                    </Td>
                    <Td>
                      <Flex direction="row">
                        <Flex direction="column" fontWeight="bold" gap="5">
                          <Text w="116px" mt="3">
                            Un. Abs
                          </Text>
                          <Input maxWidth="120px" name="ex" mt="4" />
                          <Input maxWidth="120px" name="ex" />
                          <Input maxWidth="120px" name="ex" />
                          <Input maxWidth="120px" name="ex" />
                          <Input maxWidth="120px" name="ex" />
                          <Input maxWidth="120px" name="ex" />
                          <Input maxWidth="120px" name="ex" />
                          <Input maxWidth="120px" name="ex" />
                        </Flex>
                        <Flex direction="column" gap="10" pl="2">
                          <Text mt="3" fontWeight="bold">
                            Un. Relativa
                          </Text>
                          <Text>milhões/mm3</Text>
                          <Text>g/dl</Text>
                          <Text>%</Text>
                          <Text>u3</Text>
                          <Text>M.C.M</Text>
                          <Text>Uug</Text>
                          <Text>%</Text>
                          <Text>g/dl</Text>
                        </Flex>
                      </Flex>
                    </Td>
                    <Td>
                      <Flex direction="row">
                        <Flex direction="column" gap="5">
                          <Text fontWeight="bold" mt="3">
                            Absoluto
                          </Text>
                          <Input maxWidth="120px" name="ex" mt="4" />
                          <Input maxWidth="120px" name="ex" />
                          <Input maxWidth="120px" name="ex" />
                          <Input maxWidth="120px" name="ex" />
                          <Input maxWidth="120px" name="ex" />
                          <Input maxWidth="120px" name="ex" />
                          <Input maxWidth="120px" name="ex" />
                          <Input maxWidth="120px" name="ex" />
                        </Flex>
                        <Flex direction="column" ml="5">
                          <Text fontWeight="bold" mt="3">
                            Relativo
                          </Text>
                          <Td></Td>
                          <Td></Td>
                          <Td></Td>
                          <Td></Td>
                          <Td></Td>
                          <Td></Td>
                          <Td></Td>
                          <Td> </Td>
                          <Td></Td>
                        </Flex>
                      </Flex>
                    </Td>
                    <Td>
                      <Flex direction="row">
                        <Flex direction="column" gap="5">
                          <Text fontWeight="bold" mt="2">
                            Absoluto
                          </Text>
                          <Input maxWidth="120px" name="ex" mt="2" />
                          <Input maxWidth="120px" name="ex" />
                          <Input maxWidth="120px" name="ex" />
                          <Input maxWidth="120px" name="ex" />
                          <Input maxWidth="120px" name="ex" />
                          <Input maxWidth="120px" name="ex" />
                          <Input maxWidth="120px" name="ex" />
                          <Input maxWidth="120px" name="ex" />
                        </Flex>
                        <Flex direction="column" gap="5" ml="4">
                          <Text fontWeight="bold" mt="2">
                            Relativo
                          </Text>
                          <Td></Td>
                          <Td></Td>
                          <Td></Td>
                          <Td></Td>
                          <Td></Td>
                          <Td></Td>
                          <Td></Td>
                          <Td> </Td>
                          <Td></Td>
                        </Flex>
                      </Flex>
                    </Td>
                  </Tbody>
                </Table>
                <Table
                  colorScheme="blackAlpha"
                  w="100%"
                  mt="30px"
                  borderTop="1px solid black"
                >
                  <Thead>
                    <Tr fontWeight="bold" fontSize="19">
                      <Td borderColor="black" color="white" bg="blue.500">
                        Leucograma
                      </Td>
                      <Td borderColor="black">Resultados</Td>
                      <Td borderColor="black">Unidades</Td>
                      <Td borderColor="black">1 a 8 anos</Td>
                      <Td borderColor="black">Acima de 8 anos</Td>
                    </Tr>
                  </Thead>
                  <Tbody>
                    <Td>
                      <Flex
                        direction="column"
                        fontWeight="bold"
                        justifyContent="center"
                        gap="10"
                      >
                        <Text>Caracteristicas</Text>
                        <Text>Leocólicitos</Text>
                        <Text>Bastonetes</Text>
                        <Text>Segmentados</Text>
                        <Text>Eosnófilos</Text>
                        <Text>Basófilos</Text>
                        <Text>Linfócitos Tipicos</Text>
                        <Text>Linfócitos Atipicos</Text>
                        <Text>Eritroblastos</Text>
                      </Flex>
                    </Td>

                    <Td>
                      <Flex>
                        <Flex direction="column" gap="5">
                          <Text fontWeight="bold" mt="3">
                            Absoluto
                          </Text>
                          <Input maxWidth="120px" name="ex" mt="4" />
                          <Input maxWidth="120px" name="ex" />
                          <Input maxWidth="120px" name="ex" />
                          <Input maxWidth="120px" name="ex" />
                          <Input maxWidth="120px" name="ex" />
                          <Input maxWidth="120px" name="ex" />
                          <Input maxWidth="120px" name="ex" />
                          <Input maxWidth="120px" name="ex" />
                        </Flex>
                        <Flex direction="column" gap="5">
                          <Text fontWeight="bold" mt="3">
                            Relativo
                          </Text>
                          <Td></Td>
                          <Td></Td>
                          <Td></Td>
                          <Td></Td>
                          <Td></Td>
                          <Td></Td>
                          <Td></Td>
                          <Td> </Td>
                        </Flex>
                      </Flex>
                    </Td>
                    <Td>
                      <Flex direction="row">
                        <Flex direction="column" fontWeight="bold" gap="5">
                          <Text w="116px" mt="3">
                            Un. Abs
                          </Text>
                          <Input maxWidth="120px" name="ex" mt="4" />
                          <Input maxWidth="120px" name="ex" />
                          <Input maxWidth="120px" name="ex" />
                          <Input maxWidth="120px" name="ex" />
                          <Input maxWidth="120px" name="ex" />
                          <Input maxWidth="120px" name="ex" />
                          <Input maxWidth="120px" name="ex" />
                          <Input maxWidth="120px" name="ex" />
                        </Flex>
                        <Flex direction="column" gap="10" pl="2">
                          <Text mt="3" fontWeight="bold">
                            Un. Relativa
                          </Text>
                          <Text>milhões/mm3</Text>
                          <Text>g/dl</Text>
                          <Text>%</Text>
                          <Text>u3</Text>
                          <Text>M.C.M</Text>
                          <Text>Uug</Text>
                          <Text>%</Text>
                          <Text>g/dl</Text>
                        </Flex>
                      </Flex>
                    </Td>
                    <Td>
                      <Flex direction="row">
                        <Flex direction="column" gap="5">
                          <Text fontWeight="bold" mt="3">
                            Absoluto
                          </Text>
                          <Input maxWidth="120px" name="ex" mt="4" />
                          <Input maxWidth="120px" name="ex" />
                          <Input maxWidth="120px" name="ex" />
                          <Input maxWidth="120px" name="ex" />
                          <Input maxWidth="120px" name="ex" />
                          <Input maxWidth="120px" name="ex" />
                          <Input maxWidth="120px" name="ex" />
                          <Input maxWidth="120px" name="ex" />
                        </Flex>
                        <Flex direction="column" ml="5">
                          <Text fontWeight="bold" mt="3">
                            Relativo
                          </Text>
                          <Td></Td>
                          <Td></Td>
                          <Td></Td>
                          <Td></Td>
                          <Td></Td>
                          <Td></Td>
                          <Td></Td>
                          <Td> </Td>
                          <Td></Td>
                        </Flex>
                      </Flex>
                    </Td>
                    <Td>
                      <Flex direction="row">
                        <Flex direction="column" gap="5">
                          <Text fontWeight="bold" mt="2">
                            Absoluto
                          </Text>
                          <Input maxWidth="120px" name="ex" mt="2" />
                          <Input maxWidth="120px" name="ex" />
                          <Input maxWidth="120px" name="ex" />
                          <Input maxWidth="120px" name="ex" />
                          <Input maxWidth="120px" name="ex" />
                          <Input maxWidth="120px" name="ex" />
                          <Input maxWidth="120px" name="ex" />
                          <Input maxWidth="120px" name="ex" />
                        </Flex>
                        <Flex direction="column" gap="5" ml="4">
                          <Text fontWeight="bold" mt="2">
                            Relativo
                          </Text>
                          <Td></Td>
                          <Td></Td>
                          <Td></Td>
                          <Td></Td>
                          <Td></Td>
                          <Td></Td>
                          <Td></Td>
                          <Td> </Td>
                          <Td></Td>
                        </Flex>
                      </Flex>
                    </Td>
                  </Tbody>
                </Table>
              </>
            )}
          </>
          <>
            {option.name === "Hemo + Eritograma" && (
              <>
                <Table colorScheme="blackAlpha" w="100%">
                  <Thead>
                    <Tr fontWeight="bold" fontSize="19">
                      <Td borderColor="black">Eritograma</Td>
                      <Td borderColor="black">Resultados</Td>
                      <Td borderColor="black">Unidades</Td>
                      <Td borderColor="black">1 a 8 anos</Td>
                      <Td borderColor="black">Acima de 8 anos</Td>
                    </Tr>
                  </Thead>
                  <Tbody>
                    <Td>
                      <Flex
                        direction="column"
                        fontWeight="bold"
                        justifyContent="center"
                        gap="10"
                      >
                        <Text>Caracteristicas</Text>
                        <Text>Hemácias</Text>
                        <Text>Hemoglobina</Text>
                        <Text>Hematócrito</Text>
                        <Text>V.C.M</Text>
                        <Text>M.C.M</Text>
                        <Text>C.H.C.M</Text>
                        <Text>Proteína Total</Text>
                        <Text>Eritroblastos</Text>
                      </Flex>
                    </Td>

                    <Td>
                      <Flex>
                        <Flex direction="column" gap="5">
                          <Text fontWeight="bold" mt="3">
                            Absoluto
                          </Text>
                          <Input maxWidth="120px" name="ex" mt="4" />
                          <Input maxWidth="120px" name="ex" />
                          <Input maxWidth="120px" name="ex" />
                          <Input maxWidth="120px" name="ex" />
                          <Input maxWidth="120px" name="ex" />
                          <Input maxWidth="120px" name="ex" />
                          <Input maxWidth="120px" name="ex" />
                          <Input maxWidth="120px" name="ex" />
                        </Flex>
                        <Flex direction="column" gap="5">
                          <Text fontWeight="bold" mt="3">
                            Relativo
                          </Text>
                          <Td></Td>
                          <Td></Td>
                          <Td></Td>
                          <Td></Td>
                          <Td></Td>
                          <Td></Td>
                          <Td></Td>
                          <Td> </Td>
                        </Flex>
                      </Flex>
                    </Td>
                    <Td>
                      <Flex direction="row">
                        <Flex direction="column" fontWeight="bold" gap="5">
                          <Text w="116px" mt="3">
                            Un. Abs
                          </Text>
                          <Input maxWidth="120px" name="ex" mt="4" />
                          <Input maxWidth="120px" name="ex" />
                          <Input maxWidth="120px" name="ex" />
                          <Input maxWidth="120px" name="ex" />
                          <Input maxWidth="120px" name="ex" />
                          <Input maxWidth="120px" name="ex" />
                          <Input maxWidth="120px" name="ex" />
                          <Input maxWidth="120px" name="ex" />
                        </Flex>
                        <Flex direction="column" gap="10" pl="2">
                          <Text mt="3" fontWeight="bold">
                            Un. Relativa
                          </Text>
                          <Text>milhões/mm3</Text>
                          <Text>g/dl</Text>
                          <Text>%</Text>
                          <Text>u3</Text>
                          <Text>M.C.M</Text>
                          <Text>Uug</Text>
                          <Text>%</Text>
                          <Text>g/dl</Text>
                        </Flex>
                      </Flex>
                    </Td>
                    <Td>
                      <Flex direction="row">
                        <Flex direction="column" gap="5">
                          <Text fontWeight="bold" mt="3">
                            Absoluto
                          </Text>
                          <Input maxWidth="120px" name="ex" mt="4" />
                          <Input maxWidth="120px" name="ex" />
                          <Input maxWidth="120px" name="ex" />
                          <Input maxWidth="120px" name="ex" />
                          <Input maxWidth="120px" name="ex" />
                          <Input maxWidth="120px" name="ex" />
                          <Input maxWidth="120px" name="ex" />
                          <Input maxWidth="120px" name="ex" />
                        </Flex>
                        <Flex direction="column" ml="5">
                          <Text fontWeight="bold" mt="3">
                            Relativo
                          </Text>
                          <Td></Td>
                          <Td></Td>
                          <Td></Td>
                          <Td></Td>
                          <Td></Td>
                          <Td></Td>
                          <Td></Td>
                          <Td> </Td>
                          <Td></Td>
                        </Flex>
                      </Flex>
                    </Td>
                    <Td>
                      <Flex direction="row">
                        <Flex direction="column" gap="5">
                          <Text fontWeight="bold" mt="2">
                            Absoluto
                          </Text>
                          <Input maxWidth="120px" name="ex" mt="2" />
                          <Input maxWidth="120px" name="ex" />
                          <Input maxWidth="120px" name="ex" />
                          <Input maxWidth="120px" name="ex" />
                          <Input maxWidth="120px" name="ex" />
                          <Input maxWidth="120px" name="ex" />
                          <Input maxWidth="120px" name="ex" />
                          <Input maxWidth="120px" name="ex" />
                        </Flex>
                        <Flex direction="column" gap="5" ml="4">
                          <Text fontWeight="bold" mt="2">
                            Relativo
                          </Text>
                          <Td></Td>
                          <Td></Td>
                          <Td></Td>
                          <Td></Td>
                          <Td></Td>
                          <Td></Td>
                          <Td></Td>
                          <Td> </Td>
                          <Td></Td>
                        </Flex>
                      </Flex>
                    </Td>
                  </Tbody>
                </Table>
                <Button
                  mt="5"
                  py="8"
                  fontSize="18"
                  fontWeight="bold"
                  w="100%"
                  colorScheme="green"
                  //onClick={() => CloseOption()}
                >
                  Gravar
                </Button>
              </>
            )}
          </>
          <>
            {option.name === "Bioquímica sérica" && (
              <>
                <Table colorScheme="blackAlpha" w="100%">
                  <Thead>
                    <Tr fontWeight="bold" fontSize="19">
                      <Td borderColor="black" color="white" bg="blue.500">
                        Bioquímica sérica
                      </Td>
                      <Td
                        borderColor="black"
                        border="1px solid black"
                        textAlign="center"
                      >
                        Resultados
                      </Td>
                      <Td
                        borderColor="black"
                        border="1px solid black"
                        textAlign="center"
                      >
                        Unidades
                      </Td>
                      <Td
                        borderColor="black"
                        border="1px solid black"
                        textAlign="center"
                      >
                        @Val. Ref. - Canina
                      </Td>
                      <Td
                        borderColor="black"
                        border="1px solid black"
                        textAlign="center"
                      >
                        @Val. Ref. - Felina
                      </Td>
                    </Tr>
                  </Thead>
                  <Tbody>
                    <Tr>
                      <Td border="1px solid black" py="0">
                        <Flex
                          direction="column"
                          fontWeight="bold"
                          justifyContent="center"
                          gap="10"
                        >
                          Caracteristicas
                        </Flex>
                      </Td>
                      <Td py="0" px="0" display="flex" alignItems="center">
                        <Td
                          borderRight="1px solid black"
                          textAlign="center"
                          py="0"
                          h="40px"
                          w="50%"
                        >
                          Absoluto
                        </Td>
                        <Td py="0" px="0" textAlign="center" w="40%">
                          Relativo
                        </Td>
                      </Td>
                      <Td border="1px solid black" py="0">
                        <Td py="0">Un.Abs</Td>
                        <Td py="0">Un. Rel.</Td>
                      </Td>
                      <Td border="1px solid black" py="1">
                        <Td py="0">Absoluto</Td>
                        <Td py="0">Relativo</Td>
                      </Td>
                      <Td border="1px solid black" py="1">
                        <Td py="0">Absoluto</Td>
                        <Td py="0">Relativo</Td>
                      </Td>
                    </Tr>

                    <Td border="1px solid black">
                      <Flex>
                        <Flex direction="column" gap="5">
                          <Text fontWeight="bold" mt="3" textAlign="center">
                            Absoluto
                          </Text>
                          <Input maxWidth="120px" name="ex" mt="4" />
                          <Input maxWidth="120px" name="ex" />
                        </Flex>
                        <Flex direction="column" gap="5">
                          <Text fontWeight="bold" mt="3" textAlign="center">
                            Relativo
                          </Text>
                          <Td></Td>
                          <Td></Td>
                        </Flex>
                      </Flex>
                    </Td>
                    <Td border="1px solid black">
                      <Flex direction="row">
                        <Flex direction="column" fontWeight="bold" gap="5">
                          <Text w="116px" mt="3" textAlign="center">
                            Un. Abs
                          </Text>
                          <Input maxWidth="120px" name="ex" mt="4" />
                          <Input maxWidth="120px" name="ex" />
                        </Flex>
                        <Flex direction="column" gap="10" pl="2">
                          <Text mt="3" fontWeight="bold" textAlign="center">
                            Un. Relativa
                          </Text>
                          <Text>milhões/mm3</Text>
                          <Text>g/dl</Text>
                        </Flex>
                      </Flex>
                    </Td>
                    <Td border="1px solid black">
                      <Flex direction="row">
                        <Flex direction="column" gap="5">
                          <Text fontWeight="bold" mt="3" textAlign="center">
                            Absoluto
                          </Text>
                          <Input maxWidth="120px" name="ex" mt="4" />
                          <Input maxWidth="120px" name="ex" />
                        </Flex>
                        <Flex direction="column" ml="5">
                          <Text fontWeight="bold" mt="3" textAlign="center">
                            Relativo
                          </Text>
                          <Td></Td>
                          <Td></Td>
                        </Flex>
                      </Flex>
                    </Td>
                    <Td border="1px solid black">
                      <Flex direction="row">
                        <Flex direction="column" gap="5">
                          <Text fontWeight="bold" mt="2" textAlign="center">
                            Absoluto
                          </Text>
                          <Input maxWidth="120px" name="ex" mt="2" />
                          <Input maxWidth="120px" name="ex" />
                        </Flex>
                        <Flex direction="column" gap="5" ml="4">
                          <Text fontWeight="bold" mt="2" textAlign="center">
                            Relativo
                          </Text>
                          <Td></Td>
                          <Td></Td>
                        </Flex>
                      </Flex>
                    </Td>
                  </Tbody>
                </Table>
                <Flex>
                  <Text pl="6" fontWeight="bold" w="19.4%" textAlign="center">
                    Observações
                  </Text>
                  <Textarea
                    rounded="0"
                    bg="white"
                    ml="4"
                    border="1px solid black"
                  ></Textarea>
                </Flex>
                <Button
                  mt="5"
                  py="8"
                  fontSize="18"
                  fontWeight="bold"
                  w="100%"
                  colorScheme="green"
                  //onClick={() => CloseOption()}
                >
                  Gravar
                </Button>
              </>
            )}
          </>
          <>
            {option.name === "Bioquímica sérica" && (
              <>
                <Table colorScheme="blackAlpha" w="100%">
                  <Thead>
                    <Tr fontWeight="bold" fontSize="19">
                      <Td borderColor="black" color="white" bg="blue.500">
                        Bioquímica sérica
                      </Td>
                      <Td
                        borderColor="black"
                        border="1px solid black"
                        textAlign="center"
                      >
                        Resultados
                      </Td>
                      <Td
                        borderColor="black"
                        border="1px solid black"
                        textAlign="center"
                      >
                        Unidades
                      </Td>
                      <Td
                        borderColor="black"
                        border="1px solid black"
                        textAlign="center"
                      >
                        @Val. Ref. - Canina
                      </Td>
                      <Td
                        borderColor="black"
                        border="1px solid black"
                        textAlign="center"
                      >
                        @Val. Ref. - Felina
                      </Td>
                    </Tr>
                  </Thead>
                  <Tbody>
                    <Td border="1px solid black">
                      <Flex
                        direction="column"
                        fontWeight="bold"
                        justifyContent="center"
                        gap="10"
                      >
                        <Text textAlign="center">Caracteristicas</Text>
                        <Text textAlign="center">Glicemia</Text>
                        <Text textAlign="center">Horário de realizção</Text>
                      </Flex>
                    </Td>

                    <Td border="1px solid black">
                      <Flex>
                        <Flex direction="column" gap="5">
                          <Text fontWeight="bold" mt="3" textAlign="center">
                            Absoluto
                          </Text>
                          <Input maxWidth="120px" name="ex" mt="4" />
                          <Input maxWidth="120px" name="ex" />
                        </Flex>
                        <Flex direction="column" gap="5">
                          <Text fontWeight="bold" mt="3" textAlign="center">
                            Relativo
                          </Text>
                          <Td></Td>
                          <Td></Td>
                        </Flex>
                      </Flex>
                    </Td>
                    <Td border="1px solid black">
                      <Flex direction="row">
                        <Flex direction="column" fontWeight="bold" gap="5">
                          <Text w="116px" mt="3" textAlign="center">
                            Un. Abs
                          </Text>
                          <Input maxWidth="120px" name="ex" mt="4" />
                          <Input maxWidth="120px" name="ex" />
                        </Flex>
                        <Flex direction="column" gap="10" pl="2">
                          <Text mt="3" fontWeight="bold" textAlign="center">
                            Un. Relativa
                          </Text>
                          <Text>milhões/mm3</Text>
                          <Text>g/dl</Text>
                        </Flex>
                      </Flex>
                    </Td>
                    <Td border="1px solid black">
                      <Flex direction="row">
                        <Flex direction="column" gap="5">
                          <Text fontWeight="bold" mt="3" textAlign="center">
                            Absoluto
                          </Text>
                          <Input maxWidth="120px" name="ex" mt="4" />
                          <Input maxWidth="120px" name="ex" />
                        </Flex>
                        <Flex direction="column" ml="5">
                          <Text fontWeight="bold" mt="3" textAlign="center">
                            Relativo
                          </Text>
                          <Td></Td>
                          <Td></Td>
                        </Flex>
                      </Flex>
                    </Td>
                    <Td border="1px solid black">
                      <Flex direction="row">
                        <Flex direction="column" gap="5">
                          <Text fontWeight="bold" mt="2" textAlign="center">
                            Absoluto
                          </Text>
                          <Input maxWidth="120px" name="ex" mt="2" />
                          <Input maxWidth="120px" name="ex" />
                        </Flex>
                        <Flex direction="column" gap="5" ml="4">
                          <Text fontWeight="bold" mt="2" textAlign="center">
                            Relativo
                          </Text>
                          <Td></Td>
                          <Td></Td>
                        </Flex>
                      </Flex>
                    </Td>
                  </Tbody>
                </Table>
                <Flex>
                  <Text pl="6" fontWeight="bold" w="19.4%" textAlign="center">
                    Observações
                  </Text>
                  <Textarea
                    rounded="0"
                    bg="white"
                    ml="4"
                    border="1px solid black"
                  ></Textarea>
                </Flex>
                <Button
                  mt="5"
                  py="8"
                  fontSize="18"
                  fontWeight="bold"
                  w="100%"
                  colorScheme="green"
                  //onClick={() => CloseOption()}
                >
                  Gravar
                </Button>
              </>
            )}
          </>
        </>
      ))}
    </>
  );
}
