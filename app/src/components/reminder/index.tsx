import React from "react";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
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
import { Text } from "@chakra-ui/react";

export const Reminder = () => {
  return (
    <Alert
      cursor="pointer"
      status="warning"
      variant="subtle"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      w="400px"
    >
      <AlertIcon boxSize="40px" mr={0} />
      <AlertTitle mt={4} mb={1} fontSize="lg">
        Lembrete de Tarefa XYZ
      </AlertTitle>
      <AlertDescription maxWidth="lg">
        <Text my="2" fontWeight="bold">
          {" "}
          Para entrar na consulta, basta clicar <br /> no nome do cliente!!
        </Text>
        <TableContainer w="100%">
          <Table>
            <Thead>
              <Tr>
                <Th>Cliente</Th>
                <Th>Data</Th>
                <Th>Retorno</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>Vinicius</Td>
                <Td>15/08/2023</Td>
                <Td>Consulta Especial</Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      </AlertDescription>
    </Alert>
  );
};
