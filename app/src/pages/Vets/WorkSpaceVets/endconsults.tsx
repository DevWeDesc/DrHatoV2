import React, {useState, useEffect} from 'react'
import { Button, Flex, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react'
import { useParams } from 'react-router-dom';
import { api } from '../../../lib/axios';
import { toast } from 'react-toastify';
interface ConsultDebitsProps {
  id: string;
  openedDate: Date;
  consultType: string;
  medicineRecordId: number;
  consultDebits: Array< {
  id:number;
  name: string;
  price: number;
  RequestedByVetName: string;
  requestedDate: Date;
  isExam: boolean;
	isSurgerie: boolean;
	isVaccine: boolean;
	isProcedure: boolean;
	isAdmission: boolean;
  }>
}

interface EndConsutsProps {
  handleCloseQuery: () => void;
}
export function EndConsults({handleCloseQuery}: EndConsutsProps) {
  const { id, queueId } = useParams<{ id: string; queueId: string }>();
  const [consultDebitsDetails, setConsultDebitsDetails] = useState<ConsultDebitsProps[]>([])
  const [totalDebits, setTotalDebits] = useState({ total: 0});

  async function getConsultDebitsDetails() {
    try {
      const response = await api.get(`/debits/pets/consults/${queueId}`)
      setConsultDebitsDetails(response.data.debits)
      setTotalDebits(response.data.total)

    } catch (error) {
      toast.error("Falha ao buscar informações da consulta!")
    }
  }

    useEffect(() => {
      getConsultDebitsDetails()
    }, [])

  return (
   <Flex w="800px" h="600px" direction="column" >  
       {
        consultDebitsDetails.map((consults) => (
          <React.Fragment key={consults.id}>
          <Flex m="2" align="center" justifyContent="space-between">  
            <Text fontWeight="bold" fontSize="lg">Consulta iniciada em: {new Intl.DateTimeFormat('pt-BR', {day: '2-digit', month: '2-digit',
          hour: '2-digit', minute: '2-digit'}).format(new Date(consults?.openedDate))}</Text>
          <Text fontWeight="bold" fontSize="lg">Tipo de consulta: {consults.consultType}</Text>
          </Flex> 
          <TableContainer overflowY="scroll" w="100%" mt="4" h={540} >
            <Table >
            <Thead>
              <Tr>
                <Th fontSize="lg">Item</Th>
                <Th fontSize="lg">Valor</Th>
                <Th fontSize="lg">Data</Th>
                <Th fontSize="lg">Solicitado Por</Th>
              </Tr>
            </Thead>
            <Tbody>
                {
                  consults.consultDebits.map((item) => (
                    <Tr key={item.id}>
                     <Td>{item.name}</Td>
                     <Td>{new Intl.NumberFormat('pt-BR', {
                      currency: 'BRL',
                      style: 'currency'
                     }).format(item.price)}</Td>
                     <Td>{new Intl.DateTimeFormat('pt-BR', {day: '2-digit', month: '2-digit',
          hour: '2-digit', minute: '2-digit'}).format(new Date(item?.requestedDate))}</Td>
                                <Td>{item.RequestedByVetName}</Td>
                    </Tr>
                  ))
                }

            </Tbody>

            </Table>
          
          </TableContainer>
          <Text m="2" fontWeight="bold">Total: {new Intl.NumberFormat('pt-BR', {currency: 'BRL', style: 'currency'}).format(Number(totalDebits.total))}</Text>
          <Button  onClick={handleCloseQuery} w='100%' colorScheme="whatsapp">Finalizar Consulta</Button>
          </React.Fragment>
        ))
       }
   </Flex>
  )
}
