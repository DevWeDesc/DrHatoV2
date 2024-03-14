import {
  Text,
  Flex,
  Box,
  SimpleGrid,
  ChakraProvider,
  Button,
} from "@chakra-ui/react";
import { Link, Navigate } from "react-router-dom";

import { ReceptionSidebar } from "../../components/Sidebars/ReceptionBar";
import { GridContainer } from "./styles";
import ImgConsults from "../../assets/ConsultAnimal.jpg";
import Tools from "../../assets/ImgTools2.png";
import Pagaments from "../../assets/Pagaments.jpg";
import Exams from "../../assets/Exams.jpg";
import Administration from "../../assets/Administration.jpg";
import { Header } from "../../components/admin/Header";

export function Reception() {
  return (
    <ChakraProvider>
      <Flex direction="column" h="100vh">
        <Header title="Menu Recepção" url="/Home/" />
        <Flex
          w="100%"
          my={{ lg: "6" }}
          direction={{ base: "column", lg: "row" }}
          mx="auto"
          px={{ lg: "6" }}
        >
          <ReceptionSidebar />
          <SimpleGrid
            flex="1"
            gap="4"
            minChildWidth="320px"
            align="flex-start"
            as={Flex}
          >
            <Box
              textAlign="center"
              p={{ lg: "8" }}
              maxH={{ lg: "44rem" }}
              overflow="auto"
              borderRadius={8}
            >
              <Text fontSize={32} fontWeight="bold" fontStyle="oblique">
                RECEPÇÃO GERAL
              </Text>

              <Flex mt="8" justify="center" direction="column">
                <GridContainer>
                  <div className="section-1">
                    <div className="container">
                      <div className="imgContainer">
                        <img src={ImgConsults} alt="" />
                        <h1>Consultas</h1>
                      </div>

                      <div className="buttonsContainer">
                        <Link to="/Recepcao/Consultas">
                          <Button w="full" colorScheme="whatsapp">
                            Nova Consulta
                          </Button>
                        </Link>
                        <Link to="/Recepcao/Change">
                          <Button w="full" colorScheme="whatsapp">
                            Alterar Consulta
                          </Button>
                        </Link>

                        <Link to="/Recepcao/Create">
                          <Button w="full" colorScheme="whatsapp">
                            Cadastro de Clientes
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="section-2">
                    <div className="container">
                      <div className="imgContainer">
                        <img src={Pagaments} alt="" />
                        <h1>Caixas e pagamentos</h1>
                      </div>

                      <div className="buttonsContainer">
                        <Link to="/Recepcao/Caixa">
                          <Button w="full" colorScheme="whatsapp">
                            Caixa
                          </Button>
                        </Link>
                        <Button colorScheme="whatsapp">Reimprimir Caixa</Button>
                        <Link to="/Recepcao/Caixa/Pagamentos">
                          <Button colorScheme="whatsapp" w="full">
                            Pagamentos
                          </Button>
                        </Link>
                        <Link to="/Recepcao/Caixa/Returns">
                          <Button w="full" colorScheme="whatsapp">
                            Devoluções
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="section-3">
                    <div className="container">
                      <div className="imgContainer">
                        <img src={Tools} alt="" />
                        <h1>Ferramentas</h1>
                      </div>

                      <div className="buttonsContainer">
                        <Link to="/Recepcao/Ferramentas/Tabela">
                          <Button w="full" colorScheme="whatsapp">
                            Tabela de Preços
                          </Button>
                        </Link>
                        <Link to={`/Recepcao/Ferramentas/TrocaDeSenha/${1}`}>
                          <Button w="full" colorScheme="whatsapp">
                            Trocar Senha
                          </Button>
                        </Link>
                        <Link to="/Recepcao/Ferramentas/Autorizacao">
                          <Button w="full" colorScheme="whatsapp">
                            Autorizações
                          </Button>
                        </Link>
                        <Link
                          to="/Medicines"
                          onClick={() => {
                            localStorage.setItem(
                              "origem",
                              window.location.pathname
                            );
                          }}
                        >
                          <Button w="full" colorScheme="whatsapp">
                            Medicamentos
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="section-4">
                    <div className="container">
                      <div className="imgContainer">
                        <img src={Exams} alt="" />
                        <h1>Internações e Exames</h1>
                      </div>

                      <div className="buttonsContainer">
                        <Link to="/Admissions">
                          <Button w="full" colorScheme="whatsapp">
                            Internações
                          </Button>
                        </Link>
                        <Link to="/Labs/Exames">
                          <Button w="full" colorScheme="whatsapp">
                            Exames
                          </Button>
                        </Link>
                        <Link to="/Recepcao/Internacoes/Vacinas">
                          <Button w="full" colorScheme="whatsapp">
                            Vacinas
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="section-5">
                    <div className="container">
                      <div className="imgContainer">
                        <img src={Administration} alt="" />
                        <h1>Administração</h1>
                      </div>

                      <div className="buttonsContainer">
                        <Link to="/Recepcao/Finance">
                          <Button w="full" colorScheme="whatsapp">
                            Financeiro
                          </Button>
                        </Link>
                        <Link to="/Recepcao/RegistroClinicas">
                          <Button w="full" colorScheme="whatsapp">
                            Cadastro de Clinicas
                          </Button>
                        </Link>
                        <Link to="/Recepcao/CadastroRaças">
                          <Button w="full" colorScheme="whatsapp">
                            Cadastro de Raças
                          </Button>
                        </Link>
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
