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

export default function ListProcedures() {
  //const { procedures, groups } = useContext(DbContext);
  const { register, handleSubmit } = useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenTwo, setIsModalOpenTwo] = useState(false);
  const [loading, setLoading] = useState(false);
  const [procedures, setProcedures] = useState([]);
  const navigate = useNavigate();

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
    const procedures = await api.get("/procedures");
    setProcedures(procedures.data);
  }

  useEffect(() => {
    getProcedure();
  }, []);

  useEffect(() => {
    if (loading === true) {
      getProcedure();
      setLoading(false);
    }
  }, [loading]);

  console.log(procedures);
  return (
    <Box
      flex="1"
      borderRadius={8}
      bg="gray.200"
      p="8"
      w="100%"
      maxH="44rem"
      overflow="auto"
    >
      <Flex
        mb="8"
        justify="space-between"
        direction="column"
        align="center"
        w="100%"
      >
        <Heading fontSize="30" fontWeight="bold" w="100%" mb="5">
          Procedimentos
        </Heading>

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
            <Th fontSize="18" borderColor="black">
              Setor
            </Th>
            <Th fontSize="18" borderColor="black">
              Grupo
            </Th>

            <Th borderColor="black"></Th>
          </Tr>
          <Tr></Tr>
        </Thead>

        <Tbody>
          {procedures ? (
            procedures.map((proceds: ProceduresData) => (
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
                  }).format(proceds.price)}
                </Td>
                <Td borderColor="black">{proceds.sector?.name}</Td>
                <Td borderColor="black">{proceds.groups.name}</Td>

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
                  {/* <Button
                    as="a"
                    size="sm"
                    fontSize="sm"
                    colorScheme="red"
                    leftIcon={<Icon as={RiPencilLine} />}
                    onClick={() => handleDeleteProcedure(proceds.id)}
                  >
                    Deletar Procedimento
                  </Button> */}
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
