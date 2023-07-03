import {
  WorkSpaceContainer,
  WorkSpaceHeader,
  WorkSpaceContent,
  WorkSpaceFooter,
} from "./styles";
import {
  Text,
  Button,
  ChakraProvider,
  Flex,
  Table,
  Thead,
  Tr,
  Td,
  Tbody,
  Textarea,
  HStack,
  VStack,
  Select
} from "@chakra-ui/react";
import {
  AiFillMedicineBox,
  BiHome,
  MdPets,
  TbArrowBack,
  TbMedicalCrossFilled,
} from "react-icons/all";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../../lib/axios";
import { LoadingSpinner } from "../../components/Loading";
import { SetExamForm } from "../../components/workspaceVet/SetExamForm";
import { GenericModal } from "../../components/Modal/GenericModal";


type ExamsProps = [
  {
    id: number | string;
    name: string;
    price: string;
    doneExam: boolean;
    requestedData: string;
  }
];

type QueueProps = {
  moreInfos: string;
  queueOur: string;
};
export interface PetProps {
  id: number;
  name: string;
  customerName: string;
  balance: number;
  customerId: number;
  especie: string;
  corPet: string;
  observations: string;
  race: string;
  rga: number;
  sizePet: string;
  weigth: string;
  sexo: string;
  status: string;
  bornDate: string;
  exams: ExamsProps;
  queue: QueueProps;
  recordId: string | number;
}

export function WorkSpaceVet() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [pet, setPet] = useState({} as PetProps);
  const [isModalOpen, setIsModalOpen] = useState(false);
  function openModal() {
    setIsModalOpen(true);
  }
  function closeModal() {
    setIsModalOpen(false);
  }


  useEffect(() => {
    async function getPetDetails() {
      const response = await api.get(`/pets/${id}`);
      setPet(response.data);
    }
    getPetDetails();
  }, []);

  console.log("DETALHES PET", pet);
  ("");

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
                WorkSpace Veterinário
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
                onClick={() => navigate("/Vets/Menu")}
              >
                Voltar
              </Button>
            </Flex>

            <Flex flexWrap="wrap" justify="start" gap="2" m="4" p="2">
              <Button onClick={() => openModal()} height={8} colorScheme="whatsapp">
                FORMULÁRIOS
              </Button>
              <Button height={8} colorScheme="whatsapp"
              onClick={() => navigate(`/WorkSpace/Instructions/${id}`)}
              >
                INSTRUÇÕES PROPRIETÁRIO
              </Button>
              <Button height={8} colorScheme="whatsapp">
                AUTORIZAÇÕES
              </Button>
              <Button height={8} colorScheme="whatsapp"
              onClick={() => navigate(`/WorkSpace/Protocols/${id}`)}
              >
                PROTOCOLOS
              </Button>
              <Button
                height={8}
                colorScheme="whatsapp"
                onClick={() => navigate(`/WorkSpace/Exam/${id}`)}
              >
                EXAMES
              </Button>
              <Button
                  onClick={() => navigate(`/WorkSpace/Procedures/${id}`)}
              height={8} colorScheme="whatsapp">
                PROCEDIMENTOS
              </Button>
              <Button height={8} colorScheme="whatsapp" onClick={() => navigate(`/WorkSpace/Vaccines/${id}`)} >
                VACINAS
              </Button>
              <Button height={8} colorScheme="whatsapp">
                CIRURGIAS
              </Button>
              <Button height={8} colorScheme="whatsapp"
              onClick={() => navigate(`/WorkSpace/Admissions/${id}`)}
              >
                INTERNAR
              </Button>
      
              <Button height={8} onClick={() => navigate(`/Pets/MedicineRecord/${id}`)} leftIcon={<MdPets />} colorScheme="messenger">
                PRONTUÁRIO DO PET
              </Button>
            </Flex>
          </Flex>
        </WorkSpaceHeader>
        <WorkSpaceContent>
          <div className="div1">
            <Flex m="4" gap="2" direction="row">
              <VStack>
                <Text fontWeight="bold">Cliente</Text>
                <Text fontWeight="bold">Gastos</Text>
                <Text fontWeight="bold">Animal</Text>
                <Text fontWeight="bold">Horário</Text>
                <Text fontWeight="bold">Internações</Text>
                <Text fontWeight="bold">Plano de Saúde</Text>
              </VStack>
              <VStack>
                <Text
                  border="1px"
                  width="400px"
                  rounded="4px"
                  fontWeight="bold"
                  textAlign="center"
                  bgColor="gray.100"
                >
                  {pet.customerName}
                </Text>
                <Text
                  border="1px"
                  width="400px"
                  rounded="4px"
                  fontWeight="bold"
                  textAlign="center"
                  bgColor="gray.100"
                >
                  {new Intl.NumberFormat("pt-BR", {
                    currency: "BRL",
                    style: "currency",
                  }).format(pet.balance)}
                </Text>
                <Text
                  border="1px"
                  width="400px"
                  rounded="4px"
                  fontWeight="bold"
                  textAlign="center"
                  bgColor="gray.100"
                >
                  {`${pet.name}, ${pet.race}`}
                </Text>

                <Text
                  border="1px"
                  width="400px"
                  rounded="4px"
                  fontWeight="bold"
                  textAlign="center"
                  bgColor="gray.100"
                >
                  {`${pet.sexo}, ${pet.weigth}`}
                </Text>
                <Text
                  border="1px"
                  width="400px"
                  rounded="4px"
                  fontWeight="bold"
                  textAlign="center"
                  bgColor="gray.100"
                >
                  {pet.queue?.queueOur}
                </Text>
                <Select
                  border="1px"
                  height="26px"
                  width="400px"
                  rounded="4px"
                  fontWeight="bold"
                  textAlign="center"
                  bgColor="gray.100"
                  placeholder="Selecione uma Opção"
                >
                  <option value="option1">Não tenho plano de saúde</option>
                  <option value="option2">Pet Love</option>
                </Select>
              </VStack>
            </Flex>
            <Flex direction="column" m="4">
              <Text fontSize="lg" m="2">
                Observações
              </Text>
              <Textarea color="red.900" value={pet.queue?.moreInfos}></Textarea>
            </Flex>
          </div>
          <Flex direction="column" className="div2">
            <Flex
              backgroundColor="cyan.100"
              w="100%"
              h="48px"
              direction="row"
              align="center"
              justify="center"
            >
              <Text mr="1">Exames - </Text>
              <Text mr="2" color="red">
                Vermelho: Por fazer{" "}
              </Text>
              /
              <Text ml="2" color="green">
                Verde: pronto
              </Text>
            </Flex>

            <Flex m="2" direction="column" gap="2" overflow="auto">
              {pet.exams ? (
                pet.exams.map((exam) => (
                  <Flex
                    key={exam.id}
                    w="100%"
                    backgroundColor="gray.100"
                    p="2"
                    justify="space-between"
                  >
                    <>
                      {exam.doneExam === true ? (
                        <Text color="green.400" fontWeight="bold">
                          {exam.name}
                        </Text>
                      ) : (
                        <Text color="red.400" fontWeight="bold">
                          {exam.name}
                        </Text>
                      )}
                    </>
                    <Text>{exam.requestedData}</Text>
                  </Flex>
                ))
              ) : (
                <Text>Sem exame Solicitado</Text>
              )}
            </Flex>
          </Flex>
          <div className="div3">
            <HStack spacing={4} m="2">
              <Button colorScheme="whatsapp">Diagnóstico</Button>
              <Button colorScheme="whatsapp">Prescrição</Button>
              <Button colorScheme="whatsapp">Sintomas</Button>
              <Button colorScheme="whatsapp">Solicitar Exame</Button>
            </HStack>
            <Textarea
              border="1px"
              minHeight={220}
              m="2"
              maxWidth={600}
            ></Textarea>
          </div>
          <div className="div4">
            <Flex justify="space-between" gap="2" m="2">
              <Button leftIcon={<MdPets />} height={8} colorScheme="whatsapp">
                Outros Animais
              </Button>
              <Button
                leftIcon={<TbMedicalCrossFilled />}
                height={8}
                colorScheme="whatsapp"
              >
                Vacinas
              </Button>
              <Button
                leftIcon={<AiFillMedicineBox />}
                height={8}
                colorScheme="whatsapp"
              >
                Cirurgias
              </Button>
            </Flex>

            <Flex m="2" direction="column" gap="2">
              <Flex
                w="100%"
                backgroundColor="gray.100"
                p="4"
                justify="space-between"
              ></Flex>

              <Flex
                w="100%"
                backgroundColor="gray.100"
                p="4"
                justify="space-between"
              ></Flex>

              <Flex
                w="100%"
                backgroundColor="gray.100"
                p="4"
                justify="space-between"
              ></Flex>
            </Flex>
          </div>
        </WorkSpaceContent>
        <WorkSpaceFooter>
          <Flex
            justify="space-evenly"
            align="center"
            width="100%"
            height="100%"
          >
            <Button colorScheme="teal">Imprimir Receita</Button>
            <Button colorScheme="whatsapp">Imprimir Raio-X</Button>
            <Button colorScheme="whatsapp">Imprimir Solicitação Exames</Button>
            <Button colorScheme="red">Gravar Alterações</Button>
          </Flex>
        </WorkSpaceFooter>
      </WorkSpaceContainer>
          <GenericModal    isOpen={isModalOpen}
                      onRequestClose={closeModal} >
                        <Flex direction="column"  gap="4" border='2px' m="4" p="4" rounded={8}>
                        <Button colorScheme="whatsapp">
                          FICHA ANESTÉSICA PERSONALIZADA
                         
                        </Button>
                        <Button colorScheme="whatsapp"> 
                        FICHA ANESTÉSICA TOMOGRAFIA
                        </Button>

                        <Button colorScheme="whatsapp">
                          FICHA DE PARÂMETROS
                        </Button>
                        <Button colorScheme="whatsapp"> 
                          FICHA DE MEDICAÇÃO
                        </Button>
                        </Flex>
                      

      </GenericModal>
    </ChakraProvider>
  );
}
