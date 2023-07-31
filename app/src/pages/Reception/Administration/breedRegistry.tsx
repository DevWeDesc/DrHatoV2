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
  Input,
  Button,
} from "@chakra-ui/react";
import { ReactNode, useContext, useEffect, useState } from "react";
import { Header } from "../../../components/admin/Header";
import { GenericLink } from "../../../components/Sidebars/GenericLink";
import { GenericSidebar } from "../../../components/Sidebars/GenericSideBar";
import { AdminContainer } from "../../AdminDashboard/style";
import { Link, useNavigate } from "react-router-dom";
import { DbContext } from "../../../contexts/DbContext";
import { StyledBox } from "../../../components/Header/style";
import { FaTools, MdPets as Burger } from "react-icons/all";
import { toast } from "react-toastify";
import { LoadingSpinner } from "../../../components/Loading";
import { api } from "../../../lib/axios";
import { motion } from "framer-motion";
import { PaymentsSearch } from "../../../components/Search/paymentsSearch";
import { GiCardDiscard } from "react-icons/gi";
import { BiHome } from "react-icons/all";
import { MdOutlinePayments } from "react-icons/all";
import { SearchRegisterClinics } from "../../../components/Search/registerClinics";
import { BsFillTrashFill } from "react-icons/all";
import { FaUserFriends } from "react-icons/all";
import { SearchBreedsRegister } from "../../../components/Search/breedsRegister";

interface QueueProps {
  response: [];
  totalInQueue: number;
}

export function BreedRegistry() {
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

  //console.log(totalInQueue);

  const handleNavigateWorkSpace = () => {
    if (!petValue) {
      toast.error("Selecione um PET");
      return;
    }
    navigate(`/Vets/Workspace/${petValue}`);
  };
  //console.log("PET RESPONSE", dataPet);

  const petTot = [
    {
      id: 1,
      breeds: "Afghan Hound",
      species: "Canina",
    },
    {
      id: 2,
      breeds: "Agapolis",
      species: "Ave",
    },
    {
      id: 3,
      breeds: "Agapones",
      species: "Ave",
    },
    {
      id: 4,
      breeds: "Airdale Terrier",
      species: "Canina",
    },
    {
      id: 5,
      breeds: "Akita",
      species: "Canina",
    },
    {
      id: 6,
      breeds: "American Bully",
      species: "Canina",
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
                <Th fontSize={15}>Raça</Th>
                <Th fontSize={15}>Espécie</Th>
                <Th fontSize={15}>Editar Raça</Th>
                <Th fontSize={15}>Excluir Raça</Th>
              </Tr>
            </Thead>

            <Tbody w="100%">
              {petTot.map((pet: any) => (
                <Tr key={pet.procedures} cursor="pointer" fontWeight="bold">
                  <Td>{pet.breeds}</Td>
                  <Td cursor="pointer">{pet.species}</Td>
                  <Td cursor="pointer">
                    {" "}
                    <Button colorScheme="yellow">
                      <Flex align="center" gap="2">
                        <FaTools />
                        Editar Raça
                      </Flex>
                    </Button>
                  </Td>
                  <Td>
                    <Button colorScheme="red">
                      <Flex align="center" gap="2">
                        <BsFillTrashFill />
                        Excluir Raça
                      </Flex>
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </>
      );
      break;
  }
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <ChakraProvider>
        <AdminContainer>
          <Flex direction="column" h="100vh">
            <Header title="Cadastro de Raças" />
            <Flex w="100%" my="6" maxWidth={1680} mx="auto" px="6">
              <GenericSidebar>
                <GenericLink
                  name="Recepção"
                  icon={GiCardDiscard}
                  path={`/Recepcao`}
                />{" "}
                <GenericLink name="Home" icon={BiHome} path={`/Home/`} />
              </GenericSidebar>
              <Box
                flex="1"
                borderRadius={8}
                bg="gray.200"
                p="8"
                maxH="44rem"
                overflow="auto"
              >
                <Flex mb="8" gap="8" direction="column" align="center">
                  <Text
                    w="100%"
                    textAlign="center"
                    py="6"
                    fontSize="20"
                    bg="blue.100"
                    fontWeight="bold"
                  >
                    Raças Cadastradas no Sistema
                  </Text>
                  <Flex w="55%" align="end">
                    <Flex direction="column" w="90%" pl="1">
                      <Text mb="2" fontWeight="bold">
                        Adicionar Nova Raça
                      </Text>
                      <Flex gap="2">
                        <Flex direction="column">
                          <Text mb="2">Espécie</Text>
                          <Input w="100%" bg="white" borderColor="black" />
                        </Flex>
                        <Flex direction="column">
                          <Text mb="2">Raça</Text>
                          <Input w="100%" bg="white" borderColor="black" />
                        </Flex>
                      </Flex>
                    </Flex>
                    <Button ml="2" px="94px" colorScheme="twitter">
                      Gravar
                    </Button>
                  </Flex>
                  <SearchBreedsRegister path="filtredquery" />
                  <Flex
                    textAlign="center"
                    direction="column"
                    justify="center"
                    w="80%"
                  >
                    {typeTable}
                  </Flex>
                </Flex>
              </Box>
              {/* <GenericModal isOpen={isModalOpen} onRequestClose={closeModal}>
                  <FormControl
                    as="form"
                    onSubmit={handleSubmit(handleCreateSector)}
                    display="flex"
                    flexDir="column"
                    alignItems="center"
                  >
                    <Input
                      {...register("name")}
                      name="name"
                      label="Nome da Instrução"
                      mb="4"
                    />
                    <label>Descrição da Instrução</label>
                    <Textarea
                      {...register("description")}
                      name="description"
                      minHeight={300}
                      minWidth={300}
                      borderColor="gray.900"
                    ></Textarea>

                    <Button w="100%" type="submit" colorScheme="green" m="2">
                      Cadastrar
                    </Button>
                  </FormControl>
                </GenericModal> */}
            </Flex>
          </Flex>
        </AdminContainer>
      </ChakraProvider>
    </motion.div>
  );
}
