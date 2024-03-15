import {
  Box,
  Button,
  ChakraProvider,
  Flex,
  Heading,
  Text,
} from "@chakra-ui/react";
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
          <Flex
            w="100%"
            my="6"
            direction={{ base: "column", xl: "row" }}
            mx="auto"
            px="6"
          >
            <Sidebar />
            <Flex
              py={{ base: 10, xl: 0 }}
              direction="column"
              gap="4"
              w="full"
              maxH="48rem"
            >
              <Box borderRadius={8} overflow="auto">
                <Flex
                  w="100%"
                  direction={"column"}
                  justify="center"
                  align="center"
                  gap={2}
                >
                  <Heading
                    fontWeight="bold"
                    pl="2"
                    w="100%"
                    mb="5"
                    display="flex"
                    flexDirection={{ base: "column", md: "row" }}
                    gap={{ base: 3, md: 0 }}
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Text fontSize={{ base: "xl", lg: "2xl" }}>
                      {" "}
                      Cadastro de procedimento
                    </Text>
                    <Button
                      size={{ base: "sm", lg: "md" }}
                      onClick={() => navigate("/Admin/Procedures")}
                      colorScheme="yellow"
                    >
                      Voltar Procedimentos
                    </Button>
                  </Heading>
                </Flex>

                <CreateProcedureForm />
              </Box>
            </Flex>
          </Flex>
        </Flex>
      </AdminContainer>
    </ChakraProvider>
  );
}
