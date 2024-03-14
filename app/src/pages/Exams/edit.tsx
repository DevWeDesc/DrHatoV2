import { ChakraProvider, Flex } from "@chakra-ui/react";
import { Header } from "../../components/admin/Header";
import { Sidebar } from "../../components/admin/Sidebar";
import { AdminContainer } from "../AdminDashboard/style";
import { EditExams } from "../../components/Exams/editExams";

export function ExamsEdit() {
  return (
    <ChakraProvider>
      <AdminContainer>
        <Flex direction="column" h="100vh">
          <Header title="Exames" url="/Admin/Exams" />
          <Flex
            w="100%"
            my="6"
            direction={{ base: "column", xl: "row" }}
            mx="auto"
            px="6"
          >
            <Sidebar />
            <EditExams />
          </Flex>
        </Flex>
      </AdminContainer>
    </ChakraProvider>
  );
}
