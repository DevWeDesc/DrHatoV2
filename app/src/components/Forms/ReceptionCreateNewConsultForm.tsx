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
interface CreateNewClienteProps {
  name: string;
  adress: string;
  phone: string;
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
export function ReceptionCreateNewConsultForm() {
  const { register, handleSubmit } = useForm();
  const [howKnow, setHowKnow] = useState("");
  const [kindPerson, setKindPerson] = useState("");
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
      howKnowUs: howKnow,
      kindPerson: kindPerson,
      state: values.state,
      neighbour: values.neighbour,
    };
    try {
      await api.post("/customers", data);
      toast.success("Usuário cadastrado");
      console.log(data);
    } catch (error) {
      toast.error("Falha ao cadastrar novo usuário");
      console.log(error);
    }
  };
  return (
    <ChakraProvider>
      <Text
        fontSize="30"
        fontWeight="bold"
        w="100%"
        textAlign="center"
        overflow="none"
      >
        Cadastro de Clientes
      </Text>
      <Flex w="100">
        <FormControl
          display="flex"
          mt="5"
          as="form"
          onSubmit={handleSubmit(handleCreateNewCliente as any)}
        >
          <Flex
            style={{ overflow: "none" }}
            direction="column"
            className="DADOS"
            align="left"
            rounded={8}
            mx="10"
            w="60%"
          >
            <Flex justify="space-between" style={{ overflow: "none" }}>
              <Flex direction="column" w="100%">
                <FormLabel
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
              </Flex>
            </Flex>
            <Flex
              w="100%"
              justifyContent="space-between"
              style={{ overflow: "none" }}
            >
              <Flex
                direction="column"
                w="50%"
                mr="2"
                mt="4"
                style={{ overflow: "none" }}
              >
                <FormLabel
                  textAlign="left"
                  fontWeight="bold"
                  htmlFor="phone"
                  fontSize="17"
                  mb="0"
                >
                  * Telefone Celular do Cliente
                </FormLabel>
                <Input
                  placeholder="Número de Celular do Cliente"
                  {...register("phone")}
                  id="phone"
                  name="phone"
                />
              </Flex>
              <Flex direction="column" w="50%" mt="4">
                <FormLabel
                  textAlign="left"
                  fontWeight="bold"
                  htmlFor="birthday"
                  mb="0"
                  fontSize="17"
                >
                  * Data de nascimento
                </FormLabel>
                <Input
                  {...register("birthday")}
                  id="birthday"
                  name="birthday"
                  type="date"
                />
              </Flex>
            </Flex>
            <Flex w="100%" alignItems="center" gap="2" mt="4">
              <Flex direction="column" w="50%" justifyContent="center">
                <FormLabel textAlign="left" htmlFor="tell" mb="0" fontSize="17">
                  Telefone Fixo do Cliente
                </FormLabel>
                <Input
                  placeholder="Número de Telefone do Cliente"
                  {...register("tell")}
                  id="tell"
                  name="tell"
                />
              </Flex>
              <Flex direction="column" w="50%">
                <FormLabel
                  textAlign="left"
                  fontWeight="bold"
                  htmlFor="email"
                  mb="0"
                  fontSize="17"
                >
                  * E-mail do cliente
                </FormLabel>
                <Input
                  placeholder="E-mail do Cliente"
                  {...register("email")}
                  id="email"
                  name="email"
                />
              </Flex>
            </Flex>
            <Flex align="center" gap="2" mt="4">
              <Flex direction="column" w="50%">
                <FormLabel
                  textAlign="left"
                  fontWeight="bold"
                  htmlFor="cpf"
                  mb="0"
                  fontSize="17"
                >
                  * CPF do cliente
                </FormLabel>
                <Input
                  placeholder="CPF Do cliente"
                  {...register("cpf")}
                  id="cpf"
                  name="cpf"
                />
              </Flex>
              <Flex direction="column" w="50%" justifyContent="center">
                <FormLabel textAlign="left" htmlFor="rg" mb="0" fontSize="17">
                  RG do cliente
                </FormLabel>
                <Input
                  placeholder="RG do cliente"
                  {...register("rg")}
                  id="rg"
                  name="rg"
                />
              </Flex>
            </Flex>

            <Flex width="100%" justify="center" direction="column">
              <Flex
                width="100%"
                direction="column"
                className="ENDEREÇO"
                align="center"
              >
                <Flex
                  width="100%"
                  direction="column"
                  align="center"
                  rounded={8}
                  mt="4"
                >
                  <Flex width="100%" gap="2">
                    <Flex direction="column" w="33%">
                      <FormLabel
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
                    </Flex>

                    <Flex direction="column" w="33%">
                      <FormLabel
                        fontWeight="bold"
                        htmlFor="cep"
                        mb="0"
                        fontSize="17"
                        w="100%"
                      >
                        * CEP do Cliente
                      </FormLabel>
                      <Input
                        placeholder="Cep do Cliente"
                        {...register("cep")}
                        id="cep"
                        name="cep"
                        type="text"
                      />
                    </Flex>
                    <Flex direction="column" w="33%">
                      <FormLabel
                        htmlFor="district"
                        fontSize="17"
                        textAlign="left"
                        mb="0"
                        w="100%"
                      >
                        Cidade
                      </FormLabel>
                      <Input
                        placeholder="Cidade do Cliente"
                        {...register("district")}
                        name="district"
                      />
                    </Flex>
                  </Flex>
                  <Flex w="100%" mt="4" gap="2">
                    <Flex direction="column" w="55%">
                      <FormLabel
                        fontWeight="bold"
                        htmlFor="adress"
                        mb="0"
                        fontSize="17"
                      >
                        * Endereço
                      </FormLabel>
                      <Input
                        placeholder="Endereço do cliente"
                        {...register("adress")}
                        id="adress"
                        name="adress"
                      />
                    </Flex>
                    <Flex direction="column" w="25%">
                      <FormLabel
                        fontWeight="bold"
                        mb="0"
                        fontSize="17"
                        htmlFor="neighbour"
                      >
                        * Bairro
                      </FormLabel>
                      <Input
                        mt="0"
                        placeholder="Bairro do Cliente"
                        {...register("neighbour")}
                        name="neighbour"
                      />
                    </Flex>
                    <Flex direction="column" w="20%">
                      <FormLabel htmlFor="complement" mb="0" fontSize="17">
                        Complemento
                      </FormLabel>
                      <Input
                        placeholder="Complemento"
                        {...register("complement")}
                        id="complement"
                        name="complement"
                      />
                    </Flex>
                  </Flex>
                </Flex>
              </Flex>
            </Flex>

            <Button w="100%" mt="8" colorScheme="whatsapp" type="submit" py="8">
              Cadastrar
            </Button>
          </Flex>
          <Flex direction="column" className="COMO NOS CONHECEU">
            <Flex
              direction="column"
              justifyContent="flex-start"
              bg="white"
              py="4"
              px="8"
              rounded="8"
              shadow="0px 4px 8px rgba(0, 0, 0, 0.2)"
              h="100%"
            >
              <Text fontWeight="bold" textAlign="center" fontSize="20" mb="5">
                * Como nos conheceu ?
              </Text>
              <Flex w="100%" h="100%">
                <RadioGroup
                  onChange={setHowKnow}
                  value={howKnow}
                  h="100%"
                  display="flex"
                  flexDirection="column"
                  justifyContent="space-between"
                >
                  <Radio
                    display="flex"
                    justifyContent="left"
                    mb="2"
                    borderColor="teal.800"
                    colorScheme="green"
                    value="Petshop"
                  >
                    Cliente do PETSHOP
                  </Radio>
                  <Radio
                    display="flex"
                    justifyContent="left"
                    mb="2"
                    borderColor="teal.800"
                    colorScheme="green"
                    value="Facebook"
                  >
                    Facebook
                  </Radio>
                  <Radio
                    display="flex"
                    justifyContent="left"
                    mb="2"
                    borderColor="teal.800"
                    colorScheme="green"
                    value="FachadaHospital"
                  >
                    Fachada Hospital
                  </Radio>
                  <Radio
                    display="flex"
                    justifyContent="left"
                    mb="2"
                    borderColor="teal.800"
                    colorScheme="green"
                    value="Indicação"
                  >
                    Indicação de amigo
                  </Radio>
                  <Radio
                    display="flex"
                    justifyContent="left"
                    mb="2"
                    borderColor="teal.800"
                    colorScheme="green"
                    value="Instragram"
                  >
                    Instagram
                  </Radio>
                  <Radio
                    display="flex"
                    justifyContent="left"
                    mb="2"
                    borderColor="teal.800"
                    colorScheme="green"
                    value="ClienteHato"
                  >
                    Já e cliente HATO
                  </Radio>
                  <Radio
                    display="flex"
                    justifyContent="left"
                    mb="2"
                    borderColor="teal.800"
                    colorScheme="green"
                    value="PlacaRua"
                  >
                    Placa de Rua
                  </Radio>
                  <Radio
                    display="flex"
                    justifyContent="left"
                    mb="2"
                    borderColor="teal.800"
                    colorScheme="green"
                    value="SiteBusca"
                  >
                    Site de Busca
                  </Radio>
                  <Radio
                    display="flex"
                    justifyContent="left"
                    mb="2"
                    borderColor="teal.800"
                    colorScheme="green"
                    value="Twitter"
                  >
                    Twitter
                  </Radio>{" "}
                  <Radio
                    display="flex"
                    justifyContent="left"
                    mb="2"
                    borderColor="teal.800"
                    colorScheme="green"
                    value="Outros"
                  >
                    Outros/Indicação
                  </Radio>
                </RadioGroup>
              </Flex>
            </Flex>
          </Flex>
        </FormControl>
      </Flex>
    </ChakraProvider>
  );
}

{
  /*
  <Text fontWeight="bold" fontSize="20" mt="5">
                Campos marcados com * São obrigatórios
              </Text>
  <Flex
direction="column"
align="center"
w="30%"
style={{ overflow: "none" }}
>
<Text mt="2" textAlign="left" fontWeight="bold" fontSize="20">
  Pessoa Fisica ou Juridica ?
</Text>

<RadioGroup
  onChange={setKindPerson}
  value={kindPerson}
  style={{ overflow: "none" }}
>
  <Flex gap="2" mt="2">
    <Radio
      mb="2"
      borderColor="teal.800"
      colorScheme="green"
      value="FÍSICA"
    >
      PESSOA FÍSICA
    </Radio>
    <Radio
      mb="2"
      borderColor="teal.800"
      colorScheme="green"
      value="JURÍDICA"
    >
      PESSOA JURÍDICA
    </Radio>
  </Flex>
</RadioGroup>
</Flex>*/
}
