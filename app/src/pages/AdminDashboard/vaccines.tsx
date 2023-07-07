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
  Input,
  Box,
  Icon,
  Table,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { RiAddLine, RiPencilLine } from "react-icons/ri";
import { Paginaton } from "../../components/admin/Pagination";
import { LoadingSpinner } from "../../components/Loading";
import { AdminContainer } from "./style";
import { Sidebar } from "../../components/admin/Sidebar";
import { Header } from "../../components/admin/Header";
import { GenericModal } from "../../components/Modal/GenericModal";
import { useState } from "react";

export default function AdminVaccines() {
  const [isModalOpenTwo, setIsModalOpenTwo] = useState(false);
  function openModalTwo() {
    setIsModalOpenTwo(true);
  }
  function closeModalTwo() {
    setIsModalOpenTwo(false);
  }
  return (
    <ChakraProvider>
      <AdminContainer>
        <Flex direction="column" h="100vh">
          <Header title="Vacinas" />

          <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
            <Sidebar />
            <Box flex="1" borderRadius={8} bg="gray.200" p="8">
              <Flex
                mb="8"
                justify="space-between"
                direction="column"
                align="center"
              >
                <Heading size="lg" fontWeight="bold" w="100%" mb="5">
                  Vacinas
                </Heading>

                <Button
                  as="a"
                  width="100%"
                  fontSize="20"
                  py="8"
                  colorScheme="whatsapp"
                  leftIcon={<Icon as={RiAddLine} />}
                  //onClick={() => openModal()}
                >
                  Cadastrar nova Vacina
                </Button>
              </Flex>

              <Table colorScheme="blackAlpha">
                <Thead>
                  <Tr>
                    <Th fontSize="18" borderColor="black">
                      Vacina
                    </Th>
                    <Th borderColor="black"></Th>
                    <Th fontSize="18" borderColor="black">
                      Valor
                    </Th>
                    <Th borderColor="black"></Th>
                  </Tr>
                </Thead>

                <Tbody>
                  {/*sectors ? (
                    sectors.map((sector) => (
                      <Tr key={sector.id}>
                        <Td borderColor="black">
                          <Text fontWeight="bold" color="gray.800">
                            {sector.name}
                          </Text>
                        </Td>
                        <Td borderColor="black">{sector.id}</Td>

                        <Td borderColor="black">
                          <Flex gap="2" ml="50%">
                            <Button
                              as="a"
                              size="md"
                              fontSize="md"
                              colorScheme="yellow"
                              leftIcon={<Icon as={RiPencilLine} />}
                              onClick={() => openModalTwo()}
                            >
                              Editar setor
                            </Button>
                            <Button
                              as="a"
                              size="md"
                              fontSize="md"
                              colorScheme="red"
                              leftIcon={<Icon as={RiPencilLine} />}
                              onClick={() => handleDeleteSector(sector.id)}
                            >
                              Deletar Setor
                            </Button>
                          </Flex>
                        </Td>
                      </Tr>
                    ))
                  ) : (
                    <LoadingSpinner />
                  )*/}
                  <Tr key={0}>
                    <Td borderColor="black">
                      <Text fontWeight="bold" color="gray.800">
                        Anti Rabica
                      </Text>
                    </Td>
                    <Td borderColor="black"></Td>
                    <Td borderColor="black">R$60,00</Td>

                    <Td borderColor="black">
                      <Flex gap="2" ml="50%">
                        <Button
                          as="a"
                          size="md"
                          fontSize="md"
                          colorScheme="yellow"
                          leftIcon={<Icon as={RiPencilLine} />}
                          onClick={() => openModalTwo()}
                        >
                          Editar Vacina
                        </Button>
                        <Button
                          as="a"
                          size="md"
                          fontSize="md"
                          colorScheme="red"
                          leftIcon={<Icon as={RiPencilLine} />}
                          //onClick={() => handleDeleteSector(sector.id)}
                        >
                          Deletar Vacina
                        </Button>
                      </Flex>
                    </Td>
                  </Tr>
                </Tbody>
              </Table>
              <GenericModal /*isOpen={isModalOpen} onRequestClose={closeModal}*/
              >
                <FormControl
                  as="form"
                  //onSubmit={handleSubmit(handleCreateSector)}
                  display="flex"
                  flexDir="column"
                  alignItems="center"
                >
                  <Input
                    ///{...register("name")}
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
                  //onSubmit={handleSubmit(handleEditSector)}
                  display="flex"
                  flexDir="column"
                  alignItems="center"
                >
                  <Text>Editar Vacina</Text>
                  <Input
                    //{...register("name")}
                    name="name"
                    label="Nome do Setor"
                    mb="4"
                  />
                  <Text>Editar Preço</Text>
                  <Input
                    //{...register("id")}
                    name="id"
                    label="Id do setor"
                    mb="4"
                  />

                  <Button w="100%" type="submit" colorScheme="yellow" m="2">
                    Editar Vacina
                  </Button>
                </FormControl>
              </GenericModal>

              <Paginaton />
            </Box>
          </Flex>
        </Flex>
      </AdminContainer>
    </ChakraProvider>
  );
}
