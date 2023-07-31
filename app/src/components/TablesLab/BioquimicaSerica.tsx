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

export function TableBioquimicaSerica() {
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
                Bioquimica Serica
              </Th>
              <Th fontSize="15" colSpan={2} border="1px solid black">
                Resultados
              </Th>
              <Th fontSize="15" colSpan={2} border="1px solid black">
                Unidades
              </Th>
              <Th fontSize="15" colSpan={2} border="1px solid black">
                @Val. Ref. - Canina
              </Th>
              <Th fontSize="15" colSpan={2} border="1px solid black">
                @Val. Ref. - Felina
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
              <Td border="1px solid black">Ureia</Td>
              <Td border="1px solid black" bg="white">
                49
              </Td>
              <Td border="1px solid black" bg="white"></Td>
              <Td border="1px solid black" bg="white"></Td>
              <Td border="1px solid black" bg="white">
                mg/dl
              </Td>
              <Td border="1px solid black" bg="white">
                10 a 56
              </Td>
              <Td border="1px solid black" bg="white"></Td>
              <Td border="1px solid black" bg="white">
                10 a 65
              </Td>
              <Td border="1px solid black" bg="white"></Td>
            </Tr>
            <Tr fontWeight="bold">
              <Td border="1px solid black">Creatina</Td>
              <Td border="1px solid black" bg="white">
                0,84
              </Td>
              <Td border="1px solid black" bg="white"></Td>
              <Td border="1px solid black" bg="white"></Td>
              <Td border="1px solid black" bg="white">
                mg/dl
              </Td>
              <Td border="1px solid black" bg="white">
                0,5 a 1,4
              </Td>
              <Td border="1px solid black" bg="white"></Td>
              <Td border="1px solid black" bg="white">
                0,5 a 1,6
              </Td>
              <Td border="1px solid black" bg="white"></Td>
            </Tr>
            <Tr fontWeight="bold">
              <Td border="1px solid black">Fósforo</Td>
              <Td border="1px solid black" bg="white">
                5,95
              </Td>
              <Td border="1px solid black" bg="white"></Td>
              <Td border="1px solid black" bg="white"></Td>
              <Td border="1px solid black" bg="white">
                mg/dl
              </Td>
              <Td border="1px solid black" bg="white">
                2,6 a 6,2
              </Td>
              <Td border="1px solid black" bg="white"></Td>
              <Td border="1px solid black" bg="white">
                2,7 a 8,1
              </Td>
              <Td border="1px solid black" bg="white"></Td>
            </Tr>
            <Tr fontWeight="bold">
              <Td border="1px solid black">Calcio</Td>
              <Td border="1px solid black" bg="white">
                9,18
              </Td>
              <Td border="1px solid black" bg="white"></Td>
              <Td border="1px solid black" bg="white"></Td>
              <Td border="1px solid black" bg="white">
                mg/dl
              </Td>
              <Td border="1px solid black" bg="white">
                7,7 a 11,0
              </Td>
              <Td border="1px solid black" bg="white"></Td>
              <Td border="1px solid black" bg="white">
                7,4 a 10,5
              </Td>
              <Td border="1px solid black" bg="white"></Td>
            </Tr>
            <Tr fontWeight="bold">
              <Td border="1px solid black">Fosfatase Alcalina</Td>
              <Td border="1px solid black" bg="white">
                178
              </Td>
              <Td border="1px solid black" bg="white"></Td>
              <Td border="1px solid black" bg="white"></Td>
              <Td border="1px solid black" bg="white">
                U/l
              </Td>
              <Td border="1px solid black" bg="white">
                20 a 156
              </Td>
              <Td border="1px solid black" bg="white"></Td>
              <Td border="1px solid black" bg="white">
                10 a 96
              </Td>
              <Td border="1px solid black" bg="white"></Td>
            </Tr>
            <Tr fontWeight="bold">
              <Td border="1px solid black">ALT</Td>
              <Td border="1px solid black" bg="white">
                382
              </Td>
              <Td border="1px solid black" bg="white"></Td>
              <Td border="1px solid black" bg="white"></Td>
              <Td border="1px solid black" bg="white">
                U/l
              </Td>
              <Td border="1px solid black" bg="white">
                10 a 88
              </Td>
              <Td border="1px solid black" bg="white"></Td>
              <Td border="1px solid black" bg="white">
                10 a 88
              </Td>
              <Td border="1px solid black" bg="white"></Td>
            </Tr>
            <Tr fontWeight="bold">
              <Td border="1px solid black">AST</Td>
              <Td border="1px solid black" bg="white">
                301
              </Td>
              <Td border="1px solid black" bg="white"></Td>
              <Td border="1px solid black" bg="white"></Td>
              <Td border="1px solid black" bg="white">
                U/l
              </Td>
              <Td border="1px solid black" bg="white">
                10 a 88
              </Td>
              <Td border="1px solid black" bg="white"></Td>
              <Td border="1px solid black" bg="white">
                10 a 88
              </Td>
              <Td border="1px solid black" bg="white"></Td>
            </Tr>
            <Tr fontWeight="bold">
              <Td border="1px solid black">GGT</Td>
              <Td border="1px solid black" bg="white">
                9
              </Td>
              <Td border="1px solid black" bg="white"></Td>
              <Td border="1px solid black" bg="white"></Td>
              <Td border="1px solid black" bg="white">
                U/l
              </Td>
              <Td border="1px solid black" bg="white">
                1,2 a 6,4
              </Td>
              <Td border="1px solid black" bg="white"></Td>
              <Td border="1px solid black" bg="white">
                1,3 a 5,3
              </Td>
              <Td border="1px solid black" bg="white"></Td>
            </Tr>
            <Tr fontWeight="bold">
              <Td border="1px solid black">Proteinas Totais</Td>
              <Td border="1px solid black" bg="white">
                6,42
              </Td>
              <Td border="1px solid black" bg="white"></Td>
              <Td border="1px solid black" bg="white"></Td>
              <Td border="1px solid black" bg="white">
                g/dl
              </Td>
              <Td border="1px solid black" bg="white">
                5,2 a 8,2
              </Td>
              <Td border="1px solid black" bg="white"></Td>
              <Td border="1px solid black" bg="white">
                4,7 a 8,6
              </Td>
              <Td border="1px solid black" bg="white"></Td>
            </Tr>
            <Tr fontWeight="bold">
              <Td border="1px solid black">Albumina</Td>
              <Td border="1px solid black" bg="white">
                2,18
              </Td>
              <Td border="1px solid black" bg="white"></Td>
              <Td border="1px solid black" bg="white"></Td>
              <Td border="1px solid black" bg="white">
                g/dl
              </Td>
              <Td border="1px solid black" bg="white">
                2,6 a 3,8
              </Td>
              <Td border="1px solid black" bg="white"></Td>
              <Td border="1px solid black" bg="white">
                2,1 a 3,9
              </Td>
              <Td border="1px solid black" bg="white"></Td>
            </Tr>
            <Tr fontWeight="bold">
              <Td border="1px solid black">Globumina</Td>
              <Td border="1px solid black" bg="white">
                4,24
              </Td>
              <Td border="1px solid black" bg="white"></Td>
              <Td border="1px solid black" bg="white"></Td>
              <Td border="1px solid black" bg="white">
                g/dl
              </Td>
              <Td border="1px solid black" bg="white">
                2,6 a 4,4
              </Td>
              <Td border="1px solid black" bg="white"></Td>
              <Td border="1px solid black" bg="white">
                2,1 a 5,1
              </Td>
              <Td border="1px solid black" bg="white"></Td>
            </Tr>
            <Tr fontWeight="bold">
              <Td border="1px solid black">Relação Albumina:Globulina</Td>
              <Td border="1px solid black" bg="white">
                0,51
              </Td>
              <Td border="1px solid black" bg="white"></Td>
              <Td border="1px solid black" bg="white"></Td>
              <Td border="1px solid black" bg="white"></Td>
              <Td border="1px solid black" bg="white">
                0,5 a 1,3
              </Td>
              <Td border="1px solid black" bg="white"></Td>
              <Td border="1px solid black" bg="white">
                0,4 a 1,3
              </Td>
              <Td border="1px solid black" bg="white"></Td>
            </Tr>
            <Tr fontWeight="bold">
              <Td border="1px solid black">Amilase</Td>
              <Td border="1px solid black" bg="white">
                9.073
              </Td>
              <Td border="1px solid black" bg="white"></Td>
              <Td border="1px solid black" bg="white"></Td>
              <Td border="1px solid black" bg="white">
                U/l
              </Td>
              <Td border="1px solid black" bg="white">
                300 a 1.530
              </Td>
              <Td border="1px solid black" bg="white"></Td>
              <Td border="1px solid black" bg="white">
                500 a 1.500
              </Td>
              <Td border="1px solid black" bg="white"></Td>
            </Tr>
            <Tr fontWeight="bold">
              <Td border="1px solid black">Colesterol total</Td>
              <Td border="1px solid black" bg="white">
                291
              </Td>
              <Td border="1px solid black" bg="white"></Td>
              <Td border="1px solid black" bg="white"></Td>
              <Td border="1px solid black" bg="white">
                mg/dl
              </Td>
              <Td border="1px solid black" bg="white">
                100 a 270
              </Td>
              <Td border="1px solid black" bg="white"></Td>
              <Td border="1px solid black" bg="white">
                80 a 205
              </Td>
              <Td border="1px solid black" bg="white"></Td>
            </Tr>
            <Tr fontWeight="bold">
              <Td border="1px solid black">Triglicérides</Td>
              <Td border="1px solid black" bg="white">
                84
              </Td>
              <Td border="1px solid black" bg="white"></Td>
              <Td border="1px solid black" bg="white"></Td>
              <Td border="1px solid black" bg="white">
                mg/dl
              </Td>
              <Td border="1px solid black" bg="white">
                15 a 150
              </Td>
              <Td border="1px solid black" bg="white"></Td>
              <Td border="1px solid black" bg="white">
                10 a 128
              </Td>
              <Td border="1px solid black" bg="white"></Td>
            </Tr>
            <Tr fontWeight="bold">
              <Td border="1px solid black">Glicose</Td>
              <Td border="1px solid black" bg="white">
                195
              </Td>
              <Td border="1px solid black" bg="white"></Td>
              <Td border="1px solid black" bg="white"></Td>
              <Td border="1px solid black" bg="white">
                mg/dl
              </Td>
              <Td border="1px solid black" bg="white">
                60 a 120
              </Td>
              <Td border="1px solid black" bg="white"></Td>
              <Td border="1px solid black" bg="white">
                75 a 140
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
                  value=" Discreta hemólise no soro."
                />
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
}
