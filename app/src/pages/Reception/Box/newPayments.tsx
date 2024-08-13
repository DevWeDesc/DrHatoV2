import {
  Box,
  ChakraProvider,
  Flex,
  Table,
  Tr,
  Td,
  Thead,
  Tbody,
  Th,
  Button,
  TableContainer,
  Input,
  Select,
  Text,
  BoxProps,
} from "@chakra-ui/react";
import { Input as SInput } from "../../../components/admin/Input";
import { Header } from "../../../components/admin/Header";
import { AdminContainer } from "../../AdminDashboard/style";
import { useState } from "react";
import { api } from "../../../lib/axios";
import { useNavigate, useParams } from "react-router-dom";
import { GenericSidebar } from "../../../components/Sidebars/GenericSideBar";
import { GenericLink } from "../../../components/Sidebars/GenericLink";
import { GiCardDiscard } from "react-icons/gi";
import { BsCashCoin } from "react-icons/bs";
import { BsReception4 } from "react-icons/bs";
import { HistoryBoxProps, ICustomer } from "../../../interfaces";
import { GenericModal } from "../../../components/Modal/GenericModal";
import { BiMoney } from "react-icons/bi";
import { toast } from "react-toastify";
import { useQuery } from "react-query";
import { LoadingSpinner } from "../../../components/Loading";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { normalizeCurrency } from "../../../utils/mask/masks";

interface ICustomerProps extends ICustomer {
  CodCli: string;
}

export function BoxNewPayments() {
  const [customers, setCostumers] = useState({} as ICustomerProps);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [valueTotal, setValueTotal] = useState(0);
  const [paymentType, setPaymentType] = useState("");
  const [dailyBox, setDailyBox] = useState({} as HistoryBoxProps);
  const [fatherBox, setFatherBox] = useState({} as BoxProps);
  const [installmentsValue, setInstallmentsValue] = useState(0);
  const { id } = useParams<{ id: string }>();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({});

  async function GetDailyBox() {
    const response = await api.get("/dailybox");
    setDailyBox(response.data);
  }
  async function getFatherBox() {
    const response = await api.get("/vetbox");
    setFatherBox(response.data);
  }

  async function getCustomers() {
    const response = await api.get(`/customers/${id}`);
    setCostumers(response.data.customer);
  }

  const { isLoading: isFatherBoxLoading } = useQuery("fatherBox", getFatherBox);
  const { isLoading: isDailyBoxLoading } = useQuery("dailyBox", GetDailyBox);
  const { isLoading: isCustomerLoading } = useQuery("customer", getCustomers);

  if (isDailyBoxLoading || isCustomerLoading || isFatherBoxLoading) {
    return <LoadingSpinner />;
  }

  async function resetModalState() {
    setInstallmentsValue(0);
    setPaymentType("");
  }

  async function handleNewPayment(data: FieldValues) {
    const parseCurrency = (value: string) => {
      return Number(value.replace("R$ ", "").replace(",", "."));
    };
    const installmentValues = Array.from(
      { length: installmentsValue },
      (_, i) => {
        const key = `installmentValue-${i + 1}`;
        return data[key] ? parseCurrency(data[key]) : 0;
      }
    );

    if (installmentValues.includes(0)) {
      toast.warning("Valor da parcela não pode ser R$ 0,00!");
      return;
    }

    const total = installmentValues.reduce((acc, value) => acc + value, 0);
    setValueTotal(total);

    await openInstallmentPayment();
  }

  async function openInstallmentPayment() {
    const data = {
      debitName: "",
      totalDebit: Number(valueTotal),
      installmentAmount: Number(installmentsValue),
      paymentType: paymentType,
      consultId: customers.customerAccount.consultId,
    };

    try {
      if (valueTotal > customers.customerAccount?.debits) {
        toast.warning("Valor ultrapassa débito do cliente!");
        return;
      }
      if (valueTotal < customers.customerAccount?.debits) {
        toast.warning("Valor menor que débito do cliente!");
        return;
      }
      if (valueTotal === 0) {
        toast.warning("Valor não pode ser 0!");
        return;
      }
      await api.post(
        `/account/installments/${customers.id}/${dailyBox.id}/${fatherBox.id}`,
        data
      );
      toast.success("Parcelamento realizado com sucesso!");
      navigate(`/Recepcao/Caixa/Pagamentos/${customers.id}`);
    } catch (error) {
      console.log(error);
      toast.error("Falha ao realizar pagamento!");
    }
  }

  return (
    <ChakraProvider>
      <AdminContainer>
        <Flex direction="column" h="100vh" maxWidth={1680}>
          <Header
            title=" Conta Corrente - Novo Lançamento"
            url={`/Recepcao/Caixa/Pagamentos/${id}`}
          />
          <Flex w="100%" my="6" maxWidth={1680} mx="auto" px="6">
            <GenericSidebar>
              <GenericLink
                name="Recepção"
                icon={BsReception4}
                path={`/Recepcao/`}
              />
              <GenericLink
                name="Painel de Pagamentos"
                icon={BsCashCoin}
                path="/Recepcao/Caixa/Pagamentos"
              />
              <GenericLink
                name="Painel de conta Corrente"
                icon={GiCardDiscard}
                path={`/Recepcao/Caixa/Pagamentos/${id}`}
              />
            </GenericSidebar>
            <Box flex="1" borderRadius={8} bg="gray.200" p="8">
              <TableContainer>
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th
                        fontSize="18"
                        py="6"
                        color="white"
                        bg="blue.800"
                        roundedTopStart="8px"
                      >
                        Conta Corrente - Novo Lançamento
                      </Th>
                      <Th bg="blue.800"></Th>
                      <Th bg="blue.800"></Th>
                      <Th bg="blue.800"></Th>
                      <Th bg="blue.800"></Th>
                      <Th bg="blue.800"></Th>
                      <Th bg="blue.800" roundedTopEnd="8px"></Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    <Tr>
                      <Td
                        fontSize="18"
                        py="2"
                        color="black"
                        bg="transparent"
                        border={"2px"}
                        colSpan={1}
                        fontWeight={"bold"}
                      >
                        Cliente
                      </Td>
                      <Td colSpan={6} border={"2px"} backgroundColor={"white"}>
                        <Flex gap={2}>
                          <Text fontWeight={"bold"}>{customers.name}</Text>
                          {"-"}
                          <Flex gap={1}>
                            <Text>CPF</Text>
                            <Text>{customers.cpf}</Text>
                          </Flex>
                          {"-"}
                          <Flex gap={1}>
                            <Text>Código:</Text>
                            <Text fontWeight={"bold"}>{customers.CodCli}</Text>
                          </Flex>
                        </Flex>
                      </Td>
                    </Tr>
                    <Tr>
                      <Td
                        fontSize="18"
                        py="2"
                        color="black"
                        bg="transparent"
                        border={"2px"}
                        colSpan={1}
                        fontWeight={"bold"}
                      >
                        Endereço
                      </Td>
                      <Td colSpan={6} border={"2px"} backgroundColor={"white"}>
                        <Flex gap={1}>
                          <Text>{customers.adress}</Text>
                          {"-"}
                          <Text>{customers.neighbour}</Text>
                          {"-"}
                          <Text>{customers.district}</Text>
                        </Flex>
                      </Td>
                    </Tr>
                    <Tr>
                      <Td
                        fontSize="18"
                        py="2"
                        color="black"
                        bg="transparent"
                        border={"2px"}
                        colSpan={1}
                        fontWeight={"bold"}
                      >
                        Telefone / Celular
                      </Td>

                      <Td colSpan={6} border={"2px"} backgroundColor={"white"}>
                        <Flex gap={1}>
                          <Text>{customers.tell ? customers.tell : "-"}</Text>
                          {"/"}
                          <Text>{customers.phone ? customers.phone : "-"}</Text>
                        </Flex>
                      </Td>
                    </Tr>
                    <Tr>
                      <Td
                        fontSize="18"
                        py="2"
                        color="black"
                        bg="transparent"
                        border={"2px"}
                        colSpan={1}
                        fontWeight={"bold"}
                      >
                        Saldo Atual
                      </Td>
                      <Td
                        colSpan={6}
                        border={"2px"}
                        backgroundColor={
                          customers.customerAccount?.credits -
                            customers.customerAccount?.debits >
                          0
                            ? "green.100"
                            : "red.100"
                        }
                      >
                        {new Intl.NumberFormat("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        }).format(
                          customers.customerAccount?.credits -
                            customers.customerAccount?.debits
                        )}
                      </Td>
                    </Tr>
                    <Tr border="1px solid black">
                      <Td
                        p="0"
                        py="8"
                        bg="blue.800"
                        fontSize="20"
                        fontWeight="bold"
                        color="white"
                        textAlign="center"
                        colSpan={8}
                      >
                        Para Iniciar um lançamento, selecione o tipo de
                        pagamento
                      </Td>
                    </Tr>
                  </Tbody>
                </Table>
              </TableContainer>
              <TableContainer>
                <Table variant="simple">
                  <Tbody
                    display={"flex"}
                    flexDirection={"column"}
                    justifyContent={"center"}
                    alignItems={"center"}
                  >
                    <Tr>
                      <Td borderColor={"transparent"}>
                        <Select
                          borderColor="black"
                          onChange={(ev) => {
                            setPaymentType(ev.target.value);
                            const installments = ev.target.value?.match(
                              /(\d+)x/
                            )
                              ? Number(ev.target.value.match(/(\d+)x/)?.[1])
                              : 0;
                            setInstallmentsValue(installments);
                          }}
                          value={paymentType}
                          textAlign="center"
                          fontWeight="bold"
                        >
                          <option value="Crédito"> Crédito</option>
                          <option> Selecione um tipo de pagamento</option>
                          <option value="American Express 1x">
                            American Express 1x
                          </option>
                          <option value="American Express 2x">
                            American Express 2x
                          </option>
                          <option value="American Express 3x">
                            American Express 3x
                          </option>
                          <option value="American Express 4x">
                            American Express 4x
                          </option>
                          <option value="American Express 5x">
                            American Express 5x
                          </option>
                          <option value="American Express 6x">
                            American Express 6x
                          </option>
                          <option value="American Express 7x">
                            American Express 7x
                          </option>
                          <option value="American Express 8x">
                            American Express 8x
                          </option>
                          <option value="American Express 9x">
                            American Express 9x
                          </option>
                          <option value="American Express 10x">
                            American Express 10x
                          </option>
                          <option value="Aura 1x">Aura 1x</option>
                          <option value="Aura 2x">Aura 2x</option>
                          <option value="Aura 3x">Aura 3x</option>
                          <option value="Aura 4x">Aura 4x</option>
                          <option value="Aura 5x">Aura 5x</option>
                          <option value="Aura 6x">Aura 6x</option>
                          <option value="Aura 7x">Aura 7x</option>
                          <option value="Aura 8x">Aura 8x</option>
                          <option value="Aura 9x">Aura 9x</option>
                          <option value="Aura 10x">Aura 10x</option>
                          <option value="Cheque 1x">Cheque 1x</option>
                          <option value="Cheque 2x">Cheque 2x</option>
                          <option value="Cheque 3x">Cheque 3x</option>
                          <option value="Cheque pré Datado">
                            Cheque pré Datado
                          </option>
                          <option value="Cred system 1x">Cred system 1x</option>
                          <option value="Cred system 2x">Cred system 2x</option>
                          <option value="Cred system 3x">Cred system 3x</option>
                          <option value="Cred system 4x">Cred system 4x</option>
                          <option value="Cred system 5x">Cred system 5x</option>
                          <option value="Cred system 6x">Cred system 6x</option>
                          <option value="Cred system 7x">Cred system 7x</option>
                          <option value="Cred system 8x">Cred system 8x</option>
                          <option value="Cred system 9x">Cred system 9x</option>
                          <option value="Cred system 10x">
                            Cred system 10x
                          </option>
                          <option value="Depósito Bancário">
                            Depósito Bancário
                          </option>
                          <option value="Dinheiro">Dinheiro</option>
                          <option value="Dinheiro Cardio">
                            Dinheiro Cardio
                          </option>
                          <option value="Dinheiro Dermato">
                            Dinheiro Dermato
                          </option>
                          <option value="Dinheiro Endocrino">
                            Dinheiro Endocrino
                          </option>
                          <option value="Dinheiro Fisioterapía">
                            Dinheiro Fisioterapía
                          </option>
                          <option value="Dinheiro Gastro">
                            Dinheiro Gastro
                          </option>
                          <option value="Dinheiro Hemato">
                            Dinheiro Hemato
                          </option>
                          <option value="Dinheiro Nefro">Dinheiro Nefro</option>
                          <option value="Dinheiro Neuro">Dinheiro Neuro</option>
                          <option value="Dinheiro Oftalmo">
                            Dinheiro Oftalmo
                          </option>
                          <option value="Dinheiro Ortopedia">
                            Dinheiro Ortopedia
                          </option>
                          <option value="Dinheiro Safari">
                            Dinheiro Safari
                          </option>
                          <option value="Dinners 1x">Dinners 1x</option>
                          <option value="Dinners 2x">Dinners 2x</option>
                          <option value="Dinners 3x">Dinners 3x</option>
                          <option value="Dinners 4x">Dinners 4x</option>
                          <option value="Dinners 5x">Dinners 5x</option>
                          <option value="Dinners 6x">Dinners 6x</option>
                          <option value="Dinners 7x">Dinners 7x</option>
                          <option value="Dinners 8x">Dinners 8x</option>
                          <option value="Dinners 9x">Dinners 9x</option>
                          <option value="Dinners 10x">Dinners 10x</option>
                          <option value="Duplicata">Duplicata</option>
                          <option value="ELO credito 1x">ELO credito 1x</option>
                          <option value="ELO credito 2x">ELO credito 2x</option>
                          <option value="ELO credito 3x">ELO credito 3x</option>
                          <option value="ELO credito 4x">ELO credito 4x</option>
                          <option value="ELO credito 5x">ELO credito 5x</option>
                          <option value="ELO credito 6x">ELO credito 6x</option>
                          <option value="ELO credito 7x">ELO credito 7x</option>
                          <option value="ELO credito 8x">ELO credito 8x</option>
                          <option value="ELO credito 9x">ELO credito 9x</option>
                          <option value="ELO credito 10x">
                            ELO credito 10x
                          </option>
                          <option value="ELO debito">ELO debito</option>
                          <option value="Hipercard 1x">Hipercard 1x</option>
                          <option value="Hipercard 2x">Hipercard 2x</option>
                          <option value="Hipercard 3x">Hipercard 3x</option>
                          <option value="Hipercard 4x">Hipercard 4x</option>
                          <option value="Hipercard 5x">Hipercard 5x</option>
                          <option value="Hipercard 6x">Hipercard 6x</option>
                          <option value="Hipercard 7x">Hipercard 7x</option>
                          <option value="Hipercard 8x">Hipercard 8x</option>
                          <option value="Hipercard 9x">Hipercard 9x</option>
                          <option value="Hipercard 10x">Hipercard 10x</option>
                          <option value="Hipercard Débito">
                            Hipercard Débito
                          </option>
                          <option value="Maestro Débito">Maestro Débito</option>
                          <option value="Mais">Mais</option>
                          <option value="Mastercard 1x">Mastercard 1x</option>
                          <option value="Mastercard 2x">Mastercard 2x</option>
                          <option value="Mastercard 3x">Mastercard 3x</option>
                          <option value="Mastercard 4x">Mastercard 4x</option>
                          <option value="Mastercard 5x">Mastercard 5x</option>
                          <option value="Mastercard 6x">Mastercard 6x</option>
                          <option value="Mastercard 7x">Mastercard 7x</option>
                          <option value="Mastercard 8x">Mastercard 8x</option>
                          <option value="Mastercard 9x">Mastercard 9x</option>
                          <option value="Mastercard 10x">Mastercard 10x</option>
                          <option value="Mastercard Débito">
                            Mastercard Débito
                          </option>
                          <option value="PetLove">PetLove</option>
                          <option value="Pix">Pix</option>
                          <option value="Rastreavel">Rastreavel</option>
                          <option value="Redeshop Débito">
                            Redeshop Débito
                          </option>
                          <option value="Sorocred 1x">Sorocred 1x</option>
                          <option value="Sorocred 2x">Sorocred 2x</option>
                          <option value="Sorocred 3x">Sorocred 3x</option>
                          <option value="Sorocred 4x">Sorocred 4x</option>
                          <option value="Sorocred 5x">Sorocred 5x</option>
                          <option value="Sorocred 6x">Sorocred 6x</option>
                          <option value="Sorocred 7x">Sorocred 7x</option>
                          <option value="Sorocred 8x">Sorocred 8x</option>
                          <option value="Sorocred 9x">Sorocred 9x</option>
                          <option value="Sorocred 10x">Sorocred 10x</option>
                          <option value="Veterinário Externo">
                            Veterinário Externo
                          </option>
                          <option value="Visa 1x">Visa 1x</option>
                          <option value="Visa 2x">Visa 2x</option>
                          <option value="Visa 3x">Visa 3x</option>
                          <option value="Visa 4x">Visa 4x</option>
                          <option value="Visa 5x">Visa 5x</option>
                          <option value="Visa 6x">Visa 6x</option>
                          <option value="Visa 7x">Visa 7x</option>
                          <option value="Visa 8x">Visa 8x</option>
                          <option value="Visa 9x">Visa 9x</option>
                          <option value="Visa 10x">Visa 10x</option>
                          <option value="Visa Electron Débito">
                            Visa Electron Débito
                          </option>
                          <option value="Voucher">Voucher</option>
                        </Select>
                      </Td>
                    </Tr>
                    <Tr>
                      <Td fontWeight="bold">Cupom de Desconto</Td>
                      <Td px="0">
                        <Input
                          bg="white"
                          borderColor="black"
                          placeholder="Insira código do cupom"
                        ></Input>
                      </Td>
                    </Tr>
                  </Tbody>
                </Table>
              </TableContainer>
              <Flex></Flex>
              <Button
                onClick={() => setIsModalOpen(true)}
                w="100%"
                py="8"
                colorScheme="whatsapp"
              >
                Continuar
              </Button>
            </Box>
          </Flex>
        </Flex>
        <GenericModal
          isOpen={isModalOpen}
          onRequestClose={() => {
            setIsModalOpen(false), resetModalState();
          }}
        >
          <Flex display={"flex"} flexDirection={"column"}>
            <TableContainer w="100%" mt="4">
              <Table variant="simple">
                <Thead>
                  <Th
                    fontSize="18"
                    py="8"
                    color="white"
                    bg="blue.800"
                    colSpan={2}
                    textAlign="center"
                    border={"2px"}
                    borderColor={"black"}
                  >
                    Conta Corrente - Novo Lançamento
                  </Th>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td
                      py={2}
                      fontSize="15"
                      color="black"
                      bg="red.200"
                      border={"2px"}
                      fontWeight={"bold"}
                    >
                      Nome do Cliente
                    </Td>
                    <Td
                      py={2}
                      fontSize="15"
                      border={"2px"}
                      backgroundColor={"white"}
                    >
                      <Flex gap={2}>
                        <Text>{customers.name}</Text>
                      </Flex>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td
                      py={2}
                      fontSize="15"
                      color="black"
                      bg="red.200"
                      border={"2px"}
                      colSpan={1}
                      fontWeight={"bold"}
                    >
                      Endereço
                    </Td>
                    <Td
                      py={2}
                      fontSize="15"
                      border={"2px"}
                      backgroundColor={"white"}
                    >
                      <Flex gap={1}>
                        <Text>{customers.adress}</Text>
                        {"-"}
                        <Text>{customers.neighbour}</Text>
                        {"-"}
                        <Text>{customers.district}</Text>
                      </Flex>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td
                      py={2}
                      fontSize="15"
                      color="black"
                      bg="red.200"
                      border={"2px"}
                      colSpan={1}
                      fontWeight={"bold"}
                    >
                      Telefone / Celular
                    </Td>
                    <Td py={2} colSpan={5} border={"2px"}>
                      <Text>
                        Telefone: {customers.tell} - {customers.phone}
                      </Text>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td
                      py={2}
                      fontSize="15"
                      color="black"
                      bg="red.200"
                      border={"2px"}
                      colSpan={1}
                      fontWeight={"bold"}
                    >
                      Saldo Atual
                    </Td>
                    <Td
                      py={2}
                      colSpan={5}
                      border={"2px"}
                      borderColor={"black"}
                      fontWeight={"bold"}
                      color={"red.500"}
                    >
                      {new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }).format(
                        customers.customerAccount?.credits -
                          customers.customerAccount?.debits
                      )}
                    </Td>
                  </Tr>
                  <Tr bg={"blue.300"}>
                    <Td colSpan={2} py={1} border={"2px"} fontWeight={"bold"}>
                      Efetuando novo lançamento
                    </Td>
                  </Tr>
                  <Tr>
                    <Td
                      py={2}
                      fontSize="15"
                      color="black"
                      bg="red.200"
                      border={"2px"}
                      fontWeight={"bold"}
                    >
                      Método de pagamento selecionado :
                    </Td>
                    <Td
                      py={2}
                      fontSize="15"
                      border={"2px"}
                      backgroundColor={"white"}
                    >
                      <Flex gap={2}>
                        <Text>{paymentType}</Text>
                      </Flex>
                    </Td>
                  </Tr>
                  <Tr bg={"blue.300"}>
                    <Td
                      colSpan={2}
                      py={1}
                      textAlign={"center"}
                      border={"2px"}
                      fontWeight={"bold"}
                    >
                      Documentos para pagamento
                    </Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>
            <form
              onSubmit={handleSubmit(
                handleNewPayment as SubmitHandler<FieldValues>
              )}
              className="flex flex-col gap-8 w-full"
            >
              <TableContainer marginTop={0}>
                <Table>
                  <Thead>
                    <Tr bg={"gray.200"}>
                      <Th
                        borderLeft={"2px"}
                        borderColor={"black"}
                        fontWeight={"bold"}
                        color={"black"}
                      >
                        Tipo
                      </Th>
                      <Th
                        borderLeft={"2px"}
                        borderColor={"black"}
                        fontWeight={"bold"}
                        color={"black"}
                      >
                        Data
                      </Th>
                      <Th
                        borderLeft={"2px"}
                        borderColor={"black"}
                        fontWeight={"bold"}
                        color={"black"}
                      >
                        Vencimento
                      </Th>
                      <Th
                        borderLeft={"2px"}
                        borderColor={"black"}
                        fontWeight={"bold"}
                        color={"black"}
                      >
                        Valor
                      </Th>
                      <Th
                        borderLeft={"2px"}
                        borderRight={"2px"}
                        borderColor={"black"}
                        fontWeight={"bold"}
                        color={"black"}
                      >
                        Número
                      </Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {new Array(installmentsValue).fill(0).map((_, index) => (
                      <Tr key={index} p={0}>
                        <Td p={0} border={"2px"} borderColor={"black"}>
                          <Text px={10} fontWeight={"semibold"}>
                            {paymentType}
                          </Text>
                        </Td>
                        <Td p={0} border={"2px"} borderColor={"black"}>
                          <SInput
                            {...register(`date-${index + 1}` as "date")}
                            defaultValue={new Date().toLocaleDateString()}
                            name={`date-${index + 1}`}
                            border={"0px"}
                          />
                        </Td>
                        <Td p={0} border={"2px"} borderColor={"black"}>
                          <SInput
                            {...register(
                              `expiredData-${index + 1}` as "expiredData"
                            )}
                            defaultValue={new Date(
                              new Date().setMonth(
                                new Date().getMonth() + index + 1
                              )
                            ).toLocaleDateString("pt-BR")}
                            name={`expiredData-${index + 1}`}
                            border={"0px"}
                          />
                        </Td>
                        <Td p={0} border={"2px"} borderColor={"black"}>
                          <SInput
                            {...register(
                              `installmentValue-${
                                index + 1
                              }` as "installmentValue",
                              {
                                onChange: (e) =>
                                  (e.target.value = normalizeCurrency(
                                    e.target.value
                                  )),
                              }
                            )}
                            defaultValue={`R$ 0,00`}
                            name={`installmentValue-${index + 1}`}
                            border={"0px"}
                          />
                        </Td>
                        <Td p={0} border={"2px"} borderColor={"black"}>
                          <SInput
                            {...register(`number-${index + 1}` as "number")}
                            defaultValue={0}
                            name={`number-${index + 1}`}
                            border={"0px"}
                            type="number"
                          />
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </TableContainer>

              <Flex mt={4} justify={"center"} gap={4}>
                <Button
                  type="submit"
                  py="5"
                  colorScheme="whatsapp"
                  display={"flex"}
                  gap={2}
                >
                  Efetuar Pagamento
                  <BiMoney />
                </Button>
                <Button
                  onClick={async () => {
                    setIsModalOpen(false), await resetModalState();
                  }}
                  py="5"
                  colorScheme="red"
                >
                  Cancelar
                </Button>
              </Flex>
            </form>
          </Flex>
        </GenericModal>
      </AdminContainer>
    </ChakraProvider>
  );
}
