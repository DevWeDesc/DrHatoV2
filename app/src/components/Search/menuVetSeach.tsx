import {
  Flex,
  HStack,
  VStack,
  FormLabel,
  Checkbox,
  Button,
  Grid,
  Stack,
} from "@chakra-ui/react";
import React from "react";
import { Input } from "../admin/Input";

interface IMenuVetSeach {
  setInitialDate: (value: React.SetStateAction<string>) => void;
  setFinalDate: (value: React.SetStateAction<string>) => void;
  setIsFinishied: (value: React.SetStateAction<boolean>) => void;
  setIsAddmited: (value: React.SetStateAction<boolean>) => void;
  setShowAllVets: (value: React.SetStateAction<boolean>) => void;
  setCodPet: (value: React.SetStateAction<string>) => void;
  setCustomerName: (value: React.SetStateAction<string>) => void;
  setPetName: (value: React.SetStateAction<string>) => void;
  handleGetDataWithParams: () => void;
  values: IFiltersValues;
}

interface IFiltersValues {
  codPet: string;
  petName: string;
  customerName: string;
}

export const MenuVetSeach = ({
  setInitialDate,
  setFinalDate,
  setIsFinishied,
  setIsAddmited,
  setShowAllVets,
  setCodPet,
  setPetName,
  setCustomerName,
  values,
  handleGetDataWithParams,
}: IMenuVetSeach) => {
  return (
    <div>
      <Flex direction="column" gap={4}>
        <Flex
          alignItems="center"
          justifyItems="center"
          direction={{ base: "column", lg: "row" }}
          gap={8}
        >
          <Flex
            direction={{ base: "column", lg: "row" }}
            align="center"
            justify="center"
            gap="8"
          >
            <Flex gap={8}>
              <Input
                name="initialDate"
                onChange={(ev) => setInitialDate(ev.target.value)}
                label="data inicial"
                type="date"
              />
              <Input
                name="finalDate"
                onChange={(ev) => setFinalDate(ev.target.value)}
                label="data final"
                type="date"
              />
            </Flex>
          </Flex>
          <Stack spacing={5} direction="row">
            <Checkbox
              onChange={(ev) =>
                ev.target.checked === true
                  ? setIsFinishied(true)
                  : setIsFinishied(false)
              }
              borderColor="gray.400"
              size="lg"
            >
              Finalizados
            </Checkbox>
            <Checkbox
              onChange={(ev) =>
                ev.target.checked === true
                  ? setShowAllVets(true)
                  : setShowAllVets(false)
              }
              borderColor="gray.400"
              size="lg"
            >
              Todos Veterinários
            </Checkbox>
            <Checkbox
              onChange={(ev) =>
                ev.target.checked === true
                  ? setIsAddmited(true)
                  : setIsAddmited(false)
              }
              borderColor="gray.400"
              size="lg"
            >
              Internados
            </Checkbox>
          </Stack>
        </Flex>
        <Flex gap={8}>
          <Input
            name="codPet"
            value={values.codPet}
            onChange={(ev) => setCodPet(ev.target.value)}
            label="Código do Animal"
          />
          <Input
            name="petName"
            value={values.petName}
            onChange={(ev) => setPetName(ev.target.value)}
            label="Nome do Animal"
          />
          <Input
            name="customerName"
            value={values.customerName}
            onChange={(ev) => setCustomerName(ev.target.value)}
            label="Nome do Cliente"
          />
        </Flex>
        {/* </HStack> */}
        <Button
          onClick={() => handleGetDataWithParams()}
          mt="4"
          colorScheme="whatsapp"
        >
          FILTRAR
        </Button>
      </Flex>
    </div>
  );
};
