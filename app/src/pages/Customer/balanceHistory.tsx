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
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { api } from '../../lib/axios';
export function BalanceHistory() {
  const [transactions, setTransactons] = useState({})


  const { id } = useParams<{ id: string }>();
  useEffect(() => {
     async function getTransactions() {
      await api.get(`transactions/${id}`);
    }
  }, [])



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
              <Th>Titulo</Th>
              <Th>Valor</Th>
              <Th>Categoria</Th>
              <Th>Data</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>AA</Td>
              </Tr>
            </Tbody>
          </Table>
        </Box>
      
        </Flex>
      </Flex>
    </ChakraProvider>
  )
}
