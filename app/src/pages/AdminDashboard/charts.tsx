import { AdminContainer } from "./style";
import { Box, ChakraProvider, SimpleGrid, Text, theme } from "@chakra-ui/react";
import { Flex } from "@chakra-ui/react";
import Chart from "react-apexcharts";
import { Header } from "../../components/admin/Header";
import { Sidebar } from "../../components/admin/Sidebar";
import { useEffect, useState } from "react";
import { api } from "../../lib/axios";
import { motion } from "framer-motion";

interface MarketingChartProps {
  Facebook: number | 0;
  SiteBusca: number | 0;
  FachadaHospital: number | 0;
  Indicação: number | 0;
  Instagram: number | 0;
  Petshop: number | 0;
  ClienteHato: number | 0;
  PlacaRua: number | 0;
  Twitter: number | 0;
  Outros: number | 0;
}

export function AdminCharts() {
  const [marketing, setMarketing] = useState({} as MarketingChartProps);

  const series = [
    {
      name: ["Marketing"],
      data: [
        marketing.Petshop,
        marketing.Facebook,
        marketing.FachadaHospital,
        marketing.Indicação,
        marketing.Instagram,
        marketing.ClienteHato,
        marketing.PlacaRua,
        marketing.SiteBusca,
        marketing.Twitter,
        marketing.Outros,
      ],
    },
  ];


  const options = {
    chart: {
      toolbar: {
        show: true,
      },
      zoom: {
        enabled: false,
      },
      foreColor: theme.colors.gray[700],
      dataLabels: {
        enabled: false,
      },
      tooltip: {
        enabled: false,
      },
    },
    xaxis: {
      type: "category",
      categories: [
        "Petshop",
        "Facebook",
        "Fachada Hospital",
        "Indicação Amigo",
        "Instagram",
        "Cliente HATO",
        "Placa de Rua",
        "Site de Busca",
        "Twitter",
        "Outros",
      ],
    },
  };

  useEffect(() => {
    async function getMarketingChart() {
      const response = await api.get("/marketing");
      setMarketing(response.data);
    }

    getMarketingChart();
  }, []);

  console.log("RESPOSTA DO MARKETING", marketing);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <ChakraProvider>
        <AdminContainer>
          <Flex direction="column" h="100vh">
            <Header title="Gráficos" />

            <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
              <Sidebar />

              <SimpleGrid
                flex="1"
                gap="4"
                minChildWidth="420px"
                align="flex-start"
                as={Flex}
              >
                <Box p="8" bg="gray.100" borderRadius={8}>
                  <Text fontSize="lg" mb="4">
                    Como o cliente nos conheceu !
                  </Text>
                  <Chart
                    options={options as any}
                    series={series as any}
                    type="area"
                    height={160}
                  />
                </Box>
              </SimpleGrid>
            </Flex>
          </Flex>
        </AdminContainer>
      </ChakraProvider>
    </motion.div>
  );
}
