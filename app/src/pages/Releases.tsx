import { Button, ChakraProvider, Flex, Text, Textarea, VStack } from "@chakra-ui/react";
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
        <Text>Versão atual 0.1.0</Text>
        <Text>Ultima versão 0.0.1</Text>
        </Flex>

        <Flex wrap="wrap" w="100%" h="100%">
        <VStack m={16} w="500px"  >
          <Text>Versão 0.0.1:</Text>
          <Textarea
          border="2px"
          bgColor="white"
          h="300px" defaultValue={
            "Administração: possivel criar/editar/excluir plano de saúde - Dilan. \n Corrigido bug de navegação na área administrativa cirurgias - Dilan.\n Realizado todo crud de planos de saúde no backend - Dilan \n Cirurgias refatoradas para React Query - Dilan \n Data de atualização: 18/03/24\n Refatorado procedimentos para React Query - Dilan\n Corrigido listagem de grupos e setores dos procedimentoes -Dilan \n  Corrigido comportamento de listagem de setores nos procedimentos - Dilan \n Adicionado listagem de convênios aos procedimentos - Dilan \n Sistema de convênio funcional para os procedimentos - Dilan \n Convênios linkados a consultas abertas na recepção - Dilan \n Opção de procedimentos por convênio aparecem apenas para os que possuem o mesmo - Dilan \n Recepção refatorada para ReactQuery -Dilan\n Data de atualização: 19/03/2024 "
            
          } />
           
        </VStack>
        <VStack m={16} w="500px"  >
          <Text fontWeight="bold" color="green">Versão 0.1.0 - atual</Text>
          <Textarea
          border="2px"
          bgColor="white"
          h="300px" defaultValue={
            "Adicionado A-Z Cirurgias - Dilan \n Adicionado A-Z Exames - Dilan \n Adicionado A-Z Vacinas - Dilan \n Adicionado convênio Vacinas - Dilan \n Adicionado convênio Exames - Dilan \n Adicionado convênio Cirurgias - Dilan \n Cadastro de raças/especies 100% funcionando - Dilan \n Cadastro de animais ajustado - Dilan \n Refatorado tela recepção React Query - Dilan \n Visualização de exames antigos(resultado MF) - Dilan \n Pré visualização de parcelamentos (tela pagamento) - Dilan \n Lógica de alterar preferência removida do menu veterinario(agora está dentro da tela principal vets - Dilan \n Data da Atualização 25/03/2024 a 29/03/2024 \n Cadastro/Edição/Deleção de Centro Cirurgicos - Dilan \n Regras de adição de cirúrgia ao animal atrelados a um Centro Cirúrgico - Dilan \n "
            
          } />
           
        </VStack>

        </Flex>

 
       
          
       

      </Flex>
      </ChakraProvider>
  )
}