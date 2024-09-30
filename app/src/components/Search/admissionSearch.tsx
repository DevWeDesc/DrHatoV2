import {
  ChakraProvider,
  Flex,
  Button,
  FormControl,
  HStack,
  VStack,
  Checkbox,
  FormLabel,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { api } from "../../lib/axios";
import { Input } from "../admin/Input";
import { Dispatch, SetStateAction } from "react";
import { PetDetaisl } from "../../interfaces";
import { useQuery } from "react-query";

interface UniversalSearchProps {
  path: string;
  setFinished: Dispatch<SetStateAction<boolean>>;
  setAdmmitedPets: Dispatch<SetStateAction<PetDetaisl[]>>;
  finished: boolean;
}

interface AdmissionFormProps {
  name: string;
  petName: string;
  codPet: string;
}

export function AdmissionSearch({
  path,
  setFinished,
  finished,
  setAdmmitedPets,
}: UniversalSearchProps) {

  const { register, handleSubmit, getValues } = useForm<AdmissionFormProps>();

  async function fetchAdmittedPets() {
    const formValues:AdmissionFormProps = getValues();
  
    const response = await api.get<PetDetaisl[]>(`/filtredqueryadmissions?codPet=${formValues.codPet}&animalName=${formValues.petName}&clientName=${formValues.name}&finished=${finished}`);
    return response.data;

  };

  const { refetch } = useQuery<PetDetaisl[]>({
    queryKey: ["petsadmitted"],
    queryFn: fetchAdmittedPets,
    onSuccess: (data) => {
      setAdmmitedPets(data);
    }
  });

  return (
    <ChakraProvider>
      <Flex width={"full"} direction="row" gap="4">
        <FormControl width={"full"} as="form" onSubmit={handleSubmit(() => refetch())}>
          <VStack width={"full"}>
            <HStack width={"full"}>
              <Input
                label="Nome do Cliente"
                {...register("name")}
                name="name"
              />
              <Input
                label="Nome do Animal"
                {...register("petName")}
                name="petName"
              />
              <Input
                label="Código Animal"
                {...register("codPet")}
                name="codPet"
                type="number"
              />
              <VStack w={160}>
                <FormLabel whiteSpace={"nowrap"}>Finalizados</FormLabel>
                <Checkbox
                  onChange={(ev) => {
                    setFinished(ev.target.checked);
                  }}
                  border="2px"
                  size="lg"
                />
              </VStack>

              <Flex alignSelf={"end"} gap="2" direction="column">
                <Button type="submit" colorScheme="whatsapp" minWidth={220}>
                  Filtrar
                </Button>
              </Flex>
            </HStack>
          </VStack>
        </FormControl>
      </Flex>
    </ChakraProvider>
  );
}
