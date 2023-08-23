import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  Button,
  Box,
  Text,
  Portal,
  Flex,
  Input,
} from "@chakra-ui/react";
import { FaRobot } from "react-icons/fa";
import { TiLocationArrow } from "react-icons/ti";
import { BiErrorCircle } from "react-icons/bi";
import { AiOutlineQuestionCircle, AiOutlineSetting } from "react-icons/ai";

export default function ChatBot() {
  return (
    <Box position="fixed" bottom="5" right="5">
      <Popover placement="top-start">
        <PopoverTrigger>
          <Button h="70px" w="70px" rounded="full">
            <FaRobot size="sm" />
          </Button>
        </PopoverTrigger>
        <Portal>
          <PopoverContent>
            <PopoverHeader
              fontWeight="bold"
              fontSize="18"
              display="flex"
              alignItems="center"
            >
              <Text display="flex" alignItems="center" gap="4">
                {" "}
                <FaRobot size="30px" /> Dr. Hato - Suporte
              </Text>
              <PopoverCloseButton mt="2" />
            </PopoverHeader>
            <PopoverBody h="50vh" w="25vw">
              <Flex direction="column" w="19vw" maxW="295px">
                <Text
                  bg="gray.100"
                  py="4"
                  px="4"
                  rounded="md"
                  textAlign="center"
                >
                  Olá, como eu posso te ajudar?
                </Text>
                <Flex direction="column" gap="2" mt="3">
                  <Button
                    justifyContent="start"
                    colorScheme="red"
                    display="flex"
                    gap="12"
                    _focus={{ boxShadow: "none" }}
                  >
                    {" "}
                    <BiErrorCircle /> Reportar Erro/Bug
                  </Button>
                  <Button
                    borderColor="twitter"
                    justifyContent="start"
                    colorScheme="twitter"
                    display="flex"
                    gap="14"
                    _focus={{ boxShadow: "none" }}
                  >
                    <AiOutlineQuestionCircle />
                    Solicitar Suporte
                  </Button>
                  <Button
                    justifyContent="start"
                    colorScheme="whatsapp"
                    display="flex"
                    gap="9"
                    _focus={{ boxShadow: "none" }}
                  >
                    <AiOutlineSetting /> Sugestão à melhorias
                  </Button>
                </Flex>
              </Flex>
            </PopoverBody>
            <PopoverFooter>
              <Flex border="1px solid" borderColor="gray.300" rounded="md">
                <Input border="0" _focus={{ boxShadow: "none" }} />
                <Box transform="rotate(45deg)">
                  <TiLocationArrow size="40" />
                </Box>
              </Flex>
            </PopoverFooter>
          </PopoverContent>
        </Portal>
      </Popover>
    </Box>
  );
}
