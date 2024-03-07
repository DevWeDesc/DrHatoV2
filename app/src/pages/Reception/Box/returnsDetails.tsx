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
  Textarea,
} from "@chakra-ui/react";

import { Header } from "../../../components/admin/Header";

import { AdminContainer } from "../../AdminDashboard/style";

import { useEffect, useState } from "react";
import { api } from "../../../lib/axios";
import { useParams } from "react-router-dom";
import { GenericLink } from "../../../components/Sidebars/GenericLink";
import { GenericSidebar } from "../../../components/Sidebars/GenericSideBar";
import { BiHome } from "react-icons/bi";
import { BsCashCoin, BsReception4 } from "react-icons/bs";
import { GiCardDiscard } from "react-icons/gi";
import { ICustomer } from "../../../interfaces";
import { FieldValues, useForm } from "react-hook-form";
import { toast } from "react-toastify";

type FormValues = {
  reasonForReturn: string;
  userName: string;
  password: string;
};

export function BoxReturnsDetails() {
  const [customer, setCostumer] = useState({} as ICustomer);
  const { id, linkedAdmissionId } = useParams<{
    id: any;
    linkedAdmissionId: any;
  }>();
  const { register, handleSubmit } = useForm<FormValues>();

  const customerInstallments = customer?.customerAccount?.installments?.find(
    (data) => data.id == linkedAdmissionId
  );

  const onSubmit = handleSubmit(async (values) => {
    const data = {
      reasonForReturn: values.reasonForReturn,
      userName: values.userName,
      password: values.password,
      value: customerInstallments?.amountInstallments,
    };

    await api
      .post(
        `/account/returns/${customerInstallments?.boxHistoryId}/${id}/${linkedAdmissionId}`,
        data
      )
      .then(() => {
        try {
          toast.success("Devolução cadastrada com sucesso!");
        } catch (err) {
          toast.error("Erro no servidor");
        }
      })
      .catch((res) => {
        console.log(res);
        toast.error(
          !res?.response?.data?.message
            ? res?.response?.data
            : "Devolução já realizada anteriormente"
        );
      });
  });

  async function getCustomer() {
    const response = await api.get(`/customers/${id}`);
    setCostumer(response.data.customer);
  }
  useEffect(() => {
    getCustomer();
  }, []);

  return (
    <ChakraProvider>
      <AdminContainer>
        <Flex direction="column" h="100vh">
          <Header title="Painel de Devoluções" url="/Recepcao/Caixa/Returns/" />
          <Flex w="100%" my="6" maxWidth={1680} mx="auto" px="6">
            <GenericSidebar>
              <GenericLink name="Home" icon={BiHome} path={`/Home/`} />
              <GenericLink
                name="Recepção"
                icon={BsReception4}
                path={`/Recepcao/`}
              />

              <GenericLink
                name="Painel de Devoluções"
                icon={GiCardDiscard}
                path="/Recepcao/Caixa/Returns"
              />
            </GenericSidebar>
            <Box flex="1" borderRadius={8} bg="gray.200" p="8">
              <TableContainer>
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th
                        colSpan={4}
                        fontSize="18"
                        py="8"
                        color="black"
                        bg="blue.100"
                        borderBottom="1px solid black"
                      >
                        Dados do Cliente
                      </Th>
                      {/* <Th bg="blue.100" borderBottom="1px solid black">{}</Th>
                      <Th bg="blue.100" borderBottom="1px solid black"></Th>
                      <Th bg="blue.100" borderBottom="1px solid black"></Th> */}
                    </Tr>
                  </Thead>

                  <Tbody>
                    <Tr border="1px solid black">
                      <>
                        {" "}
                        <Td
                          fontSize="18"
                          fontWeight="bold"
                          py="0"
                          borderColor="black"
                        >
                          Cliente
                        </Td>
                        <Td py="0" borderColor="black">
                          <Input
                            borderLeft="2px solid black"
                            bg="white"
                            borderColor="black"
                            value={customer?.name}
                            rounded="0"
                            pr="0"
                            w="100%"
                          />
                        </Td>
                      </>

                      <Td
                        borderColor="black"
                        py="0"
                        pl="0"
                        textAlign="end"
                        fontSize="18"
                        fontWeight="bold"
                      >
                        Endereço
                      </Td>
                      <Td py="0" pr="0" borderColor="black">
                        <Input
                          bg="white"
                          borderColor="black"
                          value={customer?.adress}
                          rounded="0"
                          pr="0"
                          w="100%"
                        />
                      </Td>
                    </Tr>
                    <Tr border="1px solid black">
                      <Td
                        py="0"
                        fontSize="18"
                        fontWeight="bold"
                        borderColor="black"
                      >
                        Bairro
                      </Td>
                      <Td py="0" borderColor="black">
                        <Input
                          borderLeft="2px solid black"
                          bg="white"
                          borderColor="black"
                          value={customer?.neighbour}
                          rounded="0"
                          pr="0"
                          w="100%"
                        />
                      </Td>
                      <Td
                        borderColor="black"
                        py="0"
                        fontSize="18"
                        fontWeight="bold"
                        pl="0"
                        textAlign="end"
                      >
                        CEP
                      </Td>
                      <Td py="0" pr="0" borderColor="black">
                        <Input
                          bg="white"
                          borderColor="black"
                          value={customer?.cep?.toString()}
                          rounded="0"
                          pr="0"
                          w="100%"
                        />
                      </Td>
                    </Tr>
                    <Tr border="1px solid black" p="0" m="0">
                      <Td
                        fontSize="18"
                        fontWeight="bold"
                        py="0"
                        borderColor="black"
                      >
                        Estado
                      </Td>
                      <Td py="0" borderColor="black">
                        <Input
                          borderLeft="2px solid black"
                          bg="white"
                          borderColor="black"
                          value={customer?.district}
                          rounded="0"
                          pr="0"
                          w="100%"
                        />
                      </Td>
                      <Td
                        borderColor="black"
                        py="0"
                        fontSize="18"
                        fontWeight="bold"
                        pl="0"
                        textAlign="end"
                      >
                        Telefone
                      </Td>
                      <Td py="0" pr="0" borderColor="black">
                        <Input
                          bg="white"
                          borderColor="black"
                          value={customer?.phone}
                          rounded="0"
                          pr="0"
                          w="100%"
                        />
                      </Td>
                    </Tr>
                  </Tbody>
                </Table>
              </TableContainer>
              <TableContainer>
                <form onSubmit={onSubmit}>
                  <Table variant="simple">
                    <Thead>
                      <Tr>
                        <Th
                          colSpan={4}
                          fontSize="18"
                          py="8"
                          color="black"
                          bg="blue.100"
                          borderBottom="1px solid black"
                        >
                          Dados da Devolução
                        </Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      <Tr border="1px solid black">
                        <Td
                          fontSize="18"
                          fontWeight="bold"
                          py="0"
                          borderColor="black"
                          w="355px"
                        >
                          Data
                        </Td>
                        <Td py="0" borderColor="black">
                          <Input
                            value={new Intl.DateTimeFormat("Sp-BR", {
                              year: "numeric",
                              day: "2-digit",
                              month: "2-digit",
                            }).format(new Date())}
                            borderLeft="2px solid black"
                            bg="white"
                            borderColor="black"
                            // type="date"
                            rounded="0"
                          />
                        </Td>
                        <Td
                          borderColor="black"
                          py="0"
                          pl="0"
                          textAlign="end"
                          fontSize="18"
                          fontWeight="bold"
                        >
                          Horário
                        </Td>
                        <Td borderColor="black" py="0" pr="0">
                          <Input
                            value={new Intl.DateTimeFormat("sp-BR", {
                              hour: "2-digit",
                              minute: "2-digit",
                            }).format(new Date())}
                            bg="white"
                            borderColor="black"
                            rounded="0"
                          />
                        </Td>
                      </Tr>
                      <Tr border="1px solid black">
                        <Td
                          borderColor="black"
                          py="0"
                          fontSize="18"
                          fontWeight="bold"
                        >
                          Caixa
                        </Td>
                        <Td borderColor="black" py="0">
                          <Input
                            value={customerInstallments?.boxHistoryId}
                            borderLeft="2px solid black"
                            bg="white"
                            borderColor="black"
                            rounded="0"
                          />
                        </Td>
                        <Td
                          borderColor="black"
                          py="0"
                          pl="0"
                          textAlign="end"
                          fontSize="18"
                          fontWeight="bold"
                        >
                          Valor
                        </Td>
                        <Td borderColor="black" py="0" pr="0">
                          <Input
                            value={`R$ ${customerInstallments?.amountInstallments},00`}
                            bg="white"
                            borderColor="black"
                            rounded="0"
                          />
                        </Td>
                      </Tr>
                      <Tr border="1px solid black">
                        <Td
                          borderColor="black"
                          py="0"
                          fontSize="18"
                          fontWeight="bold"
                        >
                          Seu Login
                        </Td>
                        <Td borderColor="black" py="0">
                          <Input
                            {...register("userName")}
                            borderLeft="2px solid black"
                            bg="white"
                            borderColor="black"
                            rounded="0"
                          />
                        </Td>
                        <Td
                          borderColor="black"
                          py="0"
                          pl="0"
                          textAlign="end"
                          fontSize="18"
                          fontWeight="bold"
                        >
                          Sua Senha
                        </Td>
                        <Td py="0" pr="0" borderColor="black">
                          <Input
                            {...register("password")}
                            bg="white"
                            borderColor="black"
                            rounded="0"
                          />
                        </Td>
                      </Tr>
                      <Tr border="1px solid black">
                        <Td
                          py="0"
                          pl="5"
                          fontSize="18"
                          fontWeight="bold"
                          borderColor="black"
                        >
                          Motivo da Devolução
                        </Td>
                        <Td py="0" colSpan={3} pr="0" borderColor="black">
                          <Textarea
                            {...register("reasonForReturn")}
                            borderLeft="2px solid black"
                            rounded="0"
                            bg="white"
                            borderColor="black"
                          />
                        </Td>
                      </Tr>
                    </Tbody>
                  </Table>
                  <Button type="submit" w="100%" py="8" colorScheme="whatsapp">
                    Gravar
                  </Button>
                </form>
              </TableContainer>
            </Box>
          </Flex>
        </Flex>
      </AdminContainer>
    </ChakraProvider>
  );
}
