import {
  ChakraProvider,
  Flex,
  Button,
  Text,
  FormControl,
  HStack,
} from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { api } from "../../lib/axios";
import { Input } from "../admin/Input";
import { useState, useContext } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { DbContext } from "../../contexts/DbContext";

interface UniversalSearchProps {
  path: string;
}

export function LabsSearch({ path }: UniversalSearchProps) {
  const { setLabData } = useContext(DbContext);

  console.log(path);

  const { register, handleSubmit } = useForm();
  const handleSearch: SubmitHandler<any> = async (values) => {
    if (values.name) {
      try {
        const responseName = await api.get(`${path}?name=${values.name}`);
        setLabData(responseName.data);
        toast.success("Exame encontrado");
      } catch (error) {
        toast.error("Exame não encontrado");
      }
    }

    if (values.requesteData) {
      try {
        const responseData = await api.get(
          `${path}?requesteData=${values.requesteData}`
        );
        setLabData(responseData.data);
        toast.success("Exame encontrado");
      } catch (error) {
        toast.error("Exame não encontrado");
      }
    }

    if (values.petName) {
      try {
        const responsePetName = await api.get(
          `${path}?petName=${values.petName}`
        );
        setLabData(responsePetName.data);
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
            <Input
              label="Data de Solicitação"
              {...register("requesteData")}
              name="requesteData"
            />
            <Input label="Nome do Exame" {...register("name")} name="name" />
            <Input
              label="Nome do Animal"
              {...register("petName")}
              name="petName"
            />
            <Flex gap="2" align="center" direction="column">
              <Text fontWeight="bold">Pesquisa Universal</Text>
              <Button type="submit" colorScheme="whatsapp" minWidth={220}>
                {" "}
                Filtrar
              </Button>
            </Flex>
          </HStack>
        </FormControl>
      </Flex>
    </ChakraProvider>
  );
}
