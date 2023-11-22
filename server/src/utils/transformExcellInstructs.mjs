import XLSX from 'xlsx';
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const arquivoExcel = './src/Autorizacoes.xlsx';
const workbook = XLSX.readFile(arquivoExcel);
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];
const data = XLSX.utils.sheet_to_json(worksheet, { raw: true, skipEmptyLines: true});


const filteredData = data
  .map(autorization => ({
    name: autorization.nome, 
    text: autorization.TextoAut
  }));

 export async function PopulateInstructions () {
     try {
     
     for await (const autorizations of filteredData) {
        await prisma.autorizations.create({
          data: autorizations
        })

      }

      console.log("Banco populado Autorizações")
     } catch (error) {
      console.log(error);
     }
 } 

 PopulateInstructions()