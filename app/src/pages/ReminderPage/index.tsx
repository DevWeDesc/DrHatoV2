import { AdminContainer } from "../AdminDashboard/style";
import { Box, ChakraProvider } from "@chakra-ui/react";
import { Flex } from "@chakra-ui/react";
import { Header } from "../../components/admin/Header";
import { Schedule } from "../../components/Calendar";
import DaysReminder from "../../components/DaysReminder";

export default function ReminderPage() {
  return (
    <ChakraProvider>
      <AdminContainer>
        <Flex direction="column" h="100vh">
          <Header title="Lembrete Veterinário" url="/Home" />
          <Flex w="100%" my="6" maxWidth={1680} mx="auto" pt="10">
            <Box h="80vh" w="30vw" display="flex" mr="10">
              <Schedule />
            </Box>
            <DaysReminder />
          </Flex>
        </Flex>
      </AdminContainer>
    </ChakraProvider>
  );
}
