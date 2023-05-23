import {
  Box,
  ChakraProvider,
  Flex,
  Table,
  Tr,
  Td,
  Thead,
  Tbody,
  Th,
  Text,
  RadioGroup,
  Radio, Menu,
  MenuButton,
  MenuList,
  Button
} from '@chakra-ui/react'
import { useContext, useState} from 'react'
import { Header } from '../../components/admin/Header'
import { GenericLink } from '../../components/Sidebars/GenericLink'
import { GenericSidebar } from '../../components/Sidebars/GenericSideBar'
import { AiOutlineSearch } from 'react-icons/all'
import { AdminContainer } from '../AdminDashboard/style'
import { Link, useNavigate } from 'react-router-dom'
import { UniversalSearch } from '../../components/Search/universalSearch'
import { DbContext } from '../../contexts/DbContext'
import { StyledBox } from '../../components/Header/style'
import { MdPets as Burger } from "react-icons/all";
import { toast } from 'react-toastify'
import { LoadingSpinner } from '../../components/Loading'

export function MenuVet() {
  const [petValue, setPetValue] = useState("");
  let {data} = useContext(DbContext)
  const navigate = useNavigate()
  const handleNavigateWorkSpace = () => {
    if(!petValue) {
      toast.error("Selecione um PET")
      return
    } 
    navigate(`/Vets/Workspace/${petValue}`)
  }
  return (
    <ChakraProvider>
      <AdminContainer>
        <Flex direction="column" h="100vh">
          <Header title="Painel Veterinário" />
          <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
            <GenericSidebar>
              <GenericLink
                name="Pesquisar Cliente"
                icon={AiOutlineSearch}
                path="/Home/Vets/Menu"
              />
            </GenericSidebar>
            <Box flex="1" borderRadius={8} bg="gray.200" p="8">
              <Flex mb="8" gap="8" direction="column" align="center">
                <UniversalSearch path='queryall' />
                <Flex  textAlign="center" justify="center">
                  <Table colorScheme="blackAlpha">
                    <Thead>
                      <Tr>
                        <Th>CPF</Th>
                        <Th>Cliente</Th>
                        <Th>Animal</Th>
                        <Th>Código</Th>
                        <Th>Data</Th>
                        <Th>Hora</Th>
                        <Th>Preferência</Th>
                        <Th>Especialidade</Th>
                      </Tr>
                    </Thead>

                    <Tbody>
                      
                    {  Object.keys(data).length >= 1 ? data.map((user: any) => (
                      <Tr key={user.id}>
                          <Td>{user.cpf}</Td>
                          
                          <Td><Button colorScheme="whatsapp" onClick={() => handleNavigateWorkSpace()}>{user.name}</Button></Td>
                          
                         
                          <Td>
                          <Menu>
                            <MenuButton
                              border="1px"
                              as={Button}
                              rightIcon={<Burger />}
                            >
                              <StyledBox>
                                <Text>pets</Text>
                              </StyledBox>
                            </MenuButton>
                            <MenuList bg="green.100">
                              {user.pets?.map((pets: any) => (
                                <Flex
                                  direction="column"
                                  align="center"
                                  p="2px"
                                  gap="2"
                                  key={pets.id}
                                >
                              <RadioGroup onChange={setPetValue} value={petValue}>
                                <Radio
                                  bgColor={petValue == pets.id ? "green" : "red"}
                                  value={pets.id as any}
                                >
                                  {pets.name}
                                </Radio>
                              </RadioGroup>
                                </Flex>
                              ))}
                            </MenuList>
                          </Menu>
                          </Td>
                          <Td>92487</Td>
                          <Td>  04/04/2023</Td>
                        
                          <Td>25:53</Td>
                          <Td>{user.vetPreference ? user.vetPreference : "Sem Preferência"}</Td>
                          <Td>0</Td>
                        </Tr>
                    ) ): (<Tr>
                     <Td><LoadingSpinner /></Td>
                    </Tr>) }
              
                    </Tbody>
                  </Table>
                </Flex>
              </Flex>
            </Box>
          </Flex>
        </Flex>
      </AdminContainer>
    </ChakraProvider>
  )
}
