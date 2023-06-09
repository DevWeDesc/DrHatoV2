import { ChakraProvider, Flex } from '@chakra-ui/react'
import { ReceptionSidebar } from '../../components/Sidebars/ReceptionBar'
import { QueueSistem } from '../../queue'

export function ChangeConsult() {
  return (
    <ChakraProvider>
      <Flex direction="column" h="100vh">
        <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
          <ReceptionSidebar />

          <QueueSistem/>
        </Flex>
      </Flex>
    </ChakraProvider>
  )
}
