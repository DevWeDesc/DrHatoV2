import { WorkSpaceContainer, WorkSpaceHeader, WorkSpaceContent } from "./styles";
import { Text, Button,ChakraProvider, Flex} from '@chakra-ui/react'
import { BiHome} from 'react-icons/all'
import { useNavigate } from "react-router-dom";
export function WorkSpaceVet() {
  const navigate = useNavigate()
  return (
    <ChakraProvider>
       <WorkSpaceContainer>
      <WorkSpaceHeader>
        <Flex justify="space-between" align="center" width="100%" height="100%">
          <Flex align="center" gap="2" >
          <Text m="2" fontSize="2xl" fontWeight="bold">WorkSpace Veterinário</Text>
          <Button colorScheme="teal" leftIcon={<BiHome size={24}/>}
          onClick={() => navigate('/Home')}
          >Home</Button>
          </Flex>
       
        <Flex justify="space-between" gap="2" m="2">
        <Button height={8} colorScheme="whatsapp">FORMULÁRIOS</Button>
        <Button height={8} colorScheme="whatsapp">INSTRUÇÕES PROPRIETÁRIO</Button>
        <Button height={8} colorScheme="whatsapp">AUTORIZAÇÕES</Button>
        <Button height={8} colorScheme="whatsapp">PROTOCOLOS</Button>
        </Flex>
        
        </Flex>
       

      </WorkSpaceHeader>
      <WorkSpaceContent>
      <div className="div1"> </div>
      <div className="div2"> </div>
      <div className="div3"> </div>
      <div className="div4"> </div>

      </WorkSpaceContent>
    </WorkSpaceContainer>
    </ChakraProvider>
   
  )
}