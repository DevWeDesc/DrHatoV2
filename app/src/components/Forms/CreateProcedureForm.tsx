import {
  Text,
  FormControl,
  Checkbox,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Button,
  Textarea,
  Flex,
  VStack,
  HStack,
  Divider,
  Select,
  Grid,
} from "@chakra-ui/react";
import { useState} from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

import { Input } from "../../components/admin/Input";
import { api } from "../../lib/axios";
import { toast } from "react-toastify";
import { GenericModal } from "../Modal/GenericModal";
import { QueryClient, useQuery } from "react-query";
import { LoadingSpinner } from "../Loading";

type ProcedureFormProps = {
  procedureId: number;
  isEditable?: boolean;
};

type ProceduresDTO = {
  healthInsuranceId: any;
  id: number;
  codProcedimento: number;
  name: string;
  price: number;
  priceTwo: number;
  priceThree: number;
  priceFour: number;
  categoryOld: string;
  minAge: number;
  maxAge: number;
  applicableMale: boolean;
  applicableFemale: boolean;
  applicationInterval: string | number;
  categoryProcedure: number;
  available: boolean;
  observations: string;
  group_id: number;
  sector_id: number;
  groups: number;
  appicableEspecies: Array<{
    id: number;
    name?: string;
  }>;
  sector: {
    name: string;
  };
};

type EspeciesDTO = {
  id: number;
  name: string;
  race: Array<{
    id: number;
    name: string;
    codEspOld: number;
    especiesId: number;
  }>;
};

 interface HealthInsurance {
  id:                    number;
  planName:              string;
  disponible:            boolean;
  planProvider:          string;
  graceDays:             number;
  coverageLimit:         number;
  admissionDeduction:    number;
  disponibleAtAdmission: boolean;

}
export function CreateProcedureForm({
  procedureId,
  isEditable
}: ProcedureFormProps) {

  const [procedures, setProcedures] = useState({} as ProceduresDTO);
  const [especies, setEspecies] = useState<EspeciesDTO[]>([]);
  const [especiesModalIsOpen, setEspeciesModalIsOpen] = useState(false);
  const queryClient = new QueryClient()
  const { register, handleSubmit } = useForm();
  const [groups, setGroups] = useState<any[]>([])
  const [sectors, setSectors] = useState<any[]>([])
  const [healthInsurance, setHealthInsurance] = useState<HealthInsurance[]>([])
  const navigate = useNavigate();


  async function getSectorsAndGroupsHealthInsurances () {
    const groupsResponse = await api.get("/groups")
    const sectorsResponse = await api.get("/sectors")
    const healthInsuranceResponse = await api.get("/health/insurance")
    setGroups(groupsResponse.data)
    setSectors(sectorsResponse.data)
    setHealthInsurance(healthInsuranceResponse.data.healthInsurance)
  }

  async function getProceduresData() {
    const response = await api.get(`/procedures/${procedureId}`);
    setProcedures(response.data);
  }

  async function getEspeciesData() {
    const response = await api.get("/pets/especie");
    setEspecies(response.data);
  }

  const {isLoading: especiesIsLoading} = useQuery('especiesList', getEspeciesData)

  if(isEditable) {
    const {isLoading: proceduresIsLoading} = useQuery('proceduresList', getProceduresData)
  }

  const {isLoading: groupAndSectorsIsLoading} = useQuery('groupsAndSectorsAndHealthInsurances', getSectorsAndGroupsHealthInsurances)

  if(groupAndSectorsIsLoading) {
    return <LoadingSpinner />
  }

 


  async function setEspecieInProcedure(especieId: number) {
    await api.put(`/procedures/especies/${procedureId}/${especieId}`);
    queryClient.invalidateQueries("proceduresList")

    toast.success("Especie Adicionada!");
  }

  async function setAllEspecieInProcedure() {
    await api.put(`/procedures/especies/all/${procedureId}`);
    queryClient.invalidateQueries("proceduresList")
    toast.success("Todas Especies Adicionada!");
  }

  async function removeEspecieInProcedure() {
    await api.put(`/procedures/especies/all/remove/${procedureId}`);
      queryClient.invalidateQueries("proceduresList")
    toast.success("Todas Especies Removidas!!");
  }

  const handleCreateProcedure: SubmitHandler<FieldValues> = async (values) => {
    try {
      let rangeAges = [values.minAge, values.maxAge];
  
    
    if(values.health) {
      const healthPlan = healthInsurance.find(h => h.id === Number(values.health))

      if(!healthPlan) {
        throw new Error()
      }
      const data = {
        name: `${values.name} - ${healthPlan.planName}(${healthPlan.planProvider})`,
        price: Number(values.price),
        available: values.available,
        applicationInterval: values.applicationInterval,
        ageRange: rangeAges,
        applicationGender: values.applicableGender,
        observations: values.observations,
        group_id: Number(values.group),
        sector_id: Number(values.sector),
        health_id: Number(values.health)
      };
      
      await api.post("procedures", data);
      toast.success("Procedimento criado com sucesso!");
      navigate("/Admin/Procedures");
 
    } else {
      const data = {
        name: values.name,
        price: Number(values.price),
        available: values.available,
        applicationInterval: values.applicationInterval,
        ageRange: rangeAges,
        applicationGender: values.applicableGender,
        observations: values.observations,
        group_id: Number(values.group),
        sector_id: Number(values.sector),
        health_id: Number(values.health)
      };

      await api.post("procedures", data);
      toast.success("Procedimento criado com sucesso!");
      navigate("/Admin/Procedures");
    }

    } catch (error) {
      toast.error("Falha ao cadastrar procedimento!")
    }
    
  };

  return (
    <>
      {isEditable ? (
        <FormControl
          as="form"
          onSubmit={handleSubmit(handleCreateProcedure)}
          display="flex"
          flexDir="column"
          alignItems="center"
          gap="2"
          padding="4"
        >
          <Grid templateColumns={{ lg: "repeat(2, 1fr)" }}>
            <Flex direction="column" w="100%">
              <HStack gap={4}>
                <Text fontWeight="bold">Especies permitidas:</Text>{" "}
                <Button
                  fontSize={{ base: "sm", lg: "md" }}
                  colorScheme="linkedin"
                  onClick={() => setEspeciesModalIsOpen(true)}
                >
                  Visualizar
                </Button>
              </HStack>

              <Text fontWeight="bold" fontSize={{ base: "sm", lg: "md" }}>
                Nome do Procedimento
              </Text>
              <Input
                mb="1"
                {...register("name")}
                name="name"
                defaultValue={procedures.name}
              />
              <HStack mt="4" mb="4">
                <VStack>
                  <Text fontWeight="bold" fontSize={{ base: "sm", lg: "md" }}>
                    Preço Até 6KG
                  </Text>
                  <Input
                    mb="1"
                    mt="0"
                    {...register("price")}
                    name="price"
                    id="price"
                    defaultValue={procedures.price}
                  />
                </VStack>
                <VStack>
                  <Text fontWeight="bold" fontSize={{ base: "sm", lg: "md" }}>
                    Entre 7 e 15KG
                  </Text>
                  <Input
                    mb="1"
                    mt="0"
                    {...register("priceTwo")}
                    name="priceTwo"
                    id="priceTwo"
                    defaultValue={procedures.priceTwo}
                  />
                </VStack>
                <VStack>
                  <Text fontWeight="bold" fontSize={{ base: "sm", lg: "md" }}>
                    Entre 16 e 35KG
                  </Text>
                  <Input
                    mb="1"
                    mt="0"
                    {...register("priceThree")}
                    name="priceThree"
                    id="priceThree"
                    defaultValue={procedures.priceThree}
                  />
                </VStack>
                <VStack>
                  <Text fontWeight="bold" fontSize={{ base: "sm", lg: "md" }}>
                    35KG +
                  </Text>
                  <Input
                    mb="1"
                    mt="0"
                    {...register("priceFour")}
                    name="priceFour"
                    id="priceFour"
                    defaultValue={procedures.priceFour}
                  />
                </VStack>
              </HStack>

              <Text fontWeight="bold" fontSize={{ base: "sm", lg: "md" }}>
                Intervalo de Aplicação, escreva:
              </Text>
              <Input
                mb="1"
                {...register("applicationInterval")}
                name="applicationInterval"
                defaultValue={
                  procedures.applicationInterval != null
                    ? procedures.applicationInterval
                    : "Não definido"
                }
              />
              <Text fontWeight="bold" fontSize={{ base: "sm", lg: "md" }}>
                Idade Mínima
              </Text>
              <Flex w="100%" mb="1">
                <Input name="minAge" defaultValue={"0"} />
              </Flex>
              <Text fontWeight="bold" fontSize={{ base: "sm", lg: "md" }}>
                Idade Máxima
              </Text>
              <Input name="maxAge" defaultValue={"99999"} />

              <Text mt="4" fontWeight="bold">
                Observações do Procedimento:{" "}
              </Text>
              <Textarea
                {...register("observations")}
                name="observations"
                minHeight={300}
                minWidth={300}
                borderColor="gray.900"
                defaultValue={procedures.observations}
                bg="white"
              ></Textarea>
            </Flex>
            <Flex direction="column" w="100%" mt={{ base: 5, lg: 0 }}>
              <Flex
                shadow="0px 0px 10px rgba(0, 0, 0, 0.5)"
                direction="column"
                ml={{ base: "0", lg: "20" }}
                bg="white"
                height="50%"
                justifyContent="space-between"
                overflowY="auto"
                py="10"
                px="10"
              >
                <Flex gap="2">
                  <Checkbox
                    isChecked={procedures.applicableMale ? true : false}
                    colorScheme="green"
                    {...register("applicableMale")}
                    name="applicableMale"
                    borderColor="gray.800"
                  />
                  <Text fontSize={{ base: "sm", lg: "md" }}>
                    Executável em Macho
                  </Text>
                </Flex>
                <Flex gap="2">
                  <Checkbox
                    isChecked={procedures.applicableFemale ? true : false}
                    {...register("applicableFemale")}
                    colorScheme="green"
                    borderColor="gray.800"
                    name="applicableFemale"
                  />
                  <Text fontSize={{ base: "sm", lg: "md" }}>
                    Executável em Fêmea
                  </Text>
                </Flex>

                <Flex gap="2">
                  <Checkbox
                    disabled
                    colorScheme="green"
                    name="applicableGender"
                    borderColor="gray.800"
                  />
                  <Text fontSize={{ base: "sm", lg: "md" }}>
                    Procedimento é uma Vacina
                  </Text>
                </Flex>
                <Flex gap="2">
                  <Checkbox
                    type="radio"
                    disabled
                    value={"macho"}
                    colorScheme="green"
                    name="applicableGender"
                    borderColor="gray.800"
                  />
                  <Text fontSize={{ base: "sm", lg: "md" }}>
                    Procedimento é uma Cirurgia
                  </Text>
                </Flex>

                <Flex gap="2">
                  <Checkbox
                    isChecked={procedures.available ? true : false}
                    {...register("available")}
                    id="available"
                    name="available"
                    borderColor="gray.900"
                  />
                  <Text fontSize={{ base: "sm", lg: "md" }}>Disponível</Text>
                </Flex>
                <Flex gap="2">
              
                <Text fontWeight="bold" fontSize={{ base: "sm", lg: "md" }}>
                  PERTENCE A ALGUM CONVÊNIO?
                </Text>
                <Select
                 value={Number(
                  healthInsurance.find(
                    (health) => health?.id === procedures?.healthInsuranceId
                  )?.id
                )}
                  {...register("health")}
                  placeholder="SELECIONE O CONVÊNIO"
                  bgColor="gray.300"
                >
                  {healthInsurance.map((health) => (
                    <option key={health.id} value={health.id}>
                      {health.planName}
                    </option>
                  ))}
                </Select>
                </Flex>
              </Flex>

              <Flex
                shadow="0px 0px 10px rgba(0, 0, 0, 0.5)"
                direction="column"
                ml={{ base: "0", lg: "20" }}
                mt="4"
                bg="white"
                height="50%"
                align="centers"
                gap="4"
                overflowY="auto"
                py="10"
                px="10"
              >







                <Text fontWeight="bold" fontSize={{ base: "sm", lg: "md" }}>
                  PERTENCE A ALGUM GRUPO?
                </Text>
                <Select
                  {...register("group")}
                  placeholder="SELECIONE O GRUPO"
                  bgColor="gray.300"
                >
                  {groups.map((group) => (
                    <option key={group.id} value={group.id}>
                      {group.name}
                    </option>
                  ))}
                </Select>

                <Text fontWeight="bold" fontSize={{ base: "sm", lg: "md" }}>
                  PERTENCE A ALGUM SETOR?
                </Text>
                <Select
                  {...register("sector")}
                  placeholder="SELECIONE O SETOR"
                  bgColor="gray.300"
                  value={Number(
                    sectors.find(
                      (sector) => sector?.id === procedures?.sector_id
                    )?.id
                  )}
                >
                  {sectors.map((sector) => (
                    <option key={sector.id} value={sector.id}>
                      {sector.name}
                    </option>
                  ))}
                </Select>
              </Flex>
            </Flex>
          </Grid>

          <Button
            colorScheme="whatsapp"
            mt="8"
            w="100%"
            py="8"
            fontSize={{ base: "md", lg: "lg" }}
            type="submit"
            isDisabled //TODO
          >
            Editar Procedimento
          </Button>
        </FormControl>
      ) : (
        <FormControl
          as="form"
          onSubmit={handleSubmit(handleCreateProcedure)}
          display="flex"
          flexDir="column"
          alignItems="center"
          gap="2"
          padding="4"
        >
          <Flex w="100%">
            <Grid w="full" templateColumns={{ lg: "repeat(2, 1fr)" }}>
              <Flex direction="column" w="full">
                <Text fontWeight="bold" fontSize={{ base: "sm", lg: "md" }}>
                  Nome do Procedimento
                </Text>
                <Input w="full" mb="1" {...register("name")} name="name" />
                <Text fontWeight="bold" fontSize={{ base: "sm", lg: "md" }}>
                  Preço do Procedimento
                </Text>
                <Input mb="1" mt="0" {...register("price")} name="price" />
                <Text fontWeight="bold" fontSize={{ base: "sm", lg: "md" }}>
                  Intervalo de Aplicação, escreva:
                </Text>
                <Input
                  mb="1"
                  {...register("applicationInterval")}
                  name="applicationInterval"
                />
                <Text fontWeight="bold" fontSize={{ base: "sm", lg: "md" }}>
                  Idade Mínima
                </Text>
                <Flex w="100%" mb="1">
                  <NumberInput size="xs" name="minAge" maxW={"100%"} w="100%">
                    <NumberInputField
                      py="5"
                      rounded="md"
                      border="1px solid black"
                      fontSize="18"
                      {...register("minAge")}
                      name="minAge"
                      bg="white"
                      w="100%"
                    />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </Flex>
                <Text fontWeight="bold" fontSize={{ base: "sm", lg: "md" }}>
                  Idade Máxima
                </Text>
                <NumberInput size="xs" name="minAge" maxW={"100%"} w="100%">
                  <NumberInputField
                    {...register("maxAge")}
                    name="maxAge"
                    py="5"
                    rounded="md"
                    border="1px solid black"
                    bg="white"
                    w="100%"
                  />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
                <Text mt="4" fontWeight="bold">
                  Observações do Procedimento:{" "}
                </Text>
                <Textarea
                  {...register("observations")}
                  name="observations"
                  minHeight={300}
                  minWidth={300}
                  borderColor="gray.900"
                  bg="white"
                ></Textarea>
              </Flex>
              <Flex direction="column" mt={{ base: 5, lg: 0 }} w="100%">
                <Flex
                  shadow="0px 0px 10px rgba(0, 0, 0, 0.5)"
                  direction="column"
                  ml={{ base: "0", lg: "20" }}
                  bg="white"
                  height="50%"
                  justifyContent="space-between"
                  overflowY="auto"
                  py="10"
                  px="10"
                >
                  <Flex gap="2">
                    <Checkbox
                      type="radio"
                      {...register("applicableGender")}
                      value={"macho"}
                      colorScheme="green"
                      name="applicableGender"
                      borderColor="gray.800"
                    />
                    <Text fontSize={{ base: "sm", lg: "md" }}>
                      Executável em Macho
                    </Text>
                  </Flex>
                  <Flex gap="2">
                    <Checkbox
                      {...register("applicableGender")}
                      value={"femea"}
                      type="radio"
                      colorScheme="green"
                      borderColor="gray.800"
                      name="applicableGender"
                    />
                    <Text fontSize={{ base: "sm", lg: "md" }}>
                      Executável em Fêmea
                    </Text>
                  </Flex>

                  <Flex gap="2">
                    <Checkbox
                      type="radio"
                      disabled
                      value={"macho"}
                      colorScheme="green"
                      name="applicableGender"
                      borderColor="gray.800"
                    />
                    <Text fontSize={{ base: "sm", lg: "md" }}>
                      Procedimento é uma Vacina
                    </Text>
                  </Flex>
                  <Flex gap="2">
                    <Checkbox
                      type="radio"
                      disabled
                      value={"macho"}
                      colorScheme="green"
                      name="applicableGender"
                      borderColor="gray.800"
                    />
                    <Text fontSize={{ base: "sm", lg: "md" }}>
                      Procedimento é uma Cirurgia
                    </Text>
                  </Flex>

                  <Flex gap="2">
                    <Checkbox
                      {...register("available")}
                      id="available"
                      name="available"
                      borderColor="gray.900"
                    />
                    <Text fontSize={{ base: "sm", lg: "md" }}>Disponível</Text>
                  </Flex>
                  <Flex gap="2">
                  <Text fontWeight="bold" fontSize={{ base: "sm", lg: "md" }}>
                    PERTENCE A ALGUM CONVÊNIO?
                  </Text>
                  <Select
                  
                    fontSize={{ base: "sm", lg: "md" }}
                    {...register("health")}
                    placeholder="SELECIONE O CONVÊNIO"
                    bgColor="gray.300"
                  >
                    {healthInsurance.map((health) => (
                      <option key={health.id} value={health.id}>
                        {health.planName}
                      </option>
                    ))}
                  </Select>
            
                  </Flex>
                </Flex>
                <Flex
                  shadow="0px 0px 10px rgba(0, 0, 0, 0.5)"
                  direction="column"
                  ml={{ base: "0", lg: "20" }}
                  mt="4"
                  bg="white"
                  height="50%"
                  align="centers"
                  gap="4"
                  overflowY="auto"
                  py="10"
                  px="10"
                >
                  <Text fontWeight="bold" fontSize={{ base: "sm", lg: "md" }}>
                    PERTENCE A ALGUM GRUPO?
                  </Text>
                  <Select
                    fontSize={{ base: "sm", lg: "md" }}
                    {...register("group")}
                    placeholder="SELECIONE O GRUPO"
                    bgColor="gray.300"
                  >
                    {groups.map((group) => (
                      <option key={group.id} value={group.id}>
                        {group.name}
                      </option>
                    ))}
                  </Select>

                  <Text fontWeight="bold" fontSize={{ base: "sm", lg: "md" }}>
                    PERTENCE A ALGUM SETOR?
                  </Text>
                  <Select
                    fontSize={{ base: "sm", lg: "md" }}
                    {...register("sector")}
                    placeholder="SELECIONE O SETOR"
                    bgColor="gray.300"
                  >
                    {sectors.map((sector) => (
                      <option key={sector.id} value={sector.id}>
                        {sector.name}
                      </option>
                    ))}
                  </Select>
                </Flex>
              </Flex>
            </Grid>
          </Flex>

          <Button
            colorScheme="whatsapp"
            mt="8"
            w="100%"
            py="10"
            type="submit"
            fontSize={{ base: "sm", lg: "md" }}
          >
            Cadastrar Procedimento
          </Button>
        </FormControl>
      )}
      <GenericModal
        isOpen={especiesModalIsOpen}
        onRequestClose={() => setEspeciesModalIsOpen(false)}
      >
        <Flex w="460px" h="500px" justify="space-between">
          <VStack h="100%" w="50%" overflowY="scroll">
            <Button
              colorScheme="red"
              onClick={() => removeEspecieInProcedure()}
            >
              Remover Especies
            </Button>
            <Text fontWeight="bold">Especies Permitidas</Text>
            {procedures?.appicableEspecies?.map((esp) => (
              <Button key={esp.id} colorScheme="facebook">
                {esp.name}
              </Button>
            ))}
          </VStack>

          <Divider border="1px" orientation="vertical" />

          <VStack h="100%" w="50%" overflowY="scroll">
            <Button
              colorScheme="whatsapp"
              onClick={() => setAllEspecieInProcedure()}
            >
              Todas Especies
            </Button>
            <Text fontWeight="bold">Especies Disponiveis</Text>
            {especies.map((esp) => (
              <Button
                key={esp.id}
                onClick={() => setEspecieInProcedure(esp.id)}
                colorScheme="teal"
              >
                {esp.name}
              </Button>
            ))}
          </VStack>
        </Flex>
      </GenericModal>
    </>
  );
}
