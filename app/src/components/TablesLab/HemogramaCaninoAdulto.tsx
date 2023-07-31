import {
  Table,
  Thead,
  Tbody,
  Tr,
  Td,
  TableContainer,
  Th,
  Textarea,
} from "@chakra-ui/react";

export function TableHemogramaCaninoAdulto() {
  return (
    <>
      <TableContainer>
        <Table>
          <Thead>
            <Tr>
              <Th
                fontSize="15"
                border="1px solid black"
                bg="blue.400"
                color="white"
              >
                Eritrograma
              </Th>
              <Th fontSize="15" colSpan={2} border="1px solid black">
                Resultados
              </Th>
              <Th fontSize="15" colSpan={2} border="1px solid black">
                Unidades
              </Th>
              <Th fontSize="15" colSpan={2} border="1px solid black">
                Até 6 meses
              </Th>
              <Th fontSize="15" colSpan={2} border="1px solid black">
                Acima de 7 meses
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr fontWeight="bold">
              <Td border="1px solid black">Característica</Td>
              <Td border="1px solid black">Absoluto</Td>
              <Td border="1px solid black">Relativo</Td>
              <Td border="1px solid black">Un. Abs.</Td>
              <Td border="1px solid black">Un. Rel.</Td>
              <Td border="1px solid black">Absoluto</Td>
              <Td border="1px solid black">Relativo</Td>
              <Td border="1px solid black">Absoluto</Td>
              <Td border="1px solid black">Relativo</Td>
            </Tr>
            <Tr fontWeight="bold">
              <Td border="1px solid black">Hemácias</Td>
              <Td border="1px solid black" bg="white">
                7,09
              </Td>
              <Td border="1px solid black" bg="white"></Td>
              <Td border="1px solid black" bg="white"></Td>
              <Td border="1px solid black" bg="white">
                milhões/mm3
              </Td>
              <Td border="1px solid black" bg="white">
                5,5 a 8,0
              </Td>
              <Td border="1px solid black" bg="white"></Td>
              <Td border="1px solid black" bg="white">
                5,7 a 7,4
              </Td>
              <Td border="1px solid black" bg="white"></Td>
            </Tr>
            <Tr fontWeight="bold">
              <Td border="1px solid black">Hemoglobina</Td>
              <Td border="1px solid black" bg="white">
                17,5
              </Td>
              <Td border="1px solid black" bg="white"></Td>
              <Td border="1px solid black" bg="white"></Td>
              <Td border="1px solid black" bg="white">
                g/dl
              </Td>
              <Td border="1px solid black" bg="white">
                12 a 18
              </Td>
              <Td border="1px solid black" bg="white"></Td>
              <Td border="1px solid black" bg="white">
                14 a 19
              </Td>
              <Td border="1px solid black" bg="white"></Td>
            </Tr>
            <Tr fontWeight="bold">
              <Td border="1px solid black">Hematócrito</Td>
              <Td border="1px solid black" bg="white">
                52,0
              </Td>
              <Td border="1px solid black" bg="white"></Td>
              <Td border="1px solid black" bg="white"></Td>
              <Td border="1px solid black" bg="white">
                %
              </Td>
              <Td border="1px solid black" bg="white">
                37 a 55
              </Td>
              <Td border="1px solid black" bg="white"></Td>
              <Td border="1px solid black" bg="white">
                38 a 47
              </Td>
              <Td border="1px solid black" bg="white"></Td>
            </Tr>
            <Tr fontWeight="bold">
              <Td border="1px solid black">V.C.M.</Td>
              <Td border="1px solid black" bg="white">
                73,3
              </Td>
              <Td border="1px solid black" bg="white"></Td>
              <Td border="1px solid black" bg="white"></Td>
              <Td border="1px solid black" bg="white">
                u3
              </Td>
              <Td border="1px solid black" bg="white">
                60 a 77
              </Td>
              <Td border="1px solid black" bg="white"></Td>
              <Td border="1px solid black" bg="white">
                63 a 77
              </Td>
              <Td border="1px solid black" bg="white"></Td>
            </Tr>
            <Tr fontWeight="bold">
              <Td border="1px solid black">H.C.M.</Td>
              <Td border="1px solid black" bg="white">
                24,7
              </Td>
              <Td border="1px solid black" bg="white"></Td>
              <Td border="1px solid black" bg="white"></Td>
              <Td border="1px solid black" bg="white">
                Uug
              </Td>
              <Td border="1px solid black" bg="white">
                19,5 a 24,5
              </Td>
              <Td border="1px solid black" bg="white"></Td>
              <Td border="1px solid black" bg="white">
                21 a 26
              </Td>
              <Td border="1px solid black" bg="white"></Td>
            </Tr>
            <Tr fontWeight="bold">
              <Td border="1px solid black">C.H.C.M.</Td>
              <Td border="1px solid black" bg="white">
                33,7
              </Td>
              <Td border="1px solid black" bg="white"></Td>
              <Td border="1px solid black" bg="white"></Td>
              <Td border="1px solid black" bg="white">
                %
              </Td>
              <Td border="1px solid black" bg="white">
                30 a 36
              </Td>
              <Td border="1px solid black" bg="white"></Td>
              <Td border="1px solid black" bg="white">
                31 a 35
              </Td>
              <Td border="1px solid black" bg="white"></Td>
            </Tr>
            <Tr fontWeight="bold">
              <Td border="1px solid black">Proteínas totais</Td>
              <Td border="1px solid black" bg="white">
                8,0
              </Td>
              <Td border="1px solid black" bg="white"></Td>
              <Td border="1px solid black" bg="white"></Td>
              <Td border="1px solid black" bg="white">
                g/dl
              </Td>
              <Td border="1px solid black" bg="white">
                5,5 a 8,0
              </Td>
              <Td border="1px solid black" bg="white"></Td>
              <Td border="1px solid black" bg="white">
                6,0 a 8,0
              </Td>
              <Td border="1px solid black" bg="white"></Td>
            </Tr>
            <Tr fontWeight="bold">
              <Td border="1px solid black">Eritroblastos</Td>
              <Td border="1px solid black" bg="white">
                0
              </Td>
              <Td border="1px solid black" bg="white"></Td>
              <Td border="1px solid black" bg="white"></Td>
              <Td border="1px solid black" bg="white">
                /100 leucócitos
              </Td>
              <Td border="1px solid black" bg="white">
                Até 1%
              </Td>
              <Td border="1px solid black" bg="white"></Td>
              <Td border="1px solid black" bg="white">
                Até 1%
              </Td>
              <Td border="1px solid black" bg="white"></Td>
            </Tr>
            <Tr fontWeight="bold">
              <Td border="1px solid black" borderRight="0">
                Observações
              </Td>
              <Td colSpan={8} p="0">
                <Textarea
                  bg="white"
                  rounded="0"
                  borderColor="black"
                  value="Discreta anisocitose. 
Discreta hemólise no plasma."
                />
              </Td>
            </Tr>
          </Tbody>
        </Table>
        <Table>
          <Thead>
            <Tr>
              <Th
                fontSize="15"
                border="1px solid black"
                bg="blue.400"
                color="white"
              >
                Leucograma
              </Th>
              <Th fontSize="15" colSpan={2} border="1px solid black">
                Resultados
              </Th>
              <Th fontSize="15" colSpan={2} border="1px solid black">
                Unidades
              </Th>
              <Th fontSize="15" colSpan={2} border="1px solid black">
                Até 6 meses
              </Th>
              <Th fontSize="15" colSpan={2} border="1px solid black">
                Acima de 7 meses
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr fontWeight="bold">
              <Td border="1px solid black">Característica</Td>
              <Td border="1px solid black">Absoluto</Td>
              <Td border="1px solid black">Relativo</Td>
              <Td border="1px solid black">Un. Abs.</Td>
              <Td border="1px solid black">Un. Rel.</Td>
              <Td border="1px solid black">Absoluto</Td>
              <Td border="1px solid black">Relativo</Td>
              <Td border="1px solid black">Absoluto</Td>
              <Td border="1px solid black">Relativo</Td>
            </Tr>
            <Tr fontWeight="bold">
              <Td border="1px solid black">Leucócitos Totais</Td>
              <Td border="1px solid black" bg="white">
                20000
              </Td>
              <Td border="1px solid black" bg="white">
                100
              </Td>
              <Td border="1px solid black" bg="white"></Td>
              <Td border="1px solid black" bg="white">
                %
              </Td>
              <Td border="1px solid black" bg="white">
                6.000 a 17.000
              </Td>
              <Td border="1px solid black" bg="white"></Td>
              <Td border="1px solid black" bg="white">
                6.000 a 16.000
              </Td>
              <Td border="1px solid black" bg="white"></Td>
            </Tr>
            <Tr fontWeight="bold">
              <Td border="1px solid black">Metamielócitos</Td>
              <Td border="1px solid black" bg="white">
                0
              </Td>
              <Td border="1px solid black" bg="white">
                0
              </Td>
              <Td border="1px solid black" bg="white"></Td>
              <Td border="1px solid black" bg="white">
                %
              </Td>
              <Td border="1px solid black" bg="white">
                0
              </Td>
              <Td border="1px solid black" bg="white">
                0
              </Td>
              <Td border="1px solid black" bg="white">
                0
              </Td>
              <Td border="1px solid black" bg="white">
                0
              </Td>
            </Tr>
            <Tr fontWeight="bold">
              <Td border="1px solid black">Bastonetes</Td>
              <Td border="1px solid black" bg="white">
                800
              </Td>
              <Td border="1px solid black" bg="white">
                4
              </Td>
              <Td border="1px solid black" bg="white"></Td>
              <Td border="1px solid black" bg="white">
                %
              </Td>
              <Td border="1px solid black" bg="white">
                0 a 510
              </Td>
              <Td border="1px solid black" bg="white">
                0 a 3
              </Td>
              <Td border="1px solid black" bg="white">
                0 a 160
              </Td>
              <Td border="1px solid black" bg="white">
                0 a 1
              </Td>
            </Tr>
            <Tr fontWeight="bold">
              <Td border="1px solid black">Segmentados</Td>
              <Td border="1px solid black" bg="white">
                17600
              </Td>
              <Td border="1px solid black" bg="white">
                88
              </Td>
              <Td border="1px solid black" bg="white"></Td>
              <Td border="1px solid black" bg="white">
                %
              </Td>
              <Td border="1px solid black" bg="white">
                3.600 a 13.090
              </Td>
              <Td border="1px solid black" bg="white">
                60 a 77
              </Td>
              <Td border="1px solid black" bg="white">
                3.300 a 12.800
              </Td>
              <Td border="1px solid black" bg="white">
                55 a 80
              </Td>
            </Tr>
            <Tr fontWeight="bold">
              <Td border="1px solid black">Eosinófilos</Td>
              <Td border="1px solid black" bg="white">
                172
              </Td>
              <Td border="1px solid black" bg="white">
                2
              </Td>
              <Td border="1px solid black" bg="white"></Td>
              <Td border="1px solid black" bg="white">
                %
              </Td>
              <Td border="1px solid black" bg="white">
                60 a 1.700
              </Td>
              <Td border="1px solid black" bg="white">
                1 a 10
              </Td>
              <Td border="1px solid black" bg="white">
                110 a 2.340
              </Td>
              <Td border="1px solid black" bg="white">
                2 a 12
              </Td>
            </Tr>
            <Tr fontWeight="bold">
              <Td border="1px solid black">Basófilos</Td>
              <Td border="1px solid black" bg="white">
                0
              </Td>
              <Td border="1px solid black" bg="white">
                0
              </Td>
              <Td border="1px solid black" bg="white"></Td>
              <Td border="1px solid black" bg="white">
                %
              </Td>
              <Td border="1px solid black" bg="white">
                0 a 170
              </Td>
              <Td border="1px solid black" bg="white">
                0 a 1
              </Td>
              <Td border="1px solid black" bg="white">
                0 a 195
              </Td>
              <Td border="1px solid black" bg="white">
                0 a 1
              </Td>
            </Tr>
            <Tr fontWeight="bold">
              <Td border="1px solid black">Linfócitos Tipicos</Td>
              <Td border="1px solid black" bg="white">
                516
              </Td>
              <Td border="1px solid black" bg="white">
                6
              </Td>
              <Td border="1px solid black" bg="white"></Td>
              <Td border="1px solid black" bg="white">
                %
              </Td>
              <Td border="1px solid black" bg="white">
                1.200 a 8.500{" "}
              </Td>
              <Td border="1px solid black" bg="white">
                20 a 50{" "}
              </Td>
              <Td border="1px solid black" bg="white">
                1.100 a 10.725
              </Td>
              <Td border="1px solid black" bg="white">
                20 a 55
              </Td>
            </Tr>
            <Tr fontWeight="bold">
              <Td border="1px solid black">Linfócitos Atípicos</Td>
              <Td border="1px solid black" bg="white">
                0
              </Td>
              <Td border="1px solid black" bg="white">
                0
              </Td>
              <Td border="1px solid black" bg="white"></Td>
              <Td border="1px solid black" bg="white">
                %
              </Td>
              <Td border="1px solid black" bg="white">
                0
              </Td>
              <Td border="1px solid black" bg="white">
                0
              </Td>
              <Td border="1px solid black" bg="white">
                0
              </Td>
              <Td border="1px solid black" bg="white">
                0
              </Td>
            </Tr>
            <Tr fontWeight="bold">
              <Td border="1px solid black">Monócitos</Td>
              <Td border="1px solid black" bg="white">
                258
              </Td>
              <Td border="1px solid black" bg="white">
                3
              </Td>
              <Td border="1px solid black" bg="white"></Td>
              <Td border="1px solid black" bg="white">
                %
              </Td>
              <Td border="1px solid black" bg="white">
                60 a 680
              </Td>
              <Td border="1px solid black" bg="white">
                1 a 4
              </Td>
              <Td border="1px solid black" bg="white">
                55 a 780
              </Td>
              <Td border="1px solid black" bg="white">
                1 a 4
              </Td>
            </Tr>
            <Tr fontWeight="bold">
              <Td border="1px solid black" borderRight="0">
                Observações
              </Td>
              <Td colSpan={8} p="0">
                <Textarea
                  bg="white"
                  rounded="0"
                  borderColor="black"
                  h="7rem"
                  value="Diversos neutrófilos tóxicos. Presença de corpúsculo de Döhle.
Plaquetas: 665.000 (300.000 a 800.000/mm³). Presença de agregação plaquetária.
Pesquisa de hemoparasita: Negativa.
Nota: Amostra recebida 4/4 de sangue total."
                />
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
}
