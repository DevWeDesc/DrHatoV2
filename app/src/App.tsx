import { ReactQueryDevtools } from 'react-query/devtools'
import {
  QueryClient,
  QueryClientProvider,
} from "react-query";
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
const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
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
    <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
