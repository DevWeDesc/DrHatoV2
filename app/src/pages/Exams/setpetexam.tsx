import { useState, useContext, useEffect} from 'react'
import { ChakraProvider, Flex, Box, Button, Text, Table, Tr, Td, Thead, Tbody} from '@chakra-ui/react'
import { useParams, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { GenericSidebar } from '../../components/Sidebars/GenericSideBar'
import { GenericLink } from '../../components/Sidebars/GenericLink'
import {BsArrowLeft, AiOutlineMenu, IoIosFlask, BsImages } from 'react-icons/all'
import { Input } from '../../components/admin/Input'
import { HemoTable } from '../../components/ProceduresTable/HemoTable'

export function SetPetExam() {
    const { id } = useParams<{ id: string}>()

    return (
        <ChakraProvider >
            <Flex direction="column" h="100vh">
            <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
            <GenericSidebar>
                    <GenericLink icon={BsArrowLeft}  name='Voltar' path="/Home"/>
                    <GenericLink icon={AiOutlineMenu}  name='Menu' path="/Labs"/>
                    <GenericLink icon={IoIosFlask}  name='Laboratório' path="/Labs/Exames"/>
                    <GenericLink icon={BsImages}  name='Laboratório Imagens' path="/Labs/Imagens"/>
            </GenericSidebar>
          <Box flex="1" borderRadius={8} bg="gray.200" p="8">
              <Flex direction="column" align="center" p="4">
                        <Text>Que tipo de exame irá preencher?</Text>
                    <Flex mt="4" width="100%" justify="space-evenly">
                        <Button  colorScheme="whatsapp">Tabela Hemograma</Button>
                        <Button  colorScheme="whatsapp">Eritograma</Button>
                        <Button  colorScheme="whatsapp">Hemo + Eritograma</Button>
                    </Flex>
                
                </Flex>
                <HemoTable />
            </Box>
            </Flex>
            </Flex>
         
        </ChakraProvider>
    )
}