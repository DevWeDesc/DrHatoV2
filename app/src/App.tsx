import { ThemeProvider } from "styled-components";
import { BrowserRouter } from "react-router-dom";
import { defaultTheme } from "./styles/themes/default";
import { GlobalStyle } from "./styles/global";
import { Router } from "./Router";

import { DbContextProvider } from "./contexts/DbContext";
import { ChakraProvider } from "@chakra-ui/react";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <ChakraProvider theme={defaultTheme}>
      <DbContextProvider>
        <ThemeProvider theme={defaultTheme}>
          <GlobalStyle />

            <BrowserRouter>
              <Router />
            </BrowserRouter>
            <ToastContainer autoClose={3000} />
   
        </ThemeProvider>
      </DbContextProvider>
    </ChakraProvider>
  );
}

export default App;
