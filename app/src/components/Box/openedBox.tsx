import {
  Text,
  Flex,
  Box, Button
} from "@chakra-ui/react";
import { useState } from "react";
import { QueryClient, useQuery } from "react-query";
import { toast } from "react-toastify";
import { BoxProps, HistoryBoxProps } from "../../interfaces";
import { api } from "../../lib/axios";
import { LoadingSpinner } from "../Loading";
import { ClosedBox } from "./closedBox";
export function OpenedBox() {
  const user = JSON.parse(localStorage.getItem("user") as string);
  const [dailyBox, setDailyBox] = useState({} as HistoryBoxProps);
  const [fatherBox, setFatherBox] = useState({} as BoxProps);
  const queryClient = new QueryClient()
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
  
  async function handleOpenBox() {
    try {
      const data = {
        entryValues: 1000,
        exitValues: 500,
        openBy: user.username,
      };
      await api.post(`/openhistbox/${fatherBox?.id}`, data)
      refetchFather()
      refetchDaily()
      queryClient.invalidateQueries(['dailyBox', 'fatherBox'])
      toast.success("Caixa aberto com sucesso")
    } catch (error) {
      toast.error("Falha ao abrir caixa!");
      console.log(error);
    }
  }



  
  if(isDailyBoxLoading || isFatherBoxLoading) {
    return <LoadingSpinner/>
  }

  let boxShow;
  switch(dailyBox?.boxIsOpen) {
    case dailyBox?.boxIsOpen === true:
      boxShow =  <ClosedBox />
      break;
    default: 
      boxShow = (
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
      )
    break;

  }

  
  return (
    <>
     {
boxShow
     }
    </>
  );
}
