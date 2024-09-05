import { useForm } from "react-hook-form";
import axios from "axios";
import { Button, Flex, FormControl, FormLabel, Text } from "@chakra-ui/react";
import { MdOutlineCloudUpload } from "react-icons/md";
import { Input } from "../admin/Input";
import { api } from "../../lib/axios";
import { toast } from "react-toastify";

interface FileUploadProps {
  examId: string;
}

const FileUpload = ({ examId }: FileUploadProps) => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data: any) => {
    const formData = new FormData();

    // Adicionar cada arquivo selecionado ao FormData
    for (const file of data.files) {
      formData.append("files", file);
    }

    try {
      await api.put(`/labimport/${examId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Arquivos enviados com sucesso!");
      reset(); // Limpar o formulário após o envio
    } catch (error) {
      console.error("Erro ao enviar os arquivos:", error);
    }
  };

  return (
    <Flex
      height="auto"
      width={300}
      align="center"
      justify="center"
      direction="column"
    >
      <Text mb={3} fontWeight="bold">
        LAUDAR COM PDF
      </Text>
      <FormControl
        w="100%"
        h="100%"
        as="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <FormLabel
          boxShadow="0px 2px 10px rgba(92, 89, 89, 0.35)"
          border="2px"
          borderStyle={"dashed"}
          borderColor={"gray.400"}
          rounded="8"
          w="100%"
          py={4}
          htmlFor="files"
        >
          <Flex align="center" flexDirection={"column"} justify="center" gap="2" w="100%">
            <MdOutlineCloudUpload color="gray" size={48} />
            <Text fontSize="sm" fontWeight={"bold"}>UPLOAD DE PDF</Text>
            <Text fontSize="sm">Clique aqui para adicionar o laudo em PDF</Text>
          </Flex>
        </FormLabel>

        <Input
          hidden
          id="files"
          type="file"
          {...register("files")}
          name="files"
          multiple
        />

        <Button fontSize="sm" w="100%" colorScheme="linkedin" type="submit">
          Enviar PDF
        </Button>
      </FormControl>
    </Flex>
  );
};

export default FileUpload;
