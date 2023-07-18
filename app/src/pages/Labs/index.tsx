import {
  Text,
  Flex,
  Box,
  SimpleGrid,
  ChakraProvider,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
} from "@chakra-ui/react";
import { GenericSidebar } from "../../components/Sidebars/GenericSideBar";
import { GenericLink } from "../../components/Sidebars/GenericLink";
import {
  AiOutlineMenu,
  BsArrowLeft,
  IoIosFlask,
  BsImages,
} from "react-icons/all";
import { Link } from "react-router-dom";
import { Header } from "../../components/admin/Header";
import { motion } from "framer-motion";

export function LabMenu() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <ChakraProvider>
        <Flex direction="column" h="100vh">
          <Header title="Laboratórios" />
          <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
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
            <SimpleGrid flex="1" as={Flex}>
              <Box textAlign="center" p="8" bg="gray.100" borderRadius={8}>
                <Text fontSize={30} py="3" fontWeight="bold">
                  Bem vindo(a) ao Laboratório!! 😄
                </Text>

                <Flex mt="8" justify="center" direction="row" gap={8}>
                  <Card
                    align="center"
                    w="50%"
                    px="9"
                    py="4"
                    _hover={{ boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.1)" }}
                  >
                    <CardHeader>
                      <Heading size="lg">Laboratório</Heading>
                    </CardHeader>
                    <CardBody>
                      <Text>
                        Descubra o poder da inovação em nosso Laboratório de
                        Inovação Tecnológica. Aqui, mergulhamos em um mundo de
                        criatividade, colaboração e experimentação para
                        impulsionar a próxima geração de soluções tecnológicas.
                      </Text>
                    </CardBody>
                    <CardFooter w="100%">
                      <Link to="/Labs/Exames" style={{ width: "100%" }}>
                        <Button
                          colorScheme="whatsapp"
                          w="100%"
                          py="8"
                          fontSize="20"
                        >
                          Ir até pesquisa
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                  <Card
                    px="9"
                    py="4"
                    align="center"
                    w="50%"
                    _hover={{ boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.1)" }}
                  >
                    <CardHeader>
                      <Heading size="lg">Laboratório de imagens</Heading>
                    </CardHeader>
                    <CardBody>
                      <Text>
                        Descubra o poder da inovação em nosso Laboratório de
                        Inovação Tecnológica. Aqui, mergulhamos em um mundo de
                        criatividade, colaboração e experimentação para
                        impulsionar a próxima geração de soluções tecnológicas.
                      </Text>
                    </CardBody>
                    <CardFooter w="100%">
                      <Link to="/Labs/Imagens" style={{ width: "100%" }}>
                        <Button
                          colorScheme="whatsapp"
                          w="100%"
                          py="8"
                          fontSize="20"
                        >
                          Ir até pesquisa
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                </Flex>
              </Box>
            </SimpleGrid>
          </Flex>
        </Flex>
      </ChakraProvider>
    </motion.div>
  );
}
