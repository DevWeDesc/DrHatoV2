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
  AccordionIcon,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  VStack,
  Text,
  RadioGroup,
  Radio, Menu,
  MenuButton,
  MenuList,
  Button
} from '@chakra-ui/react'
import { useContext, useState} from 'react'
import { Header } from '../../components/admin/Header'
import { SearchComponent } from '../../components/Search'
import { GenericLink } from '../../components/Sidebars/GenericLink'
import { GenericSidebar } from '../../components/Sidebars/GenericSideBar'
import { AiOutlineSearch } from 'react-icons/all'
import { AdminContainer } from '../AdminDashboard/style'
import { Link } from 'react-router-dom'
import { UniversalSearch } from '../../components/Search/universalSearch'
import { DbContext } from '../../contexts/DbContext'
import { StyledBox } from '../../components/Header/style'
import { MdPets as Burger } from "react-icons/all";

export function MenuVet() {
  const [petValue, setPetValue] = useState("");
  let {data} = useContext(DbContext)
  console.log("AKK DATA", data)
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
                        <Th>Tipo</Th>
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
                      
                    {  Object.keys(data).length >= 1 ? data.map((user: any) => (<>
                      <Tr key={user.id}>
                          <Td>{user.cpf}</Td>
                          <Link to="/Vets/WorkSpace">
                          <Td>{user.name}</Td>
                          </Link>
                         
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
                            <MenuList key={user.pets.id} bg="green.100">
                              {user.pets?.map((pets: any) => (
                                <Flex
                                  key={user.pets.id}
                                  direction="column"
                                  align="center"
                                  p="2px"
                                  gap="2"
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
                          <Td>Sem Preferência</Td>
                          <Td>0</Td>
                        </Tr>
                    </>) ): (<>
                      <Tr>
                          <Td>Empty</Td>
                          <Link to="/Vets/WorkSpace">
                          <Td>Empty</Td>
                          </Link>
                         
                          <Td>Empty</Td>
                          <Td>Empty</Td>
                          <Td>Empty</Td>
                        
                          <Td>Empty</Td>
                          <Td>Empty</Td>
                          <Td>Empty</Td>
                        </Tr>
                    </>) }
              
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
