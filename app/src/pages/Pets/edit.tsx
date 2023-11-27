import {
  Flex,
  Box,
  SimpleGrid,
  ChakraProvider,
  Button,
  Text,
} from "@chakra-ui/react";

import { BiHome, BiLeftArrowAlt, MdPets, TbArrowBack } from "react-icons/all";
import { useNavigate, useParams } from "react-router-dom";
import { EditPetsForm } from "../../components/Forms/EditPetsForm";
import { GenericLink } from "../../components/Sidebars/GenericLink";
import { GenericSidebar } from "../../components/Sidebars/GenericSideBar";

export function EditPets() {
  const { id , queueId} = useParams<{ id: string; queueId: string; }>();
  const navigate = useNavigate();
  return (
    <ChakraProvider>
      <Flex direction="column" h="100vh">
        <Flex
          align="center"
          gap="2"
          px="8"
          h="6rem"
          justifyContent="space-between"
        >
          <Text m="2" fontSize="3xl" fontWeight="bold">
            WorkSpace Veterinário
          </Text>
          <Flex gap="2">
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
              onClick={() => navigate("/Vets/Menu")}
            >
              Voltar
            </Button>
          </Flex>
        </Flex>
        <Flex w="100%" maxWidth={1680} mx="auto" px="6">
          <GenericSidebar>
            <GenericLink
              name="Voltar"
              path={`/Vets/Workspace/${id}/${queueId}`}
              icon={BiLeftArrowAlt}
            />
          </GenericSidebar>
          <SimpleGrid
            flex="1"
            gap="4"
            minChildWidth="320px"
            align="flex-start"
            as={Flex}
          >
            <Box textAlign="center" p="8" bg="gray.100" borderRadius={8}>
              <Flex justify="center" direction="column">
                <EditPetsForm />
              </Flex>
            </Box>
          </SimpleGrid>
        </Flex>
      </Flex>
    </ChakraProvider>
  );
}
