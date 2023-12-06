import XLSX from 'xlsx';
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const arquivoExcel = './src/databases/Procedimentos.xlsx';
const workbook = XLSX.readFile(arquivoExcel);
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];
const data = XLSX.utils.sheet_to_json(worksheet, { raw: true, skipEmptyLines: true});


const filteredData = data
  .filter(surgeries => surgeries.CategoriaProcedimentoOld === "Cirurgias do Aparelho Genital Feminino"
    || surgeries.CategoriaProcedimentoOld === "Cirurgias Geral do Abdomem"
    || surgeries.CategoriaProcedimentoOld === "Cirurgias Gerais"
    || surgeries.CategoriaProcedimentoOld === "Cirurgias do Aparelho Digestivo"
    || surgeries.CategoriaProcedimentoOld === "Cirurgias Ortopédicas"
    || surgeries.CategoriaProcedimentoOld === "Cirurgias Oftalmológicas"
    || surgeries.CategoriaProcedimentoOld === "Cirurgias Buco Maxilo Faciais"
    || surgeries.CategoriaProcedimentoOld === "Cirurgias Estéticas ou Corretivas"
    || surgeries.CategoriaProcedimentoOld === "Cirurgias do Sistema Hematopoiético"
    || surgeries.CategoriaProcedimentoOld === "Cirurgias do Aparelho Respiratório") // Filtra linhas com Nome e senha preenchidos
    .map(surgeries => ({
    name: surgeries.NomeProcedimento, 
    price: surgeries.Preço1,
    applicableToFemale: surgeries.femea,
    applicableToMale: surgeries.macho
  }));

 export async function PopulateSurgeries () {
     try {

     for await (const surgeries of filteredData) {
        await prisma.surgeries.create({
          data: {
            name: surgeries.name,
            price: surgeries.price,
            applicableToFemale: surgeries.applicableToFemale,
            applicableToMale: surgeries.applicableToMale
          }
        })

        console.log(surgeries)

      }
      
      console.log("Banco Populado Surgeries")
     } catch (error) {
      console.log(error);
     }
 } 
