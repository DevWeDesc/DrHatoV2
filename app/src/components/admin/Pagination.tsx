import { Box, Button, Stack } from "@chakra-ui/react";
import { useContext } from "react";
import { DbContext } from "../../contexts/DbContext";

export function Paginaton() {
  const { setPagination} = useContext(DbContext)

  const handlePagination = (numb: any) => {
    setPagination(numb)
  }
  return (
    <Stack 
    direction="row"
    mt="8"
    justify="space-between"
    align="center"
    spacing="6"
    >
      <Box>
        <strong>0</strong> - <strong>10</strong> de <strong>100</strong>
      </Box>
     <Stack direction="row" spacing="2">
     <Button size="sm" fontSize="xs"
      width="4"
      colorScheme="whatsapp"
      disabled
      _disabled={{
        bgColor:'green.200',
        cursos: 'default'
      }}
      onClick={() => handlePagination(1)}
      >
        1
      </Button>
      <Button size="sm" fontSize="xs"
      width="4"
      colorScheme="whatsapp"
      bgColor="gray.700"
      _hover={{
        bg: 'gray.500'
      }}
      onClick={() => handlePagination(2)}
      >
        2
      </Button>
      <Button size="sm" fontSize="xs"
      width="4"
      colorScheme="whatsapp"
      bgColor="gray.700"
      _hover={{
        bg: 'gray.500'
      }}
      onClick={() => handlePagination(3)}
      >
        3
      </Button>
      <Button size="sm" fontSize="xs"
      width="4"
      colorScheme="whatsapp"
      bgColor="gray.700"
      _hover={{
        bg: 'gray.500'
      }}
      onClick={() => handlePagination(4)}
      >
        4
      </Button>
     </Stack>
    </Stack>
  )
}