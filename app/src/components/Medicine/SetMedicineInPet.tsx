import { Button, Flex, HStack, Input, InputGroup, InputLeftElement, Select, Table, TableContainer, Tbody, Td, Text, Textarea, Th, Thead, Tr, VStack } from "@chakra-ui/react";
import React, {useState, useEffect} from "react";
import { BiSearch } from "react-icons/bi";
import { useParams } from "react-router-dom";
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
  accId: number;
  admissionId?: string;
  InAdmission: boolean;
  
}

export function SetMedicineInPet({accId, admissionId, InAdmission}:MedicineComponentProps ){
  const { id, queueId } = useParams<{ id: string; queueId: string }>();
  const [medicinesGroups, setMedicinesGroups] = useState<MedicineGroupsProps[]>([])
  const [ medicine, setMedicine] = useState({} as MedicineProps)
  const [medicineId, setMedicineId] = useState(0)
  const [dosage, setDosage] = useState("")
  const user = JSON.parse(localStorage.getItem("user") as string);

  async function setMedicineInPet(){
    try {
      const data = {
        RequestedByVetId: user.id, 
        RequestedByVetName: user.consultName, 
        InAdmission, 
        dosage
      }
      if(InAdmission === true) {
        await api.post(`/pet/medicine/${medicineId}/${id}}/${accId}/${admissionId}`, data)
        toast.success("Medicamento adicionado - Internação!")
      } else {
        await api.post(`/pet/medicine/${medicineId}/${id}/${accId}/${queueId}`, data)
        toast.success("Medicamento adicionado - Veterinãrios!")
      }

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
    <Flex  w="1200px" h="600px" m="8px" direction="column">
      <Flex m="8px" justify="center" w="100%"><Text fontWeight="bold" fontSize="2xl">Central de Medicação</Text></Flex>
      <HStack marginLeft="2rem"  marginRight="2rem">
      <Flex w="400px" h="400px" overflowY="auto" gap={2}  direction="column">
      <Text textAlign="center"  fontWeight="bold" fontSize="md" bg="cyan.300">FILTRO POR GRUPOS</Text>
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
      <Flex w="400px" h="400px" overflowY="auto" gap={2}  direction="column">
        <HStack>
        <Button colorScheme="teal">Filtrar</Button>
        <InputGroup>
    <InputLeftElement pointerEvents='none'>
      <BiSearch color='gray.300' />
    </InputLeftElement>
    <Input placeholder='Nome do Medicamento' border="2px" />
      </InputGroup>
        </HStack>

      </Flex>

      <Flex ml="4" w="400px" h="400px" overflowY="auto" gap={2}  direction="column">
      <Text textAlign="center" bgColor="green.300" fontWeight="bold" fontSize="lg">Medicamentos Adicionados!</Text>

      </Flex>

      </HStack>
    
        
        <Flex direction="column" w="100%" >
          <Text fontWeight="black" fontSize="lg">
           Medicamento selecionado:
          </Text>
            <Flex w="100%" justify="space-evenly" mt="4" gap={4} >
              <VStack>
                <Text fontWeight="black" fontSize="lg">Nome: </Text>
              <Text fontWeight="black" fontSize="lg">{medicine ? medicine.title : ""}</Text>
            
              <Text mt="4" fontWeight="black" fontSize="lg">Quantidade Aplicado</Text>
              <Input
              value={dosage}
              onChange={(ev) => setDosage(ev.target.value)}
              placeholder="Valor a ser medicado"
              />
              <Text>Previsão: {dosage}</Text>
              </VStack>
            

        <VStack>
          <Text  fontWeight="black" fontSize="lg">Valor: </Text>
        <Text fontWeight="black" fontSize="lg">{medicine ?new Intl.NumberFormat("pt-BR", {
                style: 'currency',
                currency: 'BRL'
              }).format(medicine.price) : ""}</Text>
              
              <VStack maxWidth={200}>
              <Text fontWeight="black" fontSize="lg">Observação:</Text>
               <Text>{medicine ? medicine.observations : ""}</Text>
              </VStack>
        </VStack>
     
              <VStack>
              <Text fontWeight="black" fontSize="lg">Posologia:</Text>
               <Textarea 
             defaultValue={medicine ? medicine.dosage : ""}
               minH={300}
               minWidth={450}
               disabled _disabled={{
                textColor: "black",
                fontWeight: "bold"
               }}/>
              </VStack>
              
            </Flex> 
        </Flex>
        
        <Button 
        onClick={() => setMedicineInPet()}
        
        w="100%" mt={4} padding="12px" colorScheme="whatsapp">Gravar medicação neste animal</Button>
     
    </Flex>
  )
}