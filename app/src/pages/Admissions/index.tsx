import {
  ChakraProvider,
  Flex,
} from "@chakra-ui/react";
import { AdminContainer } from "../AdminDashboard/style";
import { SearchAdmission } from "../../components/Admission/admissions";

export function Admissions() {
  return (
    <ChakraProvider>
      <AdminContainer>
        <Flex direction="column" h="100vh">
          <SearchAdmission />
        </Flex>
      </AdminContainer>
    </ChakraProvider>
  );
}
