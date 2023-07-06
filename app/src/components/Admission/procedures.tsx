import { Input } from "@chakra-ui/input";
import { Flex } from "@chakra-ui/layout";
import { Text } from "@chakra-ui/layout";
import { ChakraProvider } from "@chakra-ui/react";
import React from "react";

export type Props = {
  nameExam: string;
  priceExam: string;
  dataformatted: string;
};

export default function ProceduresAdmissions({
  nameExam,
  priceExam,
  dataformatted,
}: Props) {
  return (
    <ChakraProvider>
      <Flex direction="column">
        <Flex>
          <Text
            w="53.3vw"
            pl="2"
            bg="gray.200"
            fontWeight="bold"
            fontSize="20"
            border="1px solid black"
          >
            Nome do Procedimento
          </Text>
          <Text
            w="23.3vw"
            pl="2"
            bg="gray.200"
            fontWeight="bold"
            fontSize="20"
            border="1px solid black"
          >
            Valor
          </Text>
          <Text
            w="23.3vw"
            pl="2"
            bg="gray.200"
            fontWeight="bold"
            fontSize="20"
            border="1px solid black"
          >
            Data
          </Text>
        </Flex>
        <Flex>
          <Input
            w="53.3vw"
            pl="2"
            bg="white"
            fontWeight="bold"
            fontSize="20"
            border="1px solid black"
            rounded="none"
            value={nameExam}
          />
          <Input
            w="23.3vw"
            pl="2"
            bg="white"
            fontWeight="bold"
            fontSize="20"
            border="1px solid black"
            rounded="none"
            value={priceExam}
          />
          <Input
            w="23.3vw"
            pl="2"
            bg="white"
            fontWeight="bold"
            fontSize="20"
            border="1px solid black"
            rounded="none"
            type="date"
            value={dataformatted}
          />
        </Flex>
      </Flex>
    </ChakraProvider>
  );
}
