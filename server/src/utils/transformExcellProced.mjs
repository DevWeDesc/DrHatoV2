import XLSX from 'xlsx';
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const arquivoExcel = './src/databases/Procedimentos.xlsx';
const workbook = XLSX.readFile(arquivoExcel);
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];
const data = XLSX.utils.sheet_to_json(worksheet, { raw: true, skipEmptyLines: true});


const filteredData = data.map(procedure => ({
    codProcedimento    :   procedure.CodProcedimento,
    name               :   procedure.NomeProcedimento,
    price              :   procedure.Preço1,
    priceTwo           :   procedure.Preço2,
    priceThree         :   procedure.Preço3,
    priceFour          :   procedure.Preço4,
    categoryOld        :   procedure.CategoriaProcedimentoOld,
    minAge             :   procedure.IdadeMinima,
    maxAge             :   procedure.IdadeMaxima,
    applicableMale     :   procedure.macho,
    applicableFemale   :   procedure.femea,
    applicationInterval:   procedure.duracao,
    categoryProcedure  :   procedure.CategoriaProcedimento,
    available          :   procedure.Disponivel,
    observations       :   "",
    sector_id          :   procedure.setor,
    group_id           :   procedure.CategoriaProcedimento
  }));

 export async function PopulateProcedures () {
     try {
     for await (const proced of filteredData) {
        try {
            await prisma.procedures.create({
                data: {
                codProcedimento: proced.codProcedimento,
                  name: proced.name,
                  price: proced.price,
                  priceTwo: proced.priceTwo,
                  priceThree: proced.priceThree,
                  priceFour: proced.priceFour,
                  categoryOld: proced.categoryOld,
                  minAge: proced.minAge,
                  maxAge: proced.maxAge,
                  applicableMale: proced.applicableMale,
                  applicableFemale: proced.applicableFemale,
                  categoryProcedure: proced.categoryProcedure,
                  available: proced.available,
                  observations: proced.observations,
                  sector: {connect: {id: parseInt(proced.sector_id)}}
                }
              })
        } catch (error) {
            //console.log(`Procedimento com erro ${proced.name} Cod: ${proced.codProcedimento}`)
        }
      }
      console.log("Banco populado Procedimentos")
      
     } catch (error) {
      console.log(error);
     }
 } 

