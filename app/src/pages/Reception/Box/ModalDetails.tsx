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
} from "@chakra-ui/react";
import React from "react";

interface PetConsultsDebits {
  id: number;
  name?: string;
  price?: string;
  sectorId?: number;
  itemId?: number;
  isAdmissions?: boolean;
  isExam?: boolean;
  isSurgerie?: boolean;
  isVaccine?: boolean;
  isProcedure?: boolean;
  isAdmission?: boolean;
  requestedByVetId?: number;
  RequestedByVetName?: string;
  requestedDate: Date;
  consultOpenedId?: string;
  surgerieOpenedId?: string;
  openedConsultsForPetId?: string;
  openedAdmissionsForPetId?: string;
}

export default function ModalDetails({
  debitsDetails,
  setModalDetailsIsOpen,
}: {
  debitsDetails: PetConsultsDebits[];
  setModalDetailsIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <Flex w="800px" h="600px" direction="column">
      <React.Fragment>
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
              {debitsDetails?.map((debit) => (
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
              debitsDetails.reduce((acc, curr) => acc + Number(curr.price), 0)
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
