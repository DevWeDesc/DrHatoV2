import { AdminContainer } from "../AdminDashboard/style";
import {
  Box,
  Button,
  ChakraProvider,
  Flex,
  SimpleGrid,
  Text,
  theme,
} from "@chakra-ui/react";
import { HeaderReports } from "../../components/Reports/HeaderReports";
import { Link } from "react-router-dom";
import { SidebarRecords } from "../../components/Reports/SidebarReports";

export function Reports() {
  return (
    <ChakraProvider>
      <AdminContainer>
        <Flex direction="column" h="100vh">
          <HeaderReports title="Painel de Relatórios" />

          <Flex w="100%" my="6" maxWidth={"100%"} mx="auto" px="6">
            <SidebarRecords />
            <SimpleGrid flex="1" w="100%" align="flex-start" as={Flex}>
              <Flex
                h="84vh"
                justify="center"
                gap="5"
                maxH="44rem"
                overflow="auto"
              >
                <Flex direction="column" w="45%" gap="2">
                  <Link to="/Reports/Comission">
                    <Button colorScheme="twitter" w="100%" py="10">
                      Comissôes
                    </Button>
                  </Link>
                  <Link to="/Reports">
                    <Button colorScheme="twitter" w="100%" py="10">
                      Pagamentos Rastreàveis
                    </Button>
                  </Link>

                  <Link to="/Reports/Cashflow">
                    <Button colorScheme="twitter" w="100%" py="10">
                      Fluxo de Caixa
                    </Button>
                  </Link>

                  <Link to="/Reports/CustomerReports">
                    <Button colorScheme="twitter" w="100%" py="10">
                      Relatórios de Clientes ABC
                    </Button>
                  </Link>
                  <Link to="/Reports/ProductionVet">
                    <Button colorScheme="twitter" w="100%" py="10">
                      Produção de Veterinários
                    </Button>
                  </Link>
                  <Link to="/Reports/Specialties">
                    <Button colorScheme="twitter" w="100%" py="10">
                      Relatórios de Especialidades
                    </Button>
                  </Link>
                  <Link to="/Reports/Type/Exams">
                    <Button colorScheme="twitter" w="100%" py="10">
                      Relatórios de Exames
                    </Button>
                  </Link>
                  <Link to="/Reports/SurgeriesCompleted">
                    <Button colorScheme="twitter" w="100%" py="10">
                      Relatórios de Cirurgias Concluidas
                    </Button>
                  </Link>
                  <Link to="/Reports">
                    <Button colorScheme="twitter" w="100%" py="10">
                      Relatórios de Vacinas Não Tomadas
                    </Button>
                  </Link>
                  <Link to="/Reports/ExamsVet">
                    <Button colorScheme="twitter" w="100%" py="10">
                      Relatórios de Exames por Veterinário
                    </Button>
                  </Link>
                  <Link to="/Reports/ExamsExtern">
                    <Button colorScheme="twitter" w="100%" py="10">
                      Relatórios de Exames de clinicas e Veterinários Externos
                    </Button>
                  </Link>
                  <Link to="/Reports">
                    <Button colorScheme="twitter" w="100%" py="10">
                      Preferências
                    </Button>
                  </Link>
                  <Link to="/Reports">
                    <Button colorScheme="twitter" w="100%" py="10">
                      Relatório de Novos Clientes
                    </Button>
                  </Link>
                  <Link to="/Reports">
                    <Button colorScheme="twitter" w="100%" py="10">
                      Relatório de Vacinas por Período
                    </Button>
                  </Link>
                  <Link to="/Reports">
                    <Button colorScheme="twitter" w="100%" py="10">
                      Origem de novos Clientes
                    </Button>
                  </Link>
                  <Link to="/Reports">
                    <Button colorScheme="twitter" w="100%" py="10">
                      Frequência de Clientes
                    </Button>
                  </Link>
                  <Link to="/Reports/Type/Vets">
                    <Button colorScheme="twitter" w="100%" py="10">
                      Relatório por Veterinário 2023
                    </Button>
                  </Link>
                  <Link to="/Reports">
                    <Button colorScheme="twitter" w="100%" py="10">
                      Relatório Tabela Fato
                    </Button>
                  </Link>
                </Flex>

                <Flex direction="column" w="50%" gap="2">
                  <Link to="/Reports">
                    <Button colorScheme="twitter" w="100%" py="10">
                      Comissôes Visualizar Caixas
                    </Button>
                  </Link>
                  <Link to="/Reports/Type/FinanceSector">
                    <Button colorScheme="twitter" w="100%" py="10">
                      Relatório Financeiro por Setor
                    </Button>
                  </Link>
                  <Link to="/Reports">
                    <Button colorScheme="twitter" w="100%" py="10">
                      Relatório de Clientes
                    </Button>
                  </Link>
                  <Link to="/Reports">
                    <Button colorScheme="twitter" w="100%" py="10">
                      Relatório de Veterinários
                    </Button>
                  </Link>
                  <Link to="/Reports">
                    <Button colorScheme="twitter" w="100%" py="10">
                      Indicações de Nutrição
                    </Button>
                  </Link>
                  <Link to="/Reports">
                    <Button colorScheme="twitter" w="100%" py="10">
                      Relatorio de Procedimentos
                    </Button>
                  </Link>
                  <Link to="/Reports">
                    <Button colorScheme="twitter" w="100%" py="10">
                      Exames Concluídos
                    </Button>
                  </Link>
                  <Link to="/Reports">
                    <Button colorScheme="twitter" w="100%" py="10">
                      Relatorio de Vacinas
                    </Button>
                  </Link>
                  <Link to="/Reports">
                    <Button colorScheme="twitter" w="100%" py="10">
                      Vacinas Por Veterinário
                    </Button>
                  </Link>
                  <Link to="/Reports">
                    <Button colorScheme="twitter" w="100%" py="10">
                      Relatório de Internações por Tipo
                    </Button>
                  </Link>
                  <Link to="/Reports">
                    <Button colorScheme="twitter" w="100%" py="10">
                      Tabela de Preços
                    </Button>
                  </Link>
                  <Link to="/Reports">
                    <Button colorScheme="twitter" w="100%" py="10">
                      Relatorio de Caixa
                    </Button>
                  </Link>
                  <Link to="/Reports">
                    <Button colorScheme="twitter" w="100%" py="10">
                      Relatorio De retornos
                    </Button>
                  </Link>
                  <Link to="/Reports">
                    <Button colorScheme="twitter" w="100%" py="10">
                      Procedimentos por Veterinario
                    </Button>
                  </Link>
                  <Link to="/Reports">
                    <Button colorScheme="twitter" w="100%" py="10">
                      Relatório de Cupons
                    </Button>
                  </Link>
                  <Link to="/Reports">
                    <Button colorScheme="twitter" w="100%" py="10">
                      Alterações de tipo de evento
                    </Button>
                  </Link>
                  <Link to="/Reports">
                    <Button colorScheme="twitter" w="100%" py="10">
                      Relatório Tabela Procedimento
                    </Button>
                  </Link>
                </Flex>
              </Flex>
            </SimpleGrid>
          </Flex>
        </Flex>
      </AdminContainer>
    </ChakraProvider>
  );
}
