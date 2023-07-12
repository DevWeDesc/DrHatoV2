import {
  Text,
  Box,
  FormControl,
  HStack,
  CheckboxGroup,
  Checkbox,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  RadioGroup,
  Radio,
  VStack,
  Button,
  Textarea,
  Flex,
  TagLabel,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { DbContext } from "../../contexts/DbContext";
import { Input } from "../../components/admin/Input";
import { AiOutlineArrowDown } from "react-icons/ai";
import { api } from "../../lib/axios";
import { toast } from "react-toastify";

export function CreateProcedureForm({ path, method }: any) {
  const { groups, sectors } = useContext(DbContext);
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [value, setValue] = useState("");
  const [valueOne, setValueOne] = useState("");

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
      group_id: Number(value),
      sector_id: Number(valueOne),
    };

    try {
      await api.post("procedures", data);
      toast.success("Procedimento criado com sucesso!");
      navigate("/Admin/Procedures");
    } catch (error) {
      toast.error("Falha ao criar procedimento");
    }
  };

  return (
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
            Idade Minima
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
            height="100%"
            justifyContent="space-between"
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
                {...register("applicableGender")}
                value={"macho"}
                colorScheme="green"
                name="applicableGender"
                borderColor="gray.800"
              />
              <label htmlFor="">Procedimento é uma vacina</label>
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
              <label htmlFor="">Procedimento é uma Cirurgia</label>
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
              <label htmlFor="">
                Deve aparecer como procedimento nas consultas
              </label>
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
              <label htmlFor="">
                Deve aparecer como procedimento nas Internações
              </label>
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
              <label htmlFor="">Deve ser cobrado nas Consultas</label>
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
              <label htmlFor="">Deve ser cobrado nas Internações</label>
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
              <label htmlFor="">Procedimento deve dar baixa em estoque</label>
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
              <label htmlFor="">Obrigatório</label>
            </Flex>
            <Flex gap="2">
              <Checkbox
                {...register("available")}
                id="available"
                name="available"
                borderColor="gray.900"
              />
              <label htmlFor="available">Disponivel</label>
            </Flex>
            <Flex gap="2">
              <Checkbox
                {...register("available")}
                id="available"
                name="available"
                borderColor="gray.900"
              />
              <label htmlFor="available">
                Pode ser executado em qualquer tipo de evento
              </label>
            </Flex>
            <Flex gap="2">
              <Checkbox
                {...register("available")}
                id="available"
                name="available"
                borderColor="gray.900"
              />
              <label htmlFor="available">Plano de saude PetLove</label>
            </Flex>
          </Flex>
          {/*
          <HStack gap="2" mt="4">
            <Accordion defaultIndex={[0]} allowMultiple>
              <AccordionItem>
                <h2 className="acordionTitle">
                  <AccordionButton gap="1rem">
                    <AiOutlineArrowDown size={26} />
                    <Box as="span" flex="1" textAlign="left">
                      Grupos
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <div className="submenus">
                    {groups?.map((item) => (
                      <>
                        <VStack key={item.id}>
                          <RadioGroup onChange={setValue} value={value}>
                            <Radio
                              bgColor={value == item.id ? "green" : "red"}
                              value={item.id as any}
                            >
                              {item.name}
                            </Radio>
                          </RadioGroup>
                        </VStack>
                      </>
                    ))}
                  </div>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>

            <Accordion defaultIndex={[0]} allowMultiple>
              <AccordionItem>
                <h2 className="acordionTitle">
                  <AccordionButton gap="1rem">
                    <AiOutlineArrowDown size={26} />
                    <Box as="span" flex="1" textAlign="left">
                      Setores
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <div className="submenus">
                    {sectors?.map((item) => (
                      <>
                        <VStack key={item.id}>
                          <RadioGroup onChange={setValueOne} value={valueOne}>
                            <Radio
                              bgColor={valueOne == item.id ? "green" : "red"}
                              value={item.id as any}
                            >
                              {item.name}
                            </Radio>
                          </RadioGroup>
                        </VStack>
                      </>
                    ))}
                  </div>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </HStack>
                    */}
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
    </FormControl>
  );
}
