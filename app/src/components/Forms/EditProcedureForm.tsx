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
  } from "@chakra-ui/react";
  import { useContext, useState } from "react";
  import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
  import { useNavigate } from "react-router-dom";
  import { DbContext } from "../../contexts/DbContext";
  import { Input } from "../../components/admin/Input";
  import { AiOutlineArrowDown } from "react-icons/ai";
  import { api } from "../../lib/axios";
  import { toast } from "react-toastify";
  
  export function EditProcedureForm({path, method}: any) {
    const { groups, sectors } = useContext(DbContext);
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();
    const [value, setValue] = useState("");
    const [valueOne, setValueOne] = useState("");
  
  
    const handleEditProcedure: SubmitHandler<FieldValues> = async (values) => {
      let rangeAges = [values.minAge, values.maxAge]
      const data = {
        name: values.name,
        price: Number(values.price),
        available: values.available,
        applicationInterval: values.applicationInterval,
        ageRange: rangeAges,
        applicationGender: values.applicableGender,
        observations: values.observations,
        group_id: Number(value),
        sector_id: Number(valueOne)
      };
  
      try {
          await api.put(`procedures/${path}`, data)
          toast.success("Procedimento Editado com sucesso! recarregue a página")
          navigate("/Admin/Procedures")
      } catch (error) {
        toast.error("Falha ao criar procedimento")
      };
                          
    };
  
    return (
      <FormControl
        as="form"
        onSubmit={handleSubmit(handleEditProcedure)}
        display="flex"
        flexDir="column"
        alignItems="center"
        gap="2"
        padding="4"
      >
        <Input {...register("name")} name="name" label="Nome do Procedimento" />
        <Input
          {...register("price")}
          name="price"
          label="Preço do Procedimento"
        />
        <HStack gap="2" margin={8}>
          <label htmlFor="available">Disponivel ?</label>
          <Checkbox
            {...register("available")}
            id="available"
            name="available"
            borderColor="gray.900"
          />
        </HStack>
        <Input
          {...register("applicationInterval")}
          name="applicationInterval"
          label="Intervalo de Aplicação, escreva:"
        />
  
        <HStack mt="4">
          <label htmlFor="">Idade Minima</label>
          <NumberInput size="xs" name="minAge" maxW={16}>
            <NumberInputField {...register("minAge")} name="minAge" />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <label htmlFor="">Idade Máxima</label>
          <NumberInput size="xs" maxW={16}>
            <NumberInputField {...register("maxAge")} name="maxAge" />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </HStack>
  
        <Text mt="4">Aplicavel a :</Text>
        <HStack spacing={4} margin="4">
          <CheckboxGroup>
            <label htmlFor="">Femea</label>
            <Checkbox
              {...register("applicableGender")}
              value={"femea"}
              type="radio"
              colorScheme="green"
              borderColor="gray.800"
              name="applicableGender"
            />
  
            <label htmlFor="">Macho</label>
            <Checkbox
              type="radio"
              {...register("applicableGender")}
              value={"macho"}
              colorScheme="green"
              name="applicableGender"
              borderColor="gray.800"
            />
          </CheckboxGroup>
        </HStack>
  
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
        <Text mt="4" fontWeight="bold">
          Observações do Procedimento:{" "}
        </Text>
        <Textarea
          {...register("observations")}
          name="observations"
          minHeight={300}
          minWidth={300}
          borderColor="gray.900"
        ></Textarea>
  
        <Button colorScheme="whatsapp" mt="8" type="submit">
          Cadastrar Procedimento
        </Button>
      </FormControl>
    );
  }
  