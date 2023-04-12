import { AdminContainer } from "./style";
import {
  Box,
  Button,
  ChakraProvider,
  SimpleGrid,
  Text,
  UnorderedList,
  ListItem,
  FormControl,
  Textarea,
  FormLabel,
  VStack,
} from "@chakra-ui/react";
import { Flex } from "@chakra-ui/react";
import { useForm, SubmitHandler, FieldValues} from 'react-hook-form'
import { Header } from "../../components/admin/Header";
import { Sidebar } from "../../components/admin/Sidebar";
import { useContext, useState } from "react";
import { GenericModal } from "../../components/Modal/GenericModal";
import { DbContext } from "../../contexts/DbContext";
import { Link } from "react-router-dom";
import { LoadingSpinner } from "../../components/Loading";
import { Input } from "../../components/admin/Input";
import { AutorizationData } from "../../interfaces";
import { toast } from "react-toastify";
import { api } from "../../lib/axios";

export function Autorizations() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {autorization } = useContext(DbContext)
  const { register, handleSubmit} = useForm()
  const autorizations = autorization ? autorization : null
  
  const handleAutorization: SubmitHandler<FieldValues> = async (values) => {
    try {
      const data = {
        name: values.name,
        text: values.text
      }
      await api.post('autorizations', data )
      toast.success("Autorização criada com sucesso")
    } catch (error) {
      toast.error("Falha ao criar nova autorização")
      console.log(error)
    }
    console.log(values)
  }

  function openModal() {
    setIsModalOpen(true);
  }
  function closeModal() {
    setIsModalOpen(false);
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
                    <Button onClick={() => openModal()} colorScheme="whatsapp">
                      Cadastrar Autorização
                    </Button>
                

                    <Text fontSize="bold" m="4">
                      Nome
                    </Text>
                    <UnorderedList>
                    {
                      autorizations != null ? autorizations.map((item) =>  (
                        <Link key={item.id}  to={`/Home/Admin/Autorizations/${item.id}`}>
                          <Text>{item.name}</Text>
                        </Link>
                      )) : (<LoadingSpinner/>)
                    }
                      
                    </UnorderedList>
                    <GenericModal
                      isOpen={isModalOpen}
                      onRequestClose={closeModal}
                    >
                      <Text mb="4" color="black">Cadastrar nova autorização</Text>
                      <FormControl as="form" onSubmit={handleSubmit(handleAutorization)}>
                        <Input {...register('name')} label="Nome" name="name" />

                        <VStack gap="2" m="2">
                        <FormLabel>Autorização</FormLabel>
                        <Textarea {...register('text')} name="text"  minHeight={300} minWidth={400}>

                        </Textarea>

                      
                        </VStack>
                        <Button type="submit" colorScheme="green" m="2">
                          Cadastrar
                        </Button>
                      </FormControl>
                      
                    </GenericModal>
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
