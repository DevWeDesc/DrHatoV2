import {
  Text,
  Flex,
  Box,
  SimpleGrid,
  ChakraProvider,
  Button
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

import { ReceptionSidebar } from "../../components/Sidebars/ReceptionBar";
import { GridContainer } from "./styles";

export function Reception() {
  return (
    <ChakraProvider>

      <Flex direction="column" h="100vh">
        <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
          <ReceptionSidebar />
          <SimpleGrid
            flex="1"
            gap="4"
            minChildWidth="320px"
            align="flex-start"
            as={Flex}
          >
            <Box textAlign="center"  p="8" bg="gray.100" borderRadius={8}>
                <Text fontSize={32} fontWeight="bold" fontStyle="oblique">
                  RECEPÇÃO GERAL
                </Text>  
         
              <Flex mt="8" justify="center" direction="column">
               <GridContainer>
                <div className="section-1">
                  <div className="container">
                    <div className="imgContainer">
                    <img src="https://images.unsplash.com/photo-1519494140681-8b17d830a3e9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=874&q=80" alt="" />
                    <h1>Consultas</h1>

                    </div>
                   
                    <div className="buttonsContainer">
                      <Link to="/Recepcao/Consultas"><Button minWidth={200} colorScheme="whatsapp" >Nova Consulta</Button></Link>
                      <Button colorScheme="whatsapp" >Alterar Consulta</Button>
                      <Link to="/Recepcao/Create"><Button colorScheme="whatsapp" >Cadastro de Clientes</Button></Link>
                    </div>
                  </div>
                </div>
                <div className="section-2">
                <div className="container">
                    <div className="imgContainer">
                    <img src="https://images.unsplash.com/photo-1583902340370-6a3fc847d373?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=403&q=80" alt="" />
                    <h1>Caixas e pagamentos</h1>

                    </div>
                   
                    <div className="buttonsContainer">
                      <Button minWidth={200} colorScheme="whatsapp" >Caixa</Button>
                      <Button colorScheme="whatsapp" >Reimprimir Caixa</Button>
                      <Button colorScheme="whatsapp" >Pagamentos</Button>
                      <Button colorScheme="whatsapp" >Devoluções</Button>
                    </div>
                  </div>
                </div>
                <div className="section-3">
                <div className="container">
                    <div className="imgContainer">
                    <img src="https://images.unsplash.com/reserve/oIpwxeeSPy1cnwYpqJ1w_Dufer%20Collateral%20test.jpg?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=715&q=80" alt="" />
                    <h1>Ferramentas</h1>

                    </div>
                   
                    <div className="buttonsContainer">
                      <Button minWidth={200} colorScheme="whatsapp">Tabela de Preços</Button>
                      <Button colorScheme="whatsapp" >Trocar Senha</Button>
                      <Button colorScheme="whatsapp" >Autorizações</Button>
                      <Button colorScheme="whatsapp" >Medicamentos</Button>
                    </div>
                  </div>
                  
                </div>
                <div className="section-4">
                <div className="container">
                    <div className="imgContainer">
                    <img src="https://images.unsplash.com/photo-1518152006812-edab29b069ac?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" alt="" />
                    <h1>Internações e Exames</h1>

                    </div>
                   
                    <div className="buttonsContainer">
                      <Button minWidth={200} colorScheme="whatsapp">Internações</Button>
                      <Button colorScheme="whatsapp" >Exames</Button>
                      <Button colorScheme="whatsapp" >Vacinas</Button>
                    
                    </div>
                  </div>
                </div>
                <div className="section-5">

                <div className="container">
                    <div className="imgContainer">
                    <img src="https://images.unsplash.com/photo-1515847049296-a281d6401047?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" alt="" />
                    <h1>Administração</h1>

                    </div>
                   
                    <div className="buttonsContainer">
                      <Button minWidth={200} colorScheme="whatsapp">Financeiro</Button>
                      <Button colorScheme="whatsapp" >Cadastro de Clinicas</Button>
                      <Button colorScheme="whatsapp" >Cadastro de Raças</Button>
                    
                    </div>
                  </div>
                </div>

               </GridContainer>
              </Flex>

            </Box>

          </SimpleGrid>
        </Flex>
      </Flex>
    </ChakraProvider>
  );
}
