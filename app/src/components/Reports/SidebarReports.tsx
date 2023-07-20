import { Box, Stack, Text, Icon } from "@chakra-ui/react";
import {
  RiContactsLine,
  RiDashboardLine,
  TbPigMoney,
  TbReportAnalytics,
  GiHealthIncrease,
  AiOutlineSchedule,
  GrUnorderedList,
} from "react-icons/all";
import { Link } from "react-router-dom";
export function SidebarRecords() {
  return (
    <Box as="aside" w="64" mr="8">
      <Stack spacing="12" align="flex-start">
        <Box>
          <Text fontWeight="bold" color="gray.700" fontSize="30">
            GERAL
          </Text>
          <Stack spacing="4" mt="8" align="stretch">
            <Link to="/Reports/">
              <Box display="flex" alignItems="center" color="blue.500">
                <Icon as={GrUnorderedList} fontSize="25" />
                <Text ml="4" fontWeight="medium" fontSize="25" color="gray.700">
                  Todas opções
                </Text>
              </Box>
            </Link>
            {/*
            <Link to="/Admin/Charts">
              <Box display="flex" alignItems="center" color="green.300">
                <Icon as={RiDashboardLine} fontSize="25" />
                <Text ml="4" fontWeight="medium" fontSize="25" color="gray.700">
                  Dashboard
                </Text>
              </Box>
            </Link>

            <Link to="/Users">
              <Box display="flex" alignItems="center" color="green.300">
                <Icon as={RiContactsLine} fontSize="25" />
                <Text ml="4" fontWeight="medium" fontSize="25" color="gray.700">
                  Usuários
                </Text>
              </Box>
            </Link>

            <Link to="/Vets">
              <Box display="flex" alignItems="center" color="green.300">
                <Icon as={GiHealthIncrease} fontSize="25" />
                <Text ml="4" fontWeight="medium" fontSize="25" color="gray.700">
                  Veterinários
                </Text>
              </Box>
            </Link>

            <Link to="/Schedule">
              <Box display="flex" alignItems="center" color="green.300">
                <Icon as={AiOutlineSchedule} fontSize="25" />
                <Text ml="4" fontWeight="medium" fontSize="25" color="gray.700">
                  Agendar
                </Text>
              </Box>
            </Link>
          </Stack>
        </Box>

        <Box>
          <Text fontWeight="bold" color="gray.700" fontSize="30">
            FINANCEIRO
          </Text>
          <Stack spacing="4" mt="8" align="stretch">
            <Link to="/Reports">
              <Box
                display="flex"
                alignItems="center"
                color="green.300"
                cursor="pointer"
              >
                <Icon as={TbReportAnalytics} fontSize="25" />
                <Text ml="4" fontWeight="medium" fontSize="25" color="gray.700">
                  Relatórios
                </Text>
              </Box>
            </Link>
            <Box display="flex" alignItems="center" color="green.300">
              <Icon as={TbPigMoney} fontSize="25" />
              <Text ml="4" fontWeight="medium" fontSize="25" color="gray.700">
                Contas
              </Text>
  </Box>*/}
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}
