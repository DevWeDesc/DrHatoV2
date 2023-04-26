import {
    Flex,
    Table,
    Tbody,
    Th,
    Tr,
    Td,
    Thead,
    Button,
} from "@chakra-ui/react";
import {
    RxThickArrowLeft, RxThickArrowRight
} from "react-icons/all";
  

export function PlantVetTable() {
    return (
        <Table colorScheme="facebook">
        <Flex
          direction="column"
          bg="green.200"
          textAlign="center"
          align="center"
        >
          <Thead>
            <Tr>
              <Button bg="transparent">
                {" "}
                <RxThickArrowLeft size={24} />
              </Button>

              <Th>Plantonistas de 04/04/2023</Th>
              <Button bg="transparent">
                <RxThickArrowRight size={24} />
              </Button>
            </Tr>
            <Flex align="center" justify="center" gap="8">
              <Tr>Vetérinarios</Tr>
              <Tr>Entrada</Tr>

              <Tr>Saída</Tr>
            </Flex>
          </Thead>
          <Tbody>
            <Tr>
              <Flex direction="row" bg="green.100" minWidth={290}>
                <Td px="6">Mariana</Td>
                <Td>18:00</Td>
                <Td>23:00</Td>
              </Flex>
            </Tr>
          </Tbody>
        </Flex>
      </Table>
    )
}