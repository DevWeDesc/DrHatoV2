import XLSX from 'xlsx';
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const arquivoExcel = './src/databases/ConsultaEspecies.xlsx';
const workbook = XLSX.readFile(arquivoExcel);
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];
const data = XLSX.utils.sheet_to_json(worksheet, { raw: true, skipEmptyLines: true});


const filteredData = data
  .map(especies => ({
    name: especies.especie, 
 
  }));

 export async function PopulateEspecies () {
     try {

     for await (const especies of filteredData) {
        await prisma.especies.create({
          data: {
            name: especies.name
          }
        })

      }
      
      console.log("Banco Populado especies")
     } catch (error) {
      console.log(error);
     }
 } 

