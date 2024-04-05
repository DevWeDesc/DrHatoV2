import XLSX from 'xlsx';
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const arquivoExcel = './src/databases/ConsultaExamePorConsulta.xlsx';
const workbook = XLSX.readFile(arquivoExcel);
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];
const data = XLSX.utils.sheet_to_json(worksheet, { raw: false, skipEmptyLines: true});


const filteredData = data.map(exam => ({
  name: exam.nomeexame,
    codexam: exam.codexame,
    vetId     :  parseInt(exam.veterinário),
    codConsult:  parseInt(exam.CodConsulta),
    codExam   :  parseInt(exam.Codexame),
    CodExamConsulta: parseInt(exam.CodExameConsulta),
    codAnimal :  parseInt(exam.codanimal),
    codCli    :  parseInt(exam.Codcli),
  madeAt     : new Date(exam.Data),
  vetName   : exam.NomeCompleto,
  obsOne   : exam.Obs1,
  obsTwo   : exam.Obs2,
  metodology: exam.Metodologia,
  image      : Boolean(exam.Image),
  laboratory : Boolean(exam.laboratorial)
 
  }));

 export async function PopulateOldExamsHistorie () {
     try {

     for await (const exams of filteredData) {
      try {
        
        await prisma.oldExamsHistory.create({
          data: {
            ...exams,

          Pets: {
            connect: {
              CodAnimal: exams.codAnimal
            }
          }
          }
        })

      } catch (error) {

        console.log(`Animal error: ${exams.codAnimal}`)
      }
   
    
      }
      console.log("Banco populado Old Exams")
      
     } catch (error) {
      console.log(error);
     }
 } 

