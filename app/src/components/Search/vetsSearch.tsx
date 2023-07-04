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

  const handleSearch: SubmitHandler<any> = async (values) => {

    let originDate = values.initialDate;
    let dataSplit = originDate.split('-');
    let startDate = dataSplit[2] + '/' + dataSplit[1] + '/' + dataSplit[0];
   console.log(values)
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

    if (values.codPet) {
      try {
        const responseCodPet = await api.get(
          `${path}?codPet=${values.codPet}`
        );
        setData(responseCodPet.data);
        toast.success("Usuário encontrado");
      } catch (error) {
        toast.error("Usuário não encontrado");
      }
    }

    if (values.petName) {
      try {
        const responsePetName = await api.get(
          `${path}?petName=${values.petName}`
        );
        setData(responsePetName.data);
        toast.success("Usuário encontrado");
      } catch (error) {
        toast.error("Usuário não encontrado");
      }
    }
    
    if(values.initialDate) {
      try {
        const responseInitialData = await api.get(`${path}?initialDate=${startDate}`)
        setData(responseInitialData)
        toast.success("Usuário encontrado");
      } catch (error) {
        toast.error("Usuário não encontrado");
      }
    }

    if(values.finalDate) {
      try {
        const responsefinalData = await api.get(`${path}?finalData=${values.finalData}`)
        setData(responsefinalData)
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
          <VStack>

            <HStack >
            <Input type="date" label='Data Inicial'  {...register("initialDate")} name='initialDate' />
            <Input   type="date" label='Data Final' {...register('finalDate')} name='finalDate'  />
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
        <Input label='Código Animal'  {...register("codPet")} name='codPet' />
        <Input  label='Nome do Cliente' {...register('name')} name='name'  />
        <Input   label='Nome do Animal' {...register('petName')} name='petName' />
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