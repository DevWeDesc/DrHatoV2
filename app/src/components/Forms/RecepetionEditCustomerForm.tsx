import {
  ChakraProvider,
  Flex,
  FormControl,
  FormLabel,
  Button,
  VStack,
  Text,
  RadioGroup,
  Radio,
  HStack,
  Select,
} from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { api } from "../../lib/axios";
import { Input } from "../admin/Input";
import { toast } from "react-toastify";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { object, string, date } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

interface CreateNewClienteProps {
  name: string;
  adress: string;
  phone: string;
  kindPerson: string;
  cpf: string;
  email: string;
  birthday: Date | string | number;
  cep: string;
  district: string;
  tell: string;
  rg: string;
  vetPreference: string;
  state: string;
  neighbour: string;
}

const customerSchema = object({
  name: string().required("Nome é Obrigatório"),
  adress: string().required("Endereço é Obrigatório"),
  district: string().optional(),
  email: string().required("Email é Obrigatório"),
  birthday: date().required("Data de Nascimento é Obrigatório").typeError("Data de Nascimento é Obrigatório"),
  phone: string().required("Telefone é Obrigatório"),
  tell: string().optional(),
  cpf: string().required("CPF é Obrigatório"),
  rg: string().optional(),
  cep: string().required("Cep é Obrigatório"),
  // howKnowUs: string().required("Como nos conheceu é Obrigatório"),
  kindPerson: string().required("Pessoa Fisica ou Juridica é Obrigatório"),
  state: string().required("Estado é Obrigatório"),
  neighbour: string().required("Bairro é Obrigatório"),
  complement: string().optional(),
  number: string().optional(),
});

export function ReceptionEditCustomerForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(customerSchema),
  });
  const { id } = useParams<{ id: string }>();
  const [errorInput, setErrorInput] = useState(0);
  const handleCreateNewCliente: SubmitHandler<CreateNewClienteProps> = async (
    values
  ) => {
    const data = {
      name: values.name,
      adress: values.adress,
      district: values.district,
      email: values.email,
      birthday: values.birthday.toString(),
      phone: values.phone,
      tell: values.tell,
      cpf: values.cpf,
      rg: values.rg,
      cep: values.cep,
      // howKnowUs: howKnow,
      kindPerson: values.kindPerson,
      state: values.state,
      neighbour: values.neighbour,
    };
    try {
      // await api.put(`/customer/${id}`, data);
      toast.success("Usuário Editado com sucesso");
      console.log(data);
    } catch (error) {
      toast.error("Falha ao editar usuário");
      console.log(error);
    }
  };
  return (
    <ChakraProvider>
      <FormControl
        as="form"
        onSubmit={handleSubmit(handleCreateNewCliente as any)}
        p={10}
      >
        <Flex
          w="100%"
          gap="2"
          pt={5}
          flexDirection={"column"}
          justifyContent={"start"}
        >
          <Text
            mt="2"
            textTransform={"uppercase"}
            textAlign={"start"}
            fontWeight="bold"
          >
            Pessoa Fisica ou Juridica ?
          </Text>

          <RadioGroup>
            <Flex gap="2" mt="2">
              <Radio
                mb="2"
                borderColor="teal.800"
                colorScheme="green"
                value="Fisica"
                {...register("kindPerson")}
              >
                PESSOA FÍSICA
              </Radio>
              <Radio
                mb="2"
                borderColor="teal.800"
                colorScheme="green"
                value="Juridica"
                {...register("kindPerson")}
              >
                PESSOA JURÍDICA
              </Radio>
            </Flex>
            <Text color="red.500" fontWeight="bold" textAlign="left">
              {errors?.kindPerson?.message}
            </Text>
          </RadioGroup>
        </Flex>
        <Flex w="100%" gap="2" pt={5}>
          <Flex w="50%" direction="column">
            <FormLabel
              color="red.400"
              textAlign="left"
              fontWeight="bold"
              htmlFor="name"
              w="100%"
              fontSize="17"
              mb="0"
            >
              * Nome Cliente
            </FormLabel>
            <Input
              w="100%"
              placeholder="Nome do cliente"
              {...register("name")}
              id="name"
              minWidth={320}
              name="name"
            />
            <Text color="red.500" fontWeight="bold" textAlign="left">
              {errors?.name?.message}
            </Text>
          </Flex>
          <Flex w="50%" direction="column">
            <FormLabel
              color="red.400"
              textAlign="left"
              fontWeight="bold"
              htmlFor="cpf"
              w="100%"
              fontSize="17"
              mb="0"
            >
              * CPF do Cliente
            </FormLabel>
            <Input
              w="100%"
              placeholder="CPF do cliente"
              {...register("cpf")}
              id="cpf"
              minWidth={320}
              name="cpf"
            />
            <Text color="red.500" fontWeight="bold" textAlign="left">
              {errors?.cpf?.message}
            </Text>
          </Flex>
        </Flex>
        <Flex w="100%" gap="2" pt={5}>
          <Flex w="50%" direction="column">
            <FormLabel
              color="red.400"
              textAlign="left"
              fontWeight="bold"
              htmlFor="email"
              w="100%"
              fontSize="17"
              mb="0"
            >
              * E-mail do cliente
            </FormLabel>
            <Input
              w="100%"
              placeholder="E-mail do cliente"
              {...register("email")}
              id="email"
              minWidth={320}
              name="email"
            />
            <Text color="red.500" fontWeight="bold" textAlign="left">
              {errors?.email?.message}
            </Text>
          </Flex>
          <Flex w="50%" direction="column">
            <FormLabel
              color="red.400"
              textAlign="left"
              fontWeight="bold"
              htmlFor="birthday"
              w="100%"
              fontSize="17"
              mb="0"
            >
              * Dados de nascimento
            </FormLabel>
            <Input
              w="100%"
              placeholder="Dados de nascimento"
              {...register("birthday")}
              id="birthday"
              minWidth={320}
              name="birthday"
              type="date"
            />
            <Text color="red.500" fontWeight="bold" textAlign="left">
              {errors?.birthday?.message}
            </Text>
          </Flex>
        </Flex>
        <Flex w="100%" gap="2" pt={5}>
          <Flex w="50%" direction="column">
            <FormLabel
              color="red.400"
              textAlign="left"
              fontWeight="bold"
              htmlFor="phone"
              w="100%"
              fontSize="17"
              mb="0"
            >
              * Telefone Celular do Cliente
            </FormLabel>
            <Input
              w="100%"
              placeholder="Número Celular do Cliente"
              {...register("phone")}
              id="phone"
              minWidth={320}
              name="phone"
            />
            <Text color="red.500" fontWeight="bold" textAlign="left">
              {errors?.phone?.message}
            </Text>
          </Flex>
          <Flex w="50%" direction="column">
            <FormLabel
              textAlign="left"
              htmlFor="tell"
              w="100%"
              fontSize="17"
              mb="0"
            >
              Telefone Fixo do Cliente
            </FormLabel>
            <Input
              w="100%"
              placeholder="Número de Telefone do Cliente"
              {...register("tell")}
              id="tell"
              minWidth={320}
              name="tell"
            />
            <Text color="red.500" fontWeight="bold" textAlign="left">
              {errors?.tell?.message}
            </Text>
          </Flex>
        </Flex>
        <Flex w="100%" gap="2" pt={5}>
          <Flex w="50%" direction="column">
            <FormLabel
              textAlign="left"
              htmlFor="name"
              w="100%"
              fontSize="17"
              mb="0"
            >
              RG do cliente
            </FormLabel>
            <Input
              w="100%"
              placeholder="RG do cliente"
              {...register("rg")}
              id="rg"
              minWidth={320}
              name="rg"
            />
            <Text color="red.500" fontWeight="bold" textAlign="left">
              {errors?.rg?.message}
            </Text>
          </Flex>
          <Flex w="50%" direction="column">
            <FormLabel
              color="red.400"
              textAlign="left"
              fontWeight="bold"
              htmlFor="cep"
              w="100%"
              fontSize="17"
              mb="0"
            >
              * CEP do Cliente
            </FormLabel>
            <Input
              w="100%"
              placeholder="CEP do Cliente"
              {...register("cep")}
              id="cep"
              minWidth={320}
              name="cep"
            />
            <Text color="red.500" fontWeight="bold" textAlign="left">
              {errors?.cep?.message}
            </Text>
          </Flex>
        </Flex>
        <Flex w="100%" gap="2" pt={5}>
          <Flex direction="column" w="33%">
            <FormLabel
              color="red.400"
              htmlFor="State"
              mb="0"
              fontSize="17"
              w="100%"
              fontWeight="bold"
            >
              * Estado
            </FormLabel>
            <Select
              bg="white"
              borderColor="gray.900"
              {...register("state")}
              name="state"
              // value={estado}
              // onChange={(e) => setEstado(e.target.value)}
            >
              <option value="SP">SP</option>
              <option value="AC">AC</option>
              <option value="AL">AL</option>
              <option value="AP">AP</option>
              <option value="AM">AM</option>
              <option value="BA">BA</option>
              <option value="CE">CE</option>
              <option value="DF">DF</option>
              <option value="ES">ES</option>
              <option value="GO">GO</option>
              <option value="MA">MA</option>
              <option value="MT">MT</option>
              <option value="MS">MS</option>
              <option value="MG">MG</option>
              <option value="PA">PA</option>
              <option value="PB">PB</option>
              <option value="PR">PR</option>
              <option value="PE">PE</option>
              <option value="PI">PI</option>
              <option value="RJ">RJ</option>
              <option value="RN">RN</option>
              <option value="RS">RS</option>
              <option value="RO">RO</option>
              <option value="RR">RR</option>
              <option value="SC">SC</option>
              <option value="SE">SE</option>
              <option value="TO">TO</option>
            </Select>
            {errorInput > 0 && (
              <Text textAlign="start" color="red.500" fontWeight="bold">
                {errors?.state?.message} 
              </Text>
            )}
          </Flex>
          <Flex w="33%" direction="column">
            <FormLabel
              textAlign="left"
              fontWeight=""
              htmlFor="district"
              w="100%"
              fontSize="17"
              mb="0"
            >
              Cidade
            </FormLabel>
            <Input
              w="100%"
              placeholder="Cidade do Cliente"
              {...register("district")}
              id="district"
              minWidth={320}
              name="district"
            />
            <Text color="red.500" fontWeight="bold" textAlign="left">
              {errors?.district?.message}
            </Text>
          </Flex>
          <Flex w="33%" direction="column">
            <FormLabel
              color="red.400"
              textAlign="left"
              fontWeight="bold"
              htmlFor="adress"
              w="100%"
              fontSize="17"
              mb="0"
            >
              * Endereço
            </FormLabel>
            <Input
              w="100%"
              placeholder="Endereço do cliente"
              {...register("adress")}
              id="adress"
              minWidth={320}
              name="adress"
            />
            <Text color="red.500" fontWeight="bold" textAlign="left">
              {errors?.adress?.message}
            </Text>
          </Flex>
        </Flex>
        <Flex w="100%" gap="2" pt={5}>
          <Flex w="33%" direction="column">
            <FormLabel
              textAlign="left"
              htmlFor="number"
              w="100%"
              fontSize="17"
              mb="0"
            >
              Número
            </FormLabel>
            <Input
              w="100%"
              placeholder="Número"
              {...register("number")}
              id="number"
              minWidth={320}
              name="number"
            />
            <Text color="red.500" fontWeight="bold" textAlign="left">
              {errors?.number?.message}
            </Text>
          </Flex>
          <Flex w="33%" direction="column">
            <FormLabel
              color="red.400"
              textAlign="left"
              fontWeight="bold"
              htmlFor="neighbour"
              w="100%"
              fontSize="17"
              mb="0"
            >
              * Bairro
            </FormLabel>
            <Input
              w="100%"
              placeholder="Bairro do Cliente"
              {...register("neighbour")}
              id="neighbour"
              minWidth={320}
              name="neighbour"
            />
            <Text color="red.500" fontWeight="bold" textAlign="left">
              {errors?.neighbour?.message}
            </Text>
          </Flex>
          <Flex w="33%" direction="column">
            <FormLabel
              textAlign="left"
              htmlFor="complement"
              w="100%"
              fontSize="17"
              mb="0"
            >
              Complemento
            </FormLabel>
            <Input
              w="100%"
              placeholder="Complemento"
              {...register("complement")}
              id="complement"
              minWidth={320}
              name="complement"
            />
            <Text color="red.500" fontWeight="bold" textAlign="left">
              {errors?.complement?.message}
            </Text>
          </Flex>
        </Flex>
        <Flex width="100%" justify="center" marginTop={10}>
        <Flex justify="center" gap="4" w="100%" align="center">
              <Text fontWeight="bold">Campos marcados com a cor</Text>
              <Flex rounded="full" w="28px" h="28px" bgColor="red.400"></Flex>
              <Text fontWeight="bold">São obrigatórios</Text>
            </Flex>
        </Flex>
        <Button w={300} mt="8" colorScheme="yellow" type="submit">
          EDITAR
        </Button>
      </FormControl>
    </ChakraProvider>
  );
}
