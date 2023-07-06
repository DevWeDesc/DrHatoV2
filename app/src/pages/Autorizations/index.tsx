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
  Radio, Menu,
  MenuButton,
  MenuList
} from "@chakra-ui/react";
import { Header } from "../../components/admin/Header";
import { SearchComponent } from "../../components/Search";
import { GenericLink } from "../../components/Sidebars/GenericLink";
import { GenericSidebar } from "../../components/Sidebars/GenericSideBar";
import { BsArrowLeft } from "react-icons/all";
import { AdminContainer } from "../AdminDashboard/style";
import { AiOutlineCheckCircle } from "react-icons/all";
import { useContext, useState } from "react";
import { DbContext } from "../../contexts/DbContext";
import { StyledBox } from "../../components/Header/style";
import { api } from "../../lib/axios";
import { MdPets as Burger } from "react-icons/all";
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import { TDocumentDefinitions } from "pdfmake/interfaces";
import { toast } from "react-toastify";
import { VetsSearch } from "../../components/Search/vetsSearch";
export function GenerateAutorizations() {
  const { autorization, setGenerateAut, dataCustomer } = useContext(DbContext);
  const [value, setValue] = useState("");
  const [petValue, setPetValue] = useState("");
  const autorizations = autorization ? autorization : null;
  const [createAut, setCreateAut] = useState({});

  
  //@ts-ignore
  pdfMake.addVirtualFileSystem(pdfFonts);

  const handleCreateAut = async () => {

    try {
    const response = await api.get(`/autorizations/${value}`);
    const petDesc = dataCustomer.pets?.find( (pet: any) => pet.id == petValue)
    const dataAut = response.data;
    const autorization = {
      name: dataCustomer.name,
      adress: dataCustomer.adress,
      cpf: dataCustomer.cpf,
      autName: dataAut.name,
      autText: dataAut.text,
      petName: petDesc.name,
      petEsp: petDesc.especie,
      petCod: petDesc.codPet
    };


    setCreateAut(autorization);
    const docDefinition: TDocumentDefinitions = {
      content: [
        `Nome: ${autorization.name}\n Endereço: ${autorization.adress}\n CPF: ${autorization.cpf}\n Nome do pet: ${autorization.petName}\n Especie: ${autorization.petEsp}\n Código Pet: ${autorization.petCod}\n \n  ${autorization.autName}\n ${autorization.autText}\n\n CPF:\n Nome:\n Endereço Completo:\n Data:___________,______de_________de________.\n\n Assinatura do responsável pelo paciente:\n   ______________________________________________________________`,
      ],
      pageMargins: [50, 50],
      pageSize: "A4",
    };
    pdfMake.createPdf(docDefinition).open();
    } catch (error) {
      toast.error('Necessário escolher um tipo de autorização e ao menos um PET.')
    }


  };



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
                <VetsSearch path="filtredquery" />

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
                        <Td>{dataCustomer.name}</Td>
                        <Td>{dataCustomer.adress}</Td>
                        <Td>{dataCustomer.phone}</Td>
                        <Td>{dataCustomer.cpf}</Td>
                        <Td>{dataCustomer.email}</Td>
                        <Td>{dataCustomer.birthday}</Td>
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
                            <MenuList key={dataCustomer.id} bg="green.100">
                              {dataCustomer.pets?.map((pets: any) => (
                                <Flex
                                  key={pets.id}
                                  direction="column"
                                  align="center"
                                  p="2px"
                                  gap="2"
                                >
                              <RadioGroup onChange={setPetValue} value={petValue}>
                                <Radio
                                  bgColor={petValue == pets.id ? "green" : "red"}
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
                    </Tbody>
                  </Table>
                </Flex>

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
