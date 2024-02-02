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
  VStack,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import { Input as SInput } from "../../../components/admin/Input";
import { Header } from "../../../components/admin/Header";
import { AdminContainer } from "../../AdminDashboard/style";
import { useEffect, useState, useContext } from "react";
import { api } from "../../../lib/axios";
import { useNavigate, useParams } from "react-router-dom";
import { GenericSidebar } from "../../../components/Sidebars/GenericSideBar";
import { GenericLink } from "../../../components/Sidebars/GenericLink";
import { GiCardDiscard } from "react-icons/gi";
import { BsCashCoin } from "react-icons/bs";
import { BsReception4 } from "react-icons/bs";
import { ICustomer } from "../../../interfaces";
import { GenericModal } from "../../../components/Modal/GenericModal";
import { ConfirmationDialog } from "../../../components/dialogConfirmComponent/ConfirmationDialog";
import { BiMoney } from "react-icons/bi";
import { toast } from "react-toastify";
import { BoxContext } from "../../../contexts/BoxContext";

export function BoxNewPayments() {
  const [customers, setCostumers] = useState({} as ICustomer);
  const { fatherBox } = useContext(BoxContext);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [typePayment, setTypePayment] = useState("");
  const [valueTotal, setValueTotal] = useState(0);
  const [installments, setInstallments] = useState(0);
  const [paymentType, setPaymentType] = useState("");
  const handleChange = (installments: number) => setInstallments(installments);
  const { id } = useParams<{ id: string }>();

  function openModal() {
    setIsModalOpen(true);
  }
  function closeModal() {
    setIsModalOpen(false);
  }
  async function getCustomers() {
    const response = await api.get(`/customers/${id}`);
    setCostumers(response.data);
  }
  useEffect(() => {
    getCustomers();
  }, []);

  async function openInstallmentPayment() {
    const data = {
      debitName: "",
      totalDebit: Number(valueTotal),
      installmentAmount: Number(installments),
      paymentType: `${typePayment}: ${installments}x`,
    };

    try {
      if (valueTotal > customers.customerAccount?.debits) {
        toast.warning("Valor ultrapassa débito do cliente!");
        return;
      }
      await api.post(
        `/account/installments/${customers.id}/${fatherBox.id}`,
        data
      );
      toast.success("Parcelamento realizado com sucesso!");
      navigate(`/Recepcao/Caixa/Pagamentos/${customers.id}`);
    } catch (error) {
      console.log(error);
      toast.error("Falha ao realizar pagamento!");
    }
  }

  const customerDebit = customers.customerAccount?.debits
    ? new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(customers.customerAccount?.debits)
    : 0;
  let paymentForm;
  switch (true) {
    case paymentType === "Crédito":
      paymentForm = (
        <Flex
          w="100%"
          h="100%"
          align="center"
          justify="center"
          direction="column"
        >
          <Text fontWeight="black" fontSize="1xl">
            Débitos totais: {customerDebit}
          </Text>

          <VStack>
            <Text fontWeight="black" fontSize="1xl">
              Valor a pagar:
            </Text>
            <SInput
              defaultValue={valueTotal}
              onChange={(ev) => setValueTotal(Number(ev.target.value))}
              step="0.01"
              border="2px"
              placeholder="Valor a pagar não precisa ser o débito total"
              w={390}
              name="toPay"
              type="number"
            />

            <Text fontWeight="black" fontSize="1xl">
              Débito será parcelado?, quantidade de parcelas:{" "}
            </Text>
            <NumberInput
              min={1}
              max={24}
              value={installments}
              //@ts-ignore
              onChange={handleChange}
            >
              <NumberInputField border="2px" placeholder="Número de parcelas" />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>

            <Text fontWeight="black" fontSize="1xl">
              Tipo de cartão usado:{" "}
            </Text>
            <Select
              onChange={(ev) => setTypePayment(ev.target.value)}
              mb="2"
              border="2px"
              placeholder="Bandeira ou Cartão usado"
            >
              <option value="Mastercard">Mastercard</option>
              <option value="Elo">Elo</option>
              <option value="Visa">Visa</option>
              <option value="American Express">American Express</option>
              <option value="Hipercard">Hipercard</option>
              <option value=">Diners Club">Diners Club</option>
              <option value="Maestro">Maestro</option>
              <option value="Discover">Discover</option>
            </Select>

            <ConfirmationDialog
              callbackFn={() => openInstallmentPayment()}
              icon={<BiMoney />}
              buttonTitle="Efetuar pagamento"
              whatIsConfirmerd="Confirme abaixo"
              describreConfirm={`Valor pago: R$:${valueTotal} - N° de Parcelas: ${installments} - Cartão utilizado: ${typePayment}`}
              disabled={false}
            />
          </VStack>
        </Flex>
      );
      break;
    case paymentType === "Débito":
      paymentForm = <h1>Débito</h1>;
      break;
    case paymentType === "Dinheiro":
      paymentForm = <h1>Dinheiro</h1>;
      break;
    default:
      paymentForm = <h1>Falha estado</h1>;
      break;
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
                        py="8"
                        color="white"
                        bg="blue.800"
                        roundedTopStart="8px"
                      >
                        Conta Corrente -{" "}
                        {customers?.customerAccount?.accountNumber}
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
                      <Th
                        fontSize="18"
                        py="8"
                        color="black"
                        bg="blue.100"
                        borderBottom="1px solid black"
                      >
                        Dados do Cliente
                      </Th>
                      <Th bg="blue.100" borderBottom="1px solid black"></Th>
                      <Th bg="blue.100" borderBottom="1px solid black"></Th>
                      <Th bg="blue.100" borderBottom="1px solid black"></Th>
                      <Th bg="blue.100" borderBottom="1px solid black"></Th>
                      <Th bg="blue.100" borderBottom="1px solid black"></Th>
                      <Th bg="blue.100" borderBottom="1px solid black"></Th>
                    </Tr>
                    <Tr border="1px solid black">
                      <Td
                        borderBottom="2px solid black"
                        fontSize="18"
                        fontWeight="bold"
                        w="10"
                        p="0"
                        pl="5"
                      >
                        Nome do Cliente
                      </Td>
                      <Td borderBottom="1px solid black" colSpan={6} p="0">
                        <Input
                          borderLeft="2px solid black"
                          h="12"
                          rounded="0"
                          bg="white"
                          borderColor="black"
                          defaultValue={customers.name}
                        ></Input>
                      </Td>
                    </Tr>
                    <Tr border="1px solid black">
                      <Td
                        borderBottom="2px solid black"
                        fontSize="18"
                        fontWeight="bold"
                        p="0"
                        pl="5"
                      >
                        Endereço
                      </Td>
                      <Td borderBottom="1px solid black" colSpan={6} p="0">
                        <Input
                          borderLeft="2px solid black"
                          h="12"
                          rounded="0"
                          bg="white"
                          borderColor="black"
                          defaultValue={customers.adress}
                        ></Input>
                      </Td>
                    </Tr>
                    <Tr border="1px solid black">
                      <Td
                        p="0"
                        pl="5"
                        borderBottom="2px solid black"
                        fontSize="18"
                        fontWeight="bold"
                        textAlign="start"
                      >
                        Telefone / Celular
                      </Td>
                      <Td borderBottom="1px solid black" colSpan={6} p="0">
                        <Input
                          borderLeft="2px solid black"
                          h="12"
                          rounded="0"
                          bg="white"
                          borderColor="black"
                          defaultValue={customers.phone}
                        ></Input>
                      </Td>
                    </Tr>
                    <Tr border="1px solid black">
                      <Td
                        p="0"
                        pl="5"
                        borderBottom="2px solid black"
                        fontSize="18"
                        fontWeight="bold"
                        textAlign="start"
                      >
                        Débitos Atuais
                      </Td>
                      <Td borderBottom="1px solid black" colSpan={6} p="0">
                        <Input
                          borderLeft="2px solid black"
                          h="12"
                          rounded="0"
                          bgColor={
                            customers?.customerAccount?.debits >= 1
                              ? "red.100"
                              : "green.100"
                          }
                          borderColor="black"
                          defaultValue={customers?.customerAccount?.debits}
                        ></Input>
                      </Td>
                    </Tr>
                    <Tr border="1px solid black">
                      <Td
                        p="0"
                        py="8"
                        bg="blue.700"
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
                  <Tbody>
                    <Tr>
                      <Td px="0">
                        {" "}
                        <Select
                          bg="white"
                          borderColor="black"
                          w=""
                          onChange={(ev) => setPaymentType(ev.target.value)}
                          value={paymentType}
                          textAlign="center"
                          fontWeight="bold"
                        >
                          <option> Selecione um tipo de pagamento</option>
                          <option value="Débito"> Débito</option>
                          <option value="Crédito"> Crédito</option>
                          <option value="Dinheiro"> Dinheiro</option>
                        </Select>
                      </Td>
                      <Td textAlign="end" fontWeight="bold">
                        Cupom de Desconto
                      </Td>
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
                onClick={() => openModal()}
                w="100%"
                py="8"
                colorScheme="whatsapp"
              >
                Continuar
              </Button>
            </Box>
          </Flex>
        </Flex>
        <GenericModal isOpen={isModalOpen} onRequestClose={closeModal}>
          <Flex>{paymentForm}</Flex>
        </GenericModal>
      </AdminContainer>
    </ChakraProvider>
  );
}
