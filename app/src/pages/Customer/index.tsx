import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../lib/axios";
import {
  Text,
  Flex,
  ChakraProvider,
  Table,
  Thead,
  Tbody,
  Tr,
  Td,
  Button,
  HStack,
  Textarea,
  RadioGroup,
  Radio,
  Th,
  TableContainer,
  Input,
  Select,
  Checkbox,
  FormControl,
  VStack,
  FormLabel,
} from "@chakra-ui/react";
import { AiFillTags, BiHome, TbArrowBack } from "react-icons/all";
import { toast } from "react-toastify";
import { WorkSpaceContainer, WorkSpaceContent, WorkSpaceHeader } from "../Vets/styles";
import { PetProps } from "../Pets/details";
import { GenericModal } from "../../components/Modal/GenericModal";
import { CreatePetsForm } from "../../components/Forms/CreatePetsForm";
import { QueryClient, useQuery } from "react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { WeightPetInput } from "../../components/InputMasks/WeightPetInput";
import ModalEditAnimal from "./modalEditAnimal";


interface CustomerProps {
  id: string | number;
  name: string;
  adress: string;
  phone: string;
  cpf: number;
  email: string;
  balance: number;
  birthday: string | number;
  cep: string;
  pets: PetProps[];
  tell: string;
  rg: string;
}

type VetsProps = {
  username: string;
  id: number;
  consultName: string;
}

type HealthInsuranceProps = {
  id: number;
	planName: string;
	disponible: boolean
	planProvider: string;
}

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

interface HospBoxHistory {
  id: number;
  entryValues?: number;
  exitValues?: number;  
  totalValues?: number; 
  openBox?: Date;
  closeBox?: Date;
  openBy?: string;
  closedBy?: string;
  boxIsOpen?: boolean;
  hospVetBoxId?: number;
}


export function CustomerDetails() {
  const { id } = useParams<{ id: string }>();
  const user = JSON.parse(localStorage.getItem("user") as string);
  const navigate = useNavigate();
  const queryClient = new QueryClient()
  const [petId, setPetId] = useState("");
  const [userVets, setUserVets] = useState<VetsProps[]>([])
  const [queryType, setQueryType] = useState("");
  const [notPreferences, setNotPreferences] = useState(false);
  const [vetPreference, setVetPreference] = useState("");
  const [moreInfos, setMoreInfos] = useState("");
  const [isModalUpdated, setIsModalUpdated] = useState(false);
  const [customer, setCustomer] = useState<CustomerProps>({
    id: "",
    name: "",
    adress: "",
    email: "",
    cpf: 0,
    birthday: "",
    phone: "",
    cep: "",
    balance: 0,
    pets: [],
    tell: "",
    rg: "",
  });
  const [petSelected, setPetSelected] = useState<any>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [vetName, setVetName] = useState("");
  const [healthInsurance, setHealthInsurance] = useState<HealthInsuranceProps[]>([])
  const [healthId, setHealthId] = useState(0)
  const [especieState, setEspecie] = useState("");
  const [raceState, setRace] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMonth, setSelectedMonth] = useState<string | number>("");
  const [selectSex, setSelectedSex] = useState("");
  const years = Array.from({ length: 21 }, (_, i) => i);
  const months = Array.from({ length: 13 }, (_, i) => i);
  const { register, handleSubmit } = useForm();
  const [weight, setWeight] = useState("");

  async function loadHealthInsurances() {
    const response = await api.get("/health/insurance")
    setHealthInsurance(response.data.healthInsurance)
  }

  async function loadCustomer() {
    const response = await api.get(`/customers/${id}`);
    setCustomer(response.data.customer); 
  }

  async function loadVets() {
    const response = await api.get(`/users/vets`);
    setUserVets(response.data.vets);
  }

  
  useQuery('healthInsuranceReception', loadHealthInsurances)
  const {refetch} = useQuery('customerReception', loadCustomer)
  useQuery('vetsReception', loadVets)

  async function loadVetsByName() {
    const response = await api.get(`/users/vets/name/${vetName}`);
    setUserVets(response.data);
    queryClient.invalidateQueries('vetsReception')
  }
  
  async function setPetInQueue() {
    try {

      const openedBox = await api.get("/vetbox")

      const verifyOpenedBox = openedBox?.data?.historyBox?.some((box: HospBoxHistory)=> box.boxIsOpen)

      if(!verifyOpenedBox) {
        toast.error("Não existe caixa em aberto, não é possivel colocar na fila")
        return;
      }
      

      const selectedHealth = healthInsurance.find(h => h.id === healthId)

      const data = {
        healthInsuranceId: selectedHealth?.id, 
        healthInsuranceName: selectedHealth?.planName,
        removePreference: notPreferences,
        vetPreference: vetPreference,
        queryType: queryType,
        openedBy: user.consultName.length >= 1 ? user.consultName : `${user.name} - Id: ${user.id}`,
        moreInfos: moreInfos,
      };


      if (!!queryType && !!petSelected.id) {
        if(notPreferences === false && vetPreference.length <= 1) {
          toast.error("Selecione uma preferência")
          return 
        }
        await api.put(`queue/${petSelected.id}`, data);
        navigate("/Recepcao/Change")
        toast.success("Pet colocado na fila com sucesso!");
      } else {
        toast.error(`Selecione Pet/Tipo de Atendimento/Veterinário`);
      }
    } catch (error: any) {
      console.log(error)
      if(error.response.status === 409) {
        return toast.error(`${error.response.data.message}`)
      }
      toast.error("Falha ao colocar na fila");
    }
  }


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
      weigth: weight.substring(0, 5),
      haveChip: values.haveChip,
      corPet: values.cor,
      sizePet: "",
      bornDate: fullAge,
      observations: values.obs,
      isCastred: values.isCastred,
    };

    try {
      if (
        (selectedMonth != "" && selectedYear != "") ||
        (selectedMonth === "" && selectedYear != "") ||
        (selectedMonth != "" && selectedYear === "")
      ) {
        await api.post(`/pets/${id}`, data)
        refetch()
        toast.success("Animal cadastrado com sucesso")
        setModalOpen(false)
      } else {
        toast.error("Insira a idade correta do animal!!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Falha ao cadastrar pet, verifique se o mesmo ja não existe");
    }
  };


  return (
    <ChakraProvider>
      <WorkSpaceContainer>
        <WorkSpaceHeader>
          <Flex
            justify="space-between"
            align="center"
            width="100%"
            height="100%"
          >
            <Flex align="center" gap="2">
              <Text m="2" fontSize="2xl" fontWeight="bold">
                WorkSpace Recepção
              </Text>
              <Button
                colorScheme="teal"
                leftIcon={<BiHome size={24} />}
                onClick={() => navigate("/Home")}
              >
                HOME
              </Button>

              <Button
                colorScheme="yellow"
                leftIcon={<TbArrowBack size={24} />}
                onClick={() => navigate("/Recepcao/Consultas")}
              >
                Voltar
              </Button>
            </Flex>

            <Flex justify="space-between" gap="2" m="2">
              <Button
                height={8}
                colorScheme="whatsapp"
                onClick={() => navigate("/Recepcao/Consultas")}
              >
                Ir até consultas
              </Button>
              <Button
                height={8}
                colorScheme="whatsapp"
                onClick={() => navigate("/Recepcao/Create")}
              >
                Ir até cadastro de cliente
              </Button>
            </Flex>
          </Flex>
        </WorkSpaceHeader>
        <WorkSpaceContent style={{ height: "90vh" }}>
          <Flex
            direction="column"
            w="100%"
            align="center"
            bgColor="gray.100"
            rounded={4}
            p="4"
            className="div1"
            justify="center"
          >
            <HStack>
              <Flex direction="column" gap={2}>
                <Text fontWeight="bold">Cliente:</Text>
                <Text fontWeight="bold">E-mail:</Text>
                <Text fontWeight="bold">Endereço:</Text>
                <Text fontWeight="bold">Telefone:</Text>
                <Text fontWeight="bold">Celular:</Text>
                <Text fontWeight="bold">CPF / CNPJ:</Text>
                <Text fontWeight="bold">R.G / I.E:</Text>
              </Flex>

              <Flex direction="column" gap={2}>
                <Text
                  fontWeight="black"
                  bgColor="white"
                  width="400px"
                  rounded={4}
                >
                  {customer.name}
                </Text>
                <Text
                  fontWeight="black"
                  bgColor="white"
                  width="400px"
                  rounded={4}
                >
                  {customer.email}
                </Text>
                <Text
                  fontWeight="black"
                  bgColor="white"
                  width="400px"
                  rounded={4}
                >
                  {customer.adress}
                </Text>
                <Text
                  fontWeight="black"
                  bgColor="white"
                  width="400px"
                  rounded={4}
                >
                  {customer.tell ? customer.tell : "Não informado"}
                </Text>
                <Text
                  fontWeight="black"
                  bgColor="white"
                  width="400px"
                  rounded={4}
                >
                  {customer.phone}
                </Text>
                <Text
                  fontWeight="black"
                  bgColor="white"
                  width="400px"
                  rounded={4}
                >
                  {customer.cpf}
                </Text>
                <Text
                  fontWeight="black"
                  bgColor="white"
                  width="400px"
                  rounded={4}
                >
                  {customer.rg ? customer.rg : "Não informado"}
                </Text>
              </Flex>
            </HStack>

            <HStack mt="4" w="100%" justify="space-evenly" pt="4">
              <Button
                py="6"
                w="50%"
                onClick={() =>
                  navigate(`/Recepcao/Customer/Edit/${customer.id}`)
                }
                colorScheme="whatsapp"
              >
                Editar
              </Button>{" "}
              <Button w="50%" py="6" colorScheme="whatsapp">
                Historico
              </Button>
            </HStack>
          </Flex>

          <Flex
            direction="column"
            bgColor="gray.100"
            rounded={4}
            p="2"
            className="div2"
            align="center"
            textAlign="center"
          >
            {petSelected.length === 0 ? (
              <>
                <Text
                  fontWeight="black"
                  bgColor="green.100"
                  width="500px"
                  rounded={4}
                >
                  SELECIONE UM ANIMAL PARA CONTINUAR
                </Text>
                <Button
                  onClick={
                    () => setModalOpen(true)
                    /*navigate(
                      `/Recepcao/Consultas/Clientes/Pets/Create/${customer.id}`
                    )*/
                  }
                  mb="2"
                  colorScheme="teal"
                  height="28px"
                >
                  ou adicione um novo animal
                </Button>
                <Flex overflow="auto" overflowX="auto" w="100%" height="100%">
                  <Table flexDirection="column">
                    <Thead>
                      {customer.pets.length < 1 ? (
                        <Text fontWeight="black" mt="20" fontSize="2xl">
                          SEM PET CADASTRADO
                        </Text>
                      ) : (
                        <Tr>
                          <Td fontWeight="bold" border="2px">
                            Selecione o pet
                          </Td>
                          <Td fontWeight="bold" border="2px">
                            Nome
                          </Td>
                          <Td fontWeight="bold" border="2px">
                            Especie
                          </Td>
                          <Td fontWeight="bold" border="2px">
                            Raça
                          </Td>
                          <Td fontWeight="bold" border="2px">
                            Idade
                          </Td>
                          <Td fontWeight="bold" border="2px">
                            Etiqueta
                          </Td>
                        </Tr>
                      )}
                    </Thead>

                    {customer.pets ? (
                      customer.pets.map((pet: PetProps | any) => (
                        <Tbody>
                          <Tr key={pet.id} bgColor="white">
                            <Td>
                              <RadioGroup onChange={setPetId} value={petId}>
                                <Radio
                                  onClick={() => {
                                    setPetSelected(pet)
                                    
                                                                      
                                  }}
                                  borderColor="teal.800"
                                  colorScheme="green"
                                  value={pet.id.toString()}
                                />
                              </RadioGroup>
                            </Td>
                            <Td fontWeight="black">{pet.name}</Td>
                            <Td fontWeight="black">{pet.especie}</Td>
                            <Td fontWeight="black">{pet.race}</Td>
                            <Td fontWeight="black">{pet.bornDate}</Td>
                            <Td>
                              <AiFillTags size={28} color="green" />
                            </Td>
                          </Tr>
                        </Tbody>
                      ))
                    ) : (
                      <Tbody>
                        <Tr>
                          <Td>Sem pet cadastrado</Td>
                          <Td>Empty</Td>
                          <Td>Empty</Td>
                          <Td>Empty</Td>
                          <Td>Empty</Td>
                        </Tr>
                      </Tbody>
                    )}
                  </Table>
                </Flex>
              </>
            ) : (
              <>
                <TableContainer>
                  <Table variant="simple">
                    <Thead>
                      <Tr py="6" bg="blue.100">
                        <Td colSpan={4} fontWeight="bold" textAlign="center">
                          {" "}
                          Animal Selecionado
                        </Td>
                      </Tr>
                      <Tr>
                        <Th py="0.5">Nome do Animal</Th>
                        <Th py="0.5">
                          <Input
                            bg="white"
                            value={petSelected.name}
                            borderColor="black"
                          />
                        </Th>
                        <Th py="0.5">Espécie</Th>
                        <Th py="0.5">
                          <Input
                            bg="white"
                            value={petSelected.especie}
                            borderColor="black"
                          />
                        </Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      <Tr>
                        <Th py="0.5">Raça</Th>
                        <Th py="0.5">
                          <Input
                            bg="white"
                            value={petSelected.race}
                            borderColor="black"
                          />
                        </Th>
                        <Th py="0.5">Cor</Th>
                        <Th py="0.5">
                          <Input
                            bg="white"
                            value={petSelected.corPet}
                            borderColor="black"
                          />
                        </Th>
                      </Tr>
                      <Tr>
                        <Th py="0.5">Nascimento</Th>
                        <Th py="0.5">
                          <Input
                            bg="white"
                            value={petSelected.especie}
                            borderColor="black"
                          />
                        </Th>
                        <Th py="0.5">Idade</Th>
                        <Th py="0.5">
                          <Input
                            bg="white"
                            value={petSelected.bornDate}
                            borderColor="black"
                          />
                        </Th>
                      </Tr>
                      <Tr>
                        <Th py="0.5">Peso</Th>
                        <Th py="0.5">
                          <Input
                            bg="white"
                            value={petSelected.weigth}
                            borderColor="black"
                          />
                        </Th>
                        <Th py="0.5">Sexo</Th>
                        <Th py="0.5">
                          <Input
                            bg="white"
                            value={petSelected.sexo}
                            borderColor="black"
                          />
                        </Th>
                      </Tr>
                      <Tr>
                        <Th py="0.5">Plano de Saúde</Th>
                        <Th py="0.5" colSpan={3}>
                          <Select bg={"white"} borderColor="black" onChange={(ev) => setHealthId(Number(ev.target.value))}>
                           <option value="none">Não possui</option>
                            {
                              healthInsurance.map((health) => <option value={health.id}>{health.planName}</option>)
                            }
                            
                     
                          </Select>
                        </Th>
                      </Tr>
                      <Tr>
                        <Td py="0" colSpan={4} px="0">
                          <Flex display={"flex"} justifyContent={"space-around"} mt={"6"}>
                            <Button
                              py="6"
                              mt="0.2"
                              w="40%"
                              colorScheme="blue"
                              onClick={() => setPetSelected([])}
                            >
                              Voltar para a listagem de Animais
                            </Button>
                            <Button 
                              colorScheme="whatsapp"
                              py="6"
                              mt="0.2"
                              w="40%"
                              onClick={ ()=> setIsModalUpdated(true)}
                            >
                              Editar Animal
                            </Button>
                          </Flex>
                        </Td>

                      </Tr>
                    </Tbody>
                  </Table>
                </TableContainer>
              </>
            )}
          </Flex>

          <Flex
            direction="column"
            bgColor="gray.100"
            rounded={4}
            p="2"
            className="div3"
            align="center"
            textAlign="center"
          >
            <Text>INFORMAÇÕES ADICIONAIS</Text>
            <Textarea
              value={moreInfos}
              onChange={(ev) => setMoreInfos(ev.target.value)}
              m="2"
              borderColor="gray.900"
              bgColor="white"
              height="80%"
            ></Textarea>
          </Flex>

          <Flex
            direction="column"
            bgColor="gray.100"
            rounded={4}
            p="2"
            className="div4"
            align="center"
            textAlign="center"
          >
            <Flex
              gap={8}
              justify="space-evenly"
              w="100%"
              overflow="auto"
              height="100%"
            >
              <Flex direction="column" overflow="auto" height="100%"  >
                <Flex align="center" justify="space-between" gap={8} w="100%" p="2" mb="2" position="relative">
                <Text  fontWeight="bold" >
                  SELECIONAR VETERINÁRIO:
                </Text>
                <Input
                bgColor="white"
                w="180px"
                border="1px"
                placeholder="Pesquisar"
                name="searchVet"
                onChange={(ev) => {
                  setVetName(ev.target.value)
                  setVetPreference("")
                  loadVetsByName()
                }}
                />
                </Flex>
                        <HStack>
                          <Checkbox
                          onChange={(ev) => setNotPreferences(ev.target.checked)}
                           border='2px' mb="4px"  />
                          <Text fontWeight="bold">Sem preferência</Text>
                        </HStack>
                {userVets.map((vet) => (
                  <RadioGroup
                    mt={2}
                    key={vet.id}
                    onChange={setVetPreference}
                    value={notPreferences === true ? '' : vetPreference}
                  >
                    <Flex direction="column">
                       
                      <Radio
                        mb="2"
                        borderColor="teal.800"
                        colorScheme="green"
                        value={vet.consultName.toString()}
                      >
                        {vet.consultName}
                      </Radio>
                    </Flex>
                  </RadioGroup>
                ))}
              </Flex>

              <Flex direction="column" overflow="auto" height="100%">
                <Text mt="4" fontWeight="bold" pb="2">
                  SELECIONAR ATENDIMENTO
                </Text>
                <RadioGroup onChange={setQueryType} value={queryType}>
                  <Flex direction="column">
                    <Radio
                      mb="2"
                      borderColor="teal.800"
                      colorScheme="green"
                      value="Avaliação"
                    >
                      Avaliação
                    </Radio>
                    <Radio
                      mb="2"
                      borderColor="teal.800"
                      colorScheme="green"
                      value="Cancelar"
                    >
                      Cancelar
                    </Radio>
                    <Radio
                      mb="2"
                      borderColor="teal.800"
                      colorScheme="green"
                      value="Consulta"
                    >
                      Consulta
                    </Radio>
                    <Radio
                      mb="2"
                      borderColor="teal.800"
                      colorScheme="green"
                      value="Consulta ESP"
                    >
                      Consulta ESP
                    </Radio>
                    <Radio
                      mb="2"
                      borderColor="teal.800"
                      colorScheme="green"
                      value="Consulta PetLove"
                    >
                      Consulta PetLove
                    </Radio>
                    <Radio
                      mb="2"
                      borderColor="teal.800"
                      colorScheme="green"
                      value="Consulta Triagem"
                    >
                      Consulta Triagem
                    </Radio>
                    <Radio
                      mb="2"
                      borderColor="teal.800"
                      colorScheme="green"
                      value="Exame Externo"
                    >
                      Exame Externo
                    </Radio>
                    <Radio
                      mb="2"
                      borderColor="teal.800"
                      colorScheme="green"
                      value="Orientação"
                    >
                      Orientação
                    </Radio>
                    <Radio
                      mb="2"
                      borderColor="teal.800"
                      colorScheme="green"
                      value="Retorno ESP"
                    >
                      Retorno ESP
                    </Radio>
                    <Radio
                      mb="2"
                      borderColor="teal.800"
                      colorScheme="green"
                      value="Telefone"
                    >
                      Telefone
                    </Radio>
                  </Flex>
                </RadioGroup>
              </Flex>
            </Flex>

            <Button
              mt="2"
              m="4"
              w="80%"
              py="6"
              onClick={() => {
                setPetInQueue();
                navigate("");
              }}
              colorScheme="teal"
            >
              GRAVAR
            </Button>
            <GenericModal
              isOpen={modalOpen}
              onRequestClose={() => setModalOpen(false)}
            >
              <Text
                fontWeight="bold"
                fontSize="2xl"
                w="100%"
                textAlign="center"
              >
                Cadastro de Animal
              </Text>
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
            <WeightPetInput
              onBlur={""}
              value={weight}
              onChange={(e: any) => setWeight(e.target.value)}
              id="peso"
              name="peso"
            ></WeightPetInput>

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
         
          w="100%"
          py="7"
        >
          Cadastrar
        </Button>
      </FormControl>
            </GenericModal>
            {/* isOpen={modalEditOpen} onRequestClose={() => setModalEditOpen(false)} pet={petSelected} */}
            <GenericModal  isOpen={isModalUpdated} onRequestClose={()=> setIsModalUpdated(false)}>
              <ModalEditAnimal refetch={()=> refetch()} petSelected={petSelected} setPetSelected={setPetSelected} setIsModalUpdated={setIsModalUpdated}  />
            </GenericModal>
          </Flex>
        </WorkSpaceContent>
      </WorkSpaceContainer>
    </ChakraProvider>
  );
}

