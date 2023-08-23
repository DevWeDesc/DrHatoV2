import { Outlet } from "react-router-dom";
import { LayoutContainer } from "./styles";
import ChatBot from "../components/chatBot";
import { ChakraProvider } from "@chakra-ui/react";

export function DefaultLayout() {
  return (
    <LayoutContainer>
      <Outlet />
      <ChakraProvider>
        <ChatBot></ChatBot>
      </ChakraProvider>
    </LayoutContainer>
  );
}
