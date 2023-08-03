import {
  Flex,
  List,
  ListIcon,
  ListItem,
  Divider,
  Center,
  Text,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Box,
} from "@chakra-ui/react";

import { MdCheckCircle, FcCancel } from "react-icons/all";
import { useState } from "react";

const ArrayListMedicines = [
  {
    name: "Antibióticos",
  },
  {
    name: "Analgésicos",
  },
  {
    name: "Antimicóticos",
  },
  {
    name: "Comportamental",
  },
  {
    name: "Desinfetantes",
  },
  {
    name: "Insulina",
  },
  {
    name: "Coprofagia",
  },
  {
    name: "Dermatológicos",
  },
];

const ArrayMedicinesperType = [
  {
    name: "Medicamento antibioticos",
    type: "Antibióticos",
  },
  {
    name: "Medicamento Analgésicos",
    type: "Analgésicos",
  },
  {
    name: "Medicamento Antimicóticos",
    type: "Antimicóticos",
  },
  {
    name: "Medicamento Comportamental",
    type: "Comportamental",
  },
  {
    name: "Medicamento Desinfetantes",
    type: "Desinfetantes",
  },
  {
    name: "Medicamento Insulina",
    type: "Insulina",
  },
  {
    name: "Medicamento antibioticos",
    type: "Antibióticos",
  },
  {
    name: "Medicamento antibioticos",
    type: "Antibióticos",
  },
];

export default function ListMedicines() {
  const [typeMedicines, setTypeMedicines] = useState<String | null>(null);

  return (
    <Box w="90%" bg="gray.200" p="8" rounded="lg">
      <TableContainer w="100%" display="flex">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th fontSize="20">Tipos de Medicamentos</Th>
            </Tr>
          </Thead>
          <Tbody>
            {ArrayListMedicines.map((medicine) => (
              <Tr
                cursor="pointer"
                transition="0.5s"
                _hover={{ backgroundColor: "gray.50" }}
                onClick={() => setTypeMedicines(medicine.name)}
              >
                <Td>{medicine.name}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        {!!typeMedicines && (
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th fontSize="20">Medicamentos</Th>
              </Tr>
            </Thead>
            <Tbody>
              {!!typeMedicines &&
                ArrayMedicinesperType.map((medicine) => (
                  <>
                    {medicine.type === typeMedicines && (
                      <Tr
                        cursor="pointer"
                        transition="0.5s"
                        _hover={{ backgroundColor: "gray.50" }}
                      >
                        <Td>{medicine.name}</Td>
                      </Tr>
                    )}
                  </>
                ))}
            </Tbody>
          </Table>
        )}
      </TableContainer>
    </Box>
  );
}
