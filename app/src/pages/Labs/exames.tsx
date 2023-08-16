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
  TbVaccine,
  FaClipboardList,
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
    case Object.keys(dataPet).length >= 1:
      typeTable = (
        <Table colorScheme="blackAlpha">
          <Thead>
            <Tr>
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
            {dataPet.map((pet: any) => (
              <Tr key={pet.id}>
                <Td>
                  <Button
                    colorScheme="whatsapp"
                    onClick={() => navigate(`/Labs/Set/${pet.id}`)}
                  >
                    {pet.petName}
                  </Button>
                </Td>
                <Td>
                  <Text>{pet.name}</Text>
                </Td>
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
    case Object.keys(dataCustomer).length >= 1:
      typeTable = (
        <Table colorScheme="blackAlpha">
          <Thead>
            <Tr>
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
                <Td>{customer.petName}</Td>

                <Td>
                  <Button
                    colorScheme="whatsapp"
                    onClick={() => navigate(`/Labs/Set/${customer.id}`)}
                  >
                    {customer.name}
                  </Button>
                  {/* <Menu>
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
                  </Menu> */}
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
  console.log("Data Pet", dataPet);
  return (
    <ChakraProvider>
      <AdminContainer>
        <Flex direction="column" h="100vh">
          <Header title="Painel Veterinário" url="/Labs" />
          <Flex w="100%" my="6" maxWidth={1680} mx="auto" px="6">
            <GenericSidebar>
              <GenericLink
                name="Pesquisar Cliente"
                icon={AiOutlineSearch}
                path="/Vets/Menu"
              />
              <GenericLink
                name="Internações"
                icon={FaClipboardList}
                path="/Admissions"
              />
              <GenericLink
                name="Vacinas"
                icon={TbVaccine}
                path="/Recepcao/Internacoes/Vacinas"
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
                <VetsSearch path="labsearch" />
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
  );
}
