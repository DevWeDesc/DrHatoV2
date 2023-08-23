import { Flex, ChakraProvider, Text, SimpleGrid } from "@chakra-ui/react";
import CardsReminder from "../reminder/cards";

export default function DaysReminder() {
  return (
    <ChakraProvider>
      <Flex direction="column" w="70%">
        <Text textAlign="center" fontSize="28" fontWeight="bold">
          Listagem de Lembretes
        </Text>
        <SimpleGrid
          mt="10"
          spacing={4}
          pl="16"
          templateColumns="repeat(auto-fill, minmax(250px, 1fr))"
        >
          <CardsReminder
            title="Retorno Consulta Especial 23/08/2023"
            body={`Cliente: Vinicius Henrique`}
          />
          <CardsReminder
            title="Retorno Consulta Especial 25/08/2023"
            body={`Cliente: Dilan Lopez`}
          />
          <CardsReminder
            title="Retorno Consulta Especial 26/08/2023"
            body={`Cliente: Glauco`}
          />
          <CardsReminder
            title="Retorno Consulta Especial 28/08/2023"
            body={`Cliente: Nicolas`}
          />
        </SimpleGrid>
      </Flex>
    </ChakraProvider>
  );
}
