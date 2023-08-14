import {
  Text,
  Flex,
  Box, Button
} from "@chakra-ui/react";
import { useState, Suspense, useContext, useEffect } from "react";
import { toast } from "react-toastify";
import { BoxContext } from "../../contexts/BoxContext";
import { api } from "../../lib/axios";
import { LoadingSpinner } from "../Loading";
import { ClosedBox } from "./closedBox";
export function OpenedBox() {
  const {dailyBox, fatherBox,setReloadData, boxIsOpen } = useContext(BoxContext)
  const user = JSON.parse(localStorage.getItem("user") as string);

  
  async function handleOpenBox() {
    try {
      const data = {
        entryValues: 1000,
        exitValues: 500,
        openBy: user.username,
      };
      await api
        .post(`/openhistbox/${fatherBox.id}`, data)
        toast.success("Caixa aberto com sucesso");
        setReloadData(true);
          
    } catch (error) {
      toast.error("Falha ao abrir caixa!");
      console.log(error);
    }
  }


  
  return (
    <>
      { boxIsOpen || dailyBox?.boxIsOpen === true ? (
        <Suspense fallback={<LoadingSpinner/>} >
          <ClosedBox />
        </Suspense>
      ) : (
        <Box flex="1" borderRadius={8} bg="gray.200" w="100%">
          <Flex
            direction="column"
            align="center"
            justify="center"
            w="100%"
            h="100%"
          >
            <Text>
              Não existe caixa aberto no momento, abra um novo caixa para
              prosseguir!
            </Text>
            <Button mt="4" onClick={handleOpenBox} colorScheme="whatsapp">
              ABRIR CAIXA
            </Button>
          </Flex>
        </Box>
      )}
    </>
  );
}
