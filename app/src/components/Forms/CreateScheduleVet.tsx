import {
  ChakraProvider,
  Flex,
  FormControl,
  Button,
} from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from 'react';
import { Input } from "../admin/Input";
  interface CreateNewScheduleProps {
    initialOur: string
    finalOur: string
    
  }
  export function CreateScheduleVetForm() {
    const { register, handleSubmit} = useForm()
    const [vetOur, setVetOur] = useState({
        initialOur: '',
        finalOur: ''
    })

 
  
    const handleCreateSchedule: SubmitHandler<CreateNewScheduleProps>  = async (values) => {
        setVetOur(values)

    }
    const fullOur =Object.values(vetOur)

    
     return (
        <ChakraProvider>
        <FormControl mt="4"  as="form"  onSubmit={handleSubmit(handleCreateSchedule as any)}>
        <Flex direction="column" align="center" justify="center" >
        <Input label='Veterinario' name='name' />
        <Input {...register('fisrtour')}  label='Inicio expediente' name='fisrtour' type="time" />
        <Input {...register('lastour')} label='Fim expediente' name='lastour' type="time" />
            <Button type="submit"  mt="4" colorScheme="whatsapp">Cadastrar</Button>
        </Flex>
        </FormControl>
      </ChakraProvider>
    )
  }