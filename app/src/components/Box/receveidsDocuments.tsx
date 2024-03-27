import {
  Flex,
  Heading,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { BoxContext } from "../../contexts/BoxContext";
import { api } from "../../lib/axios";
import { BoxProps, IDocBox } from "../../interfaces";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";


export function ReceveidDocuments() {

  const [documents, setDocuments] = useState({} as IDocBox);
  const [fatherBox, setFatherBox] = useState({} as BoxProps);
  const navigate = useNavigate();

  async function getFatherBox () {
    const response = await api.get("/vetbox")
    setFatherBox(response.data)

  } 

  async function getBoxDocuments ()  {
    const response = await api.get(`/account/debitByBox/${fatherBox.id}`);
    setDocuments(response.data);
  };
  
  const {isLoading: isFatherBoxLoading, refetch: refetchFather} = useQuery('fatherBox', getFatherBox)
  const {} = useQuery("boxDocuments", getBoxDocuments)  

  


  return (
    <>
      <Flex justify="space-between" direction="column" align="center">
        <Heading
          bg="gray.700"
          color="white"
          size="lg"
          fontWeight="bold"
          w="100%"
          textAlign="center"
          py="5"
        >
          Documentos Recebidos
        </Heading>
      </Flex>

      <TableContainer>
        <Table variant="striped" colorScheme="teal">
          <Thead>
            <Tr>
              <Th border="1px solid black" fontSize="17">
                Tipo
              </Th>
              <Th border="1px solid black" fontSize="17">
                Cliente
              </Th>
              <Th border="1px solid black" fontSize="17" isNumeric>
                Valor
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {documents?.Installments?.map((doc) => (
              <Tr
                key={doc.id}
                onClick={() =>
                  navigate(
                    `/Recepcao/Caixa/Returns/${doc.customerId}/${doc.id}`
                  )
                }
              >
                <Td style={{ border: "1px solid black" }}>{doc.paymentType}</Td>
                <Td
                  style={{ border: "1px solid black" }}
                  border="1px solid black"
                  fontWeight="bold"
                >
                  {doc.customerAccount.customer.name}
                </Td>
                <Td
                  style={{ border: "1px solid black" }}
                  border="1px solid black"
                  isNumeric
                  fontWeight="bold"
                >
                  {doc.totalDebit.toString().concat(",00")}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
}
