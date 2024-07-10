import React, { useState, useEffect } from "react";
import {
  Button,
  Flex,
  Input,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { api } from "../../../lib/axios";
import { toast } from "react-toastify";
interface ConsultDebitsProps {
  id: string;
  openedDate: Date;
  consultType: string;
  medicineRecordId: number;
  PetConsultsDebits: Array<{
    id: number;
    name: string;
    price: number;
    RequestedByVetName: string;
    requestedDate: Date;
    isExam: boolean;
    isSurgerie: boolean;
    isVaccine: boolean;
    isProcedure: boolean;
    isAdmission: boolean;
  }>;
  consultDebits: Array<{
    id: number;
    name: string;
    price: number;
    RequestedByVetName: string;
    requestedDate: Date;
    isExam: boolean;
    isSurgerie: boolean;
    isVaccine: boolean;
    isProcedure: boolean;
    isAdmission: boolean;
    itemId: number;
  }>;
}

interface EndConsutsProps {
  handleCloseQuery?: () => void;
  handleCloseAdmission?: () => void;
  isAdmission?: boolean;
}
export function EndConsults({
  handleCloseQuery,
  handleCloseAdmission,
  isAdmission,
}: EndConsutsProps) {
  const { id, queueId } = useParams<{ id: string; queueId: string }>();
  const [consultDebitsDetails, setConsultDebitsDetails] = useState<
    ConsultDebitsProps[]
  >([]);
  const [totalDebits, setTotalDebits] = useState({
    total: 0,
    totalWithDiscont: 0,
  });
  const [discount, setDiscount] = useState<any>("");
  const [quantityMaxDiscont, setQuantityMaxDiscont] = useState(0);

  async function getConsultDebitsDetails() {
    try {
      if (isAdmission === true) {
        const response = await api.get(`/debits/pets/admissions/${queueId}`);
        setConsultDebitsDetails(response.data.debits);
        setTotalDebits(response.data.total);
      } else {
        const response = await api.get(`/debits/pets/consults/${queueId}`);
        setConsultDebitsDetails(response.data.debits);
        setTotalDebits(response.data.total);
      }
    } catch (error) {
      toast.error("Falha ao buscar informações da consulta!");
    }
  }

  const calculateDiscont = () => {
    if (quantityMaxDiscont < 1) {
      const debitsWithDiscont =
        discount > 0
          ? totalDebits.total - (totalDebits.total * parseFloat(discount)) / 100
          : totalDebits.total;
      setTotalDebits({
        ...totalDebits,
        totalWithDiscont: debitsWithDiscont,
      });
    } else {
      toast.warning(`já foi aplicado o desconto de ${discount}%`);
    }
    setQuantityMaxDiscont((prev) => prev + 1);
  };

  const removeDiscont = () => {
    setDiscount("");
    setTotalDebits({ ...totalDebits, totalWithDiscont: 0 });
    setQuantityMaxDiscont(0);
  };

  useEffect(() => {
    getConsultDebitsDetails();
  }, []);

  return (
    <Flex w="800px" h="600px" direction="column">
      {consultDebitsDetails.map((consults) => (
        <React.Fragment key={consults.id}>
          <Flex m="2" align="center" justifyContent="space-between">
            <Text fontWeight="bold" fontSize="lg">
              {!isAdmission ? `Consulta iniciada` : `Internação iniciada`} em:{" "}
              {new Intl.DateTimeFormat("pt-BR", {
                day: "2-digit",
                month: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
              }).format(new Date(consults?.openedDate))}
            </Text>
            <Text fontWeight="bold" fontSize="lg">
              {!isAdmission
                ? `Tipo de consulta: ${consults?.consultType}`
                : `Internação`}
            </Text>
          </Flex>
          <TableContainer overflowY="scroll" w="100%" mt="4" h={540}>
            <Table>
              <Thead>
                <Tr bg="blue.400">
                  <Th colSpan={1} textColor="white" fontSize="md">
                    {isAdmission
                      ? "Custos desta Internação"
                      : "Custos desta Consulta"}
                  </Th>
                  <Th colSpan={3} textColor="white" fontSize="md">
                    <Flex justifyContent="end" gap={2} align="end">
                      <Flex direction="column" align="center">
                        <Text w="full" fontSize="sm">
                          Desconto
                        </Text>
                        <Input
                          value={discount}
                          onChange={(ev) => setDiscount(ev.target.value)}
                          bg="white"
                          textColor="black"
                        />
                      </Flex>
                      <Button colorScheme="whatsapp" onClick={calculateDiscont}>
                        Calcular
                      </Button>
                      <Button colorScheme="red" onClick={removeDiscont}>
                        Remover Desconto
                      </Button>
                    </Flex>
                  </Th>
                </Tr>

                <Tr>
                  <Th fontSize="md">Item</Th>
                  <Th fontSize="md">Valor</Th>
                  <Th fontSize="md">Data</Th>
                  <Th fontSize="md">Solicitado Por</Th>
                </Tr>
              </Thead>
              <Tbody>
                {!isAdmission
                  ? consults?.consultDebits?.map((item) => (
                      <Tr key={item.id}>
                        <Td>{item.name}</Td>
                        <Td>
                          {new Intl.NumberFormat("pt-BR", {
                            currency: "BRL",
                            style: "currency",
                          }).format(item.price)}
                        </Td>
                        <Td>
                          {new Intl.DateTimeFormat("pt-BR", {
                            day: "2-digit",
                            month: "2-digit",
                            hour: "2-digit",
                            minute: "2-digit",
                          }).format(new Date(item?.requestedDate))}
                        </Td>
                        <Td>{item.RequestedByVetName}</Td>
                      </Tr>
                    ))
                  : consults?.consultDebits?.map((item) => (
                      <Tr key={item.id}>
                        <Td>{item.name}</Td>
                        <Td>
                          {new Intl.NumberFormat("pt-BR", {
                            currency: "BRL",
                            style: "currency",
                          }).format(item.price)}
                        </Td>
                        <Td>
                          {new Intl.DateTimeFormat("pt-BR", {
                            day: "2-digit",
                            month: "2-digit",
                            hour: "2-digit",
                            minute: "2-digit",
                          }).format(new Date(item?.requestedDate))}
                        </Td>
                        <Td>{item.RequestedByVetName}</Td>
                      </Tr>
                    ))}
              </Tbody>
            </Table>
          </TableContainer>
          <Text m="2" fontWeight="bold">
            Total:{" "}
            {new Intl.NumberFormat("pt-BR", {
              currency: "BRL",
              style: "currency",
            }).format(
              Number(
                quantityMaxDiscont > 0
                  ? totalDebits.totalWithDiscont
                  : totalDebits.total
              )
            )}
          </Text>
          <Button
            onClick={()=> {
              if(totalDebits.total === 0){
                return toast.error("Não é possível finalizar a consulta sem nenhum item adicionado.")
              }
              const addedQueryValidation = consultDebitsDetails.some((debits)=> debits.consultDebits.some((item)=> item.itemId === 1))
              
              if(!addedQueryValidation){
               return toast.error("É necessario ter uma consulta adicionada.")
              }
              
              isAdmission ? handleCloseAdmission?.() : handleCloseQuery?.()
            }}
            w="100%"
            colorScheme="whatsapp"
          >
            {!isAdmission ? "Finalizar Consulta" : "Encerrar internação"}
          </Button>
        </React.Fragment>
      ))}
    </Flex>
  );
}
