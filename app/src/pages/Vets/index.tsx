import {
  Text,
  Box,
  Button,
  ChakraProvider,
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
import { RiAddLine, RiPencilLine, RiUserSearchLine } from "react-icons/all";
import { Link } from "react-router-dom";
import { Header } from "../../components/admin/Header";
import { Paginaton } from "../../components/admin/Pagination";
import { Sidebar } from "../../components/admin/Sidebar";
import { LoadingSpinner } from "../../components/Loading";
import { DbContext } from "../../contexts/DbContext";
import { motion } from "framer-motion";
import { AdminContainer } from "../AdminDashboard/style";

export function VetsList() {
  const { vets } = useContext(DbContext);
  const [vet, setVet] = useState([]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <ChakraProvider>
        <AdminContainer>
          <Flex direction="column" h="100vh">
            <Header title="Painel Administrativo" />

            <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
              <Sidebar />
              <Box flex="1" borderRadius={8} bg="gray.200" p="8">
                <Flex
                  mb="8"
                  direction="column"
                  justify="space-between"
                  align="center"
                >
                  <Heading width="100%" fontSize="30" fontWeight="bold">
                    Veterinários
                  </Heading>

                  <Link to="/Vets/Create" style={{ width: "100%" }}>
                    <Button
                      as="a"
                      mt="5"
                      width="100%"
                      py="8"
                      fontSize="20"
                      colorScheme="whatsapp"
                      leftIcon={<Icon as={RiAddLine} />}
                    >
                      Adicionar Veterinário
                    </Button>
                  </Link>
                </Flex>

                <Table colorScheme="blackAlpha">
                  <Thead>
                    <Tr>
                      <Th borderColor="black" fontSize="18">
                        Veterinário
                      </Th>
                      <Th borderColor="black" fontSize="18">
                        CRMV
                      </Th>
                      <Th borderColor="black" fontSize="18">
                        Especialidade
                      </Th>
                      <Th width="8" borderColor="black" fontSize="18"></Th>
                      <Th width="8" borderColor="black" fontSize="18"></Th>
                    </Tr>
                  </Thead>

                  <Tbody>
                    {vets ? (
                      vets.map((vet) => (
                        <Tr key={vet.id}>
                          <Td px="6" borderColor="black">
                            <Text
                              fontWeight="bold"
                              fontSize="16"
                              color="gray.800"
                            >
                              {vet.name}
                            </Text>
                          </Td>
                          <Td borderColor="black">
                            <Box>
                              <Text
                                fontWeight="bold"
                                fontSize="16"
                                color="gray.800"
                              >
                                {vet.crmv ? vet.crmv : "Não informado"}
                              </Text>
                            </Box>
                          </Td>
                          <Td borderColor="black">
                            <Text fontWeight="bold" color="gray.800">
                              {vet.speciality ? vet.speciality : "Não definido"}
                            </Text>
                          </Td>

                          <Td borderColor="black">
                            <Link to={`/Users/Edit/${vet.id}`}>
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
                          <Td borderColor="black">
                            <Link to={`/Users/Edit/${vet.id}`}>
                              <Button
                                as="a"
                                size="md"
                                fontSize="md"
                                colorScheme="cyan"
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
    </motion.div>
  );
}
