import { ChakraProvider, Flex } from "@chakra-ui/react";
import React from "react";
import { AdminContainer } from "../AdminDashboard/style";
import { ProtocolsAdmission } from "../../components/Admission/protocols";

export default function AdmissionProtocols() {
  return (
    <ChakraProvider>
      <AdminContainer>
        <Flex direction="column" h="100vh">
          <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6"></Flex>
          <ProtocolsAdmission />
        </Flex>
      </AdminContainer>
    </ChakraProvider>
  );
}
