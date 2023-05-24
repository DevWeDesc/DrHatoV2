import { Button, ChakraProvider, Flex, FormControl, HStack, Menu, MenuButton, MenuList, Radio, RadioGroup, Text } from '@chakra-ui/react'
import { useContext, useState} from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { api } from '../../lib/axios'
import { Input } from '../admin/Input'
import { GenericModal } from '../Modal/GenericModal'
import Modal from 'react-modal'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { DbContext } from '../../contexts/DbContext'
import { StyledBox } from '../Header/style'
import { MdContentPasteSearch } from 'react-icons/md'


interface SetExamFormProps { 
    recordId?: string | number;
}
export function SetExamForm({recordId}: SetExamFormProps) {
    const {register, handleSubmit} = useForm()
    const [examValue, setExamValue] = useState("");
    const { exams } = useContext(DbContext)
    const navigate = useNavigate()
    const handleSetExam: SubmitHandler<FieldValues> = async values => {
        if(examValue === "") {
            toast.error("Selecione um exame")
            return
            }
       try {
        await api.post(`setexam/${examValue}/${recordId}`)
        toast.success("Exame colocado na fila do laboratório")
        navigate(0)
       } catch (error) {
        toast.error("Falha ao colocar exames na fila.")
       }
    }
    return (
        <ChakraProvider>
             <FormControl as="form" onSubmit={handleSubmit(handleSetExam)}>
                <Flex direction="column" align="center">
                <Text m="2" mb="4" fontWeight="bold" > SELECIONE O EXAME.</Text>
            <HStack spacing={8}>
            <Menu>
                            <MenuButton
                              border="1px"
                              as={Button}
                              rightIcon={<MdContentPasteSearch />}
                            >
                              <StyledBox>
                                <Text>Exames</Text>
                              </StyledBox>
                            </MenuButton>
                            <MenuList bg="green.100">
                              {exams.map((exam: any) => (
                                <Flex
                                  direction="column"
                                  align="center"
                                  p="2px"
                                  gap="2"
                                  key={exam.id}
                                >
                              <RadioGroup onChange={setExamValue} value={examValue}>
                                <Radio
                                  bgColor={examValue == exam.id ? "green" : "red"}
                                  value={exam.id as any}
                                >
                                  {exam.name}
                                </Radio>
                              </RadioGroup>
                                </Flex>
                              ))}
                            </MenuList>
                          </Menu>
            <Button type='submit' colorScheme="whatsapp">Enviar a FILA</Button>

            </HStack>

                </Flex>
            
                   
            </FormControl>

        </ChakraProvider>
           
    )
}