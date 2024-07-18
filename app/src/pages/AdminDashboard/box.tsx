import {
  ChakraProvider,
  Flex,
  Heading,
  Button,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  FormControl,
  Box,
  Icon,
  Table,
  Text,
  Textarea,
  FormLabel,
  Checkbox,
} from "@chakra-ui/react";
import { RiAddLine, RiPencilLine } from "react-icons/ri";
import { Paginaton } from "../../components/admin/Pagination";
import { AdminContainer } from "./style";
import { Sidebar } from "../../components/admin/Sidebar";
import { Header } from "../../components/admin/Header";
import { GenericModal } from "../../components/Modal/GenericModal";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { api } from "../../lib/axios";
import { toast } from "react-toastify";
import { Input } from "../../components/admin/Input";
import { BoxProps } from "../../interfaces";
import { BsFillTrashFill } from "react-icons/bs";

export default function AdminBoxs() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { register, handleSubmit } = useForm();
  const [boxs, setBox] = useState({} as BoxProps);
  const [reloadData, setReloadData] = useState(false);
  const handleCreateBox: SubmitHandler<FieldValues> = async (values) => {
    try {
      const data = {
        name: values.name,
        boxIsOpen: values.boxIsOpen,
      };
      await api.post("/vetbox", data);
      setReloadData(true);
      toast.success("Caixa criada com sucesso");
    } catch (error) {
      toast.error("Falha ao criar nova Vacina");
      console.log(error);
    }
  };
  async function GetVaccine() {
    try {
      const response = await api.get("/vetbox");
      setBox(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    GetVaccine();
  }, []);

  useEffect(() => {
    if (reloadData === true) {
      GetVaccine();
      setReloadData(false); // Reseta o estado para evitar chamadas infinitas
    }
  }, [reloadData]);

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
          <Header title="Vacinas" url="/Admin/" />

          <Flex
            w="100%"
            my="6"
            direction={{ base: "column", xl: "row" }}
            mx="auto"
            px="6"
          >
            <Sidebar />
            <Box
              flex="1"
              borderRadius={8}
              // bg="gray.200"
              py={{ base: "8", xl: 0 }}
              maxH="44rem"
              overflow="auto"
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
                Caixas
                <Button
                  py="6"
                  fontSize={{ base: "sm", lg: "md" }}
                  colorScheme="whatsapp"
                  cursor="pointer"
                  leftIcon={<Icon as={RiAddLine} />}
                  onClick={() => openModal()}
                >
                  Cadastrar novo caixa
                </Button>
              </Heading>

              <Table colorScheme="blackAlpha">
                <Thead>
                  <Tr>
                    <Th>Nome</Th>

                    <Th>Está Aberta?</Th>
                    <Th>Entradas</Th>
                    <Th>Saidas</Th>
                    <Th>Total Movimentado</Th>
                    <Th>Editar</Th>
                    <Th>Deletar</Th>
                  </Tr>
                </Thead>

                <Tbody>
                  {boxs.id ? (
                    <Tr key={boxs.id}>
                      <Td fontSize={{ base: "12", lg: "sm" }}>{boxs.name}</Td>

                      <Td fontSize={{ base: "12", lg: "sm" }}>
                        {boxs.boxIsOpen === true ? "SIM" : "NÃO"}
                      </Td>
                      <Td fontSize={{ base: "12", lg: "sm" }}>
                        {new Intl.NumberFormat("pt-BR", {
                          currency: "BRL",
                          style: "currency",
                        }).format(boxs.entryValues)}
                      </Td>
                      <Td fontSize={{ base: "12", lg: "sm" }}>
                        {new Intl.NumberFormat("pt-BR", {
                          currency: "BRL",
                          style: "currency",
                        }).format(boxs.exitValues)}
                      </Td>
                      <Td fontSize={{ base: "12", lg: "sm" }}>
                        {new Intl.NumberFormat("pt-BR", {
                          currency: "BRL",
                          style: "currency",
                        }).format(boxs.movimentedValues)}
                      </Td>
                      <Td fontSize={{ base: "12", lg: "sm" }}>
                        {" "}
                        <Button
                          cursor="pointer"
                          alignItems="center"
                          as="a"
                          size="sm"
                          fontSize="sm"
                          colorScheme="yellow"
                          leftIcon={<Icon size={28} as={RiPencilLine} />}
                          onClick={() => openModal()}
                        >
                          Editar Caixa
                        </Button>
                      </Td>
                      <Td>
                        <Button
                          cursor="pointer"
                          as="a"
                          size="sm"
                          fontSize="sm"
                          colorScheme="red"
                          leftIcon={<Icon as={BsFillTrashFill} />}
                          //onClick={() => handleDeleteSector(sector.id)}
                        >
                          Deletar Caixa
                        </Button>
                      </Td>
                    </Tr>
                  ) : (
                    <Tr>
                      <Td
                        colSpan={7}
                        fontSize={{ base: "12", lg: "sm" }}
                        fontWeight="bold"
                      >
                        Sem caixa cadastrado até o momento!
                      </Td>
                    </Tr>
                  )}
                </Tbody>
              </Table>
              <GenericModal isOpen={isModalOpen} onRequestClose={closeModal}>
                <FormControl as="form" onSubmit={handleSubmit(handleCreateBox)}>
                  <Flex
                    direction="column"
                    m="4"
                    gap="4"
                    align="center"
                    width="480px"
                  >
                    <Input
                      {...register("name")}
                      name="name"
                      label="Nome do caixa: "
                    />

                    <FormLabel htmlFor="boxIsOpen">
                      Caixa está aberto?
                    </FormLabel>
                    <Checkbox
                      size="lg"
                      {...register("boxIsOpen")}
                      name="boxIsOpen"
                    />

                    <Button type="submit" colorScheme="whatsapp">
                      CADASTRAR
                    </Button>
                  </Flex>
                </FormControl>
              </GenericModal>
            </Box>
          </Flex>
        </Flex>
      </AdminContainer>
    </ChakraProvider>
  );
}
