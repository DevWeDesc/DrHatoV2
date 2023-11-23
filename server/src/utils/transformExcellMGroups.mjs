import XLSX from 'xlsx';
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const arquivoExcel = './src/Medicamentos.xlsx';
const workbook = XLSX.readFile(arquivoExcel);
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];
const data = XLSX.utils.sheet_to_json(worksheet, { raw: true, skipEmptyLines: true});


const filteredData = data
  .map(medicine => ({
    title: medicine.tipo, 
  }));

 export async function PopulateMGroups () {
     try {

      const uniqueTipes = new Set();
     
     for await (const medicine of filteredData) {
      if (!uniqueTipes.has(medicine.title)) {
        await prisma.medicinesGroups.create({
          data: medicine
        })

        uniqueTipes.add(medicine.title);
      }
    
      }
      console.log("Banco populado M Groups")
      console.log(uniqueTipes)
     } catch (error) {
      console.log(error);
     }
 } 

