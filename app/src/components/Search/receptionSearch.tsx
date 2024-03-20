import {
  ChakraProvider,
  Flex,
  Button,
  Text,
  FormControl,
  VStack,
  Grid,
} from "@chakra-ui/react";
import { api } from "../../lib/axios";
import { Input } from "../admin/Input";
import { useState, useContext, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { DbContext } from "../../contexts/DbContext";
import { CPFInput } from "../InputMasks/CPFinput";

interface UniversalSearchProps {
  path: string;
}

export function RecepetionSearch({ path }: UniversalSearchProps) {
  const navigate = useNavigate();
  const { setCustomers } = useContext(DbContext);
  const [customerCpf, setCustomerCpf] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerRg, setCustomerRg] = useState("");
  const [customerCodAnimal, setCustomerCodAnimal] = useState("");

  async function searchCustomer() {
    try {
      switch (true) {
        case customerCpf.length >= 1:
          const responseData = await api.get(`${path}?cpf=${customerCpf}`);
          setCustomers(responseData.data);
          break;
        case customerName.length >= 1:
          const responseName = await api.get(`${path}?name=${customerName}`);
          setCustomers(responseName.data);
          break;
        case customerRg.length >= 1:
          const responserg = await api.get(`${path}?rg=${customerRg}`);
          setCustomers(responserg.data);
          break;
        case customerCodAnimal.length >= 1:
          const responsecodpet = await api.get(
            `${path}?codPet=${customerCodAnimal}`
          );
          setCustomers(responsecodpet.data);
          break;
      }
    } catch (error) {
      toast.error("Falha na busca!!");
    }
  }

  useEffect(() => {
    searchCustomer();
  }, [customerCpf, customerName, customerRg, customerCodAnimal]);

  return (
    <ChakraProvider>
      <Flex direction="row" gap="4">
        <FormControl>
          <Grid
            gap={2}
            templateColumns={{
              base: "repeat(2,1fr)",
              lg: "repeat(3,1fr)",
              xl: "repeat(5,1fr)",
            }}
          >
            <Input
              fontSize={{ base: "12", lg: "sm" }}
              label="Nome do Cliente"
              name="customerName"
              onChange={(ev) => setCustomerName(ev.target.value)}
            />
            <VStack minW="full" justifyContent="end" align="flex-start">
              <Text fontSize={{ base: "12", lg: "sm" }}>CPF do Cliente</Text>
              <CPFInput
                width={100}
                name="cpf"
                onChange={(ev: React.ChangeEvent<HTMLInputElement>) =>
                  setCustomerCpf(ev.target.value)
                }
              />
            </VStack>

            <Input
              fontSize={{ base: "12", lg: "sm" }}
              label="R.G do Cliente"
              onChange={(ev) => setCustomerRg(ev.target.value)}
              name="rg"
            />
            <Input
              fontSize={{ base: "12", lg: "sm" }}
              label="Código do Animal"
              onChange={(ev) => setCustomerCodAnimal(ev.target.value)}
              name="codPet"
            />
            <Flex
              gridColumn={{ base: "span 2", xl: "span 1" }}
              w="full"
              gap="2"
              align="center"
              direction="column"
            >
              <Text fontSize={{ base: "12", lg: "sm" }} fontWeight="bold">
                Pesquisar Clientes
              </Text>
              <Button
                type="submit"
                fontSize={{ base: "12", lg: "sm" }}
                w="full"
                colorScheme="whatsapp"
                minWidth={220}
              >
                {" "}
                Filtrar
              </Button>
            </Flex>
          </Grid>
          <Button
            w="full"
            fontSize={{ base: "12", lg: "sm" }}
            colorScheme="teal"
            mt="4"
            onClick={() => navigate("/Recepcao/Create")}
          >
            Ou adicione um novo Cliente
          </Button>
        </FormControl>
      </Flex>
    </ChakraProvider>
  );
}
