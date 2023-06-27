import {ChakraProvider,Flex, Button, Text, FormControl, HStack, VStack, Checkbox, FormLabel } from '@chakra-ui/react'
import { SubmitHandler, useForm } from "react-hook-form";
import { api } from "../../lib/axios";
import { Input } from "../admin/Input";
import { useState, useContext } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { DbContext } from '../../contexts/DbContext';

interface UniversalSearchProps {
    path: string;
}

export function VetsSearch({ path}: UniversalSearchProps) {

const { setData } = useContext(DbContext)
 
    const {register, handleSubmit} = useForm()

    /*
  const handleSearch: SubmitHandler<any> = async (values) => {
    if (values.name) {
      try {
        const responseName = await api.get(
          `${path}?name=${values.name}`
        );
        setData(responseName.data);
        toast.success("Usuário encontrado");
      } catch (error) {
        toast.error("Usuário não encontrado");
      }
    }

    if (values.cpf) {
      try {
        const responseCpf = await api.get(
          `${path}?cpf=${values.cpf}`
        );
        setData(responseCpf.data);
        toast.success("Usuário encontrado");
      } catch (error) {
        toast.error("Usuário não encontrado");
      }
    }

    if (values.adress) {
      try {
        const responsePhone = await api.get(
          `${path}?adress=${values.adress}`
        );
        setData(responsePhone.data);
        toast.success("Usuário encontrado");
      } catch (error) {
        toast.error("Usuário não encontrado");
      }
    }
  };
*/
  return (
    <ChakraProvider>
        <Flex direction="row" gap="4">
        <FormControl as="form" >
          <VStack>

            <HStack >
            <Input type="date" label='Data Inicial'  {...register("codPet")} name='cpf' />
            <Input   type="date" label='Data Final' {...register('name')} name='name'  />


            <Flex pl="4" direction="column" gap={4}>

            <HStack>
              <Checkbox borderColor="gray.900" />
              <FormLabel>FINALIZADOS</FormLabel>
              </HStack>
              <HStack>
              <Checkbox borderColor="gray.900" />
              <FormLabel>INTERNADOS</FormLabel>
              </HStack>
             
              
            </Flex>
            </HStack>

            




          <HStack>
        <Input label='Código Animal'  {...register("codPet")} name='cpf' />
        <Input  label='Nome do Cliente' {...register('name')} name='name'  />
        <Input   label='Nome do Animal' {...register('petName')} name='adress' />
        <Flex gap="2" align="center" direction="column">
        <Text fontWeight="bold">Pesquisa Universal</Text>
        <Button type="submit" colorScheme="whatsapp" minWidth={220}> Filtrar</Button>
        </Flex>
        </HStack>

          </VStack>
       
        </FormControl>
        </Flex>
    </ChakraProvider>
      )
}