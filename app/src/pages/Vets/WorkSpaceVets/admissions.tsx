import {
  ChakraProvider,
  Flex,
  Text,
  Button,
  Image,
  Checkbox,
  HStack,
  SimpleGrid,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BiHome } from "react-icons/bi";
import { MdOutlineBedroomChild } from "react-icons/md";
import { TbArrowBack } from "react-icons/tb";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import logo from "../../../assets/logoPadronizada.png";
import petlove from "../../../assets/petlove.svg";
import { PetDetaisl } from "../../../interfaces";
import { api } from "../../../lib/axios";

interface KennelsProps {
  id: number;
  name: string;
  description: string;
  price: number | string;
}

type beds = {
  id: number;
  busy: boolean;
  fasting: boolean;
  petName?: string;
};
interface Kennels {
  name: string;
  beds: beds[];
  totalOcupedBeds: number;
}

export function VetsAdmissions() {
  const { id, queueId } = useParams<{ id: string; queueId: string }>();
  const [kennelId, setKennelId] = useState(0);
  const [bedId, setBedId] = useState(0);
  const [fasting, setFasting] = useState(false);
  const [dailyRateState, setDailyRateState] = useState(0);
  const [steps, setSteps] = useState(1);
  const [area, setArea] = useState("");
  const navigate = useNavigate();
  const [kennels, setKennels] = useState<KennelsProps[]>([]);
  const [beds, setBeds] = useState<Kennels[]>([]);
  const [petDetails, setPetDetails] = useState({} as PetDetaisl);

  async function GetAllBeds() {
    const response = await api.get("/admittedpet");
    const petres = await api.get(`/pets/${id}`);
    setBeds(response.data);
    setPetDetails(petres.data);
  }

  const nextStep = () => {
    setSteps(steps + 1);
    if (steps > 3) {
      prevStep();
    }
  };
  const prevStep = () => {
    setSteps(steps - 1);
    if (steps < 1) {
      nextStep();
    }
  };

  async function getKennesl() {
    try {
      const response = await api.get("/admissions");
      setKennels(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  const handleNextSteps = (kennelId: number, bedId: number, area: string) => {
    setKennelId(kennelId);
    setArea(area);
    setBedId(bedId);
    nextStep();
  };

  useEffect(() => {
    getKennesl();
    GetAllBeds();
  }, []);

  const handleAdmittPet = async () => {
    const data = {
      petId: Number(id),
      kennelId,
      bedId,
      isBusy: true,
      mustFasting: fasting,
      recordId: petDetails.recordId,
      dailyRate: dailyRateState,
    };
    try {
      await api.put("admitpet", data);
      toast.success("Animal internado!");
      navigate(`/Vets/Workspace/${id}/${queueId}`);
    } catch (error) {
      console.log(error);
      toast.error("Falha ao internar animal!");
    }
  };

  let step;
  switch (true) {
    case steps === 1:
      step = (
        <>
          <Flex
            width="100%"
            height="100%"
            mt="2"
            align="center"
            direction="column"
          >
            <Flex
              align="center"
              justify="center"
              width="100%"
              height="38px"
              bgColor="gray.200"
            >
              <Text fontWeight="bold">SELECIONE UMA ÁREA PARA INTERNAÇÃO</Text>
            </Flex>
            <Flex
              width="100%"
              height="100%"
              justify="center"
              align="center"
              gap="8"
            >
              {kennels.map((kennel) => (
                <Flex
                  key={kennel.id}
                  justify="center"
                  align="center"
                  direction="column"
                  width="400px"
                  height="400px"
                  boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px"
                >
                  {kennel.name.includes("PetLove") ? (
                    <Image width={220} height={140} src={petlove} />
                  ) : (
                    <Image width={220} height={140} src={logo} />
                  )}

                  <Flex justify="center" width="100%" height="100%">
                    <Flex direction="column" justify="center">
                      <Text fontWeight="bold" fontSize="lg">
                        {kennel.name.toUpperCase()}
                      </Text>
                      <Text>{kennel.description}</Text>
                      <Text fontWeight="bold" fontSize="lg" color="green.400">
                        R$ {kennel.price}
                      </Text>
                      <Button
                        mt="4"
                        colorScheme="whatsapp"
                        onClick={() => {
                          handleNextSteps(kennel.id, bedId, kennel.name);
                          setDailyRateState(Number(kennel.price));
                        }}
                      >
                        SELECIONAR
                      </Button>
                    </Flex>
                  </Flex>
                </Flex>
              ))}
            </Flex>
          </Flex>
        </>
      );
      break;
    case steps === 2:
      step = (
        <Flex
          direction="column"
          width="100%"
          height="100%"
          mt="2"
          align="center"
        >
          <Flex
            align="center"
            justify="center"
            width="100%"
            height="38px"
            bgColor="gray.200"
            mb="4"
          >
            <Text fontWeight="bold">SELECIONE O LEITO</Text>
          </Flex>
          <SimpleGrid
            flex="1"
            gap="4"
            minChildWidth="320px"
            align="flex-start"
            as={Flex}
          >
            {beds
              ? beds.map((bed) => (
                  <Flex
                    p="8"
                    bg="gray.100"
                    borderRadius={8}
                    direction="column"
                    align="center"
                  >
                    <Text fontSize="lg" mb="4">
                      {bed.name}
                    </Text>
                    <Flex justify="center" wrap="wrap" gap={2}>
                      {bed.beds.map((bed) => (
                        <Flex
                          key={bed.id}
                          as="button"
                          disabled={bed.busy}
                          onClick={() =>
                            handleNextSteps(kennelId, bed.id, area)
                          }
                          _hover={{ bgColor: "cyan.100" }}
                          borderColor="black"
                          border="2px"
                          rounded={8}
                          direction="column"
                          align="center"
                          p="4"
                        >
                          <Flex direction="column" align="center" gap={4}>
                            <Text>{bed.petName ? bed.petName : "Vazio"}</Text>
                            <Text>Leito Nº {bed.id}</Text>
                          </Flex>

                          {bed.busy === true ? (
                            <MdOutlineBedroomChild color="red" size={44} />
                          ) : (
                            <MdOutlineBedroomChild color="green" size={44} />
                          )}
                        </Flex>
                      ))}
                    </Flex>
                  </Flex>
                ))
              : "Sem internações no momento!"}
          </SimpleGrid>
        </Flex>
      );
      break;
    case steps === 3:
      step = (
        <Flex width="100%" height="100%" align="center" justify="center">
          <Flex
            rounded={18}
            direction="column"
            width="500px"
            height="300px"
            align="center"
            justify="center"
            gap={4}
            bgColor="gray.200"
            p="4"
          >
            <HStack>
              <Flex gap="4" direction="column" height="100%" justify="center">
                <Text fontWeight="bold">ÁREA SELECIONADA:</Text>
                <Text fontWeight="bold">LEITO SELECIONADO:</Text>
                <Text fontWeight="bold">PRECISA DE JEJUM?:</Text>
              </Flex>
              <Flex gap="4" direction="column" height="100%" justify="center">
                <Text
                  textAlign="center"
                  width="180px"
                  fontWeight="black"
                  bgColor="white"
                  rounded={8}
                >
                  {area}
                </Text>
                <Text
                  textAlign="center"
                  width="180px"
                  fontWeight="black"
                  bgColor="white"
                  rounded={8}
                >
                  {bedId}
                </Text>
                <Checkbox
                  onChange={(ev) =>
                    ev.target.checked === true
                      ? setFasting(true)
                      : setFasting(false)
                  }
                  size="lg"
                  borderColor="black"
                />
              </Flex>
            </HStack>
            <Button onClick={handleAdmittPet} colorScheme="teal" width="250px">
              CONFIRMAR
            </Button>
          </Flex>
        </Flex>
      );
  }

  return (
    <ChakraProvider>
      <Flex width="100vw" height="100vh" bgColor="white" direction="column">
        <Flex w="100%" height="10vh" bgColor="gray.200">
          <Flex align="center" gap="2">
            <Text m="2" fontSize="2xl" fontWeight="bold">
              Internação
            </Text>
            <Button
              colorScheme="teal"
              leftIcon={<BiHome size={24} />}
              onClick={() => navigate("/Home")}
            >
              Home
            </Button>

            <Button
              colorScheme="yellow"
              leftIcon={<TbArrowBack size={24} />}
              onClick={() => navigate(`/Vets/Workspace/${id}/${queueId}`)}
            >
              Voltar
            </Button>
          </Flex>
        </Flex>
        <Flex width="100%" height="90vh" direction="column">
          <Flex
            align="center"
            justify="center"
            width="100%"
            height="68px"
            gap="2"
            bgColor="gray.100"
          >
            <Button onClick={prevStep} colorScheme="whatsapp">
              Anterior
            </Button>
            {steps === 1 ? (
              <Text
                fontWeight="bold"
                bgColor="green.100"
                border="4px"
                borderColor="green"
                p="4"
                rounded={18}
              >
                SELECIONE A ÁREA
              </Text>
            ) : (
              <Text
                fontWeight="bold"
                bgColor="red.100"
                border="4px"
                borderColor="red"
                p="4"
                rounded={18}
              >
                SELECIONE A ÁREA
              </Text>
            )}

            {steps === 2 ? (
              <Text
                fontWeight="bold"
                bgColor="green.100"
                border="4px"
                borderColor="green"
                p="4"
                rounded={18}
              >
                SELECIONE O LEITO
              </Text>
            ) : (
              <Text
                fontWeight="bold"
                bgColor="red.100"
                border="4px"
                borderColor="red"
                p="4"
                rounded={18}
              >
                SELECIONE O LEITO
              </Text>
            )}

            {steps === 3 ? (
              <Text
                fontWeight="bold"
                bgColor="green.100"
                border="4px"
                borderColor="green"
                p="4"
                rounded={18}
              >
                CONFIRMAÇÃO FINAL
              </Text>
            ) : (
              <Text
                fontWeight="bold"
                bgColor="red.100"
                border="4px"
                borderColor="red"
                p="4"
                rounded={18}
              >
                CONFIRMAÇÃO FINAL
              </Text>
            )}
            <Button onClick={nextStep} colorScheme="whatsapp">
              Próximo
            </Button>
          </Flex>
          <Flex width="100%" height="100%" align="center" justify="center">
            {step}
          </Flex>
        </Flex>
      </Flex>
    </ChakraProvider>
  );
}
