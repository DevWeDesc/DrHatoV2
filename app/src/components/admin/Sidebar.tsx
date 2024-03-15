import { Box, Stack, Text, Icon, Flex, useStatStyles } from "@chakra-ui/react";
import { useEffect, useState } from "react";
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
export function Sidebar() {
  const [ActualURL, setActualURL] = useState("");
  useEffect(() => {
    setActualURL(window?.location?.href);
  }, [window]);

  return (
    <Box as="aside" w="64" mr="8">
      <Flex
        direction={
          ActualURL.substring(ActualURL.length - 6, ActualURL.length) !=
          "Admin/"
            ? { base: "column", md: "row", xl: "column" }
            : { base: "column", md: "row", lg: "column" }
        }
        gap={{ base: 10 }}
        align="flex-start"
      >
        <Box>
          <Text
            fontWeight="bold"
            color="gray.700"
            fontSize={{ base: "2xl", lg: "2xl" }}
          >
            GERAL
          </Text>
          <Stack spacing="4" mt="8" align="stretch">
            <Link to="/Admin/">
              <Box display="flex" alignItems="center" color="green.300">
                <Icon
                  as={GrUnorderedList}
                  fontSize={{ base: "sm", lg: "xl" }}
                />
                <Text
                  ml="4"
                  fontWeight="medium"
                  fontSize={{ base: "sm", lg: "xl" }}
                  color="gray.700"
                >
                  Todas opções
                </Text>
              </Box>
            </Link>

            <Link to="/Admin/Charts">
              <Box display="flex" alignItems="center" color="green.300">
                <Icon
                  as={RiDashboardLine}
                  fontSize={{ base: "sm", lg: "xl" }}
                />
                <Text
                  ml="4"
                  fontWeight="medium"
                  fontSize={{ base: "sm", lg: "xl" }}
                  color="gray.700"
                >
                  Dashboard
                </Text>
              </Box>
            </Link>

            <Link to="/Users">
              <Box display="flex" alignItems="center" color="green.300">
                <Icon as={RiContactsLine} fontSize={{ base: "sm", lg: "xl" }} />
                <Text
                  ml="4"
                  fontWeight="medium"
                  fontSize={{ base: "sm", lg: "xl" }}
                  color="gray.700"
                >
                  Usuários
                </Text>
              </Box>
            </Link>

            <Link to="/Vets">
              <Box display="flex" alignItems="center" color="green.300">
                <Icon
                  as={GiHealthIncrease}
                  fontSize={{ base: "sm", lg: "xl" }}
                />
                <Text
                  ml="4"
                  fontWeight="medium"
                  fontSize={{ base: "sm", lg: "xl" }}
                  color="gray.700"
                >
                  Veterinários
                </Text>
              </Box>
            </Link>

            <Link to="/Schedule">
              <Box display="flex" alignItems="center" color="green.300">
                <Icon
                  as={AiOutlineSchedule}
                  fontSize={{ base: "sm", lg: "xl" }}
                />
                <Text
                  ml="4"
                  fontWeight="medium"
                  fontSize={{ base: "sm", lg: "xl" }}
                  color="gray.700"
                >
                  Agendar
                </Text>
              </Box>
            </Link>
          </Stack>
        </Box>

        <Box>
          <Text
            fontWeight="bold"
            color="gray.700"
            fontSize={{ base: "2xl", lg: "2xl" }}
          >
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
                <Icon
                  as={TbReportAnalytics}
                  fontSize={{ base: "sm", lg: "xl" }}
                />
                <Text
                  ml="4"
                  fontWeight="medium"
                  fontSize={{ base: "sm", lg: "xl" }}
                  color="gray.700"
                >
                  Relatórios
                </Text>
              </Box>
            </Link>
            <Box display="flex" alignItems="center" color="green.300">
              <Icon as={TbPigMoney} fontSize={{ base: "sm", lg: "xl" }} />
              <Text
                ml="4"
                fontWeight="medium"
                fontSize={{ base: "sm", lg: "xl" }}
                color="gray.700"
              >
                Contas
              </Text>
            </Box>
          </Stack>
        </Box>
      </Flex>
    </Box>
  );
}
