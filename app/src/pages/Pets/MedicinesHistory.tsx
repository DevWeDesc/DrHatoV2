import { useState, useEffect } from 'react'
import { Flex, TableContainer, Table, Thead, Tbody, Tr, Th, Td, Text } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { api } from '../../lib/axios'

interface MedicineHistoryDTO {
  id: number
  title: string
  dosageApplication: string
  unitMeasurement: string
  isPaid: boolean
  applicationDate: Date
}

export function MedicinesHistory() {
  const [medicineHistory, setMedicineHistory] = useState<MedicineHistoryDTO[]>([])
  const { id } = useParams<{ id: string }>()

  async function getMedicineHistory() {
    try {
      const response = await api.get(`/pet/medicine/${id}`)

      setMedicineHistory(response.data.history)
    } catch (error) {
      toast.error('Falha ao buscar histórico de medicamentos!')
    }
  }

  useEffect(() => {
    getMedicineHistory() 
  }, [])


  return (
    <Flex w={600} h={600} direction="column" align="center" overflowY="scroll">
      <Text fontWeight="bold">Listagem de Histórico de medicações do animal:</Text>
        <TableContainer mt={2} w="100%" px={2} h="100%" >
          <Table>
            <Thead>
              <Tr>
                <Th  border="2px" bgColor="cyan.100" fontWeight="bold" textColor="black">
                  Medicamento
                </Th>
                <Th border="2px" bgColor="cyan.100" fontWeight="bold" textColor="black">
                  Dosagem
                </Th>
                <Th border="2px" bgColor="cyan.100" fontWeight="bold" textColor="black">
                  Unidade
                </Th>
                <Th 
                border="2px" bgColor="cyan.100" fontWeight="bold" textColor="black"
                >Data</Th>
              </Tr>
            </Thead>
            <Tbody>
            {
              medicineHistory.map((medicine) => (
                <Tr _hover={{bgColor: "green.300"}} bgColor="green.100" cursor="pointer">
                  <Td  borderBottom="2px" fontWeight="semibold" textColor="black" >{medicine.title}</Td>
                  <Td  borderBottom="2px" fontWeight="semibold" textColor="black" >{medicine.dosageApplication}</Td>
                  <Td  borderBottom="2px" fontWeight="semibold" textColor="black" >{medicine.unitMeasurement}</Td>
                  <Td  borderBottom="2px" fontWeight="semibold" textColor="black" >{new Intl.DateTimeFormat("pt-BR", {
                    day :'2-digit',
                    month: '2-digit',
                    year: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit'
                  }).format(new Date(medicine.applicationDate))  }</Td>
                </Tr>
              ))
            }

            </Tbody>

          </Table>

        </TableContainer>
    </Flex>
  )
}
