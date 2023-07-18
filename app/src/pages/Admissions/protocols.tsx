import { ChakraProvider, Flex } from "@chakra-ui/react";
import React from "react";
import { AdminContainer } from "../AdminDashboard/style";
import { ProtocolsAdmission } from "../../components/Admission/protocols";
import { motion } from "framer-motion";

export default function AdmissionProtocols() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <ChakraProvider>
        <AdminContainer>
          <Flex direction="column" h="100vh">
            <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6"></Flex>
            <ProtocolsAdmission />
          </Flex>
        </AdminContainer>
      </ChakraProvider>
    </motion.div>
  );
}
