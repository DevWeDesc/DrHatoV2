import {
  Flex,
  Table,
  Tr,
  Thead,
  Tbody,
  Th,
  Button,
  TableContainer,
  Td,
  Text,
  Input,
} from "@chakra-ui/react";
import React from "react";
import { ICustomer } from "../../../interfaces";
import { Consult } from "./paymentsDetails";

interface ICustomerProps extends ICustomer {
  CodCli: string;
}

export default function ModalDetails({
  debitsDetails,
  setModalDetailsIsOpen,
  client,
}: {
  debitsDetails: Consult;
  setModalDetailsIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  client: ICustomerProps;
}) {
  return (
    <Flex w="800px" h="600px" direction="column">
      <React.Fragment>
          <Text fontSize="2xl" fontWeight="bold" textAlign={"center"}>
            Visualização da Consulta
          </Text>
      <TableContainer overflowY="scroll" w="100%" mt="4" h={540}>
                <Table variant="simple">
                  <Thead>
                  </Thead>
                  <Tbody>
                    <Tr>
                      <Td py={2} fontSize="15"  color="black" bg="transparent" border={"2px"} fontWeight={"bold"}>
                        Nome do Cliente
                      </Td>
                      <Td py={2} fontSize="15" border={"2px"} backgroundColor={"white"}>
                        <Flex gap={2}>
                        <Text>{client.name}</Text>
                        <Text>Telefone: {client.tell} - {client.phone}</Text>
                        </Flex>
                      </Td>
                    </Tr>
                    <Tr>
                      <Td py={2} fontSize="15"  color="black" bg="transparent" border={"2px"} colSpan={1} fontWeight={"bold"}>
                        Endereço
                      </Td>
                      <Td py={2} fontSize="15" border={"2px"} backgroundColor={"white"}>
                        <Flex gap={1}>
                          <Text>{client.adress}</Text>
                          {"-"}
                          <Text>{client.neighbour}</Text>
                          {"-"}
                          <Text >{client.district}</Text>
                          {"-"}
                          <Flex gap={1} fontWeight={"bold"}>
                          <Text>CEP:</Text>
                          <Text >{client.cep}</Text>
                          </Flex>
                        </Flex>
                      </Td>
                    </Tr>
                    <Tr>
                      <Td py={2} fontSize="15"  color="black" bg="transparent" border={"2px"} colSpan={1} fontWeight={"bold"}>
                        Nome do Animal
                      </Td>
                      <Td py={2} fontSize="15" border={"2px"} backgroundColor={"white"}>
                      <Flex gap={1}>
                          <Text>{debitsDetails?.petName}</Text>
                        </Flex>
                      </Td>
                    </Tr>
                    <Tr>
                      <Td py={2} fontSize="15"  color="black" bg="transparent" border={"2px"} colSpan={1} fontWeight={"bold"}>
                        Data da Consulta
                      </Td>
                      <Td py={2} colSpan={5} border={"2px"}>
                        {
                          new Intl.DateTimeFormat("pt-BR", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit",
                          }).format(new Date(debitsDetails?.openedDate))
                        }
                      </Td>
                    </Tr>
                    <Tr>
                      <Td py={2} fontSize="15"  color="black" bg="transparent" border={"2px"} colSpan={1} fontWeight={"bold"}>
                        Veterinário
                      </Td>
                      <Td py={2} colSpan={5} border={"2px"} >
                        {
                          debitsDetails?.vetPreference
                        }
                      </Td>
                    </Tr>
                  </Tbody>
                </Table>
              </TableContainer>
              <Text fontSize="2xl" fontWeight="bold" >
            Produtos / Serviços de
          </Text>
        <TableContainer overflowY="scroll" w="100%" mt="4" h={540}>
          <Table>
            <Thead>
              <Tr>
                <Th fontSize="md">Item</Th>
                <Th fontSize="md">Valor</Th>
                <Th fontSize="md">Data</Th>
                <Th fontSize="md">Solicitado Por</Th>
              </Tr>
            </Thead>
            <Tbody>
              {debitsDetails?.consultDebits.map((debit) => (
                <Tr key={debit.id}>
                  <Td>{debit.name}</Td>
                  <Td>
                    {new Intl.NumberFormat("pt-BR", {
                      currency: "BRL",
                      style: "currency",
                    }).format(Number(debit.price))}
                  </Td>
                  <Td>
                    {new Intl.DateTimeFormat("pt-BR", {
                      day: "2-digit",
                      month: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                    }).format(new Date(debit.requestedDate))}
                  </Td>
                  <Td>{debit.RequestedByVetName}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
        <Flex w="100%" justify="end">
          <Text fontSize="xl" fontWeight="bold">
            Total:{" "}
            {new Intl.NumberFormat("pt-BR", {
              currency: "BRL",
              style: "currency",
            }).format(
              debitsDetails?.consultDebits?.reduce((acc, curr) => acc + Number(curr.price), 0)
            )}
          </Text>
        </Flex>

        <Button
          onClick={() => {
            setModalDetailsIsOpen(false);
          }}
          w="100%"
          colorScheme="whatsapp"
        >
          Fechar
        </Button>
      </React.Fragment>
      {/* ))} */}
    </Flex>
  );
}
