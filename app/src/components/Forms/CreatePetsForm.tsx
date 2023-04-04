import {
  ChakraProvider,
  Flex,
  FormControl,
  FormLabel,
  Button,
  VStack
} from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { api } from "../../lib/axios";
import { Input } from "../admin/Input";
interface CreateNewPetProps {
    id: number | string;
    name: string;
    bornDate: string;
    cor: string;
    especie: string;
    race: string;
    peso: string;
    porte: string;
    sexo: string;
    rga: number;
    status: string;
    obs: string
}
export function CreatePetsForm() {
    const { register, handleSubmit} = useForm()
    const { id } = useParams<{ id: string }>();
    
    const handleCreateNewCliente: SubmitHandler<CreateNewPetProps>  = async (values) => {
      const data = {
        name: values.name,
        especie: values.especie,
        sexo: values.sexo,
        race: values.race,
        weigth: values.peso,
        status: values.status,
        corPet: values.cor,
        sizePet: values.porte,
        bornDate: values.bornDate,
        observations: values.obs,
        rga: values.rga
      }
        
      console.log('Data post',data)
      try {
        await api.post(`/pets/${id}`, data)
        toast.success('pet cadastrado com sucesso')
      } catch (error) {
       
        console.error(error)
        toast.error('Falha ao cadastrar pet, verifique se o mesmo ja não existe')
      }
      console.log(values)
    }
     return (
      <ChakraProvider>
        <FormControl  as="form"  onSubmit={handleSubmit(handleCreateNewCliente as any)}>
        <Flex direction="row" align="center" justify="center" >

    
        <VStack pl="8">
        <FormLabel htmlFor="name">Nome do Pet</FormLabel>
        <Input {...register("name")} id="name"  maxWidth={320} name="name"  />

        <FormLabel htmlFor="bornDate">Data de nascimento </FormLabel>
        <Input {...register("bornDate")} id="bornDate"  maxWidth={320} name="bornDate"  />

        <FormLabel htmlFor="cor">Cor do pet</FormLabel>
        <Input {...register("cor")} id="cor"  maxWidth={320} name="cor"  />

        <FormLabel htmlFor="especie">especie do pet</FormLabel>
        <Input {...register("especie")} id="especie"  maxWidth={320} name="especie"  />
        </VStack>
        <VStack pl="8">
        <FormLabel htmlFor="sexo">Sexo do Pet</FormLabel>
        <Input {...register("sexo")} id="sexo"  maxWidth={320} name="sexo"  />

    
        <FormLabel htmlFor="rga">pedigree/rga</FormLabel>
        <Input {...register("rga")} id="rga"  maxWidth={320} name="rga"  />

        <FormLabel htmlFor="porte">porte do Pet</FormLabel>
        <Input {...register("porte")} id="porte"  maxWidth={320} name="porte"  />
        </VStack>

        <VStack pl="8">
        <FormLabel htmlFor="status">Status</FormLabel>
        <Input {...register("status")} id="status"  maxWidth={320} name="status"  />

        <FormLabel htmlFor="peso">Peso</FormLabel>
        <Input {...register("peso")} id="peso"  maxWidth={320} name="peso"  />


        <FormLabel htmlFor="obs">Observações</FormLabel>
        <Input {...register("obs")} id="obs"  maxWidth={320} name="obs"  type="text" />

        <FormLabel htmlFor="race">Raça</FormLabel>
        <Input {...register("race")} id="race"  maxWidth={320} name="race"  type="text" />
        </VStack>


        </Flex>
        <Button mt="8" colorScheme="whatsapp" type="submit">Cadastrar</Button>
        </FormControl>
      </ChakraProvider>
    )
}