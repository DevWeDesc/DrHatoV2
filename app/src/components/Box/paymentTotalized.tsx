import { Flex, TableContainer, Table, Thead, Tr, Th, Tbody, Td, Text } from "@chakra-ui/react";
export function PaymentTotalized() {
    return (
        <Flex
        direction="column"
        w="100%"
        align="center"
        bg="gray.300"
        borderY="1px solid black"
      >
        <Text
          w="100%"
          fontSize="20"
          textAlign="center"
          fontWeight="bold"
          pl="5"
          py="3"
          bg="gray.700"
          color="white"
        >
          Totalização por tipo de pagamento
        </Text>
        <TableContainer w="100%">
          <Table variant="striped" colorScheme="teal">
            <Thead>
              <Tr>
                <Th fontSize="18" border="1px solid black">
                  Tipo
                </Th>
                <Th
                  isNumeric
                  fontSize="18"
                  border="1px solid black"
                >
                  Valor
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td
                  style={{ border: "1px solid black" }}
                  border="1px solid black"
                  fontWeight="bold"
                >
                  Dinheiro
                </Td>

                <Td
                  isNumeric
                  style={{ border: "1px solid black" }}
                  border="1px solid black"
                  fontWeight="bold"
                >
                  25.4
                </Td>
              </Tr>
              <Tr>
                <Td
                  style={{ border: "1px solid black" }}
                  border="1px solid black"
                  fontWeight="bold"
                >
                  Master Card 1X
                </Td>

                <Td
                  isNumeric
                  style={{ border: "1px solid black" }}
                  border="1px solid black"
                  fontWeight="bold"
                >
                  30.48
                </Td>
              </Tr>
              <Tr>
                <Td
                  style={{ border: "1px solid black" }}
                  border="1px solid black"
                  fontWeight="bold"
                >
                  Aura 3X
                </Td>
                <Td
                  isNumeric
                  style={{ border: "1px solid black" }}
                  border="1px solid black"
                  fontWeight="bold"
                >
                  0.91444
                </Td>
              </Tr>
              <Tr>
                <Td
                  style={{ border: "1px solid black" }}
                  border="1px solid black"
                  fontWeight="bold"
                >
                  Visa electron Débito
                </Td>
                <Td
                  isNumeric
                  style={{ border: "1px solid black" }}
                  border="1px solid black"
                  fontWeight="bold"
                >
                  0.91444
                </Td>
              </Tr>
              <Tr>
                <Td
                  style={{ border: "1px solid black" }}
                  border="1px solid black"
                  fontWeight="bold"
                >
                  Master Card Débito
                </Td>
                <Td
                  isNumeric
                  style={{ border: "1px solid black" }}
                  border="1px solid black"
                  fontWeight="bold"
                >
                  0.91444
                </Td>
              </Tr>
              <Tr>
                <Td
                  style={{ border: "1px solid black" }}
                  border="1px solid black"
                  fontWeight="bold"
                >
                  Depósito Bancário
                </Td>
                <Td
                  isNumeric
                  style={{ border: "1px solid black" }}
                  border="1px solid black"
                  fontWeight="bold"
                >
                  0.91444
                </Td>
              </Tr>
              <Tr>
                <Td
                  style={{ border: "1px solid black" }}
                  border="1px solid black"
                  fontWeight="bold"
                >
                  PetLove
                </Td>
                <Td
                  isNumeric
                  style={{ border: "1px solid black" }}
                  border="1px solid black"
                  fontWeight="bold"
                >
                  0.91444
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      </Flex>
    )
}