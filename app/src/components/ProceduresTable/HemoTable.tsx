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
  Option: string | null;
  CloseOption: any;
};

export function HemoTable({ Option, CloseOption }: Props): any {
  if (Option != null)
    return (
      <>
        {Option === "Hemograma" && (
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
            <Button w="100%" colorScheme="blue" onClick={() => CloseOption()}>
              Ocultar Tabela
            </Button>
          </Table>
        )}
        {Option === "Eritograma" && (
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
            <Button w="100%" colorScheme="blue" onClick={() => CloseOption()}>
              Ocultar Tabela
            </Button>
          </Table>
        )}
        {Option === "Hemo + Eritograma" && (
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
            <Button w="100%" colorScheme="blue" onClick={() => CloseOption()}>
              Ocultar Tabela
            </Button>
          </Table>
        )}
        {Option === "Bioquímica sérica" && (
          <>
            <Table colorScheme="blackAlpha" w="100%">
              <Thead>
                <Tr fontWeight="bold" fontSize="19">
                  <Td borderColor="black" color="white" bg="blue.500">
                    Bioquímica sérica
                  </Td>
                  <Td borderColor="black">Resultados</Td>
                  <Td borderColor="black">Unidades</Td>
                  <Td borderColor="black">@Val. Ref. - Canina</Td>
                  <Td borderColor="black">@Val. Ref. - Felina</Td>
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
                    <Text>Glicemia</Text>
                    <Text>Horário de realizção</Text>
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
                    </Flex>
                    <Flex direction="column" gap="5">
                      <Text fontWeight="bold" mt="3">
                        Relativo
                      </Text>
                      <Td></Td>
                      <Td></Td>
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
                    </Flex>
                    <Flex direction="column" gap="10" pl="2">
                      <Text mt="3" fontWeight="bold">
                        Un. Relativa
                      </Text>
                      <Text>milhões/mm3</Text>
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
                    </Flex>
                    <Flex direction="column" ml="5">
                      <Text fontWeight="bold" mt="3">
                        Relativo
                      </Text>
                      <Td></Td>
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
                    </Flex>
                    <Flex direction="column" gap="5" ml="4">
                      <Text fontWeight="bold" mt="2">
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
              <Text pl="6" fontWeight="bold" w="22%">
                Observações
              </Text>
              <Textarea bg="white" ml="4" border="1px solid black"></Textarea>
            </Flex>
            <Button
              mt="5"
              py="8"
              fontSize="18"
              fontWeight="bold"
              w="100%"
              colorScheme="yellow"
              onClick={() => CloseOption()}
            >
              Ocultar Tabela
            </Button>
          </>
        )}
      </>
    );
}
