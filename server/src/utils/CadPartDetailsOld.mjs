import XLSX from 'xlsx';
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const arquivoExcel = './src/DetalhesPartes.xlsx';
const workbook = XLSX.readFile(arquivoExcel);
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];
const data = XLSX.utils.sheet_to_json(worksheet, { raw: true, skipEmptyLines: true});


const filteredData = data.filter((exam => exam.Caracteristica)).map(exam => ({
  codpart      : exam.CodParte,
  caracteristic: exam.Caracteristica,     
  relativeUnit : exam.unidadeRelativo,   
  absoluteUnit : exam.UnidadeAbsoluto,     
  agesOne      : exam.Nome1,    
  minAgesOne   : exam.Minimo,     
  maxAgesOne   : exam.Maximo,     
  agesTwo      : exam.Nome2,     
  minAgesTwo   : exam.Minimo2,     
  maxAgesTwo   : exam.Maximo2,     
  agesThree    : exam.Nome3,     
  minAgesThree : exam.Minimo3,     
  maxAgesThree : exam.Maximo3,  
  codDetalhe    : exam.CodDetalhe,        
  parts        : exam.parte,
  }));

 export async function PopulateOldCaractersExams () {
     try {
     for await (const exams of filteredData) {
        try {
            await prisma.partDetails.create({
                data: {
                     codDetalhe: exams.codDetalhe,
                      caracteristic: exams.caracteristic,
                      relativeUnit: exams.relativeUnit,
                      absoluteUnit: exams.absoluteUnit,
                      agesOne: exams.agesOne,
                      minAgesOne: exams.minAgesOne,
                      maxAgesOne: exams.maxAgesOne,
                     agesTwo: exams.agesTwo,
                     minAgesTwo: exams.minAgesTwo,
                     maxAgesTwo: exams.maxAgesTwo,
                     agesThree: exams.agesThree,
                     minAgesThree: exams.minAgesThree,
                     maxAgesThree: exams.maxAgesThree,
                     parts: exams.parts,
                    PartExams: {
                        connect: {
                           codpart: parseInt(exams.codpart)
                        }
                    }
                }
              })
        } catch (error) {
         console.log("Erro CodPart", exams.codpart)
        }
      }
      console.log("Banco populado Part Details")
      
     } catch (error) {
      console.log(error);
     }
 } 



