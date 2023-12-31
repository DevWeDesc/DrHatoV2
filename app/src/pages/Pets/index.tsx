import {  Flex, Box, SimpleGrid, ChakraProvider,   HStack
  } from '@chakra-ui/react'

  import { ReceptionSidebar } from '../../components/Sidebars/ReceptionBar'
  export function Pets() {
    return (
      <ChakraProvider>
        <Flex direction="column" h="100vh">
          <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
            <ReceptionSidebar />
            <SimpleGrid
              flex="1"
              gap="4"
              minChildWidth="320px"
              align="flex-start"
              as={Flex}
            >
                    <Box  textAlign="center" p="8" bg="gray.100" borderRadius={8}>
              
                    <Flex mt="8" justify="center" direction="column">
                   <HStack mt="8" align="center"  >
                   </HStack>
                </Flex>
              </Box>
            </SimpleGrid>
          </Flex>
        </Flex>
      </ChakraProvider>
    )
  }
  