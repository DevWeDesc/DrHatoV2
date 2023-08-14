import { Flex, Heading, TableContainer,Table, Thead, Tr, Th, Tbody, Td } from "@chakra-ui/react";

export function ReceveidDocuments() {
    return (
        <>
         <Flex
            justify="space-between"
            direction="column"
            align="center"
          >
            <Heading
              bg="gray.700"
              color="white"
              size="lg"
              fontWeight="bold"
              w="100%"
              textAlign="center"
              py="5"
            >
              Documentos Recebidos
            </Heading>
          </Flex>
  
          <TableContainer>
            <Table variant="striped" colorScheme="teal">
              <Thead>
                <Tr>
                  <Th border="1px solid black" fontSize="17">
                    Tipo
                  </Th>
                  <Th border="1px solid black" fontSize="17">
                    Cliente
                  </Th>
                  <Th border="1px solid black" fontSize="17" isNumeric>
                    Valor
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td style={{ border: "1px solid black" }}>
                    Depósito Bancário
                  </Td>
                  <Td
                    style={{ border: "1px solid black" }}
                    border="1px solid black"
                    fontWeight="bold"
                  >
                    Dilan Lopez
                  </Td>
                  <Td
                    style={{ border: "1px solid black" }}
                    border="1px solid black"
                    isNumeric
                    fontWeight="bold"
                  >
                    60,00
                  </Td>
                </Tr>
                <Tr>
                  <Td style={{ border: "1px solid black" }}>
                    Dinheiro
                  </Td>
                  <Td
                    style={{ border: "1px solid black" }}
                    border="1px solid black"
                    fontWeight="bold"
                  >
                    Djalma Rodrigues dos Santos
                  </Td>
                  <Td
                    style={{ border: "1px solid black" }}
                    border="1px solid black"
                    isNumeric
                    fontWeight="bold"
                  >
                    327,00
                  </Td>
                </Tr>
                <Tr>
                  <Td style={{ border: "1px solid black" }}>
                    Master Card Débito
                  </Td>
                  <Td
                    style={{ border: "1px solid black" }}
                    border="1px solid black"
                    fontWeight="bold"
                  >
                    Leiliane Pereira Do Nascimento
                  </Td>
                  <Td
                    style={{ border: "1px solid black" }}
                    border="1px solid black"
                    isNumeric
                    fontWeight="bold"
                  >
                    60,00
                  </Td>
                </Tr>
                
              </Tbody>
            </Table>
          </TableContainer>
        </>
    )
}