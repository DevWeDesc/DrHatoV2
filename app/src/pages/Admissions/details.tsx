import { Flex } from "@chakra-ui/layout";
import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import { SearchAdmission } from "../../components/Admission/admissions";
import { AdminContainer } from "../AdminDashboard/style";
import { Header } from "../../components/admin/Header";
import DetailsAdmissions from "../../components/Admission/AdmissionDetails";
import { motion } from "framer-motion";
export function AdmissionDetails() {
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
            <DetailsAdmissions />
          </Flex>
        </AdminContainer>
      </ChakraProvider>
    </motion.div>
  );
}
