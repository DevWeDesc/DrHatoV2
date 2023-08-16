import { Button, Table, TableContainer, Tbody, Td, Thead, Tr } from "@chakra-ui/react";
import { useState, useEffect, Suspense} from "react";
import { PetDetaisl } from "../../interfaces";
import { api } from "../../lib/axios";
import { LoadingSpinner } from "../Loading";

type AccountsProps = {
  id: number
  accountNumber: number
  debits: number 
}
interface CustomerProps {
   id: number
    name: string
    cpf: string
  customerAccount: AccountsProps
}

export function ShowPaymentsOpenInDay () {
const [accountsWithDebits, setAccountsWithDebits] = useState<CustomerProps[]>([])

  async function getPets() {
    const response = await api.get('/debitaccounts')
    setAccountsWithDebits(response.data)
  }

  useEffect(() => {
    getPets()
  }, [])

   
    
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <TableContainer w={1100} h={600} overflow="auto">
        <Table>
          <Thead>
            <Tr>
            <Td fontWeight="bold" border="2px">
              NOME
            </Td>
            <Td  fontWeight="bold" border="2px">
              CPF
            </Td >
            <Td  fontWeight="bold" border="2px">
              DÉBITOS EM ABERTO
            </Td>
            <Td  fontWeight="bold" border="2px">
              NÚMERO DE CONTA
            </Td >

            <Td  fontWeight="bold" border="2px">
              EFETUAR PAGAMENTO
            </Td>
            
            
            </Tr>
          </Thead>
          <Tbody>
              {
                accountsWithDebits.map((customer) => (
                  <Tr key={customer.id}>
                    <Td>
                      {customer.name}
                    </Td>
                    <Td>
                      {customer.cpf}
                    </Td>
                    <Td>
                      {new Intl.NumberFormat('pt-BR', {
                        currency: 'BRL',
                        style: 'currency'
                      }).format(customer.customerAccount?.debits)}
                    </Td>
                    <Td>
                      {customer.customerAccount.accountNumber}
                    </Td>
                    <Td>
                      <Button colorScheme="whatsapp">
                        IR ATÉ PAGAMENTO
                      </Button>
                    </Td>

                  </Tr>
                ))
              }
          </Tbody>
        </Table>
      </TableContainer>
    </Suspense>
  )
}