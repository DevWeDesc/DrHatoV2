import XLSX from 'xlsx';
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const arquivoExcel = './src/databases/PartesExames.xlsx';
const workbook = XLSX.readFile(arquivoExcel);
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];
const data = XLSX.utils.sheet_to_json(worksheet, { raw: true, skipEmptyLines: true});


const filteredData = data.map(exam => ({
    codpart: exam.CodParte,
    partName: exam.NomeParte,
    isFirst:   exam.Primeira,
    codexame: exam.codexame
  }));

 export async function PopulatePartDetails () {
     try {


     for await (const exams of filteredData) {
                try {
                    await prisma.partExams.create({
                        data: {
                            codpart: exams.codpart,
                            isFirst: exams.isFirst,
                            partName: exams.partName,
                            OldExams: {
                                connect:{
                                    codexam: parseInt(exams.codexame)
                                }
                            },
                            
                        }
                      })
                } catch (error) {
                    console.log("Exame com erro, Cód:", exams.codexame, error)
                }
    
      }
      console.log("Banco populado Part Exams")
      
     } catch (error) {
      console.log(error);
     }
 } 

