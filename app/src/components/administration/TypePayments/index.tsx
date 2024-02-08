import {
  Flex,
  Heading,
  Button,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  FormControl,
  Icon,
  Box,
  Table,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BsFillTrashFill } from "react-icons/bs";
import { RiAddLine, RiPencilLine } from "react-icons/ri";
import { LoadingSpinner } from "../../Loading";
import { GenericModal } from "../../Modal/GenericModal";
import { ConfirmationDialog } from "../../dialogConfirmComponent/ConfirmationDialog";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { toast } from "react-toastify";
import { api } from "../../../lib/axios";
import { Input } from "../../admin/Input";

interface IPaymentType {
  id?: number;
  typePayments: string;
}

export const TypePayments = () => {
  const { register, handleSubmit, reset } = useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenTwo, setIsModalOpenTwo] = useState(false);
  const [reloadData, setReloadData] = useState<boolean>(false);
  const [allTypePayments, setAllTypePayments] = useState<IPaymentType[]>([]);
  const [typePaymentSelected, setTypePaymentSelected] = useState(
    {} as IPaymentType
  );

  function openModal() {
    setIsModalOpen(true);
  }
  function closeModal() {
    setIsModalOpen(false);
  }

  function openModalTwo(paymentType: IPaymentType) {
    reset();
    setTypePaymentSelected({
      typePayments: paymentType.typePayments,
      id: paymentType.id,
    });
    setIsModalOpenTwo(true);
  }
  function closeModalTwo() {
    setIsModalOpenTwo(false);
  }

  const handleCreateTypePayment: SubmitHandler<FieldValues> = async (
    values
  ) => {
    try {
      // const data = {
      //   typePayment: values.name,
      // };
      await api.post("paymentsType", values);
      setReloadData(true);
      toast.success("Tipo de pagamento criado com sucesso");
    } catch (error) {
      toast.error("Falha ao criar nova Instrução");
    }
  };

  async function handleDeleteTypePayment(id: string | number) {
    try {
      await api.delete(`paymentsType/${id}`);
      setReloadData(true);
      toast.success("Tipo de pagamento deletado sucesso");
    } catch (error) {
      toast.error("Falha ao deletar");
    }
  }

  const handleEditTypePayment: SubmitHandler<FieldValues> = async (values) => {
    try {
      const data = {
        typePayment: values.typePaymentEdit,
      };
      await api.put(`paymentsType/${typePaymentSelected.id}`, data);
      setReloadData(true);
      toast.success("Tipo de pagamento editado com sucesso");
    } catch (error) {
      toast.error("Falha ao editar nova instrução");
    }
  };

  async function getTypePayments() {
    const Instructions = await api.get("/paymentsType");
    setAllTypePayments(Instructions.data);
  }

  useEffect(() => {
    getTypePayments();
  }, []);

  useEffect(() => {
    if (reloadData === true) {
      getTypePayments();
      setReloadData(false);
    }
  }, [reloadData]);
  return (
    <Box flex="1" borderRadius={8} bg="gray.200" overflow="auto" p="8">
      <Flex mb="8" direction="column" justify="space-between" align="center">
        <Heading width="100%" fontSize="30" fontWeight="bold">
          Painel de Instruções
        </Heading>

        <Button
          as="a"
          mt="5"
          width="100%"
          py="8"
          cursor="pointer"
          fontSize="20"
          colorScheme="whatsapp"
          leftIcon={<Icon as={RiAddLine} fontSize="20" />}
          onClick={() => openModal()}
        >
          Cadastrar novo tipo de Pagamento
        </Button>
      </Flex>

      <Table colorScheme="blackAlpha">
        <Thead>
          <Tr borderColor="black">
            <Th borderColor="black" fontSize="18">
              Nome
            </Th>
            <Th borderColor="black" fontSize="18">
              Id do Tipo de pagamento
            </Th>
            <Th borderColor="black"></Th>
          </Tr>
        </Thead>

        <Tbody>
          {allTypePayments ? (
            allTypePayments.map((paymentType: any) => (
              <Tr key={paymentType.id}>
                <Td borderColor="black">
                  <Text fontWeight="bold" fontSize="16" color="gray.800">
                    {paymentType.typePayment}
                  </Text>
                </Td>
                <Td borderColor="black" fontSize="16" fontWeight="bold">
                  {paymentType.id}
                </Td>

                <Td borderColor="black">
                  <Flex ml="16%">
                    <Button
                      as="a"
                      size="sm"
                      fontSize="sm"
                      colorScheme="yellow"
                      mr="3"
                      leftIcon={<Icon as={RiPencilLine} />}
                      onClick={() => openModalTwo(paymentType)}
                    >
                      Editar Tipo de pagamento
                    </Button>

                    <ConfirmationDialog
                      disabled={false}
                      icon={<BsFillTrashFill fill="white" size={16} />}
                      buttonTitle="Deletar Tipo de pagamento"
                      whatIsConfirmerd={`Tem certeza que deseja Excluir o tipo de pagamento ${paymentType.typePayment}?`}
                      describreConfirm="Excluir a tipo de pagamento é uma ação irreversivel, tem certeza que deseja excluir?"
                      callbackFn={() => handleDeleteTypePayment(paymentType.id)}
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
          onSubmit={handleSubmit(handleCreateTypePayment)}
          display="flex"
          flexDir="column"
          alignItems="center"
        >
          <Input
            {...register("typePayment")}
            name="typePayment"
            label="Nome do tipo de pagamento"
            mb="4"
          />

          <Button w="100%" type="submit" colorScheme="green" m="2">
            Cadastrar
          </Button>
        </FormControl>
      </GenericModal>

      <GenericModal
        isOpen={isModalOpenTwo}
        onRequestClose={() => {
          reset();
          closeModalTwo();
        }}
      >
        <FormControl
          as="form"
          onSubmit={handleSubmit(handleEditTypePayment)}
          display="flex"
          flexDir="column"
          alignItems="center"
        >
          <Text fontWeight="bold" mb={6}>
            Editar Tipo de pagamento
          </Text>
          <Input
            defaultValue={typePaymentSelected.typePayments}
            {...register("typePaymentEdit")}
            name="typePaymentEdit"
            label="Nome da Instrução"
            mb="4"
          />
          <Input
            isDisabled
            defaultValue={typePaymentSelected.id}
            name="id"
            label="Id da Instrução"
            mb="4"
          />

          <Button w="100%" type="submit" colorScheme="green" m="2">
            Cadastrar
          </Button>
        </FormControl>
      </GenericModal>
    </Box>
  );
};
