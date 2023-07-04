import { Button } from '@chakra-ui/button'
import { Flex } from '@chakra-ui/layout'
import { ChakraProvider } from '@chakra-ui/react'
import { Text } from '@chakra-ui/layout'
import { BiHome } from 'react-icons/bi'
import { CgAdd } from 'react-icons/cg'
import { TbArrowBack } from 'react-icons/tb'
import { ListIcon } from '@chakra-ui/layout'
import { useNavigate, useParams } from 'react-router'
import {useState} from "react"
import { Surgierslist } from '../../../components/surgeries/surgierslist'
import { Createsurgeries } from '../../../components/surgeries/createsurgeries'

export function VetsSurgeries() {
  const { id } = useParams<{id: string}>()
  const navigate = useNavigate()
  const [renderizarion, setRenderizarion] = useState<string>("List")


  return (
    <ChakraProvider>
      <Flex width="100vw" height="100vh" bgColor="white" direction="column">
        <Flex w="100%" height="10vh" bgColor="gray.200">
          <Flex align="center" gap="2">
          {renderizarion === "List" &&
            <Text m="2" fontSize="2xl" fontWeight="bold">
              Cirurgias
            </Text>
          }
          {renderizarion === "Create" &&
            <Text m="2" fontSize="2xl" fontWeight="bold">
              Nova Cirurgia
            </Text>
          }
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
            {renderizarion === "List" &&
              <Button
                colorScheme="whatsapp"
                leftIcon={<CgAdd size={20} />}
                onClick={() => setRenderizarion("Create")}
              >
                Nova Cirurgia
              </Button>
            }
            {renderizarion === "Create" &&
              <Button
                colorScheme="whatsapp"
                leftIcon={<TbArrowBack size={20} />}
                onClick={() => setRenderizarion("List")}
              >
                Listagem
              </Button>
            }
          </Flex>
        </Flex>
        <Flex width="100%" height="90vh" direction="column">
        {renderizarion === "List" &&
          <Surgierslist/>
        }
        {renderizarion === "Create" &&
          <Createsurgeries/>
        }
        </Flex>
      </Flex>
    </ChakraProvider>
  )
}
