import {
  Text,
  Box,
  Button,
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
  TableContainer,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { RiAddLine, RiPencilLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { LoadingSpinner } from "../../../components/Loading";
import { GenericModal } from "../../../components/Modal/GenericModal";
import { api } from "../../../lib/axios";
import { toast } from "react-toastify";
import { Input } from "../../../components/admin/Input";
import { ConfirmationDialog } from "../../dialogConfirmComponent/ConfirmationDialog";
import { BsFillTrashFill } from "react-icons/bs";

export function HealthInsuranceList() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenTwo, setIsModalOpenTwo] = useState(false);
  const [surgeries, setSurgeries] = useState([]);
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

  const handleCreateSector: SubmitHandler<FieldValues> = async (values) => {
    try {
      const data = {
        name: values.name,
      };
      await api.post("/healthInsurance", data);
      setReloadData(true);
      toast.success("Plano de saúde criado com sucesso!!");
    } catch (error) {
      toast.error("Falha ao criar novo Plano de saúde!!");
    }
  };

  // const handleEditSector: SubmitHandler<FieldValues> = async (values) => {
  //   try {
  //     const data = {
  //       name: values.name,
  //     };
  //     await api.put(`sectors/${values.id}`, data);
  //     toast.success("Setor editado com sucesso");
  //     navigate(0);
  //   } catch (error) {
  //     toast.error("Falha ao editar novo setor");
  //   }
  // };

  async function getSurgeryes() {
    const Surgeries = await api.get("/healthInsurance");
    setSurgeries(Surgeries.data);
  }

  useEffect(() => {
    getSurgeryes();
  }, []);

  useEffect(() => {
    if (reloadData === true) {
      getSurgeryes();
      setReloadData(false);
    }
  }, [reloadData]);

  const HealthInsuranceList = [
    {
      id: 1,
      name: "PetLove",
    },
    {
      id: 2,
      name: "ComVet",
    },
    {
      id: 3,
      name: "PlanVet",
    },
  ];

  async function DeleteHealth(Id: string) {
    await api
      .delete(`/healthInsurance/${Id}`)
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
              Painel de Plano de Saúde
              <Button
                py="6"
                fontSize={{ base: "12", lg: "sm" }}
                colorScheme="whatsapp"
                leftIcon={<Icon as={RiAddLine} />}
                onClick={() => setIsModalOpen(true)}
              >
                Cadastrar novo Plano de Saúde
              </Button>
            </Heading>
          </Flex>
          <TableContainer w="full">
            <Table colorScheme="blackAlpha">
              <Thead>
                <Tr>
                  <Th w="full" colSpan={2}>
                    Nome
                  </Th>
                  <Th>Editar</Th>
                  <Th>Deletar</Th>
                </Tr>
              </Thead>

              <Tbody>
                {HealthInsuranceList ? (
                  HealthInsuranceList.map((plans: any) => (
                    <Tr key={plans.id}>
                      <Td
                        fontSize={{ base: "12", lg: "sm" }}
                        fontWeight="medium"
                        colSpan={2}
                      >
                        {plans.name}
                      </Td>
                      <Td>
                        <Flex gap="2">
                          <Button
                            cursor="pointer"
                            as="a"
                            size="sm"
                            fontSize={{ base: "12", lg: "sm" }}
                            colorScheme="yellow"
                            leftIcon={<Icon as={RiPencilLine} />}
                            onClick={() =>
                              navigate(`/Admin/HealthInsurance/${plans.id}`)
                            }
                          >
                            Editar Plano
                          </Button>
                        </Flex>
                      </Td>
                      <Td>
                        {" "}
                        <ConfirmationDialog
                          fontSize={{ base: "12", lg: "sm" }}
                          disabled={false}
                          icon={<BsFillTrashFill fill="white" size={16} />}
                          buttonTitle="Deletar Plano de Saúde"
                          whatIsConfirmerd={`Tem certeza que deseja Excluir o Plano de Saúde ${plans.name}?`}
                          describreConfirm="Excluir o Plano de Saúde é uma ação irreversivel, tem certeza que deseja excluir?"
                          callbackFn={() => DeleteHealth(plans.id)}
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
              label="Nome da Plano"
              mb="4"
            />

            <Button w="100%" type="submit" colorScheme="green" m="2">
              Cadastrar
            </Button>
          </FormControl>
        </GenericModal>
      </Box>
    </Flex>
  );
}
