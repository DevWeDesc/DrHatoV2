import { Box, Stack, Text } from "@chakra-ui/react"
export function GenericSidebar({children}: any) {
  return (
    <Box as="aside" w="64" mr="8">
      <Stack spacing="12" align="flex-start">
        <Box>
          <Text fontWeight="bold" color="gray.700" fontSize="small" >GERAL</Text>
          <Stack spacing="4" mt="8" align="stretch">
            {children}
          </Stack>
        </Box>
      </Stack>
    </Box>
  )
}