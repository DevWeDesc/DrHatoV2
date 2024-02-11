import {
  ChakraProvider,
  Flex,
  Button,
  Text,
  Input,
  SimpleGrid,
} from "@chakra-ui/react";
import { AdminContainer } from "../../AdminDashboard/style";
import LogoHatoRelatorios from "../../../assets/logoHatoRelatórios.jpg";
import { useNavigate, useParams } from "react-router-dom";
import { TbArrowBack } from "react-icons/tb";
import { ReportsGeneticTable } from "../../../components/Tables/ReportsGenericTable";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { ReportsExamsData } from "../../../mocks/ReportsExams";
import { ReportsVetData } from "../../../mocks/ReportsVetData";
import { ReportFinanceData } from "../../../mocks/ReportsFinance";
import { CSVLink } from "react-csv";
import { api } from "../../../lib/axios";
import { Toast } from "react-toastify/dist/components";
import { IReportResponse } from "../../../interfaces";

interface IDataReport {
  initialDate: Date | null | string;
  finallyDate: Date | null | string;
}

export const GenericReports = () => {
  const navigate = useNavigate();
  const { typeReports } = useParams();
  const [showTable, setShowTable] = useState(false);
  const [DateReport, setDateReport] = useState({
    initialDate: null,
    finallyDate: null,
  } as IDataReport);
  const [reportFinanceDataAPI, setReportFinanceDataAPI] = useState(
    {} as IReportResponse
  );
  const formattedData = (date: string | Date | null | any) => {
    return Intl.DateTimeFormat().format(new Date(date));
  };
  const initialDateFormated = formattedData(DateReport.initialDate);
  const finallyDateFormated = formattedData(DateReport.finallyDate);

  const TitleSection = () => {
    let title = "";
    switch (true) {
      case typeReports == "Vets":
        title = "Ambulatório";
        break;
      case typeReports == "Exams":
        title = `Valores contidos durante eo período: ${initialDateFormated} e ${finallyDateFormated}`;
        break;
      default:
        title = `Faturamento por setor no período compreendido entre ${initialDateFormated} e ${finallyDateFormated}.`;
    }
    return title;
  };

  const DataCSVExport = () => {
    let Data: any = [];
    switch (true) {
      case typeReports == "Vets":
        Data = ReportsVetData;
        break;
      case typeReports == "Exams":
        Data = ReportsExamsData;
        break;
      default:
        Data = [
          ...ReportFinanceData.Ambulatorio,
          ...ReportFinanceData.Anestesia,
          ...ReportFinanceData.Cardiologia,
        ];
    }
    return Data;
  };

  const handleShowTable = () => {
    const condition =
      DateReport.initialDate == null || DateReport.finallyDate == null;

    if (condition) {
      toast.error("Insira a data de começo e final do relatório!");
    } else {
      console.log(DateReport);
      setShowTable(true);
    }
  };

  const handelInitialDate = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setDateReport({
      ...DateReport,
      initialDate: new Date(ev.target.value).toISOString(),
    });
  };

  const handelFinalDate = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setDateReport({
      ...DateReport,
      finallyDate: new Date(ev.target.value).toISOString(),
    });
  };

  const GetFinanceSector = async () => {
    const data = {
      initialDate: DateReport.initialDate,
      finalDate: DateReport.finallyDate,
    };
    await api
      .post("/reports/sector", data)
      .then((res) => {
        setReportFinanceDataAPI(res.data);
        toast.success("Relatório gerado com sucesso!");
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  let title = TitleSection();
  let dataCSV = DataCSVExport();
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
              {showTable ? (
                <>
                  <Text textAlign="center" fontWeight="bold">
                    {title}
                  </Text>
                  <ReportsGeneticTable
                    dataReport={reportFinanceDataAPI}
                    tableType={`${typeReports}`}
                  />
                  <CSVLink filename={`relatorio${typeReports}`} data={dataCSV}>
                    <Button
                      maxW="-webkit-max-content"
                      px={21}
                      py={7}
                      colorScheme="whatsapp"
                    >
                      Exportar Excel
                    </Button>
                  </CSVLink>
                  ;
                </>
              ) : (
                <SimpleGrid flex="1" w="100%" align="flex-start" as={Flex}>
                  <Flex direction="column" w="100%" h="100%" p="8">
                    <Flex direction="column" border="2px solid black">
                      <Text
                        textAlign="center"
                        fontSize="18"
                        px="4"
                        my="4"
                        fontWeight="bold"
                      >
                        Insira as Datas de inicio e fim para visualizar o
                        relatório!!
                      </Text>
                      <Flex
                        borderY="1px solid black"
                        borderTop="2px solid black"
                        alignItems="center"
                      >
                        <Text
                          fontSize="18"
                          px="4"
                          fontWeight="bold"
                          py="4"
                          w="20%"
                        >
                          Data Inicial
                        </Text>
                        <Input
                          borderColor="black"
                          rounded="0"
                          height="100%"
                          borderX="2px solid black"
                          borderTop="2px solid black"
                          type="date"
                          fontWeight="bold"
                          onChange={(ev) => handelInitialDate(ev)}
                        />
                      </Flex>
                      <Flex borderY="1px solid black" alignItems="center">
                        <Text
                          fontSize="18"
                          px="4"
                          fontWeight="bold"
                          py="4"
                          w="20%"
                        >
                          Data Final
                        </Text>
                        <Input
                          type="date"
                          borderColor="black"
                          rounded="0"
                          borderX="2px solid black"
                          height="100%"
                          fontWeight="bold"
                          onChange={(ev) => handelFinalDate(ev)}
                        />
                      </Flex>
                      <Button
                        colorScheme="facebook"
                        fontWeight="bold"
                        fontSize="20"
                        py="8"
                        rounded="0"
                        onClick={() => {
                          GetFinanceSector();
                          handleShowTable();
                        }}
                      >
                        Visualizar
                      </Button>
                    </Flex>
                  </Flex>
                </SimpleGrid>
              )}
            </Flex>
          </Flex>
        </Flex>
      </AdminContainer>
    </ChakraProvider>
  );
};
