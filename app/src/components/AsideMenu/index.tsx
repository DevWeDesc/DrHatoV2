import {
  AccordionIcon,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Box,
  Flex
} from '@chakra-ui/react'
import {
  BsHouseDoorFill,
  FaHospitalUser,
  GiHealthNormal,
  IoFlask,
  MdAdminPanelSettings
} from 'react-icons/all'

import { Link } from 'react-router-dom'

export function AsideMenu() {
  const userPermissions = JSON.parse(localStorage.getItem('userSession') as any)
  let asideMenu
  switch (true) {
    case userPermissions.userType.includes('admin'):
      asideMenu = (
        <>
          <Accordion defaultIndex={[0]} allowMultiple>
            <AccordionItem>
              <h2 className="acordionTitle">
                <AccordionButton
                  gap="1rem"
                  _expanded={{ bg: '#F6F9FF', color: 'black' }}
                >
                  <MdAdminPanelSettings fill="#8eda7c" size={26} />
                  <Box as="span" flex="1" textAlign="left">
                    Administração
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <Flex gap="2" className="submenus">
                  <Link to="/Admin">ADMINISTRAÇÃO GERAL</Link>
                  <Link to="/Users">USUÁRIOS</Link>
                  <Link to="/Admin/Charts">DASHBOARD</Link>
                </Flex>
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
                <Flex gap="2" className="submenus">
                  <Link to="/Recepcao">RECEPÇÃO GERAL</Link>
                  <Link to="/Recepcao/Consultas">CONSULTA DE DE CLIENTES</Link>
                  <Link to="/Recepcao/Create">CADASTRO DE CLIENTES</Link>
                </Flex>
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
                  <Link to="/Vets/Menu">VETERINÁRIOS GERAL</Link>
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
                      <Link to="/Labs">LABORATÓRIOS GERAL</Link>
                    </li>
                  </ul>
                </div>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </>
      )
      break

    case userPermissions.userType.includes('vet'):
      asideMenu = (
        <>
          <Accordion defaultIndex={[0]} allowMultiple>
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
                  <Link to="/Vets/Menu">VETERINÁRIOS GERAL</Link>
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
                      <Link to="/Labs">LABORATÓRIOS GERAL</Link>
                    </li>
                  </ul>
                </div>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </>
      )
      break

    case userPermissions.userType.includes('user'):
      asideMenu = (
        <>
          <Accordion defaultIndex={[0]} allowMultiple>
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
                <Flex gap="2" className="submenus">
                  <Link to="/Recepcao">RECEPÇÃO GERAL</Link>
                  <Link to="/Recepcao/Consultas">CONSULTA DE DE CLIENTES</Link>
                  <Link to="/Recepcao/Create">CADASTRO DE CLIENTES</Link>
                </Flex>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </>
      )
      break

    default:
      asideMenu = (
        <>
          <Accordion defaultIndex={[0]} allowMultiple>
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
                <Flex gap="2" className="submenus">
                  <Link to="/Recepcao">RECEPÇÃO GERAL</Link>
                  <Link to="/Recepcao/Consultas">CONSULTA DE DE CLIENTES</Link>
                  <Link to="/Recepcao/Create">CADASTRO DE CLIENTES</Link>
                </Flex>
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
                  <Link to="/Vets/Menu">VETERINÁRIOS GERAL</Link>
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
                      <Link to="/Labs">LABORATÓRIOS GERAL</Link>
                    </li>
                  </ul>
                </div>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </>
      )
      break
  }
  return <>{asideMenu}</>
}
