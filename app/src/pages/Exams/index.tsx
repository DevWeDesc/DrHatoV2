import { ChakraProvider, Flex } from "@chakra-ui/react";
import { Header } from "../../components/admin/Header";
import { Sidebar } from "../../components/admin/Sidebar";
import { AdminContainer } from "../AdminDashboard/style";
import { ListExams } from "../../components/administration/Exams";

export function ExamesList() {
  return (
    <ChakraProvider>
      <AdminContainer>
        <Flex direction="column" h="100vh">
          <Header title="Exames" url="/Admin/" />
          <Flex w="100%" my="6" maxWidth={1680} mx="auto" px="6">
            <Sidebar />
            <ListExams></ListExams>
          </Flex>
        </Flex>
      </AdminContainer>
    </ChakraProvider>
  );
}
