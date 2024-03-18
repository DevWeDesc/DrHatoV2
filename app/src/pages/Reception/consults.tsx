import {
  Flex,
  ChakraProvider,
  Table,
  Thead,
  Tr,
  Th,
  Td,
  Tbody,
  TableContainer,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RecepetionSearch } from "../../components/Search/receptionSearch";
import { DbContext } from "../../contexts/DbContext";
import { api } from "../../lib/axios";
import { Header } from "../../components/admin/Header";
import { GenericLink } from "../../components/Sidebars/GenericLink";
import { GenericSidebar } from "../../components/Sidebars/GenericSideBar";
import { AiFillEdit } from "react-icons/ai";
import { FaUserPlus } from "react-icons/fa";

export function ReceptionConsults() {
  const navigate = useNavigate();
  const { customer } = useContext(DbContext);
  const [dataCostumer, setDataCostumer] = useState([]);
  const [page, setPage] = useState(0);

  async function getCustomer() {
    const dataCostumer = await api.get("customers");
    setDataCostumer(dataCostumer.data.users);
  }
  useEffect(() => {
    getCustomer();
  }, []);

  return (
    <ChakraProvider>
      <Flex direction="column" h="100vh">
        <Header title="Menu Recepção" url="/Recepcao" />
        <Flex
          w="100%"
          my={{ lg: "6" }}
          direction={{ base: "column", lg: "row" }}
          mx="auto"
          px="6"
        >
          <GenericSidebar>
            <GenericLink
              name="Alterar Consulta"
              icon={AiFillEdit}
              path={`/Recepcao/Change`}
            />
            <GenericLink
              name="Cadastro de Clientes"
              icon={FaUserPlus}
              path={`/Recepcao/Create`}
            />{" "}
          </GenericSidebar>

          <Flex
            flex="1"
            direction="column"
            borderRadius={8}
            py={{ base: 8, xl: 0 }}
            maxH="44rem"
            overflow="auto"
          >
            <RecepetionSearch path={`/customersearch/${page}`} />
            <Flex
              mb="8"
              gap="8"
              direction="column"
              align="center"
              overflow="auto"
              maxHeight="44rem"
              overflowY="auto"
            >
              <Flex
                textAlign="center"
                justify="center"
                w="100%"
                fontWeight="bold"
              >
                <TableContainer w="full">
                  <Table mt="4" w="100%" colorScheme="blackAlpha">
                    <Thead>
                      <Tr>
                        <Th>Nome</Th>
                        <Th>Telefone</Th>
                        <Th>R.G</Th>
                        <Th>CPF/CNPJ</Th>
                      </Tr>
                    </Thead>
                    {customer ? (
                      customer.map((client: any) => (
                        <Tbody key={client?.id}>
                          <Tr
                            cursor="pointer"
                            onClick={() =>
                              navigate(
                                `/Recepcao/Consultas/Clientes/${client?.id}`
                              )
                            }
                          >
                            <Td fontSize={{ base: "12", lg: "sm " }}>
                              {client?.name}
                            </Td>
                            <Td fontSize={{ base: "12", lg: "sm " }}>
                              {client?.phone}
                            </Td>
                            <Td fontSize={{ base: "12", lg: "sm " }}>
                              {client?.rg}
                            </Td>
                            <Td fontSize={{ base: "12", lg: "sm " }}>
                              {client?.cpf}
                            </Td>
                          </Tr>
                        </Tbody>
                      ))
                    ) : (
                      <Tbody>
                        <Tr>
                          <Td>Empty</Td>
                          <Td>Empty</Td>
                          <Td>Empty</Td>
                          <Td>Empty</Td>
                        </Tr>
                      </Tbody>
                    )}
                    {customer <= 0 ? (
                      <>
                        {dataCostumer.map((client: any) => (
                          <Tbody key={client.id}>
                            <Tr>
                              <Td
                                cursor="pointer"
                                fontSize={{ base: "12", lg: "sm" }}
                                onClick={() =>
                                  navigate(
                                    `/Recepcao/Consultas/Clientes/${client.id}`
                                  )
                                }
                              >
                                {client.name}
                              </Td>
                              <Td fontSize={{ base: "12", lg: "sm" }}>
                                {client.phone}
                              </Td>
                              <Td fontSize={{ base: "12", lg: "sm" }}>
                                {client.rg}
                              </Td>
                              <Td fontSize={{ base: "12", lg: "sm" }}>
                                {client.cpf}
                              </Td>
                            </Tr>
                          </Tbody>
                        ))}
                      </>
                    ) : (
                      <></>
                    )}
                  </Table>
                </TableContainer>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </ChakraProvider>
  );
}
