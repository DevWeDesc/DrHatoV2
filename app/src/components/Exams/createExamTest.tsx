import React, { useState } from 'react';
import { TableContainer, Table, Thead, Tr, Th, Tbody, Td, Input, Button, Text, ChakraProvider, Flex, FormControl } from "@chakra-ui/react";
import { useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { api } from "../../lib/axios";

type CreateExameCharacForm = {
    sessionId: number
}

export function CreateExamTest({ sessionId }: CreateExameCharacForm) {
    const queryClient = useQueryClient();
    const [characName, setCharacName] = useState("");
    const [unitAbs, setUnitAbs] = useState("");
    const [unitRel, setUnitRel] = useState("");
    const [agesOne, setAgesOne] = useState("");
    const [unitAbsOne, setUnitAbsOne] = useState("");
    const [unitRellOne, setUnitRellOne] = useState("");
    const [agesTwo, setAgesTwo] = useState("");
    const [unitAbsTwo, setUnitAbsTwo] = useState("");
    const [unitRellTwo, setUnitRellTwo] = useState("");
    const [agesThree, setAgesThree] = useState("");
    const [unitAbsThree, setUnitAbsThree] = useState("");
    const [unitRellThree, setUnitRellThree] = useState("");

    const handleCreateCharac = async () => {
        try {
            const data = {
                caracteristic: characName,
                relativeUnit: unitRel,
                absoluteUnit: unitAbs,
                agesOne: agesOne,
                minAgesOne: unitAbsOne,
                maxAgesOne: unitRellOne,
                agesTwo: agesTwo,
                minAgesTwo: unitAbsTwo,
                maxAgesTwo: unitRellTwo,
                agesThree: agesThree,
                minAgesThree: unitAbsThree,
                maxAgesThree: unitRellThree,
                parts: 3
            }

             await api.post(`/part/exams/characs/${sessionId}`, data)
             queryClient.invalidateQueries('editExamDetails')
             toast.success("Nova Caracteristica adicionada com sucesso!")
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <FormControl  >
            <TableContainer>
                <Table>
                    <Thead>
                        <Tr>
                            <Th textAlign="center" fontSize="lg" colSpan={9}>
                                Adicionar nova Característica
                            </Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        <Tr>
                            <Td py={1}>Característica</Td>
                            <Td py={1}>Un Abs.</Td>
                            <Td>Un Rel.</Td>
                            <Td colSpan={2}>
                                <Flex alignItems="center">
                                    <Text>Coluna 1:</Text>
                                    <Input bgColor="white" border="1px" value={agesOne} onChange={(e) => setAgesOne(e.target.value)} />
                                </Flex>
                            </Td>
                            <Td colSpan={2}>
                                <Flex alignItems="center">
                                    <Text>Coluna 2:</Text>
                                    <Input bgColor="white" border="1px" value={agesTwo} onChange={(e) => setAgesTwo(e.target.value)} />
                                </Flex>
                            </Td>
                            <Td colSpan={2}>
                                <Flex alignItems="center">
                                    <Text>Coluna 3:</Text>
                                    <Input bgColor="white" border="1px" value={agesThree} onChange={(e) => setAgesThree(e.target.value)} />
                                </Flex>
                            </Td>
                        </Tr>
                        <Tr>
                            <Td p={1}>
                                <Input bgColor="white" border="1px" value={characName} onChange={(e) => setCharacName(e.target.value)} />
                            </Td>
                            <Td p={1}> 
                                <Input bgColor="white" border="1px" value={unitAbs} onChange={(e) => setUnitAbs(e.target.value)} />
                            </Td>
                            <Td p={1}>
                                <Input bgColor="white" border="1px" value={unitRel} onChange={(e) => setUnitRel(e.target.value)} />
                            </Td>
                            <Td p={1}>
                                <Flex alignItems="center">
                                    <Text>Abs - </Text>
                                    <Input bgColor="white" border="1px" value={unitAbsOne} onChange={(e) => setUnitAbsOne(e.target.value)} />
                                </Flex>
                            </Td>
                            <Td p={1}>
                                <Flex alignItems="center">
                                    <Text>Rel - </Text>
                                    <Input bgColor="white" border="1px" value={unitRellOne} onChange={(e) => setUnitRellOne(e.target.value)} />
                                </Flex>
                            </Td>
                            <Td p={1}>
                                <Flex alignItems="center">
                                    <Text>Abs - </Text>
                                    <Input bgColor="white" border="1px" value={unitAbsTwo} onChange={(e) => setUnitAbsTwo(e.target.value)} />
                                </Flex>
                            </Td>
                            <Td p={1}>
                                <Flex alignItems="center">
                                    <Text>Rel - </Text>
                                    <Input bgColor="white" border="1px" value={unitRellTwo} onChange={(e) => setUnitRellTwo(e.target.value)} />
                                </Flex>
                            </Td>
                            <Td p={1}>
                                <Flex alignItems="center">
                                    <Text>Abs - </Text>
                                    <Input bgColor="white" border="1px" value={unitAbsThree} onChange={(e) => setUnitAbsThree(e.target.value)} />
                                </Flex>
                            </Td>
                            <Td p={1}>
                                <Flex alignItems="center">
                                    <Text>Rel - </Text>
                                    <Input bgColor="white" border="1px" value={unitRellThree} onChange={(e) => setUnitRellThree(e.target.value)} />
                                </Flex>
                            </Td>
                        </Tr>
                    </Tbody>
                </Table>
            </TableContainer>
            <Button w="100%" onClick={handleCreateCharac} colorScheme="green" margin={4} >Gravar</Button>
        </FormControl>
    )
}
