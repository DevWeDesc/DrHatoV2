import {
  Box,
  ChakraProvider,
  Flex,
  Text,
  Button,
  Input,
} from "@chakra-ui/react";
import { borderRadius } from "polished";
import { useState } from "react";
import { BiHome } from "react-icons/bi";
import { TbArrowBack } from "react-icons/tb";
import { useNavigate, useParams } from "react-router";
import { AdminContainer } from "../../pages/AdminDashboard/style";
import { WorkSpaceHeader } from "../../pages/Vets/styles";
import ProceduresVets from "../Procedures";
import ProceduresAdmissions from "./procedures";

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
              <ProceduresVets />
            </Box>
          </Flex>
        </Flex>
      </AdminContainer>
    </ChakraProvider>
  );
}
