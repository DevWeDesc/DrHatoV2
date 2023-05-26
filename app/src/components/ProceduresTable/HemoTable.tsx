import {Table, Thead, Tbody, Tr, Td, Flex} from '@chakra-ui/react'
import { Input } from '../admin/Input'
export function HemoTable() {
    return(
        
        <Table colorScheme="blackAlpha">
        <Thead>
            <Tr>
                <Td>
                    Eritograma
                </Td>
                <Td>
                    Resultados
                </Td>
                <Td>
                    Unidades
                </Td>
                <Td>
                    1 a 8 anos
                </Td>
                <Td>
                    Acima de 8 anos
                </Td>
            </Tr>
        </Thead>
        <Tbody>
        <Td>
            <Flex direction="column">
            <Td>Caracteristicas</Td>
            <Td>Hemoglobina</Td>
            <Td>Hematócrito</Td>
            <Td>V.C.M</Td>
            <Td>M.C.M</Td>
            <Td>C.H.C.M</Td>
            <Td>Proteína Total</Td>
            <Td>Eritroblastos</Td>
            </Flex >
        </Td>

            <Td>
            <Flex direction="row">
            <Flex direction="column">
            <Td>Absoluto</Td>
           <Input maxWidth="80px" name="ex"/>
           <Input maxWidth="80px" name="ex"/>
           <Input maxWidth="80px" name="ex"/>
           <Input maxWidth="80px" name="ex"/>
           <Input maxWidth="80px" name="ex"/>
           <Input maxWidth="80px" name="ex"/>
           <Input maxWidth="80px" name="ex"/>
           <Input maxWidth="80px" name="ex"/>
           <Input maxWidth="80px" name="ex"/>
           <Input maxWidth="80px" name="ex"/>
            </Flex>
            <Flex direction="column">
            <Td>Relativo</Td>
            <Td></Td>
            <Td></Td>
            <Td></Td>
            <Td></Td>
            <Td></Td>
            <Td></Td>
            <Td> </Td>
            <Td></Td>
    
            </Flex>
         
            </Flex >
        </Td>
        <Td>
        <Flex direction="row">
            <Flex direction="column">
            <Td>Unid Abs</Td>
           <Input maxWidth="80px" name="ex"/>
           <Input maxWidth="80px" name="ex"/>
           <Input maxWidth="80px" name="ex"/>
           <Input maxWidth="80px" name="ex"/>
           <Input maxWidth="80px" name="ex"/>
           <Input maxWidth="80px" name="ex"/>
           <Input maxWidth="80px" name="ex"/>
           <Input maxWidth="80px" name="ex"/>
           <Input maxWidth="80px" name="ex"/>
           <Input maxWidth="80px" name="ex"/>
            </Flex>
            <Flex direction="column">
            <Td>Unid Relativa</Td>
            <Td>Caracteristicas</Td>
            <Td>Hemoglobina</Td>
            <Td>Hematócrito</Td>
            <Td>V.C.M</Td>
            <Td>M.C.M</Td>
            <Td>C.H.C.M</Td>
            <Td>Proteína Total</Td>
            <Td>Eritroblastos</Td>
    
            </Flex>
         
            </Flex >
        </Td>
        <Td>
        <Flex direction="row">
            <Flex direction="column">
            <Td>Absoluto</Td>
           <Input maxWidth="80px" name="ex"/>
           <Input maxWidth="80px" name="ex"/>
           <Input maxWidth="80px" name="ex"/>
           <Input maxWidth="80px" name="ex"/>
           <Input maxWidth="80px" name="ex"/>
           <Input maxWidth="80px" name="ex"/>
           <Input maxWidth="80px" name="ex"/>
           <Input maxWidth="80px" name="ex"/>
           <Input maxWidth="80px" name="ex"/>
           <Input maxWidth="80px" name="ex"/>
            </Flex>
            <Flex direction="column">
            <Td>Relativo</Td>
            <Td></Td>
            <Td></Td>
            <Td></Td>
            <Td></Td>
            <Td></Td>
            <Td></Td>
            <Td> </Td>
            <Td></Td>
    
            </Flex>
         
            </Flex >
        </Td>
        <Td>
        <Flex direction="row">
            <Flex direction="column">
            <Td>Absoluto</Td>
           <Input maxWidth="80px" name="ex"/>
           <Input maxWidth="80px" name="ex"/>
           <Input maxWidth="80px" name="ex"/>
           <Input maxWidth="80px" name="ex"/>
           <Input maxWidth="80px" name="ex"/>
           <Input maxWidth="80px" name="ex"/>
           <Input maxWidth="80px" name="ex"/>
           <Input maxWidth="80px" name="ex"/>
           <Input maxWidth="80px" name="ex"/>
           <Input maxWidth="80px" name="ex"/>
            </Flex>
            <Flex direction="column">
            <Td>Relativo</Td>
            <Td></Td>
            <Td></Td>
            <Td></Td>
            <Td></Td>
            <Td></Td>
            <Td></Td>
            <Td> </Td>
            <Td></Td>
    
            </Flex>
         
            </Flex >
        </Td>
        </Tbody>
     
        </Table>
    )
}