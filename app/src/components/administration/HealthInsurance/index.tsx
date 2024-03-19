import {
  Text,
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  FormControl,
  TableContainer,
  HStack,
  Checkbox,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { RiAddLine, RiPencilLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { LoadingSpinner } from "../../../components/Loading";
import { GenericModal } from "../../../components/Modal/GenericModal";
import { api } from "../../../lib/axios";
import { toast } from "react-toastify";
import { Input } from "../../../components/admin/Input";
import { ConfirmationDialog } from "../../dialogConfirmComponent/ConfirmationDialog";
import { BsFillTrashFill } from "react-icons/bs";
import { QueryClient, useQuery } from "react-query";


interface HealthInsurance {
  id: number;
  planName: string;
  disponible: boolean;
  planProvider: string;
  graceDays?: number;
  coverageLimit?: number;
  admissionDeduction?: number;
  disponibleAtAdmission?: boolean;
}

export function HealthInsuranceList() {
  const [healthInsurance, setHealthInsurance] = useState<HealthInsurance[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const {register, handleSubmit} = useForm()
  const navigate = useNavigate();
  const queryClient =  new QueryClient()

  async function getAllHealthInsurance() {
    const response = await api.get('/health/insurance')
    setHealthInsurance(response.data.healthInsurance)
  }

    const {isLoading} = useQuery("healthInsurance", getAllHealthInsurance)

    if(isLoading) {
      return <LoadingSpinner/>
    }
 
  const handleCreateHealthInsurance: SubmitHandler<FieldValues> = async (values) => {
    const data = {
      ...values
    }

    await api.post('/health/insurance', data)
    
    toast.success('Plano criado com sucesso!')

    queryClient.invalidateQueries("healthInsurance")

  
  }


  async function  handleDeleteHealthInsurance (planId: number) {
    await api.delete(`/delete/health/insurance/${planId}`)
    toast.success("Plano deletado com sucesso!")
    queryClient.invalidateQueries("healthInsurance")
  }

  return (
    <Flex
      py={{ base: 10, xl: 0 }}
      direction="column"
      gap="4"
      w="full"
      maxH="48rem"
    >
      <Box borderRadius={8} overflow="auto">
        <Flex w="100%" direction={"column"} justify="center" align="center">
          <Flex
            w="100%"
            alignItems="center"
            justifyContent="center"
            direction="column"
          >
            <Heading
              fontSize={{ base: "lg", lg: "2xl" }}
              fontWeight="bold"
              pl="2"
              w="100%"
              mb="5"
              display="flex"
              flexDirection={{ base: "column", md: "row" }}
              gap={{ base: 3, md: 0 }}
              justifyContent="space-between"
            >
              Painel de Plano de Saúde
              <Button
                py="6"
                fontSize={{ base: "12", lg: "sm" }}
                colorScheme="whatsapp"
                leftIcon={<Icon as={RiAddLine} />}
                onClick={() => setIsModalOpen(true)}
              >
                Cadastrar novo Plano de Saúde
              </Button>
            </Heading>
          </Flex>
          <TableContainer w="full">
            <Table colorScheme="blackAlpha">
              <Thead>
                <Tr>
                  <Th w="full" colSpan={2}>
                    Nome
                  </Th>
                  <Th>Editar</Th>
                  <Th>Deletar</Th>
                </Tr>
              </Thead>

              <Tbody>
                {
                  healthInsurance.map((health) => (
                    <Tr key={health.id}>
                    <Td
                      fontSize={{ base: "12", lg: "sm" }}
                      fontWeight="medium"
                      colSpan={2}
                    >
                      {health.planName}
                    </Td>
                    <Td>
                      <Flex gap="2">
                        <Button
                          cursor="pointer"
                          as="a"
                          size="sm"
                          fontSize={{ base: "12", lg: "sm" }}
                          colorScheme="yellow"
                          leftIcon={<Icon as={RiPencilLine} />}
                          onClick={() =>
                            navigate(`/Admin/HealthInsurance/${health.id}`)
                          }
                        >
                          Editar Plano
                        </Button>
                      </Flex>
                    </Td>
                    <Td>
                      {" "}
                      <ConfirmationDialog
                        fontSize={{ base: "12", lg: "sm" }}
                        disabled={false}
                        icon={<BsFillTrashFill fill="white" size={16} />}
                        buttonTitle="Deletar Plano de Saúde"
                        whatIsConfirmerd={`Tem certeza que deseja Excluir o Plano de Saúde ${health.planName}?`}
                        describreConfirm="Excluir o Plano de Saúde é uma ação irreversivel, tem certeza que deseja excluir?"
                        callbackFn={() => handleDeleteHealthInsurance(health.id)}
                      />
                    </Td>
                  </Tr>
                  ))
                }
              </Tbody>
            </Table>
          </TableContainer>
        </Flex>
        <GenericModal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}>
          <FormControl
            as="form"
           onSubmit={handleSubmit(handleCreateHealthInsurance)}
            display="flex"
            width="348px"
            flexDir="column"
            alignItems="center"
          >
            <Input
              {...register("planName")}
              name="planName"
              label="Nome da Plano"
              mb="4"
              placeholder="Nome de identificação do plano!"
            />

            <HStack mt="2" mb="2">
              <Text>Disponivel ?</Text>
              <Checkbox border="2px" {...register("disponible")} name="disponible"  />
            </HStack>
                 <Input
              {...register("planProvider")}
              name="planProvider"
              label="Provedor do Plano"
              placeholder="Ex: Petlove, Petcare etc.."
              mb="4"
            />

          <Input
              {...register("graceDays")}
              name="graceDays"
              label="Dias de carência"
              type="number"
              placeholder="número inteiro 30 dias = 1 mês"
              mb="4"
            />
        

        <Input
              {...register("coverageLimit")}
              name="coverageLimit"
              type="number"
              label="Máximo de gasto permitido"
              placeholder="Opcional, aplica a planos próprios"
              mb="4"
            />



          <HStack mt="2" mb="2">
              <Text>Disponivel para internação ?</Text>
              <Checkbox border="2px" {...register("disponibleAtAdmission")} name="disponibleAtAdmission"  />
            </HStack>
              <Input
              {...register("admissionDeduction")}
              name="admissionDeduction"
              type="number"
              label="Desconto em % na internação"
              placeholder="Opcional, aplica a planos próprios"
              mb="4"
            />


            <Button w="100%" type="submit" colorScheme="green" m="2">
              Cadastrar
            </Button>
          </FormControl>
        </GenericModal>
      </Box>
    </Flex>
  );
}
