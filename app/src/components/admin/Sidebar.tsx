import { Box, Stack, Text, Icon } from "@chakra-ui/react"
import { RiContactsLine, RiDashboardLine ,TbPigMoney, TbReportAnalytics, GiHealthIncrease, AiOutlineSchedule, GrUnorderedList } from "react-icons/all"
import { Link } from "react-router-dom"
export function Sidebar() {
  return (
    <Box as="aside" w="64" mr="8">
      <Stack spacing="12" align="flex-start">
        <Box>
          <Text fontWeight="bold" color="gray.700" fontSize="small" >GERAL</Text>
          <Stack spacing="4" mt="8" align="stretch">
          <Link to="/Home/Admin/">
            <Box  display="flex" alignItems="center" color="green.300" > 
            <Icon as={GrUnorderedList} fontSize="20"/>
              <Text ml="4" fontWeight="medium" color="gray.700">Todas opções</Text>
            </Box>
            </Link>



            <Link to="/Home/Admin/Charts">
            <Box  display="flex" alignItems="center" color="green.300" > 
            <Icon as={RiDashboardLine} fontSize="20"/>
              <Text ml="4" fontWeight="medium" color="gray.700">Dashboard</Text>
            </Box>
            </Link>
          
          <Link to="/Home/Users">
          <Box  display="flex" alignItems="center" color="green.300" > 
            <Icon as={RiContactsLine} fontSize="20"/>
              <Text ml="4" fontWeight="medium" color="gray.700">Usuários</Text>
            </Box>
          </Link>

          <Link to="/Home/Vets">
          <Box  display="flex" alignItems="center" color="green.300" > 
            <Icon as={GiHealthIncrease} fontSize="20"/>
              <Text ml="4" fontWeight="medium" color="gray.700">Veterinários</Text>
            </Box>
          </Link>
          
          <Link to="/Home/Schedule">
          <Box  display="flex" alignItems="center" color="green.300" > 
            <Icon as={AiOutlineSchedule} fontSize="20"/>
              <Text ml="4" fontWeight="medium" color="gray.700">Agendar</Text>
            </Box>
          </Link>
          </Stack>
        </Box>

        <Box>
          <Text fontWeight="bold" color="gray.700" fontSize="small" >FINANCEIRO</Text>
          <Stack spacing="4" mt="8" align="stretch">
            <Box display="flex" alignItems="center" color="green.300" > 
            <Icon as={TbReportAnalytics} fontSize="20"/>
              <Text ml="4" fontWeight="medium" color="gray.700">Relatórios</Text>
            </Box>
            <Box display="flex" alignItems="center" color="green.300" > 
            <Icon as={TbPigMoney} fontSize="20"/>
              <Text ml="4" fontWeight="medium" color="gray.700">Contas</Text>
            </Box>
          </Stack>
        </Box>
      </Stack>
    </Box>
  )
}