import { Button, ChakraProvider, Flex, Text, Textarea } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function Releases() {
  return (
      <ChakraProvider>
      <Flex  width="max" height="max" direction="column">
       

        <Flex m={16}  align="center" justify='center' gap={4}>
        <Link to="/Home">
        <Button colorScheme="whatsapp">Voltar</Button>
        </Link>
        <Text fontWeight="black" fontSize={24}>Lançamentos sistema veterinário Dr Hato</Text>
        <Text>Versão atual 0.0.1</Text>
        </Flex>

        <Flex m={16}  >
          <Text>Versão 0.0.1:</Text>
          <Textarea
          border="2px"
          bgColor="white"
          h="300px" defaultValue={
            "Administração: possivel criar/editar/excluir plano de saúde - Dilan. \n Corrigido bug de navegação na área administrativa cirurgias - Dilan.\n Realizado todo crud de planos de saúde no backend - Dilan \n Cirurgias refatoradas para React Query - Dilan \n Data de atualização: 18/03/24\n Refatorado procedimentos para React Query - Dilan\n Corrigido listagem de grupos e setores dos procedimentoes -Dilan \n "
            
          } />
           
        </Flex>
       
       

      </Flex>
      </ChakraProvider>
  )
}