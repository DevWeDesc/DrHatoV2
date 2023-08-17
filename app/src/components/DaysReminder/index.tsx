import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";

export default function DaysReminder() {
  return (
    <TableContainer w="100%">
      <Table variant="simple" w="100%">
        <Thead>
          <Tr>
            <Th fontSize="25px" textAlign="center">
              17
            </Th>
            <Th fontSize="25px" textAlign="center">
              18
            </Th>
            <Th fontSize="25px" textAlign="center">
              19
            </Th>
            <Th fontSize="25px" textAlign="center">
              20
            </Th>
            <Th fontSize="25px" textAlign="center">
              21
            </Th>
            <Th fontSize="25px" textAlign="center">
              22
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td w="100px" bg="orange" rounded="50px" fontWeight="bold">
              Vinicius: Data 15/08/2023: Retorno consulta especial
            </Td>
          </Tr>
          <Tr>
            <Td w="100px" bg="blue.300" rounded="50px" fontWeight="bold">
              Vinicius: Data 15/08/2023: Retorno consulta especial
            </Td>
          </Tr>
          <Tr>
            <Td w="100px" bg="yellow" rounded="50px" fontWeight="bold">
              Vinicius: Data 15/08/2023: Retorno consulta especial
            </Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  );
}
