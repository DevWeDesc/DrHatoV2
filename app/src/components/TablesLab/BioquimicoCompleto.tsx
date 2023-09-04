import {
  Table,
  Thead,
  Tbody,
  Tr,
  Td,
  TableContainer,
  Th,
  Textarea,
  FormControl,
  Button,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { FieldValues, SubmitHandler } from "react-hook-form/dist/types";
import { toast } from "react-toastify";
import { api } from "../../lib/axios";
import { Input } from "../admin/Input";


interface FullBioProps {
  ureia: string | number;
  creatinina: string | number;
  fosforo: string | number;
  calcio: string | number;
  fosfatasealcalina: string | number;
  alt: string | number;
  ast: string | number;
  ggt: string | number;
  proteinastotais: string | number;
  albumina: string | number;
  globulina: string | number;
  ralbuminaglobulina: string | number;
  frutosamina: string | number;
  bilirrubinatotal: string | number;
  bilirrubinadireta: string | number;
  bilirrubinaindireta: string | number;
  amilase: string | number;
  lipase: string | number;
  colesteroltotal: string | number;
  triglicerides: string | number;
  vldl: string | number;
  glicose: string | number;
  observacoes: string | number;
}

interface TableHemogramaProps {
  examId: any;
}
export function TableBioquimicoCompleto({examId}: TableHemogramaProps) {
  const { register, handleSubmit } = useForm();
  const handleSubmitFullBioExam: SubmitHandler<FullBioProps> = async (values) => {
        try {
          const json = {
            ureia: values.ureia,
            creatinina: values.creatinina,
            fosforo: values.fosforo,
            calcio: values.calcio,
            fosfatasealcalina: values.fosfatasealcalina,
            alt: values.alt,
            ast: values.ast,
            ggt: values.ggt,
            proteinastotais: values.proteinastotais,
            albumina: values.albumina,
            globulina: values.globulina,
            ralbuminaglobulina: values.ralbuminaglobulina,
            frutosamina: values.frutosamina,
            bilirrubinatotal: values.bilirrubinatotal,
            bilirrubinadireta: values.bilirrubinadireta,
            bilirrubinaindireta: values.bilirrubinaindireta,
            amilase: values.amilase,
            lipase: values.lipase,
            colsteroltotal: values.colesteroltotal,
            triglicerides: values.triglicerides,
            vldl: values.vldl,
            glicose: values.glicose,
            observacoes: values.observacoes

          }

          const fullData = {
            jsonData: json,
            tableName: "BioquimicoCompleto",
            hasTable: true
          }
          
      await api.post(`/labtableexam/${examId}`, fullData )
      toast.success("Exame laudado com sucesso!")
        } catch (error) {
          console.log(error)
        }
  }

  return (
      <TableContainer>
        <FormControl as="form" onSubmit={handleSubmit(handleSubmitFullBioExam as SubmitHandler<FieldValues>)}>
        <Table>
          <Thead>
            <Tr>
              <Th
                fontSize="15"
                border="1px solid black"
                bg="blue.400"
                color="white"
              >
                Bioquimica serica
              </Th>
              <Th fontSize="15" colSpan={2} border="1px solid black">
                Resultados
              </Th>
              <Th fontSize="15" colSpan={2} border="1px solid black">
                Unidades
              </Th>
              <Th fontSize="15" colSpan={2} border="1px solid black">
                @Val. Ref. - Canina
              </Th>
              <Th fontSize="15" colSpan={2} border="1px solid black">
                @Val. Ref. - Felina
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
              <Td border="1px solid black">Ureia</Td>
              <Td border="1px solid black" bg="white">
               <Input  {...register('ureia')} name="ureia" />
              </Td>
              <Td border="1px solid black" bg="white"></Td>
              <Td border="1px solid black" bg="white"></Td>
              <Td border="1px solid black" bg="white">
                mg/dl
              </Td>
              <Td border="1px solid black" bg="white">
                10 a 56
              </Td>
              <Td border="1px solid black" bg="white"></Td>
              <Td border="1px solid black" bg="white">
                10 a 65
              </Td>
              <Td border="1px solid black" bg="white"></Td>
            </Tr>
            <Tr fontWeight="bold">
              <Td border="1px solid black">Creatinina</Td>
              <Td border="1px solid black" bg="white">
                <Input {...register('creatinina')} name="creatinina" />
              </Td>
              <Td border="1px solid black" bg="white"></Td>
              <Td border="1px solid black" bg="white"></Td>
              <Td border="1px solid black" bg="white">
                mg/dl
              </Td>
              <Td border="1px solid black" bg="white">
                0,5 a 1,4
              </Td>
              <Td border="1px solid black" bg="white"></Td>
              <Td border="1px solid black" bg="white">
                0,5 a 1,6
              </Td>
              <Td border="1px solid black" bg="white"></Td>
            </Tr>
            <Tr fontWeight="bold">
              <Td border="1px solid black">Fósforo</Td>
              <Td border="1px solid black" bg="white">
               <Input {...register("fosforo")} name="fosforo" />
              </Td>
              <Td border="1px solid black" bg="white"></Td>
              <Td border="1px solid black" bg="white"></Td>
              <Td border="1px solid black" bg="white">
                mg/dl
              </Td>
              <Td border="1px solid black" bg="white">
                2,6 a 6,2
              </Td>
              <Td border="1px solid black" bg="white"></Td>
              <Td border="1px solid black" bg="white">
                2,7 a 8,1
              </Td>
              <Td border="1px solid black" bg="white"></Td>
            </Tr>
            <Tr fontWeight="bold">
              <Td border="1px solid black">Calcio</Td>
              <Td border="1px solid black" bg="white">
                <Input {...register("calcio")} name="calcio"/>
              </Td>
              <Td border="1px solid black" bg="white"></Td>
              <Td border="1px solid black" bg="white"></Td>
              <Td border="1px solid black" bg="white">
                mg/dl
              </Td>
              <Td border="1px solid black" bg="white">
                7,7 a 11,0
              </Td>
              <Td border="1px solid black" bg="white"></Td>
              <Td border="1px solid black" bg="white">
                7,4 a 10,5
              </Td>
              <Td border="1px solid black" bg="white"></Td>
            </Tr>
            <Tr fontWeight="bold">
              <Td border="1px solid black">Fosfatase alcalina</Td>
              <Td border="1px solid black" bg="white">
                <Input {...register('fosfatasealcalina')}  name="fosfatasealcalina"/>
              </Td>
              <Td border="1px solid black" bg="white"></Td>
              <Td border="1px solid black" bg="white"></Td>
              <Td border="1px solid black" bg="white">
                U/l
              </Td>
              <Td border="1px solid black" bg="white">
                20 a 156
              </Td>
              <Td border="1px solid black" bg="white"></Td>
              <Td border="1px solid black" bg="white">
                10 a 96
              </Td>
              <Td border="1px solid black" bg="white"></Td>
            </Tr>
            <Tr fontWeight="bold">
              <Td border="1px solid black">ALT</Td>
              <Td border="1px solid black" bg="white">
                <Input  {...register('alt')} name="alt"/>
              </Td>
              <Td border="1px solid black" bg="white"></Td>
              <Td border="1px solid black" bg="white"></Td>
              <Td border="1px solid black" bg="white">
                U/l
              </Td>
              <Td border="1px solid black" bg="white">
                10 a 88
              </Td>
              <Td border="1px solid black" bg="white"></Td>
              <Td border="1px solid black" bg="white">
                10 a 88
              </Td>
              <Td border="1px solid black" bg="white"></Td>
            </Tr>
            <Tr fontWeight="bold">
              <Td border="1px solid black">AST</Td>
              <Td border="1px solid black" bg="white">
              <Input  {...register('ast')} name="ast"/>
              </Td>
              <Td border="1px solid black" bg="white"></Td>
              <Td border="1px solid black" bg="white"></Td>
              <Td border="1px solid black" bg="white">
                U/l
              </Td>
              <Td border="1px solid black" bg="white">
                10 a 88
              </Td>
              <Td border="1px solid black" bg="white"></Td>
              <Td border="1px solid black" bg="white">
                10 a 88
              </Td>
              <Td border="1px solid black" bg="white"></Td>
            </Tr>
            <Tr fontWeight="bold">
              <Td border="1px solid black">GGT</Td>
              <Td border="1px solid black" bg="white">
              <Input  {...register('ggt')} name="ggt"/>
              </Td>
              <Td border="1px solid black" bg="white"></Td>
              <Td border="1px solid black" bg="white"></Td>
              <Td border="1px solid black" bg="white">
                U/l
              </Td>
              <Td border="1px solid black" bg="white">
                1,2 a 6,4
              </Td>
              <Td border="1px solid black" bg="white"></Td>
              <Td border="1px solid black" bg="white">
                1,3 a 5,3
              </Td>
              <Td border="1px solid black" bg="white"></Td>
            </Tr>
            <Tr fontWeight="bold">
              <Td border="1px solid black">Proteínas totais</Td>
              <Td border="1px solid black" bg="white">
              <Input  {...register('proteinastotais')} name="proteinastotais"/>
              </Td>
              <Td border="1px solid black" bg="white"></Td>
              <Td border="1px solid black" bg="white"></Td>
              <Td border="1px solid black" bg="white">
                g/dl
              </Td>
              <Td border="1px solid black" bg="white">
                5,2 a 8,2
              </Td>
              <Td border="1px solid black" bg="white"></Td>
              <Td border="1px solid black" bg="white">
                4,7 a 8,6
              </Td>
              <Td border="1px solid black" bg="white"></Td>
            </Tr>
            <Tr fontWeight="bold">
              <Td border="1px solid black">Albumina</Td>
              <Td border="1px solid black" bg="white">
              <Input  {...register('albumina')} name="albumina"/>
              </Td>
              <Td border="1px solid black" bg="white"></Td>
              <Td border="1px solid black" bg="white"></Td>
              <Td border="1px solid black" bg="white">
                g/dl
              </Td>
              <Td border="1px solid black" bg="white">
                2,6 a 3,8
              </Td>
              <Td border="1px solid black" bg="white"></Td>
              <Td border="1px solid black" bg="white">
                2,1 a 3,9
              </Td>
              <Td border="1px solid black" bg="white"></Td>
            </Tr>
            <Tr fontWeight="bold">
              <Td border="1px solid black">Globulina</Td>
              <Td border="1px solid black" bg="white">
              <Input  {...register('globulina')} name="globulina"/>
              </Td>
              <Td border="1px solid black" bg="white"></Td>
              <Td border="1px solid black" bg="white"></Td>
              <Td border="1px solid black" bg="white">
                g/dl
              </Td>
              <Td border="1px solid black" bg="white">
                2,6 a 4,4
              </Td>
              <Td border="1px solid black" bg="white"></Td>
              <Td border="1px solid black" bg="white">
                2,6 a 5,1
              </Td>
              <Td border="1px solid black" bg="white"></Td>
            </Tr>
            <Tr fontWeight="bold">
              <Td border="1px solid black">Relação Albumina:Globulina</Td>
              <Td border="1px solid black" bg="white">
              <Input  {...register('ralbuminaglobulina')} name="ralbuminaglobulina"/>
              </Td>
              <Td border="1px solid black" bg="white"></Td>
              <Td border="1px solid black" bg="white"></Td>
              <Td border="1px solid black" bg="white"></Td>
              <Td border="1px solid black" bg="white">
                0,5 a 1,3
              </Td>
              <Td border="1px solid black" bg="white"></Td>
              <Td border="1px solid black" bg="white">
                0,4 a 1,3
              </Td>
              <Td border="1px solid black" bg="white"></Td>
            </Tr>
            <Tr fontWeight="bold">
              <Td border="1px solid black">Frutosamina</Td>
              <Td border="1px solid black" bg="white">
              <Input  {...register('frutosamina')} name="frutosamina"/>
              </Td>
              <Td border="1px solid black" bg="white"></Td>
              <Td border="1px solid black" bg="white"></Td>
              <Td border="1px solid black" bg="white">
                µmol/l
              </Td>
              <Td border="1px solid black" bg="white">
                {"<"} 340
              </Td>
              <Td border="1px solid black" bg="white"></Td>
              <Td border="1px solid black" bg="white">
                {"<"} 340
              </Td>
              <Td border="1px solid black" bg="white"></Td>
            </Tr>
            <Tr fontWeight="bold">
              <Td border="1px solid black">Bilirrubina total</Td>
              <Td border="1px solid black" bg="white">
              <Input  {...register('bilirrubinatotal')} name="bilirrubinatotal"/>
              </Td>
              <Td border="1px solid black" bg="white"></Td>
              <Td border="1px solid black" bg="white"></Td>
              <Td border="1px solid black" bg="white">
                mg/dl
              </Td>
              <Td border="1px solid black" bg="white">
                0,07 a 0,8
              </Td>
              <Td border="1px solid black" bg="white"></Td>
              <Td border="1px solid black" bg="white">
                0,06 a 0,8
              </Td>
              <Td border="1px solid black" bg="white"></Td>
            </Tr>
            <Tr fontWeight="bold">
              <Td border="1px solid black">Bilirrubina direta</Td>
              <Td border="1px solid black" bg="white">
              <Input  {...register('bilirrubinadireta')} name="bilirrubinadireta"/>
              </Td>
              <Td border="1px solid black" bg="white"></Td>
              <Td border="1px solid black" bg="white"></Td>
              <Td border="1px solid black" bg="white">
                mg/dl
              </Td>
              <Td border="1px solid black" bg="white">
                0,06 a 0,3
              </Td>
              <Td border="1px solid black" bg="white"></Td>
              <Td border="1px solid black" bg="white">
                0,04 a 0,3
              </Td>
              <Td border="1px solid black" bg="white"></Td>
            </Tr>
            <Tr fontWeight="bold">
              <Td border="1px solid black">Bilirrubina indireta</Td>
              <Td border="1px solid black" bg="white">
              <Input  {...register('bilirrubinaindireta')} name="bilirrubinaindireta"/>
              </Td>
              <Td border="1px solid black" bg="white"></Td>
              <Td border="1px solid black" bg="white"></Td>
              <Td border="1px solid black" bg="white">
                mg/dl
              </Td>
              <Td border="1px solid black" bg="white">
                0,01 a 0,5
              </Td>
              <Td border="1px solid black" bg="white"></Td>
              <Td border="1px solid black" bg="white">
                0,02 a 0,5
              </Td>
              <Td border="1px solid black" bg="white"></Td>
            </Tr>
            <Tr fontWeight="bold">
              <Td border="1px solid black">Amilase</Td>
              <Td border="1px solid black" bg="white">
              <Input  {...register('amilase')} name="amilase"/>
              </Td>
              <Td border="1px solid black" bg="white"></Td>
              <Td border="1px solid black" bg="white"></Td>
              <Td border="1px solid black" bg="white">
                U/l
              </Td>
              <Td border="1px solid black" bg="white">
                300 a 1.530
              </Td>
              <Td border="1px solid black" bg="white"></Td>
              <Td border="1px solid black" bg="white">
                500 a 1.500
              </Td>
              <Td border="1px solid black" bg="white"></Td>
            </Tr>
            <Tr fontWeight="bold">
              <Td border="1px solid black">Lipase</Td>
              <Td border="1px solid black" bg="white">
              <Input  {...register('lipase')} name="lipase"/>
              </Td>
              <Td border="1px solid black" bg="white"></Td>
              <Td border="1px solid black" bg="white"></Td>
              <Td border="1px solid black" bg="white">
                U/l
              </Td>
              <Td border="1px solid black" bg="white">
                13 a 200
              </Td>
              <Td border="1px solid black" bg="white"></Td>
              <Td border="1px solid black" bg="white">
                0 a 83
              </Td>
              <Td border="1px solid black" bg="white"></Td>
            </Tr>
            <Tr fontWeight="bold">
              <Td border="1px solid black">Colesterol total</Td>
              <Td border="1px solid black" bg="white">
              <Input  {...register('colesteroltotal')} name="colesteroltotal"/>
              </Td>
              <Td border="1px solid black" bg="white"></Td>
              <Td border="1px solid black" bg="white"></Td>
              <Td border="1px solid black" bg="white">
                mg/dl
              </Td>
              <Td border="1px solid black" bg="white">
                100 a 270
              </Td>
              <Td border="1px solid black" bg="white"></Td>
              <Td border="1px solid black" bg="white">
                80 a 205
              </Td>
              <Td border="1px solid black" bg="white"></Td>
            </Tr>
            <Tr fontWeight="bold">
              <Td border="1px solid black">Triglicérides</Td>
              <Td border="1px solid black" bg="white">
              <Input  {...register('triglicerides')} name="triglicerides"/>
              </Td>
              <Td border="1px solid black" bg="white"></Td>
              <Td border="1px solid black" bg="white"></Td>
              <Td border="1px solid black" bg="white">
                mg/dl
              </Td>
              <Td border="1px solid black" bg="white">
                15 a 150
              </Td>
              <Td border="1px solid black" bg="white"></Td>
              <Td border="1px solid black" bg="white">
                10 a 128
              </Td>
              <Td border="1px solid black" bg="white"></Td>
            </Tr>
            <Tr fontWeight="bold">
              <Td border="1px solid black">VLDL</Td>
              <Td border="1px solid black" bg="white">
              <Input  {...register('vldl')} name="vldl"/>
              </Td>
              <Td border="1px solid black" bg="white"></Td>
              <Td border="1px solid black" bg="white"></Td>
              <Td border="1px solid black" bg="white">
                mg/dl
              </Td>
              <Td border="1px solid black" bg="white">
                ≤ 25
              </Td>
              <Td border="1px solid black" bg="white"></Td>
              <Td border="1px solid black" bg="white">
                ≤ 16
              </Td>
              <Td border="1px solid black" bg="white"></Td>
            </Tr>
            <Tr fontWeight="bold">
              <Td border="1px solid black">Glicose</Td>
              <Td border="1px solid black" bg="white">
              <Input  {...register('glicose')} name="glicose"/>
              </Td>
              <Td border="1px solid black" bg="white"></Td>
              <Td border="1px solid black" bg="white"></Td>
              <Td border="1px solid black" bg="white">
                mg/dl
              </Td>
              <Td border="1px solid black" bg="white">
                60 a 120
              </Td>
              <Td border="1px solid black" bg="white"></Td>
              <Td border="1px solid black" bg="white">
                75 a 140
              </Td>
              <Td border="1px solid black" bg="white"></Td>
            </Tr>

            <Tr fontWeight="bold">
              <Td border="1px solid black" borderRight="0">
                Observações
              </Td>
              <Td colSpan={8} p="0">
                <Textarea
                {...register('observacoes')}
                  name="observacoes"
                  bg="white"
                  rounded="0"
                  borderColor="black"
                 defaultValue=""
                />
              </Td>
            </Tr>
          </Tbody>
        </Table>
        <Button mt="4" w="100%" colorScheme="whatsapp" type="submit" >GRAVAR</Button>
        </FormControl>
      </TableContainer>
  );
}
