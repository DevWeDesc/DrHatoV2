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
import { motion } from "framer-motion";

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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <ChakraProvider>
        <AdminContainer>
          <Flex direction="column" h="100vh">
            <Header title="Vacinas" />

            <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
              <Sidebar />
              <Box
                flex="1"
                borderRadius={8}
                bg="gray.200"
                p="8"
                maxH="44rem"
                overflow="auto"
              >
                <Flex
                  mb="8"
                  justify="space-between"
                  direction="column"
                  align="center"
                >
                  <Heading size="lg" fontWeight="bold" w="100%" mb="5">
                    Vacinas
                  </Heading>

                  <Button
                    as="a"
                    width="100%"
                    fontSize="20"
                    py="8"
                    colorScheme="whatsapp"
                    cursor="pointer"
                    leftIcon={<Icon as={RiAddLine} />}
                    onClick={() => openModal()}
                  >
                    Cadastrar nova Vacina
                  </Button>
                </Flex>

                <Table colorScheme="blackAlpha">
                  <Thead>
                    <Tr>
                      <Th fontSize="18" borderColor="black">
                        Vacina
                      </Th>
                      <Th borderColor="black"></Th>
                      <Th fontSize="18" borderColor="black">
                        Valor
                      </Th>
                      <Th borderColor="black"></Th>
                    </Tr>
                  </Thead>

                  <Tbody>
                    {vaccines.map((vaccine) => (
                      <Tr key={vaccine.id}>
                        <Td borderColor="black">
                          <Text fontWeight="bold" color="gray.800">
                            {vaccine.name}
                          </Text>
                        </Td>
                        <Td borderColor="black"></Td>
                        <Td borderColor="black">R${vaccine.price}</Td>

                        <Td borderColor="black">
                          <Flex gap="2" ml="50%">
                            <Button
                              alignItems="center"
                              as="a"
                              size="md"
                              fontSize="md"
                              colorScheme="yellow"
                              width={220}
                              leftIcon={<Icon size={28} as={RiPencilLine} />}
                              onClick={() => openModal()}
                            >
                              Editar Vacina
                            </Button>
                            <Button
                              width={220}
                              as="a"
                              size="md"
                              fontSize="md"
                              colorScheme="red"
                              leftIcon={<Icon as={RiPencilLine} />}
                              //onClick={() => handleDeleteSector(sector.id)}
                            >
                              Deletar Vacina
                            </Button>
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
                    <Flex
                      direction="column"
                      m="4"
                      gap="4"
                      align="center"
                      width="480px"
                      height="680px"
                    >
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

                      <FormLabel htmlFor="description">
                        Descrição da Vacina:{" "}
                      </FormLabel>
                      <Textarea
                        borderColor="gray.900"
                        height="500px"
                        {...register("description")}
                        name="description"
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
    </motion.div>
  );
}
