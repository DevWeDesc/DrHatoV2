import {
  ChakraProvider,
  Flex,
  SimpleGrid,
  FormControl,
  Button,
  Text,
  Box,
  Select,
} from "@chakra-ui/react";
import { AdminContainer } from "../AdminDashboard/style";
import { WorkSpaceHeader } from "../Vets/styles";
import { BiHome } from "react-icons/bi";
import { TbArrowBack } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { Input } from "../../components/admin/Input";

export default function EditProtocols() {
  const navigate = useNavigate();
  return (
    <ChakraProvider>
      <AdminContainer>
        <Flex direction="column" h="100vh">
          <WorkSpaceHeader>
            <Flex
              justify="space-between"
              align="center"
              width="100%"
              height="100%"
            >
              <Flex align="center" gap="2" justify="space-between">
                <Flex>
                  <Text m="2" fontSize="2xl" fontWeight="bold">
                    Edição de Grupo
                  </Text>
                </Flex>
              </Flex>
              <Flex gap="2" m="2">
                <Button
                  colorScheme="teal"
                  leftIcon={<BiHome size={24} />}
                  onClick={() => navigate("/Home")}
                >
                  Home
                </Button>

                <Button
                  colorScheme="yellow"
                  leftIcon={<TbArrowBack size={24} />}
                  onClick={() => navigate(`/Admissions/Protocols`)}
                >
                  Voltar
                </Button>
              </Flex>
            </Flex>
          </WorkSpaceHeader>

          <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
            <SimpleGrid
              flex="1"
              gap="4"
              minChildWidth="320px"
              align="flex-start"
              as={Flex}
            >
              <Flex direction="column" gap="4">
                <Box flex="1" borderRadius={8} bg="gray.200" p="8" m="4">
                  <Flex
                    direction={"column"}
                    m="4"
                    justify="center"
                    align="center"
                  >
                    <Flex direction="column">
                      <Flex direction="column" mb="4" gap="2" fontWeight="bold">
                        <Text>Dados Atuais</Text>
                        <Text>Nome do Grupo: </Text>
                        <Text>Visibilidade: </Text>
                      </Flex>

                      <FormControl
                        as="form"
                        // onSubmit={handleSubmit(handleEditAutorization as any)}
                      >
                        <Input
                          // label="Insira aqui um novo Nome para o grupo"
                      
                          // {...register("name")}
                          name="name"
                        />
                        <Text>Visibilidade</Text>
                        <Select
                          bg="white"
                          id="text"
                          //{...register("text")}
                        >
                          <option>Selecione a visibilidade</option>
                          <option value="Visivel">Visivel</option>
                          <option value="Oculto">Oculto</option>
                        </Select>

                        <Button
                          minWidth={320}
                          type="submit"
                          mt="4"
                          colorScheme="yellow"
                          onClick={() => navigate("/Admissions/Protocols")}
                        >
                          Editar
                        </Button>
                      </FormControl>
                    </Flex>
                  </Flex>
                </Box>
              </Flex>
            </SimpleGrid>
          </Flex>
        </Flex>
      </AdminContainer>
    </ChakraProvider>
  );
}
