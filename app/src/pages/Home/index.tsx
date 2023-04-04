import { Header } from '../../components/Header'
import {
  ChakraProvider,
  Flex, 
  AccordionIcon,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Box,
  Table,
  Tbody,
  Th,
  Tr,
  Td,
  Thead,
  Button
} from '@chakra-ui/react'
import { HomeContainer } from './style'
import { CardNavigation } from '../../components/CardNavigation'
import {
  BsHouseDoorFill,
  RxThickArrowLeft,
  FaHospitalUser,
  GiHealthNormal,
  IoFlask,
  BsBellFill,
  RxThickArrowRight,
  GiHealthPotion,
  AiFillSchedule,
  GiNurseFemale,
  AiFillCheckCircle
} from 'react-icons/all'
import { Schedule } from '../../components/Calendar'
import { Link } from 'react-router-dom'

export function Home() {
  return (

    <ChakraProvider>

   
      <Header />
      <HomeContainer>
        <div className="section-1">
          <Accordion defaultIndex={[0]} allowMultiple>
            <AccordionItem>
              <h2 className="acordionTitle">
                <AccordionButton
                  gap="1rem"
                  _expanded={{ bg: '#F6F9FF', color: 'black' }}
                >
                  <BsHouseDoorFill fill="#8eda7c" size={26} />
                  <Box as="span" flex="1" textAlign="left">
                    Administração
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <div className="submenus">
                  <Link to="/Home/Admin">DASHBOARD</Link>
                  <a href=""> CRIAR USUÁRIO</a>
                </div>
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <h2 className="acordionTitle">
                <AccordionButton gap="1rem">
                  <FaHospitalUser size={26} />
                  <Box as="span" flex="1" textAlign="left">
                    Recepção
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <div className="submenus">
                <Link to="/Home/Recepcao">Recepção</Link>
                
                </div>
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <h2 className="acordionTitle">
                <AccordionButton gap="1rem">
                  <GiHealthNormal fill="#f10b0b" size={26} />
                  <Box as="span" flex="1" textAlign="left">
                    Veterinários
                    
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <div className="submenus">
                <Link to="/Home/Vets/Menu">Recepção</Link>
                </div>
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <h2 className="acordionTitle">
                <AccordionButton gap="1rem">
                  <IoFlask fill="#217c97" size={26} />
                  <Box as="span" flex="1" textAlign="left">
                    Laboratórios
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <div className="submenus">
                  <ul>
                    <li>
                    
                      <a href=""> DASHBOARD</a>
                    </li>
                    <li>
                      {' '}
                      <a href=""> CRIAR USUÁRIO</a>
                    </li>
                    <li>
                      <a href=""> Gerar Relatórios</a>
                    </li>
                  </ul>
                </div>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </div>
        <div className="section-2">
          <div className="cards">
            <CardNavigation
              path="/Home/Admin"
              title="Administração"
              text="Relatórios"
              icon={<BsHouseDoorFill fill="#8eda7c" size={36} />}
            />
            <CardNavigation
              path="/Home/Recepcao"
              title="Recepção"
              text="Consultar cliente"
              icon={<FaHospitalUser size={36} />}
            />
            <CardNavigation
              path="/Home/Vets/Menu"
              title="Veterinários"
              text="Marcar consulta"
              icon={<GiHealthNormal fill="#f10b0b" size={36} />}
            />
            <CardNavigation
              title="Laboratórios"
              text="Ver exames"
              icon={<IoFlask fill="#217c97" size={36} />}
            />
            <CardNavigation
              title="Medicamentos"
              text="Ver medicamentos"
              icon={<GiHealthPotion fill="#63136a" size={36} />}
            />
            <CardNavigation
              title="Internações"
              text="Ver exames"
              icon={<GiNurseFemale fill="#c9537e" size={36} />}
            />
            <CardNavigation
              title="Agendas"
              text="Ver exames"
              icon={<AiFillSchedule fill="#6ac574" size={36} />}
            />
            <CardNavigation
              title="Mensagens"
              text="Ver mensagens"
              icon={<BsBellFill fill="#FF7200" size={36} />}
            />
            <CardNavigation
              title="Autorizações"
              text="Ver exames"
              icon={<AiFillCheckCircle fill="#46720c" size={36} />}
            />
          </div>
        </div>
        <div className="section-3">
          <Table colorScheme="facebook">
            <Flex direction="column" bg="green.200"  textAlign="center"   align="center">
            <Thead> 
                
              <Tr>
                <Button bg="transparent"  > <RxThickArrowLeft size={24} /></Button>
             
                <Th>Plantonistas de 04/04/2023</Th>
                <Button  bg="transparent"><RxThickArrowRight size={24}/></Button>
              </Tr>
        <Flex align='center' justify="center" gap="8">
          <Tr>
              Vetérinarios
            </Tr>
            <Tr>
              Entrada
            </Tr>

            <Tr>
            Saída
            </Tr>
        
        </Flex>
          
            
            </Thead>
            <Tbody>
              <Tr>
                <Flex direction="row"  bg="green.100"  minWidth={290}>
                <Td  px="6">
                 Mariana
                </Td>
              <Td>
                18:00
              </Td>
              <Td>
               23:00
              </Td>
                </Flex>
              
              </Tr>
            </Tbody>
            </Flex>
          </Table>
        </div>
      </HomeContainer>
      </ChakraProvider>
    
  )
}
