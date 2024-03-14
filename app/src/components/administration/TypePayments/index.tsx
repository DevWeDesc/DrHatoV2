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
  TableContainer,
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
              Painel de Instruções
              <Button
                as="a"
                mt={{ base: "5", md: 0 }}
                py="6"
                cursor="pointer"
                fontSize={{ base: "sm", lg: "md" }}
                colorScheme="whatsapp"
                leftIcon={<Icon as={RiAddLine} fontSize="20" />}
                onClick={() => openModal()}
              >
                Cadastrar novo tipo de Pagamento
              </Button>
            </Heading>
          </Flex>
          <TableContainer w="full">
            <Table colorScheme="blackAlpha">
              <Thead>
                <Tr>
                  <Th>Nome</Th>
                  <Th w="full" textAlign="center">
                    Id do Tipo de pagamento
                  </Th>
                  <Th textAlign="center">Editar</Th>
                  <Th textAlign="center">Deletar</Th>
                </Tr>
              </Thead>

              <Tbody>
                {allTypePayments ? (
                  allTypePayments.map((paymentType: any) => (
                    <Tr key={paymentType.id}>
                      <Td
                        fontSize={{ base: "12", lg: "sm" }}
                        fontWeight="medium"
                      >
                        {paymentType.typePayment}
                      </Td>
                      <Td
                        textAlign="center"
                        fontSize={{ base: "12", lg: "sm" }}
                      >
                        {paymentType.id}
                      </Td>

                      <Td display="flex" justifyContent="end">
                        <Button
                          fontSize={{ base: "sm", lg: "md" }}
                          cursor="pointer"
                          as="a"
                          size="sm"
                          colorScheme="yellow"
                          mr="3"
                          leftIcon={<Icon as={RiPencilLine} />}
                          onClick={() => openModalTwo(paymentType)}
                        >
                          Editar
                        </Button>
                      </Td>
                      <Td>
                        <ConfirmationDialog
                          fontSize={{ base: "sm", lg: "md" }}
                          disabled={false}
                          icon={<BsFillTrashFill fill="white" size={16} />}
                          buttonTitle="Deletar Tipo de pagamento"
                          whatIsConfirmerd={`Tem certeza que deseja Excluir o tipo de pagamento ${paymentType.typePayment}?`}
                          describreConfirm="Excluir a tipo de pagamento é uma ação irreversivel, tem certeza que deseja excluir?"
                          callbackFn={() =>
                            handleDeleteTypePayment(paymentType.id)
                          }
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
    </Flex>
  );
};
