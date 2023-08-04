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
  TableContainer,
  Tfoot,
  TableCaption,
  Input,
  Select,
} from "@chakra-ui/react";
import { Header } from "../../components/admin/Header";
import { AdminContainer } from "../AdminDashboard/style";
import { motion } from "framer-motion";
import { GenericSidebar } from "../../components/Sidebars/GenericSideBar";
import { GenericLink } from "../../components/Sidebars/GenericLink";
import { BsCashCoin } from "react-icons/bs";
import {
  AiOutlineSearch,
  BiHome,
  FaClipboardList,
  TbVaccine,
} from "react-icons/all";
import { useState } from "react";

export function ReceptionVaccines() {
  const vaccines = [];
  const [programation, setProgramation] = useState(0);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <ChakraProvider>
        <AdminContainer>
          <Flex direction="column" h="100vh">
            <Header title="Painel de Vacinas" url="/Recepcao" />
            <Flex w="100%" my="6" maxWidth={1680} mx="auto" px="6">
              <GenericSidebar>
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
              <Box flex="1" borderRadius={8} bg="gray.200" p="8">
                <TableContainer>
                  {programation != 0 && (
                    <Table variant="simple">
                      <Thead>
                        <Tr>
                          <Th
                            py="6"
                            colSpan={8}
                            fontSize="18"
                            color="black"
                            textAlign="center"
                            bg="blue.100"
                            borderBottom="1px solid black"
                          >
                            Criar Uma nova programação de ligações pré gravada
                            em seu nome
                          </Th>
                        </Tr>
                        <Tr fontWeight="bold" fontSize="18" bg="gray.300">
                          <Td border="1px solid black">Selecionar Vacinas</Td>
                          <Td border="1px solid black">Cidade</Td>
                          <Td border="1px solid black">Bairro</Td>
                          <Td border="1px solid black">Estado</Td>
                          <Td border="1px solid black">Espécie</Td>
                          <Td border="1px solid black">Raça</Td>
                          <Td border="1px solid black">Idade Mínima</Td>
                          <Td border="1px solid black">Idade Máxima</Td>
                        </Tr>
                      </Thead>
                      <Tbody bg="white">
                        <Tr>
                          <Td border="1px solid black"></Td>
                          <Td border="1px solid black"></Td>
                          <Td border="1px solid black"></Td>
                          <Td border="1px solid black"></Td>
                          <Td border="1px solid black"></Td>
                          <Td border="1px solid black"></Td>
                          <Td border="1px solid black"></Td>
                          <Td border="1px solid black"></Td>
                        </Tr>
                      </Tbody>
                    </Table>
                  )}
                  <Table variant="simple">
                    <Thead>
                      <Tr>
                        <Th
                          py="6"
                          colSpan={3}
                          fontSize="18"
                          color="black"
                          textAlign="center"
                          bg="blue.100"
                          borderBottom="1px solid black"
                        >
                          Criar Uma nova programação de ligações pré gravada em
                          seu nome
                        </Th>
                      </Tr>
                    </Thead>
                    <Tbody fontWeight="bold" fontSize="18">
                      <Tr>
                        <Td p="0" pl="5" w="300px" border="1px solid black">
                          Selecionar Vacinas
                        </Td>
                        <Td p="0">
                          <Select
                            h="12"
                            rounded="0"
                            bg="white"
                            borderColor="black"
                          >
                            <option value="">Selecione uma vacina</option>
                          </Select>
                        </Td>
                      </Tr>
                      <Tr>
                        <Td p="0" pl="5" border="1px solid black">
                          Cidade
                        </Td>
                        <Td p="0">
                          <Input
                            rounded="0"
                            h="12"
                            bg="white"
                            borderColor="black"
                          />
                        </Td>
                      </Tr>
                      <Tr>
                        <Td p="0" pl="5" border="1px solid black">
                          Bairro
                        </Td>
                        <Td p="0">
                          <Input
                            rounded="0"
                            h="12"
                            bg="white"
                            borderColor="black"
                          />
                        </Td>
                      </Tr>

                      <Tr>
                        <Td p="0" pl="5" border="1px solid black">
                          Estado
                        </Td>
                        <Td p="0">
                          <Input
                            rounded="0"
                            h="12"
                            bg="white"
                            borderColor="black"
                          />
                        </Td>
                      </Tr>
                      <Tr>
                        <Td p="0" pl="5" border="1px solid black">
                          Espécie
                        </Td>
                        <Td p="0">
                          <Input
                            rounded="0"
                            h="12"
                            bg="white"
                            borderColor="black"
                          />
                        </Td>
                      </Tr>
                      <Tr>
                        <Td p="0" pl="5" border="1px solid black">
                          Raça
                        </Td>
                        <Td p="0">
                          <Input
                            rounded="0"
                            h="12"
                            bg="white"
                            borderColor="black"
                          />
                        </Td>
                      </Tr>
                      <Tr>
                        <Td p="0" pl="5" border="1px solid black">
                          Idade Mínima
                        </Td>
                        <Td p="0">
                          <Input
                            rounded="0"
                            h="12"
                            bg="white"
                            borderColor="black"
                          />
                        </Td>
                      </Tr>
                      <Tr>
                        <Td p="0" pl="5" border="1px solid black">
                          Idade Máxima
                        </Td>
                        <Td p="0">
                          <Input
                            rounded="0"
                            h="12"
                            bg="white"
                            borderColor="black"
                          />
                        </Td>
                      </Tr>
                      <Tr>
                        <Td colSpan={2} px="0">
                          <Button
                            colorScheme="whatsapp"
                            py="8"
                            w="100%"
                            onClick={() => setProgramation(programation + 1)}
                          >
                            Gravar
                          </Button>
                        </Td>
                      </Tr>
                    </Tbody>
                  </Table>
                </TableContainer>
              </Box>
            </Flex>
          </Flex>
        </AdminContainer>
      </ChakraProvider>
    </motion.div>
  );
}
