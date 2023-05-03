import {
  Flex,
  Table,
  Tbody,
  Th,
  Tr,
  Td,
  Thead,
  Button,
  Text,
  Box
} from "@chakra-ui/react";
import { RxThickArrowLeft, RxThickArrowRight } from "react-icons/all";

export function PlantVetTable() {
  return (
    <Box width="500px">
        <Flex gap="4" align="center"  justify="center" mb="4">
        <Button colorScheme="teal">
          <RxThickArrowLeft size={24} />
        </Button>

        <Text>Plantonistas de 04/04/2023</Text>
        <Button colorScheme="teal">
          <RxThickArrowRight size={24} />
        </Button>
      </Flex>

      <Table colorScheme="blackAlpha">
        <Thead border="1px">
          <Tr >
            <Th border="1px">Vetérinarios</Th>
            <Th border="1px">Entrada</Th>

            <Th border="1px">Saída</Th>
          </Tr>
        </Thead>
        <Tbody >
          <Tr border="1px">
            <Td border="1px">Rodrigo</Td>
            <Td border="1px">18:00</Td>
            <Td border="1px">23:00</Td>
          </Tr>
          <Tr border="1px">
            <Td border="1px">Mariana</Td>
            <Td border="1px">18:00</Td>
            <Td border="1px">23:00</Td>
          </Tr>

          <Tr border="1px">
            <Td border="1px">Diego</Td>
            <Td border="1px">18:00</Td>
            <Td border="1px">23:00</Td>
          </Tr>
        </Tbody>
      </Table>
    </Box>
  );
}
