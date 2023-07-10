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
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
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
import { Icon } from "@chakra-ui/react";
import { RiAddLine } from "react-icons/ri";
import { Heading } from "@chakra-ui/react";

export function Autorizations() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { autorization } = useContext(DbContext);
  const { register, handleSubmit } = useForm();
  const autorizations = autorization ? autorization : null;

  const handleAutorization: SubmitHandler<FieldValues> = async (values) => {
    try {
      const data = {
        name: values.name,
        text: values.text,
      };
      await api.post("autorizations", data);
      toast.success("Autorização criada com sucesso");
    } catch (error) {
      toast.error("Falha ao criar nova autorização");
      console.log(error);
    }
    console.log(values);
  };

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
                    w="100%"
                    direction={"column"}
                    justify="center"
                    align="center"
                  >
                    <Flex
                      w="100%"
                      alignItems="center"
                      justifyContent="center"
                      direction="column"
                    >
                      <Heading
                        fontSize="30"
                        fontWeight="bold"
                        pl="2"
                        w="100%"
                        mb="5"
                      >
                        Autorizações
                      </Heading>
                      <Button
                        w="100%"
                        py="8"
                        fontSize="20"
                        onClick={() => openModal()}
                        colorScheme="whatsapp"
                        leftIcon={<Icon as={RiAddLine} />}
                      >
                        Cadastrar Autorização
                      </Button>

                      <Text
                        w="100%"
                        fontSize="23"
                        fontWeight="bold"
                        mt="4"
                        py="2"
                        pl="2"
                      >
                        Nome
                      </Text>
                      <UnorderedList
                        fontWeight="bold"
                        fontSize="18"
                        pl="2"
                        pr="1"
                        py="2"
                        m="0"
                        w="100%"
                        borderY="1px solid black"
                        textAlign="left"
                      >
                        {autorizations != null ? (
                          autorizations.map((item) => (
                            <>
                              <Link
                                key={item.id}
                                to={`/Admin/Autorizations/${item.id}`}
                              >
                                <Flex align="center" justify="space-between">
                                  <Text>{item.name} </Text>
                                  {!!item.name && (
                                    <Button colorScheme="yellow">Editar</Button>
                                  )}
                                </Flex>
                              </Link>
                            </>
                          ))
                        ) : (
                          <LoadingSpinner />
                        )}
                      </UnorderedList>
                    </Flex>
                    <GenericModal
                      isOpen={isModalOpen}
                      onRequestClose={closeModal}
                    >
                      <Text mb="4" color="black">
                        Cadastrar nova autorização
                      </Text>
                      <FormControl
                        as="form"
                        onSubmit={handleSubmit(handleAutorization)}
                      >
                        <Input {...register("name")} label="Nome" name="name" />

                        <VStack gap="2" m="2">
                          <FormLabel>Autorização</FormLabel>
                          <Textarea
                            {...register("text")}
                            name="text"
                            minHeight={300}
                            minWidth={400}
                          ></Textarea>
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
