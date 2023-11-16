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
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { RiAddLine, RiPencilLine, RiUserSearchLine } from "react-icons/all";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Header } from "../../components/admin/Header";
import { Sidebar } from "../../components/admin/Sidebar";
import { LoadingSpinner } from "../../components/Loading";
import { DbContext } from "../../contexts/DbContext";
import { api } from "../../lib/axios";
import { AdminContainer } from "../AdminDashboard/style";

type VetsListDTO = {
  name: string;
  crmv: string;
  username: string;
  id: number;
}

export function VetsList() {
  const { vets } = useContext(DbContext);
  const [vetslist, setVetslist] = useState<VetsListDTO[]>([])

  async function getVetList(){
    try { 
      const response =  await api.get("/users/vets")
      setVetslist(response.data.vets)
    } catch (error) {
      toast.error("Falha na busca por veterinários!")
    }
  }

  useEffect(() => {
    getVetList()
  }, [])
  return (
    <ChakraProvider>
      <AdminContainer>
        <Flex direction="column" h="100vh">
          <Header title="Painel Administrativo" url="/Admin/" />

          <Flex w="100%" my="6" maxWidth={1680} mx="auto" px="6">
            <Sidebar />
            <Box
              flex="1"
              borderRadius={8}
              bg="gray.200"
              p="8"
              maxH="44rem"
              overflow="auto"
            >
              <Flex
                mb="8"
                direction="column"
                justify="space-between"
                align="center"
              >
                <Heading width="100%" fontSize="30" fontWeight="bold">
                  Veterinários
                </Heading>

                <Link to="/Vets/Create" style={{ width: "100%" }}>
                  <Button
                    as="a"
                    mt="5"
                    width="100%"
                    py="8"
                    fontSize="20"
                    colorScheme="whatsapp"
                    leftIcon={<Icon as={RiAddLine} />}
                  >
                    Adicionar Veterinário
                  </Button>
                </Link>
              </Flex>

              <Table colorScheme="blackAlpha">
                <Thead>
                  <Tr>
                    <Th borderColor="black" fontSize="18">
                      Veterinário
                    </Th>
                    <Th borderColor="black" fontSize="18">
                      CRMV
                    </Th>
               
                    <Th width="8" borderColor="black" fontSize="18"></Th>
                    <Th width="8" borderColor="black" fontSize="18"></Th>
                  </Tr>
                </Thead>

                <Tbody>
                  {vetslist ? (
                    vetslist.map((vet) => (
                      <Tr key={vet.id}>
                        <Td px="6" borderColor="black">
                          <Text
                            fontWeight="bold"
                            fontSize="16"
                            color="gray.800"
                          >
                            {vet.username}
                          </Text>
                        </Td>
                        <Td borderColor="black">
                          <Box>
                            <Text
                              fontWeight="bold"
                              fontSize="16"
                              color="gray.800"
                            >
                              {vet.crmv ? vet.crmv : "Não informado"}
                            </Text>
                          </Box>
                        </Td>
                   
                        <Td borderColor="black">
                          <Link to={`/Users/Edit/${vet.id}`}>
                            <Button
                              as="a"
                              size="md"
                              fontSize="md"
                              colorScheme="yellow"
                              leftIcon={<Icon as={RiPencilLine} />}
                            >
                              Editar
                            </Button>
                          </Link>
                        </Td>
                        <Td borderColor="black">
                          <Link to={`/Users/Edit/${vet.id}`}>
                            <Button
                              as="a"
                              size="md"
                              fontSize="md"
                              colorScheme="cyan"
                              leftIcon={<Icon as={RiUserSearchLine} />}
                            >
                              Detalhes
                            </Button>
                          </Link>
                        </Td>
                      </Tr>
                    ))
                  ) : (
                    <LoadingSpinner />
                  )}
                </Tbody>
              </Table>
            </Box>
          </Flex>
        </Flex>
      </AdminContainer>
    </ChakraProvider>
  );
}
