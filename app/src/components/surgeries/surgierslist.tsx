import React from 'react'
import { ChakraProvider, Text, Flex } from '@chakra-ui/react'

export function Surgierslist() {
  return (
    <ChakraProvider>
      <Flex>
        <Flex color="black" bg="gray.700" direction="column" w="65vw">
          <Text fontSize="2xl" border="1px solid black" fontWeight="bold" color="white" pl="2" py="2"> Cirurgias Incluidas nesta Consulta</Text>
          <Flex bg="gray.200" border="1px solid black" fontSize="20">
            <Text color="black" border="1px solid black" pl="2" pr="38vw">Cirurgia</Text>
            <Text color="black" border="1px solid black" pl="2" pr="3vw">Valor</Text>
            <Text color="black" border="1px solid black" pl="2" pr="3vw">Data</Text>
            <Text color="black" border="1px solid black" pl="2" pr="3vw">Exclusão</Text>
          </Flex>
        </Flex>
        <Flex direction="column" bg="gray.700" w="35vw" border="1px solid black">
          <Text fontSize="2xl" fontWeight="bold" color="white" pl="2" py="2">Cirurgias</Text>
          <Flex bg="gray.200" border="1px solid black" fontSize="20">
            <Text  border="1px solid black" pl="2" w="25vw">Tipo</Text>
            <Text border="1px solid black" pl="2" w="10vw">Data</Text>
          </Flex>
        </Flex>
      </Flex>
    </ChakraProvider>
  )
}
