import {
  TableContainer,
  Thead,
  Tr,
  Tbody,
  Td,
  ChakraProvider,
  Table,
  Th,
} from "@chakra-ui/react";

type ReportsVetTableType = {
  tableType: string;
};

export const ReportsGeneticTable = ({ tableType }: ReportsVetTableType) => {
  const TableTypes = () => {
    let TableContent: JSX.Element = <></>;
    switch (true) {
      case tableType == "Vets":
        TableContent = (
          <TableContainer>
            <Table variant="striped" colorScheme="gray">
              <Thead>
                <Tr>
                  <Th>Data</Th>
                  <Th>Hora</Th>
                  <Th>Quantidade</Th>
                  <Th>Nome do proprietário</Th>
                  <Th>E-mail</Th>
                  <Th>Telefone</Th>
                  <Th>Telefone2</Th>
                  <Th>Procedimento</Th>
                  <Th>Setor</Th>
                  <Th>Pet</Th>
                  <Th>Espécie</Th>
                  <Th>Valor</Th>
                  <Th>Veterinário</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>01/01/24</Td>
                  <Td>15:25:28</Td>
                  <Td>1</Td>
                  <Td>Luiz Fernando</Td>
                  <Td>lufegarda@terra.com.br</Td>
                  <Td>(11) 9143-6323</Td>
                  <Td>(11) 99143-6323</Td>
                  <Td>Aplicação SC 3 Medicações</Td>
                  <Td>Ambulatório</Td>
                  <Td>Thomas 35823</Td>
                  <Td>Felina</Td>
                  <Td>110,00</Td>
                  <Td>Renata Sguilaro</Td>
                </Tr>
                <Tr>
                  <Td>01/01/24</Td>
                  <Td>15:25:28</Td>
                  <Td>1</Td>
                  <Td>Luiz Fernando</Td>
                  <Td>lufegarda@terra.com.br</Td>
                  <Td>(11) 9143-6323</Td>
                  <Td>(11) 99143-6323</Td>
                  <Td>Aplicação SC 3 Medicações</Td>
                  <Td>Ambulatório</Td>
                  <Td>Thomas 35823</Td>
                  <Td>Felina</Td>
                  <Td>110,00</Td>
                  <Td>Renata Sguilaro</Td>
                </Tr>
                <Tr>
                  <Td>01/01/24</Td>
                  <Td>15:25:28</Td>
                  <Td>1</Td>
                  <Td>Luiz Fernando</Td>
                  <Td>lufegarda@terra.com.br</Td>
                  <Td>(11) 9143-6323</Td>
                  <Td>(11) 99143-6323</Td>
                  <Td>Aplicação SC 3 Medicações</Td>
                  <Td>Ambulatório</Td>
                  <Td>Thomas 35823</Td>
                  <Td>Felina</Td>
                  <Td>110,00</Td>
                  <Td>Renata Sguilaro</Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        );
        break;
      case tableType == "Exams":
        TableContent = (
          <TableContainer>
            <Table variant="striped" colorScheme="gray">
              <Thead>
                <Tr>
                  <Th>Data</Th>
                  <Th>Quantidade</Th>
                  <Th>Nome do proprietário</Th>
                  <Th>E-mail</Th>
                  <Th>Telefone</Th>
                  <Th>Telefone2</Th>
                  <Th>Procedimento</Th>
                  <Th>Pet</Th>
                  <Th>Espécie</Th>
                  <Th>Valor</Th>
                  <Th>Veterinário</Th>
                  <Th>Setor</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>01/01/24</Td>
                  <Td>15:25:28</Td>
                  <Td>1</Td>
                  <Td>Luiz Fernando</Td>
                  <Td>lufegarda@terra.com.br</Td>
                  <Td>(11) 9143-6323</Td>
                  <Td>(11) 99143-6323</Td>
                  <Td>Aplicação SC 3 Medicações</Td>
                  <Td>Ambulatório</Td>
                  <Td>Thomas 35823</Td>
                  <Td>Felina</Td>
                  <Td>110,00</Td>
                </Tr>
                <Tr>
                  <Td>01/01/24</Td>
                  <Td>15:25:28</Td>
                  <Td>1</Td>
                  <Td>Luiz Fernando</Td>
                  <Td>lufegarda@terra.com.br</Td>
                  <Td>(11) 9143-6323</Td>
                  <Td>(11) 99143-6323</Td>
                  <Td>Aplicação SC 3 Medicações</Td>
                  <Td>Ambulatório</Td>
                  <Td>Thomas 35823</Td>
                  <Td>Felina</Td>
                  <Td>110,00</Td>
                </Tr>
                <Tr>
                  <Td>01/01/24</Td>
                  <Td>15:25:28</Td>
                  <Td>1</Td>
                  <Td>Luiz Fernando</Td>
                  <Td>lufegarda@terra.com.br</Td>
                  <Td>(11) 9143-6323</Td>
                  <Td>(11) 99143-6323</Td>
                  <Td>Aplicação SC 3 Medicações</Td>
                  <Td>Ambulatório</Td>
                  <Td>Thomas 35823</Td>
                  <Td>Felina</Td>
                  <Td>110,00</Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        );
        break;
      case tableType == "FinanceSector":
        TableContent = (
          <TableContainer>
            <Table variant="striped" colorScheme="gray">
              <Thead bg="gray.200">
                <Tr>
                  <Th colSpan={7} textColor="black" fontWeight="bold">
                    Ambulatório
                  </Th>
                </Tr>
                <Tr>
                  <Th>Procedimento</Th>
                  <Th>Qtd Amb</Th>
                  <Th>Qtd Int</Th>
                  <Th>Fat Amb</Th>
                  <Th>Fat Int</Th>
                  <Th>Qtd Total</Th>
                  <Th>Fat Total</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Th>Consulta</Th>
                  <Th>433</Th>
                  <Th>2</Th>
                  <Th>57.217,40</Th>
                  <Th>208</Th>
                  <Th>435</Th>
                  <Th>57.425,49</Th>
                </Tr>
                <Tr>
                  <Th>Consulta Plantão (Após as 18hrs, Sábados e Feriados)</Th>
                  <Th>335</Th>
                  <Th>0</Th>
                  <Th>54.830,00</Th>
                  <Th>0</Th>
                  <Th>335</Th>
                  <Th>54.830,00</Th>
                </Tr>

                <Tr>
                  <Th>Aplicação SC (3 Medicações)</Th>
                  <Th>297</Th>
                  <Th>0</Th>
                  <Th>30.267,60</Th>
                  <Th>0</Th>
                  <Th>297</Th>
                  <Th>30.265,60</Th>
                </Tr>
                <Tr bg="gray.200">
                  <Th>Total</Th>
                  <Th fontSize={14}>4</Th>
                  <Th fontSize={14}>0</Th>
                  <Th fontSize={14}>760,00</Th>
                  <Th fontSize={14}>0,00</Th>
                  <Th fontSize={14}>4</Th>
                  <Th fontSize={14}>760,00</Th>
                </Tr>
              </Tbody>
            </Table>
            <Table mt={10} variant="striped" colorScheme="gray">
              <Thead bg="gray.200">
                <Tr>
                  <Th colSpan={7} textColor="black" fontWeight="bold">
                    Ambulatório
                  </Th>
                </Tr>
                <Tr>
                  <Th>Procedimento</Th>
                  <Th>Qtd Amb</Th>
                  <Th>Qtd Int</Th>
                  <Th>Fat Amb</Th>
                  <Th>Fat Int</Th>
                  <Th>Qtd Total</Th>
                  <Th>Fat Total</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Th>Consulta (Dias de semana)</Th>
                  <Th>86</Th>
                  <Th>0</Th>
                  <Th>18.060,00</Th>
                  <Th>0,00</Th>
                  <Th>86</Th>
                  <Th>18.060,00</Th>
                </Tr>
                <Tr>
                  <Th>Consulta (Dias de semana)</Th>
                  <Th>86</Th>
                  <Th>0</Th>
                  <Th>18.060,00</Th>
                  <Th>0,00</Th>
                  <Th>86</Th>
                  <Th>18.060,00</Th>
                </Tr>
                <Tr>
                  <Th>Consulta (Dias de semana)</Th>
                  <Th>86</Th>
                  <Th>0</Th>
                  <Th>18.060,00</Th>
                  <Th>0,00</Th>
                  <Th>86</Th>
                  <Th>18.060,00</Th>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        );
        break;
    }
    return TableContent;
  };

  return (
    <ChakraProvider>
      <TableContainer>
        <TableTypes />
      </TableContainer>
    </ChakraProvider>
  );
};
