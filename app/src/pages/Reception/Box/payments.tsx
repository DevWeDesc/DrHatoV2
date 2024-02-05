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
  Grid,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Header } from "../../../components/admin/Header";
import { GenericLink } from "../../../components/Sidebars/GenericLink";
import { GenericSidebar } from "../../../components/Sidebars/GenericSideBar";
import { BiCalendarPlus, AiFillEdit } from "react-icons/all";
import { AdminContainer } from "../../AdminDashboard/style";
import { useNavigate } from "react-router-dom";
import { api } from "../../../lib/axios";
import { PaymentsSearch } from "../../../components/Search/paymentsSearch";
import { BsReception4 } from "react-icons/bs";
import { LoadingSpinner } from "../../../components/Loading";

interface QueueProps {
  response: [];
  totalInQueue: number;
}

export function BoxPayments() {
  const [totalPayments, setTotaPayments] = useState([]);
  const [refresh, setRefresh] = useState(true);
  const navigate = useNavigate();

  async function getQueue() {
    const payment = await api.get("/account/debitsAll");
    setTotaPayments(payment.data);
  }

  useEffect(() => {
    if (refresh) {
      getQueue();
      setRefresh(false);
    }
  }, [refresh]);

  if (totalPayments.length == 0) {
    return <LoadingSpinner />;
  }

  return (
    <ChakraProvider>
      <AdminContainer>
        <Flex direction="column" h="100vh">
          <Header title="Painel de Pagamentos" url="/Recepcao" />
          <Flex w="100%" my="6" maxWidth={1680} mx="auto" px="6">
            <GenericSidebar>
              <GenericLink
                name="Recepção"
                icon={BsReception4}
                path={`/Recepcao/`}
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
              <Flex mb="8" gap="8" direction="column" align="center">
                <PaymentsSearch path="filtredquery" />
                <Grid templateColumns="repeat(3, 1fr)" gap={5}>
                  <div />
                  {/* <Button colorScheme="teal" onClick={() => navigate("/Queue")}> */}
                  {/* <>TOTAL NA FILA: {totalCustomer.length}</> */}
                  {/* </Button> */}
                  {/* <Flex alignItems="center" gap={2}>
                    <Button
                      colorScheme="yellow"
                      onClick={beforePage}
                      fontSize={14}
                    >
                      Página Anterior
                    </Button>
                    <Text fontWeight="bold">{pagination}</Text>
                    <Button
                      colorScheme="yellow"
                      onClick={nextPage}
                      fontSize={14}
                    >
                      Próxima página
                    </Button>
                  </Flex> */}
                </Grid>
                <Flex textAlign="center" justify="center" w="80%">
                  <Table colorScheme="blackAlpha">
                    <Thead>
                      <Tr>
                        <Th>Cliente </Th>
                        <Th>Nome</Th>
                        <Th>Valor</Th>
                        <Th>Data</Th>
                        <Th>Meio de pagamento</Th>
                      </Tr>
                    </Thead>

                    <Tbody>
                      {totalPayments?.map((payment: any) => (
                        <Tr
                          key={payment?.id}
                          cursor="pointer"
                          onClick={() =>
                            navigate(
                              `/Recepcao/Caixa/Pagamentos/${payment.customerId}`
                            )
                          }
                        >
                          <Td>{payment?.customerId}</Td>
                          <Td>{payment?.id}</Td>

                          <Td>{payment?.amountInstallments.concat(",00")}</Td>

                          <Td>
                            {new Intl.DateTimeFormat("pt-BR").format(
                              new Date(payment.paymentDate)
                            )}
                          </Td>

                          <Td>{payment?.paymentType}</Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </Flex>
              </Flex>
            </Box>
          </Flex>
        </Flex>
      </AdminContainer>
    </ChakraProvider>
  );
}
