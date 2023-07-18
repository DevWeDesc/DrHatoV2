import { Flex } from "@chakra-ui/layout";
import { ChakraProvider } from "@chakra-ui/provider";
import ExamsAdmisison from "../../components/Admission/exams";
import { AdminContainer } from "../AdminDashboard/style";
import { motion } from "framer-motion";

export function AdmissionExams() {
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
            <ExamsAdmisison />
          </Flex>
        </AdminContainer>
      </ChakraProvider>
    </motion.div>
  );
}
