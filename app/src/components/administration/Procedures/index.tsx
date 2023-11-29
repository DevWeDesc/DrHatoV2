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
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { RiAddLine, RiPencilLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { LoadingSpinner } from "../../../components/Loading";
import { DbContext } from "../../../contexts/DbContext";
import { api } from "../../../lib/axios";
import { toast } from "react-toastify";
import { ConfirmationDialog } from "../../dialogConfirmComponent/ConfirmationDialog";
import { BsFillTrashFill } from "react-icons/bs";
import { ProceduresData } from "../../../interfaces";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";

interface ProceduresProps {
  id: number;
	codProcedimento: number;
	name: string;
	price: string;
	priceTwo: string
	priceThree: string;
	priceFour: string;
	categoryOld: string;
	minAge: number,
	maxAge: number,
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
  const [pagination, SetPagination] = useState(1)
  const [paginationInfos, setPaginationInfos] = useState({
    totalPages: 0,
    currentPage: 0,
    totalProceds: 0
  })
  function incrementPage() {
    SetPagination(prevCount => pagination < paginationInfos.totalPages ? prevCount + 1 : paginationInfos.totalPages);
  }

  function decrementPage() {
    SetPagination(prevCount => pagination > 1 ? prevCount - 1 : 1);
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
    const procedures = await api.get(`/procedures?page=${pagination}`);
    setProcedures(procedures.data.procedures);
    setPaginationInfos({
      currentPage: procedures.data.currentPage,
      totalPages: procedures.data.totalPages,
      totalProceds: procedures.data.totalProceds
    })
  }

  useEffect(() => {
    getProcedure();
  }, [pagination]);

  useEffect(() => {
    if (loading === true) {
      getProcedure();
      setLoading(false);
    }
  }, [loading]);

  return (
    <Box
      flex="1"
      borderRadius={8}
      bg="gray.200"
      p="8"
      w="100%"
      maxH="65rem"
      overflow="auto"
    >
      <Flex
        mb="8"
        
        direction="column"
        align="center"
        w="100%"
      >
        <Flex w="100%" h="180px" align="center">
        <Heading fontSize="30" fontWeight="bold" w="100%" mb="5">
          Procedimentos
        </Heading>
        <HStack>
        <Button colorScheme="teal">Total de Procedimentos {paginationInfos?.totalProceds}</Button>
        <Button colorScheme="teal">Páginas {paginationInfos?.totalPages}</Button>
        <Button colorScheme="teal">Página Atual {paginationInfos?.currentPage}</Button>
        <Button colorScheme="yellow" gap={4} onClick={() => decrementPage()} >
                  <BiLeftArrow/>
                  Página Anterior
                </Button>
                <Button colorScheme="yellow" gap={4} onClick={() => incrementPage()}>
                  Próxima Página
                  <BiRightArrow/>
                </Button>
        </HStack>
        </Flex>
    
    
       

        <Link to="/Admin/Procedures/Create" style={{ width: "100%" }}>
          <Button
            as="a"
            width="100%"
            py="8"
            fontSize="20"
            colorScheme="whatsapp"
            leftIcon={<Icon as={RiAddLine} />}
          >
            Cadastrar novo Procedimento
          </Button>
        </Link>
      </Flex>

      <Table colorScheme="blackAlpha">
        <Thead>
          <Tr>
            <Th fontSize="18" borderColor="black">
              Nome
            </Th>
            <Th fontSize="18" borderColor="black">
              Id do Procedimento
            </Th>
            <Th fontSize="18" borderColor="black">
              Preço
            </Th>
          

            <Th borderColor="black"></Th>
          </Tr>
          <Tr></Tr>
        </Thead>

        <Tbody>
          {procedures ? (
            procedures.map((proceds) => (
              <Tr key={proceds.id}>
                <Td borderColor="black">
                  <Text fontWeight="bold" color="gray.800">
                    {proceds.name}
                  </Text>
                </Td>
                <Td borderColor="black">{proceds.id}</Td>
                <Td borderColor="black">
                  {new Intl.NumberFormat("pt-BR", {
                    currency: "BRL",
                    style: "currency",
                  }).format(Number(proceds.price))}
                </Td>
               

                <Td borderColor="black" display="flex" gap="2" py="5">
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
                    whatIsConfirmerd="Tem certeza que deseja Excluir esse Procedimento?"
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
    </Box>
  );
}
