import { WorkSpaceContainer, WorkSpaceHeader, WorkSpaceContent, WorkSpaceFooter } from "./styles";
import { Text, Button,ChakraProvider, Flex, Table, Thead, Tr, Td, Tbody, Textarea, HStack} from '@chakra-ui/react'
import { AiFillMedicineBox, BiHome, MdPets, TbArrowBack, TbMedicalCrossFilled} from 'react-icons/all'
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

          <Button colorScheme="yellow" leftIcon={<TbArrowBack size={24}/>}
          onClick={() => navigate('/Vets/Menu')}
          >Voltar</Button>
          </Flex>
       
        <Flex justify="space-between" gap="2" m="2">
        <Button height={8} colorScheme="whatsapp">FORMULÁRIOS</Button>
        <Button height={8} colorScheme="whatsapp">INSTRUÇÕES PROPRIETÁRIO</Button>
        <Button height={8} colorScheme="whatsapp">AUTORIZAÇÕES</Button>
        <Button height={8} colorScheme="whatsapp">PROTOCOLOS</Button>
        <Button height={8} colorScheme="whatsapp">EXAMES</Button>
        <Button height={8} leftIcon={<MdPets/>} colorScheme="messenger">PRONTUÁRIO DO PET</Button>
        </Flex>
        
        </Flex>
       

      </WorkSpaceHeader>
      <WorkSpaceContent>
      <div className="div1">
        <Flex m="4" gap="2"  direction="column" >
          <Table dir="column">
            <Thead>
              <Tr>
                <Td>Cliente</Td>
                <Td>Gastos</Td>
                <Td>Animal</Td>
                <Td>Detalhes</Td>
                <Td>Horário</Td>
                <Td>Internações</Td>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>Felipe Augusto</Td>
                <Td>6 meses R$00</Td>
                <Td>Mala, felina</Td>
                <Td>Macho 4.2kg 4 anos</Td>
                <Td>12:45</Td>
                <Td>Sem internação</Td>
              </Tr>
            </Tbody>
          </Table>
          <Flex direction="column" mt="2">
            <Text fontSize="lg" m="2">Observações</Text>
            <Textarea></Textarea>
          </Flex>
        </Flex >
      </div>
        <div className="div2">
          <Flex backgroundColor="cyan.100" w="100%" h="48px" direction="row" align="center" justify="center">
            <Text mr="1">Exames - </Text>
            <Text mr="2" color="red">Vermelho: Por fazer  </Text>
            /
            <Text ml="2" color="green">Verde: pronto</Text>
          </Flex >
        
          <Flex m="2" direction="column" gap="2">
            <Flex w="100%" backgroundColor="gray.100" p="2" justify="space-between">
            <Text fontWeight="bold" color="red" >Biograma Completo</Text>
            <Text>{ new Intl.DateTimeFormat("pt-BR").format(Date.now()) }</Text>
            </Flex>
          
          <Flex w="100%" backgroundColor="gray.100" p="2" justify="space-between">
          <Text fontWeight="bold" color="green">Hemograma Felino</Text>
          <Text>{ new Intl.DateTimeFormat("pt-BR").format(Date.now()) }</Text>
          </Flex>
       
          </Flex>
      
        </div>
      <div className="div3"> 
      <HStack spacing={4} m="2">
        <Button colorScheme="whatsapp">Diagnóstico</Button>
        <Button colorScheme="whatsapp">Prescrição</Button>
        <Button colorScheme="whatsapp">Sintomas</Button>
        <Button colorScheme="whatsapp">Solicitar Exame</Button>
        </HStack>
        <Textarea border="1px" minHeight={220} m="2" maxWidth={600}></Textarea>
      </div>
      <div className="div4">

      <Flex justify="space-between" gap="2" m="2">
        <Button leftIcon={<MdPets/>} height={8} colorScheme="whatsapp">Outros Animais</Button>
        <Button leftIcon={<TbMedicalCrossFilled/>} height={8} colorScheme="whatsapp">Vacinas</Button>
        <Button leftIcon={<AiFillMedicineBox/>} height={8} colorScheme="whatsapp">Cirurgias</Button>
        </Flex>


        <Flex m="2" direction="column" gap="2">
            <Flex w="100%" backgroundColor="gray.100" p="4" justify="space-between">
           
            </Flex>
          
          <Flex w="100%" backgroundColor="gray.100" p="4" justify="space-between">
          
          </Flex>

          <Flex w="100%" backgroundColor="gray.100" p="4" justify="space-between">
          
          </Flex>
       
          </Flex>

       </div>

      </WorkSpaceContent>
      <WorkSpaceFooter>
      <Flex justify="space-evenly" align="center" width="100%" height="100%">

      <Button colorScheme="teal">Imprimir Receita</Button>
        <Button colorScheme="linkedin">Imprimir Raio-X</Button>
        <Button colorScheme="orange">Imprimir Solicitação Exames</Button>
        <Button colorScheme="red">Gravar Alterações</Button>

      </Flex>
        
      </WorkSpaceFooter>
    </WorkSpaceContainer>
    </ChakraProvider>
   
  )
}