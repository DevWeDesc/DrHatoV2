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
  Tfoot,
  Th,
  TableCaption,
  TableContainer,
  Input,
  Select,
} from "@chakra-ui/react";
import { useEffect, useState, useContext } from "react";
import { ReceptionSidebar } from "../../components/Sidebars/ReceptionBar";
import { AiFillTags, BiHome, TbArrowBack } from "react-icons/all";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../lib/axios";
import {
  WorkSpaceContainer,
  WorkSpaceContent,
  WorkSpaceHeader,
} from "../Vets/styles";
import { PetProps } from "../Pets/details";
import { DbContext } from "../../contexts/DbContext";
import { GenericModal } from "../../components/Modal/GenericModal";
import { CreatePetsForm } from "../../components/Forms/CreatePetsForm";

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

export function Customer() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { vets } = useContext(DbContext);
  const [petId, setPetId] = useState("");
  const [queryType, setQueryType] = useState("");
  const [vetPreference, setVetPreference] = useState("");
  const [moreInfos, setMoreInfos] = useState("");
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
  const [reload, setReload] = useState(false);
  async function loadCustomer() {
    const response = await api.get(`/customers/${id}`);
    setCustomer(response.data);
  }
  useEffect(() => {
    loadCustomer();
  }, []);

  useEffect(() => {
    if (reload === true) {
      loadCustomer();
      setReload(false); // Rese
    }
  },[reload]);



  async function setPetInQueue() {
    if (!queryType || !petId || !vetPreference) {
      toast.error(`Antes de colocar o Pet na Fila e necessário selecionar todos campos obrigatórios\n
    1. Selecione o Pet\n,
    2. Selecione o Tipo de Atendimento\n
    3. Selecione o Veterinário`);
    }

    try {
      const formattedData = new Date();
      const processData = new Intl.DateTimeFormat().format(formattedData);
      const formatter = new Intl.DateTimeFormat([], {
        timeZone: "America/Sao_Paulo",
        hour: "numeric",
        minute: "numeric",
      });
      const currentDateTime = formatter.format(new Date());

      const data = {
        vetPreference: vetPreference,
        queryType: queryType,
        queueEntry: formattedData,
        petIsInQueue: true,
        moreInfos: moreInfos,
        queueOur: currentDateTime,
      };


      await api.put(`queue/${petSelected.id}`, data);
      toast.success("Pet colocado na fila com sucesso!");
    } catch (error) {
      toast.error("Falha ao colocar na fila");
    }
  }

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
                                  onClick={() => setPetSelected(pet)}
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
                          <Select bg={"white"} borderColor="black">
                            <option value="">Não possui</option>
                            <option value="">PetLove</option>
                          </Select>
                        </Th>
                      </Tr>
                      <Tr>
                        <Td py="0" colSpan={4} px="0">
                          <Button
                            py="6"
                            mt="0.2"
                            w="100%"
                            colorScheme="blue"
                            onClick={() => setPetSelected([])}
                          >
                            Voltar para a listagem de Animais
                          </Button>
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
              <Flex direction="column" overflow="auto" height="100%">
                <Text mt="4" fontWeight="bold" pb="2">
                  SELECIONAR VETERINÁRIO
                </Text>

                {vets.map((vet) => (
                  <RadioGroup
                    key={vet.id}
                    onChange={setVetPreference}
                    value={vetPreference}
                  >
                    <Flex direction="column">
                      <Radio
                        mb="2"
                        borderColor="teal.800"
                        colorScheme="green"
                        value={vet.username.toString()}
                      >
                        {vet.username}
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
              <CreatePetsForm reloadPets={reload} />
            </GenericModal>
          </Flex>
        </WorkSpaceContent>
      </WorkSpaceContainer>
    </ChakraProvider>
  );
}
