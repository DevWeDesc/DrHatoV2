import {
    ChakraProvider,
    Flex,
    FormControl,
    FormLabel,
    Button,
    VStack,
    Text,
    RadioGroup,
    Radio

  } from "@chakra-ui/react";
  import { SubmitHandler, useForm } from "react-hook-form";
import { api } from "../../lib/axios";
import { Input } from "../admin/Input";
import { toast } from 'react-toastify'
import { useState} from 'react'
interface CreateNewClienteProps {
    name: string;
    adress: string;
    phone: string;
    cpf: string;
    email: string;
    birthday: Date | string | number;
    cep: string;
    district: string;
    tell: string;
    rg: string;
    vetPreference: string;
}
export function ReceptionCreateNewConsultForm() {
    const { register, handleSubmit} = useForm()
    const [howKnow, setHowKnow] = useState("")
    const [kindPerson, setKindPerson] = useState("")
    const handleCreateNewCliente: SubmitHandler<CreateNewClienteProps>  = async (values) => {
      const data = {
        name: values.name,
        adress: values.adress,
        district: values.district,
        email: values.email,
        birthday: values.birthday.toString(),
        phone:values.phone,
        tell: values.tell,
        cpf:values.cpf,
        rg: values.rg,
        cep: values.cep,
        howKnowUs: howKnow,
        kindPerson: kindPerson
        
     }
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
        <Flex width="100%"   justify="center" m="4" p="4" gap="8" >
        <VStack>
        <FormLabel htmlFor="name">Nome Cliente</FormLabel>
        <Input placeholder="Nome do cliente" {...register("name")} id="name"  minWidth={320} name="name"  />
        <FormLabel htmlFor="adress">Endereço</FormLabel>
        <Input placeholder="Endereço do cliente"  {...register("adress")}  id="adress" name="adress"  />

        <FormLabel htmlFor="phone">Número Cliente</FormLabel>
        <Input  placeholder="Número de Celular do Cliente" {...register("phone")}  id="phone"  name="phone" />

        <FormLabel htmlFor="tell">Telefone Cliente</FormLabel>
        <Input  placeholder="Número de Telefone do Cliente" {...register("tell")}  id="tell" name="tell" />

        <FormLabel htmlFor="cpf">Cpf do cliente</FormLabel>
        <Input placeholder="CPF Do cliente"  {...register("cpf")}  id="cpf"   name="cpf" />

        <FormLabel htmlFor="rg">Rg do cliente</FormLabel>
        <Input   placeholder="RG do cliente"   {...register("rg")}  id="rg"   name="rg" />

        <FormLabel htmlFor="email">Email do cliente</FormLabel>
        <Input   placeholder="E-mail do Cliente"  {...register("email")}  id="email" name="email" />

        <FormLabel   htmlFor="birthday">Data de nascimento</FormLabel>
        <Input   {...register("birthday")}  id="birthday" name="birthday" type="date" />

        <FormLabel   htmlFor="cep">Cep do Cliente</FormLabel>
        <Input   placeholder="Data do nascimento do Cliente"     {...register("cep")}  id="cep"  name="cep" type="text" />

        <FormLabel   htmlFor="district">Cidade do Cliente</FormLabel>
        <Input placeholder="Cidade do Cliente" {...register('district')}  name="district" />

        </VStack>
        <VStack>
          <Text textAlign="center" fontWeight="bold">Como nos conheceu ?</Text>
          <RadioGroup onChange={setHowKnow} value={howKnow}>
              <Flex direction="column" pl="8" >
    
              <Radio mb="2"  borderColor="teal.800"   colorScheme="green" value='Petshop'>Cliente do PETSHOP</Radio>
              <Radio mb="2" borderColor="teal.800"   colorScheme="green"  value='Facebook'>Facebook</Radio>
              <Radio mb="2" borderColor="teal.800"   colorScheme="green"  value='Fachada Hospital'>Fachada Hospital</Radio>
              <Radio mb="2" borderColor="teal.800"   colorScheme="green"  value="Indicação">Indicação de amigo</Radio>
              <Radio mb="2" borderColor="teal.800"   colorScheme="green"  value="Instragram" >Instagram</Radio>
              <Radio mb="2" borderColor="teal.800"   colorScheme="green"  value="ClienteHato" >Já e cliente de outra unidade HATO</Radio>
              <Radio mb="2" borderColor="teal.800"   colorScheme="green"  value="PlacaRua" >Placa de Rua</Radio>
              <Radio mb="2" borderColor="teal.800"   colorScheme="green"  value="SiteBusca" >Site de Busca</Radio>
              <Radio mb="2" borderColor="teal.800"   colorScheme="green"  value="Twitter" >Twitter</Radio>
              <Radio mb="2" borderColor="teal.800"   colorScheme="green"  value="Outros" >Outros/Indicação</Radio>
 
              </Flex>
          </RadioGroup>

          <Text mt="2" textAlign="center" fontWeight="bold">Pessoa Fisica ou Juridica ?</Text>

          <RadioGroup onChange={setKindPerson} value={kindPerson}>
              <Flex  gap="2" mt="2">
    
              <Radio mb="2"  borderColor="teal.800"   colorScheme="green" value='FÍSICA'>PESSOA FÍSICA</Radio>
              <Radio mb="2" borderColor="teal.800"   colorScheme="green"  value='JURÍDICA'>PESSOA JURÍDICA</Radio>
         
 
              </Flex>
          </RadioGroup>
        </VStack>
        

        </Flex>
       


        <Button w={300} mt="8" colorScheme="whatsapp" type="submit">Cadastrar</Button>
       
        </FormControl>
      </ChakraProvider>
    )
}