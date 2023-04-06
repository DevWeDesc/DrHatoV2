import { Box, Stack, Text, Icon } from "@chakra-ui/react"
import { RiContactsLine, GiHealthNormal, BsArrowLeft, TbReportMoney, FaWpforms, GrUnorderedList} from "react-icons/all"
import { Link } from "react-router-dom"
export function ReceptionSidebar() {
  return (
    <Box as="aside" w="64" mr="8">
      <Stack spacing="12" align="flex-start">
        <Box>
          <Text fontWeight="bold" color="gray.700" fontSize="small" >GERAL</Text>
          <Stack spacing="4" mt="8" align="stretch">

          <Link to="/Home/">
            <Box  display="flex" alignItems="center" color="green.300" > 
            <Icon as={BsArrowLeft} fontSize="20"/>
              <Text ml="4" fontWeight="medium" color="gray.700">Voltar</Text>
            </Box>
            </Link>

            <Link to="/Home/Recepcao">
            <Box  display="flex" alignItems="center" color="green.300" > 
            <Icon as={GrUnorderedList} fontSize="20"/>
              <Text ml="4" fontWeight="medium" color="gray.700">Todas opções</Text>
            </Box>
            </Link>
          
            <Link to="/Home/Recepcao/Consultas">
            <Box  display="flex" alignItems="center" color="green.300" > 
            <Icon as={FaWpforms} fontSize="20"/>
              <Text ml="4" fontWeight="medium" color="gray.700">Consultas</Text>
            </Box>
            </Link>

          <Link to="/Home/Recepcao/Finance">
          <Box  display="flex" alignItems="center" color="green.300" > 
            <Icon as={TbReportMoney} fontSize="20"/>
              <Text ml="4" fontWeight="medium" color="gray.700">Caixas</Text>
            </Box>
          </Link>


          <Link to="/Home/Admissions">
          <Box  display="flex" alignItems="center" color="green.300" > 
            <Icon as={GiHealthNormal} fontSize="20"/>
              <Text ml="4" fontWeight="medium" color="gray.700">Internações e Exames</Text>
            </Box>
          </Link>

          <Link to="/Home/Users">
          <Box  display="flex" alignItems="center" color="green.300" > 
            <Icon as={RiContactsLine} fontSize="20"/>
              <Text ml="4" fontWeight="medium" color="gray.700">Administrativo</Text>
            </Box>
          </Link>
          
          </Stack>
        </Box>
      </Stack>
    </Box>
  )
}