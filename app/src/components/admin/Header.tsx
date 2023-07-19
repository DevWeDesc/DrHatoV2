import { Flex, Input, Text, Icon, HStack, Button } from "@chakra-ui/react";
import { useContext } from "react";
import {
  RiNotificationLine,
  RiSearchLine,
  RiUserAddLine,
} from "react-icons/ri";
import { TbArrowBack } from "react-icons/tb";
import { Link } from "react-router-dom";
import { DbContext } from "../../contexts/DbContext";

interface HeaderProps {
  title: string;
}
export function Header({ title = "Painel Administrativo" }: HeaderProps) {

  
  const user = JSON.parse(localStorage.getItem('user') as string)
  return (
    <Flex
      as="header"
      w="100%"
      maxWidth={1480}
      h="20"
      mx="auto"
      mt="4"
      px="6"
      align="center"
    >
      <Text fontSize="3xl" fontWeight="bold" color="green.800">
        {title}
      </Text>

      <Flex
        as="label"
        flex="1"
        py="4"
        px="8"
        ml="6"
        maxWidth={400}
        alignSelf="center"
        color="gray.200"
        position="relative"
        bg="gray.200"
        borderRadius="full"
      >
        <Input
          color="gray.700"
          variant="unstyled"
          px="4"
          mr="4"
          placeholder="Buscar no sistema"
          _placeholder={{ color: "gray.700" }}
        />

        <RiSearchLine size={28} color="black" />
      </Flex>

      <Flex align="center" ml="auto">
        <HStack
          mx="8"
          spacing="8"
          pr="8"
          py="1"
          borderRightWidth={1}
          borderColor="gray.700"
        >
          <Icon as={RiNotificationLine} fontSize="20" />
          <Icon as={RiUserAddLine} fontSize="20" />
        </HStack>

        <Flex align="center" direction="column">
          <Text fontSize="md" fontWeight="bold">
            {user.username}
          </Text>
          <Link to="/Home">
            <Button colorScheme="yellow" leftIcon={<TbArrowBack size={24} />}>
              Voltar
            </Button>
          </Link>
        </Flex>
      </Flex>
    </Flex>
  );
}
