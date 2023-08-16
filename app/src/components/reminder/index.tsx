import React from "react";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import {
  List,
  ListItem,
  ListIcon,
  OrderedList,
  UnorderedList,
} from "@chakra-ui/react";
import { MdCheckCircle, MdSettings, MdWarning } from "react-icons/md";

export const Reminder = () => {
  return (
    <Alert
      status="warning"
      variant="subtle"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      w="400px"
    >
      <AlertIcon boxSize="40px" mr={0} />
      <AlertTitle mt={4} mb={1} fontSize="lg">
        Lembrete de Tarefa XYZ
      </AlertTitle>
      <AlertDescription maxWidth="lg">
        <Text my="2" fontWeight="bold">
          {" "}
          Para entrar na consulta, basta clicar <br /> no nome do cliente!!
        </Text>
        <List spacing={3}>
          <ListItem fontWeight="bold" cursor="pointer">
            <ListIcon as={MdWarning} fontSize="22px" color="orange.600" />
            Cliente Vinicius: Data 15/08/2023: Retorno consulta especial
          </ListItem>
          <ListItem fontWeight="bold" cursor="pointer">
            <ListIcon as={MdWarning} fontSize="22px" color="orange.600" />
            Cliente Dilan: Data 10/08/2023: Retorno consulta especial
          </ListItem>
          <ListItem fontWeight="bold" cursor="pointer">
            <ListIcon as={MdWarning} fontSize="22px" color="orange.600" />
            Cliente Danilo: Data 10/08/2023: Retorno consulta especial
          </ListItem>
          <ListItem fontWeight="bold" cursor="pointer">
            <ListIcon as={MdWarning} fontSize="22px" color="orange.600" />
            Cliente Glauco: Data 10/08/2023: Retorno consulta especial
          </ListItem>
          <ListItem fontWeight="bold" cursor="pointer">
            <ListIcon as={MdWarning} fontSize="22px" color="orange.600" />
            Cliente Glauco: Data 10/08/2023: Retorno consulta especial
          </ListItem>
          <ListItem fontWeight="bold" cursor="pointer">
            <ListIcon as={MdWarning} fontSize="22px" color="orange.600" />
            Cliente Glauco: Data 10/08/2023: Retorno consulta especial
          </ListItem>
        </List>
      </AlertDescription>
    </Alert>
  );
};
