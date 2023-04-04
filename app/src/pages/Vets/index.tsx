import {
  Text,
  Box,
  Button,
  ChakraProvider, Flex,
  Heading,
  Icon,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr
} from "@chakra-ui/react";
import { useContext } from "react";
import { RiAddLine, RiPencilLine, RiUserSearchLine } from "react-icons/all";
import { Link } from "react-router-dom";
import { Header } from "../../components/admin/Header";
import { Paginaton } from "../../components/admin/Pagination";
import { Sidebar } from "../../components/admin/Sidebar";
import { LoadingSpinner } from "../../components/Loading";
import { DbContext } from "../../contexts/DbContext";

import { AdminContainer } from "../AdminDashboard/style";

export function VetsList() {
  const { vetList } = useContext(DbContext);
  return (
    <ChakraProvider>
      <AdminContainer>
        <Flex direction="column" h="100vh">
          <Header title="Painel Administrativo"/>

          <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
            <Sidebar />
            <Box flex="1" borderRadius={8} bg="gray.200" p="8">
              <Flex mb="8" justify="space-between" align="center">
                <Heading size="lg" fontWeight="normal">
                  Veterinários
                </Heading>

                <Link to="/Home/Vets/Create">
                  <Button
                    as="a"
                    size="sm"
                    fontSize="sm"
                    colorScheme="green"
                    leftIcon={<Icon as={RiAddLine} />}
                  >
                    Criar novo
                  </Button>
                </Link>
              </Flex>

              <Table colorScheme="blackAlpha">
                <Thead>
                  <Tr>
                    <Th>Veterinário</Th>
                    <Th>CRMV</Th>
                    <Th>Especialidade</Th>
                    <Th width="8"></Th>
                  </Tr>
                </Thead>

                <Tbody>
                  {vetList ? (
                    vetList.map((vet) => (
                      <Tr key={vet.id}>
                        <Td px="6">
                          <Text fontWeight="bold" color="gray.800">
                            {vet.name}
                          </Text>
                        </Td>
                        <Td>
                          <Box>
                            <Text fontWeight="bold" color="gray.800">
                              {vet.crmv}
                            </Text>
                          </Box>
                        </Td>
                        <Td>
                          <Text fontWeight="bold" color="gray.800">
                            {vet.speciality}
                          </Text>
                        </Td>

                        <Td>
                          <Link to={`/Home/Users/Edit/${vet.id}`}>
                            <Button
                              as="a"
                              size="sm"
                              fontSize="sm"
                              colorScheme="green"
                              leftIcon={<Icon as={RiPencilLine} />}
                            >
                              Editar
                            </Button>
                          </Link>
                        </Td>
                        <Td>
                          <Link to={`/Home/Users/Edit/${vet.id}`}>
                            <Button
                              as="a"
                              size="sm"
                              fontSize="sm"
                              colorScheme="yellow"
                              leftIcon={<Icon as={RiUserSearchLine} />}
                            >
                              Detalhes
                            </Button>
                          </Link>
                        </Td>
                      </Tr>
                    ))
                  ) : (
                    <LoadingSpinner />
                  )}
                </Tbody>
              </Table>

              <Paginaton />
            </Box>
          </Flex>
        </Flex>
      </AdminContainer>
    </ChakraProvider>
  );
}
