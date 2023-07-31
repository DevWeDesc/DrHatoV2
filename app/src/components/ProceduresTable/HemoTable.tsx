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
  TableContainer,
  TableCaption,
  Tfoot,
  Th,
} from "@chakra-ui/react";
import { Input } from "../admin/Input";
import { TableBioquimicaSerica } from "../TablesLab/BioquimicaSerica";
import { TableBioquimicoCompleto } from "../TablesLab/BioquimicoCompleto";
import { TableHemogramaCaninoAdulto } from "../TablesLab/HemogramaCaninoAdulto";
import { TableHemogramaFelino } from "../TablesLab/HemogramaFelino";

type Props = {
  Option: any;
  CloseOption: any;
};

export function HemoTable({ Option, CloseOption }: Props): any {
  return (
    <>
      {Option.map((option: any) => (
        <>
          {option.name == "Bioquimico Completo" && (
            <>
              <TableBioquimicoCompleto />
            </>
          )}
          <>
            {option.name === "Hemograma Felino" && (
              <>
                <TableHemogramaFelino />
              </>
            )}
          </>
          <>
            {option.name === "Hemo + Eritograma" && (
              <TableHemogramaCaninoAdulto />
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
            {option.name === "Bioquímica sérica" && <TableBioquimicaSerica />}
          </>
          <>
            {option.name === "Bioquímica sérica2" && (
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
