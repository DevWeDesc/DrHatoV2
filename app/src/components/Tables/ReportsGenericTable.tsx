import {
  TableContainer,
  Thead,
  Tr,
  Tbody,
  ChakraProvider,
  Table,
  Th,
  Td,
} from "@chakra-ui/react";
import { ReportsVetData } from "../../mocks/ReportsVetData";
import { ReportFinanceData } from "../../mocks/ReportsFinance";
import { ReportsExamsData } from "../../mocks/ReportsExams";

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
                {ReportsVetData.map((report, index) => (
                  <Tr key={index}>
                    <Td>{report.Data}</Td>
                    <Td>{report.Hora}</Td>
                    <Td>{report.Quantidade}</Td>
                    <Td>{report.Nome_proprietário}</Td>
                    <Td>{report.Email}</Td>
                    <Td>{report.Telefone}</Td>
                    <Td>{report.Telefone2}</Td>
                    <Td>{report.Procedimento}</Td>
                    <Td>{report.Setor}</Td>
                    <Td>{report.Pet}</Td>
                    <Td>{report.Especie}</Td>
                    <Td>{report.Valor}</Td>
                    <Td>{report.Veterinário}</Td>
                  </Tr>
                ))}
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
                {ReportsExamsData.map((report, index) => (
                  <Tr key={index}>
                    <Td>{report.Data}</Td>
                    <Td>{report.Quantidade}</Td>
                    <Td>{report.NomeProprietario}</Td>
                    <Td>{report.Email}</Td>
                    <Td>{report.Telefone}</Td>
                    <Td>{report.Telefone2}</Td>
                    <Td>{report.Procedimento}</Td>
                    <Td>{report.Pet}</Td>
                    <Td>{report.Especie}</Td>
                    <Td>{report.Valor}</Td>
                    <Td>{report.Veterinario}</Td>
                    <Td>{report.Setor}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        );
        break;
      case tableType == "FinanceSector":
        TableContent = (
          <TableContainer>
            {ReportFinanceData.Ambulatorio && (
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
                  {ReportFinanceData.Ambulatorio.map((report, index) => (
                    <Tr key={index}>
                      <Th>{report.Procedimento}</Th>
                      <Th>{report["Qtd Amb"]}</Th>
                      <Th>{report["Qtd Int"]}</Th>
                      <Th>{report["Fat Amb"]}</Th>
                      <Th>{report["Fat Int"]}</Th>
                      <Th>{report["Qtd Total"]}</Th>
                      <Th>{report["Fat Total"]}</Th>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            )}
            {ReportFinanceData.Anestesia && (
              <Table mt={10} variant="striped" colorScheme="gray">
                <Thead bg="gray.200">
                  <Tr>
                    <Th colSpan={7} textColor="black" fontWeight="bold">
                      Anestesia
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
                  {ReportFinanceData.Anestesia.map((report, index) => (
                    <Tr key={index}>
                      <Th>{report.Procedimento}</Th>
                      <Th>{report["Qtd Amb"]}</Th>
                      <Th>{report["Qtd Int"]}</Th>
                      <Th>{report["Fat Amb"]}</Th>
                      <Th>{report["Fat Int"]}</Th>
                      <Th>{report["Qtd Total"]}</Th>
                      <Th>{report["Fat Total"]}</Th>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            )}
            {ReportFinanceData.Cardiologia && (
              <Table mt={10} variant="striped" colorScheme="gray">
                <Thead bg="gray.200">
                  <Tr>
                    <Th colSpan={7} textColor="black" fontWeight="bold">
                      Cardiologia
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
                  {ReportFinanceData.Cardiologia.map((report, index) => (
                    <Tr key={index}>
                      <Th>{report.Procedimento}</Th>
                      <Th>{report["Qtd Amb"]}</Th>
                      <Th>{report["Qtd Int"]}</Th>
                      <Th>{report["Fat Amb"]}</Th>
                      <Th>{report["Fat Int"]}</Th>
                      <Th>{report["Qtd Total"]}</Th>
                      <Th>{report["Fat Total"]}</Th>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            )}
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
