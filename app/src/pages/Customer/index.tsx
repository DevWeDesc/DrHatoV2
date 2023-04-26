import {
  Text,
  Flex,
  Box,
  SimpleGrid,
  ChakraProvider,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Menu,
  MenuButton,
  MenuList,
  Button,
  HStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { StyledBox } from "../../components/Header/style";
import { ReceptionSidebar } from "../../components/Sidebars/ReceptionBar";
import { MdPets as Burger } from "react-icons/all";

import { api } from "../../lib/axios";

interface CustomerProps {
  name: string;
  adress: string;
  phone: string;
  cpf: number;
  email: string;
  balance: number;
  birthday: string | number;
  pets: [];
}

export function Customer() {
  const { id } = useParams<{ id: string }>();
  const [customer, setCustomer] = useState<CustomerProps>({
    name: "",
    adress: "",
    email: "",
    cpf: 0,
    birthday: "",
    phone: "",
    balance: 0,
    pets: [],
  });


  useEffect(() => {
    async function loadCustomer() {
      const response = await api.get(`/customers/${id}`);
      setCustomer(response.data);
    }
    loadCustomer();
  }, [id]);




  console.log("ATTCUSTOMER", customer);

  return (
    <ChakraProvider>
      <Flex direction="column" h="100vh">
        <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
          <ReceptionSidebar />
          <SimpleGrid
            flex="1"
            gap="4"
            minChildWidth="320px"
            align="flex-start"
            as={Flex}
          >
       
       
            <Box textAlign="center" p="8" bg="gray.100" borderRadius={8}>

              {
                customer.balance <= 0 ? (<Link to={`/Home/Customer/Balance/${id}`}><Text color="red">
                  Saldo total: {new Intl.NumberFormat('pt-Br', {
                     style: 'currency',
                     currency: 'BRL'
                  }).format(customer.balance)}
                </Text></Link>) : (<Link to={`/Home/Customer/Balance/${id}`}><Text color="green">
                Saldo total: {new Intl.NumberFormat('pt-Br', {
                   style: 'currency',
                   currency: 'BRL'
                }).format(customer.balance)}
              </Text> </Link>)
              }
         
              
              <Flex mt="8" justify="center" direction="column">
                <Table colorScheme="blackAlpha">
                  <Thead>
                    <Tr>
                      <Th>Nome</Th>
                      <Th>Endereço</Th>
                      <Th>Telefone</Th>
                      <Th>CPF</Th>
                      <Th>E-mail</Th>
                      <Th>Data de Nascimento</Th>
                      <Th>Pets</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    <Tr>
                      <Td>{customer.name}</Td>
                      <Td>{customer.adress}</Td>
                      <Td>{customer.phone}</Td>
                      <Td>{customer.cpf}</Td>
                      <Td>{customer.email}</Td>
                      <Td>{customer.birthday}</Td>
                      <Td>
                        {" "}
                        <Menu>
                          {" "}
                          <MenuButton
                            border="1px"
                            as={Button}
                            rightIcon={<Burger />}
                          >
                            <StyledBox>
                              <Text>pets</Text>
                            </StyledBox>
                          </MenuButton>
                          <MenuList bg="green.100">
                            {customer.pets.map((pets: any) => (
                              <Flex
                                key={pets.id}
                                direction="column"
                                align="center"
                                p="2px"
                                gap="2"
                              >
                                <Link to={`/Home/Recepcao/Consultas/Clientes/Pets/Details/${pets.id}`}>
                                  <Text>{pets.name}</Text>
                                </Link>
                              </Flex>
                            ))}
                          </MenuList>
                        </Menu>
                      </Td>
                    </Tr>
                  </Tbody>
                </Table>

                <HStack mt="8" align="center">
                  <Link to={`/Home/Recepcao/Consultas/Clientes/Pets/Create/${id}`}>
                    <Button maxWidth={320} colorScheme="whatsapp">
                      Cadastrar pet
                    </Button>
                  </Link>

                  <Button maxWidth={320} colorScheme="red">
                    Deletar pet
                  </Button>
                </HStack>
              </Flex>
            </Box>
          </SimpleGrid>
        </Flex>
      </Flex>
    </ChakraProvider>
  );
}
