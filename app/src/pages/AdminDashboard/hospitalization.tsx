import {
  Text,
  Box,
  Button,
  ChakraProvider,
  Flex,
  Heading,
  Icon,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  FormControl,
  Textarea,
  FormLabel,
  TableContainer,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { RiAddLine, RiPencilLine } from "react-icons/ri";
import { Header } from "../../components/admin/Header";
import { Sidebar } from "../../components/admin/Sidebar";
import { LoadingSpinner } from "../../components/Loading";
import { GenericModal } from "../../components/Modal/GenericModal";
import { AdminContainer } from "../AdminDashboard/style";
import { api } from "../../lib/axios";
import { toast } from "react-toastify";
import { Input } from "../../components/admin/Input";
import { ConfirmationDialog } from "../../components/dialogConfirmComponent/ConfirmationDialog";
import { BsFillTrashFill } from "react-icons/bs";

interface IBeds {
  id: number | string;
  name: string;
  totalBeds: string;
  price: number;
}

export function Hospitalization() {
  const { register, handleSubmit } = useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenTwo, setIsModalOpenTwo] = useState(false);
  const [beds, setBeds] = useState<IBeds[]>([]);
  const [bedSelected, setBedSelected] = useState({} as IBeds);
  const [reloadData, setReloadData] = useState<boolean>(false);

  function openModal() {
    setIsModalOpen(true);
  }
  function closeModal() {
    setIsModalOpen(false);
  }

  function openModalTwo() {
    setIsModalOpenTwo(true);
  }
  function closeModalTwo() {
    setIsModalOpenTwo(false);
  }
  const handleSelectSector = (bed: IBeds) => {
    setBedSelected({
      id: bed.id,
      name: bed.name,
      totalBeds: bed.totalBeds,
      price: bed.price,
    });
  };

  const handleCreateSector: SubmitHandler<FieldValues> = async (values) => {
    try {
      const data = {
        name: values.name,
        totalBeds: parseInt(values.totalBeds),
        description: values.description,
        price: Number(values.price),
      };
      await api.post("/admissions", data);
      setReloadData(true);
      toast.success("Leito criado com sucesso!");
    } catch (error) {
      toast.error("Falha ao criar novo Leito");
    }
  };

  async function handleDeleteSector(id: string | number) {
    try {
      await api.delete(`admissions/${id}`);
      setReloadData(true);
      toast.success("Leito deletado com sucesso!!");
    } catch (error) {
      toast.error("Falha ao deletar o Leito!!");
    }
  }

  const handleEditSector: SubmitHandler<FieldValues> = async (values) => {
    try {
      const data = {
        name: bedSelected.name,
      };
      await api.put(`sectors/${bedSelected.id}`, data);
      setReloadData(true);
      toast.success("Leitos editado com sucesso");
    } catch (error) {
      toast.error("Falha ao editar novo Leitos");
    }
  };

  async function getBeds() {
    try {
      const totalBeds = await api.get("/admissions");
      setBeds(totalBeds.data);
    } catch (error) {
      console.error("Erro para consumir", error);
    }
  }
  useEffect(() => {
    getBeds();
  }, []);

  useEffect(() => {
    if (reloadData === true) {
      getBeds();
      setReloadData(false);
    }
  }, [reloadData]);
  return (
    <ChakraProvider>
      <AdminContainer>
        <Flex direction="column" h="100vh">
          <Header title="Leitos internação" url="/Admin/" />

          <Flex
            w="100%"
            my="6"
            direction={{ base: "column", xl: "row" }}
            mx="auto"
            px="6"
          >
            <Sidebar />
            <Flex
              py={{ base: 10, xl: 0 }}
              direction="column"
              gap="4"
              w="full"
              maxH="48rem"
            >
              <Box borderRadius={8} overflow="auto">
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
                      Leitos para internação
                      <Button
                        py="6"
                        fontSize={{ base: "sm", lg: "md" }}
                        colorScheme="whatsapp"
                        cursor="pointer"
                        leftIcon={<Icon as={RiAddLine} />}
                        onClick={() => openModal()}
                      >
                        Cadastrar novo Leito de internação
                      </Button>
                    </Heading>
                  </Flex>
                  <TableContainer w="full">
                    <Table colorScheme="blackAlpha">
                      <Thead>
                        <Tr>
                          <Th>Nome</Th>
                          <Th>Quantidade de Camas</Th>
                          <Th>Preço diária</Th>
                          <Th />
                        </Tr>
                      </Thead>
                      <Tbody>
                        {beds ? (
                          beds.map((bed: IBeds) => (
                            <Tr key={bed.id}>
                              <Td fontSize={{ base: "12", lg: "sm" }}>
                                {bed.name}
                              </Td>
                              <Td fontSize={{ base: "12", lg: "sm" }}>
                                {bed.totalBeds}
                              </Td>
                              <Td fontSize={{ base: "12", lg: "sm" }}>
                                {bed.price}
                              </Td>
                              <Td
                                display="flex"
                                gap={2}
                                justifyContent="end"
                                fontSize={{ base: "12", lg: "sm" }}
                              >
                                <Button
                                  alignItems="center"
                                  size="sm"
                                  width={120}
                                  fontSize="sm"
                                  colorScheme="yellow"
                                  leftIcon={<Icon as={RiPencilLine} />}
                                  onClick={() => {
                                    openModalTwo();
                                    handleSelectSector(bed);
                                  }}
                                >
                                  Editar Leito
                                </Button>

                                <ConfirmationDialog
                                  disabled={false}
                                  icon={
                                    <BsFillTrashFill fill="white" size={16} />
                                  }
                                  buttonTitle="Deletar Leito"
                                  whatIsConfirmerd="Tem certeza que deseja Excluir esse Leito?"
                                  describreConfirm="Excluir Leito é uma ação irreversivel, tem certeza que deseja excluir?"
                                  callbackFn={() => handleDeleteSector(bed.id)}
                                />
                              </Td>
                            </Tr>
                          ))
                        ) : (
                          <LoadingSpinner />
                        )}
                      </Tbody>
                    </Table>
                  </TableContainer>
                </Flex>

                <GenericModal isOpen={isModalOpen} onRequestClose={closeModal}>
                  <FormControl
                    as="form"
                    onSubmit={handleSubmit(handleCreateSector)}
                    display="flex"
                    flexDir="column"
                    alignItems="center"
                  >
                    <Input
                      {...register("name")}
                      name="name"
                      label="Nome do leito"
                      mb="4"
                    />
                    <Input
                      type="number"
                      {...register("price")}
                      name="price"
                      label="Preço da Diária"
                    />

                    <Input
                      {...register("totalBeds")}
                      name="totalBeds"
                      label="Quantidade de Camas"
                      type="number"
                      mb="4"
                    />

                    <FormLabel htmlFor="description">
                      Descrição ou Observação do leito:{" "}
                    </FormLabel>
                    <Textarea {...register("description")} name="description" />

                    <Button w="100%" type="submit" colorScheme="green" m="4">
                      Cadastrar
                    </Button>
                  </FormControl>
                </GenericModal>

                <GenericModal
                  isOpen={isModalOpenTwo}
                  onRequestClose={closeModalTwo}
                >
                  <FormControl
                    as="form"
                    onSubmit={handleSubmit(handleEditSector)}
                    display="flex"
                    flexDir="column"
                    alignItems="center"
                  >
                    <Text pb="15">Editar Leito</Text>
                    {/* <Input
                      {...register("id")}
                      name="id"
                      label="Id do Leito"
                      mb="4"
                    /> */}
                    <Input
                      defaultValue={bedSelected.name}
                      onChange={(ev) =>
                        setBedSelected({
                          ...bedSelected,
                          name: ev.target.value,
                        })
                      }
                      name="name"
                      label="Nome do Leito"
                      mb="4"
                    />

                    <Input
                      defaultValue={bedSelected.totalBeds}
                      onChange={(ev) =>
                        setBedSelected({
                          ...bedSelected,
                          totalBeds: ev.target.value,
                        })
                      }
                      name="id"
                      label="Quantidade de Leitos"
                      mb="4"
                    />

                    <Button w="100%" type="submit" colorScheme="yellow" m="2">
                      Editar
                    </Button>
                  </FormControl>
                </GenericModal>
              </Box>
            </Flex>
          </Flex>
        </Flex>
      </AdminContainer>
    </ChakraProvider>
  );
}
