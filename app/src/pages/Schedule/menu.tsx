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
import { AiOutlineMenu, BsArrowLeft, GiHealthNormal, AiOutlineSchedule} from "react-icons/all"
import { Link } from 'react-router-dom'
export function ScheduleMenu() {
  return (
    <ChakraProvider>
      <Flex direction="column" h="100vh">
        <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
          <GenericSidebar>
          <GenericLink icon={BsArrowLeft}  name='Voltar' path="/Home"/>
          <GenericLink icon={AiOutlineMenu}  name='Menu' path="/Home/Schedule/Menu"/>
          <GenericLink icon={GiHealthNormal}  name='Cirurgias' path="/Home/Cirurgias"/>
          <GenericLink icon={AiOutlineSchedule}  name='Agendas' />

           

        
          </GenericSidebar>
          <SimpleGrid
            flex="1"

            as={Flex}
          >
            <Box textAlign="center" p="8" bg="gray.100" borderRadius={8}>
              <Text fontSize={24}>Bem vindo(a) as Agendas!! 😄</Text>

              <Flex mt="8" justify="center" direction="row" gap={8}>
            
                  <Card align="center">
                    <CardHeader>
                      <Heading size="md">Cirurgias</Heading>
                    </CardHeader>
                    <CardBody>
                      <Text>
                        Pesquise aqui no sistema de cirurgias
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
                      <Heading size="md">Agenda veterinários</Heading>
                    </CardHeader>
                    <CardBody>
                      <Text>
                     Veja aqui a agenda dos veterinários
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
