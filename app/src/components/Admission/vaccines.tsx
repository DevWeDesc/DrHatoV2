import { Box, ChakraProvider, Flex, Text, Button } from "@chakra-ui/react";
import { BiHome } from "react-icons/bi";
import { TbArrowBack } from "react-icons/tb";
import { useNavigate, useParams } from "react-router";
import { AdminContainer } from "../../pages/AdminDashboard/style";
import { WorkSpaceHeader } from "../../pages/Vets/styles";
import { Vaccines } from "../../pages/Vets/WorkSpaceVets/vaccines";

export default function VaccinesAdmission() {
  const navigate = useNavigate();
  const { id, queueId } = useParams<{ id: string; queueId: string }>();

  return (
    <ChakraProvider>
      <AdminContainer>
        <Flex direction="column" h="100vh">
          <WorkSpaceHeader>
            <Flex
              justify="space-between"
              align="center"
              width="100%"
              height="100%"
            >
              <Flex align="center" gap="2" justify="space-between">
                <Flex>
                  <Text m="2" fontSize="2xl" fontWeight="bold">
                    Painel Vacinas de Internação
                  </Text>
                </Flex>
              </Flex>
              <Flex gap="2" m="2">
                <Button
                  colorScheme="teal"
                  leftIcon={<BiHome size={24} />}
                  onClick={() => navigate("/Home")}
                >
                  Home
                </Button>

                <Button
                  colorScheme="yellow"
                  leftIcon={<TbArrowBack size={24} />}
                  onClick={() => navigate(`/Admissions/${id}/${queueId}`)}
                >
                  Voltar
                </Button>
              </Flex>
            </Flex>
          </WorkSpaceHeader>
          <Flex w="100%" mx="auto">
            <Box w="100%" borderRadius={8}>
              <Vaccines InAdmission admissionQueueId={queueId} />
              {/* <VaccinesVets InAdmission={true} admissionQueueId={queueId} /> */}
            </Box>
          </Flex>
        </Flex>
      </AdminContainer>
    </ChakraProvider>
  );
}
