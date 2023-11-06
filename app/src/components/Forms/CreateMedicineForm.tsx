import {
  ChakraProvider,
  Flex,
  FormControl,
  FormLabel,
  Button,
  VStack,
  Textarea,
  Select,
} from "@chakra-ui/react";
import { useState, useEffect } from 'react'
import { Field, FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { api } from "../../lib/axios";
import { Input } from "../admin/Input";


interface CreateMedicineProps {
  title: string;
  groupId: string;
  dosage: string;
  observations: string;
  price: string;
  unitMeasurement: string;
}
type MedicineGroupProps = {
  id: number;
  title: string;
}

enum MedicationUnit {
  CPR = "CPR",
  CPZ = "CPZ",
  ML = "ML",
  MG = "MG",
  G = "G",
  GT = "GT",
  CT = "CT",
  CS = "CS",
  UN = "UN",
}

export function CreateMedicineForm() {
  const { register, handleSubmit } = useForm();
  const [medicinesGroups, setMedicinesGroups] = useState<MedicineGroupProps[]>([])
  const MedicationUnitArray: string[] = Object.keys(MedicationUnit);
  const navigate = useNavigate()
  async function getMedicinesGroups() {
    try {
     const response =  await api.get("/medicines/groups")
     setMedicinesGroups(response.data.medicines)
    } catch (error) {
      
    }
  }

  const handleCreateNewMedicine: SubmitHandler<CreateMedicineProps> = async (
    values
  ) => {
    try {
      const data = {
        title: values.title,
        price: values.price,
        dosage: values.dosage,
        unitMeasurement: values.unitMeasurement,
        observations: values.observations
      }

        await api.post(`/medicine/${values.groupId}`, data)

        toast.success("Medicamento Cadastrado com sucesso!")

        navigate("/Medicines")
    } catch (error) {
      toast.error("Falha ao cadastrar medicamento!")
      console.log(error)
      
    }
  };


  useEffect(() => {
    getMedicinesGroups()
  }, [])
  return (
    <ChakraProvider>
      <FormControl as="form" w="100%" onSubmit={handleSubmit(handleCreateNewMedicine as SubmitHandler<FieldValues>)}>
        <Flex w="100%" h="100%" mt="4" p="4" direction="column" >
          <Flex direction="column" gap="4" w="100%">
            <Flex w="100%" align="center">
              <FormLabel htmlFor="name" w="10.3rem">
                <strong> Grupo</strong>
              </FormLabel>
              <Select
                bgColor="white"
                border="1px solid black"
                  placeholder="Selecione o Grupo"
                  
                {...register("groupId")}
                name="groupId"
                id="groupId"
                w="100%"
      
              >
                {medicinesGroups.map((group) => <option value={group.id} key={group.id}>{group?.title}</option>)}
              </Select>
            </Flex>

            <Flex w="100%" align="center">
              <FormLabel  w="10.3rem">
                <strong> Unidade de Medida</strong>
              </FormLabel>
              <Select
                bgColor="white"
                border="1px solid black"
                  placeholder="Selecione a Unidade"
                  
                {...register("unitMeasurement")}
                name="unitMeasurement"
                id="unitMeasurement"
                w="280px"
      
              >
                {
                MedicationUnitArray.map((item) => (<option value={item} >{item}</option>))
                }
              </Select>
            </Flex>



            <Flex w="100%" align="center">
              <FormLabel htmlFor="crm" w="10.3rem">
                <strong> Nome</strong>
              </FormLabel>
              <Input
                {...register("title")}
                id="title"
                name="title"
                type="text"
                w="100%"
   
              />
            </Flex>


            <VStack w="100%">
              <Flex w="100%">
                <FormLabel w="10.3rem">
                  <strong> Preço</strong>
                </FormLabel>
                <Input
                {...register("price")}
                name="price"
                id="price"
                type="text"
                w="100%"
           
              />
              
              </Flex>
            </VStack>
            <Flex w="100%" align="center">
              <FormLabel htmlFor="observations" w="10.3rem">
                <strong> Apresentação</strong>
              </FormLabel>
              <Textarea
              
                {...register("observations")}
                name="observations"
                id="observations"
                bgColor="green.50"
                w="100%"
        
                placeholder="Digite observações ou a apresentação do medicamento aqui"
              />
              
            </Flex>

            <VStack w="100%">
              <Flex w="100%">
                <FormLabel w="10.3rem">
                  {" "}
                  <strong>Posologia</strong>
                </FormLabel>
                <Textarea
                minHeight={380}
                  w="100%"
                  {...register("dosage")}
                  name="dosage"
                  id="dosage"
                  bgColor="green.50"
                  placeholder="Digite a posologia aqui"
                />
              </Flex>
              
            </VStack>
         
            <Button w="100%" mt="4" colorScheme="whatsapp" type="submit">
                Cadastrar
              </Button>
      
  
          </Flex>
         
        </Flex>
    
      </FormControl>
    </ChakraProvider>
  );
}
