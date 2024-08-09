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
import { ConfirmationDialog } from "../../../components/dialogConfirmComponent/ConfirmationDialog";
import { BiMoney } from "react-icons/bi";
import { toast } from "react-toastify";
import { useQuery } from "react-query";
import { LoadingSpinner } from "../../../components/Loading";

interface ICustomerProps extends ICustomer {
  CodCli: string;
}

export function BoxNewPayments() {
  const [customers, setCostumers] = useState({} as ICustomerProps);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [typePayment, setTypePayment] = useState("");
  const [valueTotal, setValueTotal] = useState(0);
  const [installments, setInstallments] = useState(0);
  const [paymentType, setPaymentType] = useState("");
  const [dailyBox, setDailyBox] = useState({} as HistoryBoxProps);
  const [fatherBox, setFatherBox] = useState({} as BoxProps);
  const installmentsRange = [
    1,2,3,4,5,6,7,8,9,10,11,12
  ]
  const handleChange = (installments: number) => setInstallments(installments);
  const { id } = useParams<{ id: string }>();

  async function GetDailyBox () {
    const response = await api.get("/dailybox")
    setDailyBox(response.data)
  }
  async function getFatherBox () {
    const response = await api.get("/vetbox")
    setFatherBox(response.data)
  } 



  async function getCustomers() {
    const response = await api.get(`/customers/${id}`);
    setCostumers(response.data.customer);
  }

  const {isLoading: isFatherBoxLoading} = useQuery('fatherBox', getFatherBox)
  const {isLoading: isDailyBoxLoading} = useQuery('dailyBox', GetDailyBox)
  const {isLoading: isCustomerLoading} = useQuery('customer', getCustomers)


  if(isDailyBoxLoading || isCustomerLoading || isFatherBoxLoading) {
    return <LoadingSpinner/>
  }


  async function openInstallmentPayment() {
    const data = {
      debitName: "",
      totalDebit: Number(valueTotal),
      installmentAmount: Number(installments),
      paymentType: `${typePayment}: ${installments}x`,
      consultId: customers.customerAccount.consultId
    };

    try {

      if (valueTotal > customers.customerAccount?.debits) {
        toast.warning("Valor ultrapassa débito do cliente!");
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
            <Select onChange={(ev) => setInstallments(Number(ev.target.value))}
            value={installments}
            fontWeight="bold" placeholder="Visualize as parcelas">
              {
                installmentsRange.map((installment) => 
                <option  key={installment} value={installment}>
                  {`Parcelado: ${installment} x  R$ ${Number(valueTotal / installment).toFixed(2) }`}
                </option>)
              }

            </Select>
            {/* <NumberInput
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
            </NumberInput> */}

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
                        Novo Lançamento 
                        {/* {customers?.customerAccount?.accountNumber} */}
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
                      <Td fontSize="18" py="2" color="black" bg="transparent" border={"2px"} colSpan={1} fontWeight={"bold"}>
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
                      <Td fontSize="18" py="2" color="black" bg="transparent" border={"2px"} colSpan={1} fontWeight={"bold"}>
                        Endereço
                      </Td>
                      <Td colSpan={6} border={"2px"} backgroundColor={"white"}>
                        <Flex gap={1}>
                          <Text>{customers.adress}</Text>
                          {"-"}
                          <Text>{customers.neighbour}</Text>
                          {"-"}
                          <Text >{customers.district}</Text>
                        </Flex>
                      </Td>
                    </Tr>
                    <Tr>
                      <Td fontSize="18" py="2" color="black" bg="transparent" border={"2px"} colSpan={1} fontWeight={"bold"}>
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
                      <Td fontSize="18" py="2" color="black" bg="transparent" border={"2px"} colSpan={1} fontWeight={"bold"}>
                        Saldo Atual
                      </Td>
                      <Td colSpan={6} border={"2px"} backgroundColor={ customers.customerAccount?.credits - customers.customerAccount?.debits > 0 ? "green.100" : "red.100"}>
                        {
                         new Intl.NumberFormat("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        }).format(customers.customerAccount?.credits - customers.customerAccount?.debits)
                        }
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
                      </Tr>
                      <Tr>

                      <Td fontWeight="bold">
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
        <GenericModal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}>
          <Flex>{paymentForm}</Flex>
        </GenericModal>
      </AdminContainer>
    </ChakraProvider>
  );
}
