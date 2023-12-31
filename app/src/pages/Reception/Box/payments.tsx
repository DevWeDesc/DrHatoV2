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
  Text,
  RadioGroup,
  Radio,
  Menu,
  MenuButton,
  MenuList,
  Button,
} from "@chakra-ui/react";
import { ReactNode, useContext, useEffect, useState } from "react";
import { Header } from "../../../components/admin/Header";
import { GenericLink } from "../../../components/Sidebars/GenericLink";
import { GenericSidebar } from "../../../components/Sidebars/GenericSideBar";
import { BiCalendarPlus, AiFillEdit } from "react-icons/all";
import { AdminContainer } from "../../AdminDashboard/style";
import { Link, useNavigate } from "react-router-dom";
import { DbContext } from "../../../contexts/DbContext";
import { StyledBox } from "../../../components/Header/style";
import { MdPets as Burger } from "react-icons/all";
import { toast } from "react-toastify";
import { api } from "../../../lib/axios";
import { PaymentsSearch } from "../../../components/Search/paymentsSearch";
import { BsReception4 } from "react-icons/bs";
import { PetDetaisl } from "../../../interfaces";
import { ICustomer } from "../../../interfaces";

interface QueueProps {
  response: [];
  totalInQueue: number;
}

export function BoxPayments() {
  let { dataCustomer, dataPet } = useContext(DbContext);
  const [petValue, setPetValue] = useState("");
  const [petTotal, setPetTotal] = useState([]);
  const [inQueue, setInQueue] = useState<QueueProps[]>([]);
  const [totalInQueue, setTotalInQueue] = useState(0 as any);
  const [totalCustomer, setTotalCustomer] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    async function getQueue() {
      const response = await api.get("/pets/queue");
      const total = await api.get("/pets/queue");
      const Pets = await api.get("/pets");
      const customers = await api.get("/customers");
      setTotalCustomer(customers.data);
      setTotalInQueue(total.data);
      setInQueue(response.data.response);
      setPetTotal(Pets.data);
    }
    getQueue();
  }, [inQueue.length]);

  console.log(petTotal);

  const handleNavigateWorkSpace = () => {
    if (!petValue) {
      toast.error("Selecione um PET");
      return;
    }
    navigate(`/Vets/Workspace/${petValue}`);
  };

  let typeTable: ReactNode;
  switch (true) {
    case Object.keys(dataCustomer).length >= 1:
      typeTable = (
        <Table colorScheme="blackAlpha">
          <Thead>
            <Tr>
              <Th>CPF</Th>
              <Th>Cliente</Th>
              <Th>Animal</Th>
              <Th>Código</Th>
              <Th>Data</Th>
              <Th>Hora</Th>
              <Th>Preferência</Th>
              <Th>Especialidade</Th>
            </Tr>
          </Thead>

          <Tbody>
            {dataCustomer.map((customer: ICustomer) => (
              <Tr key={customer.id}>
                <Td>{customer.cpf}</Td>

                <Td>
                  <Button
                    colorScheme="whatsapp"
                    onClick={() =>
                      navigate(`/Recepcao/Caixa/Pagamentos/${customer.id}`)
                    }
                  >
                    {customer.name}
                  </Button>
                </Td>

                <Td>
                  <Menu>
                    <MenuButton border="1px" as={Button} rightIcon={<Burger />}>
                      <StyledBox>
                        <Text>pets</Text>
                      </StyledBox>
                    </MenuButton>
                    <MenuList bg="green.100">
                      {customer.pets?.map((pets: any) => (
                        <Flex
                          direction="column"
                          align="center"
                          p="2px"
                          gap="2"
                          key={pets.id}
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
                <Td>92487</Td>
                <Td>04/04/2023</Td>

                <Td>25:53</Td>
                <Td>
                  {customer.vetPreference
                    ? customer.vetPreference
                    : "Sem Preferência"}
                </Td>
                <Td>Sem Especialidade</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      );
      break;
    case Object.keys(dataPet).length >= 1:
      typeTable = (
        <Table colorScheme="blackAlpha">
          <Thead>
            <Tr>
              <Th>Cliente</Th>
              <Th>Animal</Th>
              <Th>Código</Th>
              <Th>Data</Th>
              <Th>Hora</Th>
              <Th>Preferência</Th>
              <Th>Especialidade</Th>
            </Tr>
          </Thead>

          <Tbody>
            {dataPet.map((pet: PetDetaisl) => (
              <Tr key={pet.id}>
                <Td>{pet.customer.name}</Td>

                <Td>
                  <Button
                    colorScheme="whatsapp"
                    onClick={() =>
                      navigate(`/Recepcao/Caixa/Pagamentos/${pet.customer_id}`)
                    }
                  >
                    {pet.name}
                  </Button>
                </Td>

                <Td>{pet.codPet.substring(0, 8).concat("...")}</Td>
                <Td>92487</Td>
                <Td>04/04/2023</Td>

                <Td>25:53</Td>
                <Td>
                  {pet.vetPreference ? pet.vetPreference : "Sem Preferência"}
                </Td>
                <Td>Sem Especialidade</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      );
      break;
    case totalCustomer.length >= 1:
      typeTable = (
        <Table colorScheme="blackAlpha">
          <Thead>
            <Tr>
              <Th>CPF</Th>
              <Th>Cliente</Th>

              <Th>Código</Th>
              <Th>Data</Th>
              <Th>Hora</Th>
              <Th>Preferência</Th>
              <Th>Especialidade</Th>
            </Tr>
          </Thead>

          <Tbody>
            {totalCustomer.map((customer: ICustomer) => (
              <Tr key={customer.id}>
                <Td>{customer.cpf}</Td>

                <Td>
                  <Button
                    colorScheme="whatsapp"
                    onClick={() =>
                      navigate(`/Recepcao/Caixa/Pagamentos/${customer.id}`)
                    }
                  >
                    {customer.name}
                  </Button>
                </Td>

                {/* <Td>
                  <Menu>
                    <MenuButton border="1px" as={Button} rightIcon={<Burger />}>
                      <StyledBox>
                        <Text>pets</Text>
                      </StyledBox>
                    </MenuButton>
                    <MenuList bg="green.100">
                      {customer.pets?.map((pets: any) => (
                        <Flex
                          direction="column"
                          align="center"
                          p="2px"
                          gap="2"
                          key={pets.id}
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
                </Td> */}
                <Td>92487</Td>
                <Td>04/04/2023</Td>

                <Td>25:53</Td>
                <Td>
                  {customer.vetPreference
                    ? customer.vetPreference
                    : "Sem Preferência"}
                </Td>
                <Td>Sem Especialidade</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      );
      break;
    case petTotal.length >= 1:
      typeTable = (
        <Table colorScheme="blackAlpha">
          <Thead>
            <Tr>
              <Th>Cliente </Th>
              <Th>Nome</Th>
              <Th>Código</Th>
              <Th>Nascimento</Th>
              <Th>Preferência</Th>
              <Th>Especialidade</Th>
            </Tr>
          </Thead>

          <Tbody>
            {petTotal.map((pet: PetDetaisl) => (
              <Tr
                key={pet.id}
                cursor="pointer"
                onClick={() => navigate(`/Recepcao/Caixa/Pagamentos/${pet.id}`)}
              >
                <Td>{pet.customer.name}</Td>
                <Td>{pet.name}</Td>

                <Td>{pet.codPet.substring(0, 8).concat("...")}</Td>

                <Td>{pet.bornDate}</Td>

                <Td>
                  {pet.vetPreference ? pet.vetPreference : "Sem Preferência"}
                </Td>
                <Td>Sem Especialidade</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      );
      break;

    default:
    case totalCustomer.length >= 1:
      typeTable = (
        <Table colorScheme="blackAlpha">
          <Thead>
            <Tr>
              <Th>CPF</Th>
              <Th>Cliente</Th>

              <Th>Código</Th>
              <Th>Data</Th>
              <Th>Hora</Th>
              <Th>Preferência</Th>
              <Th>Especialidade</Th>
            </Tr>
          </Thead>

          <Tbody>
            {totalCustomer.map((customer: ICustomer) => (
              <Tr key={customer.id}>
                <Td>{customer.cpf}</Td>

                <Td>
                  <Button
                    colorScheme="whatsapp"
                    onClick={() =>
                      navigate(`/Recepcao/Caixa/Pagamentos/${customer.id}`)
                    }
                  >
                    {customer.name}
                  </Button>
                </Td>

                {/* <Td>
                    <Menu>
                      <MenuButton border="1px" as={Button} rightIcon={<Burger />}>
                        <StyledBox>
                          <Text>pets</Text>
                        </StyledBox>
                      </MenuButton>
                      <MenuList bg="green.100">
                        {customer.pets?.map((pets: any) => (
                          <Flex
                            direction="column"
                            align="center"
                            p="2px"
                            gap="2"
                            key={pets.id}
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
                  </Td> */}
                <Td>92487</Td>
                <Td>04/04/2023</Td>

                <Td>25:53</Td>
                <Td>
                  {customer.vetPreference
                    ? customer.vetPreference
                    : "Sem Preferência"}
                </Td>
                <Td>Sem Especialidade</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      );
      break;
  }
  return (
    <ChakraProvider>
      <AdminContainer>
        <Flex direction="column" h="100vh">
          <Header title="Painel de Pagamentos" url="/Recepcao" />
          <Flex w="100%" my="6" maxWidth={1680} mx="auto" px="6">
            <GenericSidebar>
              <GenericLink
                name="Recepção"
                icon={BsReception4}
                path={`/Recepcao/`}
              />
              <GenericLink
                name="Caixa"
                icon={BiCalendarPlus}
                path={`/Recepcao/Caixa`}
              />
              <GenericLink
                name="Devoluções"
                icon={AiFillEdit}
                path={`/Recepcao/Caixa/Returns`}
              />
            </GenericSidebar>
            <Box flex="1" borderRadius={8} bg="gray.200" p="8">
              <Flex mb="8" gap="8" direction="column" align="center">
                <PaymentsSearch path="filtredquery" />
                <Button colorScheme="teal" onClick={() => navigate("/Queue")}>
                  <>TOTAL NA FILA: {totalCustomer.length}</>
                </Button>
                <Flex textAlign="center" justify="center" w="80%">
                  {typeTable}
                </Flex>
              </Flex>
            </Box>
          </Flex>
        </Flex>
      </AdminContainer>
    </ChakraProvider>
  );
}
