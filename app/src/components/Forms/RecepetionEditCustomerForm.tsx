import {
    ChakraProvider,
    Flex,
    FormControl,
    FormLabel,
    Button,
    VStack,
    Text,
    RadioGroup,
    Radio,
    HStack,
    Select

  } from "@chakra-ui/react";
  import { SubmitHandler, useForm } from "react-hook-form";
import { api } from "../../lib/axios";
import { Input } from "../admin/Input";
import { toast } from 'react-toastify'
import { useState} from 'react'
import { useParams } from "react-router-dom";
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
    state: string;
    neighbour: string;
}
export function ReceptionEditCustomerForm() {
    const { register, handleSubmit} = useForm()
    const { id } = useParams<{ id: string }>();
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
        kindPerson: kindPerson,
        state: values.state,
        neighbour: values.neighbour
        
     }
        try {
        await api.put(`/customer/${id}`, data)
         toast.success('Usuário Editado com sucesso')
         console.log(data)
        } catch (error) {
          toast.error("Falha ao editar usuário")
          console.log(error)
        }
        
    }
     return (
      <ChakraProvider>
        <FormControl  as="form"  onSubmit={handleSubmit(handleCreateNewCliente as any)}>
        <Flex width="100%"   justify="center"  >



          <Flex direction="column" className="ENDEREÇO"  align="center">
          <Text mt="2" textAlign="center" fontWeight="bold">Pessoa Fisica ou Juridica ?</Text>

<RadioGroup onChange={setKindPerson} value={kindPerson}>
    <Flex  gap="2" mt="2">

    <Radio mb="2"  borderColor="teal.800"   colorScheme="green" value='FÍSICA'>PESSOA FÍSICA</Radio>
    <Radio mb="2" borderColor="teal.800"   colorScheme="green"  value='JURÍDICA'>PESSOA JURÍDICA</Radio>


    </Flex>
</RadioGroup>
 
 
      <Flex direction="column" align="center"  p="4" rounded={8} >
      
      <HStack>

<VStack>
 <FormLabel  htmlFor="State">Estado</FormLabel>
     <Select borderColor="gray.900" {...register("state")} name="state" placeholder='ESTADO'>
         <option value="SP">SP</option>
         <option value="AC">AC</option>
   <option value="AL">AL</option>
   <option value="AP">AP</option>
   <option value="AM">AM</option>
   <option value="BA">BA</option>
   <option value="CE">CE</option>
   <option value="DF">DF</option>
   <option value="ES">ES</option>
   <option value="GO">GO</option>
   <option value="MA">MA</option>
   <option value="MT">MT</option>
   <option value="MS">MS</option>
   <option value="MG">MG</option>
   <option value="PA">PA</option>
   <option value="PB">PB</option>
   <option value="PR">PR</option>
   <option value="PE">PE</option>
   <option value="PI">PI</option>
   <option value="RJ">RJ</option>
   <option value="RN">RN</option>
   <option value="RS">RS</option>
   <option value="RO">RO</option>
   <option value="RR">RR</option>
   <option value="SC">SC</option>

   <option value="SE">SE</option>
   <option value="TO">TO</option>
       </Select>
 </VStack>


 
 <VStack>
 <FormLabel color="red.400" fontWeight="bold"   htmlFor="cep">Cep do Cliente</FormLabel>
 <Input   placeholder="Cep do Cliente"     {...register("cep")}  id="cep"  name="cep" type="text" />
 </VStack>
</HStack>

<HStack>
 <VStack>
 <FormLabel htmlFor="district">Cidade</FormLabel>
 <Input placeholder="Cidade do Cliente" {...register('district')}  name="district" />

 </VStack>

 <VStack>
 <FormLabel color="red.400" fontWeight="bold"  htmlFor="neighbour">Bairro</FormLabel>
 <Input placeholder="Bairro do Cliente" {...register('neighbour')}  name="neighbour" />

 </VStack>

</HStack>

<HStack>
 <VStack>
 <FormLabel color="red.400" fontWeight="bold"  htmlFor="adress">Endereço</FormLabel>
       <Input placeholder="Endereço do cliente"  {...register("adress")}  id="adress" name="adress"  />
 </VStack>


 <VStack>
 <FormLabel  htmlFor="complement">Complemento</FormLabel>
       <Input placeholder="Complemento"  {...register("complement")}  id="complement" name="complement"  />

 </VStack>
</HStack>
      


      </Flex>

          <Flex justify="center" gap="4" w="100%" align="center">

          <Text fontWeight="bold">Campos marcados com a cor</Text>
          <Flex rounded="full" w="28px" h="28px" bgColor="red.400"></Flex>
          <Text fontWeight="bold">São obrigatórios</Text>
 
        
          </Flex>
       
          </Flex>

      

         
        <Flex direction="column" className="DADOS" align="center"  rounded={8}>
        <Text fontWeight="bold" mb="2">DADOS DE CADASTRO:  </Text>
        <FormLabel color="red.400" fontWeight="bold" htmlFor="name">Nome Cliente</FormLabel>
        <Input placeholder="Nome do cliente" {...register("name")} id="name"  minWidth={320} name="name"  />
      

        <FormLabel color="red.400" fontWeight="bold"  htmlFor="phone">Número Cliente</FormLabel>
        <Input  placeholder="Número de Celular do Cliente" {...register("phone")}  id="phone"  name="phone" />

        <FormLabel  color="red.400" fontWeight="bold" htmlFor="email">Email do cliente</FormLabel>
        <Input   placeholder="E-mail do Cliente"  {...register("email")}  id="email" name="email" />


        <FormLabel   color="red.400" fontWeight="bold" htmlFor="birthday">Data de nascimento</FormLabel>
        <Input   {...register("birthday")}  id="birthday" name="birthday" type="date" />


        

        <FormLabel color="red.400" fontWeight="bold"  htmlFor="cpf">Cpf do cliente</FormLabel>
        <Input placeholder="CPF Do cliente"  {...register("cpf")}  id="cpf"   name="cpf" />


 
        <FormLabel htmlFor="rg">Rg do cliente</FormLabel>
        <Input   placeholder="RG do cliente"   {...register("rg")}  id="rg"   name="rg" />

        <FormLabel htmlFor="tell">Telefone Cliente</FormLabel>
        <Input  placeholder="Número de Telefone do Cliente" {...register("tell")}  id="tell" name="tell" />

       

       

    


        </Flex>



      
        

        </Flex>
       


        <Button w={300} mt="8" colorScheme="yellow" type="submit">EDITAR</Button>
       
        </FormControl>
      </ChakraProvider>
    )
}