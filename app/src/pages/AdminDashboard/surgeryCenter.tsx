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
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { RiAddLine, RiPencilLine } from "react-icons/ri";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { Header } from "../../components/admin/Header";

import { Sidebar } from "../../components/admin/Sidebar";

import { GenericModal } from "../../components/Modal/GenericModal";
import { AdminContainer } from "../AdminDashboard/style";
import { api } from "../../lib/axios";
import { toast } from "react-toastify";
import { Input } from "../../components/admin/Input";
import { ConfirmationDialog } from "../../components/dialogConfirmComponent/ConfirmationDialog";
import { BsFillTrashFill } from "react-icons/bs";
import { useQuery } from "react-query";
import { LoadingSpinner } from "../../components/Loading";

interface SurgerieCentral {
    id: number;
    centralName: string;
    closedHours: string;
    openHours:   string;
    isOpen:      boolean;
    maxSlots:    number;
}
export function SurgeryCenter() {
  const { register, handleSubmit } = useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenTwo, setIsModalOpenTwo] = useState(false);
  const [surgerieCentralId, setSurgerieCentralId] = useState(0);
  const navigate = useNavigate();



  async function getAllSurgeriesCentral (): Promise<SurgerieCentral[]> {
    const response = await api.get("/surgeries/central")
    return response.data.centralSurgerie
  }

  const {refetch, data: surgeriesCentral, isLoading} = useQuery("surgeriesCentral", getAllSurgeriesCentral)


  if(isLoading || !surgeriesCentral) {
    return <LoadingSpinner/>
  }

  const handleCreateSurgerie: SubmitHandler<FieldValues> = async (
    values
  ) => {
    try {
      const data = {
        centralName: values.name,
        closedHours: values.endHour,
        openHours: values.openHour,
        isOpen: values.isOpen,
        maxSlots: values.maxSlots,
      };

      await api.post("/surgeries/central", data);
      refetch()
      toast.success("Centro cirurgico criado com sucesso!!");
      setIsModalOpen(false)
    
    } catch (error) {
      toast.error("Falha ao criar novo Centro cirurgico!!");
    }
  };

  async function handleDeleteSurgerieCentral(id: string | number) {
    try {
      await api.delete(`/surgeries/central/${id}`);
      refetch()
      toast.success("Centro Cirurgico deletado com sucesso!!");
    } catch (error) {
      toast.error("Falha ao Deletar Centro Cirurgico!!");
    }
  }

  const handleEditSurgeriesCentral: SubmitHandler<FieldValues> = async (
    values
  ) => {
    try {
      const data = {
        centralId:  surgerieCentralId,
        centralName: values.name,
        closedHours: values.endHour,
        openHours: values.openHour,
        isOpen: values.isOpen,
        maxSlots: values.maxSlots,
      };
      await api.put(`/surgeries/central/edit`, data);
      refetch()
      toast.success("Centro cirurgico editado com sucesso!!");
      setIsModalOpen(false)
 
    } catch (error) {
      toast.error("Falha ao editar Centro Cirurgico!!");
    }
  };

  return (
    <ChakraProvider>
      <AdminContainer>
        <Flex direction="column" h="100vh">
          <Header title="Centro Cirúrgico" url="/Admin/" />

          <Flex
            w="100%"
            my="6"
            direction={{ base: "column", xl: "row" }}
            mx="auto"
            px="6"
          >
            <Sidebar />
            <Box flex="1" borderRadius={8} py={{ base: "8", xl: 0 }}>
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
                Centro Cirúrgico
                <Button
                  as="a"
                  py="6"
                  fontSize={{ base: "sm", lg: "md" }}
                  colorScheme="whatsapp"
                  cursor="pointer"
                  leftIcon={<Icon as={RiAddLine} />}
                  onClick={() => setIsModalOpen(true)}
                >
                  Cadastrar novo Centro Cirúrgico
                </Button>
              </Heading>

              <Table colorScheme="blackAlpha">
                <Thead>
                  <Tr>
                    <Th>Nome</Th>
                    <Th>Slots</Th>
                    <Th />
                  </Tr>
                </Thead>

                <Tbody>
                  {surgeriesCentral.length > 0 ? (
                    surgeriesCentral.map((central) => (
                      <Tr fontWeight="bold" key={central.id}>
                        <Td fontSize={{ base: "12", lg: "sm" }} >
                          {central.centralName}
                        </Td>
                        <Td fontSize={{ base: "12", lg: "sm" }}>
                        {central.maxSlots}
                        </Td>

                        <Td>
                          <Flex gap="2" ml="40%">
                            <Button
                              as="a"
                              size="sm"
                              fontSize="sm"
                              colorScheme="yellow"
                              leftIcon={<Icon as={RiPencilLine} />}
                              onClick={() => {
                                setSurgerieCentralId(central.id)
                                setIsModalOpenTwo(true)}}
                            >
                              Editar Centro Cirúrgico
                            </Button>

                            <ConfirmationDialog
                              disabled={false}
                              icon={<BsFillTrashFill fill="white" size={16} />}
                              buttonTitle="Deletar Centro Cirurgico"
                              whatIsConfirmerd="Tem certeza que deseja Excluir esse Centro Cirurgico?"
                              describreConfirm="Excluir o Centro Cirurgico é uma ação irreversivel, tem certeza que deseja excluir?"
                              callbackFn={() => handleDeleteSurgerieCentral(central.id)}
                            />
                          </Flex>
                        </Td>
                      </Tr>
                    ))
                  ) : (
                    <Tr>
                      <Td fontSize={{ base: "12", lg: "sm" }} fontWeight="bold">
                        Sem Centro Cirurgico cadastrado até o momento!
                      </Td>
                    </Tr>
                  )}
                </Tbody>
              </Table>
              <GenericModal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}>
                <FormControl
                  as="form"
                  onSubmit={handleSubmit(handleCreateSurgerie)}
                  display="flex"
                  flexDir="column"
                  alignItems="center"
                >
                  <Input
                    {...register("name")}
                    name="name"
                    label="Nome do Centro cirúrgico"
                    mb="4"
                  />

                    <HStack>
                      <Text fontWeight="bold">Aberto ?</Text>
                    <Checkbox {...register('isOpen')} name="isOpen" border="2px" size="lg" />
                    </HStack>
                  

                  <Input
                    {...register("maxSlots")}
                    name="maxSlots"
                    placeholder="Número de slots"
                    type="number"
                    label="Slots"
                    mb="4"
                  />
                  <Input
                    {...register("openHour")}
                    placeholder="08:00"
                    name="openHour"
                    label="Horário de abertura"
                    mb="4"
                  />
                  <Input
                  {...register("endHour")}
                    placeholder="22:00"
                    type="date-time"
                    name="endHour"
                    label="Horário de fechamento"
                    mb="4"
                  />
                    <Text>Obs: utilize o formato 00:00 para os horários</Text>
                  <Button w="100%" type="submit" colorScheme="green" m="2">
                    Cadastrar
                  </Button>
                </FormControl>
              </GenericModal>

              <GenericModal
                isOpen={isModalOpenTwo}
                onRequestClose={() => setIsModalOpenTwo(false)}
              >
                <FormControl
                  as="form"
                  onSubmit={handleSubmit(handleEditSurgeriesCentral)}
                  display="flex"
                  flexDir="column"
                  alignItems="center"
                >
                  <Text pb="15">Editar Centro cirúrgico</Text>
                  <Input
                    {...register("name")}
                    name="name"
                    label="Nome do Centro cirúrgico"
                    mb="4"
                  />

                    <HStack>
                      <Text fontWeight="bold">Aberto ?</Text>
                    <Checkbox {...register('isOpen')} name="isOpen" border="2px" size="lg" />
                    </HStack>
                  

                  <Input
                    {...register("maxSlots")}
                    name="maxSlots"
                    placeholder="Número de slots"
                    type="number"
                    label="Slots"
                    mb="4"
                  />
                  <Input
                    {...register("openHour")}
                    placeholder="08:00"
                    name="openHour"
                    label="Horário de abertura"
                    mb="4"
                  />
                  <Input
                  {...register("endHour")}
                    placeholder="22:00"
                    type="date-time"
                    name="endHour"
                    label="Horário de fechamento"
                    mb="4"
                  />
                    <Text>Obs: utilize o formato 00:00 para os horários</Text>
                  <Button w="100%" type="submit" colorScheme="yellow" m="2">
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
