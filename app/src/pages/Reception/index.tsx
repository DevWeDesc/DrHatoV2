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
import { motion } from "framer-motion";
import { Header } from "../../components/admin/Header";

export function Reception() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <ChakraProvider>
        <Flex direction="column" h="100vh">
          <Header title="Menu Recepção" url="/Home/" />
          <Flex w="100%" my="6" maxWidth={1680} mx="auto" px="6">
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
                p="8"
                bg="gray.100"
                maxH="44rem"
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
                            <Button minWidth={200} colorScheme="whatsapp">
                              Nova Consulta
                            </Button>
                          </Link>
                          <Link to="/Recepcao/Change">
                            <Button minWidth={200} colorScheme="whatsapp">
                              Alterar Consulta
                            </Button>
                          </Link>

                          <Link to="/Recepcao/Create">
                            <Button minWidth={200} colorScheme="whatsapp">
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
                            <Button minWidth={200} colorScheme="whatsapp">
                              Caixa
                            </Button>
                          </Link>
                          <Button colorScheme="whatsapp">
                            Reimprimir Caixa
                          </Button>
                          <Link to="/Recepcao/Caixa/Pagamentos">
                            <Button colorScheme="whatsapp" minWidth={200}>
                              Pagamentos
                            </Button>
                          </Link>
                          <Link to="/Recepcao/Caixa/Returns">
                            <Button minWidth={200} colorScheme="whatsapp">
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
                            <Button minWidth={200} colorScheme="whatsapp">
                              Tabela de Preços
                            </Button>
                          </Link>
                          <Link to={`/Recepcao/Ferramentas/TrocaDeSenha/${1}`}>
                            <Button minWidth={200} colorScheme="whatsapp">
                              Trocar Senha
                            </Button>
                          </Link>
                          <Link to="/Recepcao/Ferramentas/Autorizacao">
                            <Button minWidth={200} colorScheme="whatsapp">
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
                            <Button minWidth={200} colorScheme="whatsapp">
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
                            <Button minWidth={200} colorScheme="whatsapp">
                              Internações
                            </Button>
                          </Link>
                          <Link to="/Labs/Exames">
                            <Button minWidth={200} colorScheme="whatsapp">
                              Exames
                            </Button>
                          </Link>
                          <Link to="/Recepcao/Internacoes/Vacinas">
                            <Button minWidth={200} colorScheme="whatsapp">
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
                            <Button minWidth={200} colorScheme="whatsapp">
                              Financeiro
                            </Button>
                          </Link>
                          <Link to="/Recepcao/RegistroClinicas">
                            <Button minWidth={200} colorScheme="whatsapp">
                              Cadastro de Clinicas
                            </Button>
                          </Link>
                          <Link to="/Recepcao/CadastroRaças">
                            <Button minWidth={200} colorScheme="whatsapp">
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
    </motion.div>
  );
}
