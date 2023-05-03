import { Text,Box, Button, ChakraProvider, Checkbox, Flex, Heading, Icon, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { useContext, } from "react";
import { RiAddLine, RiPencilLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { Header } from "../../components/admin/Header";
import { Paginaton } from "../../components/admin/Pagination";
import { Sidebar } from "../../components/admin/Sidebar";
import { LoadingSpinner } from "../../components/Loading";
import { DbContext } from "../../contexts/DbContext";

import { AdminContainer } from "../AdminDashboard/style";


  export function UsersList()
  {
    const { userDataList  } = useContext(DbContext)


  

  return (
    <ChakraProvider>
      <AdminContainer>
        <Flex direction="column" h="100vh">
        <Header title="Usuários" />

        <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
            <Sidebar />
          <Box
          flex="1"
          borderRadius={8}
          bg="gray.200"
          p="8"
          >
            <Flex mb="8" justify="space-between" align="center">
              <Heading size="lg" fontWeight="normal">Usúarios</Heading>
              
              <Link to='/Users/Create'>
              <Button as="a"size="sm" fontSize="sm" colorScheme="green"
              leftIcon={<Icon as={RiAddLine}/>}
              >
                  Criar novo
              </Button>
              </Link>


            
            </Flex>

            <Table  colorScheme="blackAlpha">
              <Thead>
                <Tr>
                  <Th px="6" color="gray.300" w="8"> 
                    <Checkbox  borderColor="black" colorScheme="facebook" />
                  </Th>
                  <Th>
                    Usuário
                  </Th>
                  <Th>
                    Tipo de Usuário
                  </Th>
                  <Th width="8">
                  </Th>
                </Tr>
              </Thead>
              
                  <Tbody>

                {userDataList ? userDataList.map( (user) => 
                  (
                
                    <Tr key={user.id}>
                    <Td px="6">
                    <Checkbox borderColor="black" colorScheme="green" />
                    </Td>
                    <Td>
                      <Box>
                        <Text fontWeight="bold" color="gray.800">{user.name}</Text>
                        <Text fontSize="sm" color="gray.700" >{user.username}</Text>
                      </Box>
                    </Td>
                    <Td>
                      <Text fontWeight="bold" color="gray.800">{ user.userType.includes("admin") ? "ADMINISTRADOR" : user.userType.includes("vet") ? "VETERINÁRIO" : "USUÁRIO" }</Text>
                    </Td>
  
                    
                  <Td>
                    
                    <Link to={`/Users/Edit/${user.id}`}> 
                    <Button as="a"size="sm" fontSize="sm" colorScheme="green"
                      leftIcon={<Icon as={RiPencilLine}/>}
                      >
                        Editar
                  </Button>
                  </Link>
                 
                    </Td>
                  </Tr>
           
                  )
                 ) : ( <LoadingSpinner />) }
               
                </Tbody>

        
            </Table>

        <Paginaton />

          </Box>
        </Flex>
        </Flex>
    </AdminContainer>
    </ChakraProvider>
   
  
  )
}