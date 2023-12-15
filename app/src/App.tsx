import { ThemeProvider } from "styled-components";
import { BrowserRouter } from "react-router-dom";
import { defaultTheme } from "./styles/themes/default";
import { GlobalStyle } from "./styles/global";
import { DbContextProvider } from "./contexts/DbContext";
import { ChakraProvider } from "@chakra-ui/react";
import { ToastContainer } from "react-toastify";
import { Router } from "./Router";
import { BoxContextProvider } from "./contexts/BoxContext";
import { ModalProvider } from "./hooks/useModal";

function App() {
  return (
    <ChakraProvider theme={defaultTheme}>
      <DbContextProvider>
        <BoxContextProvider>
          <ModalProvider>
        <ThemeProvider theme={defaultTheme}>
          <GlobalStyle />
          <BrowserRouter>
            <Router />
          </BrowserRouter>
          <ToastContainer autoClose={3000} />
        </ThemeProvider>
        </ModalProvider>
        </BoxContextProvider>
      </DbContextProvider>
    </ChakraProvider>
  );
}

export default App;
