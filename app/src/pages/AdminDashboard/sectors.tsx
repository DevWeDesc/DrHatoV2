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
  FormControl,
  HStack,
  CheckboxGroup,
  Checkbox,
  Grid,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { RiAddLine, RiPencilLine } from "react-icons/ri";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { Header } from "../../components/admin/Header";
import { Paginaton } from "../../components/admin/Pagination";
import { Sidebar } from "../../components/admin/Sidebar";
import { LoadingSpinner } from "../../components/Loading";
import { DbContext } from "../../contexts/DbContext";
import { GenericModal } from "../../components/Modal/GenericModal";
import { AdminContainer } from "../AdminDashboard/style";
import { api } from "../../lib/axios";
import { toast } from "react-toastify";
import { Input } from "../../components/admin/Input";
import { ConfirmationDialog } from "../../components/dialogConfirmComponent/ConfirmationDialog";
import { BsFillTrashFill } from "react-icons/bs";

interface ISector {
  id: string;
  name: string;
  sectorId: string;
  examId: null | string | number;
  proced_id: null | string | number;
  sectorsId: null | string | number;
}

interface IGroup {
  id: number;
  codGroup: number;
  name: string;
}

interface IDataSelected {
  groupSelected: IGroup;
  sectorSelected: ISector;
}

export function SectorsList() {
  // const { sectors } = useContext(DbContext);
  const [sectors, setSectors] = useState<ISector[]>([]);
  const [groups, setGroups] = useState<IGroup[]>([]);
  const { register, handleSubmit } = useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenTwo, setIsModalOpenTwo] = useState(false);
  const [loading, setLoading] = useState(true);
  const [typeModals, setTypeModals] = useState({
    typeModal: "",
    typeModalTwo: "",
  });
  const [dataSelected, setDataSelected] = useState({
    sectorSelected: { name: "" },
    groupSelected: { name: "" },
  } as IDataSelected);
  const navigate = useNavigate();

  const getSectorsListData = async () => {
    const response = await api.get("sectors");
    setSectors(response.data);
  };

  const getGroupsListData = async () => {
    const response = await api.get("groups");
    setGroups(response.data);
  };

  useEffect(() => {
    if (loading === true) {
      getSectorsListData();
      getGroupsListData();
      setLoading(false);
    }
  }, [loading]);

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

  const handleCreateFeatureType = (type: string) => {
    setTypeModals({ ...typeModals, typeModal: type });
    openModal();
  };

  const handleEditFeatureType = (
    type: string,
    dataSector: ISector,
    dataGroup: IGroup
  ) => {
    setDataSelected({
      ...dataSelected,
      sectorSelected: dataSector,
      groupSelected: dataGroup,
    });
    setTypeModals({ ...typeModals, typeModalTwo: type });
    openModalTwo();
  };

  // Sectors

  const handleCreateSector: SubmitHandler<FieldValues> = async (values) => {
    try {
      const data = {
        name: values.name,
      };
      await api.post("sectors", data);
      toast.success("Setor criado com sucesso");
      setLoading(true);
    } catch (error) {
      toast.error("Falha ao criar novo setor");
    }
  };

  const handleEditSector: SubmitHandler<FieldValues> = async (values) => {
    try {
      const data = {
        name: dataSelected.sectorSelected.name,
      };
      const sectorId = dataSelected.sectorSelected.id;
      await api.put(`sectors/${sectorId}`, data);
      toast.success("Setor editado com sucesso");
      setLoading(true);
    } catch (error) {
      toast.error("Falha ao editar novo setor");
    }
  };

  async function handleDeleteSector(id: string | number) {
    try {
      await api.delete(`sectors/${id}`);
      toast.success("Setor deletado com sucesso");
      setLoading(true);
    } catch (error) {
      toast.error("Falha ao deletar setor");
    }
  }

  // Groups
  const handleCreateGroups: SubmitHandler<FieldValues> = async (values) => {
    try {
      const data = {
        name: values.name,
      };
      await api.post("groups", data);
      toast.success("Grupo criado com sucesso");
      setLoading(true);
    } catch (error) {
      toast.error("Falha ao criar novo grupo");
    }
  };

  const handleEditGroup: SubmitHandler<FieldValues> = async (values) => {
    try {
      const data = {
        name: dataSelected.groupSelected.name,
      };
      const groupId = dataSelected.groupSelected.id;

      await api.put(`groups/${groupId}`, data);
      toast.success("Grupo Editado com sucesso");
      setLoading(true);
    } catch (error) {
      toast.error("Falha ao deletar Grupo");
    }
  };

  async function handleDeleteGroup(id: string | number) {
    try {
      await api.delete(`groups/${id}`);
      toast.success("Grupo deletado com sucesso");
      setLoading(true);
    } catch (error) {
      toast.error("Falha ao deletar Grupo");
    }
  }

  const handleInformationsInputModalTwo = (
    ev: React.ChangeEvent<HTMLInputElement>
  ) => {
    typeModals?.typeModalTwo === "editSector"
      ? setDataSelected({
          ...dataSelected,
          sectorSelected: {
            ...dataSelected.sectorSelected,
            name: ev.target.value,
          },
        })
      : setDataSelected({
          ...dataSelected,
          groupSelected: {
            ...dataSelected.groupSelected,
            name: ev.target.value,
          },
        });
  };

  return (
    <ChakraProvider>
      <AdminContainer>
        <Flex direction="column" h="100vh">
          <Header title="Setores e Grupos" url="/Admin" />
          <Flex
            w="100%"
            my="6"
            direction={{ base: "column", xl: "row" }}
            mx="auto"
            px="6"
          >
            <Sidebar />
            <Box
              flex="1"
              borderRadius={8}
              // bg="gray.200"
              py={{ base: "8", xl: 0 }}
              maxH="44rem"
              w="100%"
            >
              <Grid
                gap={10}
                w="100%"
                templateColumns={{ xl: "repeat(2, 1fr)" }}
              >
                <Flex
                  direction="column"
                  w="full"
                  pr="1"
                  maxH="40rem"
                  overflowY="auto"
                >
                  <Heading
                    fontSize={{ base: "xl", lg: "2xl" }}
                    fontWeight="bold"
                    pl="2"
                    w="100%"
                    mb="5"
                    display="flex"
                    flexDirection={{ base: "column", md: "row" }}
                    gap={{ base: 3, md: 0 }}
                    justifyContent="space-between"
                  >
                    Setores
                    <Button
                      py="6"
                      fontSize={{ base: "sm", lg: "md" }}
                      colorScheme="whatsapp"
                      cursor="pointer"
                      leftIcon={<Icon as={RiAddLine} />}
                      onClick={() => handleCreateFeatureType("newSector")}
                    >
                      Cadastrar novo Setor
                    </Button>
                  </Heading>

                  <Table colorScheme="blackAlpha">
                    <Thead>
                      <Tr>
                        <Th>Nome</Th>
                        <Th>Id do Setor</Th>
                        <Th />
                      </Tr>
                    </Thead>

                    <Tbody>
                      {sectors ? (
                        sectors.map((sector) => (
                          <Tr key={sector.id}>
                            <Td fontSize={{ base: "12", lg: "sm" }}>
                              {sector.name}
                            </Td>
                            <Td fontSize={{ base: "12", lg: "sm" }}>
                              {sector.id}
                            </Td>

                            <Td display="flex" gap={2} justifyContent="end">
                              <Button
                                as="a"
                                size="sm"
                                fontSize="sm"
                                colorScheme="yellow"
                                leftIcon={<Icon as={RiPencilLine} />}
                                onClick={() =>
                                  handleEditFeatureType(
                                    "editSector",
                                    sector,
                                    dataSelected.groupSelected
                                  )
                                }
                              >
                                Editar setor
                              </Button>
                              <ConfirmationDialog
                                disabled={false}
                                icon={
                                  <BsFillTrashFill fill="white" size={16} />
                                }
                                buttonTitle="Deletar Setor"
                                whatIsConfirmerd={`Tem certeza que deseja Excluir o Setor ${sector.name}?`}
                                describreConfirm="Excluir o Setor é uma ação irreversivel, tem certeza que deseja excluir?"
                                callbackFn={() => handleDeleteSector(sector.id)}
                              />
                            </Td>
                          </Tr>
                        ))
                      ) : (
                        <LoadingSpinner />
                      )}
                    </Tbody>
                  </Table>
                </Flex>
                <Flex w="full" direction="column" maxH="40rem" overflowY="auto">
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
                    Grupos
                    <Button
                      py="6"
                      fontSize={{ base: "sm", lg: "md" }}
                      colorScheme="whatsapp"
                      cursor="pointer"
                      leftIcon={<Icon as={RiAddLine} />}
                      onClick={() => handleCreateFeatureType("newGroup")}
                    >
                      Cadastrar novo Grupo
                    </Button>
                  </Heading>

                  <Table colorScheme="blackAlpha">
                    <Thead>
                      <Tr>
                        <Th>Nome</Th>
                        <Th>Id do Grupo</Th>
                        <Th></Th>
                      </Tr>
                    </Thead>

                    <Tbody>
                      {groups ? (
                        groups.map((group) => (
                          <Tr key={group.id}>
                            <Td fontSize={{ base: "12", lg: "sm" }}>
                              {group.name}
                            </Td>
                            <Td fontSize={{ base: "12", lg: "sm" }}>
                              {group.id}
                            </Td>

                            <Td display="flex" gap={2} justifyContent="end">
                              <Button
                                as="a"
                                size="sm"
                                fontSize="sm"
                                colorScheme="yellow"
                                leftIcon={<Icon as={RiPencilLine} />}
                                onClick={() =>
                                  handleEditFeatureType(
                                    "editGroup",
                                    dataSelected.sectorSelected,
                                    group
                                  )
                                }
                              >
                                Editar Grupo
                              </Button>
                              <ConfirmationDialog
                                disabled={false}
                                icon={
                                  <BsFillTrashFill fill="white" size={16} />
                                }
                                buttonTitle="Deletar Grupo"
                                whatIsConfirmerd={`Tem certeza que deseja Excluir o Grupo ${group.name}?`}
                                describreConfirm="Excluir o Grupo é uma ação irreversivel, tem certeza que deseja excluir?"
                                callbackFn={() => handleDeleteGroup(group.id)}
                              />
                            </Td>
                          </Tr>
                        ))
                      ) : (
                        <LoadingSpinner />
                      )}
                    </Tbody>
                  </Table>
                </Flex>
              </Grid>
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
                    label="Nome do Setor"
                    mb="4"
                  />

                  <Button w="100%" type="submit" colorScheme="green" m="2">
                    Cadastrar
                  </Button>
                </FormControl>
              </GenericModal>

              <GenericModal
                isOpen={isModalOpenTwo}
                onRequestClose={closeModalTwo}
              >
                <FormControl
                  as="form"
                  onSubmit={handleSubmit(
                    typeModals.typeModalTwo === "editSector"
                      ? handleEditSector
                      : handleEditGroup
                  )}
                  display="flex"
                  flexDir="column"
                  alignItems="center"
                  gap={4}
                >
                  <Text>
                    Editar{" "}
                    {typeModals.typeModalTwo === "editSector"
                      ? "Setor"
                      : "Grupo"}
                  </Text>
                  <Input
                    name=""
                    value={
                      typeModals?.typeModalTwo === "editSector"
                        ? dataSelected?.sectorSelected?.name
                        : dataSelected?.groupSelected?.name
                    }
                    onChange={(ev) => handleInformationsInputModalTwo(ev)}
                    label="Nome do Setor"
                    mb="4"
                  />
                  <Button type="submit" w="full" colorScheme="yellow">
                    {" "}
                    Editar
                  </Button>
                </FormControl>
              </GenericModal>
            </Box>
          </Flex>
        </Flex>
      </AdminContainer>
    </ChakraProvider>
  );
}
