import {
  Table,
  Thead,
  Tbody,
  Tr,
  Td,
  TableContainer,
  Th,
  Textarea,
  Button,
  FormControl,
} from "@chakra-ui/react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { api } from "../../lib/axios";
import { Input } from "../admin/Input";
interface FelineBlodCount {
  hemaciasabs: string | number;
  hemoglobinaabs: string | number;
  hematocritoabs: string | number;
  vcmabs: string | number;
  hcmabs: string | number;
  chcmabs: string | number;
  proteinasabs: string | number;
  eritroabs: string | number;
  obseritograma: string | number;
  leucocitoabs: string | number;
  leucocitorel: string | number;
  metamielocitoabs: string | number;
  metamielocitorel: string | number;
  bastonetestabs: string | number;
  bastonetestorel: string | number;
  segmentadosabs: string | number;
  segmentadosrel: string | number;
  eosinofilosabs: string | number;
  eosinofilosrel: string | number;
  basofilosabs: string | number;
  basofilosrel: string | number;
  linfocitostipicosabs: string | number;
  linfocitostipicosrel: string | number;
  linfocitosatipicosabs: string | number;
  linfocitosatipicosrel: string | number;
  monocitosbs: string | number;
  monocitosrel: string | number;
  obsleucograma: string | number;
}

interface TableHemogramaProps {
  examId: any;
}
export function HemogramaCaninoAdulto({examId}: TableHemogramaProps) {
  const { register, handleSubmit } = useForm();
  const handleReportHemogramFeline: SubmitHandler<FelineBlodCount> = async (
    values
  ) => {
    const data = {
      hemaciasabs: values.hemaciasabs,
      hemoglobinaabs: values.hemoglobinaabs,
      hematocritoabs: values.hematocritoabs,
      vcmabs: values.vcmabs,
      hcmabs: values.hcmabs,
      chcmabs: values.chcmabs,
      proteinasabs: values.proteinasabs,
      eritroblastosabs: values.eritroabs,
      obseritograma: values.obseritograma,
      leucocitoabs: values.leucocitoabs,
      leucocitorel: values.leucocitorel,
      metamielocitoabs: values.metamielocitoabs,
      metamielocitorel: values.metamielocitorel,
      bastonetestabs: values.bastonetestabs,
      bastonetestorel: values.bastonetestorel,
      segmentadosabs: values.segmentadosabs,
      segmentadosrel: values.segmentadosrel,
      eosinofilosabs: values.eosinofilosabs,
      eosinofilosrel: values.eosinofilosrel,
      basofiloabs: values.basofilosabs,
      basofilorel: values.basofilosrel,
      linfocitostipicosabs: values.linfocitostipicosabs,
      linfocitostipicosrel: values.linfocitostipicosrel,
      linfocitosatipicosabs: values.linfocitosatipicosabs,
      linfocitosatipicosrel: values.linfocitosatipicosrel,
      monocitosbs: values.monocitosbs,
      monocitosrel: values.monocitosrel,
      obsleucograma: values.obsleucograma,
    };
    
    try {
      console.log(data)
      await api.post(`/labtableexam/${examId}`, data )
      toast.success("Exame laudado com sucesso!")
    } catch (error) {
      toast.error("Falha ao laudar!")
      console.log(error)
    }

  };
  return (
    <>
    <FormControl as="form" onSubmit={handleSubmit(handleReportHemogramFeline as SubmitHandler<FieldValues>)}>
      <TableContainer >
        <Table >
          <Thead>
            <Tr>
              <Th
                fontSize="15"
                border="1px solid black"
                bg="blue.400"
                color="white"
              >
                Eritrograma
              </Th>
              <Th fontSize="15" colSpan={2} border="1px solid black">
                Resultados
              </Th>
              <Th fontSize="15" colSpan={2} border="1px solid black">
                Unidades
              </Th>
              <Th fontSize="15" colSpan={2} border="1px solid black">
                Até 6 meses
              </Th>
              <Th fontSize="15" colSpan={2} border="1px solid black">
                Acima de 7 meses
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr fontWeight="bold">
              <Td border="1px solid black">Característica</Td>
              <Td border="1px solid black">Absoluto</Td>
              <Td border="1px solid black">Relativo</Td>
              <Td border="1px solid black">Un. Abs.</Td>
              <Td border="1px solid black">Un. Rel.</Td>
              <Td border="1px solid black">Absoluto</Td>
              <Td border="1px solid black">Relativo</Td>
              <Td border="1px solid black">Absoluto</Td>
              <Td border="1px solid black">Relativo</Td>
            </Tr>
            <Tr fontWeight="bold">
              <Td border="1px solid black">Hemácias</Td>
              <Td border="1px solid black" bg="white">
                <Input  {...register('hemaciasabs')}  name="hemaciasabs"/>
              </Td>
              <Td border="1px solid black" bg="gray.400"></Td>
              <Td border="1px solid black" bg="white"></Td>
              <Td border="1px solid black" bg="white">
                milhões/mm3
              </Td>
              <Td border="1px solid black" bg="white">
                3,5 a 8,0
              </Td>
              <Td border="1px solid black" bg="white"></Td>
              <Td border="1px solid black" bg="white">
                5,0 a 10,0
              </Td>
              <Td border="1px solid black" bg="white"></Td>
            </Tr>
            <Tr fontWeight="bold">
              <Td border="1px solid black">Hemoglobina</Td>
              <Td border="1px solid black" bg="white">
                  <Input {...register("hemoglobinaabs")} name="hemoglobinaabs" />
              </Td>
              <Td border="1px solid black" bg="gray.400"></Td>
              <Td border="1px solid black" bg="white"></Td>
              <Td border="1px solid black" bg="white">
                g/dl
              </Td>
              <Td border="1px solid black" bg="white">
                7,0 a 14,0
              </Td>
              <Td border="1px solid black" bg="white"></Td>
              <Td border="1px solid black" bg="white">
                8,0 a 15,0
              </Td>
              <Td border="1px solid black" bg="white"></Td>
            </Tr>
            <Tr fontWeight="bold">
              <Td border="1px solid black">Hematócrito</Td>
              <Td border="1px solid black" bg="white">
               <Input  {...register('hematocritoabs')} name="hematocritoabs" />
              </Td>
              <Td border="1px solid black" bg="gray.400"></Td>
              <Td border="1px solid black" bg="white"></Td>
              <Td border="1px solid black" bg="white">
                %
              </Td>
              <Td border="1px solid black" bg="white">
                22 a 38
              </Td>
              <Td border="1px solid black" bg="white"></Td>
              <Td border="1px solid black" bg="white">
                24 a 45
              </Td>
              <Td border="1px solid black" bg="white"></Td>
            </Tr>
            <Tr fontWeight="bold">
              <Td border="1px solid black">V.C.M.</Td>
              <Td border="1px solid black" bg="white">
                <Input {...register('vcmabs')} name="vcmabs" />
              </Td>
              <Td border="1px solid black" bg="gray.400"></Td>
              <Td border="1px solid black" bg="white"></Td>
              <Td border="1px solid black" bg="white">
                u3
              </Td>
              <Td border="1px solid black" bg="white">
                40 a 55
              </Td>
              <Td border="1px solid black" bg="white"></Td>
              <Td border="1px solid black" bg="white">
                39 a 55
              </Td>
              <Td border="1px solid black" bg="white"></Td>
            </Tr>
            <Tr fontWeight="bold">
              <Td border="1px solid black">H.C.M.</Td>
              <Td border="1px solid black" bg="white">
                <Input {...register('hcmabs')} name="hcmabs" />
              </Td>
              <Td border="1px solid black" bg="gray.400"></Td>
              <Td border="1px solid black" bg="white"></Td>
              <Td border="1px solid black" bg="white">
                Uug
              </Td>
              <Td border="1px solid black" bg="white">
                13 a 17
              </Td>
              <Td border="1px solid black" bg="white"></Td>
              <Td border="1px solid black" bg="white">
                2,5 a 17,5
              </Td>
              <Td border="1px solid black" bg="white"></Td>
            </Tr>
            <Tr fontWeight="bold">
              <Td border="1px solid black">C.H.C.M.</Td>
              <Td border="1px solid black" bg="white">
                <Input {...register('chcmabs')} name="chcmabs" />
              </Td>
              <Td border="1px solid black" bg="gray.400"></Td>
              <Td border="1px solid black" bg="white"></Td>
              <Td border="1px solid black" bg="white">
                %
              </Td>
              <Td border="1px solid black" bg="white">
                31 a 35
              </Td>
              <Td border="1px solid black" bg="white"></Td>
              <Td border="1px solid black" bg="white">
                30 a 36
              </Td>
              <Td border="1px solid black" bg="white"></Td>
            </Tr>
            <Tr fontWeight="bold">
              <Td border="1px solid black">Proteínas totais</Td>
              <Td border="1px solid black" bg="white">
                <Input  {...register('proteinasabs')} name="proteinasabs" />
              </Td>
              <Td border="1px solid black" bg="gray.400"></Td>
              <Td border="1px solid black" bg="white"></Td>
              <Td border="1px solid black" bg="white">
                g/dl
              </Td>
              <Td border="1px solid black" bg="white">
                4,5 a 7,8
              </Td>
              <Td border="1px solid black" bg="white"></Td>
              <Td border="1px solid black" bg="white">
                6,0 a 8,0
              </Td>
              <Td border="1px solid black" bg="white"></Td>
            </Tr>
            <Tr fontWeight="bold">
              <Td border="1px solid black">Eritroblastos</Td>
              <Td border="1px solid black" bg="white">
               <Input {...register('eritroabs')} name="eritroabs" />
              </Td>
              <Td border="1px solid black" bg="gray.400"></Td>
              <Td border="1px solid black" bg="white"></Td>
              <Td border="1px solid black" bg="white">
                100%
              </Td>
              <Td border="1px solid black" bg="white">
                Até 1%
              </Td>
              <Td border="1px solid black" bg="white"></Td>
              <Td border="1px solid black" bg="white">
                Até 1%
              </Td>
              <Td border="1px solid black" bg="white"></Td>
            </Tr>
            <Tr fontWeight="bold">
              <Td border="1px solid black" borderRight="0">
                Observações
              </Td>
              <Td colSpan={8} p="0">
                <Textarea
                  bg="white"
                  {...register('obseritograma')}
                  name="obseritograma"
                  rounded="0"
                  borderColor="black"
                  defaultValue=""
                />
              </Td>
            </Tr>
          </Tbody>
        </Table>
        <Table>
          <Thead>
            <Tr>
              <Th
                fontSize="15"
                border="1px solid black"
                bg="blue.400"
                color="white"
              >
                Leucograma
              </Th>
              <Th fontSize="15" colSpan={2} border="1px solid black">
                Resultados
              </Th>
              <Th fontSize="15" colSpan={2} border="1px solid black">
                Unidades
              </Th>
              <Th fontSize="15" colSpan={2} border="1px solid black">
                Até 6 meses
              </Th>
              <Th fontSize="15" colSpan={2} border="1px solid black">
                Acima de 7 meses
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr fontWeight="bold">
              <Td border="1px solid black">Característica</Td>
              <Td border="1px solid black">Absoluto</Td>
              <Td border="1px solid black">Relativo</Td>
              <Td border="1px solid black">Un. Abs.</Td>
              <Td border="1px solid black">Un. Rel.</Td>
              <Td border="1px solid black">Absoluto</Td>
              <Td border="1px solid black">Relativo</Td>
              <Td border="1px solid black">Absoluto</Td>
              <Td border="1px solid black">Relativo</Td>
            </Tr>
            <Tr fontWeight="bold">
              <Td border="1px solid black">Leucócitos Totais</Td>
              <Td border="1px solid black" bg="white">
                <Input {...register('leucocitoabs')} name="leucocitoabs" />
              </Td>
              <Td border="1px solid black" bg="white">
              <Input {...register('leucocitorel')} name="leucocitorel" />
              </Td>
              <Td border="1px solid black" bg="white"></Td>
              <Td border="1px solid black" bg="white">
                %
              </Td>
              <Td border="1px solid black" bg="white">
                6.000 a 17.000
              </Td>
              <Td border="1px solid black" bg="white"></Td>
              <Td border="1px solid black" bg="white">
                5.500 a 19.500
              </Td>
              <Td border="1px solid black" bg="white"></Td>
            </Tr>
            <Tr fontWeight="bold">
              <Td border="1px solid black">Metamielócitos</Td>
              <Td border="1px solid black" bg="white">
                  <Input {...register('metamielocitoabs')} name="metamielocitoabs" />
              </Td>
              <Td border="1px solid black" bg="white">
              <Input {...register('metamielocitorel')} name="metamielocitorel" />
              </Td>
              <Td border="1px solid black" bg="white"></Td>
              <Td border="1px solid black" bg="white">
                %
              </Td>
              <Td border="1px solid black" bg="white">
                0
              </Td>
              <Td border="1px solid black" bg="white">
                0
              </Td>
              <Td border="1px solid black" bg="white">
                0
              </Td>
              <Td border="1px solid black" bg="white">
                0
              </Td>
            </Tr>
            <Tr fontWeight="bold">
              <Td border="1px solid black">Bastonetes</Td>
              <Td border="1px solid black" bg="white">
              <Input {...register('bastonetestabs')} name="bastonetestabs" />
              </Td>
              <Td border="1px solid black" bg="white">
              <Input {...register('bastonetestorel')} name="bastonetestorel" />
              </Td>
              <Td border="1px solid black" bg="white"></Td>
              <Td border="1px solid black" bg="white">
                %
              </Td>
              <Td border="1px solid black" bg="white">
                0 a 170
              </Td>
              <Td border="1px solid black" bg="white">
                0 a 1
              </Td>
              <Td border="1px solid black" bg="white">
                0 a 585
              </Td>
              <Td border="1px solid black" bg="white">
                0 a 3
              </Td>
            </Tr>
            <Tr fontWeight="bold">
              <Td border="1px solid black">Segmentados</Td>
              <Td border="1px solid black" bg="white">
               <Input {...register('segmentadosabs')} name="segmentadosabs" />
              </Td>
              <Td border="1px solid black" bg="white">
              <Input {...register('segmentadosrel')} name="segmentadosrel" />
              </Td>
              <Td border="1px solid black" bg="white"></Td>
              <Td border="1px solid black" bg="white">
                %
              </Td>
              <Td border="1px solid black" bg="white">
                2.400 a 12.750
              </Td>
              <Td border="1px solid black" bg="white">
                46 a 75
              </Td>
              <Td border="1px solid black" bg="white">
                1.925 a 14.625
              </Td>
              <Td border="1px solid black" bg="white">
                35 a 75
              </Td>
            </Tr>
            <Tr fontWeight="bold">
              <Td border="1px solid black">Eosinófilos</Td>
              <Td border="1px solid black" bg="white">
                <Input {...register('eosinofilosabs')} name="eosinofilosabs" /> 
              </Td>
              <Td border="1px solid black" bg="white">
              <Input {...register('eosinofilosrel')} name="eosinofilosrel" /> 
              </Td>
              <Td border="1px solid black" bg="white"></Td>
              <Td border="1px solid black" bg="white">
                %
              </Td>
              <Td border="1px solid black" bg="white">
                60 a 1.700
              </Td>
              <Td border="1px solid black" bg="white">
                1 a 10
              </Td>
              <Td border="1px solid black" bg="white">
                110 a 2.340
              </Td>
              <Td border="1px solid black" bg="white">
                2 a 12
              </Td>
            </Tr>
            <Tr fontWeight="bold">
              <Td border="1px solid black">Basófilos</Td>
              <Td border="1px solid black" bg="white">
                <Input {...register('basofilosabs')} name="basofilosabs" />
              </Td>
              <Td border="1px solid black" bg="white">
              <Input {...register('basofilosrel')} name="basofilosrel" />
              </Td>
              <Td border="1px solid black" bg="white"></Td>
              <Td border="1px solid black" bg="white">
                %
              </Td>
              <Td border="1px solid black" bg="white">
                0 a 170
              </Td>
              <Td border="1px solid black" bg="white">
                0 a 1
              </Td>
              <Td border="1px solid black" bg="white">
                0 a 195
              </Td>
              <Td border="1px solid black" bg="white">
                0 a 1
              </Td>
            </Tr>
            <Tr fontWeight="bold">
              <Td border="1px solid black">Linfócitos Tipicos</Td>
              <Td border="1px solid black" bg="white">
                <Input {...register('linfocitostipicosabs')} name="linfocitostipicosabs" />
              </Td>
              <Td border="1px solid black" bg="white">
              <Input  {...register('linfocitostipicosrel')} name="linfocitostipicosrel" />
              </Td>
              <Td border="1px solid black" bg="white"></Td>
              <Td border="1px solid black" bg="white">
                %
              </Td>
              <Td border="1px solid black" bg="white">
                1.200 a 8.500{" "}
              </Td>
              <Td border="1px solid black" bg="white">
                20 a 50{" "}
              </Td>
              <Td border="1px solid black" bg="white">
                1.100 a 10.725
              </Td>
              <Td border="1px solid black" bg="white">
                20 a 55
              </Td>
            </Tr>
            <Tr fontWeight="bold">
              <Td border="1px solid black">Linfócitos Atípicos</Td>
              <Td border="1px solid black" bg="white">
              <Input {...register('linfocitosatipicosabs')} name="linfocitosatipicosabs" />
              </Td>
              <Td border="1px solid black" bg="white">
              <Input {...register('linfocitosatipicosrel')} name="linfocitosatipicosrel" />
              </Td>
              <Td border="1px solid black" bg="white"></Td>
              <Td border="1px solid black" bg="white">
                %
              </Td>
              <Td border="1px solid black" bg="white">
                0
              </Td>
              <Td border="1px solid black" bg="white">
                0
              </Td>
              <Td border="1px solid black" bg="white">
                0
              </Td>
              <Td border="1px solid black" bg="white">
                0
              </Td>
            </Tr>
            <Tr fontWeight="bold">
              <Td border="1px solid black">Monócitos</Td>
              <Td border="1px solid black" bg="white">
               <Input {...register('monocitosbs')} name="monocitosbs" />
              </Td>
              <Td border="1px solid black" bg="white">
              <Input {...register('monocitosrel')} name="monocitosrel" />
              </Td>
              <Td border="1px solid black" bg="white"></Td>
              <Td border="1px solid black" bg="white">
                %
              </Td>
              <Td border="1px solid black" bg="white">
                60 a 680
              </Td>
              <Td border="1px solid black" bg="white">
                1 a 4
              </Td>
              <Td border="1px solid black" bg="white">
                55 a 780
              </Td>
              <Td border="1px solid black" bg="white">
                1 a 4
              </Td>
            </Tr>
            <Tr fontWeight="bold">
              <Td border="1px solid black" borderRight="0">
                Observações
              </Td>
              <Td colSpan={8} p="0">
                <Textarea
                  bg="white"
                  rounded="0"
                  {...register('obsleucograma')}
                  name="obsleucograma"
                  borderColor="black"
                  h="7rem"
                  defaultValue=""
                />
              </Td>
            </Tr>
          </Tbody>
        </Table>
    
      </TableContainer>
      <Button w="100%" mt="4" type="submit" colorScheme="whatsapp" >GRAVAR</Button>
      </FormControl>
    </>
  );
}
