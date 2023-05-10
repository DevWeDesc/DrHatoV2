import {
  ChakraProvider,
  Flex,
  FormControl,
  FormLabel,
  Button,
  Box,
  Text,
} from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { api } from "../../lib/axios";
import { Input } from "../admin/Input";
import { useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

interface CreateNewClienteProps {
  id: string | number;
  name: string;
  adress: string;
  phone: string;
  cpf: string;
  email: string;
  birthday: string;
}

export function SearchConsultForm() {
  const [customerFound, setCustomerFound] = useState<
    Partial<CreateNewClienteProps>
  >({});

  const { register, handleSubmit } = useForm();
  const handleSearchNewCliente: SubmitHandler<CreateNewClienteProps> = async (
    values
  ) => {
    if (values.name) {
      try {
        const responseName = await api.get(
          `/customers/search?name=${values.name}`
        );
        setCustomerFound(responseName.data);
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
        setCustomerFound(responseCpf.data);
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
        setCustomerFound(responsePhone.data);
        toast.success("Usuário encontrado");
      } catch (error) {
        toast.error("Usuário não encontrado");
      }
    }
  };
  return (
    <ChakraProvider>
      <FormControl
        as="form"
        onSubmit={handleSubmit(handleSearchNewCliente as any)}
      >
        <Flex direction="column" align="center" justify="flex-start">
          <FormLabel htmlFor="name">Nome Cliente</FormLabel>
          <Input {...register("name")} id="name" maxWidth={320} name="name" />

          <FormLabel htmlFor="cpf">Cpf</FormLabel>
          <Input {...register("cpf")} id="cpf" maxWidth={320} name="cpf" />

          <FormLabel htmlFor="phone">Número Cliente</FormLabel>
          <Input
            {...register("phone")}
            id="phone"
            maxWidth={320}
            name="phone"
          />
          <Button mt="8" colorScheme="whatsapp" type="submit">
            Pesquisar
          </Button>
        </Flex>

        <Box>
          <Text mt="8" fontSize="24px" fontWeight="bold">
            Cliente Encontrado:
          </Text>
          <Text mt="8" fontSize="16px" fontWeight="bold">
            {customerFound ? (
              <Link
                to={`/Recepcao/Consultas/Clientes/${customerFound.id}`}
              >
                {customerFound.name}
              </Link>
            ) : (
              ""
            )}
          </Text>
        </Box>
      </FormControl>
    </ChakraProvider>
  );
}
