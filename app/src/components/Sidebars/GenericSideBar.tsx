import { Box, Flex, Stack, Text } from "@chakra-ui/react";
export function GenericSidebar({ children }: any) {
  return (
    <Box as="aside" w={{ base: "", lg: "74" }} mr="8">
      <Stack spacing="12" align="flex-start">
        <Box>
          <Text fontWeight="bold" color="gray.700" fontSize="32">
            GERAL
          </Text>
          <Flex
            direction={{ base: "row", lg: "column" }}
            flexWrap={{ base: "wrap", lg: "nowrap" }}
            justifyContent="space-between"
            gap="4"
            width="100%"
            mt="8"
            mb={{ base: "3", lg: "0" }}
            fontSize="25"
            align="stretch"
          >
            {children}
          </Flex>
        </Box>
      </Stack>
    </Box>
  );
}
