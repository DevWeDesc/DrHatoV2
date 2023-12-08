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
  Select,
  VStack,
  HStack,
} from "@chakra-ui/react";
import { useContext, useState, useEffect } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { DbContext } from "../../contexts/DbContext";
import { Input } from "../../components/admin/Input";
import { api } from "../../lib/axios";
import { toast } from "react-toastify";
import { formatPrice } from "../../helpers/format";

type ProcedureFormProps = {
  procedureId?: string;
  isEditable?: boolean;
}

type ProceduresDTO  = {
	id: number;
	codProcedimento: number;
	name: string;
	price: number;
	priceTwo: number;
	priceThree: number;
	priceFour: number;
	categoryOld: string;
	minAge: number;
	maxAge: number,
	applicableMale: boolean,
	applicableFemale: boolean,
	applicationInterval: string | number;
	categoryProcedure: number;
	available: boolean,
	observations: string,
	group_id: number;
	sector_id: number;
	groups: number;
	sector: {
		name: string
	}
}
export function CreateProcedureForm({ procedureId, isEditable }: ProcedureFormProps) {
  const { groups, sectors } = useContext(DbContext);
  const [procedures, setProcedures] = useState({} as ProceduresDTO)
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  
  async function getProceduresData() {
    try {
      const response = await api.get(`/procedures/${procedureId}`)
      setProcedures(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  const handleCreateProcedure: SubmitHandler<FieldValues> = async (values) => {
    let rangeAges = [values.minAge, values.maxAge];
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
    };

    try {
      await api.post("procedures", data);
      toast.success("Procedimento criado com sucesso!");
      navigate("/Admin/Procedures");
    } catch (error) {
      toast.error("Falha ao criar procedimento");
    }
  };





  useEffect(() => {
    getProceduresData()
  }, [])


  return (
    <>
    {
      isEditable ? (<FormControl
        as="form"
        onSubmit={handleSubmit(handleCreateProcedure)}
        display="flex"
        flexDir="column"
        alignItems="center"
        gap="2"
        padding="4"
      >
        <Flex w="100%">
          <Flex direction="column" w="45%">
            <label htmlFor="" style={{ fontWeight: "bold", fontSize: "17px" }}>
              Nome do Procedimento
            </label>
            <Input mb="1" {...register("name")} name="name" defaultValue={procedures.name} />
            <HStack mt="4" mb="4">
              <VStack>
                <label style={{ fontWeight: "bold", fontSize: "17px" }} htmlFor="price">
              Preço Até 6KG
                </label>
               <Input mb="1" mt="0" {...register("price")} name="price" id="price"  defaultValue={(procedures.price)} />
              </VStack>
              <VStack>
                <label style={{ fontWeight: "bold", fontSize: "17px" }} htmlFor="priceTwo">
              Entre 7 e 15KG
            </label>
            <Input mb="1" mt="0" {...register("priceTwo")} name="priceTwo" id="priceTwo"  defaultValue={procedures.priceTwo}  />
              </VStack>
              <VStack>
                <label style={{ fontWeight: "bold", fontSize: "17px" }} htmlFor="priceThree">
              Entre 16 e 35KG
            </label>
            <Input mb="1" mt="0" {...register("priceThree")} name="priceThree" id="priceThree"  defaultValue={procedures.priceThree}  />
              </VStack>
              <VStack>
                <label style={{ fontWeight: "bold", fontSize: "17px" }} htmlFor="priceFour">
               35KG +
            </label>
            <Input mb="1" mt="0" {...register("priceFour")} name="priceFour" id="priceFour"  defaultValue={procedures.priceFour}  />
              </VStack>
            
            </HStack>
       
            <label style={{ fontWeight: "bold", fontSize: "17px" }} htmlFor="">
              Intervalo de Aplicação, escreva:
            </label>
            <Input
              mb="1"
              {...register("applicationInterval")}
              name="applicationInterval"
              defaultValue={procedures.applicationInterval != null ? procedures.applicationInterval : "Não definido"}
            />
            <label style={{ fontWeight: "bold", fontSize: "17px" }} htmlFor="">
              Idade Mínima
            </label>
            <Flex w="100%" mb="1">
             <Input name="minAge"  defaultValue={"0"}/>
            </Flex>
            <label htmlFor="" style={{ fontWeight: "bold", fontSize: "17px" }}>
              Idade Máxima
            </label>
            <Input  name="maxAge" defaultValue={"99999"} />
           
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
          <Flex direction="column" w="55%">
            <Flex
              shadow="0px 0px 10px rgba(0, 0, 0, 0.5)"
              direction="column"
              ml="20"
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
                <label htmlFor="">Executável em Macho</label>
              </Flex>
              <Flex gap="2">
                <Checkbox
                  isChecked={procedures.applicableFemale ? true : false}
                  {...register("applicableFemale")}
                  colorScheme="green"
                  borderColor="gray.800"
                  name="applicableFemale"
                />
                <label htmlFor="">Executável em Fêmea</label>
              </Flex>
  
              <Flex gap="2">
                <Checkbox
        
                  disabled
                  colorScheme="green"
                  name="applicableGender"
                  borderColor="gray.800"
                />
                <label htmlFor="">Procedimento é uma Vacina</label>
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
                <label htmlFor="">Procedimento é uma Cirurgia</label>
              </Flex>
  
              <Flex gap="2">
                <Checkbox
                   isChecked={procedures.available ? true : false}
                  {...register("available")}
                  id="available"
                  name="available"
                  borderColor="gray.900"
                />
                <label htmlFor="available">Disponível</label>
              </Flex>
              <Flex gap="2">
                <Checkbox
                  type="radio"
                  {...register("applicableGender")}
                  value={"macho"}
                  colorScheme="green"
                  name="applicableGender"
                  borderColor="gray.800"
                />
                <label htmlFor="">Plano de Saúde PetLove</label>
              </Flex>
            </Flex>
            <Flex
              shadow="0px 0px 10px rgba(0, 0, 0, 0.5)"
              direction="column"
              ml="20"
              mt="4"
              bg="white"
              height="50%"
              align="centers"
              gap="4"
              overflowY="auto"
              py="10"
              px="10"
            >
              <label htmlFor="" style={{ fontWeight: "bold", fontSize: "17px" }}>
                PERTENCE A ALGUM GRUPO?
              </label>
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
  
              <label htmlFor="" style={{ fontWeight: "bold", fontSize: "17px" }}>
                PERTENCE A ALGUM SETOR?
              </label>
              <Select
                {...register("sector")}
                placeholder="SELECIONE O SETOR"
                bgColor="gray.300"
                value={Number(sectors.find(sector => sector?.id === procedures?.sector_id)?.id)}
              >
                {sectors.map((sector) => (
                  <option key={sector.id} value={sector.id}>
                    {sector.name}
                  </option>
                ))}
              </Select>
            </Flex>
          </Flex>
        </Flex>
  
         <Button
          colorScheme="whatsapp"
          mt="8"
          w="100%"
          py="10"
          fontSize="20"
          type="submit"
        >
          Editar Procedimento
        </Button> 
        
  
    
      </FormControl>) : (<FormControl
        as="form"
        onSubmit={handleSubmit(handleCreateProcedure)}
        display="flex"
        flexDir="column"
        alignItems="center"
        gap="2"
        padding="4"
      >
        <Flex w="100%">
          <Flex direction="column" w="45%">
            <label htmlFor="" style={{ fontWeight: "bold", fontSize: "17px" }}>
              Nome do Procedimento
            </label>
            <Input mb="1" {...register("name")} name="name" />
            <label style={{ fontWeight: "bold", fontSize: "17px" }} htmlFor="">
              Preço do Procedimento
            </label>
            <Input mb="1" mt="0" {...register("price")} name="price" />
            <label style={{ fontWeight: "bold", fontSize: "17px" }} htmlFor="">
              Intervalo de Aplicação, escreva:
            </label>
            <Input
              mb="1"
              {...register("applicationInterval")}
              name="applicationInterval"
            />
            <label style={{ fontWeight: "bold", fontSize: "17px" }} htmlFor="">
              Idade Mínima
            </label>
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
            <label htmlFor="" style={{ fontWeight: "bold", fontSize: "17px" }}>
              Idade Máxima
            </label>
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
          <Flex direction="column" w="55%">
            <Flex
              shadow="0px 0px 10px rgba(0, 0, 0, 0.5)"
              direction="column"
              ml="20"
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
                <label htmlFor="">Executável em Macho</label>
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
                <label htmlFor="">Executável em Fêmea</label>
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
                <label htmlFor="">Procedimento é uma Vacina</label>
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
                <label htmlFor="">Procedimento é uma Cirurgia</label>
              </Flex>
  
              <Flex gap="2">
                <Checkbox
                  {...register("available")}
                  id="available"
                  name="available"
                  borderColor="gray.900"
                />
                <label htmlFor="available">Disponível</label>
              </Flex>
              <Flex gap="2">
                <Checkbox
                  type="radio"
                  {...register("applicableGender")}
                  value={"macho"}
                  colorScheme="green"
                  name="applicableGender"
                  borderColor="gray.800"
                />
                <label htmlFor="">Plano de Saúde PetLove</label>
              </Flex>
            </Flex>
            <Flex
              shadow="0px 0px 10px rgba(0, 0, 0, 0.5)"
              direction="column"
              ml="20"
              mt="4"
              bg="white"
              height="50%"
              align="centers"
              gap="4"
              overflowY="auto"
              py="10"
              px="10"
            >
              <label htmlFor="" style={{ fontWeight: "bold", fontSize: "17px" }}>
                PERTENCE A ALGUM GRUPO?
              </label>
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
  
              <label htmlFor="" style={{ fontWeight: "bold", fontSize: "17px" }}>
                PERTENCE A ALGUM SETOR?
              </label>
              <Select
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
        </Flex>
  
     <Button
          colorScheme="whatsapp"
          mt="8"
          w="100%"
          py="10"
          fontSize="20"
          type="submit"
        >
          Cadastrar Procedimento
        </Button>
        
  
    
      </FormControl> )
     }
    </>

  );
}
