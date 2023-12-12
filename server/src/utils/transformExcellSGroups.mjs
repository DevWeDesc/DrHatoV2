import XLSX from 'xlsx';
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const arquivoExcel = './src/databases/TiposProcedimentos.xlsx';
const workbook = XLSX.readFile(arquivoExcel);
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];
const data = XLSX.utils.sheet_to_json(worksheet, { raw: true, skipEmptyLines: true});


const filteredData = data.map(group => ({
    codGroup: group.CodTipoProced,
    name: group.NomeTipoProced
  }));

 export async function PopulateGroups () {
     try {


     for await (const groups of filteredData) {
        await prisma.groups.create({
            data: groups
          })
    
      }
      console.log("Banco populado Grupos")
      
     } catch (error) {
      console.log(error);
     }
 } 

