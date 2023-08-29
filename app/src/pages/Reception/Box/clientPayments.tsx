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
  TableContainer,
  Input,
} from "@chakra-ui/react";
import { Header } from "../../../components/admin/Header";
import { AdminContainer } from "../../AdminDashboard/style";
import { GenericLink } from "../../../components/Sidebars/GenericLink";
import { GenericSidebar } from "../../../components/Sidebars/GenericSideBar";
import { BiHome, BsCashCoin } from "react-icons/all";
import { useEffect, useMemo, useState } from "react";
import { api } from "../../../lib/axios";
import { useNavigate, useParams } from "react-router-dom";
import { LoadingSpinner } from "../../../components/Loading";


type ProceduresProps = {
	id: number;
	name: string;
	price: any;
  entryOur: Date | string;
  totalDebt: any;
}

interface ConsultDetailsProps {
  petName: string;
  customerName: string;
  procedures: ProceduresProps[]
}


export function BoxNewPaymentsClient() {
  const { petId, date, clientId } = useParams<{ petId: string, date: any, clientId: string }>();
  const [consultDetails, setConsultDetails] = useState({} as ConsultDetailsProps)

  async function getConsultDetails () {
    try {
      const response = await api.get(`/queuedebits/${petId}/${date}`)
      setConsultDetails(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getConsultDetails ()
  }, [])


  const totalCost = consultDetails?.procedures?.reduce((accumulator, procedure) => {
    const price = parseFloat(procedure?.price) || 0;
    const totalDebt = parseFloat(procedure?.totalDebt) || 0;
    return accumulator + price + totalDebt;
  }, 0);
  

 

  return (
    <ChakraProvider>
      <AdminContainer>
        <Flex direction="column" h="100vh">
          <Header
            title="Painel de Pagamentos por Cliente"
            url={`/Recepcao/Caixa/Pagamentos/${clientId}`}
          />
          <Flex w="100%" my="6" maxWidth={1680} mx="auto" px="6">
            <GenericSidebar>
              <GenericLink
                name="Painel de Pagamentos"
                icon={BsCashCoin}
                path="/Recepcao/Caixa/Pagamentos"
              />
              <GenericLink
                name="Pagamentos Consultas"
                icon={BsCashCoin}
                path={`/Recepcao/Caixa/Pagamentos/${clientId}`}
              />
            </GenericSidebar>
            <Box flex="1" borderRadius={8} bg="gray.200" p="8">
              <TableContainer>
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th
                        fontSize="18"
                        py="8"
                        color="black"
                        bg="blue.100"
                        colSpan={5}
                      >
                        Visualização de Consulta - Data : {new Intl.DateTimeFormat('pt-BR').format(new Date(date))}
                      </Th>
                    </Tr>
            
                        {" "}
                        <Tr>
                          <Th px="0" pl="5" fontSize="18" color="black">
                            Nome do Cliente
                          </Th>
                          <Th px="0" colSpan={2}>
                            <Input
                              bg="white"
                              borderColor="black"
                              defaultValue={consultDetails?.customerName}
                            />
                          </Th>
                          <Th px="0" pl="5" fontSize="18" color="black">
                            Nome do Animal
                          </Th>
                          <Th colSpan={1}>
                            <Input
                              bg="white"
                              borderColor="black"
                              defaultValue={consultDetails?.petName}
                            />
                          </Th>
                        </Tr>
                  </Thead>
                  <Tbody>
                    <Tr>
                      <Th
                        fontSize="18"
                        py="8"
                        color="black"
                        bg="blue.100"
                        colSpan={5}
                      >
                        Produtos / Serviços nesta consulta
                      </Th>
                    </Tr>
                  </Tbody>
                  <Thead>
                    <Tr bg="blue.400">
                      <Th
                        border="1px solid black"
                        fontSize="18"
                        color="white"
                        colSpan={1}
                      >
                        Quantidade
                      </Th>
                      <Th
                        colSpan={1}
                        border="1px solid black"
                        fontSize="18"
                        color="white"
                      >
                        Produto / Serviço
                      </Th>
                      <Th
                        colSpan={1}
                        border="1px solid black"
                        fontSize="18"
                        isNumeric
                        color="white"
                      >
                        Tabela
                      </Th>
                      <Th
                        colSpan={1}
                        border="1px solid black"
                        fontSize="18"
                        isNumeric
                        color="white"
                      >
                        Desconto
                      </Th>
                      <Th
                        colSpan={1}
                        border="1px solid black"
                        fontSize="18"
                        color="white"
                      >
                        Valor Cobrado
                      </Th>
                    </Tr>
                  </Thead>
                
                      <Tbody>

                        {
                          consultDetails.procedures  ? consultDetails?.procedures.map((procedure) => (
                            <Tr key={procedure.id} bg="white" fontWeight="bold">
                            <Td border="1px solid black">1</Td>
                            <Td border="1px solid black">{procedure?.name ? procedure?.name : `Internação ${procedure.entryOur}` } </Td>
                            <Td
                              border="1px solid black"
                              isNumeric
                              fontWeight="bold"
                            >
                              R$  {procedure?.price ? procedure?.price : procedure.totalDebt}
                            </Td>
                            <Td border="1px solid black" isNumeric>
                            0
                            </Td>
                            <Td border="1px solid black" isNumeric>
                              R$  {procedure?.price ? procedure?.price : procedure.totalDebt}
                            </Td>
                          </Tr>
                          )) : (<LoadingSpinner/>)
                        }

                      </Tbody>
             
                  <Tr bg="white" cursor="pointer" fontWeight="bold">
                    <Td colSpan={4} border="1px solid black" isNumeric>
                      Total
                    </Td>
                    <Td border="1px solid black" isNumeric>
                     {new Intl.NumberFormat('pt-BR', {
                      currency: 'BRL',
                      style: 'currency'
                     }).format(totalCost)}
                    </Td>
                  </Tr>
                </Table>
              </TableContainer>
            </Box>
          </Flex>
        </Flex>
      </AdminContainer>
    </ChakraProvider>
  );

}
