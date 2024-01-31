import {
  Box,
  ChakraProvider,
  Flex,
  Table,
  Tr,
  Td,
  Thead,
  Tbody,
  Th,
} from "@chakra-ui/react";
import { ReactNode, useContext, useEffect, useState } from "react";
import { Header } from "../../../components/admin/Header";
import { AdminContainer } from "../../AdminDashboard/style";
import { useNavigate } from "react-router-dom";
import { DbContext } from "../../../contexts/DbContext";
import { BiCalendarPlus } from "react-icons/all";
import { api } from "../../../lib/axios";
import { ReturnsSearch } from "../../../components/Search/returnsSearch";
import { GenericSidebar } from "../../../components/Sidebars/GenericSideBar";
import { GenericLink } from "../../../components/Sidebars/GenericLink";
import { BsCashCoin, BsReception4 } from "react-icons/bs";

export function BoxReturns() {
  const [returnValue, setReturnValue] = useState([]);

  async function getReturns() {
    const response = await api.get("/returnsAll");
    setReturnValue(response.data);
  }

  useEffect(() => {
    getReturns();
  }, []);

  let typeTable: ReactNode;
  switch (true) {
    // case dataCustomer.length >= 1:
    //   typeTable = (
    //     <Table colorScheme="blackAlpha">
    //       <Thead>
    //         <Tr>
    //           <Th>CPF</Th>
    //           <Th>Cliente</Th>
    //           <Th>Animal</Th>
    //           <Th>Código</Th>
    //           <Th>Data</Th>
    //           <Th>Hora</Th>
    //           <Th>Preferência</Th>
    //           <Th>Especialidade</Th>
    //         </Tr>
    //       </Thead>

    //       <Tbody>
    //         {dataCustomer.map((customer: any) => (
    //           <Tr key={customer.id}>
    //             <Td>{customer.cpf}</Td>

    //             <Td>
    //               <Button
    //                 colorScheme="whatsapp"
    //                 onClick={() => handleNavigateWorkSpace()}
    //               >
    //                 {customer.name}
    //               </Button>
    //             </Td>

    //             <Td>
    //               <Menu>
    //                 <MenuButton border="1px" as={Button} rightIcon={<Burger />}>
    //                   <StyledBox>
    //                     <Text>pets</Text>
    //                   </StyledBox>
    //                 </MenuButton>
    //                 <MenuList bg="green.100">
    //                   {customer.pets?.map((pets: any) => (
    //                     <Flex
    //                       direction="column"
    //                       align="center"
    //                       p="2px"
    //                       gap="2"
    //                       key={pets.id}
    //                     >
    //                       <RadioGroup onChange={setPetValue} value={petValue}>
    //                         <Radio
    //                           bgColor={petValue == pets.id ? "green" : "red"}
    //                           value={pets.id as any}
    //                         >
    //                           {pets.name}
    //                         </Radio>
    //                       </RadioGroup>
    //                     </Flex>
    //                   ))}
    //                 </MenuList>
    //               </Menu>
    //             </Td>
    //             <Td>92487</Td>
    //             <Td>04/04/2023</Td>

    //             <Td>25:53</Td>
    //             <Td>
    //               {customer.vetPreference
    //                 ? customer.vetPreference
    //                 : "Sem Preferência"}
    //             </Td>
    //             <Td>0</Td>
    //           </Tr>
    //         ))}
    //       </Tbody>
    //     </Table>
    //   );
    //   break;
    // case dataPet.length >= 1:
    //   typeTable = (
    //     <Table colorScheme="blackAlpha">
    //       <Thead>
    //         <Tr>
    //           <Th>Nome</Th>

    //           <Th>Código</Th>
    //           <Th>Nascimento</Th>
    //           <Th>Preferência</Th>
    //           <Th>Especialidade</Th>
    //         </Tr>
    //       </Thead>

    //       <Tbody>
    //         {dataPet.map((pet: any) => (
    //           <Tr key={pet.id}>
    //             <Td>
    //               <Button
    //                 colorScheme="whatsapp"
    //                 onClick={() => navigate(`/Vets/Workspace/${pet.id}`)}
    //               >
    //                 {pet.name}
    //               </Button>
    //             </Td>

    //             <Td>{pet.codPet}</Td>

    //             <Td>{pet.bornDate}</Td>

    //             <Td>
    //               {pet.vetPreference ? pet.vetPreference : "Sem Preferência"}
    //             </Td>
    //             <Td>0</Td>
    //           </Tr>
    //         ))}
    //       </Tbody>
    //     </Table>
    //   );
    //   break;
    default:
      typeTable = (
        <>
          <Table colorScheme="blackAlpha" w="100%">
            <Thead w="100%">
              <Tr>
                <Th>Cliente</Th>
                <Th>Data</Th>
                <Th>Valor</Th>
                <Th>Motivo</Th>
              </Tr>
            </Thead>

            <Tbody w="100%">
              {returnValue.map((ret: any) => (
                <Tr
                  key={ret.id}
                  cursor="pointer"
                  // onClick={() =>
                  //   navigate(`/Recepcao/Caixa/rets/${parseInt(person.id)}`)
                  // }
                >
                  <Td>{ret.customerAccount.customer.name}</Td>

                  <Td
                    cursor="pointer"
                    // onClick={() =>
                    //   navigate(`/Recepcao/Caixa/rets/${person.id}`)
                    // }
                  >
                    {new Intl.DateTimeFormat("pt-BR", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      timeZone: "America/Sao_Paulo",
                    }).format(new Date(ret.date))}
                  </Td>
                  <Td>{ret.value.toString().concat(",00")}</Td>
                  <Td>{ret.reasonForReturn}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </>
      );
      break;
  }
  return (
    <ChakraProvider>
      <AdminContainer>
        <Flex direction="column" h="100vh">
          <Header title="Painel de Devoluções" url="/Recepcao" />
          <Flex w="100%" my="6" maxWidth={1680} mx="auto" px="6">
            <GenericSidebar>
              <GenericLink
                name="Caixa"
                icon={BiCalendarPlus}
                path={`/Recepcao/Caixa`}
              />
              <GenericLink
                name="Recepção"
                icon={BsReception4}
                path={`/Recepcao/`}
              />
              <GenericLink
                name="Painel de Pagamentos"
                icon={BsCashCoin}
                path="/Recepcao/Caixa/Pagamentos"
              />
            </GenericSidebar>
            <Box
              flex="1"
              borderRadius={8}
              bg="gray.200"
              p="8"
              maxH="44rem"
              overflow="auto"
            >
              <Flex mb="8" gap="8" direction="column" align="center">
                <ReturnsSearch path="filtredquery" />
                {/* <Button colorScheme="teal" onClick={() => navigate("/Queue")}> */}
                {/* <>TOTAL NA FILA: {totalInQueue.totalInQueue}</> */}
                {/* </Button> */}
                <Flex textAlign="center" justify="center" w="80%">
                  {typeTable}
                </Flex>
              </Flex>
            </Box>
          </Flex>
        </Flex>
      </AdminContainer>
    </ChakraProvider>
  );
}
