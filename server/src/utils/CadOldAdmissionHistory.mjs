import XLSX from 'xlsx';
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const arquivoExcel = './src/databases/HistInternacao.xlsx';
const workbook = XLSX.readFile(arquivoExcel);
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];
const data = XLSX.utils.sheet_to_json(worksheet, { raw: false, skipEmptyLines: true});



const filteredData = data
  .map(oldAdmission => ({
    CodAnimal   :  parseInt(oldAdmission.CodAnimal),
    CodLeito     : parseInt(oldAdmission.CodLeito),
    CodInternacao: parseInt(oldAdmission.CodInternacao),
    entryDay     : new Date(oldAdmission.DataInicio),
    exitDay      : new Date(oldAdmission.DataFim),
    exitHour     :  oldAdmission.HoraFim,
    entryHour    : oldAdmission.HoraInicio
    }));

  export async function PopulateOldAdmission() {
    try {
      for (const admission of filteredData) {

        try {
          await prisma.oldAdmissionsHistory.create({
            data: {
              ...admission,
              Pets: {
                connect: {
                  CodAnimal: admission.CodAnimal
                }
              }
            }
          });

        
        } catch (error) { 

 
          console.log(error);

        }
      }
      console.log("Banco populado Old Admission");
    } catch (error) {
      console.error(error);
    }
  }
  
