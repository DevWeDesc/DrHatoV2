import { Box, Button, ChakraProvider, Flex, Heading } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { Header } from "../../components/admin/Header";
import { Sidebar } from "../../components/admin/Sidebar";
import { CreateProcedureForm } from "../../components/Forms/CreateProcedureForm";
import { AdminContainer } from "../AdminDashboard/style";

export function ProcedureCreate() {
  const navigate = useNavigate();
  return (
    <ChakraProvider>
      <AdminContainer>
        <Flex direction="column" h="100vh">
          <Header title="Procedimentos" url="/Admin/Procedures/" />

          <Flex w="100%" my="6" maxWidth={1680} mx="auto" px="6">
            <Sidebar />
            <Box flex="1" borderRadius={8} bg="gray.200" p="8">
              <Flex align="center" direction="column">
                <Flex direction="row" justify="space-between" w="100%">
                  <Heading size="lg" fontWeight="bold">
                    Cadastro de Procedimentos
                  </Heading>
                  <Button
                    onClick={() => navigate("/Admin/Procedures")}
                    colorScheme="yellow"
                  >
                    Voltar Procedimentos
                  </Button>
                </Flex>

                <CreateProcedureForm />
              </Flex>
            </Box>
          </Flex>
        </Flex>
      </AdminContainer>
    </ChakraProvider>
  );
}
