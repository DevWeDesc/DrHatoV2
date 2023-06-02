import {ChakraProvider,Flex, Button, Text, FormControl, HStack } from '@chakra-ui/react'
import { SubmitHandler, useForm } from "react-hook-form";
import { api } from "../../lib/axios";
import { Input } from "../admin/Input";
import { useState, useContext } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { DbContext } from '../../contexts/DbContext';

interface UniversalSearchProps {
    path: string;
}

export function RecepetionSearch({ path}: UniversalSearchProps) {
const navigate = useNavigate()
const { setCustomers } = useContext(DbContext)
 
    const {register, handleSubmit} = useForm()
  const handleSearch: SubmitHandler<any> = async (values) => {
    if (values.name) {
      try {
        const responseName = await api.get(
          `${path}?name=${values.name}`
        );
        setCustomers(responseName.data);
        toast.success("Exame encontrado");
      } catch (error) {
        toast.error("Exame não encontrado");
      }
    }

    if (values.cpf) {
      try {
        const responseData = await api.get(
          `${path}?cpf=${values.cpf}`
        );
        setCustomers(responseData.data);
        toast.success("Exame encontrado");
      } catch (error) {
        toast.error("Exame não encontrado");
      }
    }

    if (values.rg) {
      try {
        const responserg = await api.get(
          `${path}?rg=${values.rg}`
        );
        setCustomers(responserg.data);
        toast.success("Exame encontrado");
      } catch (error) {
        toast.error("Exame não encontrado");
      }
    }
  };

  return (
    <ChakraProvider>
        <Flex direction="row" gap="4">
        <FormControl as="form" onSubmit={handleSubmit(handleSearch)}>
          <HStack>
        <Input label='Nome do Cliente'  {...register("name")} name='name' />
        <Input  label='CPF do Cliente' {...register('cpf')} name='cpf'  />
        <Input   label='R.G do Cliente' {...register('rg')} name='rg' />  
        <Input isDisabled  label='Código do Animal' {...register('codPet')} name='codPet' />
        <Flex gap="2" align="center" direction="column">
        <Text fontWeight="bold">Pesquisar Clientes</Text>
        <Button type="submit" colorScheme="whatsapp" minWidth={220}> Filtrar</Button>
        </Flex>
        </HStack>
        <Button colorScheme="teal" mt="4"
        onClick={() => navigate("/Recepcao/Create")}
        >Ou adicione um novo Cliente</Button>
        </FormControl>
        </Flex>
    </ChakraProvider>
      )
}