import {
  Box,
  Button,
  ChakraProvider,
  SimpleGrid,
  Text,
  UnorderedList,
  FormControl,
  Textarea,
  FormLabel,
  VStack,
} from "@chakra-ui/react";
import { Flex } from "@chakra-ui/react";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";

import { useContext, useEffect, useState } from "react";
import { GenericModal } from "../../Modal/GenericModal";
import { DbContext } from "../../../contexts/DbContext";
import { Link, useNavigate } from "react-router-dom";
import { LoadingSpinner } from "../../Loading";
import { Input } from "../../admin/Input";
import { toast } from "react-toastify";
import { api } from "../../../lib/axios";
import { Icon } from "@chakra-ui/react";
import { RiAddLine } from "react-icons/ri";
import { Heading } from "@chakra-ui/react";
import Cookies from "js-cookie";
import { ConfirmationDialog } from "../../dialogConfirmComponent/ConfirmationDialog";
import { BsFillTrashFill } from "react-icons/bs";

export default function AutorizationsMenu() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { autorization } = useContext(DbContext);
  const { register, handleSubmit } = useForm();
  const [reloadData, setReloadData] = useState<boolean>(false);
  const [allAutorization, setAllAutorization] = useState([]);
  const autorizations = autorization ? autorization : null;
  const token = Cookies.get("token") ? Cookies.get("token") : "";
  const navigate = useNavigate();
  const handleAutorization: SubmitHandler<FieldValues> = async (values) => {
    try {
      const data = {
        name: values.name,
        text: values.text,
      };
      await api.post("autorizations", data, { headers: { token: `${token}` } });
      setReloadData(true);
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

  async function getAutorizations() {
    const AllAutorizations: any = await api.get("/autorizations");
    setAllAutorization(AllAutorizations.data);
  }

  useEffect(() => {
    getAutorizations();
  }, []);

  useEffect(() => {
    if (reloadData === true) {
      getAutorizations();
      setReloadData(false);
    }
  }, [reloadData]);

  async function DeleteAutorization(AutorizationId: string) {
    await api
      .delete(`/autorization/${AutorizationId}`)
      .then(() => {
        toast.success("Autorização deletada com sucesso!!");
        setReloadData(true);
      })
      .catch(() => toast.error("Algo deu errado!!"));
  }

  return (
    <SimpleGrid
      flex="1"
      gap="4"
      minChildWidth="320px"
      align="flex-start"
      as={Flex}
    >
      <Flex direction="column" gap="4" maxH="44rem">
        <Box
          flex="1"
          borderRadius={8}
          overflow="auto"
          bg="gray.200"
          p="8"
          m="4"
        >
          <Flex w="100%" direction={"column"} justify="center" align="center">
            <Flex
              w="100%"
              alignItems="center"
              justifyContent="center"
              direction="column"
            >
              <Heading fontSize="30" fontWeight="bold" pl="2" w="100%" mb="5">
                Painel de Autorizações
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
                borderTop="1px solid black"
                textAlign="left"
              >
                {allAutorization != null ? (
                  allAutorization.map((item: any) => (
                    <>
                      {!!item.name && (
                        <Box
                          key={item.id}
                          //to={`/Admin/Autorizations/${item.id}`}
                        >
                          <Flex
                            py="1"
                            align="center"
                            justify="space-between"
                            borderBottom="1px solid black"
                          >
                            <Text>{item.name} </Text>
                            <Flex gap="5" py="2">
                              <Button
                                colorScheme="yellow"
                                size="sm"
                                onClick={() =>
                                  navigate(`/Admin/Autorizations/${item.id}`)
                                }
                              >
                                Editar
                              </Button>
                              <ConfirmationDialog
                                disabled={false}
                                icon={
                                  <BsFillTrashFill fill="white" size={16} />
                                }
                                buttonTitle="Deletar Autorização"
                                whatIsConfirmerd="Tem certeza que deseja Excluir essa Autorização?"
                                describreConfirm="Excluir a Autorização é uma ação irreversivel, tem certeza que deseja excluir?"
                                callbackFn={() => DeleteAutorization(item.id)}
                              />
                            </Flex>
                          </Flex>
                        </Box>
                      )}
                    </>
                  ))
                ) : (
                  <LoadingSpinner />
                )}
              </UnorderedList>
            </Flex>
            <GenericModal isOpen={isModalOpen} onRequestClose={closeModal}>
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
  );
}
