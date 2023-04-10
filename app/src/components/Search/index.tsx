import {ChakraProvider,Flex, Button, Text } from '@chakra-ui/react'
import { Input } from '../admin/Input'
export function SearchComponent({children}: any) {
  return (
    <ChakraProvider>
        <Flex  gap="4">
        <Input label='Código do animal' name='Codigo Animal' />
        <Input  label='Nome do Cliente' name='Nome Cliente' />
        <Input   label='Nome do animal' name='Nome Animal' />,
        {children}
        <Flex gap="2" align="center" direction="column">
        <Text fontWeight="bold">Pesquisa Universal</Text>
        <Button colorScheme="whatsapp" minWidth={220}> Filtrar</Button>
        </Flex>
        </Flex>
    </ChakraProvider>
      )
   
}