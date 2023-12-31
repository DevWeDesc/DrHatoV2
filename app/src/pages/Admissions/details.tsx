import { Flex } from "@chakra-ui/layout";
import { ChakraProvider } from "@chakra-ui/react";;
import { AdminContainer } from "../AdminDashboard/style";
import DetailsAdmissions from "../../components/Admission/AdmissionDetails";

export function AdmissionDetails() {
  return (
    <ChakraProvider>
      <AdminContainer>
        <Flex direction="column" h="100vh">
          <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6"></Flex>
          <DetailsAdmissions />
        </Flex>
      </AdminContainer>
    </ChakraProvider>
  );
}
