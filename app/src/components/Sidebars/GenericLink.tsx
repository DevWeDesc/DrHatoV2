import { Box, Text, Icon } from "@chakra-ui/react";
import { Link } from "react-router-dom";
interface GenericLinkProps {
  path?: any;
  icon?: any;
  name?: string
}
export function GenericLink({ path, icon, name }: GenericLinkProps) {
  return (
    <Link to={path}>
      <Box display="flex" alignItems="center" color="green.300">
        <Icon as={icon} fontSize="20" />
        <Text ml="4" fontWeight="medium" color="gray.700">
         {name}
        </Text>
      </Box>
    </Link>
  );
}
