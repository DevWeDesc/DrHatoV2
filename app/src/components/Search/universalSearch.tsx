import {ChakraProvider,Flex, Button, Text, FormControl, HStack } from '@chakra-ui/react'
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

export function UniversalSearch({ path}: UniversalSearchProps) {

const { setData } = useContext(DbContext)
 
    const {register, handleSubmit} = useForm()
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

  return (
    <ChakraProvider>
        <Flex direction="row" gap="4">
        <FormControl as="form" onSubmit={handleSubmit(handleSearch)}>
          <HStack>
        <Input label='Cpf do cliente'  {...register("cpf")} name='cpf' />
        <Input  label='Nome do Cliente' {...register('name')} name='name'  />
        <Input   label='Endereço do Cliente' {...register('adress')} name='adress' />
        <Flex gap="2" align="center" direction="column">
        <Text fontWeight="bold">Pesquisa Universal</Text>
        <Button type="submit" colorScheme="whatsapp" minWidth={220}> Filtrar</Button>
        </Flex>
        </HStack>
        </FormControl>
        </Flex>
    </ChakraProvider>
      )
   
}