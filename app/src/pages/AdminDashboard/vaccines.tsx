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
  Textarea,
  Text,
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
import { ConfirmationDialog } from "../../components/dialogConfirmComponent/ConfirmationDialog";
import { CiStethoscope } from "react-icons/ci";
import { BsFillTrashFill } from "react-icons/bs";
import vaccines from "../Admissions/vaccines";

interface VaccinesProps {
  id: number | string;
  name: string;
  price: number;
  description: string;
}

export default function AdminVaccines() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { register, handleSubmit } = useForm();
  const [vaccines, setVaccines] = useState<VaccinesProps[]>([]);
  const [reloadData, setReloadData] = useState(false);
  const handleCreateVaccine: SubmitHandler<FieldValues> = async (values) => {
    try {
      const data = {
        name: values.name,
        price: Number(values.price),
        description: values.description,
      };
      await api.post("vaccines", data);
      setReloadData(true);
      toast.success("Vacina criada com sucesso");
    } catch (error) {
      toast.error("Falha ao criar nova Vacina");
      console.log(error);
    }
  };

  async function GetVaccine() {
    try {
      const response = await api.get("/vaccines");

      setVaccines(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function DeleteVaccine(vaccineId: string | number) {
    await api
      .delete(`/vaccine/${vaccineId}`)
      .then(() => toast.success("Vacina deletada com sucesso"))
      .catch(() => toast.error("Algo deu errado!!"));
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

  console.log(vaccines);

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
                fontSize={{ base: "xl", lg: "2xl" }}
                fontWeight="bold"
                pl="2"
                w="100%"
                mb="5"
                display="flex"
                flexDirection={{ base: "column", md: "row" }}
                gap={{ base: 3, md: 0 }}
                justifyContent="space-between"
              >
                Vacinas
                <Button
                  py="6"
                  fontSize={{ base: "sm", lg: "md" }}
                  colorScheme="whatsapp"
                  cursor="pointer"
                  leftIcon={<Icon as={RiAddLine} />}
                  onClick={() => openModal()}
                >
                  Cadastrar nova Vacina
                </Button>
              </Heading>

              <Table colorScheme="blackAlpha">
                <Thead>
                  <Tr>
                    <Th>Vacina</Th>

                    <Th>Valor</Th>
                    <Th textAlign="end">Configurações</Th>
                  </Tr>
                </Thead>

                <Tbody>
                  {vaccines.map((vaccine) => (
                    <Tr key={vaccine.id}>
                      <Td fontSize={{ base: "12", lg: "sm" }}>
                        {vaccine.name}
                      </Td>
                      <Td fontSize={{ base: "12", lg: "sm" }}>
                        R${vaccine.price}
                      </Td>

                      <Td>
                        <Flex gap="2" justifyContent="end">
                          <Button
                            fontSize={{ base: "sm", lg: "md" }}
                            alignItems="center"
                            size="sm"
                            colorScheme="yellow"
                            leftIcon={<Icon size={28} as={RiPencilLine} />}
                            onClick={() => openModal()}
                          >
                            Editar Vacina
                          </Button>
                          <ConfirmationDialog
                            fontSize={{ base: "sm", lg: "md" }}
                            disabled={false}
                            icon={<BsFillTrashFill fill="white" size={16} />}
                            buttonTitle="Deletar Vacina"
                            whatIsConfirmerd={`Tem certeza que deseja Excluir a Vacina ${vaccine.name}?`}
                            describreConfirm="Excluir a vacina é uma ação irreverssivel tem certeza que deseja excluir?"
                            callbackFn={() => DeleteVaccine(vaccine.id)}
                          />
                        </Flex>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>

              <GenericModal isOpen={isModalOpen} onRequestClose={closeModal}>
                <FormControl
                  as="form"
                  onSubmit={handleSubmit(handleCreateVaccine)}
                >
                  <Flex direction="column" m="4" gap="4" align="center">
                    <Input
                      {...register("name")}
                      name="name"
                      label="Nome da Vacina: "
                    />
                    <Input
                      {...register("price")}
                      name="price"
                      label="Preço da Vacina: "
                    />

                    <Text w="full" fontSize={{ base: "sm", lg: "md" }}>
                      Descrição da Vacina:{" "}
                    </Text>
                    <Textarea
                      borderColor="gray.900"
                      minH="20vh"
                      {...register("description")}
                      name="description"
                    />

                    <Button
                      w="full"
                      fontSize={{ base: "sm", lg: "md" }}
                      type="submit"
                      colorScheme="whatsapp"
                    >
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
