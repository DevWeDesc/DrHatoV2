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
import { useContext, useEffect, useState } from "react";
import { Header } from "../../components/admin/Header";
import { GenericLink } from "../../components/Sidebars/GenericLink";
import { GenericSidebar } from "../../components/Sidebars/GenericSideBar";
import { AiOutlineSearch } from "react-icons/all";
import { AdminContainer } from "../../pages/AdminDashboard/style";
import { Link, useNavigate } from "react-router-dom";
import { DbContext } from "../../contexts/DbContext";
import { StyledBox } from "../../components/Header/style";
import { MdPets as Burger } from "react-icons/all";
import { toast } from "react-toastify";
import { api } from "../../lib/axios";
import { AdmissionSearch } from "../Search/admissionSearch";
import { SiProtocolsdotio } from "react-icons/all";

interface QueueProps {
  response: [];
  totalInQueue: number;
}

export function SearchAdmission() {
  const [petValue, setPetValue] = useState("");
  const [inQueue, setInQueue] = useState<QueueProps[]>([]);
  const [totalInQueue, setTotalInQueue] = useState(0 as any);
  let { dataCustomer } = useContext(DbContext);
  const navigate = useNavigate();
  const handleNavigateWorkSpace = () => {
    if (!petValue) {
      toast.error("Selecione um PET");
      return;
    }
    navigate(`/Vets/Workspace/${petValue}`);
  };

  console.log(inQueue);

  useEffect(() => {
    async function getQueue() {
      const response = await api.get("/pets/queue");
      const total = await api.get("/pets/queue");
      setTotalInQueue(total.data);
      setInQueue(response.data.response);
    }
    getQueue();
  }, [inQueue.length]);

  return (
    <ChakraProvider>
      <AdminContainer>
        <Flex direction="column" h="100vh">
          <Header title="Painel de Internações" />
          <Flex w="100%" my="6" mx="auto" px="6">
            <GenericSidebar>
              <GenericLink
                name="Pesquisar Cliente"
                icon={AiOutlineSearch}
                path="/Vets/Menu"
              />
              <GenericLink
                name="Protocolos"
                icon={SiProtocolsdotio}
                path="/Admissions/Protocols"
              />
            </GenericSidebar>
            <Box w="100%" borderRadius={8} bg="gray.200" p="8">
              <Flex mb="8" gap="8" direction="column" align="center">
                <AdmissionSearch path="vetsearch" />

                <Flex textAlign="center" justify="center">
                  <Table colorScheme="blackAlpha">
                    <Thead>
                      <Tr>
                        <Th>Proprietario</Th>
                        <Th>Animal</Th>
                        <Th>Espécie</Th>
                        <Th>Raça</Th>
                        <Th>Data</Th>
                        <Th>Código</Th>
                        <Th>Canil</Th>
                        <Th>Leito</Th>
                      </Tr>
                    </Thead>

                    <Tbody>
                      {Object.keys(dataCustomer).length >= 1
                        ? dataCustomer.map((user: any) => (
                            <Tr key={user.id}>
                              <Td>{user.cpf}</Td>

                              <Td>
                                <Button
                                  colorScheme="whatsapp"
                                  onClick={() =>
                                    navigate(`/Admissions/${user.id}`)
                                  }
                                >
                                  {user.name}
                                </Button>
                              </Td>

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
                                  <MenuList bg="green.100">
                                    {user.pets?.map((pets: any) => (
                                      <Flex
                                        direction="column"
                                        align="center"
                                        p="2px"
                                        gap="2"
                                        key={pets.id}
                                      >
                                        <RadioGroup
                                          onChange={setPetValue}
                                          value={petValue}
                                        >
                                          <Radio
                                            bgColor={
                                              petValue == pets.id
                                                ? "green"
                                                : "red"
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
                              <Td>92487</Td>
                              <Td>04/04/2023</Td>

                              <Td>25:53</Td>
                              <Td>
                                {user.vetPreference
                                  ? user.vetPreference
                                  : "Sem Preferência"}
                              </Td>
                              <Td>0</Td>
                            </Tr>
                          ))
                        : inQueue.map((queue: any) => (
                            <Tr
                              key={queue.id}
                              cursor="pointer"
                              onClick={() =>
                                navigate(`/Admissions/${queue.id}`)
                              }
                            >
                              {/*<Td>{queue.customerCpf}</Td>*/}
                              <Td>{queue.customerName}</Td>
                              <Td>{queue.name} </Td>
                              <Td>Empty</Td>
                              <Td>{queue.race}</Td>
                              <Td>{queue.ouor}</Td>
                              <Td>{queue.codPet}</Td>
                              <Td>Empty</Td>
                              <Td>Empty</Td>
                            </Tr>
                          ))}
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
