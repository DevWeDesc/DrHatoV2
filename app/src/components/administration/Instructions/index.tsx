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
  FormControl,
  Textarea,
  TableContainer,
  FormLabel,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { RiAddLine, RiPencilLine } from "react-icons/ri";
import { AiOutlineDownload } from "react-icons/all";
import { useNavigate } from "react-router-dom";
import { LoadingSpinner } from "../../Loading";
import { GenericModal } from "../../Modal/GenericModal";
import { api } from "../../../lib/axios";
import { toast } from "react-toastify";
import { Input } from "../../admin/Input";
import pdfMake from "pdfmake/build/pdfmake";
// import * as pdfFonts from "pdfmake/build/vfs_fonts";
import { TDocumentDefinitions } from "pdfmake/interfaces";
import { ConfirmationDialog } from "../../dialogConfirmComponent/ConfirmationDialog";
import { BsFillTrashFill } from "react-icons/bs";

// //@ts-ignore
// pdfMake.addVirtualFileSystem(pdfFonts);
// // Create styles

export function Instructions() {
  //const { instructions } = useContext(DbContext);
  const { register, handleSubmit } = useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenTwo, setIsModalOpenTwo] = useState(false);
  const [reloadData, setReloadData] = useState<boolean>(false);
  const [allInstructions, setAllInstructions] = useState([]);

  const navigate = useNavigate();

  function handleCreateInstruction(name: string, description: string) {
    const docDefinition: TDocumentDefinitions = {
      content: [`Nome: ${name}\n\n ${description}`],
      pageMargins: [50, 50],
      pageSize: "A4",
    };
    // pdfMake.createPdf(docDefinition).open();
  }
  function openModal() {
    setIsModalOpen(true);
  }
  function closeModal() {
    setIsModalOpen(false);
  }

  function openModalTwo() {
    setIsModalOpenTwo(true);
  }
  function closeModalTwo() {
    setIsModalOpenTwo(false);
  }

  const handleCreateSector: SubmitHandler<FieldValues> = async (values) => {
    try {
      const data = {
        name: values.name,
        description: values.description,
      };
      await api.post("instructions", data);
      setReloadData(true);
      toast.success("Instrução criada com sucesso");
    } catch (error) {
      toast.error("Falha ao criar nova Instrução");
    }
  };

  async function handleDeleteSector(id: string | number) {
    try {
      await api.delete(`instructions/${id}`);
      setReloadData(true);
      toast.success("Instrução deletada sucesso");
    } catch (error) {
      toast.error("Falha ao deletar");
    }
  }

  const handleEditInstructions: SubmitHandler<FieldValues> = async (values) => {
    try {
      const data = {
        name: values.name,
        description: values.description,
      };
      await api.put(`instructions/${values.id}`, data);
      setReloadData(true);
      toast.success("Instrução editada com sucesso");
    } catch (error) {
      toast.error("Falha ao editar nova instrução");
    }
  };

  async function getInstructions() {
    const Instructions = await api.get("/instructions");
    setAllInstructions(Instructions.data);
  }

  useEffect(() => {
    getInstructions();
  }, []);

  useEffect(() => {
    if (reloadData === true) {
      getInstructions();
      setReloadData(false);
    }
  }, [reloadData]);

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
          <Flex
            w="100%"
            alignItems="center"
            justifyContent="center"
            direction="column"
          >
            <Heading
              fontSize={{ base: "lg", lg: "2xl" }}
              fontWeight="bold"
              pl="2"
              w="100%"
              mb="5"
              display="flex"
              flexDirection={{ base: "column", md: "row" }}
              gap={{ base: 3, md: 0 }}
              justifyContent="space-between"
            >
              Painel de Instruções
              <Button
                py="6"
                fontSize={{ base: "sm", lg: "md" }}
                onClick={() => openModal()}
                colorScheme="whatsapp"
                leftIcon={
                  <Icon
                    as={RiAddLine}
                    fontWeight="bold"
                    fontSize={{ base: "md", lg: "xl" }}
                  />
                }
              >
                Cadastrar Instrução
              </Button>
            </Heading>
            <TableContainer w="full">
              <Table w="full" variant="simple" size="lg">
                <Thead>
                  <Tr borderColor="black">
                    <Th borderColor="black">Nome</Th>
                    <Th borderColor="black">Id do Instrução</Th>
                    <Th borderColor="black" colSpan={3}></Th>
                  </Tr>
                </Thead>

                <Tbody>
                  {allInstructions ? (
                    allInstructions.map((sector: any) => (
                      <Tr key={sector.id}>
                        <Td fontSize={{ base: "12", lg: "sm" }}>
                          {sector.name}
                        </Td>
                        <Td
                          fontSize={{ base: "12", lg: "sm" }}
                          fontWeight="bold"
                        >
                          {sector.id}
                        </Td>

                        <Td fontSize={{ base: "12", lg: "sm" }}>
                          <Button
                            as="a"
                            size="sm"
                            fontSize={{ base: "sm", lg: "md" }}
                            colorScheme="yellow"
                            mr="3"
                            leftIcon={<Icon as={RiPencilLine} />}
                            onClick={() => openModalTwo()}
                          >
                            Editar Instrução
                          </Button>

                          {/* <Button
                      as="a"
                      size="md"
                      fontSize="md"
                      colorScheme="red"
                      leftIcon={<Icon as={RiPencilLine} />}
                      onClick={() => handleDeleteSector(sector.id)}
                      mr="3"
                    >
                      Deletar Instrução
                    </Button> */}
                        </Td>
                        <Td>
                          {" "}
                          <ConfirmationDialog
                            disabled={false}
                            icon={<BsFillTrashFill fill="white" size={16} />}
                            buttonTitle="Deletar Instrução"
                            whatIsConfirmerd="Tem certeza que deseja Excluir essa Instrução?"
                            describreConfirm="Excluir a Instrução é uma ação irreversivel, tem certeza que deseja excluir?"
                            callbackFn={() => handleDeleteSector(sector.id)}
                          />
                        </Td>
                        <Td>
                          {" "}
                          <Button
                            as="a"
                            fontSize={{ base: "sm", lg: "md" }}
                            size={{ base: "sm", lg: "md" }}
                            colorScheme="cyan"
                            ml="3"
                            mr="3"
                            color="white"
                            leftIcon={<Icon as={AiOutlineDownload} />}
                            onClick={() =>
                              handleCreateInstruction(
                                sector.name,
                                sector.description
                              )
                            }
                          >
                            Gerar PDF
                          </Button>
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
          <GenericModal isOpen={isModalOpen} onRequestClose={closeModal}>
            <Text
              fontSize={{ base: "md", lg: "lg" }}
              fontWeight="bold"
              textAlign="center"
              mb="4"
              color="black"
            >
              Cadastrar nova Instrução
            </Text>
            <FormControl as="form" onSubmit={handleSubmit(handleCreateSector)}>
              <Input
                fontSize={{ base: "sm", lg: "md" }}
                {...register("name")}
                name="name"
                label="Nome da Instrução"
                mb="4"
              />

              <VStack gap="2" m="2">
                <FormLabel fontSize={{ base: "sm", lg: "md" }}>
                  Descrição da Instrução
                </FormLabel>
                <Textarea
                  fontSize={{ base: "sm", lg: "md" }}
                  minHeight={300}
                  minWidth={{ base: "80vw", lg: "30vw" }}
                  {...register("description")}
                  name="description"
                  borderColor="gray.900"
                ></Textarea>
              </VStack>
              <Button
                w="full"
                fontSize={{ base: "sm", lg: "md" }}
                type="submit"
                colorScheme="green"
                m="2"
              >
                Cadastrar
              </Button>
            </FormControl>
          </GenericModal>

          <GenericModal isOpen={isModalOpenTwo} onRequestClose={closeModalTwo}>
            <FormControl
              as="form"
              onSubmit={handleSubmit(handleEditInstructions)}
              display="flex"
              flexDir="column"
              alignItems="center"
            >
              <Text>Editar Setor</Text>
              <Input
                {...register("name")}
                name="name"
                label="Nome da Instrução"
                mb="4"
              />
              <Input
                {...register("id")}
                name="id"
                label="Id da Instrução"
                mb="4"
              />

              <label>Descrição da Instrução</label>
              <Textarea
                {...register("description")}
                name="description"
                minHeight={300}
                minWidth={300}
                borderColor="gray.900"
              ></Textarea>

              <Button w="100%" type="submit" colorScheme="green" m="2">
                Cadastrar
              </Button>
            </FormControl>
          </GenericModal>
        </Flex>
      </Box>
    </Flex>
  );
}
