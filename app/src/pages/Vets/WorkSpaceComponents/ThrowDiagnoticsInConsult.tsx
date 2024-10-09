import { Button, Flex, Grid, Textarea } from "@chakra-ui/react";
import { Dispatch, SetStateAction, useState } from "react";

interface ThrowDiagnoisticsInConsultProps {
  symptoms?: string;
  setSymptoms: Dispatch<SetStateAction<string | undefined>>;
  diagnostic?: string;
  setDiagnostic: Dispatch<SetStateAction<string | undefined>>;
  prescription?: string;
  setPrescription: Dispatch<SetStateAction<string | undefined>>;
}

export function ThrowDiagnoisticsInConsult({
  symptoms,
  setSymptoms,
  diagnostic,
  setDiagnostic,
  prescription,
  setPrescription,
}: ThrowDiagnoisticsInConsultProps) {

  const [viewDiagnosticHandler, setViewDiagnosticHandler] = useState("Sintomas");

  return (
    <Flex direction="column" gap={2} w="100%">
      <Grid width="100%" templateColumns="repeat(3, 1fr)" gap={2} px={2}>
        <Button
          w="100%"
          colorScheme="whatsapp"
          onClick={() => setViewDiagnosticHandler("Diagnóstico")}
          _focus={{
            bgColor: "green.700",
            border: "2px solid black",
          }}
          fontSize={{ base: "sm" }}
        >
          Diagnóstico
        </Button>
        <Button
          w="100%"
          colorScheme="whatsapp"
          onClick={() => setViewDiagnosticHandler("Prescrição")}
          _focus={{
            bgColor: "green.700",
            border: "2px solid black",
          }}
          fontSize={{ base: "sm" }}
        >
          Prescrição
        </Button>
        <Button
          w="100%"
          colorScheme="whatsapp"
          onClick={() => setViewDiagnosticHandler("Sintomas")}
          _focus={{
            bgColor: "green.700",
            border: "2px solid black",
          }}
          fontSize={{ base: "sm" }}
        >
          Sintomas
        </Button>
      </Grid>

      <Flex direction="column" p={2}>
        {viewDiagnosticHandler == "Diagnóstico" && (
          <Textarea
            minW="100%"
            minH="12.5rem"
            placeholder="Digite aqui o Diagnóstico"
            value={diagnostic}
            onChange={(e) => setDiagnostic(e.target.value)}
            resize={"none"}
            overflowY={"scroll"}
          />
        )}
        {viewDiagnosticHandler == "Prescrição" && (
          <Textarea
            minW="100%"
            placeholder="Digite aqui a Prescrição"
            minH="12.5rem"
            value={prescription}
            onChange={(e) => setPrescription(e.target.value)}
            resize={"none"}
            overflowY={"scroll"}
          />
        )}
        {viewDiagnosticHandler == "Sintomas" && (
          <Textarea
            minW="100%"
            placeholder="Digite aqui os Sintomas"
            minH="12.5rem"
            onChange={(e) => setSymptoms(e.target.value)}
            value={symptoms}
            resize={"none"}
            overflowY={"scroll"}
          />
        )}
      </Flex>
    </Flex>
  );
}
