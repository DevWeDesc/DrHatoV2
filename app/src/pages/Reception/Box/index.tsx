import {
  Text,
  ChakraProvider,
  Flex,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { AdminContainer } from "../../AdminDashboard/style";
import {  TbReportMoney } from "react-icons/tb";
import { Header } from "../../../components/admin/Header";
import { GenericLink } from "../../../components/Sidebars/GenericLink";
import { GenericSidebar } from "../../../components/Sidebars/GenericSideBar";
import { AiFillEdit } from "react-icons/ai";
import { BiCalendarPlus } from "react-icons/bi";
import { AiFillPrinter } from "react-icons/ai";
import { TbCashBanknoteOff } from "react-icons/tb";
import { OpenedBox } from "../../../components/Box/openedBox";
import { useContext, useState, useEffect } from "react";
import { ConfirmationDialog } from "../../../components/dialogConfirmComponent/ConfirmationDialog";
import { api } from "../../../lib/axios";
import { toast } from "react-toastify";
import { BoxContext } from "../../../contexts/BoxContext";

export function BoxReception() {
  const {fatherBox,dailyBox, setReloadData} = useContext(BoxContext)
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") as string);
  async function handleCloseBox() {
    try {
      const data = {
        entryValues: 1000, 
        exitValues: 500, 
        closedBy: user.username
      }
      await api.put(`/closehistbox/${fatherBox.id}/${dailyBox.id}`, data).then(() => {
        setReloadData(true)
        navigate("/Recepcao")
        toast.success("Caixa fechado com sucesso!")
      })
    
    } catch (error) {
      toast.error("Falha no fechamento de caixa")
    }
  }

  return (
    <ChakraProvider>
      <AdminContainer>
        <Flex direction="column">
          <Header title="Caixa" url="/Recepcao" />
          <Flex w="100%" maxWidth={1680} mx="auto" px="6">
            <GenericSidebar>
              <GenericLink
                name="Pagamentos"
                icon={BiCalendarPlus}
                path={`/Recepcao/Caixa/Pagamentos`}
              />
              <GenericLink
                name="Devoluções"
                icon={AiFillEdit}
                path={`/Recepcao/Caixa/Returns`}
              />
              <Text fontWeight="bold" fontSize="2xxl" mt="6">
                OPÇÕES DO CAIXA
              </Text>
               <ConfirmationDialog 
                disabled={false}  
                buttonTitle="Fechar caixa" 
                icon={< TbReportMoney size={28}/>}  
                whatIsConfirmerd="Tem certeza que vai fechar o caixa?"
                describreConfirm="Fechar o caixa registra todos valores de entrada e saída da data de hoje, sendo uma operação irreversivel que ficará salva no histórico."
                callbackFn={() => handleCloseBox()}
               />
              <GenericLink
                name="Despesas"
                icon={TbCashBanknoteOff}
                path={`/Recepcao/Caixa/Despesas`}
              />
              <GenericLink
                name="Imprimir"
                icon={AiFillPrinter}
                //path={`/Recepcao/Change`}
              />
            </GenericSidebar>
            {/* <Sidebar /> */}

           <OpenedBox/> 
            

          
           
          </Flex>
        </Flex>
      </AdminContainer>
    </ChakraProvider>
  );
}
