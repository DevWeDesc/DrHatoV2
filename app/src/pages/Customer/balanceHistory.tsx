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
  Box,
  Button,

} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { api } from '../../lib/axios';


interface Customer {
  name: string;
  balance: number;
}
interface Transactions {
  id: number;
  title: string;
  amount: number;
  type: string;
  category: string;
  createdAt: string;
  customer: Customer
}
export function BalanceHistory() {
  const [transactions, setTransactons] = useState<Transactions[]>([])
  const [customer, setCustomer] = useState({} as Customer)

  const total = transactions.reduce((acc, transaction) => {
    if (transaction.type == 'deposit') {
      acc.balance += transaction.amount
    } else {
      acc.balance -= transaction.amount
    }
    return acc
  }, {balance: 0})

  const { id } = useParams<{ id: string }>();
  useEffect(() => {
     async function getTransactions() {
      const response = await api.get(`transactions/${id}`);
      const customerData = await api.get(`customers/${id}`);
      setTransactons(response.data)
      setCustomer(customerData.data)
    }
    getTransactions();
  }, [])


  console.log("TRANSACTIONS LOG",transactions)

  return (
    <ChakraProvider>
      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6" justify="center"
        direction="column"
      >

      <Link to={`/Recepcao/Consultas/Clientes/${id}`}><Button colorScheme="whatsapp">Voltar</Button></Link>

        <Flex align="center" justify="center" mb="4" direction="column"> 
        <Text>Histórico Cliente</Text>
        <Flex justifyContent="space-between" gap="4" align="center">
          <Text fontSize="18" fontWeight="semibold" 
            color="green.500"
          >{customer.name}</Text>
          <Text>Saldo Disponivel: {new Intl.NumberFormat('pt-BR',{
            style: 'currency',
            currency: 'BRL'
          }).format(total.balance)}</Text>
        </Flex>
        </Flex>
       

        <Flex  justify="center" align="center" >
        <Box  textAlign="center" p="8" bg="gray.100" borderRadius={8}>
    
          <Table  border="2px" m={2}  colorScheme="blackAlpha">
            <Thead > 
              <Tr >
              <Th>Titulo</Th>
              <Th>Valor</Th>
              <Th>Categoria</Th>
              <Th>Tipo</Th>
              <Th>Data</Th>
              </Tr>
            </Thead>
            <Tbody  border="2px">
             
                {
                transactions.map( (transaction) => (
                 <Tr>
                  <Td>{transaction.title}</Td>
                    <Td>{transaction.amount}</Td>
                    <Td>{transaction.category}</Td>
                    <Td>{transaction.type}</Td>
                    <Td>{transaction.createdAt}</Td>
                    </Tr>
                  ) )
                }
            
            </Tbody>
          </Table>
          
    
        </Box>
      
        </Flex>
      </Flex>
    </ChakraProvider>
  )
}
