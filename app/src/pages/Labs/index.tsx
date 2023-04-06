import {
  Text,
  Flex,
  Box,
  SimpleGrid,
  ChakraProvider,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading
} from '@chakra-ui/react'
import { GenericSidebar } from '../../components/Sidebars/GenericSideBar'
import { GenericLink } from '../../components/Sidebars/GenericLink'
import { AiOutlineMenu, BsArrowLeft, IoIosFlask, BsImages} from "react-icons/all"
import { Link } from 'react-router-dom'
export function LabMenu() {
  return (
    <ChakraProvider>
      <Flex direction="column" h="100vh">
        <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
          <GenericSidebar>
          <GenericLink icon={BsArrowLeft}  name='Voltar' path="/Home"/>
          <GenericLink icon={AiOutlineMenu}  name='Menu' path="/Home/Labs"/>
          <GenericLink icon={IoIosFlask}  name='Laboratório' path="/Home/Labs/Exames"/>
          <GenericLink icon={BsImages}  name='Laboratório Imagens' path="/Home/Labs/Imagens"/>

           

        
          </GenericSidebar>
          <SimpleGrid
            flex="1"

            as={Flex}
          >
            <Box textAlign="center" p="8" bg="gray.100" borderRadius={8}>
              <Text fontSize={24}>Bem vindo(a) ao Laboratório!! 😄</Text>

              <Flex mt="8" justify="center" direction="row" gap={8}>
            
                  <Card align="center">
                    <CardHeader>
                      <Heading size="md">Laboratório</Heading>
                    </CardHeader>
                    <CardBody>
                      <Text>
                        Pesquise no laboratório aqui
                      </Text>
                    </CardBody>
                    <CardFooter>
                      <Link to="/Home/Labs/Exames">
                      <Button colorScheme="whatsapp">Ir até pesquisa</Button>
                      </Link>
                      
                    </CardFooter>
                  </Card>
                  <Card align="center">
                    <CardHeader>
                      <Heading size="md">Laboratório de imagens</Heading>
                    </CardHeader>
                    <CardBody>
                      <Text>
                      Pesquise no laboratório aqui
                      </Text>
                    </CardBody>
                    <CardFooter>
                      <Link to="/Home/Labs/Imagens"><Button colorScheme="whatsapp">Ir até pesquisa</Button></Link>
                    
                    </CardFooter>
                  </Card>
              
              </Flex>
            </Box>
          </SimpleGrid>
        </Flex>
      </Flex>
    </ChakraProvider>
  )
}
