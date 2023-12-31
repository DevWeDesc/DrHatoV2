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

import { GiCardDiscard, GiMedicines } from "react-icons/gi";
import { BiHome, BsReception4, RiLockPasswordFill } from "react-icons/all";
import { MdOutlinePayments } from "react-icons/all";
import { Box } from "@chakra-ui/react";
import { BsTable } from "react-icons/all";

export function ToolsChangePassword() {
  return (
    <ChakraProvider>
      <AdminContainer>
        <Flex direction="column" h="100vh">
          <Header title="Troca de Senha" url="/Recepcao" />
          <Flex w="100%" my="6" maxWidth={1680} mx="auto" px="6">
            <GenericSidebar>
              <GenericLink
                name="Recepção"
                icon={BsReception4}
                path={`/Recepcao/`}
              />
              <GenericLink
                name="Tabela de Preços"
                icon={BsTable}
                path={`/Recepcao/Ferramentas/Tabela`}
              />{" "}
              <GenericLink
                name="Autorizações"
                icon={GiCardDiscard}
                path={`/Recepcao/Caixa/Returns`}
              />{" "}
              <GenericLink
                name="Medicamentos"
                icon={GiMedicines}
                path={`/Medicines`}
              />{" "}
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
  );
}
