import {
  ChakraProvider,
  Flex,
  Button,
  Text,
  HStack,
  VStack,
} from "@chakra-ui/react";

import { Input } from "../admin/Input";
import { FaStar } from "react-icons/fa";
import { useFormContext } from 'react-hook-form';
import {  normalizePhoneNumber, normalizeCpf } from "../../utils/mask/masks"

interface IQueueSearch {
  name: string;
  cpf: string;
  codCli: string;
  codPet: string;
  telephone: string;
}

export function PaymentFilterSearch() {
  
  const { register } = useFormContext()

  return (
    <ChakraProvider>
      <Flex direction="row" gap="4">
          <VStack>
            <HStack flexDir={"column"}>
              <Input
                label="Nome do Cliente"
                {...register("name")}
                name="name"
              />
              <Input
                label="CPF"
                {...register("cpf", {onChange: e => e.target.value = normalizeCpf(e.target.value)})}
                name="cpf"
              />
              <Input
                label="Cód. Cliente"
                {...register("codCli")}
                name="codCli"
              />
              <Input
                label="Cód. Animal"
                {...register("codPet")}
                name="codPet"
              />
              <Input
                label="Telefone"
                {...register("telephone", {onChange: e => e.target.value = normalizePhoneNumber(e.target.value)})}
                name="telephone"
              />
              <Flex gap="2" mt={6} align="center" direction="column" width={"full"}>
                <Button type="submit" colorScheme="whatsapp" width={"full"}>
                  Filtrar
                </Button>
              </Flex>
            </HStack>
            <Flex direction="row" align="center" justify="center" gap={4}>
              <Text fontWeight={"semibold"}>Legenda:</Text>
            <Flex gap={4}>
              <HStack>
                <FaStar color="orange" />
                <Text>VIP</Text>
              </HStack>
            </Flex>
            </Flex>
          </VStack>
      </Flex>
    </ChakraProvider>
  );
}
