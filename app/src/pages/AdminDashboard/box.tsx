import {
  ChakraProvider,
  Flex,
  Heading,
  Button,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  FormControl,
  Box,
  Icon,
  Table,
  Text,
  Textarea,
  FormLabel,
  Checkbox,
} from "@chakra-ui/react";
import { RiAddLine, RiPencilLine } from "react-icons/ri";
import { Paginaton } from "../../components/admin/Pagination";
import { AdminContainer } from "./style";
import { Sidebar } from "../../components/admin/Sidebar";
import { Header } from "../../components/admin/Header";
import { GenericModal } from "../../components/Modal/GenericModal";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { api } from "../../lib/axios";
import { toast } from "react-toastify";
import { Input } from "../../components/admin/Input";
import { BoxProps } from "../../interfaces";




export default function AdminBoxs() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { register, handleSubmit } = useForm();
  const [boxs, setBox] = useState<BoxProps[]>([]);
  const [reloadData, setReloadData] = useState(false);
  const handleCreateVaccine: SubmitHandler<FieldValues> = async (values) => {
    try {
      const data = {
        name: values.name,
        boxIsOpen: values.boxIsOpen,
      };
      await api.post("/vetbox", data);
      setReloadData(true);
      toast.success("Vacina criada com sucesso");
    } catch (error) {
      toast.error("Falha ao criar nova Vacina");
      console.log(error);
    }
  };
  async function GetVaccine() {
    try {
      const response = await api.get("/vetbox");

      setBox(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    GetVaccine();
  }, []);

  useEffect(() => {
    if (reloadData === true) {
      GetVaccine();
      setReloadData(false); // Reseta o estado para evitar chamadas infinitas
    }
  }, [reloadData]);

  function openModal() {
    setIsModalOpen(true);
  }
  function closeModal() {
    setIsModalOpen(false);
  }

  return (
    <ChakraProvider>
      <AdminContainer>
        <Flex direction="column" h="100vh">
          <Header title="Vacinas" url="/Admin/" />

          <Flex w="100%" my="6" maxWidth={1680} mx="auto" px="6">
            <Sidebar />
            <Box
              flex="1"
              borderRadius={8}
              bg="gray.200"
              p="8"
              maxH="44rem"
              overflow="auto"
            >
              <Flex
                mb="8"
                justify="space-between"
                direction="column"
                align="center"
              >
                <Heading size="lg" fontWeight="bold" w="100%" mb="5">
                  Caixas
                </Heading>

                <Button
                  as="a"
                  width="100%"
                  fontSize="20"
                  py="8"
                  colorScheme="whatsapp"
                  cursor="pointer"
                  leftIcon={<Icon as={RiAddLine} />}
                  onClick={() => openModal()}
                >
                  Cadastrar nova caixa
                </Button>
              </Flex>

              <Table colorScheme="blackAlpha">
                <Thead>
                  <Tr>
                    <Th fontSize="18" borderColor="black">
                     Nome
                    </Th>
                   
                    <Th fontSize="18" borderColor="black">
                      Está Aberta?
                    </Th>
                    <Th fontSize="18" borderColor="black">
                      Entradas
                    </Th>
                    <Th fontSize="18" borderColor="black">
                      Saidas
                    </Th>
                    <Th fontSize="18" borderColor="black">
                      Total Movimentado
                    </Th>
                    <Th fontSize="18" borderColor="black">
                     Editar
                    </Th>
                    <Th fontSize="18" borderColor="black">
                     Deletar
                     </Th>
                
                
                  </Tr>
                </Thead>

                <Tbody>
                  {boxs.map((box) => (
                    <Tr key={box.id}>
                      <Td borderColor="black">
                        <Text fontWeight="bold" color="gray.800">
                          {box.name}
                        </Text>
                      </Td>
                    
                      <Td borderColor="black">{box.boxIsOpen === true ? "SIM" : "NÃO"}</Td>
                      <Td borderColor="black">{new Intl.NumberFormat("pt-BR", {currency: 'BRL', style: 'currency'}).format(box.entryValues)}</Td>
                      <Td borderColor="black">{new Intl.NumberFormat("pt-BR", {currency: 'BRL', style: 'currency'}).format(box.exitValues)}</Td>
                      <Td borderColor="black">{new Intl.NumberFormat("pt-BR", {currency: 'BRL', style: 'currency'}).format(box.movimentedValues)}</Td>
                      <Td borderColor="black">          <Button
                            alignItems="center"
                            as="a"
                            size="md"
                            fontSize="md"
                            colorScheme="yellow"
                            width={220}
                            leftIcon={<Icon size={28} as={RiPencilLine} />}
                            onClick={() => openModal()}
                          >
                            Editar Caixa
                          </Button></Td>
                          <Td borderColor="black">
                          <Button
                            width={220}
                            as="a"
                            size="md"
                            fontSize="md"
                            colorScheme="red"
                            leftIcon={<Icon as={RiPencilLine} />}
                            //onClick={() => handleDeleteSector(sector.id)}
                          >
                            Deletar Caixa
                          </Button>
                          </Td>

               
                    </Tr>
                  ))}
                </Tbody>
              </Table>
              <GenericModal isOpen={isModalOpen} onRequestClose={closeModal}>
                <FormControl
                  as="form"
                  onSubmit={handleSubmit(handleCreateVaccine)}
                >
                  <Flex
                    direction="column"
                    m="4"
                    gap="4"
                    align="center"
                    width="480px"
                   
                  >
                    <Input
                      {...register("name")}
                      name="name"
                      label="Nome do caixa: "
                    />


                    <FormLabel
                      htmlFor="boxIsOpen"
                    >Caixa está aberto?</FormLabel>
                    <Checkbox
                    size="lg"
                    borderColor="black"

                      {...register("boxIsOpen")}
                      name="boxIsOpen"
                    
                    />

                 

                    <Button type="submit" colorScheme="whatsapp">
                      CADASTRAR
                    </Button>
                  </Flex>
                </FormControl>
              </GenericModal>
            </Box>
          </Flex>
        </Flex>
      </AdminContainer>
    </ChakraProvider>
  );
}
