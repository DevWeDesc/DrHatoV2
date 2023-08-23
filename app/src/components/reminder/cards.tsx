import {
  Card,
  CardHeader,
  CardBody,
  ChakraProvider,
  Button,
  CardFooter,
  Heading,
  Text,
  Flex,
} from "@chakra-ui/react";

interface PropsCards {
  title: string;
  body: string;
}

export default function CardsReminder({ title, body }: PropsCards) {
  return (
    <ChakraProvider>
      <Card w="100%" textAlign="center">
        <CardHeader>
          <Heading size="md" textAlign="center">
            {title}
          </Heading>
        </CardHeader>
        <CardBody>
          <Text size="sm" fontWeight="bold">
            {body}
          </Text>
        </CardBody>
        <CardFooter>
          <Flex direction="column" gap="2" alignItems="center" w="100%">
            <Button colorScheme="twitter" w="100%">
              Marcar como Concluída
            </Button>
            <Button colorScheme="red" w="100%">
              Deletar Lembrete
            </Button>
          </Flex>
        </CardFooter>
      </Card>
    </ChakraProvider>
  );
}
