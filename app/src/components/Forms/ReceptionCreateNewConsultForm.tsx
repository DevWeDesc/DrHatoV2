import {
    ChakraProvider,
    Flex,
    FormControl,
    FormLabel,
    Button

  } from "@chakra-ui/react";
  import { SubmitHandler, useForm } from "react-hook-form";
import { api } from "../../lib/axios";
import { Input } from "../admin/Input";
import { toast } from 'react-toastify'

interface CreateNewClienteProps {
    name: string;
    adress: string;
    phone: string;
    cpf: string;
    email: string;
    birthday: Date | string | number;
}
export function ReceptionCreateNewConsultForm() {
    const { register, handleSubmit} = useForm()

    const handleCreateNewCliente: SubmitHandler<CreateNewClienteProps>  = async (values) => {
      const data = {
            name: values.name,
            adress: values.adress,
            email: values.email,
            birthday: values.birthday,
            phone:values.phone,
            cpf:values.cpf,
         }
         console.log(data)
        try {
          await api.post('/customers', data)
         toast.success('Usuário cadastrado')
        } catch (error) {
          toast.error("Falha ao cadastrar novo usuário")
          console.log(error)
        }
    }
     return (
      <ChakraProvider>
        <FormControl  as="form"  onSubmit={handleSubmit(handleCreateNewCliente as any)}>
        <Flex direction="column" align="center" justify="flex-start" >
        <FormLabel htmlFor="name">Nome Cliente</FormLabel>
        <Input {...register("name")} id="name"  maxWidth={320} name="name"  />
        <FormLabel htmlFor="adress">Endereço</FormLabel>
        <Input  {...register("adress")}  id="adress"  maxWidth={320} name="adress"  />

        <FormLabel htmlFor="phone">Número Cliente</FormLabel>
        <Input  {...register("phone")}  id="phone"  maxWidth={320} name="phone" />

        <FormLabel htmlFor="cpf">Cpf do cliente</FormLabel>
        <Input  {...register("cpf")}  id="cpf"  maxWidth={320} name="cpf" />

        <FormLabel htmlFor="email">Email do cliente</FormLabel>
        <Input  {...register("email")}  id="email"  maxWidth={320} name="email" />

        <FormLabel   htmlFor="birthday">Data de nascimento</FormLabel>
        <Input   {...register("birthday")}  id="birthday" maxWidth={320} name="birthday" type="text" />


        <Button mt="8" colorScheme="whatsapp" type="submit">Cadastrar</Button>
        </Flex>
        </FormControl>
      </ChakraProvider>
    )
}