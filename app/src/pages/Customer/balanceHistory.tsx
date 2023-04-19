import {
  ChakraProvider,
  Flex,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box
} from '@chakra-ui/react'

export function BalanceHistory() {
  return (
    <ChakraProvider>
      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6" justify="center"
        direction="column"
      >
        <Text>Hello word</Text>

        <Flex  justify="center" align="center">
        <Box textAlign="center" p="8" bg="gray.100" borderRadius={8}>
        <Table border="2px" m={2}  colorScheme="blackAlpha">
            <Thead>
              <Tr >
              <th>Titulo</th>
              <th>Valor</th>
              <th>Categoria</th>
              <th>Data</th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <td>AA</td>
              </Tr>
            </Tbody>
          </Table>
        </Box>
      
        </Flex>
      </Flex>
    </ChakraProvider>
  )
}
