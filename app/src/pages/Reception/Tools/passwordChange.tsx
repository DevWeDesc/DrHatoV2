import {
  ChakraProvider,
  Flex,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Button,
  Input,
} from "@chakra-ui/react";
import { Header } from "../../../components/admin/Header";
import { GenericLink } from "../../../components/Sidebars/GenericLink";
import { GenericSidebar } from "../../../components/Sidebars/GenericSideBar";
import { AdminContainer } from "../../AdminDashboard/style";
import { motion } from "framer-motion";
import { GiCardDiscard } from "react-icons/gi";
import { BiHome } from "react-icons/all";
import { MdOutlinePayments } from "react-icons/all";
import { Box } from "@chakra-ui/react";

export function ToolsChangePassword() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <ChakraProvider>
        <AdminContainer>
          <Flex direction="column" h="100vh">
            <Header title="Troca de Senha" />
            <Flex w="100%" my="6" maxWidth={1680} mx="auto" px="6">
              <GenericSidebar>
                <GenericLink
                  name="Painel de Pagamentos"
                  icon={MdOutlinePayments}
                  path={`/Recepcao/Caixa/Pagamentos`}
                />{" "}
                <GenericLink
                  name="Painel de Devoluções"
                  icon={GiCardDiscard}
                  path={`/Recepcao/Caixa/Returns`}
                />{" "}
                <GenericLink
                  name="Recepção"
                  icon={BiHome}
                  path={`/Recepcao/`}
                />
                <GenericLink name="Home" icon={BiHome} path={`/Home/`} />
              </GenericSidebar>
              <Flex justify="center" w="100%">
                <Box flex="1" borderRadius={8} bg="gray.200" p="8" maxW="950px">
                  <TableContainer>
                    <Table variant="simple">
                      <Thead>
                        <Tr>
                          <Th
                            colSpan={2}
                            textAlign="center"
                            fontSize="18"
                            py="6"
                            bg="blue.100"
                            fontWeight="bold"
                            color="black"
                          >
                            Troca de Senha
                          </Th>
                        </Tr>
                      </Thead>
                      <Tbody fontWeight="bold">
                        <Tr>
                          <Td pl="5" fontSize="19">
                            Nome Completo
                          </Td>
                          <Td py="0" pr="5">
                            <Input h="12" borderColor="black" bg="white" />
                          </Td>
                        </Tr>
                        <Tr>
                          <Td pl="5" fontSize="19">
                            Login
                          </Td>
                          <Td py="0" pr="5">
                            <Input h="12" borderColor="black" bg="white" />
                          </Td>
                        </Tr>
                        <Tr>
                          <Td py="0" pl="5" fontSize="19">
                            Senha Atual
                          </Td>
                          <Td py="0" pr="5">
                            <Input h="12" borderColor="black" bg="white" />
                          </Td>
                        </Tr>
                        <Tr>
                          <Td pl="5" fontSize="19">
                            Digite a Nova Senha
                          </Td>
                          <Td py="0" pr="5">
                            <Input h="12" borderColor="black" bg="white" />
                          </Td>
                        </Tr>
                        <Tr>
                          <Td pl="5" fontSize="19">
                            Digite a Nova Senha Novamente
                          </Td>
                          <Td py="0" pr="5">
                            <Input h="12" borderColor="black" bg="white" />
                          </Td>
                        </Tr>
                      </Tbody>
                      <Tfoot>
                        <Tr>
                          <Td colSpan={2}>
                            <Button py="8" colorScheme="whatsapp" w="100%">
                              Gravar
                            </Button>
                          </Td>
                        </Tr>
                      </Tfoot>
                    </Table>
                  </TableContainer>
                </Box>
              </Flex>
            </Flex>
          </Flex>
        </AdminContainer>
      </ChakraProvider>
    </motion.div>
  );
}
