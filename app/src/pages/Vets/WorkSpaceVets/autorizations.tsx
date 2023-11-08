import React, { useState, useEffect } from "react";
import { Button, Flex, Select } from "@chakra-ui/react";
import { api } from "../../../lib/axios";
import { toast } from "react-toastify";
import { LoadingSpinner } from "../../../components/Loading";
import { AutorizationsPdf } from "../../../components/ReactPdfComp/AutorizationPdf";

type AutorizationsProps = {
  id: number;
  name: string;
  text: string;
};

export function WorkVetAutorization() {
  const [autorizations, setAutorizations] = useState<AutorizationsProps[]>([]);
  const [filterAutorizationId, setFilterAutorizationId] = useState<
    number | null
  >(0);


  //function handleCreateAutorization() {
  //  setPdfRender(true);
  //}

   function handleCreateAutorization() {
    const selectedAutorization = autorizations.find(
      (a) => a.id === filterAutorizationId
    );

    if (selectedAutorization) {
      window.open(`/Autorizations/Pdf/${selectedAutorization.id}`, '_blank');
    }
  }

  async function getAllAutorizations() {
    try {
      const response = await api.get("/autorizations");
      setAutorizations(response.data);
    } catch (error) {
      toast.error("Falha ao buscar autorizações");
      console.log(error);
    }
  }

  useEffect(() => {
    getAllAutorizations();
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
            onChange={(ev) => setFilterAutorizationId(Number(ev.target.value))}
          >
            {autorizations ? (
              autorizations.map((autorization) => (
                <option key={autorization.id} value={autorization.id}>
                  {autorization.name}
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
