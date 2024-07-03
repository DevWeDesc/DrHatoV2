import { Text, Heading, Input, Flex, Box, Button } from "@chakra-ui/react";
import moment from "moment";
import { useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { BoxContext } from "../../contexts/BoxContext";
import { BoxProps, HistoryBoxProps } from "../../interfaces";
import { api } from "../../lib/axios";
import { GenericModal } from "../Modal/GenericModal";
import { PaymentTotalized } from "./paymentTotalized";
import { ReceveidDocuments } from "./receveidsDocuments";
import { ShowPaymentsOpenInDay } from "./showPaymentsOpenInDay";

export function ClosedBox() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { lastBox } = useContext(BoxContext);
  const [dailyBox, setDailyBox] = useState({} as HistoryBoxProps);
  const [fatherBox, setFatherBox] = useState({} as BoxProps);

  async function GetDailyBox () {
    const response = await api.get("/dailybox")
    setDailyBox(response.data)
  }
   async function getFatherBox () {
    const response = await api.get("/vetbox")
    setFatherBox(response.data)
  } 
  
  const {isLoading: isDailyBoxLoading, refetch: refetchDaily} = useQuery('dailyBox', GetDailyBox)
  const {isLoading: isFatherBoxLoading, refetch: refetchFather} = useQuery('fatherBox', getFatherBox)

  const openedDate = moment(dailyBox?.openBox).format("DD-MM-YYYY");
  function openModal() {
    setIsModalOpen(true);
  }
  function closeModal() {
    setIsModalOpen(false);
  }

 

  return (
    <Flex w="100%" justifyContent="space-between">
      <Flex direction="column" w="40%" borderRight="1px solid black">
        <Flex
          justify="space-between"
          direction="column"
          align="left"
          borderLeft="2px solid black"
          borderBottom="2px solid black"
        >
          <Heading
            bg="gray.700"
            color="white"
            size="lg"
            fontWeight="bold"
            w="100%"
            textAlign="center"
            py="5"
          >
            {fatherBox?.name} Cod Caixa: {dailyBox?.id}
          </Heading>

          <Flex
            justify="space-between"
            align="center"
            bg="gray.300"
            borderY="1px solid black"
          >
            <Text w="40%" fontSize="18" fontWeight="bold" pl="5" py="3">
              Abertura
            </Text>
            <Input
              h="51px"
              w="40%"
              defaultValue={openedDate}
              bgColor="white"
              borderX="1px solid black"
              rounded="0"
            />
          </Flex>
          <Flex
            justify="space-between"
            align="center"
            bg="gray.300"
            borderY="1px solid black"
          >
            <Text w="40%" fontSize="18" fontWeight="bold" pl="5">
              Funcionário
            </Text>
            <Input
              h="51px"
              w="40%"
              bgColor="white"
              borderX="1px solid black"
              rounded="0"
              defaultValue={dailyBox?.openBy}
            />
          </Flex>
          <Flex w="100%" align="center" bg="gray.300" borderY="1px solid black">
            <Text w="60%" fontSize="18" fontWeight="bold" pl="5">
              Dinheiro deixado pelo caixa anterior
            </Text>
            <Input
              h="51px"
              w="40%"
              defaultValue={lastBox?.totalValues}
              bgColor="white"
              borderX="1px solid black"
              rounded="0"
            />
          </Flex>
          <Flex w="100%" align="center" bg="gray.300" borderY="1px solid black">
            <Text
              w="60%"
              fontSize="18"
              fontWeight="bold"
              pl="5"
              color="blue.400"
            >
              Dinheiro para o próximo caixa
            </Text>
            <Input
              h="51px"
              w="40%"
              bgColor="white"
              value={new Intl.NumberFormat("pt-BR").format(dailyBox?.totalValues)}
              borderX="1px solid black"
              rounded="0"
            />
          </Flex>

          <Flex w="100%" align="center" bg="gray.300" borderY="1px solid black">
            <Text w="60%" fontSize="18" fontWeight="bold" pl="5">
              Devoluções
            </Text>
            <Input
              h="51px"
              w="40%"
              bgColor="white"
              borderX="1px solid black"
              rounded="0"
            />
          </Flex>
          <Flex w="100%" align="center" bg="gray.300" borderY="1px solid black">
            <Text w="60%" fontSize="18" fontWeight="bold" pl="5">
              Dinheiro retirado para despesas
            </Text>
            <Input
              h="51px"
              w="40%"
              bgColor="white"
              borderX="1px solid black"
              rounded="0"
            />
          </Flex>
          <Flex w="100%" align="center" bg="gray.300" borderY="1px solid black">
            <Text w="60%" fontSize="18" fontWeight="bold" pl="5">
              Não pago
            </Text>
            <Button
              colorScheme="yellow"
              h="51px"
              w="40%"
              borderX="1px solid black"
              rounded="0"
              onClick={() => openModal()}
            >
              VISUALIZAR
            </Button>
          </Flex>
          <Flex w="100%" align="center" bg="gray.300" borderY="1px solid black">
            <Text w="60%" fontSize="18" fontWeight="bold" pl="5">
              Total em dinheiro no caixa
            </Text>
            <Input
              value={`R$ ${parseFloat(dailyBox?.totalValues?.toString()).toFixed(
                2
              )}`}
              h="51px"
              w="40%"
              bgColor="white"
              borderX="1px solid black"
              rounded="0"
            />
          </Flex>
          <Flex w="100%" align="center" bg="gray.300" borderY="1px solid black">
            <Text w="60%" fontSize="18" fontWeight="bold" pl="5">
              Total em movimento
            </Text>
            <Input
              value={`R$ ${parseFloat(
                fatherBox?.movimentedValues?.toString()
              ).toFixed(2)}`}
              h="51px"
              w="40%"
              bgColor="white"
              borderX="1px solid black"
              rounded="0"
            />
          </Flex>
          <PaymentTotalized />
        </Flex>
      </Flex>
      <Flex w="60%" direction="column">
        <ReceveidDocuments
   
        />
      </Flex>
      <GenericModal isOpen={isModalOpen} onRequestClose={closeModal}>
        <ShowPaymentsOpenInDay />
      </GenericModal>
    </Flex>
  );
}
