import {
  ChakraProvider,
  Flex,
  FormControl,
  FormLabel,
  Button,
  VStack,
  Select,
  HStack,
  RadioGroup,
  Radio,
  Checkbox,
  Textarea,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { api } from "../../lib/axios";
import { Input } from "../admin/Input";
interface CreateNewPetProps {
  id: number | string;
  name: string;
  bornDate: string;
  cor: string;
  especie: string;
  race: string;
  peso: string;
  porte: string;
  sexo: string;
  rga: number;
  haveChip: boolean;
  isCastred: boolean;
  obs: string;
}

interface Props {
  reloadPets?: any;
}

export function CreatePetsForm({ reloadPets }: Props) {
  const { register, handleSubmit } = useForm();
  const { id } = useParams<{ id: string }>();
  const [especieState, setEspecie] = useState("");
  const [raceState, setRace] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectSex, setSelectedSex] = useState("");
  const years = Array.from({ length: 21 }, (_, i) => i);
  const months = Array.from({ length: 13 }, (_, i) => i);

  const handleYearChange = (e: any) => {
    setSelectedYear(e.target.value);
  };

  const handleMonthChange = (e: any) => {
    setSelectedMonth(e.target.value);
  };

  let selectRaces;
  switch (true) {
    case especieState === "Felina":
      selectRaces = (
        <Select {...register("race")} name="race" borderColor="gray.900">
          <option value="Birmanês">Birmanês</option>
          <option value="Persa">Persa</option>
          <option value="British Blue">British Blue</option>
          <option value="Escocês">Escocês</option>
          <option value="Russo Azul">Russo Azul</option>
          <option value="Himalaio">Himalaio</option>
          <option value="Chartrox">Chartrox</option>
          <option value="Mestiço">Mestiço</option>
          <option value="Pelo Curto Brasileiro">Pelo Curto Brasileiro</option>
          <option value="Himalaio Persa">Himalaio Persa</option>
          <option value="Rag Doll">Rag Doll</option>
          <option value="Angorá Turco">Angorá Turco</option>
          <option value="Comum Européia">Comum Européia</option>
          <option value="Siamês">Siamês</option>
          <option value="Rajado Brasileiro">Rajado Brasileiro</option>
          <option value="Sagrado da Birmânia">Sagrado da Birmânia</option>
          <option value="Sagrado">Sagrado</option>
          <option value="Maine Coon">Maine Coon</option>
          <option value="Bengal">Bengal</option>
          <option value="Househound Pet">Househound Pet</option>
          <option value="Scottish Straight">Scottish Straight</option>
          <option value="Snowshoe">Snowshoe</option>
          <option value="Persa Exótica">Persa Exótica</option>
        </Select>
      );
      break;

    case especieState === "Canina":
      selectRaces = (
        <Select {...register("race")} name="race" borderColor="gray.900">
          <option value="Pastor Suíço">Pastor Suíço</option>
          <option value="Spaniel Japonês">Spaniel Japonês</option>
          <option value="Springer Spaniel Inglês">
            Springer Spaniel Inglês
          </option>
          <option value="Mastin">Mastin</option>
          <option value="Basset Hound">Basset Hound</option>
          <option value="Benese">Benese</option>
          <option value="Poodle Champ">Poodle Champ</option>
          <option value="Airdale Terrier">Airdale Terrier</option>
          <option value="Samoyeda">Samoyeda</option>
          <option value="Bichon Frisè">Bichon Frisè</option>
          <option value="Setter Irlandês">Setter Irlandês</option>
          <option value="Mini Shnauzer">Mini Shnauzer</option>
          <option value="Dobermman">Dobermman</option>
          <option value="Starforshire Terrier">Starforshire Terrier</option>
          <option value="West Highlander White Terrier">
            West Highlander White Terrier
          </option>
          <option value="Basset Pelo Longo">Basset Pelo Longo</option>
          <option value="Tenerife">Tenerife</option>
          <option value="Pastor de Shettland">Pastor de Shettland</option>
          <option value="Cani Corso">Cani Corso</option>
          <option value="Poodle Micro Toy">Poodle Micro Toy</option>
          <option value="Afghan Hound">Afghan Hound</option>
          <option value="Sheep Dog Alemão">Sheep Dog Alemão</option>
          <option value="Border Collie">Border Collie</option>
          <option value="Bull Dog Francês">Bull Dog Francês</option>
          <option value="Rott Weiller">Rott Weiller</option>
          <option value="American Pit Bull">American Pit Bull</option>
          <option value="Golden">Golden</option>
          <option value="Dog Agentino">Dog Agentino</option>
          <option value="Pastor de Buceron">Pastor de Buceron</option>
          <option value="Pequinês Alemão">Pequinês Alemão</option>
          <option value="Splinter">Splinter</option>
          <option value="Malamute">Malamute</option>
          <option value="Malamute Alaska">Malamute Alaska</option>
          <option value="Minie Collie">Minie Collie</option>
          <option value="York Shire">York Shire</option>
          <option value="Cocker Americano">Cocker Americano</option>
          <option value="Schnauzer">Schnauzer</option>
          <option value="Bull Dog">Bull Dog</option>
          <option value="Starforshire Bull Terrier">
            Starforshire Bull Terrier
          </option>
          <option value="Boxer Inglês">Boxer Inglês</option>
          <option value="Americano">Americano</option>
          <option value="Lhasa-Apso">Lhasa-Apso</option>
          <option value="Dálmata">Dálmata</option>
          <option value="Poodle Toy">Poodle Toy</option>
          <option value="Mini Pinscher">Mini Pinscher</option>
          <option value="Sheep Dog">Sheep Dog</option>
          <option value="Cairn Terrier">Cairn Terrier</option>
          <option value="Cristado Chinês">Cristado Chinês</option>
          <option value="Fox Terrier Pelo Curto">Fox Terrier Pelo Curto</option>
          <option value="Blue Riller">Blue Riller</option>
        </Select>
      );
      break;

    case especieState === "Ave":
      selectRaces = (
        <Select {...register("race")} name="race" borderColor="gray.900">
          <option value="Canário">Canário</option>
          <option value="Codorna">Codorna</option>
          <option value="Galo">Galo</option>
          <option value="Pássaro Preto">Pássaro Preto</option>
          <option value="Mandarim">Mandarim</option>
          <option value="Pássaro Preto">Pássaro Preto</option>
          <option value="Canário da Terra">Canário da Terra</option>
          <option value="Agapones">Agapones</option>
          <option value="Arara">Arara</option>
          <option value="Bem Te Ví">Bem Te Ví</option>
          <option value="Agapolis">Agapolis</option>
          <option value="Pica-Pau">Pica-Pau</option>
          <option value="Gralha">Gralha</option>
          <option value="Sagui">Sagui</option>
          <option value="Periquito Australiano">Periquito Australiano</option>
          <option value="Pardal">Pardal</option>
          <option value="Beija Flor">Beija Flor</option>
          <option value="Maritaca">Maritaca</option>
          <option value="Angolista">Angolista</option>
          <option value="Periquito">Periquito</option>
          <option value="Papagaio do Congo">Papagaio do Congo</option>
          <option value="Personata">Personata</option>
          <option value="Pomba">Pomba</option>
          <option value="Bicudo">Bicudo</option>
          <option value="Papagaio">Papagaio</option>
          <option value="Pássaro">Pássaro</option>
          <option value="Ring Neck">Ring Neck</option>
          <option value="Carpa">Carpa</option>
          <option value="Kinguio">Kinguio</option>
        </Select>
      );
      break;

    case especieState === "Roedor":
      selectRaces = (
        <Select {...register("race")} name="race" borderColor="gray.900">
          <option value="Esquilo da Mongólia">Esquilo da Mongólia</option>
          <option value="Esquilo">Esquilo</option>
          <option value="Hamster">Hamster</option>
          <option value="Gerbil">Gerbil</option>
          <option value="Porquinho da Índia">Porquinho da Índia</option>
          <option value="Coelho">Coelho</option>
          <option value="Camundongo">Camundongo</option>
        </Select>
      );
      break;

    case especieState === "Silvestre":
      selectRaces = (
        <Select {...register("race")} name="race" borderColor="gray.900">
          <option value="Furão">Furão</option>
        </Select>
      );
      break;

    case especieState === "Primata":
      selectRaces = (
        <Select {...register("race")} name="race" borderColor="gray.900">
          <option
            value="Mico Estrela
                "
          >
            Mico Estrela
          </option>
          <option
            value="Sagui
                "
          >
            Sagui
          </option>
        </Select>
      );
      break;

    case especieState === "Réptil":
      selectRaces = (
        <Select {...register("race")} name="race" borderColor="gray.900">
          <option value="Iguana">Iguana</option>
          <option value="Red Slider">Red Slider</option>
          <option value="Jibóia">Jibóia</option>
          <option value="Tartaruga">Tartaruga</option>
          <option value="Jabuti">Jabuti</option>
        </Select>
      );
      break;

    case especieState === "Quelônio":
      selectRaces = (
        <Select {...register("race")} name="race" borderColor="gray.900">
          <option value="Tigre d'água">Tigre d'água</option>
        </Select>
      );
      break;

    case especieState === "Peixe":
      selectRaces = (
        <Select {...register("race")} name="race" borderColor="gray.900">
          <option value="PEIXONAUTA">PEIXONAUTA</option>
        </Select>
      );
      break;

    default:
      selectRaces = (
        <Select
          onChange={(ev) => setRace(ev.target.value)}
          borderColor="gray.900"
        >
          <option value="NOTVALUE">SELECIONE A ESPECIE</option>
        </Select>
      );
      break;
  }

  const handleCreateNewCliente: SubmitHandler<CreateNewPetProps> = async (
    values
  ) => {
    let fullAge = `Anos: ${selectedYear} Meses: ${selectedMonth}`;
    const data = {
      name: values.name,
      especie: especieState,
      sexo: selectSex,
      race: values.race,
      weigth: values.peso,
      haveChip: values.haveChip,
      corPet: values.cor,
      sizePet: "",
      bornDate: fullAge,
      observations: values.obs,
      isCastred: values.isCastred,
    };

    try {
      await api.post(`/pets/${id}`, data);
      toast.success("pet cadastrado com sucesso");
      console.log(values.especie);
    } catch (error) {
      console.error(error);
      toast.error("Falha ao cadastrar pet, verifique se o mesmo ja não existe");
    }
    console.log(data);
  };
  return (
    <ChakraProvider>
      <FormControl
        as="form"
        onSubmit={handleSubmit(handleCreateNewCliente as any)}
      >
        <Flex direction="row" align="center" justify="center">
          <VStack pl="8">
            <Text w="100%" fontWeight="bold">
              Nome do Pet
            </Text>
            <Input {...register("name")} id="name" name="name" />

            <Text w="100%" fontWeight="bold" mt="2">
              Especie do PET
            </Text>
            <Select
              name="especie"
              onChange={(ev) => setEspecie(ev.target.value)}
              borderColor="gray.900"
              placeholder="Selecione a Especie do ANIMAL"
            >
              <option value="Felina">Felina</option>
              <option value="Canina">Canina</option>
              <option value="Ave">Ave</option>
              <option value="Roedor">Roedor</option>
              <option value="Silvestre">Silvestre</option>
              <option value="Primata">Primata</option>
              <option value="Réptil">Réptil</option>
              <option value="Quelônio">Quelônio</option>
              <option value="Peixe">Peixe</option>
            </Select>

            <Text w="100%" fontWeight="bold" mt="2">
              Raça
            </Text>
            <>{selectRaces}</>

            <Text w="100%" fontWeight="bold" mt="2">
              Cor do pet
            </Text>
            <Input {...register("cor")} id="cor" maxWidth={320} name="cor" />

            <Text w="100%" fontWeight="bold" mt="2">
              Peso
            </Text>
            <Input
              {...register("peso")}
              id="peso"
              maxWidth={320}
              name="peso"
              type="number"
            />

            <Text w="100%" fontWeight="bold" mt="2">
              Idade
            </Text>
            <HStack display="flex" justifyContent="space-between" w="100%">
              <Select
                borderColor="gray.900"
                id="year"
                value={selectedYear}
                onChange={handleYearChange}
              >
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </Select>
              <label htmlFor="year">Anos</label>

              <Select
                borderColor="gray.900"
                id="month"
                value={selectedMonth}
                onChange={handleMonthChange}
              >
                {months.map((month) => (
                  <option key={month} value={month}>
                    {month}
                  </option>
                ))}
              </Select>
              <label htmlFor="month">Meses</label>
            </HStack>
          </VStack>
          <VStack pl="8" pr="8">
            <Text w="100%" fontWeight="bold" mt="2">
              Sexo do Pet
            </Text>
            <RadioGroup
              onChange={setSelectedSex}
              value={selectSex}
              w="100%"
              display="flex"
              justifyContent="space-between"
            >
              <Flex gap={2} w="100%">
                <Radio borderColor="black" value="MACHO">
                  MACHO
                </Radio>
                <Radio borderColor="black" value="FEMEA">
                  FEMEA
                </Radio>
              </Flex>
            </RadioGroup>
            <Flex align="center" gap="2" w="100%">
              <Checkbox
                borderColor="gray.900"
                {...register("isCastred")}
                id="isCastred"
                maxWidth={320}
                name="isCastred"
              />{" "}
              <FormLabel m="0" fontWeight="bold" htmlFor="isCastred">
                Animal e Castrado
              </FormLabel>
            </Flex>
            <Flex gap="2">
              <Checkbox
                borderColor="gray.900"
                {...register("haveChip")}
                id="haveChip"
                maxWidth={320}
                name="haveChip"
              />
              <FormLabel m="0" fontWeight="bold" htmlFor="haveChip">
                Animal e Microchipado
              </FormLabel>
            </Flex>
            <Text w="100%" fontWeight="bold" mt="5">
              Observações
            </Text>
            <Textarea
              height={300}
              bgColor="white"
              borderColor="gray.900"
              {...register("obs")}
              id="obs"
              maxWidth={320}
              name="obs"
            />
          </VStack>
        </Flex>
        <Button
          mt="8"
          colorScheme="whatsapp"
          type="submit"
          onClick={reloadPets}
          w="100%"
          py="7"
        >
          Cadastrar
        </Button>
      </FormControl>
    </ChakraProvider>
  );
}
