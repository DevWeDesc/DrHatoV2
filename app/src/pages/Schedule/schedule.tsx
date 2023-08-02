import { Box, ChakraProvider, Flex, Button, Text } from "@chakra-ui/react";
import { useState } from "react";

import { Header } from "../../components/admin/Header";
import { Input } from "../../components/admin/Input";
import { Sidebar } from "../../components/admin/Sidebar";
import { Schedule } from "../../components/Calendar";
import { CreateScheduleVetForm } from "../../components/Forms/CreateScheduleVet";
import { GenericModal } from "../../components/Modal/GenericModal";
import { AdminContainer } from "../AdminDashboard/style";
import { motion } from "framer-motion";

export function Schedules() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  function openModal() {
    setIsModalOpen(true);
  }
  function closeModal() {
    setIsModalOpen(false);
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <ChakraProvider>
        <AdminContainer>
          <Flex direction="column" h="100vh">
            <Header title="Agendamento" url="/Admin/" />

            <Flex w="100%" my="6" maxWidth={1680} mx="auto" px="6">
              <Sidebar />
              <Box flex="1" borderRadius={8} bg="gray.200" p="8">
                <Flex mb="8" justify="space-between" align="center">
                  <Schedule />
                  <Button
                    minWidth={200}
                    onClick={() => openModal()}
                    colorScheme="whatsapp"
                  >
                    Agendar Plantão
                  </Button>
                  <GenericModal
                    isOpen={isModalOpen}
                    onRequestClose={closeModal}
                  >
                    <Text color="black">Marcar Plantão</Text>
                    <Text>
                      Dias Selecionados.
                      {}
                    </Text>

                    <CreateScheduleVetForm />
                  </GenericModal>
                </Flex>
              </Box>
            </Flex>
          </Flex>
        </AdminContainer>
      </ChakraProvider>
    </motion.div>
  );
}
