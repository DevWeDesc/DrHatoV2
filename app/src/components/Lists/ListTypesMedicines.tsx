import {
  Flex,
  List,
  ListIcon,
  ListItem,
  Divider,
  Center,
  Text,
} from "@chakra-ui/react";

import { MdCheckCircle, FcCancel } from "react-icons/all";
import { useState } from "react";

const ArrayListMedicines = [
  {
    name: "Antibióticos",
  },
  {
    name: "Analgésicos",
  },
  {
    name: "Antimicóticos",
  },
  {
    name: "Comportamental",
  },
  {
    name: "Desinfetantes",
  },
  {
    name: "Insulina",
  },
  {
    name: "Coprofagia",
  },
  {
    name: "Dermatológicos",
  },
];

export default function ListMedicines() {
  const [typeMedicines, setTypeMedicines] = useState<String | null>(null);

  return (
    <Flex flex="1" borderRadius={8} justify="center" bg="gray.200" p="8">
      <Flex w="100%" justify="center">
        <Flex
          m={4}
          align="center"
          gap="4"
          minWidth={400}
          direction="column"
          overflowY={"scroll"}
        >
          <Text fontSize={22} fontWeight="bold">
            Tipos
          </Text>
          <List spacing={0} maxHeight={"600px"}>
            {ArrayListMedicines.map((list) => {
              return (
                <ListItem
                  display={"flex"}
                  alignItems={"center"}
                  transition={"0.3s"}
                  _hover={{ backgroundColor: "gray.300" }}
                  cursor={"pointer"}
                  borderBottom={"0.5px solid black"}
                  padding={"10px 0"}
                  onClick={() => {
                    setTypeMedicines(list.name);
                  }}
                >
                  <ListIcon as={MdCheckCircle} color="green.500" />
                  {list.name}
                </ListItem>
              );
            })}
          </List>
        </Flex>
        <Center bgColor="green" height="100%">
          <Divider orientation="vertical" />
        </Center>
        <Flex m={4} align="center" gap="4" minWidth={400} direction="column">
          <Text fontSize={22} fontWeight="bold">
            Medicamentos
          </Text>
          <List spacing={3} maxHeight={"600px"}>
            {typeMedicines == "Antibióticos" && (
              <ListItem display={"flex"} alignItems={"center"}>
                <ListIcon as={MdCheckCircle} color="green.500" />
                Listagem Antibióticos
              </ListItem>
            )}
            {typeMedicines == "Analgésicos" && (
              <ListItem display={"flex"} alignItems={"center"}>
                <ListIcon as={MdCheckCircle} color="green.500" />
                Listagem Analgésicos
              </ListItem>
            )}
            {typeMedicines == "Antimicóticos" && (
              <ListItem display={"flex"} alignItems={"center"}>
                <ListIcon as={MdCheckCircle} color="green.500" />
                Listagem Antimicóticos
              </ListItem>
            )}
            {typeMedicines == null && (
              <>
                <ListItem display={"flex"} alignItems={"center"}>
                  <ListIcon as={FcCancel} color="green.500" />
                  Listagem Sem Filtros
                </ListItem>
              </>
            )}
          </List>
        </Flex>
      </Flex>
    </Flex>
  );
}
