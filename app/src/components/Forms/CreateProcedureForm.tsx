import {
  Text,
  FormControl,
  Checkbox,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Button,
  Textarea,
  Flex,
  Select,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { DbContext } from "../../contexts/DbContext";
import { Input } from "../../components/admin/Input";
import { api } from "../../lib/axios";
import { toast } from "react-toastify";

export function CreateProcedureForm({ path, method }: any) {
  const { groups, sectors } = useContext(DbContext);
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [value, setValue] = useState("");


  const handleCreateProcedure: SubmitHandler<FieldValues> = async (values) => {
    let rangeAges = [values.minAge, values.maxAge];
    const data = {
      name: values.name,
      price: Number(values.price),
      available: values.available,
      applicationInterval: values.applicationInterval,
      ageRange: rangeAges,
      applicationGender: values.applicableGender,
      observations: values.observations,
      group_id: Number(values.group),
      sector_id: Number(values.sector),
    };

    try {
      await api.post("procedures", data);
      toast.success("Procedimento criado com sucesso!");
      navigate("/Admin/Procedures");
    } catch (error) {
      toast.error("Falha ao criar procedimento");
    }
  };

  return (
    <FormControl
      as="form"
      onSubmit={handleSubmit(handleCreateProcedure)}
      display="flex"
      flexDir="column"
      alignItems="center"
      gap="2"
      padding="4"
    >
      <Flex w="100%">
        <Flex direction="column" w="45%">
          <label htmlFor="" style={{ fontWeight: "bold", fontSize: "17px" }}>
            Nome do Procedimento
          </label>
          <Input mb="1" {...register("name")} name="name" />
          <label style={{ fontWeight: "bold", fontSize: "17px" }} htmlFor="">
            Preço do Procedimento
          </label>
          <Input mb="1" mt="0" {...register("price")} name="price" />
          <label style={{ fontWeight: "bold", fontSize: "17px" }} htmlFor="">
            Intervalo de Aplicação, escreva:
          </label>
          <Input
            mb="1"
            {...register("applicationInterval")}
            name="applicationInterval"
          />
          <label style={{ fontWeight: "bold", fontSize: "17px" }} htmlFor="">
            Idade Minima
          </label>
          <Flex w="100%" mb="1">
            <NumberInput size="xs" name="minAge" maxW={"100%"} w="100%">
              <NumberInputField
                py="5"
                rounded="md"
                border="1px solid black"
                fontSize="18"
                {...register("minAge")}
                name="minAge"
                bg="white"
                w="100%"
              />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </Flex>
          <label htmlFor="" style={{ fontWeight: "bold", fontSize: "17px" }}>
            Idade Máxima
          </label>
          <NumberInput size="xs" name="minAge" maxW={"100%"} w="100%">
            <NumberInputField
              {...register("maxAge")}
              name="maxAge"
              py="5"
              rounded="md"
              border="1px solid black"
              bg="white"
              w="100%"
            />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <Text mt="4" fontWeight="bold">
            Observações do Procedimento:{" "}
          </Text>
          <Textarea
            {...register("observations")}
            name="observations"
            minHeight={300}
            minWidth={300}
            borderColor="gray.900"
            bg="white"
          ></Textarea>
        </Flex>
        <Flex direction="column" w="55%">
          <Flex
            shadow="0px 0px 10px rgba(0, 0, 0, 0.5)"
            direction="column"
            ml="20"
            bg="white"
            height="50%"
            justifyContent="space-between"
            overflowY="auto"
            py="10"
            px="10"
          >
            <Flex gap="2">
              <Checkbox
                type="radio"
                {...register("applicableGender")}
                value={"macho"}
                colorScheme="green"
                name="applicableGender"
                borderColor="gray.800"
              />
              <label htmlFor="">Executável em Macho</label>
            </Flex>
            <Flex gap="2">
              <Checkbox
                {...register("applicableGender")}
                value={"femea"}
                type="radio"
                colorScheme="green"
                borderColor="gray.800"
                name="applicableGender"
              />
              <label htmlFor="">Executável em Fêmea</label>
            </Flex>

            <Flex gap="2">
              <Checkbox
                type="radio"
                disabled
                value={"macho"}
                colorScheme="green"
                name="applicableGender"
                borderColor="gray.800"
              />
              <label htmlFor="">Procedimento é uma Vacina</label>
            </Flex>
            <Flex gap="2">
              <Checkbox
                type="radio"
                disabled
                value={"macho"}
                colorScheme="green"
                name="applicableGender"
                borderColor="gray.800"
              />
              <label htmlFor="">Procedimento é uma Cirurgia</label>
            </Flex>

            <Flex gap="2">
              <Checkbox
                {...register("available")}
                id="available"
                name="available"
                borderColor="gray.900"
              />
              <label htmlFor="available">Disponivel</label>
            </Flex>
          </Flex>
          <Flex
            shadow="0px 0px 10px rgba(0, 0, 0, 0.5)"
            direction="column"
            ml="20"
            mt="4"
            bg="white"
            height="50%"
            align="centers"
            gap="4"
            overflowY="auto"
            py="10"
            px="10"
          >
            <label htmlFor="" style={{ fontWeight: "bold", fontSize: "17px" }}>
              PERTENCE A ALGUM GRUPO?
            </label>
            <Select {...register("group")} placeholder="SELECIONE O GRUPO" bgColor="gray.300">
              {groups.map((group) => (
                <option key={group.id} value={group.id}>
                  {group.name}
                </option>
              ))}
            </Select>

            <label htmlFor="" style={{ fontWeight: "bold", fontSize: "17px" }}>
              PERTENCE A ALGUM SETOR?
            </label>
            <Select {...register("sector")} placeholder="SELECIONE O SETOR" bgColor="gray.300">
              {sectors.map((sector) => (
                <option key={sector.id} value={sector.id}>
                  {sector.name}
                </option>
              ))}
            </Select>
          </Flex>
        </Flex>
      </Flex>

      <Button
        colorScheme="whatsapp"
        mt="8"
        w="100%"
        py="10"
        fontSize="20"
        type="submit"
      >
        Cadastrar Procedimento
      </Button>
    </FormControl>
  );
}
