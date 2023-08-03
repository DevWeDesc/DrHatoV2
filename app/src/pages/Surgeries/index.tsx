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
import { Header } from "../../components/admin/Header";
import { GenericLink } from "../../components/Sidebars/GenericLink";
import { GenericSidebar } from "../../components/Sidebars/GenericSideBar";
import { AiOutlineSearch } from "react-icons/all";
import { AdminContainer } from "../AdminDashboard/style";
import { Link, useNavigate } from "react-router-dom";
import { UniversalSearch } from "../../components/Search/universalSearch";
import { DbContext } from "../../contexts/DbContext";
import { StyledBox } from "../../components/Header/style";
import { MdPets as Burger } from "react-icons/all";
import { toast } from "react-toastify";
import { LoadingSpinner } from "../../components/Loading";
import { api } from "../../lib/axios";
import { Queue } from "phosphor-react";
import { VetsSearch } from "../../components/Search/vetsSearch";

interface QueueProps {
  response: [];
  totalInQueue: number;
}

export default function Surgeries() {
  let { dataCustomer, dataPet } = useContext(DbContext);
  const [petValue, setPetValue] = useState("");
  const [inQueue, setInQueue] = useState<QueueProps[]>([]);
  const [totalInQueue, setTotalInQueue] = useState(0 as any);
  const navigate = useNavigate();
  useEffect(() => {
    async function getQueue() {
      const response = await api.get("/pets/queue");
      const total = await api.get("/pets/queue");
      setTotalInQueue(total.data);
      setInQueue(response.data.response);
    }
    getQueue();
  }, [inQueue.length]);
  const handleNavigateSurgeries = () => {
    if (!petValue) {
      toast.error("Selecione um PET");
      return;
    }
    navigate(`/Surgeries/${petValue}`);
  };
  console.log(inQueue);
  //console.log("PET RESPONSE", dataPet);

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
            {dataCustomer.map((customer: any) => (
              <Tr key={customer.id}>
                <Td>{customer.cpf}</Td>

                <Td>
                  <Button
                    colorScheme="whatsapp"
                    onClick={() => handleNavigateSurgeries()}
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
                <Td>0</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      );
      break;
    case Object.keys(inQueue).length >= 1:
      typeTable = (
        <>
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
              {inQueue.map((pet: any) => (
                <Tr
                  key={pet.id}
                  cursor="pointer"
                  onClick={() => navigate(`/Surgeries/${pet.id}`)}
                >
                  <Td>{pet.customerCpf}</Td>

                  <Td>
                    <Text>{pet.customerName}</Text>
                  </Td>

                  <Td>{pet.name}</Td>
                  <Td>{pet.codPet}</Td>
                  <Td>{pet.queueEntry}</Td>

                  <Td>{pet.ouor}</Td>
                  <Td>
                    {pet.vetPreference ? pet.vetPreference : "Sem Preferência"}
                  </Td>
                  <Td>Não selecionado</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </>
      );

      break;
  }

  console.log("DATA RESPONSE", dataCustomer);
  return (
    <ChakraProvider>
      <AdminContainer>
        <Flex direction="column" h="100vh">
          <Header title="Painel de Cirurgias" url="/Home" />
          <Flex w="100%" my="6" maxWidth={1680} mx="auto" px="6">
            <GenericSidebar>
              <GenericLink
                name="Pesquisar Cliente"
                icon={AiOutlineSearch}
                path="/Vets/Menu"
              />
            </GenericSidebar>
            <Box flex="1" borderRadius={8} bg="gray.200" p="8">
              <Flex mb="8" gap="8" direction="column" align="center">
                <VetsSearch path="vetsearch" />
                <Button colorScheme="teal" onClick={() => navigate("/Queue")}>
                  <>TOTAL NA FILA: {totalInQueue.totalInQueue}</>
                </Button>
                <Flex textAlign="center" justify="center">
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
