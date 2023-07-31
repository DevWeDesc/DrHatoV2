import {
  Box,
  Button,
  ChakraProvider,
  Flex,
  Menu,
  MenuButton,
  MenuList,
  Radio,
  RadioGroup,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Text,
} from "@chakra-ui/react";
import { Header } from "../../components/admin/Header";
import { ReactNode, useContext, useEffect, useState } from "react";
import { GenericLink } from "../../components/Sidebars/GenericLink";
import { GenericSidebar } from "../../components/Sidebars/GenericSideBar";
import {
  AiOutlineMenu,
  BsArrowLeft,
  IoIosFlask,
  BsImages,
  AiOutlineSearch,
} from "react-icons/all";
import { AdminContainer } from "../AdminDashboard/style";
import { LabsSearch } from "../../components/Search/labsSearch";
import { DbContext } from "../../contexts/DbContext";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { StyledBox } from "../../components/Header/style";
import { VetsSearch } from "../../components/Search/vetsSearch";
import { api } from "../../lib/axios";
import { MdPets as Burger } from "react-icons/all";
import { motion } from "framer-motion";
import { BiHome } from "react-icons/all";

interface QueueProps {
  response: [];
  totalInQueue: number;
}

export function LabExames() {
  let { dataCustomer, dataPet } = useContext(DbContext);
  const [petValue, setPetValue] = useState("");
  const [labs, setLabs] = useState([]);
  const [procedure, setProcedure] = useState("");
  const [inQueue, setInQueue] = useState<QueueProps[]>([]);
  const [totalInQueue, setTotalInQueue] = useState(0 as any);
  const navigate = useNavigate();
  const [namePet, setNamePet] = useState("");

  useEffect(() => {
    async function getQueue() {
      const response = await api.get("/pets/queue");
      const total = await api.get("/pets/queue");
      const labs = await api.get("/labs");
      // const total = await api.get("/pets/queue");
      setLabs(labs.data);
      setTotalInQueue(total.data);
      setInQueue(response.data.response);
    }
    getQueue();
  }, [inQueue.length]);
  const handleNavigateWorkSpace = () => {
    if (!petValue) {
      toast.error("Selecione um PET");
      return;
    }
    navigate(`/Labs/Set/${procedure}`);
  };
  //console.log(labs.medicine.pet.name);
  // console.log("PET RESPONSE", dataPet);

  /*const petz: any = labs.map((pet: any) => {
    return pet.id === 3 ? console.log(pet) : console.log("erro");
  });*/

  //const DataCust = dataCustomer;

  //console.log(labs);

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
              <Th>Procedimentos</Th>
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
                          <RadioGroup
                            onClick={() => setNamePet(pets.name)}
                            onChange={setPetValue}
                            value={petValue}
                          >
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
                <Td>
                  {" "}
                  <Menu>
                    <MenuButton border="1px" as={Button} rightIcon={<Burger />}>
                      <StyledBox>
                        <Text>Procedimentos</Text>
                      </StyledBox>
                    </MenuButton>
                    <MenuList bg="green.100">
                      {labs.map((pets: any) => (
                        <>
                          {namePet === pets.medicine.pet.name && (
                            <Flex
                              direction="column"
                              align="center"
                              p="2px"
                              gap="2"
                              key={pets.id}
                            >
                              <RadioGroup
                                value={procedure}
                                onChange={setProcedure}
                              >
                                <Radio
                                  bgColor={
                                    procedure == pets.id ? "green" : "red"
                                  }
                                  value={pets.id as any}
                                >
                                  {pets.name}
                                </Radio>
                              </RadioGroup>
                            </Flex>
                          )}
                        </>
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
    case labs.length >= 1:
      typeTable = (
        <>
          <Table colorScheme="blackAlpha">
            <Thead>
              <Tr>
                <Th>Data</Th>
                <Th>Animal</Th>
                <Th>Exame</Th>
                <Th>Veterinário</Th>
                <Th>Status</Th>
                <Th>Responsável</Th>
              </Tr>
            </Thead>

            <Tbody>
              {labs.map((pet: any) => (
                <>
                  {pet.doneExame === false && (
                    <Tr
                      key={pet.id}
                      cursor="pointer"
                      onClick={() => navigate(`/Labs/Set/${pet.id}`)}
                    >
                      <Td>
                        {/*<Button
                      colorScheme="whatsapp"
                      onClick={() => navigate(`/Vets/Workspace/${pet.id}`)}
              >*/}
                        {pet.requesteData}
                        {/*</Button>*/}
                      </Td>

                      <Td>{pet.medicine.pet.name}</Td>

                      <Td>{pet.name}</Td>

                      <Td>
                        {pet.responsibleForExam === null
                          ? "Não Adicionado"
                          : pet.responsibleForExam}
                      </Td>
                      <Td>À Fazer</Td>
                      <Th>Não Adicionado</Th>
                    </Tr>
                  )}
                </>
              ))}
            </Tbody>
          </Table>
        </>
      );

      break;
  }

  console.log("DATA RESPONSE", dataCustomer);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <ChakraProvider>
        <AdminContainer>
          <Flex direction="column" h="100vh">
            <Header title="Painel Veterinário" />
            <Flex w="100%" my="6" maxWidth={1680} mx="auto" px="6">
              <GenericSidebar>
                <GenericLink
                  name="Pesquisar Cliente"
                  icon={AiOutlineSearch}
                  path="/Vets/Menu"
                />
                <GenericLink name="Recepção" icon={BiHome} path="/Recepcao" />
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
                  <VetsSearch path="vetsearch" />
                  <Button
                    colorScheme="teal"
                    onClick={() => navigate("/Queue/Labs")}
                  >
                    <>TOTAL NA FILA: {labs.length}</>
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
    </motion.div>
  );
}
