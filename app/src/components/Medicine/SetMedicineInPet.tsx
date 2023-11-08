import { Button, Flex, Input, Select, Table, TableContainer, Tbody, Td, Text, Textarea, Th, Thead, Tr, VStack } from "@chakra-ui/react";
import React, {useState, useEffect} from "react";
import { toast } from "react-toastify";
import { api } from "../../lib/axios";

interface MedicineGroupsProps {
  id: number;
  title: string;
  medicines: Array<{
          id: number,
				  title: string;
					price: number;
					unitMeasurement: string;
				  dosage: string;
					observations: string;
					medicinesGroupsId: number;
  }>
}

interface MedicineProps {
  id: number,
  title: string;
  price: number;
  unitMeasurement: string;
  dosage: string;
  observations: string;
  medicinesGroupsId: number;
}

interface MedicineComponentProps {
  petId: any;
  accId: any;
}

export function SetMedicineInPet({accId, petId}:MedicineComponentProps ){
  const [medicinesGroups, setMedicinesGroups] = useState<MedicineGroupsProps[]>([])
  const [ medicine, setMedicine] = useState({} as MedicineProps)
  const [medicineId, setMedicineId] = useState(0)
  const [dosage, setDosage] = useState("")

  async function setMedicineInPet(){
    try {
      await api.post(`/pet/medicine/${medicineId}/${petId}/${dosage}/${accId}`)
      toast.success("Medicamento gravado com sucesso!")
    } catch (error) {
      toast.error("Falha ao medicar animal")
    }
  }

  async function getMedicinesGroups () {
    try {
      const response = await api.get("/medicines/groups")

      setMedicinesGroups(response.data.medicines)

    } catch (error) {
      console.error(error)
    }
  }


  
  async function getMedicine () {
    try {
      const response = await api.get(`/medicine/${medicineId}`)

      setMedicine(response.data)

    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getMedicine ()
  },[medicineId])

  useEffect(() => {
    getMedicinesGroups()
  },[])
  return (
    <Flex align="center" w={800} h={600} gap={4} direction="column">
      <Flex w="100%" gap={2} overflowX="auto">
      {
          medicinesGroups.map((medicine) => (
            <Flex key={medicine.id} w="100%"  >
               <Select
               minW={200}
                borderWidth={3}
                borderColor="black"
               placeholder={medicine?.title}
              onChange={(ev) => setMedicineId(Number(ev.target.value))}
               >
                {
                  medicine?.medicines?.map((item) => (
                    <option value={item.id}>{item.title}</option>
                  ))
                }
               </Select>

            </Flex>
           
          ))
        }
      </Flex>
        
        <Flex direction="column" w="100%" >
          <Text fontWeight="black" fontSize="lg">
           Medicamento selecionado:
          </Text>
            <Flex w="100%" direction="row" mt="4" justify="space-between" gap={4} >
              <VStack>
                <Text fontWeight="black" fontSize="lg">Nome: </Text>
              <Text fontWeight="black" fontSize="lg">{medicine ? medicine.title : ""}</Text>
              <Text  fontWeight="black" fontSize="lg" textTransform="lowercase" >Unidade de Medida: {medicine ? medicine.unitMeasurement : ""}</Text>
              <Text mt="4" fontWeight="black" fontSize="lg">Quantidade Aplicado</Text>
              <Input
              value={dosage}
              onChange={(ev) => setDosage(ev.target.value)}
              placeholder="Valor a ser medicado"
              />
              <Text>Previsão: {`${dosage}/${medicine ? medicine.unitMeasurement : ""}`}</Text>
              </VStack>
            

        <VStack>
          <Text  fontWeight="black" fontSize="lg">Valor: </Text>
        <Text fontWeight="black" fontSize="lg">{medicine ?new Intl.NumberFormat("pt-BR", {
                style: 'currency',
                currency: 'BRL'
              }).format(medicine.price) : ""}</Text>
        </VStack>
     
              <VStack maxWidth={200}>
              <Text fontWeight="black" fontSize="lg">Observação:</Text>
               <Text>{medicine ? medicine.observations : ""}</Text>
              </VStack>
              <VStack>
              <Text fontWeight="black" fontSize="lg">Posologia:</Text>
               <Textarea 
             defaultValue={medicine ? medicine.dosage : ""}
               minH={300}
               disabled _disabled={{
                textColor: "black",
                fontWeight: "bold"
               }}/>
              </VStack>
              
            </Flex> 
        </Flex>
        
        <Button 
        onClick={() => setMedicineInPet()}
        
        w="100%" mt={4} h={46} colorScheme="whatsapp">Gravar medicação neste animal</Button>
     
    </Flex>
  )
}