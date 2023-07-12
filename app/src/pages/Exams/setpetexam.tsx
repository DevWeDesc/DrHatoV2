import { useState, useContext, useEffect } from "react";
import {
  ChakraProvider,
  Flex,
  Box,
  Button,
  Text,
  Table,
  Tr,
  Td,
  Thead,
  Tbody,
} from "@chakra-ui/react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { GenericSidebar } from "../../components/Sidebars/GenericSideBar";
import { GenericLink } from "../../components/Sidebars/GenericLink";
import {
  BsArrowLeft,
  AiOutlineMenu,
  IoIosFlask,
  BsImages,
} from "react-icons/all";
import { HemoTable } from "../../components/ProceduresTable/HemoTable";
import { Header } from "../../components/admin/Header";

export function SetPetExam() {
  const { id } = useParams<{ id: string }>();
  const [option, setOption] = useState<null | string>(null);

  return (
    <ChakraProvider>
      <Flex direction="column" h="100vh">
        <Header title="Tabela de Laboratórios" />
        <Flex w="100%" my="6" mx="auto" px="6">
          <GenericSidebar>
            <GenericLink icon={BsArrowLeft} name="Voltar" path="/Home" />
            <GenericLink icon={AiOutlineMenu} name="Menu" path="/Labs" />
            <GenericLink
              icon={IoIosFlask}
              name="Laboratório"
              path="/Labs/Exames"
            />
            <GenericLink
              icon={BsImages}
              name="Laboratório Imagens"
              path="/Labs/Imagens"
            />
          </GenericSidebar>
          <Box
            height={option != null ? "86vh" : "30vh"}
            w="70%"
            borderRadius={8}
            bg="gray.200"
            p="8"
            overflowX="auto"
            overflowY="auto"
          >
            <Flex direction="column" align="center" p="4">
              <Text fontSize="25" fontWeight="bold">
                Que tipo de exame irá preencher?
              </Text>
              <Flex mt="4" width="100%" justify="space-evenly">
                <Button
                  colorScheme="whatsapp"
                  w="30%"
                  py="6"
                  onClick={() => setOption("Hemograma")}
                >
                  Tabela Hemograma
                </Button>
                <Button
                  colorScheme="whatsapp"
                  w="30%"
                  py="6"
                  onClick={() => setOption("Eritograma")}
                >
                  Eritograma
                </Button>
                <Button
                  colorScheme="whatsapp"
                  w="30%"
                  py="6"
                  onClick={() => setOption("Hemo + Eritograma")}
                >
                  Hemo + Eritograma
                </Button>
              </Flex>
            </Flex>
            <HemoTable Option={option} />
          </Box>
        </Flex>
      </Flex>
    </ChakraProvider>
  );
}
