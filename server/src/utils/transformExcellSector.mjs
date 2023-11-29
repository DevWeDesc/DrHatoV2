import XLSX from 'xlsx';
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const arquivoExcel = './src/Setores.xlsx';
const workbook = XLSX.readFile(arquivoExcel);
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];
const data = XLSX.utils.sheet_to_json(worksheet, { raw: true, skipEmptyLines: true});


const filteredData = data.map(sector => ({
    sectorId: sector.SetorId,
    name: sector.Setor
  }));

 export async function PopulateSectors () {
     try {


     for await (const sectors of filteredData) {
        await prisma.sectors.create({
            data: sectors
          })
    
      }
      console.log("Banco populado Setores")
      
     } catch (error) {
      console.log(error);
     }
 } 

