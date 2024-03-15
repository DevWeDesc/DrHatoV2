import { AdminContainer } from "./style";
import { Button, ChakraProvider, Grid, SimpleGrid } from "@chakra-ui/react";
import { Flex } from "@chakra-ui/react";

import { Header } from "../../components/admin/Header";
import { Sidebar } from "../../components/admin/Sidebar";
import { useNavigate } from "react-router-dom";
import { AdminLinks } from "../../mocks/AdminLinks";

export function AdminMain() {
  const navigate = useNavigate();
  return (
    <ChakraProvider>
      <AdminContainer>
        <Flex direction="column" h="100vh">
          <Header title="Painel Administrativo" url="/Home" />

          <Flex
            w="100%"
            my="6"
            direction={{ base: "column", xl: "row" }}
            maxWidth={"100%"}
            mx="auto"
            px="6"
          >
            <Sidebar />
            <SimpleGrid
              flex="1"
              mt={{ base: 5, xl: 0 }}
              w="100%"
              align="flex-start"
              as={Flex}
            >
              <Flex h="80vh" justify="center" gap="5">
                <Grid
                  templateColumns={{
                    base: "repeat(1, 1fr)",
                    md: "repeat(2, 1fr)",
                  }}
                  w="100%"
                  gap={{ base: "2", lg: "5" }}
                  my={{ base: 5, lg: 0 }}
                >
                  {AdminLinks.map((link, index) => (
                    <Button
                      key={index}
                      w="full"
                      h="full"
                      colorScheme="whatsapp"
                      fontWeight="bold"
                      fontSize={{ base: "sm", lg: "md" }}
                      py={{ base: 5, lg: 0 }}
                      onClick={() => navigate(`${link.to}`)}
                    >
                      {link.text}
                    </Button>
                  ))}
                </Grid>
              </Flex>
            </SimpleGrid>
          </Flex>
        </Flex>
      </AdminContainer>
    </ChakraProvider>
  );
}
