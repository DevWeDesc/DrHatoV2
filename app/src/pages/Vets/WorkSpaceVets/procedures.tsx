import { ChakraProvider, Flex, Button, Text } from "@chakra-ui/react";
import { BiHome } from "react-icons/bi";
import { TbArrowBack } from "react-icons/tb";
import { useNavigate, useParams } from "react-router-dom";
import ProceduresVets from "../../../components/Procedures";

export function ProceduresVet() {
  const { id, queueId } = useParams<{ id: string; queueId: string }>();
  const navigate = useNavigate();
  
  return (
    <ChakraProvider>
      <Flex width="100vw" height="100vh" bgColor="white" direction="column">
        <Flex w="100%" height="10vh" bgColor="gray.200">
          <Flex align="center" gap="2">
            <Text m="2" fontSize="2xl" fontWeight="bold">
              Procedimentos
            </Text>
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
              onClick={() => navigate(`/Vets/Workspace/${id}/${queueId}`)}
            >
              Voltar
            </Button>
          </Flex>
        </Flex>
        <ProceduresVets InAdmission={false} />
      </Flex>
    </ChakraProvider>
  );
}
