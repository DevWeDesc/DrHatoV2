import {
  Text,
  Box,
  Button,
  ChakraProvider,
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
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { RiAddLine, RiPencilLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { Header } from "../../components/admin/Header";
import { Paginaton } from "../../components/admin/Pagination";
import { Sidebar } from "../../components/admin/Sidebar";
import { LoadingSpinner } from "../../components/Loading";
import { DbContext } from "../../contexts/DbContext";
import { GenericModal } from "../../components/Modal/GenericModal";
import { AdminContainer } from "../AdminDashboard/style";
import { CreateProcedureForm } from "../../components/Forms/CreateProcedureForm";
import { api } from "../../lib/axios";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

export function ProceduresList() {
  const { procedures, groups } = useContext(DbContext);
  const { register, handleSubmit } = useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenTwo, setIsModalOpenTwo] = useState(false);
  const navigate = useNavigate();

  async function handleDeleteProcedure(id: string | number) {
    const confirm = window.confirm(
      `DELETAR E UMA OPERAÇÃO IRREVERSIVEL\N TEM CERTEZA QUE DESEJA CONTINUAR?`
    );
    try {
      if (confirm === true) {
        await api.delete(`procedures/${id}`);
        navigate(0);
      }
      toast.warning("Procedimento Deletado!");
    } catch (error) {
      toast.error("Falha ao deletar Procedimento");
      console.log(error);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <ChakraProvider>
        <AdminContainer>
          <Flex direction="column" h="100vh">
            <Header title="Procedimentos" url="/Admin/" />

            <Flex w="100%" my="6" maxWidth={1680} mx="auto" px="6">
              <Sidebar />
              <Box flex="1" borderRadius={8} bg="gray.200" p="8" w="100%">
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
                            }).format(proceds.price)}
                          </Td>
                          <Td borderColor="black">{proceds.sector.name}</Td>
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

                            <Button
                              as="a"
                              size="sm"
                              fontSize="sm"
                              colorScheme="red"
                              leftIcon={<Icon as={RiPencilLine} />}
                              onClick={() => handleDeleteProcedure(proceds.id)}
                            >
                              Deletar Procedimento
                            </Button>
                          </Td>
                        </Tr>
                      ))
                    ) : (
                      <LoadingSpinner />
                    )}
                  </Tbody>
                </Table>

                <Paginaton />
              </Box>
            </Flex>
          </Flex>
        </AdminContainer>
      </ChakraProvider>
    </motion.div>
  );
}
