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
import { BiCalendarPlus, AiFillEdit, CiStar, FaStar } from "react-icons/all";
import { AdminContainer } from "../../AdminDashboard/style";
import { useNavigate } from "react-router-dom";
import { api } from "../../../lib/axios";
import { PaymentsSearch } from "../../../components/Search/paymentsSearch";
import { BsReception4 } from "react-icons/bs";
import { LoadingSpinner } from "../../../components/Loading";
import { useQuery } from "react-query";

interface QueueProps {
  response: [];
  totalInQueue: number;
}

export function BoxPayments() {
  const navigate = useNavigate();

  async function getQueue() {
    const response = await api.get("/debitaccounts");
    return response.data
  }

  const {data, isLoading } = useQuery('accountDebits', {
    queryFn: getQueue
  })

  if(isLoading) {
    return <LoadingSpinner/>
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
                        <Th>Conta</Th>
                        <Th>Cliente</Th>
                        <Th>Valor em débito</Th>
                        <Th>ID: Consulta/Internação</Th>
                        <Th>Cliente Vip ?</Th>
                      </Tr>
                    </Thead>

                    <Tbody>
                      {data?.map((payment: any) => (
                        <Tr
                          key={payment?.id}
                          cursor="pointer"
                          onClick={() =>
                            navigate(
                              `/Recepcao/Caixa/Pagamentos/${payment.customerId}`
                            )
                          }
                        >
                            <Td>{payment?.customerAccount?.accountNumber}</Td>
                          <Td>{payment?.name}</Td>
                        

                          <Td>{new Intl.NumberFormat('pt-BR', 
                          {style: 'currency', currency: 'BRL'}).format(payment?.customerAccount?.debits)}</Td>
                          <Td>{payment?.customerAccount?.consultId}</Td>
                          <Td>{payment?.customerAccount?.clientIsVip ? <FaStar color="red" size={32} /> : <FaStar color="orange" size={32} />}</Td>
                  
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
