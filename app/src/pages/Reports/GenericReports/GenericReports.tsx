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
import { useState } from "react";
import { toast } from "react-toastify";
import { ReportsExamsData } from "../../../mocks/ReportsExams";
import { ReportsVetData } from "../../../mocks/ReportsVetData";
import { ReportFinanceData } from "../../../mocks/ReportsFinance";

import {utils, writeFile} from 'xlsx'

import { api } from "../../../lib/axios";
import { IReportExams, IReportResponse } from "../../../interfaces";

interface IDataReport {
  initialDate: Date | null | string;
  finallyDate: Date | null | string;
}

interface IReportDataAPI {
  ResponseSector: IReportResponse;
  ReponseExams: IReportExams[];
}

export const GenericReports = () => {
  const navigate = useNavigate();
  const { typeReports } = useParams();
  const [showTable, setShowTable] = useState(false);
  const [DateReport, setDateReport] = useState({
    initialDate: null,
    finallyDate: null,
  } as IDataReport);
  const [reportDataAPI, setReportDataAPI] = useState({} as IReportDataAPI);
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
        setReportDataAPI({ ...reportDataAPI, ResponseSector: res.data });
        if (showTable) toast.success("Relatório gerado com sucesso!");
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  const GetExamsReports = async () => {
    const data = {
      initialDate: DateReport.initialDate,
      finalDate: DateReport.finallyDate,
    };
    await api
      .post("/reports/exams", data)
      .then((res) => {
        setReportDataAPI({ ...reportDataAPI, ReponseExams: res.data });
        if (showTable) toast.success("Relatório gerado com sucesso!");
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  let title = TitleSection();
  let dataCSV = DataCSVExport();

  async function createExcellReport() {
    const data = {
      initialDate: "2024-02-09T13:15:46.541Z",
      finalDate: "2024-02-10T13:15:46.541Z",
    };

    await api.post("/reports/sector", data).then((response) => {
      const reports = response.data.reports;
      const procedures = reports.map((report: any, index: any) => {
        return report.report.consults?.procedures.concat(
          report.report.admissions?.procedures
        );
      });

      const dados: any = [];
      //@ts-ignore
      reports.map((report, index) => {
        dados.push(
          [report.name],
          [
            "Procedimento",
            "QTD AMB",
            "QTD INT",
            "FAT AMB",
            "FAT INT",
            "QTD TOTAL",
            "FAT TOTAL",
          ],
          [procedures[index]?.name]
        );
      });

      const wb = utils.book_new();
      const ws = utils.json_to_sheet(dados);
      utils.book_append_sheet(wb, ws, "Relatório");
      writeFile(wb, "Relatório.xlsx");
    });
  }

  const getReportByParam = () => {
    switch (typeReports) {
      case "Exams":
        GetExamsReports();
        break;
      case "FinanceSector":
        GetFinanceSector();
        break;
      default:
        GetFinanceSector();
        break;
    }
  };

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
                    dataReport={reportDataAPI.ResponseSector}
                    dataReportExam={reportDataAPI.ReponseExams}
                    tableType={`${typeReports}`}
                  />
                  <Button
                    maxW="-webkit-max-content"
                    px={21}
                    py={7}
                    colorScheme="whatsapp"
                    onClick={() => createExcellReport()}
                  >
                    Exportar ExcelS
                  </Button>
                  {/* <CSVLink filename={`relatorio${typeReports}`} data={dataCSV}>
                
                  </CSVLink> */}
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
                          handleShowTable();
                          getReportByParam();
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
