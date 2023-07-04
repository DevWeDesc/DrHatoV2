import {
  ChakraProvider,
  Flex,
  FormControl,
  FormLabel,
  Button,
  VStack,
  Textarea,
  Select,
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
        <Flex w="100%" p="4" justify="end">
          <Flex direction="column" gap="4" align="baseline" w="100%">
            <Flex w="100%" align="center">
              <FormLabel htmlFor="name" w="10.3rem">
                <strong> Grupo</strong>
              </FormLabel>
              <Select
                bgColor="white"
                border="1px solid black"
                {...register("name")}
                id="name"
                w="100%"
                name="name"
              >
                <option value="selecione">
                  Selecione o grupo do medicamento
                </option>
                <option value="option1">Amamentação / Desmame</option>
              </Select>
            </Flex>
            <Flex w="100%" align="center">
              <FormLabel htmlFor="crm" w="10.3rem">
                <strong> Nome</strong>
              </FormLabel>
              <Input
                {...register("crm")}
                id="crm"
                type="text"
                w="100%"
                name="crm"
              />
            </Flex>
            <VStack w="100%">
              <Flex w="100%">
                <FormLabel w="10.3rem">
                  <strong> Substância</strong>
                </FormLabel>
                <Textarea
                  w="100%"
                  {...register("plant")}
                  bgColor="green.50"
                  placeholder="Digite a Substância aqui"
                />
              </Flex>
            </VStack>
            <Flex w="100%" align="center">
              <FormLabel htmlFor="plant" w="10.3rem">
                <strong> Apresentação</strong>
              </FormLabel>
              <Input
                {...register("plant")}
                id="plant"
                type="text"
                w="100%"
                name="plant"
              />
            </Flex>

            <VStack w="100%">
              <Flex w="100%">
                <FormLabel w="10.3rem">
                  {" "}
                  <strong>Posologia</strong>
                </FormLabel>
                <Textarea
                  w="100%"
                  {...register("plant")}
                  bgColor="green.50"
                  placeholder="Digite a posologia aqui"
                />
              </Flex>
            </VStack>
            <Flex w="100%" align="center">
              <FormLabel htmlFor="plant" w="10rem" pr="20px">
                <strong>Quantidade em Estoque</strong>
              </FormLabel>
              <Input id="plant" type="number" w="100%" name="plant" />
            </Flex>
            <Flex w="100%" justify="end">
              <Button maxWidth={320} colorScheme="whatsapp" type="submit">
                Cadastrar
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </FormControl>
    </ChakraProvider>
  );
}
