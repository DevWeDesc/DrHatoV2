import {
  Box,
  ChakraProvider,
  Flex,
  Text,
  Button,
  Input,
} from "@chakra-ui/react";
import { useState } from "react";
import { BiHome } from "react-icons/bi";
import { TbArrowBack } from "react-icons/tb";
import { useNavigate, useParams } from "react-router";
import { AdminContainer } from "../../pages/AdminDashboard/style";
import { WorkSpaceHeader } from "../../pages/Vets/styles";
import ProceduresAdmissions from "./procedures";
import { motion } from "framer-motion";

export default function ProceduresAdmisisonPage() {
  const [listExam, setListExam] = useState<boolean>(false);
  const [nameExam, setNameExam] = useState<string>("");
  const [priceExam, setPriceExam] = useState<string>("");
  const date = new Date();
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  const dataformatted = `${year}-${month}-${day}`;

  const navigate = useNavigate();
  const { id } = useParams();
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
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
                      Painel Procedimetos de Internação
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
                    onClick={() => navigate(`/Admissions/${id}`)}
                  >
                    Voltar
                  </Button>
                </Flex>
              </Flex>
            </WorkSpaceHeader>
            <Flex w="100%" mx="auto">
              <Box w="100%" borderRadius={8}>
                <Flex direction="column">
                  {listExam === true && (
                    <Text
                      w="100%"
                      textAlign="center"
                      bg="gray.700"
                      fontWeight="bold"
                      fontSize="4xl"
                      color="white"
                      py="2"
                    >
                      Procedimentos
                    </Text>
                  )}
                  <Flex direction="column">
                    {listExam === true && (
                      <ProceduresAdmissions
                        nameExam={nameExam}
                        priceExam={priceExam}
                        dataformatted={dataformatted}
                      />
                    )}
                    <Text
                      w="100%"
                      textAlign="center"
                      bg="gray.700"
                      fontWeight="bold"
                      fontSize="4xl"
                      color="white"
                      py="2"
                    >
                      Incluir Procedimento
                    </Text>

                    <Flex bg="gray.200" py="2" justify="center">
                      <Flex border="1px solid black">
                        <Input
                          borderColor="black"
                          rounded="0"
                          w="20vw"
                          bg="white"
                        />
                        <Button color="white" rounded="0" colorScheme="twitter">
                          Procurar
                        </Button>
                      </Flex>
                    </Flex>
                    <Flex border="1px solid black" fontSize="16">
                      <Text
                        border="1px solid black"
                        pl="2"
                        w="85vw"
                        bg="blue.100"
                        fontWeight="bold"
                        fontSize="20"
                      >
                        Procedimento
                      </Text>
                      <Text
                        border="1px solid black"
                        pl="2"
                        w="15vw"
                        bg="blue.100"
                        fontWeight="bold"
                        fontSize="20"
                      >
                        Valor
                      </Text>
                      {/*<Text
                      border="1px solid black"
                      pl="2"
                      w="15vw"
                      bg="blue.100"
                      fontWeight="bold"
                      fontSize="20"
                    >
                      Até 6KG
                    </Text>
                    <Text
                      border="1px solid black"
                      pl="2"
                      w="15vw"
                      bg="blue.100"
                      fontWeight="bold"
                      fontSize="20"
                    >
                      De 7KG á 15KG
                    </Text>
                    <Text
                      border="1px solid black"
                      pl="2"
                      w="15vw"
                      bg="blue.100"
                      fontWeight="bold"
                      fontSize="20"
                    >
                      De 16KG á 35KG
                    </Text>
                    <Text
                      border="1px solid black"
                      pl="2"
                      w="15vw"
                      bg="blue.100"
                      fontWeight="bold"
                      fontSize="20"
                    >
                      + de 35KG
                  </Text>*/}
                    </Flex>
                    <Flex>
                      <Input
                        w="85vw"
                        pl="2"
                        bg="white"
                        fontWeight="bold"
                        fontSize="20"
                        border="1px solid black"
                        rounded="none"
                        value="3° Pálp. Eversão da Certilagem Bi"
                        cursor="pointer"
                        onClick={() => {
                          setNameExam("3° Pálp. Eversão da Certilagem Bi");
                          setPriceExam("R$1.300,00");
                          setListExam(true);
                        }}
                      />

                      <Input
                        w="15vw"
                        pl="2"
                        bg="white"
                        fontWeight="bold"
                        fontSize="20"
                        border="1px solid black"
                        rounded="none"
                        value="R$1.300,00"
                        cursor="pointer"
                      />
                    </Flex>
                    <Flex>
                      <Input
                        w="85vw"
                        pl="2"
                        bg="white"
                        fontWeight="bold"
                        fontSize="20"
                        border="1px solid black"
                        rounded="none"
                        value="3° Pálp. Eversão da Certilagem Uni"
                        cursor="pointer"
                        onClick={() => {
                          setNameExam("3° Pálp. Eversão da Certilagem Uni");
                          setPriceExam("R$1.000,00");
                          setListExam(true);
                        }}
                      />

                      <Input
                        w="15vw"
                        pl="2"
                        bg="white"
                        fontWeight="bold"
                        fontSize="20"
                        border="1px solid black"
                        rounded="none"
                        value="R$1.000,00"
                        cursor="pointer"
                      />
                    </Flex>
                  </Flex>
                </Flex>
              </Box>
            </Flex>
          </Flex>
        </AdminContainer>
      </ChakraProvider>
    </motion.div>
  );
}
