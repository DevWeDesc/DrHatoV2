import { NavLink } from "../NavLink"
import { useLocation, } from "react-router-dom"
import {
    Menu,
    MenuButton,
    MenuList,
    Text,
    Button
  } from '@chakra-ui/react'
  import { StyledBox } from "../Header/style"
  import { CiMenuBurger as Burger} from 'react-icons/all'

export function MenuBurger() {
    const location = useLocation();
    switch(location.pathname) {
      case '/AdminDashboard':
      case '/AdminDashboard':
      case '/Users':
      case '/Users':
      case '/Users/Create':
      case '/Users/Create':    
        return null;
      default:
        break;
    }
    return (
        <Menu >
        <MenuButton border="1px" as={Button} rightIcon={<Burger />}>
         
        </MenuButton>
        <MenuList>
           <NavLink direction="column"/>
        </MenuList>
        </Menu>
    )
}