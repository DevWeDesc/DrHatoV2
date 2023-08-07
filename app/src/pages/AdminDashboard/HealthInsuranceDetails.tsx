import { Flex } from "@chakra-ui/layout";
import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import { SearchAdmission } from "../../components/Admission/admissions";
import { AdminContainer } from "../AdminDashboard/style";
import { Header } from "../../components/admin/Header";
import DetailsAdmissions from "../../components/Admission/AdmissionDetails";
import { Sidebar } from "../../components/admin/Sidebar";
import DetailsHealthInsurance from "../../components/administration/HealthInsurance/details";

export function HealthInsuranceDetails() {
  return (
    <ChakraProvider>
      <AdminContainer>
        <Flex direction="column" h="100vh">
          <Header
            title="Detalhes de Plano de Saúde"
            url="/Admin/HealthInsurance"
          ></Header>
          <Flex w="100%" my="6" maxWidth={1680} mx="auto" px="6">
            <Sidebar />
            <DetailsHealthInsurance />
          </Flex>
        </Flex>
      </AdminContainer>
    </ChakraProvider>
  );
}
