import { AdminContainer } from "./style";
import { Box, ChakraProvider, SimpleGrid, Text, theme } from '@chakra-ui/react'
import { Flex } from "@chakra-ui/react"
import Chart from 'react-apexcharts'
import { Header } from "../../components/admin/Header";
import { Sidebar } from "../../components/admin/Sidebar";

const options ={
  chart: {
    toolbar: {
      show: true
    },
    zoom: {
      enabled: false
    },
    foreColor: theme.colors.gray[700],
    dataLabels: {
      enabled: false
    },
    tooltip: {
      enabled: false
    },
    
  },
  xaxis: {
    type: 'category',
    categories: ['Segunda'
    , 'Terça','Quarta','Quinta','Sexta','Sábado', 'Domingo'
  ]
    
  }

}


const series = [
  {name: ['Internados'], data: [8,2,3,6,1,14,7]}
]



export function AdminCharts() {
  
  return (
    <ChakraProvider>
      <AdminContainer>
        <Flex direction="column" h="100vh">
        <Header title="Gráficos" />

        <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
            <Sidebar />

            <SimpleGrid 
            flex="1"
            gap="4"
            minChildWidth="320px"
            align="flex-start" as={Flex}
            >
              <Box 
              p="8"
              bg="gray.100"
              borderRadius={8}
              >
                <Text fontSize="lg" mb="4">
                  Pacientes Semanal
                </Text>
                <Chart options={options as any} series={series as any} type="area" height={160} />
              </Box>
              <Box 
              p="8"
              bg="gray.100"
              borderRadius={8}
              >
                <Text fontSize="lg" mb="4">
                  Internações Semanal
                </Text>
                <Chart options={options as any} series={series as any} type="area" height={160} />
              </Box>
            </SimpleGrid>
        </Flex>
        </Flex>
    </AdminContainer>
    </ChakraProvider>
  )
}