import { ChakraProvider } from "@chakra-ui/react";
import { AdminContainer } from "../AdminDashboard/style";
import { Header } from "../../components/admin/Header";

export const Historic = () => {
  return (
    <ChakraProvider>
      <AdminContainer>
        <Header title="Painel Administrativo" url="/Admin/" />
      </AdminContainer>
    </ChakraProvider>
  );
};
