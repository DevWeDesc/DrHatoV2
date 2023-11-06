import { useState, useEffect} from 'react'
import { Box, Button, ChakraProvider, Flex, HStack, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import { FaClipboardList } from "react-icons/fa";
import { GiHealthIncrease, GiHealthPotion } from "react-icons/gi";
import { Header } from "../../components/admin/Header";
import { GenericLink } from "../../components/Sidebars/GenericLink";
import { GenericSidebar } from "../../components/Sidebars/GenericSideBar";
import { AdminContainer } from "../AdminDashboard/style";
import { api } from '../../lib/axios';
import { Input } from '../../components/admin/Input';
import { BiHome } from 'react-icons/bi';
import { ArrowCircleLeft } from 'phosphor-react';
import { AiFillHome } from 'react-icons/ai';
import { toast } from 'react-toastify';

type MedicineGroupProps = {
    id: number
    title: string
}

export function CreateMedicineGroup() {
const [medicinesGroups, setMedicinesGropups] = useState<MedicineGroupProps[]>([])
const [reloadData, setReloadData] = useState(false)
const [groupTitle, setGroupTitle] = useState("")

async function  getMedicineGroups() {
    try {
       const response = await api.get('/medicines/groups')

       setMedicinesGropups(response.data.medicines)
    } catch (error) {
        console.log(error)
    }
}

async function createNewGroup() {
    try {
        const data = {
            title: groupTitle
        }

        if(data.title === "" || data.title === null) {
            return 
        }

        await api.post("/medicines/groups", data)

        setReloadData(true); 
        
        toast.success("Novo grupo criado com sucesso!")

        setGroupTitle("")

    } catch (error) {
        toast.error("Falha ao cadastrar novo grupo!!")
        console.log(error)
    }
}


useEffect(() => {
    if (reloadData === true) {
        getMedicineGroups()
      setReloadData(false); // Reseta o estado para evitar chamadas infinitas
    }
  }, [reloadData]);


useEffect(() => {
    getMedicineGroups()
}, [])
    return (
        <ChakraProvider>
        <AdminContainer>
          <Flex direction="column" h="100vh">
            <Header
              title="Painel Grupos/Medicamentos"
            
            />
            <Flex w="100%" my="6" maxWidth={1680} mx="auto" px="6">
              <GenericSidebar>
              <GenericLink
                  name="Home"
                  icon={AiFillHome}
                  path={`/Home`}
                />
                <GenericLink
                  name="Medicamentos"
                  icon={GiHealthPotion}
                  path={`/Medicines/`}
                />

                     <GenericLink
                  name="Criar/Medicamento"
                  icon={GiHealthIncrease}
                  path={`/Medicines/Create`}
                />{" "}
          
              </GenericSidebar>
              <Box w="90%" bg="gray.200" height="800px" p="8" rounded="lg" overflowY="auto">
                <Flex align="center" gap="4" justify="space-between">
                    <HStack mb="4">
                        <Text fontSize="x-large">Cadastrar novo grupo: </Text>
                        <Input onChange={(ev) => setGroupTitle(ev.target.value)} value={groupTitle} label="Nome do Grupo" name="title" placeholder="Nome do novo grupo"/>
                      
                    </HStack>
                    <Button onClick={() =>  createNewGroup()} colorScheme="teal" w="320px"> Cadastrar</Button>
                </Flex>
                    <TableContainer w="100%" h="100%" >
                        <Table variant="simple"  >
                            <Thead>
                                <Tr>
                                    <Th fontWeight="bold" fontSize="1xl" textColor="black" border="2px" bgColor="cyan.100"> 
                                        Grupos Disponíveis
                                    </Th>
                                    <Th  fontWeight="bold" fontSize="1xl" textColor="black" border="2px" bgColor="red.300" >
                                       Desabilitar
                                    </Th>
                                    <Th  fontWeight="bold" fontSize="1xl" textColor="black" border="2px" bgColor="cyan.100" >
                                       Grupos Desabilitados
                                    </Th>
                                    <Th  fontWeight="bold" fontSize="1xl" textColor="black" border="2px" bgColor="green.300" >
                                       Habilitar
                                    </Th>

                                 
                                    
                                </Tr> 
                                
                            </Thead>
                            <Tbody >
                                {
                                    medicinesGroups.map((medicine) => (
                                        <Tr
                                        
                                      
                                        >
                                            <Td
                                             _hover={{
                                                bgColor: "green.300"
                                            }}
                                            textColor="black"
                                            fontWeight="semibold"
                                            fontSize="lg"
                                            border="2px" bgColor="green.100" cursor="pointer"  >{medicine.title}</Td>
                                            <Td  border="2px">
                                                      <Button isDisabled w="100%" colorScheme="red">Desabilitar</Button>
                                                </Td>
                                                <Td  border="2px">
                                                   Vazio
                                                </Td>
                                                <Td  border="2px">
                                                      <Button w="100%" isDisabled colorScheme="whatsapp">Habilitar</Button>
                                                </Td>
                                        </Tr>
                                    ))
                                }
                       
                            
                            </Tbody>
                        </Table>
                    </TableContainer>
              </Box>
            </Flex>
          </Flex>
        </AdminContainer>
      </ChakraProvider>
    );
    

}