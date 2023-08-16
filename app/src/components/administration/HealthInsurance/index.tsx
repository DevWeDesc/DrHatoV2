import React from "react";
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
  HStack,
  CheckboxGroup,
  Checkbox,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { RiAddLine, RiPencilLine } from "react-icons/ri";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { Header } from "../../admin/Header";
import { Sidebar } from "../../admin/Sidebar";
import { LoadingSpinner } from "../../../components/Loading";
import { DbContext } from "../../../contexts/DbContext";
import { GenericModal } from "../../../components/Modal/GenericModal";
import { AdminContainer } from "../../../pages/AdminDashboard/style";
import { api } from "../../../lib/axios";
import { toast } from "react-toastify";
import { Input } from "../../../components/admin/Input";
import { borderRadius } from "polished";
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
    <Box
      flex="1"
      borderRadius={8}
      bg="gray.200"
      p="8"
      maxH="44rem"
      overflow="auto"
    >
      <Flex mb="8" justify="space-between" direction="column" align="center">
        <Heading size="lg" fontWeight="bold" w="100%" mb="5">
          Painel de Plano de Saúde
        </Heading>

        <Button
          as="a"
          width="100%"
          fontSize="20"
          py="8"
          colorScheme="whatsapp"
          cursor="pointer"
          leftIcon={<Icon as={RiAddLine} />}
          onClick={() => setIsModalOpen(true)}
        >
          Cadastrar novo Plano de Saúde
        </Button>
      </Flex>

      <Table colorScheme="blackAlpha">
        <Thead>
          <Tr>
            <Th fontSize="18" borderColor="black" w="70%" colSpan={2}>
              Nome do Plano
            </Th>
            <Th borderColor="black" fontSize="18">
              Configurações do Plano
            </Th>
          </Tr>
        </Thead>

        <Tbody>
          {HealthInsuranceList ? (
            HealthInsuranceList.map((plans: any) => (
              <Tr key={plans.id}>
                <Td borderColor="black" colSpan={2}>
                  <Text fontWeight="bold" color="gray.800">
                    {plans.name}
                  </Text>
                </Td>
                <Td borderColor="black">
                  <Flex gap="2">
                    <Button
                      as="a"
                      size="sm"
                      fontSize="sm"
                      colorScheme="yellow"
                      leftIcon={<Icon as={RiPencilLine} />}
                      onClick={() =>
                        navigate(`/Admin/HealthInsurance/${plans.id}`)
                      }
                    >
                      Editar Plano
                    </Button>

                    <ConfirmationDialog
                      disabled={false}
                      icon={<BsFillTrashFill fill="white" size={16} />}
                      buttonTitle="Deletar Plano de Saúde"
                      whatIsConfirmerd="Tem certeza que deseja Excluir esse Plano de Saúde?"
                      describreConfirm="Excluir o Plano de Saúde é uma ação irreversivel, tem certeza que deseja excluir?"
                      callbackFn={() => DeleteHealth(plans.id)}
                    />
                  </Flex>
                </Td>
              </Tr>
            ))
          ) : (
            <LoadingSpinner />
          )}
        </Tbody>
      </Table>
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
  );
}
