import {
  ChakraProvider,
  Flex,
  Text,
  Button,
  Box,
  Card,
  CardBody,
  Image,
  Stack,
  Heading,
  Divider,
  CardFooter,
  ButtonGroup,
  Checkbox,
  HStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { BiHome } from "react-icons/bi";
import { TbArrowBack } from "react-icons/tb";
import { useNavigate, useParams } from "react-router-dom";
import logo from "../../../assets/logoPadronizada.png";
import petlove from "../../../assets/petlove.svg";
import { ShowBeds } from "../../Admissions/beds";

export function VetsAdmissions() {
  const { id } = useParams<{ id: string }>();
  const [steps, setSteps] = useState(1);
  const navigate = useNavigate();

  const nextStep = () => {
    setSteps(steps + 1);
    if (steps > 3) {
      prevStep()
    }
  };

  const prevStep = () => {
    setSteps(steps - 1);
    if(steps < 1) {
      nextStep()
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
            <Flex width="100%" height="100%" justify="center" align="center" gap="8">
              <Flex justify="center"  align="center" direction="column"   width="400px" height="400px"  boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px" > 
        
              <Image width={220} height={140} src={logo} />
                <Flex justify="center" width="100%" height="100%">
                  <Flex direction="column" justify="center" >
                  <Text fontWeight="bold" fontSize="lg">INTERNAÇÃO 24 HORAS</Text>
                  <Text>PLANO PADRÃO DA INTERNAÇÃO 24HRS</Text>
                  <Text fontWeight="bold" fontSize="lg" color="green.400"  >R$ 440</Text>
                  <Button mt="4" colorScheme="whatsapp" >SELECIONAR</Button>
                  </Flex>
                 
                </Flex>
              </Flex>
              <Flex justify="center"  align="center" direction="column"   width="400px" height="400px"  boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px" > 
        
        <Image width={220} height={140} src={logo} />
          <Flex justify="center" width="100%" height="100%">
            <Flex direction="column" justify="center" >
            <Text fontWeight="bold" fontSize="lg">PLANO CASTRAÇÃO</Text>
            <Text>PLANO PADRÃO DA CASTRAÇÃO</Text>
            <Text fontWeight="bold" fontSize="lg" color="green.400"  >R$ 00</Text>
            <Button mt="4" colorScheme="whatsapp" >SELECIONAR</Button>
            </Flex>
           
          </Flex>
        </Flex>

        <Flex justify="center"  align="center" direction="column"   width="400px" height="400px"  boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px" > 
        
        <Image width={220} height={140} src={petlove} />
          <Flex justify="center" width="100%" height="100%">
            <Flex direction="column" justify="center" >
            <Text fontWeight="bold" fontSize="lg">PLANO PETLOVE</Text>
            <Text>PLANO PADRÃO DA PETLOVE</Text>
            <Text fontWeight="bold" fontSize="lg" color="green.400"  >R$0</Text>
            <Button mt="4" colorScheme="whatsapp" >SELECIONAR</Button>
            </Flex>
           
          </Flex>
        </Flex>
      
            </Flex>
          </Flex>
        </>
      );
      break;
      case steps === 2: 
      step = (
        <Flex direction="column"
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
                  <ShowBeds />
        </Flex>

      )
      break;
      case steps === 3: 
      step = (
        <Flex width="100%" height="100%" align="center" justify="center">
          
          <Flex rounded={18} direction="column"  width="500px" height="300px" align="center" justify="center" gap={4} bgColor="gray.200" p="4">
            <HStack>
            <Flex gap="4" direction="column" height="100%" justify="center" >
            <Text fontWeight="bold" >PLANO SELECIONADO:</Text>
            <Text fontWeight="bold" >LEITO SELECIONADO:</Text>
            <Text fontWeight="bold" >PRECISA DE JEJUM?:</Text>
            </Flex>
            <Flex gap="4" direction="column" height="100%" justify="center" >
              <Text textAlign="center" width="180px" fontWeight="black" bgColor="white" rounded={8}>INTERNAÇÃO 24HRS</Text>
              <Text textAlign="center" width="180px" fontWeight="black" bgColor="white" rounded={8}>5</Text>
              <Checkbox size="lg" borderColor="black" />
            </Flex>
            </HStack>
              <Button colorScheme="teal" width="250px" >CONFIRMAR</Button>

        
          </Flex>
        
        </Flex>
      )

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
              onClick={() => navigate(`/Vets/Workspace/${id}`)}
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
