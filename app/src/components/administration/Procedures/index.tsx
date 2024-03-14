import React, { useEffect } from "react";
import {
  Text,
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  HStack,
  VStack,
  Input,
  InputGroup,
  InputLeftElement,
  TableContainer,
  Grid,
} from "@chakra-ui/react";
import { useState } from "react";
import { RiAddLine, RiPencilLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { LoadingSpinner } from "../../../components/Loading";
import { api } from "../../../lib/axios";
import { toast } from "react-toastify";
import { ConfirmationDialog } from "../../dialogConfirmComponent/ConfirmationDialog";
import { BsFillTrashFill } from "react-icons/bs";

import { BiLeftArrow, BiRightArrow } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";

interface ProceduresProps {
  id: number;
  codProcedimento: number;
  name: string;
  price: string;
  priceTwo: string;
  priceThree: string;
  priceFour: string;
  categoryOld: string;
  minAge: number;
  maxAge: number;
  applicableMale: boolean;
  applicableFemale: boolean;
  applicationInterval: string | null;
  categoryProcedure: number;
  available: boolean;
  observations: string;
  group_id: number;
  sector_id: number;
  groups: number;
}

export default function ListProcedures() {
  const [loading, setLoading] = useState(false);
  const [procedures, setProcedures] = useState<ProceduresProps[]>([]);
  const [query, setQuery] = useState("");
  const [pagination, SetPagination] = useState(1);
  const [paginationInfos, setPaginationInfos] = useState({
    totalPages: 0,
    currentPage: 0,
    totalProceds: 0,
  });
  function incrementPage() {
    SetPagination((prevCount) =>
      pagination < paginationInfos.totalPages
        ? prevCount + 1
        : paginationInfos.totalPages
    );
  }

  function decrementPage() {
    SetPagination((prevCount) => (pagination > 1 ? prevCount - 1 : 1));
  }
  async function handleDeleteProcedure(Id: number | string) {
    await api
      .delete(`/procedures/${Id}`)
      .then(() => {
        toast.success("Procedimento deletado com sucesso!!");
        setLoading(true);
      })
      .catch(() => toast.error("Algo deu errado!!"));
  }

  async function getProcedure() {
    switch (true) {
      case query.length >= 1:
        const response = await api.get(
          `/procedures/query?q=${query}&page=${pagination}`
        );
        setProcedures(response.data.procedures);
        setPaginationInfos({
          currentPage: response.data.currentPage,
          totalPages: response.data.totalPages,
          totalProceds: response.data.totalProceds,
        });
        setLoading(true);
        break;
      default:
        const procedures = await api.get(`/procedures?page=${pagination}`);
        setProcedures(procedures.data.procedures);
        setPaginationInfos({
          currentPage: procedures.data.currentPage,
          totalPages: procedures.data.totalPages,
          totalProceds: procedures.data.totalProceds,
        });
        break;
    }
  }

  useEffect(() => {
    getProcedure();
  }, []);

  useEffect(() => {
    getProcedure();
  }, [pagination, query]);

  return (
    <Flex
      py={{ base: 10, xl: 0 }}
      direction="column"
      gap="4"
      w="full"
      maxH="48rem"
    >
      <Box borderRadius={8} overflow="auto">
        <Flex w="100%" direction={"column"} justify="center" align="center">
          <Heading fontSize="26px" fontWeight="bold" w="100%" mb="5">
            Procedimentos
          </Heading>
          <Flex
            mb="2"
            direction={{ base: "column", lg: "row" }}
            align="center"
            w="100%"
          >
            <Flex
              alignItems="center"
              gap={1}
              mb={{ base: 2, lg: 0 }}
              w={{ base: "full", lg: "auto" }}
            >
              <Text fontWeight="bold" fontSize={{ base: "sm", lg: "md" }}>
                Pesquisar
              </Text>
              <InputGroup
                w="-moz-fit-content"
                fontSize={{ base: "sm", lg: "md" }}
              >
                <InputLeftElement pointerEvents="none">
                  <AiOutlineSearch />
                </InputLeftElement>
                <Input
                  fontSize={{ base: "sm", lg: "md" }}
                  border="1px"
                  bgColor="white"
                  placeholder="Nome do Procedimento"
                  value={query}
                  onChange={(ev) => setQuery(ev.target.value)}
                />
              </InputGroup>
            </Flex>
            <Grid
              mx={{ base: 0, lg: 2 }}
              w="full"
              templateColumns={{ base: "repeat(2, 1fr)", lg: "repeat(5, 1fr)" }}
              alignItems="center"
              gap={2}
            >
              <Button
                fontSize={{ base: "10", lg: "sm" }}
                whiteSpace="normal"
                colorScheme="teal"
              >
                Total de Procedimentos {paginationInfos?.totalProceds}
              </Button>
              <Button
                fontSize={{ base: "10", lg: "sm" }}
                whiteSpace="normal"
                colorScheme="teal"
              >
                Páginas {paginationInfos?.totalPages}
              </Button>
              <Button
                fontSize={{ base: "10", lg: "sm" }}
                whiteSpace="normal"
                colorScheme="teal"
                gridColumn={{ base: "1/3", lg: "3" }}
              >
                Página Atual {paginationInfos?.currentPage}
              </Button>
              <Button
                fontSize={{ base: "10", lg: "sm" }}
                whiteSpace="normal"
                colorScheme="yellow"
                gap={4}
                onClick={() => decrementPage()}
              >
                <BiLeftArrow />
                Página Anterior
              </Button>
              <Button
                fontSize={{ base: "10", lg: "sm" }}
                whiteSpace="normal"
                colorScheme="yellow"
                gap={4}
                onClick={() => incrementPage()}
              >
                Próxima Página
                <BiRightArrow />
              </Button>
            </Grid>
          </Flex>

          <Link to="/Admin/Procedures/Create" style={{ width: "100%" }}>
            <Button
              as="a"
              width="100%"
              py="6"
              fontSize={{ base: "sm", lg: "md" }}
              colorScheme="whatsapp"
              leftIcon={<Icon as={RiAddLine} />}
            >
              Cadastrar novo Procedimento
            </Button>
          </Link>
          <TableContainer>
            <Table colorScheme="blackAlpha">
              <Thead>
                <Tr>
                  <Th borderColor="black">Nome</Th>
                  <Th borderColor="black">Id do Procedimento</Th>
                  <Th borderColor="black">Preço</Th>

                  <Th borderColor="black"></Th>
                </Tr>
                <Tr></Tr>
              </Thead>

              <Tbody>
                {procedures ? (
                  procedures.map((proceds) => (
                    <Tr key={proceds.id}>
                      <Td
                        fontWeight="bold"
                        fontSize={{ base: "sm", lg: "md" }}
                        borderColor="black"
                      >
                        {proceds.name}
                      </Td>
                      <Td
                        fontWeight="bold"
                        fontSize={{ base: "sm", lg: "md" }}
                        borderColor="black"
                      >
                        {proceds.id}
                      </Td>
                      <Td
                        fontWeight="bold"
                        fontSize={{ base: "sm", lg: "md" }}
                        borderColor="black"
                      >
                        {new Intl.NumberFormat("pt-BR", {
                          currency: "BRL",
                          style: "currency",
                        }).format(Number(proceds.price))}
                      </Td>

                      <Td
                        fontWeight="bold"
                        fontSize={{ base: "sm", lg: "md" }}
                        borderColor="black"
                        display="flex"
                        gap="2"
                        py="5"
                      >
                        <Link to={`/Admin/Procedures/Edit/${proceds.id}`}>
                          <Button
                            as="a"
                            size="sm"
                            fontSize="sm"
                            colorScheme="yellow"
                            leftIcon={<Icon as={RiPencilLine} />}
                          >
                            Editar Procedimento
                          </Button>
                        </Link>

                        <ConfirmationDialog
                          disabled={false}
                          icon={<BsFillTrashFill fill="white" size={16} />}
                          buttonTitle="Deletar Procedimento"
                          whatIsConfirmerd={`Tem certeza que deseja Excluir o Procedimento ${proceds.name}?`}
                          describreConfirm="Excluir o Procedimento é uma ação irreversivel, tem certeza que deseja excluir?"
                          callbackFn={() => handleDeleteProcedure(proceds.id)}
                        />
                      </Td>
                    </Tr>
                  ))
                ) : (
                  <LoadingSpinner />
                )}
              </Tbody>
            </Table>
          </TableContainer>
        </Flex>
      </Box>
    </Flex>
  );
}
