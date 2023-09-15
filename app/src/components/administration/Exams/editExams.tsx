import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
  Flex,
  FormControl,
  Heading,
  Text,
  Textarea,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../../lib/axios";
import { toast } from "react-toastify";
import { Input } from "../../../components/admin/Input";

export function EditExams() {
  const { register, handleSubmit } = useForm();
  const [characters, setCharacters] = useState([])
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const handleCreateExam: SubmitHandler<FieldValues> = async (values) => {
    let rangeAges = [values.minAge, values.maxAge];
    try {
      const data = {
        name: values.name,
        price: parseInt(values.price),
        available: values.available,
        examsType: values.examsType,
        applicableGender: values.applicableGender,
        subName: values.subName,
        description: values.description,
        ageRange: rangeAges,
      };
      await api.put(`exams/${id}`, data);
      toast.success("Exame configurado com sucesso");
      navigate(0);
    } catch (error) {
      toast.error("Falha ao criar novo Exame");
    }
  };


  async function getCharacteristics() {
    try {
      const res = await api.get("/examcharac")
      setCharacters(res.data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getCharacteristics()
  },[])

  return (
    <Box flex="1" borderRadius={8} bg="gray.100" p="8">
      <Heading size="lg" fontWeight="normal">
        Exames
      </Heading>
      <Flex mb="8" justify="space-between" align="center">
        <FormControl
          as="form"
          onSubmit={handleSubmit(handleCreateExam)}
          justifyContent="space-between"
          display="flex"
          flexDirection="column"
        >
          <Flex justify="center" w="100%">
            <Flex
              direction="column"
              margin="4"
              p="4"
              rounded="4"
              w="70%"
              fontSize="20"
              fontWeight="bold"
            >
              <label htmlFor="">Nome do Exame</label>
              <Input {...register("name")} name="name" />
              <label htmlFor="" style={{ marginTop: "20px" }}>
                Preço
              </label>
              <Input {...register("price")} name="price" />
              <label htmlFor="" style={{ marginTop: "20px" }}>
                Titulo
              </label>
              <Input {...register("subName")} name="subName" />

              <label htmlFor="" style={{ marginTop: "20px" }}>
                Idade Minima
              </label>
              <NumberInput size="xs" name="minAge" maxW={"100%"} w="100%">
                <NumberInputField
                  py="5"
                  rounded="md"
                  border="1px solid black"
                  fontSize="18"
                  bg="white"
                  w="100%"
                  {...register("minAge")}
                  name="minAge"
                />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>

              <label htmlFor="" style={{ marginTop: "20px" }}>
                Idade Máxima
              </label>
              <NumberInput size="xs" name="minAge" maxW={"100%"} w="100%">
                <NumberInputField
                  py="5"
                  rounded="md"
                  border="1px solid black"
                  fontSize="18"
                  bg="white"
                  w="100%"
                  {...register("maxAge")}
                  name="maxAge"
                />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              <label style={{ marginTop: "20px" }}>Valor padrão</label>
              <Textarea
                {...register("description")}
                name="description"
                minHeight={300}
                minWidth={300}
                borderColor="gray.900"
                bg="white"
              ></Textarea>
            </Flex>
            <Flex
              direction="column"
              margin="4"
              bg="white"
              p="10"
              rounded="4"
              w="40%"
              fontSize="25"
              fontWeight="bold"
              height="900px"
              shadow="0px 0px 10px rgba(0, 0, 0, 0.5)"
              overflowY="auto"
            >
              <Text>Diponibilidade</Text>
              <Flex gap="4">
                <Checkbox
                  {...register("available")}
                  size="lg"
                  id="available"
                  name="available"
                  type="checkbox"
                  borderColor="gray.800"
                  _checked={{ background: "#FF0000" }}
                />
                <label htmlFor="available">Disponível</label>
              </Flex>

              <CheckboxGroup>
                <Text mt="10">Laboratórios</Text>
                <Flex gap="4">
                  <Checkbox
                    size="lg"
                    {...register("examsType")}
                    value={"image"}
                    type="radio"
                    colorScheme="green"
                    borderColor="gray.800"
                    name="examsType"
                  />
                  <label htmlFor="">Lab Imagens</label>
                </Flex>
                <Flex gap="4">
                  <Checkbox
                    size="lg"
                    type="radio"
                    {...register("examsType")}
                    value={"lab"}
                    colorScheme="green"
                    name="examsType"
                    borderColor="gray.800"
                  />
                  <label htmlFor="">Lab padrão</label>
                </Flex>
              </CheckboxGroup>
              <CheckboxGroup>
                <Text mt="10">Gênero</Text>
                <Flex gap="4">
                  <Checkbox
                    size="lg"
                    {...register("applicableGender")}
                    value={"femea"}
                    type="radio"
                    colorScheme="green"
                    borderColor="gray.800"
                    name="applicableGender"
                  />
                  <label htmlFor="">Fêmea</label>
                </Flex>
                <Flex gap="4">
                  <Checkbox
                    size="lg"
                    type="radio"
                    {...register("applicableGender")}
                    value={"macho"}
                    colorScheme="green"
                    name="applicableGender"
                    borderColor="gray.800"
                  />
                  <label htmlFor="">Macho</label>
                </Flex>
              </CheckboxGroup>

              <Flex height="auto" direction="column">
                <Text>Caractéristicas desse exame</Text>
                <Flex wrap="wrap" gap={4}>
                    {
                      characters && characters.map((char: any) => {
                        return (<>

                        <label>{char.name}</label>
                        <Checkbox size="lg" borderColor="black" />
                        </>)
                      })
                    }
                </Flex>
              </Flex>
            </Flex>
          </Flex>

          <Button type="submit" colorScheme="yellow" m="2" py="8" fontSize="20">
            Configurar
          </Button>
        </FormControl>
      </Flex>
    </Box>
  );
}
