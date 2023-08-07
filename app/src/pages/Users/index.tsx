import {
  Text,
  Box,
  Button,
  ChakraProvider,
  Checkbox,
  Flex,
  Heading,
  Icon,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { RiAddLine, RiPencilLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { Header } from "../../components/admin/Header";
import { Paginaton } from "../../components/admin/Pagination";
import { Sidebar } from "../../components/admin/Sidebar";
import { LoadingSpinner } from "../../components/Loading";
import { DbContext } from "../../contexts/DbContext";
import { api } from "../../lib/axios";
import { motion } from "framer-motion";

import { AdminContainer } from "../AdminDashboard/style";

export function UsersList() {
  const { userDataList } = useContext<any>(DbContext);
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(false);

  const getUserListData = async () => {
    const response = await api.get(`users`);
    setUser(response.data.users);
  };

  useEffect(() => {
    getUserListData();
  }, []);

  useEffect(() => {
    if (loading === true) {
      getUserListData();
      setLoading(false);
    }
  }, [loading]);

  return (
    <ChakraProvider>
      <AdminContainer>
        <Flex direction="column" h="100vh">
          <Header title="Usuários" url="/Admin/" />

          <Flex w="100%" my="6" maxWidth={1680} mx="auto" px="6">
            <Sidebar />
            <Box
              flex="1"
              borderRadius={8}
              bg="gray.200"
              p="8"
              maxH="44rem"
              overflow="auto"
            >
              <Flex
                mb="8"
                direction="column"
                justify="space-between"
                align="center"
              >
                <Heading width="100%" fontSize="30" fontWeight="bold">
                  Usúarios
                </Heading>

                <Link
                  onClick={() => setLoading(true)}
                  to="/Users/Create"
                  style={{ width: "100%" }}
                >
                  <Button
                    as="a"
                    mt="5"
                    width="100%"
                    py="8"
                    fontSize="20"
                    colorScheme="whatsapp"
                    leftIcon={<Icon as={RiAddLine} />}
                  >
                    Criar novo
                  </Button>
                </Link>
              </Flex>

              <Table colorScheme="blackAlpha">
                <Thead>
                  <Tr>
                    <Th borderColor="black" fontSize="18">
                      Usuário
                    </Th>
                    <Th borderColor="black" fontSize="18">
                      Tipo de Usuário
                    </Th>
                    <Th width="8" borderColor="black" fontSize="18"></Th>
                  </Tr>
                </Thead>

                <Tbody>
                  {user ? (
                    user.map((user: any) => (
                      <Tr key={user.id}>
                        <Td borderColor="black">
                          <Box>
                            <Text
                              fontWeight="bold"
                              fontSize="16"
                              color="gray.800"
                            >
                              {user.name}
                            </Text>
                            <Text fontSize="15" color="gray.600">
                              {user.username}
                            </Text>
                          </Box>
                        </Td>
                        <Td borderColor="black">
                          <Text fontWeight="bold" color="gray.800">
                            {user.userType.includes("admin")
                              ? "ADMINISTRADOR"
                              : user.userType.includes("vet")
                              ? "VETERINÁRIO"
                              : user.userType.includes("reception")
                              ? "RECEPCIONISTA"
                              : "USUÁRIO"}
                          </Text>
                        </Td>

                        <Td borderColor="black">
                          <Link to={`/Users/Edit/${user.id}`}>
                            <Button
                              as="a"
                              size="md"
                              fontSize="md"
                              colorScheme="yellow"
                              leftIcon={<Icon as={RiPencilLine} />}
                            >
                              Editar
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
            </Box>
          </Flex>
        </Flex>
      </AdminContainer>
    </ChakraProvider>
  );
}
