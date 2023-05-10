import { AdminContainer } from "./style";
import {
  Box,
  Button,
  ChakraProvider,
  FormControl,
  SimpleGrid,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { Flex } from "@chakra-ui/react";
import { Header } from "../../components/admin/Header";
import { Sidebar } from "../../components/admin/Sidebar";
import { useContext, useState, useEffect } from "react";
import { DbContext } from "../../contexts/DbContext";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../../lib/axios";
import { SubmitHandler, useForm } from "react-hook-form";
import { AutorizationData } from "../../interfaces";
import { Input } from "../../components/admin/Input";
import { toast } from "react-toastify";
export function AutorizationsEdit() {
  const { id } = useParams<{ id: string }>();
  const { register, handleSubmit} = useForm()
  const [autItem, setAutItem] = useState({
    name: "",
    text: ""
  })
  const navigate = useNavigate()
useEffect(() => {
  async function getAutorization() {
    const response = await api.get(`/autorizations/${id}`)
    const data = {
      name: response.data.name,
      text: response.data.text
    }
    setAutItem(data)
   }
   getAutorization()
},[])

const autorizations = autItem != null ? autItem : null



const handleEditAutorization: SubmitHandler<AutorizationData>  = async (values) => {
  const data = {
    name: values.name,
    text: values.text
  }

  if(data.name === "") {
    data.name = autItem.name
  }

  try {
    await api.put(`/autorizations/${id}`, data)
    toast.success("Autorização editada")
    navigate('/Admin/Autorizations')
  } catch (error) {
    toast.error("Falha ao editar")
  }
  
 
}


  return (
    <ChakraProvider>
      <AdminContainer>
        <Flex direction="column" h="100vh">
          <Header title="Painel de Autorizações" />

          <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
            <Sidebar />

            <SimpleGrid
              flex="1"
              gap="4"
              minChildWidth="320px"
              align="flex-start"
              as={Flex}
            >
              <Flex direction="column" gap="4">
                <Box flex="1" borderRadius={8} bg="gray.200" p="8" m="4">
                  <Flex
                    direction={"column"}
                    m="4"
                    justify="center"
                    align="center"
                   
                  >


                    <Flex direction="column">
                      <Flex direction="column" mb="4" gap="2">
                      <Text>Dados Atuais</Text>
                      <Text>Nome: {autorizations?.name}</Text>
                      <Text>Text: {autorizations?.text}</Text>
                      </Flex>
                   
                    <FormControl as="form" onSubmit={handleSubmit(handleEditAutorization as any)}>
                    <Input label="Insira aqui um novo Nome"  {...register('name')}/>
                   
                   <label htmlFor="text">Insira um novo texto</label>
                    <Textarea bg="white" id="text" {...register('text')}  >
                     
                    </Textarea>
                    
                    <Button minWidth={320} type="submit" mt="4" colorScheme="yellow">
                      Editar
                    </Button>
                    </FormControl>
                    </Flex>
                  </Flex>
                </Box>
              </Flex>
            </SimpleGrid>
          </Flex>
        </Flex>
      </AdminContainer>
    </ChakraProvider>
  );
}
