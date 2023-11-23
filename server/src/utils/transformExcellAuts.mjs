import XLSX from 'xlsx';
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const arquivoExcel = './src/Instrucoes.xlsx';
const workbook = XLSX.readFile(arquivoExcel);
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];
const data = XLSX.utils.sheet_to_json(worksheet, { raw: true, skipEmptyLines: true});


const filteredData = data
  .map(autorization => ({
    name: autorization.Nome, 
    description: autorization.TextoInst
  }));

 export async function PopulateInstructions () {
     try {
     
     for await (const autorizations of filteredData) {
        await prisma.instructions.create({
          data: {
            name: autorizations.name,
            description: autorizations.description
          }
        })

      }

      console.log("Banco populado Instruções")
     } catch (error) {
      console.log(error);
     }
 } 

 PopulateInstructions()