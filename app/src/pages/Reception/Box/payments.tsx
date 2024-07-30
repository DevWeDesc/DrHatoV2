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
} from "@chakra-ui/react";
import { Header } from "../../../components/admin/Header";
import { GenericLink } from "../../../components/Sidebars/GenericLink";
import { GenericSidebar } from "../../../components/Sidebars/GenericSideBar";
import { BiCalendarPlus, AiFillEdit } from "react-icons/all";
import { AdminContainer } from "../../AdminDashboard/style";
import { useNavigate } from "react-router-dom";
import { api } from "../../../lib/axios";
import { PaymentFilterSearch } from "../../../components/Search/PaymentFilterSearch";
import { BsReception4 } from "react-icons/bs";
import { LoadingSpinner } from "../../../components/Loading";
import { useQuery } from "react-query";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

export function BoxPayments() {
  const navigate = useNavigate();
  const methods = useForm();

  async function getQueue() {
    const queueSearch = methods.watch();

    const validatedQueueSearch = Object.values(queueSearch).some(
      (value) => value !== ""
    );

    const response = validatedQueueSearch
      ? await api.get(
          `/filtredquerypayments?name=${queueSearch.name}&cpf=${queueSearch.cpf}&codCli=${queueSearch.codCli}&codPet=${queueSearch.codPet}&telephone=${queueSearch.telephone}`
        )
      : await api.get("/debitaccounts");

    return response.data;
  }

  const handleSearch: SubmitHandler<any> = async (values) => {
    refetch();
  };

  const { data, isLoading, refetch } = useQuery("accountDebits", {
    queryFn: getQueue,
  });

  if (isLoading) {
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
              <Flex mb="8" gap="8">
                <FormProvider {...methods}>
                  <form onSubmit={methods.handleSubmit(handleSearch)}>
                    <PaymentFilterSearch />
                  </form>
                </FormProvider>

                <Flex
                  textAlign="center"
                  justify="center"
                  height={"full"}
                  w="80%"
                >
                  <Table colorScheme="blackAlpha">
                    <Thead>
                      <Tr>
                        <Th>Cliente</Th>
                        <Th>Último Animal</Th>
                        <Th>Data</Th>
                        <Th>Hora</Th>
                        <Th>Saldo</Th>
                      </Tr>
                    </Thead>

                    <Tbody>
                      {data?.map((payment: any) => (
                        <Tr
                          key={payment?.id}
                          cursor="pointer"
                          onClick={() =>
                            navigate(`/Recepcao/Caixa/Pagamentos/${payment.id}`)
                          }
                          backgroundColor={
                            payment?.customerAccount?.clientIsVip && "orange.200"
                              
                          }
                          _hover={{
                            backgroundColor: payment?.customerAccount
                              ?.clientIsVip
                              ? "orange.300"
                              : "gray.300",
                          }}
                        >
                          <Td>{payment?.name}</Td>
                          <Td>{payment.pets[0].name}</Td>
                          <Td>
                            {new Intl.DateTimeFormat("pt-BR", {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                            }).format(
                              new Date(payment?.customerAccount?.dateConsult)
                            )}
                          </Td>
                          <Td>
                            {new Intl.DateTimeFormat("pt-BR", {
                              hour: "numeric",
                              minute: "numeric",
                            }).format(
                              new Date(payment?.customerAccount?.dateConsult)
                            )}
                          </Td>
                          <Td>
                            {new Intl.NumberFormat("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            }).format(
                              payment?.customerAccount?.credits -
                                payment?.customerAccount?.debits
                            )}
                          </Td>
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
