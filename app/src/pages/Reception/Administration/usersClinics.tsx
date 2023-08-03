import {
  Box,
  ChakraProvider,
  Flex,
  Table,
  Tr,
  Td,
  Tbody,
  Text,
  Input,
  Button,
  TableContainer,
  TableCaption,
  Th,
  Thead,
} from "@chakra-ui/react";
import { ReactNode, useContext, useEffect, useState } from "react";
import { Header } from "../../../components/admin/Header";
import { GenericLink } from "../../../components/Sidebars/GenericLink";
import { GenericSidebar } from "../../../components/Sidebars/GenericSideBar";
import { AdminContainer } from "../../AdminDashboard/style";
import { Link, useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { GiCardDiscard } from "react-icons/gi";
import { BiHome } from "react-icons/all";
import { MdOutlinePayments } from "react-icons/all";

export function UsersClinics() {
  const { id } = useParams();
  const [petFilt, setPetFilt] = useState([]);
  const [usersClinic, setUsersClinic] = useState([]);

  const petTot = [
    {
      id: 1,
      procedures: "100% PET",
      adress: "Rua Teste",
      Bairro: "São Bernardo do Campo",
      state: "São Paulo",
      city: "São Paulo",
      phone: "(11) 94521-2563",
      users: [
        {
          name: "Jeferson Dorneias Guarnieri",
        },
        {
          name: "Karen C. Bueno",
        },
      ],
    },
    {
      id: 2,
      procedures: "Abrahão Clínica Veterinária",
      adress: "Rua Teste",
      Bairro: "São Bernardo do Campo",
      state: "São Paulo",
      city: "São Paulo",
      phone: "(11) 94521-2563",
      users: [
        {
          name: "Marcos de Souza Abrahão",
        },
      ],
    },
  ];

  useEffect(() => {
    const petFiltered: any = petTot.filter((pet: any) => pet.id == id);
    petFiltered.map((pet: any) => {
      const { users } = pet;
      return users.map((user: any) => {
        return setUsersClinic(users);
      });
    });
    setPetFilt(petFiltered);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <ChakraProvider>
        <AdminContainer>
          <Flex direction="column" h="100vh">
            <Header
              title="Cadastro de Clínicas"
              url="/Recepcao/RegistroClinicas"
            />
            <Flex w="100%" my="6" maxWidth={1680} mx="auto" px="6">
              <GenericSidebar>
                <GenericLink
                  name="Painel de Pagamentos"
                  icon={MdOutlinePayments}
                  path={`/Recepcao/Caixa/Pagamentos`}
                />{" "}
                <GenericLink
                  name="Painel de Devoluções"
                  icon={GiCardDiscard}
                  path={`/Recepcao/Caixa/Returns`}
                />{" "}
                <GenericLink
                  name="Cadastro de Clínicas"
                  icon={GiCardDiscard}
                  path={`/Recepcao/RegistroClinicas`}
                />{" "}
                <GenericLink name="Home" icon={BiHome} path={`/Home/`} />
              </GenericSidebar>
              <Box flex="1" borderRadius={8} bg="gray.200" p="8">
                <Text
                  py="6"
                  bg="blue.100"
                  textAlign="center"
                  fontWeight="bold"
                  fontSize="18"
                >
                  Dados da Clínica
                </Text>
                <TableContainer>
                  <Table variant="simple">
                    {petFilt.map((pet: any) => (
                      <Tbody fontWeight="bold" fontSize="17" key={pet.id}>
                        <Tr border="1px solid black">
                          <Td border="1px solid black" p="0" pl="5">
                            Nome da Clínica
                          </Td>
                          <Td border="1px solid black" p="0">
                            <Input
                              h="14"
                              rounded="0"
                              bg="white"
                              borderColor="black"
                              value={pet.procedures}
                            />
                          </Td>
                          <Td textAlign="end" border="1px solid black">
                            Endereço
                          </Td>
                          <Td border="1px solid black" p="0">
                            <Input
                              h="14"
                              rounded="0"
                              bg="white"
                              borderColor="black"
                              value={pet.adress}
                            />
                          </Td>
                        </Tr>
                        <Tr>
                          <Td border="1px solid black" p="0" pl="5">
                            Bairro
                          </Td>
                          <Td border="1px solid black" p="0">
                            <Input
                              h="14"
                              rounded="0"
                              bg="white"
                              borderColor="black"
                              value={pet.Bairro}
                            />
                          </Td>
                          <Td textAlign="end" border="1px solid black">
                            Cidade
                          </Td>
                          <Td border="1px solid black" p="0">
                            <Input
                              h="14"
                              rounded="0"
                              bg="white"
                              borderColor="black"
                              value={pet.city}
                            />
                          </Td>
                        </Tr>
                        <Tr>
                          <Td border="1px solid black" p="0" pl="5">
                            Estado
                          </Td>
                          <Td border="1px solid black" p="0">
                            <Input
                              h="14"
                              rounded="0"
                              bg="white"
                              borderColor="black"
                              value={pet.state}
                            />
                          </Td>
                          <Td textAlign="end" border="1px solid black">
                            Telefone
                          </Td>
                          <Td border="1px solid black" p="0">
                            <Input
                              h="14"
                              rounded="0"
                              bg="white"
                              borderColor="black"
                              value={pet.phone}
                            />
                          </Td>
                        </Tr>
                      </Tbody>
                    ))}
                  </Table>
                </TableContainer>
                <TableContainer mt="4">
                  <Table variant="striped">
                    <Thead>
                      <Tr>
                        <Th fontSize="16" bg="blue.500" color="white">
                          Veterinários
                        </Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      <>
                        {usersClinic.map((user: any) => (
                          <Tr key={user.name}>
                            {" "}
                            <Td fontWeight="bold">{user.name}</Td>
                          </Tr>
                        ))}
                      </>
                    </Tbody>
                  </Table>
                </TableContainer>
                <Table>
                  <Tr>
                    <Td px="0">
                      <Button colorScheme="whatsapp" py="8" w="100%">
                        Adicionar Novo Veterinário
                      </Button>
                    </Td>
                  </Tr>
                </Table>
              </Box>
            </Flex>
          </Flex>
        </AdminContainer>
      </ChakraProvider>
    </motion.div>
  );
}
