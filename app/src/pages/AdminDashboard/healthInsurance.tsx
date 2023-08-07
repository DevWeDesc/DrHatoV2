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
import { Header } from "../../components/admin/Header";
import { Paginaton } from "../../components/admin/Pagination";
import { Sidebar } from "../../components/admin/Sidebar";
import { LoadingSpinner } from "../../components/Loading";
import { DbContext } from "../../contexts/DbContext";
import { GenericModal } from "../../components/Modal/GenericModal";
import { AdminContainer } from "../AdminDashboard/style";
import { api } from "../../lib/axios";
import { toast } from "react-toastify";
import { Input } from "../../components/admin/Input";
import { HealthInsuranceList } from "../../components/administration/HealthInsurance";

export function HealthInsurance() {
  // const { register, handleSubmit } = useForm();
  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const [isModalOpenTwo, setIsModalOpenTwo] = useState(false);
  // const [surgeries, setSurgeries] = useState([]);
  // const [reloadData, setReloadData] = useState<boolean>(false);

  // const navigate = useNavigate();

  // function openModal() {
  //   setIsModalOpen(true);
  // }
  // function closeModal() {
  //   setIsModalOpen(false);
  // }

  // function openModalTwo() {
  //   setIsModalOpenTwo(true);
  // }
  // function closeModalTwo() {
  //   setIsModalOpenTwo(false);
  // }

  // const handleCreateSector: SubmitHandler<FieldValues> = async (values) => {
  //   try {
  //     const data = {
  //       name: values.name,
  //       price: parseInt(values.price),
  //     };
  //     await api.post("surgeries", data);
  //     setReloadData(true);
  //     toast.success("Cirurgia criada com sucesso");
  //   } catch (error) {
  //     toast.error("Falha ao criar nova cirurgia");
  //   }
  // };

  // async function handleDeleteSector(id: string | number) {
  //   const confirm = window.confirm(
  //     "Deletar e uma operação irreversivel deseja mesmo continuar?"
  //   );
  //   try {
  //     if (confirm === true) {
  //       await api.delete(`sectors/${id}`);
  //       toast.success("Setor deletdo com sucesso");
  //     }
  //   } catch (error) {
  //     toast.error("Falha ao criar novo setor");
  //   }
  // }

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

  // async function getSurgeryes() {
  //   const Surgeries = await api.get("/surgeries");
  //   setSurgeries(Surgeries.data);
  // }

  // useEffect(() => {
  //   getSurgeryes();
  // }, []);

  // useEffect(() => {
  //   if (reloadData === true) {
  //     getSurgeryes();
  //     setReloadData(false);
  //   }
  // }, [reloadData]);

  return (
    <ChakraProvider>
      <AdminContainer>
        <Flex direction="column" h="100vh">
          <Header title="Painel de Plano de Saúde" url="/Admin/" />

          <Flex w="100%" my="6" maxWidth={1680} mx="auto" px="6">
            <Sidebar />
            <HealthInsuranceList />
          </Flex>
        </Flex>
      </AdminContainer>
    </ChakraProvider>
  );
}
