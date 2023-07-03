import { Button, ChakraProvider, Flex, Text } from "@chakra-ui/react";
import { BiHome } from "react-icons/bi";
import { FaRegFilePdf } from "react-icons/fa";
import { TbArrowBack } from "react-icons/tb";
import { useNavigate, useParams } from "react-router-dom";

export function Protocols() {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();


    const protocolos = ["CARDIO", "DOR", "ENDÓCRINO", "HEMATO", "HERNIA DE DISCO", "NEFRO", "NEURO", "PACIENTE CRITICO", "RECEITAS"]
    return (
        <ChakraProvider>
            <Flex  width="100vw" height="100vh" bgColor="white" direction="column" >
            <Flex w="100%" height="10vh" bgColor="gray.200">
          <Flex align="center" gap="2">
            <Text m="2" fontSize="2xl" fontWeight="bold">
              PROTOCOLOS
            </Text>
            <Button
              colorScheme="teal"
              leftIcon={<BiHome size={24} />}
              onClick={() => navigate("/Home")}
            >
              Home
            </Button>

            <Button
              colorScheme="yellow"
              leftIcon={<TbArrowBack size={24} />}
              onClick={() => navigate(`/Vets/Workspace/${id}`)}
            >
              Voltar
            </Button>
          </Flex>
        </Flex>
                <Flex w="100%" height="90vh" bgColor="gray.50">
                    <Flex width="30%" height="100%" direction="column">
                        <Flex width="100%" height="38px" bgColor="cyan.100"  align="center" justify="center">
                            <Text fontSize="2xl" fontWeight="black">GRUPOS</Text>
                            
                        </Flex>
                            <Flex width="100%" height="100%" overflowY="auto" direction="column" >
                                    { protocolos.map( (txt)=> (
                                        <Button colorScheme="whatsapp" m="2" fontSize="lg" fontWeight="bold" >{txt}</Button>
                                    )) }
                            </Flex>
                    </Flex>
                    <Flex borderLeft="2px" width="70%"  height="100%" direction="column">
                        <Flex width="100%" height="38px" bgColor="cyan.100"  align="center" justify="center">
                            <Text fontSize="2xl" fontWeight="black">PROTOCOLOS DISPONIVEIS</Text>
                        </Flex>
                        <Flex width="100%" height="100%" overflowY="auto" direction="column" >
                                    <Flex width="100%" height="100%">
                                        <Flex height="42px" width="100%" align="center" gap={4} m="4"bgColor="gray.100">
                                        <Button width="100%" gap={8} colorScheme="whatsapp" leftIcon={<FaRegFilePdf size={32}/>}>EXEMPLO DE PROTOCOLO</Button>
                                        </Flex>
                                        
                                    </Flex>
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>
        </ChakraProvider>
    )
}