import { ChakraProvider, Flex, Button, Text } from "@chakra-ui/react";
import { AdminContainer } from "../../AdminDashboard/style";
import LogoHatoRelatorios from "../../../assets/logoHatoRelatórios.jpg";
import { useNavigate, useParams } from "react-router-dom";
import { TbArrowBack } from "react-icons/tb";
import { ReportsGeneticTable } from "../../../components/Tables/ReportsGenericTable";

export const GenericReports = () => {
  const navigate = useNavigate();
  const { typeReports } = useParams();
  const TitleSection = () => {
    let title = "";
    switch (true) {
      case typeReports == "Vets":
        title = "Ambulatório";
        break;
      case typeReports == "Exams":
        title = "Valores contidos durante eo período: 01/01/2024 e 11/01/2024";
        break;
      default:
        title =
          "Faturamento por setor no período compreendido entre 01/01/2024 e 11/01/2024";
    }
    return title;
  };

  let title = TitleSection();
  return (
    <ChakraProvider>
      <AdminContainer>
        <Flex direction="column" h="100vh">
          <Flex w="100%" my="6" maxWidth={"100%"} mx="auto" px="6">
            <Flex direction="column" w="100%" h="100%" gap="50px">
              <Flex justifyContent="space-between" alignItems="center">
                <img src={LogoHatoRelatorios} alt="" style={{ width: "55%" }} />
                <Button
                  colorScheme="yellow"
                  onClick={() => navigate("/Reports")}
                >
                  <TbArrowBack size={23} />
                  <span style={{ marginLeft: "10px" }}>Voltar</span>
                </Button>
              </Flex>
              <Text textAlign="center" fontWeight="bold">
                {title}
              </Text>
              <ReportsGeneticTable tableType={`${typeReports}`} />
            </Flex>
          </Flex>
        </Flex>
      </AdminContainer>
    </ChakraProvider>
  );
};
