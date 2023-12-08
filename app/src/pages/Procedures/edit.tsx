import { Box, Button, ChakraProvider, Flex, Heading } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { Header } from "../../components/admin/Header";
import { Sidebar } from "../../components/admin/Sidebar";
import { CreateProcedureForm } from "../../components/Forms/CreateProcedureForm";
import { AdminContainer } from "../AdminDashboard/style";

export function ProcedureEdit() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  return (
    <ChakraProvider>
      <AdminContainer>
        <Flex direction="column" h="100vh">
          <Header title="Procedimentos" url="/Admin/Procedures" />

          <Flex w="100%" my="6" maxWidth={1680} mx="auto" px="6">
            <Sidebar />
            <Box flex="1" borderRadius={8} bg="gray.200" p="8">
              <Flex mb="8" align="center" direction="column">
                <Flex direction="row" justify="space-between" w="100%">
                  <Heading size="lg" fontWeight="normal">
                    Edição procedimento
                  </Heading>
                  <Button
                    onClick={() => navigate("/Admin/Procedures")}
                    colorScheme="yellow"
                  >
                    Voltar Procedimentos
                  </Button>
                </Flex>

                <CreateProcedureForm procedureId={id} isEditable={true} />
              </Flex>
            </Box>
          </Flex>
        </Flex>
      </AdminContainer>
    </ChakraProvider>
  );
}
