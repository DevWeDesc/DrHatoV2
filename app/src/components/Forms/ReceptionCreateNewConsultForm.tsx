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
import { set, SubmitHandler, useForm } from "react-hook-form";
import { api } from "../../lib/axios";
import { Input } from "../admin/Input";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { CPFInput } from "../InputMasks/CPFinput";
import { RGInput } from "../InputMasks/RGInput";
import { CEPInput } from "../InputMasks/CEPInput";
import { CelularInput } from "../InputMasks/CelularInput";
import { FixedInput } from "../InputMasks/FixedInput";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string, number, date, InferType } from "yup";
import { useNavigate } from "react-router-dom";
import { validateCpf } from "../../helpers/validateCpf";

interface CreateNewClienteProps {
  name: string;
  surname: string;
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

let customerSchema = object({
  name: string().required("Nome é Obrigatório"),
  surname: string().required("Sobrenome é Obrigatório"),
  birthday: string().required("Data de nascimento é Obrigatório"),
  email: string().email("E-mail Invalido").required("E-mail é Obrigatório"),
  //district: string().required("CPF é Obrigatório"),
  //state: string().required("Estado é Obrigatório"),
  //cep: string().required("CEP é Obrigatório"),
  //adress: string().required("Endereço é Obrigatório"),
  //neighbour: string().required("Campo Obrigatório"),
  //howKnowUs: string()),
});
export function ReceptionCreateNewConsultForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(customerSchema),
  });
  const [howKnow, setHowKnow] = useState("");
  const [kindPerson, setKindPerson] = useState("");
  const [CPFValue, setCPFValue] = useState("");
  const [RGValue, setRGValue] = useState("");
  const [CEPValue, setCEPValue] = useState("");
  const [CelularValue, setCelularValue] = useState("");
  const [FixedValue, setFixedValue] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [tamCep, setTamCep] = useState(0);
  const [adressNumber, setAdressNumber] = useState("");
  const [errorInput, setErrorInput] = useState(0);
  const navigate = useNavigate();

  if (tamCep >= 9)
    fetch(`https://viacep.com.br/ws/${CEPValue}/json/`)
      .then((response) => response.json())
      .then((data) => {
        setLogradouro(data.logradouro);
        setBairro(data.bairro);
        setCidade(data.localidade);
        setEstado(data.uf);
        setTamCep(0);
      })
      .catch((error) => {
        //console.error("Erro ao consultar o CEP:", error);
      });

  function setErro() {
    if (errorInput === 0) {
      setErrorInput(errorInput + 1);
    }
  }

  const handleCreateNewCliente: SubmitHandler<CreateNewClienteProps> = async (
    values
  ) => {
    const data = {
      name: values.name + values.surname,
      adress: `${logradouro}, N° ${adressNumber}`,
      district: estado,
      email: values.email,
      birthday: values.birthday.toString(),
      phone: CelularValue,
      tell: FixedValue,
      cpf: CPFValue,
      rg: RGValue,
      cep: CEPValue,
      howKnowUs: howKnow,
      kindPerson: kindPerson,
      state: estado,
      neighbour: bairro,
    };
    try {
      const validCpf = validateCpf(CPFValue);

      if (validCpf) {
        await api
          .post("/customers", data)
          .then((res) => navigate(`/Recepcao/Consultas/Clientes/${res.data}`));
        toast.success("Usuário cadastrado");
      } else {
        toast.error("CPF Fora dos padrões");
      }
    } catch (error) {
      toast.error("Falha ao cadastrar novo usuário");
      console.log(data);
      console.log(error);
    }
  };

  const handleBlur = () => {
    if (logradouro.endsWith("  ")) {
      setLogradouro(logradouro + "Nº ");
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
              <Flex w="100%" gap="2">
                <Flex w="50%" direction="column">
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
                  <Text color="red.500" fontWeight="bold" textAlign="left">
                    {errors?.name?.message}
                  </Text>
                </Flex>
                <Flex w="50%" direction="column">
                  <FormLabel
                    textAlign="left"
                    fontWeight="bold"
                    htmlFor="name"
                    w="100%"
                    fontSize="17"
                    mb="0"
                  >
                    * Sobrenome do Cliente
                  </FormLabel>
                  <Input
                    w="100%"
                    placeholder="Sobrenome do cliente"
                    {...register("surname")}
                    id="surname"
                    minWidth={320}
                    name="surname"
                  />
                  <Text color="red.500" fontWeight="bold" textAlign="left">
                    {errors?.surname?.message}
                  </Text>
                </Flex>
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
                  htmlFor="cpf"
                  mb="0"
                  fontSize="17"
                >
                  * CPF do cliente
                </FormLabel>
                <CPFInput
                  id="cpf"
                  name="cpf"
                  //{...register("cpf")}
                  value={CPFValue}
                  onChange={(e: any) => setCPFValue(e.target.value)}
                  onBlur=""
                />
                {errorInput > 0 && (
                  <Text textAlign="start" color="red.500" fontWeight="bold">
                    {CPFValue != "" ? null : "O campo CPF é obrigatório"}
                  </Text>
                )}
              </Flex>
              <Flex direction="column" w="50%" mt="4">
                {" "}
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
                <Text color="red.500" fontWeight="bold" textAlign="left">
                  {errors?.email?.message}
                </Text>
              </Flex>
            </Flex>
            <Flex w="100%" alignItems="center" gap="2" mt="4">
              <Flex direction="column" w="50%" justifyContent="center">
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
                <Text color="red.500" fontWeight="bold" textAlign="left">
                  {errors?.birthday?.message}
                </Text>
              </Flex>
              <Flex direction="column" w="50%">
                <FormLabel
                  textAlign="left"
                  fontWeight="bold"
                  htmlFor="phone"
                  fontSize="17"
                  mb="0"
                >
                  * Telefone Celular do Cliente
                </FormLabel>
                <CelularInput
                  id="phone"
                  name="phone"
                  //{...register("phone")}
                  value={CelularValue}
                  onChange={(e: any) => setCelularValue(e.target.value)}
                  onBlur={CelularValue === "(__) _____-____" ? setErro() : null}
                />
                {errorInput > 0 && (
                  <Text textAlign="start" color="red.500" fontWeight="bold">
                    {CelularValue != ""
                      ? null
                      : "O campo Celular é obrigatório"}
                  </Text>
                )}
              </Flex>
            </Flex>
            <Flex align="center" gap="2" mt="4">
              <Flex direction="column" w="50%">
                {" "}
                <FormLabel textAlign="left" htmlFor="tell" mb="0" fontSize="17">
                  Telefone Fixo do Cliente
                </FormLabel>
                <FixedInput
                  id="tell"
                  name="tell"
                  //{...register("tell")}
                  value={FixedValue}
                  onChange={(e: any) => setFixedValue(e.target.value)}
                  onBlur={""}
                />
                <Text h={errors?.email ? "24px" : "0"}></Text>
              </Flex>
              <Flex direction="column" w="50%" justifyContent="center">
                <FormLabel textAlign="left" htmlFor="rg" mb="0" fontSize="17">
                  RG do cliente
                </FormLabel>
                <RGInput
                  id="rg"
                  name="rg"
                  //{...register("rg")}
                  value={RGValue}
                  onChange={(e: any) => setRGValue(e.target.value)}
                  onBlur=""
                />
                <Text
                  h={CPFValue === "" && errorInput == 1 ? "25px" : "0"}
                ></Text>
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
                        //{...register("state")}
                        name="state"
                        value={estado}
                        onChange={(e) => setEstado(e.target.value)}
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
                        <Text
                          textAlign="start"
                          color="red.500"
                          fontWeight="bold"
                        >
                          {estado != "" ? null : "O campo Estado é obrigatório"}
                        </Text>
                      )}
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
                      <CEPInput
                        id="cep"
                        name="cep"
                        //{...register("cep")}
                        value={CEPValue}
                        onChange={(e: any) => {
                          setTamCep(tamCep + 1);
                          setCEPValue(e.target.value);
                        }}
                        onBlur={() => {
                          CEPValue === "" ? setErro() : setErrorInput(0);
                        }}
                      />
                      {errorInput > 0 && (
                        <Text
                          textAlign="start"
                          color="red.500"
                          fontWeight="bold"
                        >
                          {CEPValue != "" ? null : "O campo CEP é obrigatório"}
                        </Text>
                      )}
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
                        //{...register("district")}
                        name="district"
                        onChange={(e) => setCidade(e.target.value)}
                        value={cidade}
                        onBlur={() => {
                          cidade === "" ? setErro() : setErrorInput(0);
                        }}
                      />
                      {/* {errorInput > 0 && (
                        <Text
                          textAlign="start"
                          color="red.500"
                          fontWeight="bold"
                        >
                          {cidade != "" ? null : "O campo cidade é obrigatório"}
                        </Text>
                      )} */}
                    </Flex>
                  </Flex>
                  <Flex w="100%" mt="4" gap="2">
                    <Flex direction="column" w="35%">
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
                        //{...register("adress")}
                        id="adress"
                        name="adress"
                        onFocus={handleBlur}
                        value={logradouro}
                        onChange={(e) => setLogradouro(e.target.value)}
                      />
                      {errorInput > 0 && (
                        <Text
                          textAlign="start"
                          color="red.500"
                          fontWeight="bold"
                        >
                          {logradouro != ""
                            ? null
                            : "O campo Endereço é obrigatório"}
                        </Text>
                      )}
                    </Flex>
                    <Flex direction="column" w="15%">
                      <FormLabel htmlFor="adressNumber" mb="0" fontSize="17">
                        Número
                      </FormLabel>
                      <Input
                        placeholder="Número"
                        id="adressNumber"
                        name="adressNumber"
                        onChange={(ev) => setAdressNumber(ev.target.value)}
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
                        //{...register("neighbour")}
                        name="neighbour"
                        value={bairro}
                        onChange={(e) => setBairro(e.target.value)}
                      />
                      {errorInput > 0 && (
                        <Text
                          textAlign="start"
                          color="red.500"
                          fontWeight="bold"
                        >
                          {" "}
                          {bairro != ""
                            ? null
                            : "O campo Endereço é obrigatório"}
                        </Text>
                      )}
                    </Flex>
                    <Flex direction="column" w="25%">
                      <FormLabel htmlFor="complement" mb="0" fontSize="17">
                        Complemento
                      </FormLabel>
                      <Input
                        placeholder="Complemento"
                        id="complement"
                        name="complement"
                      />
                    </Flex>
                  </Flex>
                </Flex>
              </Flex>
            </Flex>

            <Button
              w="100%"
              mt="8"
              colorScheme="whatsapp"
              type={errorInput === 0 ? "submit" : "button"}
              py="8"
            >
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
