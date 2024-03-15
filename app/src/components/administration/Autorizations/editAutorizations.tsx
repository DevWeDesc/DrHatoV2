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
    <Flex direction="column" w="full" mt={{ base: 10, lg: 0 }}>
      <Flex direction="column" mb="4" fontWeight="bold" gap="2">
        <Text w="100%" fontSize={{ base: "md", lg: "xl" }} mb="5">
          Dados Atuais
        </Text>
        <Flex justifyContent="center" direction="column" gap={4}>
          <Box>
            <Text mb="1" fontSize={{ base: "sm", lg: "md" }}>
              Nome
            </Text>
            <Text
              fontSize={{ base: "sm", lg: "md" }}
              bg="white"
              pl="1"
              pr="10%"
              borderRadius="5"
              textAlign="left"
              // ml="2"
              border="1px solid black"
              minH="40px"
              display="flex"
              alignItems="center"
              fontWeight="semibold"
              py="2"
            >
              {autorizations?.name}
            </Text>
          </Box>
          <Box>
            <Text fontSize={{ base: "sm", lg: "md" }} mb="1">
              Texto
            </Text>
            <Text
              fontSize={{ base: "sm", lg: "md" }}
              bg="white"
              pl="1"
              borderRadius="5"
              textAlign="left"
              border="1px solid black"
              minH="40px"
              fontWeight="semibold"
              py="2"
            >
              {autorizations?.text}
            </Text>
          </Box>
        </Flex>
      </Flex>

      <FormControl
        as="form"
        onSubmit={handleSubmit(handleEditAutorization as any)}
      >
        <Text
          borderTop="1px solid black"
          pt="5"
          w="100%"
          fontSize={{ base: "md", lg: "xl" }}
          mb="5"
          fontWeight="bold"
        >
          Dados para Edição
        </Text>
        <Text fontSize={{ base: "sm", lg: "md" }} fontWeight="bold">
          Insira aqui um novo Nome
        </Text>
        <Input {...register("name")} name="name" />

        <Text fontSize={{ base: "sm", lg: "md" }} fontWeight="bold">
          Insira um novo texto
        </Text>
        <Textarea
          border="1px solid black"
          bg="white"
          id="text"
          {...register("text")}
        ></Textarea>

        <Button
          fontSize={{ base: "sm", md: "lg" }}
          w="full"
          type="submit"
          mt="4"
          colorScheme="yellow"
        >
          Editar
        </Button>
      </FormControl>
    </Flex>
  );
}
