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
import { AiOutlineSearch } from "react-icons/all";
import { AdminContainer } from "../../AdminDashboard/style";
import { Link, useNavigate } from "react-router-dom";
import { UniversalSearch } from "../../../components/Search/universalSearch";
import { DbContext } from "../../../contexts/DbContext";
import { StyledBox } from "../../../components/Header/style";
import { MdPets as Burger } from "react-icons/all";
import { toast } from "react-toastify";
import { LoadingSpinner } from "../../../components/Loading";
import { api } from "../../../lib/axios";
import { Queue } from "phosphor-react";
import { VetsSearch } from "../../../components/Search/vetsSearch";
import { PaymentsSearch } from "../../../components/Search/paymentsSearch";
import { GiCardDiscard } from "react-icons/gi";
import { BsCashCoin, BsReception4 } from "react-icons/bs";
import { BiHome } from "react-icons/all";
import { MdOutlinePayments } from "react-icons/all";
import { RiLockPasswordFill } from "react-icons/all";
import { GiMedicines } from "react-icons/gi";

interface QueueProps {
  response: [];
  totalInQueue: number;
}

export function ToolsTable() {
  let { dataCustomer, dataPet } = useContext(DbContext);
  const [petValue, setPetValue] = useState("");
  const [petTotal, setPetTotal] = useState([]);
  const [inQueue, setInQueue] = useState<QueueProps[]>([]);
  const [totalInQueue, setTotalInQueue] = useState(0 as any);
  const navigate = useNavigate();
  useEffect(() => {
    async function getQueue() {
      const response = await api.get("/pets/queue");
      const total = await api.get("/pets/queue");
      const Pets = await api.get("/pets");
      setTotalInQueue(total.data);
      setInQueue(response.data.response);
      setPetTotal(total.data.response);
    }
    getQueue();
  }, [inQueue.length]);

  const handleNavigateWorkSpace = () => {
    if (!petValue) {
      toast.error("Selecione um PET");
      return;
    }
    navigate(`/Vets/Workspace/${petValue}`);
  };

  const petTot = [
    {
      procedures: "10 - Feira de Adoção",
      sector: "Ambulatório",
      sixKg: "0,00",
      sevenForFiveTeen: "0,00",
      sixteenForTwortFive: "0,00",
      maxTwortFive: "0,00",
    },
    {
      procedures: "3ª Pálp. Eversão da Cartilagem Bi",
      sector: "Oftalmologia",
      sixKg: "1.300,00",
      sevenForFiveTeen: "1.300,00",
      sixteenForTwortFive: "1.300,00",
      maxTwortFive: "1.300,00",
    },
  ];

  let typeTable: ReactNode;
  switch (true) {
    case dataCustomer.length >= 1:
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
                    onClick={() => handleNavigateWorkSpace()}
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
    case dataPet.length >= 1:
      typeTable = (
        <Table colorScheme="blackAlpha">
          <Thead>
            <Tr>
              <Th>Nome</Th>

              <Th>Código</Th>
              <Th>Nascimento</Th>
              <Th>Preferência</Th>
              <Th>Especialidade</Th>
            </Tr>
          </Thead>

          <Tbody>
            {dataPet.map((pet: any) => (
              <Tr key={pet.id}>
                <Td>
                  <Button
                    colorScheme="whatsapp"
                    onClick={() => navigate(`/Vets/Workspace/${pet.id}`)}
                  >
                    {pet.name}
                  </Button>
                </Td>

                <Td>{pet.codPet}</Td>

                <Td>{pet.bornDate}</Td>

                <Td>
                  {pet.vetPreference ? pet.vetPreference : "Sem Preferência"}
                </Td>
                <Td>0</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      );
      break;
    default:
      typeTable = (
        <>
          <Table colorScheme="blackAlpha" w="100%">
            <Thead w="100%">
              <Tr>
                <Th fontSize={15}>Procedimentos</Th>
                <Th fontSize={15}>Setor</Th>
                <Th fontSize={15}>Até 6Kg</Th>
                <Th fontSize={15}>De 7 a 15 Kg</Th>
                <Th fontSize={15}> {"> 35Kg"}</Th>
              </Tr>
            </Thead>

            <Tbody w="100%">
              {petTot.map((pet: any) => (
                <Tr key={pet.procedures} cursor="pointer" fontWeight="bold">
                  <Td>{pet.procedures}</Td>
                  <Td cursor="pointer">{pet.sector}</Td>
                  <Td>{pet.sixKg}</Td>
                  <Td>{pet.sevenForFiveTeen}</Td>
                  <Td>{pet.maxTwortFive}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </>
      );
      break;
  }
  return (
    <ChakraProvider>
      <AdminContainer>
        <Flex direction="column" h="100vh">
          <Header title="Tabela" url="/Recepcao" />
          <Flex w="100%" my="6" maxWidth={1680} mx="auto" px="6">
            <GenericSidebar>
              <GenericLink
                name="Recepção"
                icon={BsReception4}
                path={`/Recepcao/`}
              />
              <GenericLink
                name="Trocar Senha"
                icon={RiLockPasswordFill}
                path={`/Recepcao/Ferramentas/TrocaDeSenha/${1}`}
              />{" "}
              <GenericLink
                name="Autorizações"
                icon={GiCardDiscard}
                path={`/Recepcao/Ferramentas/Autorizacao`}
              />{" "}
              <GenericLink
                name="Medicamentos"
                icon={GiMedicines}
                path={`/Medicines`}
              />{" "}
            </GenericSidebar>
            <Box flex="1" borderRadius={8} bg="gray.200" p="8">
              <Flex mb="8" gap="8" direction="column" align="center">
                <PaymentsSearch path="filtredquery" />
                <Flex gap="3" justify="center">
                  <Button colorScheme="teal">BAIXAR PARA EXCEL</Button>
                  <Button colorScheme="teal" onClick={() => navigate("/Queue")}>
                    <>TOTAL NA FILA: {totalInQueue.totalInQueue}</>
                  </Button>
                </Flex>
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
