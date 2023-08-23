import { AdminContainer } from "../AdminDashboard/style";
import { Box, Button, ChakraProvider, Input, Text } from "@chakra-ui/react";
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
            <Box shadow="lg" h="80vh" w="25vw" pt="10">
              <Box display="flex" flexDirection="column" mr="10" gap="4" p="10">
                {/* <Schedule /> */}
                <Text textAlign="center" fontSize="18" fontWeight="bold">
                  Cadastre aqui seu Lembrete!
                </Text>
                <Box>
                  <Text>Título do lembrete</Text>
                  <Input />
                </Box>
                <Box>
                  <Text>Data do Lembrete</Text>
                  <Input type="date" />
                </Box>
                <Box>
                  <Text>Conteúdo do lembrete</Text>
                  <Input />
                </Box>
                <Button colorScheme="whatsapp">Cadastrar Lembrete</Button>
              </Box>
            </Box>
            <DaysReminder />
          </Flex>
        </Flex>
      </AdminContainer>
    </ChakraProvider>
  );
}
