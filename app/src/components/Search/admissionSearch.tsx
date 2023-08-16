import {
  ChakraProvider,
  Flex,
  Button,
  Text,
  FormControl,
  HStack,
  VStack,
  Checkbox,
  FormLabel,
} from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { api } from "../../lib/axios";
import { Input } from "../admin/Input";
import { useState, useContext } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { DbContext } from "../../contexts/DbContext";
import convertData from "../../helpers/convertData";

interface UniversalSearchProps {
  path: string;
}

export function AdmissionSearch({ path }: UniversalSearchProps) {
  const { setData, data } = useContext<any>(DbContext);

  const { register, handleSubmit } = useForm();

  const handleSearch: SubmitHandler<any> = async (values) => {
    let startDate = convertData(values.initialData);
    let endDate = convertData(values.finalData);

    let response;

    switch (true) {
      case !!values.name:
        response = await api.get(`filtredquery?name=${values.name}`);
        break;
      case !!values.codPet:
        response = await api.get(`filtredquery?codPet=${values.codPet}`);
        break;
      case !!values.petName:
        response = await api.get(`filtredquery?petName=${values.petName}`);
        break;
      case !!values.initialData:
        response = await api.get(
          `filtredquery?initialData=${startDate}&finalData=${endDate}`
        );
        break;
      case !!values.finalData:
        response = await api.get(
          `filtredquery?initialData=${startDate}&finalData=${endDate}`
        );
        break;
    }
    setData(response?.data);
  };

  console.log(data);
  return (
    <ChakraProvider>
      <Flex direction="row" gap="4">
        <FormControl as="form" onSubmit={handleSubmit(handleSearch)}>
          <VStack>
            <HStack>
              <Input
                label="Nome do Cliente"
                {...register("name")}
                name="name"
              />
              <Input
                label="Nome do Animal"
                {...register("petName")}
                name="petName"
              />
              <Input
                label="Código Animal"
                {...register("codPet")}
                name="codPet"
              />

              <Flex gap="2" align="center" direction="column">
                <Text fontWeight="bold">Pesquisa Universal</Text>
                <Button type="submit" colorScheme="whatsapp" minWidth={220}>
                  {" "}
                  Filtrar
                </Button>
              </Flex>
            </HStack>
          </VStack>
        </FormControl>
      </Flex>
    </ChakraProvider>
  );
}
