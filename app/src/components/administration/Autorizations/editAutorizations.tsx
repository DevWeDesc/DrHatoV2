import {
  Box,
  Button,
  FormControl,
  SimpleGrid,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { Flex } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../../../lib/axios";
import { SubmitHandler, useForm } from "react-hook-form";
import { AutorizationData } from "../../../interfaces";
import { Input } from "../../admin/Input";
import { toast } from "react-toastify";

export default function EditAutorizations() {
  const { id } = useParams<{ id: string }>();
  const { register, handleSubmit } = useForm();
  const [autItem, setAutItem] = useState({
    name: "",
    text: "",
  });
  const navigate = useNavigate();
  useEffect(() => {
    async function getAutorization() {
      const response = await api.get(`/autorizations/${id}`);
      const data = {
        name: response.data.name,
        text: response.data.text,
      };
      setAutItem(data);
    }
    getAutorization();
  }, []);

  const autorizations = autItem != null ? autItem : null;

  const handleEditAutorization: SubmitHandler<AutorizationData> = async (
    values
  ) => {
    const data = {
      name: values.name,
      text: values.text,
    };

    if (data.name === "") {
      data.name = autItem.name;
    }

    try {
      await api.put(`/autorizations/${id}`, data);
      toast.success("Autorização editada");
      navigate("/Admin/Autorizations");
    } catch (error) {
      toast.error("Falha ao editar");
    }
  };

  return (
    <SimpleGrid
      flex="1"
      gap="4"
      minChildWidth="320px"
      align="flex-start"
      as={Flex}
    >
      <Flex direction="column" gap="4">
        <Box flex="1" borderRadius={8} bg="gray.200" p="8" m="4">
          <Flex direction={"column"} m="4" justify="center" align="center">
            <Flex direction="column">
              <Flex direction="column" mb="4" fontWeight="bold" gap="2">
                <Text w="100%" fontSize="28" mb="5">
                  Dados Atuais
                </Text>
                <Text display="flex" fontSize="20" alignItems="center">
                  Nome
                  <Text
                    bg="white"
                    pl="1"
                    pr="10%"
                    borderRadius="5"
                    textAlign="left"
                    ml="2"
                    border="1px solid black"
                    minH="40px"
                    display="flex"
                    alignItems="center"
                    py="2"
                  >
                    {autorizations?.name}
                  </Text>
                </Text>
                <Text fontSize="20" display="flex" alignItems="center" mb="2">
                  Texto
                  <Text
                    bg="white"
                    pl="1"
                    borderRadius="5"
                    textAlign="left"
                    ml="2"
                    border="1px solid black"
                    height="auto"
                    display="flex"
                    alignItems="center"
                    py="2"
                  >
                    {autorizations?.text}
                  </Text>
                </Text>
              </Flex>

              <FormControl
                as="form"
                onSubmit={handleSubmit(handleEditAutorization as any)}
              >
                <Text
                  borderTop="1px solid black"
                  pt="5"
                  w="100%"
                  fontSize="28"
                  mb="5"
                  fontWeight="bold"
                >
                  Dados para Edição
                </Text>
                <label
                  htmlFor="name"
                  style={{ fontSize: "20px", fontWeight: "bold" }}
                >
                  Insira aqui um novo Nome
                </label>
                <Input  {...register("name")} name="name" />

                <label
                  htmlFor="text"
                  style={{ fontSize: "20px", fontWeight: "bold" }}
                >
                  Insira um novo texto
                </label>
                <Textarea
                  border="1px solid black"
                  bg="white"
                  id="text"
                  {...register("text")}
                ></Textarea>

                <Button
                  minWidth={320}
                  type="submit"
                  mt="4"
                  colorScheme="yellow"
                >
                  Editar
                </Button>
              </FormControl>
            </Flex>
          </Flex>
        </Box>
      </Flex>
    </SimpleGrid>
  );
}
