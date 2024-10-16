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
  Grid,
} from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { api } from "../../lib/axios";
import { Input } from "../admin/Input";
import { useState, useContext } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { DbContext } from "../../contexts/DbContext";
import convertData from "../../helpers/convertData";
import { FaStar } from "react-icons/fa";

interface UniversalSearchProps {
  path: string;
}

export function PaymentsSearch({ path }: UniversalSearchProps) {
  const { setDataCustomer, setDataPet, dataCustomer, dataPet } =
    useContext(DbContext);

  const { register, handleSubmit } = useForm();

  const handleSearch: SubmitHandler<any> = async (values) => {
    let startDate = convertData(values.initialData);
    let endDate = convertData(values.finalData);

    let response;

    switch (true) {
      case !!values.typePaymentClient:
        response = await api.get(`filtredquery?typePayment=${values.name}`);
        setDataCustomer(response?.data);
      case !!values.name:
        response = await api.get(`filtredquery?name=${values.name}`);
        setDataCustomer(response?.data);
        break;
      case !!values.codPet:
        response = await api.get(`filtredquery?codPet=${values.codPet}`);
        setDataPet(response?.data);
        break;
      case !!values.petName:
        response = await api.get(`filtredquery?petName=${values.petName}`);
        setDataPet(response?.data);
        break;
      case !!values.initialData:
        response = await api.get(
          `filtredquery?initialData=${startDate}&finalData=${endDate}`
        );
        setDataCustomer(response?.data);
        break;
      case !!values.finalData:
        response = await api.get(
          `filtredquery?initialData=${startDate}&finalData=${endDate}`
        );
        setDataCustomer(response?.data);
        break;
    }

    console.log("RESPOSTA DATA PET", dataPet);
  };
  0;
  return (
    <ChakraProvider>
      <Flex direction="row" gap="4">
        <FormControl as="form" onSubmit={handleSubmit(handleSearch)}>
          <VStack>
            <HStack>
              <Input
                type="date"
                label="Data Inicial"
                {...register("initialData")}
                name="initialData"
              />
              <Input
                type="date"
                label="Data Final"
                {...register("finalData")}
                name="finalData"
              />
              <Grid
                templateColumns="repeat(2, 1fr)"
                pl="4"
                pt="8"
                alignItems="end"
                columnGap={4}
              >
                <HStack>
                  <Checkbox
                    value={"CRÉDITO"}
                    borderColor="gray.900"
                    {...register("typePaymentClient")}
                    name="typePaymentClient"
                  />
                  <FormLabel pt="2">CRÉDITOS</FormLabel>
                </HStack>
                <HStack>
                  <Checkbox
                    defaultChecked
                    value={"DÉBITO"}
                    borderColor="gray.900"
                    {...register("typePaymentClient")}
                    name="typePaymentClient"
                  />
                  <FormLabel pt="2">DÉBITOS</FormLabel>
                </HStack>
   
              
              </Grid>
            </HStack>
            <HStack>
              <Input
                label="Código Animal"
                {...register("codPet")}
                name="codPet"
              />
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
              <Flex gap="2" align="center" direction="column">
                <Text fontWeight="bold">Pesquisa Universal</Text>
                <Button type="submit" colorScheme="whatsapp" minWidth={220}>
                  {" "}
                  Filtrar
                </Button>
              </Flex>
              
            </HStack>
                <Flex direction="row" align="center" justify="center" gap={8}  >
                  <Text>Legenda:</Text>
          
                  <HStack>        <Text>Vip</Text>
                  <FaStar color="orange" /></HStack>
           
    
                  <HStack><Text>Não Vip</Text>
                  <FaStar color="red" />
                  </HStack>

                
                 
                  
                  
                </Flex>
          </VStack>
        </FormControl>
      </Flex>
    </ChakraProvider>
  );
}
