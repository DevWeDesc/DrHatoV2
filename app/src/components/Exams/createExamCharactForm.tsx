import { TableContainer,Table, Thead, Tr, Th, Tbody, Td, Input, Button, Text, ChakraProvider, Flex, FormControl } from "@chakra-ui/react";
import {useForm, FieldValues, SubmitHandler} from 'react-hook-form'
import { useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { api } from "../../lib/axios";

type CreateExameCharacForm = {
    sessionId: number
}

export function CreateExameCharacForm( {sessionId}: CreateExameCharacForm) {
    const queryClient = useQueryClient()
    const { register, handleSubmit } = useForm(); 

    const handleCreateCharac: SubmitHandler<FieldValues> =  async (values) => {
        try {
            const data = {
                caracteristic:       values.characName,
                relativeUnit:    values.unitRel,
                absoluteUnit:    values.unitAbs,
                agesOne:    values.agesOne,
                minAgesOne:    values.unitAbsOne,
                maxAgesOne:    values.unitRellOne,
                agesTwo:    values.agesTwo,
                minAgesTwo:    values.unitAbsTwo,
                maxAgesTwo:    values.unitRellTwo,
                agesThree:    values.agesThree,
                minAgesThree:    values.unitAbsThree,
                maxAgesThree:    values.unitRellThree,
                parts:    3
            }

            console.log(data)
         
            //  await api.post(`/part/exams/characs/${sessionId}`, data)
            //  queryClient.invalidateQueries('editExamDetails')
            //  toast.success("Nova Caracteristica adicionada com sucesso!")
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <FormControl as="form" onSubmit={handleSubmit(handleCreateCharac)} >
        <TableContainer>
        <Table >
     
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
                  <Input bgColor="white" border="1px" {...register('agesOne')} name="agesOne"  />
                </Flex>
              </Td>
              <Td colSpan={2}>
                <Flex alignItems="center">
                  <Text>Coluna 2:</Text>
                  <Input bgColor="white" border="1px"  {...register('agesTwo')} name="agesTwo" />
                </Flex>
              </Td>
              <Td colSpan={2}>
                <Flex alignItems="center">
                  <Text>Coluna 3:</Text>
                  <Input bgColor="white" border="1px"  {...register('agesThree')} name="agesThree" />
                </Flex>
              </Td>
            </Tr>
            <Tr>
              <Td p={1}>
                <Input bgColor="white" border="1px" {...register("characName")}  name="characName" />
              </Td>
              <Td p={1}> 
                <Input bgColor="white" border="1px" {...register("unitAbs")}  name="unitAbs"  />
              </Td>
              <Td p={1}>
                <Input bgColor="white" border="1px"   {...register("unitRel")}  name="unitRel" />
              </Td>
              <Td p={1}>
                <Flex alignItems="center">
                  <Text>Abs - </Text>
                  <Input bgColor="white" border="1px"   {...register("unitAbsOne")} name="unitAbsOne" />
                </Flex>
              </Td>
              <Td p={1}>
                <Flex alignItems="center">
                  <Text>Rel - </Text>
                  <Input bgColor="white" border="1px"  {...register("unitRellOne")} name="unitRellOne" />
                </Flex>
              </Td>
              <Td p={1}>
                <Flex alignItems="center">
                  <Text>Abs - </Text>
                  <Input bgColor="white" border="1px"  {...register("unitAbsTwo")} name="unitAbsTwo"/>
                </Flex>
              </Td>
              <Td p={1}>
                <Flex alignItems="center">
                  <Text>Rel - </Text>
                  <Input bgColor="white" border="1px"  {...register("unitRellTwo")} name="unitRellTwo" />
                </Flex>
              </Td>
              <Td p={1}>
                <Flex alignItems="center">
                  <Text>Abs - </Text>
                  <Input bgColor="white" border="1px"  {...register("unitAbsThree")} name="unitAbsThree" />
                </Flex>
              </Td>
              <Td p={1}>
                <Flex alignItems="center">
                  <Text>Rel - </Text>
                  <Input bgColor="white" border="1px"   {...register("unitRellThree")} name="unitRellThree" />
                </Flex>
              </Td>
            </Tr>
            {/* <Tr>
              <Td colSpan={3}>
                <Text>Logicas de avaliação de idade:</Text>
              </Td>
              <Td colSpan={2} p={1}>
                <Flex alignItems="center">
                  <Text>Lógica 1:</Text>
                  <Input bgColor="white" border="1px" name="" />
                </Flex>
              </Td>
              <Td colSpan={2} p={1}>
                <Flex alignItems="center">
                  <Text>Lógica 2:</Text>
                  <Input bgColor="white" border="1px" name="" />
                </Flex>
              </Td>
              <Td colSpan={2} p={1}>
                <Flex alignItems="center">
                  <Text>Lógica 3:</Text>
                  <Input bgColor="white" border="1px" name="" />
                </Flex>
              </Td>
            </Tr> */}
          </Tbody>
        </Table>
       
      </TableContainer>
      <Button w="100%" type="submit" colorScheme="green" margin={4} >Gravar</Button>
      </FormControl>
    )
}