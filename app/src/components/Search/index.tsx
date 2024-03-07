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

export function SearchComponent({ children, path }: any) {
  const { setDataCustomer } = useContext(DbContext);

  const { register, handleSubmit } = useForm();
  const handleSearch: SubmitHandler<any> = async (values) => {
    if (values.name) {
      try {
        const responseName = await api.get(
          `/customers/search?name=${values.name}`
        );
        setDataCustomer(responseName.data);
        toast.success("Usuário encontrado");
      } catch (error) {
        toast.error("Usuário não encontrado");
      }
    }

    if (values.cpf) {
      try {
        const responseCpf = await api.get(
          `/customers/search?cpf=${values.cpf}`
        );
        setDataCustomer(responseCpf.data);
        toast.success("Usuário encontrado");
      } catch (error) {
        toast.error("Usuário não encontrado");
      }
    }

    if (values.phone) {
      try {
        const responsePhone = await api.get(
          `/customers/search?phone=${values.phone}`
        );
        setDataCustomer(responsePhone.data);
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
            <Input
              label="Código do animal"
              name="Codigo Animal"
              isDisabled={true}
            />
            <Input label="Nome do Cliente" {...register("name")} name="name" />
            <Input label="Nome do animal" name="petName" isDisabled={true} />,
            {children}
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
