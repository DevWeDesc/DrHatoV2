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
  Menu,
  MenuButton,
  MenuList,
  Grid,
  TableContainer,
} from "@chakra-ui/react";
import { Header } from "../../components/admin/Header";
import { GenericLink } from "../../components/Sidebars/GenericLink";
import { GenericSidebar } from "../../components/Sidebars/GenericSideBar";
import { BsArrowLeft } from "react-icons/all";
import { AdminContainer } from "../AdminDashboard/style";
import { AiOutlineCheckCircle } from "react-icons/all";
import { useContext, useEffect, useState } from "react";
import { DbContext } from "../../contexts/DbContext";
import { StyledBox } from "../../components/Header/style";
import { api } from "../../lib/axios";
import { MdPets as Burger } from "react-icons/all";
// import * as pdfMake from "pdfmake/build/pdfmake";
// import * as pdfFonts from "pdfmake/build/vfs_fonts";

import { TDocumentDefinitions } from "pdfmake/interfaces";
import { toast } from "react-toastify";
import { VetsSearch } from "../../components/Search/vetsSearch";
import { useQuery } from "react-query";
import { LoadingSpinner } from "../../components/Loading";
import { ICustomer } from "../../interfaces";

interface IAutorizations {
  id: number;
  name: string;
  text: string;
}

interface ICustomersData {
  totalUsers: number;
  currentPage: number;
  totalPages: number;
  users: ICustomer[];
}

export function GenerateAutorizations() {
  const { autorization, setGenerateAut, dataCustomer } = useContext(DbContext);
  const [value, setValue] = useState("");
  const [petValue, setPetValue] = useState("");
  //const autorizations = autorization ? autorization : null;
  // const [createAut, setCreateAut] = useState({});
  // const [customer, setCustomer] = useState([]);
  const [pageActual, setPageActual] = useState(1);
  const [autorizations, setAutorizations] = useState<IAutorizations[]>([]);

  const { isLoading, data } = useQuery({
    queryKey: ["customersData", pageActual],
    queryFn: async () =>
      await api
        .get<ICustomersData>(`/customers?page=${pageActual}`)
        .then((res) => res.data),
  });

  // async function getCustomers() {
  //   const customer = await api.get("/customers");
  //   setCustomer(customer.data);
  // }
  // useEffect(() => {
  //   getCustomers();
  // }, []);

  async function dataAutorizations() {
    const autorizations = await api.get("/autorizations");
    setAutorizations(autorizations.data);
  }

  useEffect(() => {
    dataAutorizations();
  }, []);

  // //@ts-ignore
  // pdfMake.addVirtualFileSystem(pdfFonts);

  const handleNextPage = () => {
    if (data) pageActual < data.totalPages && setPageActual((prev) => prev + 1);
  };

  const handleBackPage = () => {
    if (pageActual > 1) setPageActual((prev) => prev - 1);
  };

  const handleCreateAut = async () => {
    try {
      const response = await api.get(`/autorizations/${value}`);
      const petDesc = dataCustomer.map((customer: ICustomer) => {
        customer.pets?.find((pet: any) => pet.id == petValue);
      });
      const dataAut = response.data;
      const autorization = {
        name: dataCustomer.name,
        adress: dataCustomer.adress,
        cpf: dataCustomer.cpf,
        autName: dataAut.name,
        autText: dataAut.text,
        petName: petDesc.name,
        petEsp: petDesc.especie,
        petCod: petDesc.codPet,
      };

      // console.log(dataCustomer);

      // setCreateAut(autorization);
      const docDefinition: TDocumentDefinitions = {
        content: [
          `Nome: ${autorization.name}\n Endereço: ${autorization.adress}\n CPF: ${autorization.cpf}\n Nome do pet: ${autorization.petName}\n Especie: ${autorization.petEsp}\n Código Pet: ${autorization.petCod}\n \n  ${autorization.autName}\n ${autorization.autText}\n\n CPF:\n Nome:\n Endereço Completo:\n Data:___________,______de_________de________.\n\n Assinatura do responsável pelo paciente:\n   ______________________________________________________________`,
        ],
        pageMargins: [50, 50],
        pageSize: "A4",
      };
      // pdfMake.createPdf(docDefinition).open();
    } catch (error) {
      console.log("ERRO AUT", error);
      toast.error(
        "Necessário escolher um tipo de autorização e ao menos um PET."
      );
    }
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <ChakraProvider>
      <AdminContainer>
        <Flex direction="column" h="100vh">
          <Header title="Gerar autorizações" url="/Home" />
          <Flex
            w="100%"
            my="6"
            direction={{ base: "column", xl: "row" }}
            mx="auto"
            px="6"
          >
            <GenericSidebar>
              <GenericLink icon={BsArrowLeft} name="Voltar" path="/Home" />
            </GenericSidebar>
            <Box
              flex="1"
              borderRadius={8}
              // bg="gray.200"
              p="8"
              maxH="44rem"
              overflowY="auto"
            >
              <Flex mb="8" gap="8" direction="column" align="center">
                <VetsSearch path="/customersearch" />
                <Grid
                  w="full"
                  gap={2}
                  templateColumns={{
                    base: "repeat(1,1fr)",
                    md: "repeat(3,1fr)",
                  }}
                >
                  <Button onClick={handleBackPage} colorScheme="teal" w="full">
                    Voltar Página
                  </Button>
                  <Button display="flex" gap={1} colorScheme="teal" w="full">
                    <Text fontWeight="bold">
                      Página atual:
                      {data && pageActual < data?.totalPages
                        ? ` ${pageActual}, `
                        : ` ${pageActual}`}
                    </Text>
                    <Text fontSize="sm">
                      {data &&
                        pageActual < data.totalPages &&
                        `${pageActual + 1}, `}
                    </Text>
                    <Text fontSize="sm">
                      {data &&
                        pageActual + 2 <= data.totalPages &&
                        `${pageActual + 2}`}
                    </Text>
                    ...{data?.totalPages}
                  </Button>
                  <Button onClick={handleNextPage} colorScheme="teal" w="full">
                    Próxima página
                  </Button>
                </Grid>

                <Accordion w="full" allowToggle>
                  <AccordionItem>
                    <h2 className="acordionTitle">
                      <AccordionButton
                        w="full"
                        display="flex"
                        justifyContent="center"
                        gap="1rem"
                      >
                        <AiOutlineCheckCircle size={26} />
                        <Box textAlign="left">Autorizações</Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel maxH="20vh" overflowY="auto" pb={4}>
                      {autorizations?.map((item) => {
                        const primaryLetterName = item.name
                          .substring(0, 1)
                          .toUpperCase();
                        const restOfName = item.name
                          .substring(1, item.name.length)
                          .toLowerCase();
                        const itemNameCompleted = `${primaryLetterName}${restOfName}`;

                        return (
                          <>
                            <VStack key={item.id} align="left" w="full">
                              <RadioGroup onChange={setValue} value={value}>
                                <Radio
                                  bgColor={
                                    value == item.id.toString()
                                      ? "green"
                                      : "red"
                                  }
                                  value={item.id.toString()}
                                >
                                  {itemNameCompleted}
                                </Radio>
                              </RadioGroup>
                            </VStack>
                          </>
                        );
                      })}
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>

                <TableContainer w="full">
                  <Table w="full" colorScheme="blackAlpha">
                    <Thead>
                      <Tr>
                        <Th>Nome</Th>
                        <Th>Endereço</Th>
                        <Th>Telefone</Th>
                        <Th>CPF</Th>
                        <Th>E-mail</Th>
                        {/* <Th>Data de Nascimento</Th> */}
                        <Th>Pets</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {data?.users?.map((customer) => (
                        <Tr>
                          <Td fontSize="sm">{customer.name}</Td>
                          <Td fontSize="sm">{customer.adress}</Td>
                          <Td fontSize="sm">
                            {!customer.phone ? "Sem Telefone" : customer.phone}
                          </Td>
                          <Td fontSize="sm">{customer.cpf}</Td>
                          <Td fontSize="sm">
                            {!customer.email ? "Sem E-mail" : customer.email}
                          </Td>
                          {/* <Td fontSize="sm">{customer.birthday}</Td> */}
                          <Td fontSize="sm">
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
                              <MenuList key={customer.id} bg="green.100">
                                {customer?.pets?.map((pets: any) => (
                                  <Flex
                                    key={pets.id}
                                    direction="column"
                                    align="center"
                                    p="2px"
                                    gap="2"
                                  >
                                    <RadioGroup
                                      onChange={setPetValue}
                                      value={petValue}
                                    >
                                      <Radio
                                        bgColor={
                                          petValue == pets.id ? "green" : "red"
                                        }
                                        value={pets.id as any}
                                      >
                                        {pets.name}
                                      </Radio>
                                    </RadioGroup>
                                  </Flex>
                                ))}
                              </MenuList>
                            </Menu>
                          </Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </TableContainer>

                <Button onClick={() => handleCreateAut()} colorScheme="teal">
                  Gerar Autorização
                </Button>
              </Flex>
            </Box>
          </Flex>
        </Flex>
      </AdminContainer>
    </ChakraProvider>
  );
}
