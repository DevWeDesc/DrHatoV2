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
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
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
import { MdEdit } from "react-icons/md";

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
    <Flex
      py={{ base: 10, xl: 0 }}
      direction="column"
      gap="4"
      w="full"
      maxH="48rem"
    >
      <Box borderRadius={8} overflow="auto">
        <Flex w="100%" direction={"column"} justify="center" align="center">
          <Flex
            w="100%"
            alignItems="center"
            justifyContent="center"
            direction="column"
          >
            <Heading
              fontSize={{ base: "lg", lg: "2xl" }}
              fontWeight="bold"
              pl="2"
              w="100%"
              mb="5"
              display="flex"
              flexDirection={{ base: "column", md: "row" }}
              gap={{ base: 3, md: 0 }}
              justifyContent="space-between"
            >
              Painel de Autorizações
              <Button
                py="6"
                fontSize={{ base: "sm", lg: "md" }}
                onClick={() => openModal()}
                colorScheme="whatsapp"
                leftIcon={
                  <Icon
                    as={RiAddLine}
                    fontWeight="bold"
                    fontSize={{ base: "md", lg: "xl" }}
                  />
                }
              >
                Cadastrar Autorização
              </Button>
            </Heading>
            <TableContainer w="full">
              <Table w="full" variant="simple">
                <Thead>
                  <Tr>
                    <Th>Nome</Th>
                    <Th textAlign="center">Editar</Th>
                    <Th textAlign="center">Deletar</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {allAutorization != null ? (
                    allAutorization.map((item: any) => (
                      <>
                        {!!item.name && (
                          <Tr>
                            <Td fontSize={{ base: "12", lg: "sm" }}>
                              {item.name}
                            </Td>
                            <Td>
                              {" "}
                              <Button
                                fontSize={{ base: "sm", lg: "md" }}
                                display="flex"
                                gap={2}
                                alignItems="center"
                                colorScheme="yellow"
                                size="sm"
                                onClick={() =>
                                  navigate(`/Admin/Autorizations/${item.id}`)
                                }
                              >
                                <MdEdit fill="black" size={16} />

                                <Text>Editar</Text>
                              </Button>
                            </Td>
                            <Td>
                              <ConfirmationDialog
                                fontSize={{ base: "sm", lg: "md" }}
                                disabled={false}
                                icon={
                                  <BsFillTrashFill fill="white" size={16} />
                                }
                                buttonTitle="Deletar Autorização"
                                whatIsConfirmerd="Tem certeza que deseja Excluir essa Autorização?"
                                describreConfirm="Excluir a Autorização é uma ação irreversivel, tem certeza que deseja excluir?"
                                callbackFn={() => DeleteAutorization(item.id)}
                              />
                            </Td>
                          </Tr>
                        )}
                      </>
                    ))
                  ) : (
                    <LoadingSpinner />
                  )}
                </Tbody>
              </Table>
            </TableContainer>
          </Flex>
          <GenericModal isOpen={isModalOpen} onRequestClose={closeModal}>
            <Text
              fontSize={{ base: "md", lg: "lg" }}
              fontWeight="bold"
              textAlign="center"
              mb="4"
              color="black"
            >
              Cadastrar nova autorização
            </Text>
            <FormControl as="form" onSubmit={handleSubmit(handleAutorization)}>
              <Input
                fontSize={{ base: "sm", lg: "md" }}
                {...register("name")}
                label="Nome"
                name="name"
              />

              <VStack gap="2" m="2">
                <FormLabel fontSize={{ base: "sm", lg: "md" }}>
                  Autorização
                </FormLabel>
                <Textarea
                  fontSize={{ base: "sm", lg: "md" }}
                  {...register("text")}
                  name="text"
                  minHeight={300}
                  minWidth={{ base: "80vw", lg: "30vw" }}
                ></Textarea>
              </VStack>
              <Button
                w="full"
                fontSize={{ base: "sm", lg: "md" }}
                type="submit"
                colorScheme="green"
                m="2"
              >
                Cadastrar
              </Button>
            </FormControl>
          </GenericModal>
        </Flex>
      </Box>
    </Flex>
  );
}
