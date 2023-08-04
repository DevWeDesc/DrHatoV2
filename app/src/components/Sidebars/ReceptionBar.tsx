import { Box, Stack, Text, Icon, Flex } from "@chakra-ui/react";
import { GrUnorderedList, AiFillHome } from "react-icons/all";
import { Link } from "react-router-dom";
export function ReceptionSidebar() {
  return (
    <Box as="aside" w="64" mr="8">
      <Stack spacing="12" align="flex-start">
        <Box>
          <Text fontWeight="bold" color="gray.700" fontSize="2xl">
            Menu Recepção
          </Text>
          <Stack spacing="4" mt="8" align="stretch">
            <Link to="/Home/">
              <Flex display="flex" align="center" color="green.300">
                <Icon as={AiFillHome} fontSize="38" />
                <Text ml="4" fontWeight="bold" fontSize={22} color="gray.700">
                  HOME
                </Text>
              </Flex>
            </Link>

            <Link to="/Recepcao">
              <Flex display="flex" align="center" color="green.300">
                <Icon as={GrUnorderedList} fontSize="38" />
                <Text ml="4" fontWeight="bold" fontSize={22} color="gray.700">
                  TODAS OPÇÕES
                </Text>
              </Flex>
            </Link>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}
