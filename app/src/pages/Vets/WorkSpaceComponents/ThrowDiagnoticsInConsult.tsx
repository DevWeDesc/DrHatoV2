import { Button, Flex, Grid, HStack, Text, Textarea } from "@chakra-ui/react";
import { useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { api } from "../../../lib/axios";

type DiagnosticProps = {
  symptoms: string;
  request: string;
  diagnostic: string;
};

export function ThrowDiagnoisticsInConsult() {
  const { id, queueId } = useParams<{ id: string; queueId: string }>();
  const queryClient = useQueryClient();

  const [viewDiagnosticHandler, setViewDiagnosticHandler] = useState("");
  async function getQueueDiagnostic(): Promise<DiagnosticProps> {
    const response = await api.get(`/queue/consult/diagnostic/${queueId}`);
    return response.data.diagnostic;
  }
  const { data } = useQuery("queueDiagnostics", {
    queryFn: getQueueDiagnostic,
  });
  const [diagnostic, setDiagnostic] = useState(data?.diagnostic);
  const [prescription, setPrescription] = useState(data?.request);
  const [sympthons, setSympthons] = useState(data?.symptoms);
  async function updateQueueDiagnostic() {
    try {
      const data = {
        diagnostic: diagnostic ? diagnostic : null,
        request: prescription ? prescription : null,
        symptoms: sympthons ? sympthons : null,
      };
      await api.patch(`/queue/consult/${queueId}`, data);
      queryClient.invalidateQueries({ queryKey: ["queueDiagnostics"] });
      toast.success("Adicionado a consulta com sucesso!");
    } catch (error) {
      toast.error("Falha ao atualizar informaçõe desta consulta");
    }
  }

  let ComponentPrint;
  switch (true) {
    case viewDiagnosticHandler == "Diagnóstico":
      ComponentPrint = (
        <Flex direction="column"p={2}>
          <Textarea
            minW="100%"
            minH="12.5rem"
            placeholder="Digite aqui o Diagnóstico"
            value={diagnostic}
            onChange={(e) => setDiagnostic(e.target.value)}
          />
          <Button onClick={() => updateQueueDiagnostic()} colorScheme="teal">
            Salvar alterações - Diagnóstico
          </Button>
        </Flex>
      );
      break;
    case viewDiagnosticHandler == "Prescrição":
      ComponentPrint = (
        <Flex direction="column" p={2}>
          <Textarea
            minW="100%"
            placeholder="Digite aqui a Prescrição"
            minH="12.5rem"
            value={prescription}
            onChange={(e) => setPrescription(e.target.value)}
          />
          <Button onClick={() => updateQueueDiagnostic()} colorScheme="teal">
            Salvar alterações - Prescrição
          </Button>
        </Flex>
      );

      break;
    case viewDiagnosticHandler == "Sintomas":
      ComponentPrint = (
        <Flex direction="column" p={2}>
          <Textarea
            minW="100%"
            placeholder="Digite aqui os Sintomas"
            minH="12.5rem"
            onChange={(e) => setSympthons(e.target.value)}
            value={sympthons}
          />
          <Button onClick={() => updateQueueDiagnostic()} colorScheme="teal">
            Salvar alterações - Sintomas
          </Button>
        </Flex>
      );

      break;
    case viewDiagnosticHandler == "Receituario":
      ComponentPrint = (
        <Textarea
          minW="100%"
          minH="12.5rem"
          defaultValue={sympthons}
          onChange={(e) => setSympthons(e.target.value)}
        />
      );

      break;
    default:
      ComponentPrint = (
        <Text fontWeight="bold" textAlign="center" fontSize={{ base: "sm" }}>
          Nenhuma informação a ser exibida!
        </Text>
      );
      break;
  }

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

      {ComponentPrint}
    </Flex>
  );
}
