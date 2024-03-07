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
import  pdfMake from "pdfmake/build/pdfmake";
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
    <Box flex="1" borderRadius={8} bg="gray.200" overflow="auto" p="8">
      <Flex mb="8" direction="column" justify="space-between" align="center">
        <Heading width="100%" fontSize="30" fontWeight="bold">
          Painel de Instruções
        </Heading>

        <Button
          as="a"
          mt="5"
          width="100%"
          py="8"
          cursor="pointer"
          fontSize="20"
          colorScheme="whatsapp"
          leftIcon={<Icon as={RiAddLine} fontSize="20" />}
          onClick={() => openModal()}
        >
          Cadastrar nova Instrução
        </Button>
      </Flex>

      <Table colorScheme="blackAlpha">
        <Thead>
          <Tr borderColor="black">
            <Th borderColor="black" fontSize="18">
              Nome
            </Th>
            <Th borderColor="black" fontSize="18">
              Id do Instrução
            </Th>
            <Th borderColor="black"></Th>
          </Tr>
        </Thead>

        <Tbody>
          {allInstructions ? (
            allInstructions.map((sector: any) => (
              <Tr key={sector.id}>
                <Td borderColor="black">
                  <Text fontWeight="bold" fontSize="16" color="gray.800">
                    {sector.name}
                  </Text>
                </Td>
                <Td borderColor="black" fontSize="16" fontWeight="bold">
                  {sector.id}
                </Td>

                <Td borderColor="black">
                  <Flex ml="16%">
                    <Button
                      as="a"
                      size="sm"
                      fontSize="sm"
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

                    <ConfirmationDialog
                      disabled={false}
                      icon={<BsFillTrashFill fill="white" size={16} />}
                      buttonTitle="Deletar Instrução"
                      whatIsConfirmerd="Tem certeza que deseja Excluir essa Instrução?"
                      describreConfirm="Excluir a Instrução é uma ação irreversivel, tem certeza que deseja excluir?"
                      callbackFn={() => handleDeleteSector(sector.id)}
                    />

                    <Button
                      as="a"
                      size="sm"
                      fontSize="sm"
                      colorScheme="cyan"
                      ml="3"
                      mr="3"
                      color="white"
                      leftIcon={<Icon as={AiOutlineDownload} />}
                      onClick={() =>
                        handleCreateInstruction(sector.name, sector.description)
                      }
                    >
                      Gerar PDF
                    </Button>
                  </Flex>
                </Td>
              </Tr>
            ))
          ) : (
            <LoadingSpinner />
          )}
        </Tbody>
      </Table>
      <GenericModal isOpen={isModalOpen} onRequestClose={closeModal}>
        <FormControl
          as="form"
          onSubmit={handleSubmit(handleCreateSector)}
          display="flex"
          flexDir="column"
          alignItems="center"
        >
          <Input
            {...register("name")}
            name="name"
            label="Nome da Instrução"
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
          <Input {...register("id")} name="id" label="Id da Instrução" mb="4" />

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
    </Box>
  );
}
