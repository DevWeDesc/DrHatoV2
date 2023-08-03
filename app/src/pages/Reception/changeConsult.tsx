import { ChakraProvider, Flex } from "@chakra-ui/react";
import { ReceptionSidebar } from "../../components/Sidebars/ReceptionBar";
import { QueueSistem } from "../../queue";
import { Header } from "../../components/admin/Header";
import { GenericLink } from "../../components/Sidebars/GenericLink";
import { GenericSidebar } from "../../components/Sidebars/GenericSideBar";
import { AiFillEdit } from "react-icons/ai";
import { FaUserPlus } from "react-icons/fa";
import { BiCalendarPlus } from "react-icons/bi";

export function ChangeConsult() {
  return (
    <ChakraProvider>
      <Flex direction="column" h="100vh">
        <Header title="Alteração de Consulta" url="/Recepcao" />
        <Flex w="100%" my="6" maxWidth={1680} mx="auto" px="6">
          <GenericSidebar>
            <GenericLink
              name="Cadastro de Consulta"
              icon={BiCalendarPlus}
              path={`/Recepcao/Consultas`}
            />
            <GenericLink
              name="Cadastro de Clientes"
              icon={FaUserPlus}
              path={`/Recepcao/Create`}
            />{" "}
          </GenericSidebar>

          <QueueSistem />
        </Flex>
      </Flex>
    </ChakraProvider>
  );
}
