import {
  Box,
  Button,
  ChakraProvider,
  Flex,
  Heading,
  Icon,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useState } from "react";
import { RiAddLine } from "react-icons/ri";
import { useParams } from "react-router-dom";
import { Header } from "../../components/admin/Header";
import { Sidebar } from "../../components/admin/Sidebar";
import { AdminContainer } from "../AdminDashboard/style";
import { api } from "../../lib/axios";
import { GenericModal } from "../../components/Modal/GenericModal";
import { Input } from "../../components/admin/Input";
import { toast } from "react-toastify";
import { ConfirmationDialog } from "../../components/dialogConfirmComponent/ConfirmationDialog";
import { BsFillTrashFill } from "react-icons/bs";
import { useQuery } from "react-query";
import { LoadingSpinner } from "../../components/Loading";
import { SubmitHandler, useForm } from "react-hook-form";

interface IEspecieData {
  esp: IEspecieObject;
}

interface IEspecieObject {
  id: number;
  name: string;
  race: Array<{
    id: number;
    name: string;
  }>;
}

interface IFormInput {
  raceName: string;
}

export function AdminCadRaces() {
  const { espId } = useParams<{ espId: string }>();
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["racesData"],
    queryFn: async () =>
      await api
        .get<IEspecieData>(`/pets/especie/${espId}`)
        .then((res) => res.data.esp),
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  function openModal() {
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  const onSubmit: SubmitHandler<IFormInput> = async (values) => {
    const data = {
      espId: Number(espId),
      name: values.raceName,
    };
    await api
      .post(`/pets/races`, data)
      .then(() => {
        reset();
        refetch();
        closeModal();
        toast.success("Raça cadastrada com sucesso");
      })
      .catch(() => toast.error("Falha ao realizar cadastro de nova raça"));
  };

  async function DeleteRace(RaceId: string | number) {
    await api
      .delete(`/pets/races/${RaceId}`)
      .then(() => {
        toast.success("Raça deletada com sucesso!!");
        refetch();
      })
      .catch(() => toast.error("Algo deu errado!!"));
  }

  if (isLoading) return <LoadingSpinner />;
  return (
    <ChakraProvider>
      <AdminContainer>
        <Flex direction="column" h="100vh">
          <Header title="Painel de Cirurgia" url="/Admin/Especies" />

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
              py={{ base: "8", xl: "0" }}
              maxH="44rem"
              overflow="auto"
            >
              <Heading
                display="flex"
                justifyContent="space-between"
                flexDirection={{ base: "column", md: "row" }}
                size="lg"
                fontWeight="bold"
                fontSize={{ base: "xl", lg: "2xl" }}
                w="100%"
                mb="5"
              >
                Painel de Raças - Especie: {data?.name}
                <Button
                  as="a"
                  fontSize={{ base: "md", xl: "lg" }}
                  py="8"
                  colorScheme="whatsapp"
                  cursor="pointer"
                  leftIcon={<Icon as={RiAddLine} />}
                  mb="2"
                  onClick={openModal}
                >
                  Cadastrar nova Raça
                </Button>
              </Heading>

              <Table colorScheme="blackAlpha">
                <Thead>
                  <Tr>
                    <Th>Raça</Th>
                    <Th>Excluir?</Th>
                  </Tr>
                </Thead>

                <Tbody>
                  {data?.race?.map((race) => (
                    <Tr key={race.id}>
                      <Td>{race.name}</Td>

                      <Td>
                        <ConfirmationDialog
                          fontSize={{ base: "sm", lg: "md" }}
                          disabled={false}
                          icon={<BsFillTrashFill fill="white" size={16} />}
                          buttonTitle="Deletar Raça"
                          whatIsConfirmerd={`Tem certeza que deseja Excluir a Raça ${race.name}?`}
                          describreConfirm="Excluir a Raça é uma ação irreversivel, tem certeza que deseja excluir?"
                          callbackFn={() => DeleteRace(race.id)}
                        />
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Box>
          </Flex>
        </Flex>
      </AdminContainer>
      <GenericModal isOpen={isModalOpen} onRequestClose={closeModal}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            mb={1}
            {...register("raceName", { required: true })}
            name="raceName"
            label="Nome da Raça"
          />
          {errors.raceName?.type === "required" && (
            <Text
              mb="2"
              textAlign="center"
              fontWeight="semibold"
              fontSize="sm"
              textColor="red.500"
            >
              Nome da raça é Obrigatório!
            </Text>
          )}

          <Button type="submit" w="100%" colorScheme="green" my="2">
            Cadastrar
          </Button>
        </form>
      </GenericModal>
    </ChakraProvider>
  );
}
