import XLSX from 'xlsx';
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
const prisma = new PrismaClient();
const arquivoExcel = './src/databases/Exames.xlsx';
const workbook = XLSX.readFile(arquivoExcel);
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];
const data = XLSX.utils.sheet_to_json(worksheet, { raw: true, skipEmptyLines: true});


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

 export async function PopulateExams () {
     try {


     for await (const exams of filteredData) {
        await prisma.exams.create({
            data: {
              ...exams,
            }
          })
    
      }
      console.log("Banco populado Exams")
      
     } catch (error) {
      console.log(error);
     }
 } 

