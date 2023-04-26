import {
  ChakraProvider,
  Flex,
  FormControl,
  FormLabel,
  Button,
  VStack, Textarea,
  Text
} from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "../admin/Input";
interface CreateNewPetProps {
  name: string;
}
export function CreateMedicineForm() {
  const { register, handleSubmit } = useForm();

  const handleCreateNewMedicine: SubmitHandler<CreateNewPetProps> = async (
    values
  ) => {
    console.log(values);
  };
  return (
    <ChakraProvider>
      <FormControl onSubmit={handleSubmit(handleCreateNewMedicine as any)}>
        <Flex w="100%" p="4" justify="center">
          <Flex direction="column" gap="4">
            <FormLabel htmlFor="name">Grupo</FormLabel>
            <Input
              {...register("name")}
              id="name"
              type="number"
              maxWidth={320}
              name="name"
            />

            <FormLabel htmlFor="crm">Nome</FormLabel>
            <Input
              {...register("crm")}
              id="crm"
              type="number"
              maxWidth={320}
              name="crm"
            />

            <VStack>
              <Text>Substância</Text>
              <Textarea
                maxWidth={320}
                {...register("plant")}
                bgColor="green.50"
                placeholder="Digite a Substância aqui"
              />
            </VStack>

            <FormLabel htmlFor="plant">Apresentação</FormLabel>
            <Input
              {...register("plant")}
              id="plant"
              type="text"
              maxWidth={320}
              name="plant"
            />

            <VStack>
              <Text>Posologia</Text>
              <Textarea
                maxWidth={320}
                {...register("plant")}
                bgColor="green.50"
                placeholder="Digite a posologia aqui"
              />
            </VStack>

            <FormLabel htmlFor="plant">Quantidade em Estoque</FormLabel>
            <Input id="plant" type="number" maxWidth={320} name="plant" />

            <Button maxWidth={320} mt="14" colorScheme="whatsapp" type="submit">
              Cadastrar
            </Button>
          </Flex>
        </Flex>
      </FormControl>
    </ChakraProvider>
  );
}
