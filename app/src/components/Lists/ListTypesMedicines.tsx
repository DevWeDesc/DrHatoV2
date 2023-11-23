import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Box,
} from "@chakra-ui/react";

import React, { useEffect, useState } from "react";
import { FaClipboardList } from "react-icons/fa";
import { GiHealthPotion } from "react-icons/gi";
import { api } from "../../lib/axios";
import { MedicineDetails } from "../DetailsComponents/MedicineDetails";
import { GenericModal } from "../Modal/GenericModal";

interface MedicineGroupsProps {
  id: number;
  title: string;
  medicines: Array<{
    id: number;
    title: string;
    price: string;
    unitMeasurement: string;
    dosage: string;
    observation: string;
    medicinesGroupsId: number;
  }>
}



export default function ListMedicines() {
  const [typeMedicines, setTypeMedicines] = useState<number | null>(null);
  const [medicinesGroups, setMedicinesGroups] = useState<MedicineGroupsProps[]>([])
  const [medicineId, setMedicineId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  function openModal() {
    setIsModalOpen(true);
  }
  function closeModal() {
    setIsModalOpen(false);
  }

  async function GetMedicineGroups () {
    try {
      const response = await api.get("/medicines/groups")
      setMedicinesGroups(response.data.medicines)
    } catch (error) {
        console.error(error)
    }
  }

  useEffect(() => {
    GetMedicineGroups()
  }, [])
  return (
    <Box w="90%" bg="gray.200" height="800px" p="8" rounded="lg" overflowY="auto">
      <TableContainer w="100%"  display="flex">
        <Table h="100%" >
          <Thead>
            <Tr>
              <Th  border="2px" bgColor="cyan.100" fontSize="20" display="flex" justifyContent="space-between">Tipos de Medicamentos <FaClipboardList color="gray" size={26}  /></Th>
            </Tr>
          </Thead>
          <Tbody   >
            {medicinesGroups.map((medicine) => (
              <Tr
             
              cursor="pointer"
              
              _hover={{ bgColor: "green.100"}}
              onClick={() => setTypeMedicines(medicine.id)} 
              >
                <Td border="2px" maxHeight="20px" >{medicine.title} </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
 
          <Table h="100%" overflowY="auto">
            <Thead>
              <Tr>
                <Th border="2px" bgColor="cyan.100" fontSize="20" display="flex" justifyContent="space-between">Medicamentos <GiHealthPotion color="red" size={28}/></Th>
              </Tr>
            </Thead>
            <Tbody>
              {
                medicinesGroups.map((groups) => {
                  const medicines = groups.medicines.filter((group) => group.medicinesGroupsId === typeMedicines)

                 return medicines.map((medicine) => (
                    <Tr    cursor="pointer"
              
                    _hover={{ bgColor: "green.100"}} key={medicine.id}>
                          <Td   onClick={() => {
                            setMedicineId(medicine.id);
                            openModal()}} border="2px" maxHeight="20px" >{medicine.title}</Td>
                    </Tr>
                  ))

                })
              }
            </Tbody>
          </Table>

      </TableContainer>
      <GenericModal isOpen={isModalOpen} onRequestClose={closeModal}>
                <MedicineDetails medicineId={medicineId} />
      </GenericModal>
    </Box>
  );
}
