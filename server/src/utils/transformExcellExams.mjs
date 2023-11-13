import XLSX from 'xlsx';
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
const prisma = new PrismaClient();
const arquivoExcel = './src/Exames.xlsx';
const workbook = XLSX.readFile(arquivoExcel);
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];
const data = XLSX.utils.sheet_to_json(worksheet, { raw: true, skipEmptyLines: true});


function returnTypeUser(crm) {
  if(crm != null || crm != undefined) {
    return "VETERINARIAN"
  } else {
    return "UNDEFINED"
  }
}

const filteredData = data.map(exam => ({
    name: exam.nomeexame, 
    price: exam.preçoexame,
    defaultMethodology: exam.MetodologiaPadrao,
    impressName: exam.NomeNaImpressao,
    available: exam.disponivel,
    isReportByText: exam.TextoLaudo,
    isOnePart: exam.umaparte,
    examsType: exam.Laboratorial ? "['lab']": "['image']",
  }));

 async function populeDb () {
     try {


     for await (const exams of filteredData) {
        await prisma.exams.create({
            data: {
              ...exams,
            }
          })
    
      }
      console.log("Banco populado")
      
     } catch (error) {
      console.log(error);
     }
 } 

 populeDb()