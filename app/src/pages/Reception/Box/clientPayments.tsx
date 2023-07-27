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
  TableCaption,
  Tfoot,
  border,
} from "@chakra-ui/react";

import { Header } from "../../../components/admin/Header";

import { AdminContainer } from "../../AdminDashboard/style";
import { GenericLink } from "../../../components/Sidebars/GenericLink";
import { GenericSidebar } from "../../../components/Sidebars/GenericSideBar";
import { PaymentsSearch } from "../../../components/Search/paymentsSearch";
import { BiHome, BsCashCoin } from "react-icons/all";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { api } from "../../../lib/axios";
import { useNavigate, useParams } from "react-router-dom";

export function BoxNewPaymentsClient() {
  const [client, setClient] = useState([]);
  const { id } = useParams<{ id: string }>();
  const [cash, setCash] = useState<number | string>("");
  const navigate = useNavigate();

  /*async function getCustomers() {
    const response = await api.get(`http://localhost:5000/customers/${id}`);
    setCostumers(response.data);
  }*/

  const clientes = [
    {
      id: 1,
      name: "Junior Ferreira Campos",
      animal: "Mel",
      date: "24/07/23",
      our: "10:04",
      balance: "-90,00",
      state: "Campinas",
      cep: "13051-207",
      bairro: "Jardim Santa Cruz",
      adress: "Avenida Maria Clara Machado",
      phone: "(11) 98379-0437",
      vet: "Henrique Magoga",
    },
    {
      id: 2,
      name: "Junior Ferreira Campos Teste 2",
      animal: "Mel",
      date: "24/07/23",
      our: "10:04",
      balance: "-90,00",
      state: "Campinas",
      cep: "13051-207",
      bairro: "Jardim Santa Cruz",
      adress: "Avenida Maria Clara Machado",
      phone: "(11) 98379-0437",
    },
  ];

  const consults = [
    {
      qtd: 1,
      protocols: "Consulta ",
      table: "130,00",
      discount: "0%",
      value: "130,00",
    },
    {
      qtd: 1,
      protocols: "Hemograma Canino Adulto  ",
      table: "49,00",
      discount: "0%",
      value: "49,00",
    },
    {
      qtd: 1,
      protocols: "Bioquimico Pre-cirurgico  ",
      table: "109,00",
      discount: "0%",
      value: "109,00",
    },
  ];

  useEffect(() => {
    const clientesFilter: any = clientes.filter((user: any) => user.id == id);
    setClient(clientesFilter);
  }, []);

  console.log(cash);

  function BgInput(cash: string | number) {
    if (cash === "") {
      return "white";
    } else if (cash >= 0) {
      return "green.100";
    } else if (cash < 0) {
      return "red.100";
    } else {
      return "white";
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <ChakraProvider>
        <AdminContainer>
          <Flex direction="column" h="100vh">
            <Header title="Painel de Pagamentos por Cliente" />
            <Flex w="100%" my="6" maxWidth={1680} mx="auto" px="6">
              <GenericSidebar>
                <GenericLink
                  name="Painel de Pagamentos"
                  icon={BsCashCoin}
                  path="/Recepcao/Caixa/Pagamentos"
                />
                <GenericLink
                  name="Pagamentos Consultas"
                  icon={BsCashCoin}
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
                          color="black"
                          bg="blue.100"
                          colSpan={5}
                        >
                          Visualização de Consulta
                        </Th>
                      </Tr>
                      {client.map((user: any) => (
                        <>
                          {" "}
                          <Tr>
                            <Th px="0" pl="5" fontSize="18" color="black">
                              Nome do Cliente
                            </Th>
                            <Th px="0" colSpan={2}>
                              <Input
                                bg="white"
                                borderColor="black"
                                value={user.name}
                              />
                            </Th>
                            <Th px="0" pl="5" fontSize="18" color="black">
                              Nome do Animal
                            </Th>
                            <Th colSpan={1}>
                              <Input
                                bg="white"
                                borderColor="black"
                                value={user.animal}
                              />
                            </Th>
                          </Tr>
                          <Tr>
                            <Th px="0" pl="5" fontSize="18" color="black">
                              Data da Consulta
                            </Th>
                            <Th px="0" colSpan={2}>
                              <Input
                                bg="white"
                                borderColor="black"
                                value={`${user.date}  às ${user.our}`}
                              />
                            </Th>
                            <Th px="0" pl="5" fontSize="18" color="black">
                              Veterinário
                            </Th>
                            <Th colSpan={1}>
                              <Input
                                bg="white"
                                borderColor="black"
                                value={user.vet}
                              />
                            </Th>
                          </Tr>
                        </>
                      ))}
                    </Thead>
                    <Tbody>
                      <Tr>
                        <Th
                          fontSize="18"
                          py="8"
                          color="black"
                          bg="blue.100"
                          colSpan={5}
                        >
                          Produtos / Serviços nesta consulta
                        </Th>
                      </Tr>
                    </Tbody>
                    <Thead>
                      <Tr bg="blue.400">
                        <Th
                          border="1px solid black"
                          fontSize="18"
                          color="white"
                          colSpan={1}
                        >
                          Quantidade
                        </Th>
                        <Th
                          colSpan={1}
                          border="1px solid black"
                          fontSize="18"
                          color="white"
                        >
                          Produto / Serviço
                        </Th>
                        <Th
                          colSpan={1}
                          border="1px solid black"
                          fontSize="18"
                          isNumeric
                          color="white"
                        >
                          Tabela
                        </Th>
                        <Th
                          colSpan={1}
                          border="1px solid black"
                          fontSize="18"
                          isNumeric
                          color="white"
                        >
                          Desconto
                        </Th>
                        <Th
                          colSpan={1}
                          border="1px solid black"
                          fontSize="18"
                          color="white"
                        >
                          Valor Cobrado
                        </Th>
                      </Tr>
                    </Thead>
                    {consults.map((cons: any) => {
                      return (
                        <Tbody>
                          <Tr bg="white" cursor="pointer" fontWeight="bold">
                            <Td border="1px solid black">{cons.qtd}</Td>
                            <Td border="1px solid black"> {cons.protocols}</Td>
                            <Td
                              border="1px solid black"
                              isNumeric
                              fontWeight="bold"
                            >
                              R$ {cons.table}
                            </Td>
                            <Td border="1px solid black" isNumeric>
                              {cons.discount}
                            </Td>
                            <Td border="1px solid black" isNumeric>
                              R$ {cons.value}
                            </Td>
                          </Tr>
                        </Tbody>
                      );
                    })}
                    <Tr bg="white" cursor="pointer" fontWeight="bold">
                      <Td colSpan={4} border="1px solid black" isNumeric>
                        Total
                      </Td>
                      <Td border="1px solid black" isNumeric>
                        R$ 288,00
                      </Td>
                    </Tr>
                  </Table>
                </TableContainer>
              </Box>
            </Flex>
          </Flex>
        </AdminContainer>
      </ChakraProvider>
    </motion.div>
  );
}
