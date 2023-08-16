import { Header } from "../../components/Header";
import { Button, ChakraProvider, useConst } from "@chakra-ui/react";
import { HomeContainer } from "./style";
import { AsideMenu } from "../../components/AsideMenu";
import { PlantVetTable } from "../../components/Tables/PlantVetTable";
import { CardsMenu } from "../../components/CardsMenu";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";

export function Home() {
  const navigate = useNavigate();
  const { token }: any = useContext(AuthContext);

  function Redirect() {
    navigate("/");
  }
  //if (token != undefined && token != null && token === Cookies.get("token")) {
  return (
    <ChakraProvider>
      <Header />
      <HomeContainer>
        <div className="section-1">
          <AsideMenu />{" "}
          <Alert
            cursor="pointer"
            status="warning"
            variant="subtle"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            w="400px"
          >
            <AlertIcon boxSize="40px" mr={0} />
            <AlertTitle mt={4} mb={1} fontSize="lg">
              Lembrete de Tarefa XYZ
            </AlertTitle>
            <AlertDescription maxWidth="lg">
              <Text my="2" fontWeight="bold">
                {" "}
                Para entrar na consulta, basta clicar <br /> no nome do
                cliente!!
              </Text>
              <TableContainer>
                <Table variant="simple" w="100%">
                  <Thead>
                    <Tr>
                      <Th>Cliente</Th>
                      <Th>Data</Th>
                      <Th>Retorno</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    <Tr>
                      <Td>Vinicius</Td>
                      <Td>15/08/2023</Td>
                      <Td>Consulta Especial</Td>
                    </Tr>
                  </Tbody>
                </Table>
              </TableContainer>
            </AlertDescription>
          </Alert>
        </div>
        <div className="section-2">
          <div className="cards">
            <CardsMenu />
          </div>
        </div>
        <div className="section-3"></div>
      </HomeContainer>
    </ChakraProvider>
  );
  /*} else {
    return Redirect();
  }*/
}
