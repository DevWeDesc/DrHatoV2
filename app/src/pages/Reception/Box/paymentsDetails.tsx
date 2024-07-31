import {
  Box,
  ChakraProvider,
  Flex,
  Table,
  Tr,
  Thead,
  Tbody,
  Th,
  Button,
  TableContainer,
  Input,
  Td,
  Text,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { Header } from "../../../components/admin/Header";
import { AdminContainer } from "../../AdminDashboard/style";
import { GenericLink } from "../../../components/Sidebars/GenericLink";
import { GenericSidebar } from "../../../components/Sidebars/GenericSideBar";
import { BsCashCoin, TbPigMoney } from "react-icons/all";
import { useState, useContext } from "react";
import { api } from "../../../lib/axios";
import { useNavigate, useParams } from "react-router-dom";
import { BsReception4 } from "react-icons/bs";
import { BiCalendarPlus, AiFillEdit } from "react-icons/all";
import { ICustomer } from "../../../interfaces";
import { BoxContext } from "../../../contexts/BoxContext";
import { GenericModal } from "../../../components/Modal/GenericModal";
import { useQuery, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import ModalDetails from "./ModalDetails";

export interface Installment {
  id: number | string;
  debitName?: string;
  totalDebit: number;
  paymentType?: string;
  paymentDate: string;
  installmentAmount?: number;
  amountInstallments?: string;
  customerId?: number;
  boxHistoryId?: number;
  consultPetId?: null | string;
  admissionsPetId?: null;
  consult?: Consult | null;
  admission?: null;
  openedDate?: Date;
  petName?: string;
  openedBy?: string;
  vetPreference?: string;
  closedDate: Date | string | null;
  updatedDate: Date | string | null;
  isClosed?: boolean;
  closedByVetId?: number;
  clodedByVetName?: string;
  petWeight?: string;
  observations?: string;
  consultType?: string;
  symptoms?: null;
  request?: null;
  diagnostic?: null;
  totaLDebits?: string;
  medicineRecordId?: number;
  clientIsVip?: boolean;
  customerAccountId?: number;
  consultDebits?: ConsultDebit[];
}

export interface Consult {
  id: string;
  openedDate: Date;
  petName: string;
  openedBy: string;
  vetPreference: string;
  closedDate: Date;
  updatedDate: null;
  isClosed: boolean;
  closedByVetId: number;
  clodedByVetName: string;
  petWeight: string;
  observations: string;
  consultType: string;
  symptoms: null;
  request: null;
  diagnostic: null;
  totaLDebits: string;
  medicineRecordId: number;
  clientIsVip: boolean;
  customerAccountId: number;
  consultDebits: ConsultDebit[];
}

export interface ConsultDebit {
  id: number;
  name: string;
  price: string;
  sectorId: number;
  itemId: number;
  isAdmissions: null;
  isExam: boolean;
  isSurgerie: null;
  isVaccine: null;
  isProcedure: null;
  isAdmission: null;
  RequestedByVetId: number;
  RequestedByVetName: string;
  requestedDate: Date;
  consultOpenedId: null;
  surgerieOpenedId: null;
  openedConsultsForPetId: string;
  openedAdmissionsForPetId: null;
}


interface ICustomerProps extends ICustomer {
  CodCli: string;
}

export function BoxPaymentsDetails() {
  const [client, setClient] = useState({} as ICustomerProps);
  const { fatherBox, dailyBox } = useContext(BoxContext);
  const [typePayment, setTypePayment] = useState(true);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalDetailsIsOpen, setModalDetailsIsOpen] = useState(false);
  const [creditModalIsOpen, setCreditModalIsOpen] = useState(false);
  const [installments, setInstallments] = useState<Installment[]>([]);
  const [installment, setInstallment] = useState({} as Installment);
  const [debits, setDebits] = useState<any[]>([]);
  const [consultId, setConsultId] = useState<string | null>(null);
  const [customerCredits, setCustomerCredits] = useState(0);
  const queryClient = useQueryClient();

  async function getCustomers() {
    const customer = await api.get(`/customers/${id}`);
    setClient(customer.data.customer);
    setInstallments(customer.data.installments);
    setDebits(customer.data.debits);
    setConsultId(customer.data.debits[0].id);
  }

  async function getInstallmentsDetails(installmentId: string | number) {
    const installment = await api.get(`/installments/${installmentId}`);
    setInstallment(installment.data);
  }

  const { data: dataDetailsDebits } = useQuery({
    queryKey: ["debits", consultId],
    queryFn: async () => {
      const debits = await api.get(`/customer/debits/${consultId}`);
      // return debits.data.consultDebits;
      return debits.data as Consult;
    },
  });

  async function incrementCustomerCredits() {
    const data = {
      customerId: client.id,
      credits: customerCredits,
    };
    await api.patch(`/customer/credits`, data);
    queryClient.invalidateQueries("customerDetails");
    toast.success("Valor adicionado!");
  }

  useQuery("customerDetails", getCustomers);

  let typePaymentShow;
  switch (true) {
    case typePayment === false:
      typePaymentShow = (
        <>
          {installments
            .filter(
              (installment) =>
                (installment.id && installment.consultPetId) ||
                installment.admissionsPetId
            )
            .map((installment) => {
              return (
                <Tr
                  key={installment.id}
                  onClick={() => {
                    getInstallmentsDetails(installment.id);
                    setModalIsOpen(true);
                  }}
                >
                  <Td>
                    Pagamento Recebido. {`${fatherBox.name}: ${dailyBox.id}`}
                  </Td>
                  <Td>{installment.paymentDate}</Td>

                  <Td>0</Td>
                  <Td border="2px" bgColor="green.100">
                    {new Intl.NumberFormat("pt-BR", {
                      currency: "BRL",
                      style: "currency",
                    }).format(installment.totalDebit)}
                  </Td>
                  <Td>{installment.paymentType}</Td>
                  <Td>{client.customerAccount?.debits}</Td>
                </Tr>
              );
            })}
        </>
      );
      break;
    case typePayment === true:
      // Ta sendo renderizado aqui
      typePaymentShow = (
        <>
        
          {debits.map((debit) => {
            return (
              <Tr
                key={debit.id}
                onClick={async () => {
                  setConsultId(debit.id);
                  setModalDetailsIsOpen(true);
                }}
                cursor={"pointer"}
              >
                <Td border="1px">
                  {new Intl.DateTimeFormat("pt-BR").format(
                    new Date(debit.openedDate)
                  )}
                </Td>
                <Td border={"1px"} borderColor={"black"} fontWeight={"extrabold"} color="red">
                  {debit.consultType === "Consulta" && "C"}
                </Td>
                <Td _hover={{
                  color: "blue.700",

                }} border="1px" borderColor={"black"} fontWeight={"bold"} >
                  <Flex gap={2}>

                  <Text>{debit.consultType} nº {debit.idConsult},</Text>
                  <Text>animal: {debit.petName}</Text>
                  </Flex>
                </Td>

                <Td border="1px" bgColor="red.100">
                  {new Intl.NumberFormat("pt-BR", {
                    currency: "BRL",
                    style: "currency",
                  }).format(debit.totaLDebits)}
                </Td>

                <Td border="1px" bgColor="green.100">
                  
                </Td>
                <Td border="1px">-</Td>
                <Td border="1px">
                  
                  {new Intl.NumberFormat("pt-BR", {
                    currency: "BRL",
                    style: "currency",
                  }).format(Number(client?.customerAccount?.credits) - debit.totaLDebits)}
                </Td>
              </Tr>
            );
          })}
        </>
      );
      break;
  }

  return (
    <ChakraProvider>
      <AdminContainer>
        <Flex direction="column" h="100vh">
          <Header
            title="Painel de Conta Corrente"
            url="/Recepcao/Caixa/Pagamentos/"
          />
          <Flex w="100%" my="6" maxWidth={1580} mx="auto" px="6">
            <GenericSidebar>
              <GenericLink
                name="Recepção"
                icon={BsReception4}
                path={`/Recepcao/`}
              />
              <GenericLink
                name="Painel de Pagamentos"
                icon={BsCashCoin}
                path={`/Recepcao/Caixa/Pagamentos`}
              />
              <GenericLink
                name="Caixa"
                icon={BiCalendarPlus}
                path={`/Recepcao/Caixa`}
              />
              <GenericLink
                name="Devoluções"
                icon={AiFillEdit}
                path={`/Recepcao/Caixa/Returns`}
              />
            </GenericSidebar>
            <Box flex="1" borderRadius={8} bg="gray.200" p="8">
              <TableContainer>
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th fontSize="18" py="8" color="black" bg="blue.100">
                        Pesquisa e filtragem
                      </Th>
                      <Th bg="blue.100"></Th>
                      <Th bg="blue.100"></Th>
                      <Th bg="blue.100"></Th>
                      <Th bg="blue.100"></Th>
                      <Th bg="blue.100"></Th>
                      <Th bg="blue.100"></Th>
                    </Tr>
                    <Tr>
                      <Th fontSize="18" color="black">
                        Data Inicial
                      </Th>
                      <Th>
                        <Input
                          w="300px"
                          bg="white"
                          borderColor="black"
                          type="date"
                        />
                      </Th>
                      <Th fontSize="18" color="black">
                        Data Final
                      </Th>
                      <Th colSpan={2}>
                        <Input
                          w="300px"
                          bg="white"
                          borderColor="black"
                          type="date"
                        />
                      </Th>
                      <Th>
                        <Button size="lg" colorScheme="twitter">
                          Filtrar
                        </Button>
                      </Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    <Tr>
                      <Td fontSize="18" py="2" color="black" bg="transparent" border={"2px"} colSpan={1} fontWeight={"bold"}>
                        Cliente
                      </Td>
                      <Td colSpan={5} border={"2px"} backgroundColor={"white"}>
                        <Flex gap={2}>

                        <Text fontWeight={"bold"}>{client.name}</Text>
                        {"-"}
                        <Flex gap={1}>
                          <Text>CPF</Text>
                        <Text>{client.cpf}</Text>

                        </Flex>
                        {"-"}
                        <Flex gap={1}>
                        <Text>Código:</Text>
                        <Text fontWeight={"bold"}>{client.CodCli}</Text>
                        </Flex>
                        {"-"}
                        <Flex gap={1}>
                        <Text>Email:</Text>
                        <Text fontWeight={"bold"}>{client.email}</Text>
                        </Flex>

                        </Flex>
                      </Td>
                    </Tr>
                    <Tr>
                      <Td fontSize="18" py="2" color="black" bg="transparent" border={"2px"} colSpan={1} fontWeight={"bold"}>
                        Endereço
                      </Td>
                      <Td colSpan={5} border={"2px"} backgroundColor={"white"}>
                        <Flex gap={1}>
                          <Text>{client.adress}</Text>
                          {"-"}
                          <Text>{client.neighbour}</Text>
                          {"-"}
                          <Text >{client.district}</Text>
                          {"-"}
                          <Flex gap={1} fontWeight={"bold"}>
                          <Text>CEP:</Text>
                          <Text >{client.cep}</Text>
                          </Flex>
                        </Flex>
                      </Td>
                    </Tr>
                    <Tr>
                      <Td fontSize="18" py="2" color="black" bg="transparent" border={"2px"} colSpan={1} fontWeight={"bold"}>
                        Telefone / Celular
                      </Td>
                      <Td colSpan={5} border={"2px"} backgroundColor={"white"}>
                      <Flex gap={1}>
                          <Text>{client.tell ? client.tell : "-"}</Text>
                          {"/"}
                          <Text>{client.phone ? client.phone : "-"}</Text>
                        </Flex>
                      </Td>
                    </Tr>
                    <Tr>
                      <Td fontSize="18" py="2" color="black" bg="transparent" border={"2px"} colSpan={1} fontWeight={"bold"}>
                        Saldo Atual
                      </Td>
                      <Td colSpan={5} border={"2px"} backgroundColor={ client.customerAccount?.credits - client.customerAccount?.debits > 0 ? "green.100" : "red.100"}>
                        {
                         new Intl.NumberFormat("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        }).format(client.customerAccount?.credits - client.customerAccount?.debits)
                        }
                      </Td>
                    </Tr>
                    <Tr>
                      <Td p="0" py="4" colSpan={8}>
                        <Button
                          py="8"
                          w="100%"
                          backgroundColor={"black"}
                          colorScheme="blackAlpha"
                          color="#7CFC00"
                          onClick={() =>
                            navigate(`/Recepcao/Caixa/NovoPagamento/${id}`)
                          }
                        >
                          Novo Pagamento
                        </Button>
                      </Td>
                    </Tr>
                  </Tbody>
                </Table>
              </TableContainer>
              <TableContainer height="400px" overflowY="auto">
                <Table variant="simple">
                  <Thead>
                    <Tr fontSize="18">
                    <Td color="black"
                        mb="40"
                        bg="blue.100"
                        borderBottom="1px solid black" py="8" colSpan={16}
                        fontWeight={"bold"}
                    >
                    Exibindo todos os lançamentos:
                    </Td>
                    </Tr>
                    <Tr border="1px solid black" bg="blue.400">
                      <Th border="1px solid black" fontSize="18" color="white">
                        Data
                      </Th>
                      <Th border="1px solid black" fontSize="18" color="white">
                        C
                      </Th>
                      <Th border="1px solid black" fontSize="18" paddingRight={"64"} color="white">
                        Descrição
                      </Th>

                      <Th
                        border="1px solid black"
                        fontSize="18"
                        isNumeric
                        color="white"
                      >
                        Débito
                      </Th>
                      <Th
                        border="1px solid black"
                        fontSize="18"
                        isNumeric
                        color="white"
                      >
                        Crédito
                      </Th>
                      <Th border="1px solid black" fontSize="18" color="white">
                        Tipo
                      </Th>
                      <Th
                        border="1px solid black"
                        fontSize="18"
                        isNumeric
                        color="white"
                      >
                        Saldo
                      </Th>
                    </Tr>
                  </Thead>
                  <Tbody>{typePaymentShow}</Tbody>
                </Table>
              </TableContainer>
              <Button w="100%" py="8" colorScheme="whatsapp">
                Gravar
              </Button>
            </Box>
          </Flex>
        </Flex>
        <GenericModal
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
        >
          <>
            <TableContainer gridColumnStart={1} gridColumnEnd={3}>
              <Table size="sm">
                <Thead>
                  <Tr>
                    <Td
                      py={3}
                      bg="gray.200"
                      fontWeight="bold"
                      colSpan={2}
                      textAlign="center"
                    >
                      Visualização de Consulta
                    </Td>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td fontWeight="bold"> Nome do cliente</Td>
                    <Td>{client?.name}</Td>
                  </Tr>
                  <Tr>
                    <Td fontWeight="bold">Nome do Animal</Td>
                    <Td>{installment?.consult?.petName}</Td>
                  </Tr>
                  <Tr>
                    <Td fontWeight="bold"> Data da consulta</Td>
                    {installment?.consult?.closedDate
                      ? new Intl.DateTimeFormat("pt-BR", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "2-digit",
                          hour: "2-digit",
                          minute: "2-digit",
                        }).format(new Date(installment?.consult.closedDate))
                      : ""}
                  </Tr>
                  <Tr>
                    <Td fontWeight="bold"> Veterinário</Td>
                    <Td>{installment?.consult?.vetPreference}</Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>
            <TableContainer gridColumnStart={1} gridColumnEnd={3}>
              <Table size="sm">
                <Thead bg="gray.200">
                  <Tr>
                    <Th py={3} colSpan={5} textColor="black">
                      {" "}
                      Produtos / Serviços desta Consulta:
                    </Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr fontWeight="bold">
                    <Td>Quantidade</Td>
                    <Td>Produtos / Serviços</Td>
                    <Td>Tabela</Td>
                    <Td>Desconto</Td>
                    <Td>Valor Cobrado</Td>
                  </Tr>
                  {installment?.consult?.consultDebits?.map((data: any) => (
                    <Tr key={data?.id}>
                      <Td>1</Td>
                      <Td>{data?.name}</Td>
                      <Td>{data?.price.concat(",00")}</Td>
                      <Td>0%</Td>
                      <Td>{data?.price.concat(",00")}</Td>
                    </Tr>
                  ))}
                  <Tr fontWeight="bold">
                    <Td colSpan={4} textAlign="end">
                      Total
                    </Td>
                    <Td>
                      {new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }).format(Number(installment?.amountInstallments))}
                      x{installment.installmentAmount}
                    </Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>
          </>
        </GenericModal>
        <GenericModal
          isOpen={creditModalIsOpen}
          onRequestClose={() => setCreditModalIsOpen(false)}
        >
          <Flex align="center" direction="column" w="400px" h="200px">
            <Text fontWeight="bold">
              Adicionar créditos ao cliente: - {client.name}
            </Text>

            <InputGroup marginTop={8}>
              <InputLeftElement
                pointerEvents="none"
                color="green.400"
                fontSize="1.2em"
              >
                <TbPigMoney />
              </InputLeftElement>
              <Input
                type="number"
                onChange={(ev) => setCustomerCredits(Number(ev.target.value))}
                border="1px"
                placeholder="Digite a quantia de créditos a ser adicionado!"
              />
            </InputGroup>
            <Button
              onClick={() => incrementCustomerCredits()}
              marginTop={8}
              w="100%"
              colorScheme="whatsapp"
            >
              Salvar
            </Button>
          </Flex>
        </GenericModal>
        <GenericModal
          isOpen={modalDetailsIsOpen}
          onRequestClose={() => setModalDetailsIsOpen(false)}
        >
          <ModalDetails
            client={client}
            debitsDetails={dataDetailsDebits as Consult} 
            setModalDetailsIsOpen={setModalDetailsIsOpen}
          />
        </GenericModal>
      </AdminContainer>
    </ChakraProvider>
  );
}
