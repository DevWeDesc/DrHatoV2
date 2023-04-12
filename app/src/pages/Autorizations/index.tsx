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
  AccordionIcon,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  VStack,
  Text,
  RadioGroup,
  Radio,
  Stack,
  Menu,
  MenuButton,
  MenuList,
} from "@chakra-ui/react";
import { Header } from "../../components/admin/Header";
import { SearchComponent } from "../../components/Search";
import { GenericLink } from "../../components/Sidebars/GenericLink";
import { GenericSidebar } from "../../components/Sidebars/GenericSideBar";
import { BsArrowLeft } from "react-icons/all";
import { AdminContainer } from "../AdminDashboard/style";
import { AiOutlineCheckCircle } from "react-icons/all";
import { useContext, useEffect, useState } from "react";
import { DbContext } from "../../contexts/DbContext";
import { StyledBox } from "../../components/Header/style";
import { useParams, Link } from "react-router-dom";
import { api } from "../../lib/axios";
import { MdPets as Burger } from "react-icons/all";

export function GenerateAutorizations() {
  const { autorization, setGenerateAut } = useContext(DbContext);
  const {data} = useContext(DbContext)
  const [value, setValue] = useState("");
  const autorizations = autorization ? autorization : null;
  const { id } = useParams<{ id: string }>();
  interface CustomerProps {
    name: string;
    adress: string;
    phone: string;
    cpf: number;
    email: string;
    birthday: string | number;
    pets: [];
  }

  const [customer, setCustomer] = useState<CustomerProps>({
    name: "",
    adress: "",
    email: "",
    cpf: 0,
    birthday: "",
    phone: "",
    pets: [],
  });

  console.log(data);
  return (
    <ChakraProvider>
      <AdminContainer>
        <Flex direction="column" h="100vh">
          <Header title="Gerar autorizações" />
          <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
            <GenericSidebar>
              <GenericLink icon={BsArrowLeft} name="Voltar" path="/Home" />
            </GenericSidebar>
            <Box flex="1" borderRadius={8} bg="gray.200" p="8">
              <Flex mb="8" gap="8" direction="column" align="center">
                <SearchComponent  />

                <Accordion defaultIndex={[0]} allowMultiple>
                  <AccordionItem>
                    <h2 className="acordionTitle">
                      <AccordionButton gap="1rem">
                        <AiOutlineCheckCircle size={26} />
                        <Box as="span" flex="1" textAlign="left">
                          Autorização
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                      <div className="submenus">
                        {autorizations?.map((item) => (
                          <>
                            <VStack key={item.id}>
                              <RadioGroup onChange={setValue} value={value}>
                                <Radio
                                  bgColor={value == item.id ? "green" : "red"}
                                  value={item.id as any}
                                >
                                  {item.name}
                                </Radio>
                              </RadioGroup>
                            </VStack>
                          </>
                        ))}
                      </div>
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
                <Flex textAlign="center" justify="center">
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
                        <Td>{data.name}</Td>
                        <Td>{data.adress}</Td>
                        <Td>{data.phone}</Td>
                        <Td>{data.cpf}</Td>
                        <Td>{data.email}</Td>
                        <Td>{data.birthday}</Td>
                        <Td>
                          <Menu>
                            <MenuButton
                              border="1px"
                              as={Button}
                              rightIcon={<Burger />}
                            >
                              <StyledBox>
                                <Text>pets</Text>
                              </StyledBox>
                            </MenuButton>
                            <MenuList key={data.id} bg="green.100">
                              {data.pets?.map((pets: any) => (
                                <Flex
                                  key={pets.id}
                                  direction="column"
                                  align="center"
                                  p="2px"
                                  gap="2"
                                >
                                  <Text>{pets.name}</Text>
                                </Flex>
                              ))}
                            </MenuList>
                          </Menu>
                        </Td>
                      </Tr>
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
