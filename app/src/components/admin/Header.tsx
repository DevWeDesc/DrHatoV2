import { Flex, Input, Text, Icon, HStack } from "@chakra-ui/react"
import { RiNotificationLine, RiSearchLine, RiUserAddLine } from "react-icons/ri";
import { Link } from "react-router-dom";

interface HeaderProps {
  title:  string
}
export function Header({title = 'Painel Administrativo'}: HeaderProps) {
  const userStorage = localStorage.getItem('userSession')
  const userName = JSON.parse(userStorage as any)
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
      <Text
      fontSize="3xl"
      fontWeight="bold"
     color="green.800"
      >
     {title}
      </Text>

      <Flex
      as="label"
      flex="1"
      py="4"
      px="8"
      ml="6"
      maxWidth={400}
      alignSelf='center'
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
        _placeholder={{color: 'gray.700'}}

        
        />


      
          <RiSearchLine size={28} color="black"/>
        

      </Flex>

      <Flex
      align="center"
      ml="auto"
      >
        <HStack  mx="8" spacing="8"
        pr="8"
        py="1"
        borderRightWidth={1}
        borderColor="gray.700"
        >
        <Icon as={RiNotificationLine} fontSize="20" />
        <Icon as={RiUserAddLine} fontSize="20" />
        </HStack>

        <Flex align="center" direction="column" >
          <Text fontSize="md" fontWeight="bold">{userName.username}</Text>
          <Link to="/Home">
          <Text textDecoration="underline" fontSize="lg" fontWeight="medium">Voltar</Text>
          </Link>

        </Flex>
        
      </Flex>

    </Flex>
  )
}