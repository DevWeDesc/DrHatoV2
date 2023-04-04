import { Link } from "react-router-dom";
import { LinkContainer } from "./style";
import { FaHouseUser, FaDog } from "react-icons/all";
import {
  Text,
  Flex,

} from "@chakra-ui/react";

interface LinkContainerProps {
  direction: "column" | "row"
}

export function NavLink({ direction}: LinkContainerProps) {
  const userStorage = localStorage.getItem("userSession");
  const userIsAdmin = JSON.parse(userStorage as any);

  return (

      <Flex >
        <LinkContainer direction={direction}  >
          {userIsAdmin.isAdmin === true ? (
            <Link to="AdminDashboard">
              <FaHouseUser size={26} />
              <Text>Administração</Text>
            </Link>
          ) : (
            <Link to="/Home">
              <FaHouseUser size={26} />
              <Text>Medicamentos</Text>
            </Link>
          )}

          <Link to="/home">
            <FaDog size={26} color="" />
            <Text>Veterinários</Text>
          </Link>

          <Link to="/home">
            <FaHouseUser size={26} color="" />
            <Text>Laboratórios</Text>
          </Link>

          <Link to="/Home/Recepcao">
            <FaHouseUser size={26} color="" />
            <Text>Recepção</Text>
          </Link>
        </LinkContainer>
      </Flex>

  );
}
