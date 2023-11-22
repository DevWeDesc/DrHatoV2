import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { PetProps } from "../../Pets/details";
import { Button, Flex, Select } from "@chakra-ui/react";
import { api } from "../../../lib/axios";
import { toast } from "react-toastify";
import { LoadingSpinner } from "../../../components/Loading";
import { AutorizationsPdf } from "../../../components/ReactPdfComp/AutorizationPdf";


type InstructionsProps = {
  id: number;
  name: string;
  description: string;
};


export function VetInstructions() {
  const [pet, setPet] = useState({} as PetProps);
  const [instructions, setInstructions] = useState<InstructionsProps[]>([]);
  const [filterInstructionId, setfilterInstructionId] = useState<
    number | null
  >(0);

  function handleCreateAutorization() {
    const selectedAutorization = instructions.find(
      (a) => a.id === filterInstructionId
    );

    if (selectedAutorization) {
      window.open(`/Instructions/Pdf/${selectedAutorization.id}`, '_blank');
    }
  }

  async function getAllInstructions() {
    try {
      const response = await api.get("/instructions");
      setInstructions(response.data);
    } catch (error) {
      toast.error("Falha ao buscar autorizações");
      console.log(error);
    }
  }

  useEffect(() => {
    getAllInstructions();
  }, []);

  return (

    <Flex
    direction="column"
    justify="space-between"
    align="center"
    gap="8"
    h={200}
  >
    <Select
      border="2px"
      bgColor="gray.100"
      borderColor="black"
      placeholder="Selecione a Autorização"
      onChange={(ev) => setfilterInstructionId(Number(ev.target.value))}
    >
      {instructions ? (
        instructions.map((instructions) => (
          <option key={instructions.id} value={instructions.id}>
            {instructions.name}
          </option>
        ))
      ) : (
        <LoadingSpinner />
      )}
    </Select>
    <Button
      onClick={() => handleCreateAutorization()}
      width="100%"
      colorScheme="linkedin"
    >
      IMPRIMIR
    </Button>
  </Flex>

  );
}
