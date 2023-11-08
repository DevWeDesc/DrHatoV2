import { Button, Flex, FormLabel, Textarea, VStack } from "@chakra-ui/react";
import { useState, useEffect } from "react"
import { toast } from "react-toastify";
import { api } from "../../lib/axios"
import { Input } from "../admin/Input";

type MedicineDetailsProps = {
  medicineId: number | null
}
interface MedicineDetailsDTO {
  id: number;
  title: string;
  price: string;
  unitMeasurement: string;
  dosage: string;
  observations: string;
}

export function MedicineDetails({ medicineId}: MedicineDetailsProps) {
  const [medicineDetails, setMedicineDetails] = useState({} as MedicineDetailsDTO)

  async function getMedicineDetails() {
    try {
      const response = await api.get(`/medicine/${medicineId}`)
      setMedicineDetails(response.data)

    } catch (error) {
      
      toast.error("Falha ao pegar detalhes do medicamento!")
      console.log(error)
    } 
  }

  useEffect(() => {
    getMedicineDetails()
  }, [])


  return (
       <Flex w={600} h={600} align="center"  px={4} direction="column" overflowY="auto">

          <Input label="Nome do Medicamento" name="title"
          defaultValue={medicineDetails ? medicineDetails.title : ""}
          
          />
          <Input label="Preço do Medicamento" name="price"
          defaultValue={medicineDetails ?   medicineDetails.price : ""}
          />
          <Input label="Unidade de Medida" name="unit"
            defaultValue={medicineDetails ?   medicineDetails.unitMeasurement : ""}
          />
          <VStack>
            <FormLabel>Posologia:</FormLabel>
            <Textarea
             defaultValue={medicineDetails ?   medicineDetails.dosage : ""}
            h={300} w={450} />


            <FormLabel>Observação/Substância:</FormLabel>
            <Textarea
             defaultValue={medicineDetails ?   medicineDetails.observations : ""}
            h={200} w={350} />
          </VStack>
          
          <Button isDisabled mt="8" w="100%" h="68px" p={2} colorScheme="yellow">Editar</Button>


       </Flex>
  )
}