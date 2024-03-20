import {
  Text,
  Box,
  Button,
  ChakraProvider,
  Flex,
  Heading,
  Icon,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  FormControl,
  TableContainer,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { RiAddLine, RiPencilLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { Header } from "../../components/admin/Header";
import { Sidebar } from "../../components/admin/Sidebar";
import { LoadingSpinner } from "../../components/Loading";
import { GenericModal } from "../../components/Modal/GenericModal";
import { AdminContainer } from "../AdminDashboard/style";
import { api } from "../../lib/axios";
import { Input } from "../../components/admin/Input";
import { toast } from "react-toastify";

export function AdminCadEspecies() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [especies, setEspecies] = useState([]);
  const [reloadData, setReloadData] = useState<boolean>(false);
  const [especieName, setEspecieName] = useState("");

  const navigate = useNavigate();

  function openModal() {
    setIsModalOpen(true);
  }
  function closeModal() {
    setIsModalOpen(false);
  }

  async function getEspecies() {
    const Surgeries = await api.get("/pets/especie");
    setEspecies(Surgeries.data);
  }

  async function createEspecie() {
    try {
      const data = {
        name: especieName,
      };
      await api.post("/pets/especie", data);

      setReloadData(true);

      toast.success("Especie cadastrada com sucesso!");
    } catch (error) {
      toast.error("Falha ao cadastrar especie!");
      console.log(error);
    }
  }

  useEffect(() => {
    getEspecies();
  }, []);

  useEffect(() => {
    if (reloadData === true) {
      getEspecies();
      setReloadData(false);
    }
  }, [reloadData]);

  return (
    <ChakraProvider>
      <AdminContainer>
        <Flex direction="column" h="100vh">
          <Header title="Painel de Cirurgia" url="/Admin/" />

          <Flex
            w="100%"
            my="6"
            direction={{ base: "column", xl: "row" }}
            mx="auto"
            px="6"
          >
            <Sidebar />
            <Box
              flex="1"
              borderRadius={8}
              py={{ base: "8", lg: 0 }}
              maxH="44rem"
              overflow="auto"
            >
              <Heading
                display="flex"
                flexDirection={{ base: "column", md: "row" }}
                justifyContent="space-between"
                size="lg"
                fontWeight="bold"
                w="100%"
                mb="5"
                gap={{ base: "2", lg: "0" }}
                fontSize={{ base: "xl", lg: "2xl" }}
              >
                Painel de Especies
                <Button
                  fontSize={{ base: "md", lg: "lg" }}
                  py="6"
                  colorScheme="whatsapp"
                  cursor="pointer"
                  leftIcon={<Icon as={RiAddLine} />}
                  onClick={() => openModal()}
                  mb="2"
                >
                  Cadastrar nova Especie
                </Button>
              </Heading>
              <TableContainer w="full">
                <Table w="full" colorScheme="blackAlpha">
                  <Thead>
                    <Tr>
                      <Th>Nome</Th>
                      <Th />
                    </Tr>
                  </Thead>

                  <Tbody>
                    {especies ? (
                      especies.map((esp: any) => (
                        <Tr key={esp.id}>
                          <Td fontSize="sm">{esp.name}</Td>

                          <Td>
                            <Button
                              size="sm"
                              fontSize="sm"
                              colorScheme="yellow"
                              leftIcon={<Icon as={RiPencilLine} />}
                              onClick={() => navigate(`/Admin/Races/${esp.id}`)}
                            >
                              Visualizar especies
                            </Button>
                          </Td>
                        </Tr>
                      ))
                    ) : (
                      <LoadingSpinner />
                    )}
                  </Tbody>
                </Table>
              </TableContainer>
              <GenericModal isOpen={isModalOpen} onRequestClose={closeModal}>
                <FormControl
                  as="form"
                  display="flex"
                  flexDir="column"
                  alignItems="center"
                >
                  <Input
                    onChange={(ev) => setEspecieName(ev.target.value)}
                    name="name"
                    label="Nome da Especie"
                    mb="4"
                  />

                  <Button
                    w="100%"
                    onClick={() => createEspecie()}
                    colorScheme="green"
                    m="2"
                  >
                    Cadastrar
                  </Button>
                </FormControl>
              </GenericModal>
            </Box>
          </Flex>
        </Flex>
      </AdminContainer>
    </ChakraProvider>
  );
}
