import XLSX from 'xlsx';
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const arquivoExcel = './src/databases/Procedimentos.xlsx';
const workbook = XLSX.readFile(arquivoExcel);
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];
const data = XLSX.utils.sheet_to_json(worksheet, { raw: true, skipEmptyLines: true});


const filteredData = data
  .filter(vaccine => vaccine.CategoriaProcedimentoOld === "Vacinas") // Filtra linhas com Nome e senha preenchidos
  .map(vaccine => ({
    name: vaccine.NomeProcedimento, 
    price: vaccine.Preço1,
    disponible: vaccine.Disponivel,
    description: "",
    applicableMale: vaccine.macho,
    applicableFemale: vaccine.femea,
  }));

 export async function PopulateVaccines () {
     try {

     for await (const vaccines of filteredData) {
        await prisma.vaccines.create({
          data: vaccines
        })

      }
      
      console.log("Banco Populado Vaccines")
     } catch (error) {
      console.log(error);
     }
 } 

