import { Button, Flex, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

type CardMedicineRecordProps = {
  title: string;
  content: string;
  redirect: string;
  textButton: string;
};

export const CardMedicineRecord = ({
  title,
  content,
  redirect,
  textButton,
}: CardMedicineRecordProps) => {
  const navigate = useNavigate();
  const colorButton =
    textButton == "Histórico Antigo" ? "gray.600" : "blue.600";

  return (
    <Flex
      maxW="250px"
      gap="22px"
      direction="column"
      justifyContent="center"
      alignItems="center"
      p="20px"
      boxShadow="2xl"
    >
      <Text fontSize="22px" fontWeight="bold" textAlign="center">
        {title}
      </Text>
      <Text textAlign="center">{content}</Text>
      <Button
        bgColor={colorButton}
        textColor="white"
        onClick={() => navigate(`${redirect}`)}
      >
        {textButton}
      </Button>
    </Flex>
  );
};
