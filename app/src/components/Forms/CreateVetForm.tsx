import {
  ChakraProvider,
  Flex,
  FormControl,
  FormLabel,
  Button,
  VStack
} from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "../admin/Input";
interface CreateNewPetProps {
  name: string;
  
}
export function CreateVetForm() {
  const { register, handleSubmit} = useForm()
 
 
  const handleCreateNewCliente: SubmitHandler<CreateNewPetProps>  = async (values) => {
   console.log(values)
  }
   return (
    <ChakraProvider>
      <FormControl  as="form"  onSubmit={handleSubmit(handleCreateNewCliente as any)}>
      <Flex direction="row" align="center" justify="center" >

      <VStack>
      <FormLabel htmlFor="name">Nome</FormLabel>
      <Input {...register("name")} id="name" type="number"  maxWidth={320} name="name"  />

      <FormLabel htmlFor="crm">Número CRMV</FormLabel>
      <Input {...register("crm")} id="crm" type="number"  maxWidth={320}name="crm"  />


      <FormLabel htmlFor="esp">Especialidade</FormLabel>
      <Input {...register("esp")} id="esp" type="number"  maxWidth={320}name="esp"  />

      <FormLabel htmlFor="plant">Plantões</FormLabel>
      <Input {...register("plant")} id="plant" type="date"  maxWidth={320}name="plant"  />


      <Button mt="12" colorScheme="whatsapp" type="submit">Cadastrar</Button>
      </VStack>
      
   
      </Flex>
    
      </FormControl>
    </ChakraProvider>
  )
}