import XLSX from 'xlsx';
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const arquivoExcel = './src/databases/ConsultaDetalhesInternacao.xlsx';
const workbook = XLSX.readFile(arquivoExcel);
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];
const data = XLSX.utils.sheet_to_json(worksheet, { raw: false, skipEmptyLines: true});



const filteredData = data
  .map(oldAdmissionDetails => ({
    CodAnimal          :  parseInt(oldAdmissionDetails.CodAnimal),
    CodInternacao      :  parseInt(oldAdmissionDetails.CodInternacao),
    procedureName      :    oldAdmissionDetails.medicacao,
    procedureValue     :    parseFloat(oldAdmissionDetails.valor)
 
    }));

  export async function PopulateOldDetailsAdmission() {
    try {
      for (const admissionDetails of filteredData) {

        try {
          await prisma.oldAdmissionProcedures.create({
            data: {
              ...admissionDetails,
              admissionHistory:{ 
                connect:{
                  CodInternacao: admissionDetails.CodInternacao
                }
              }
            }
          });

        
        } catch (error) { 

 
          console.log(error);

        }
      }
      console.log("Banco populado Old Admission details" );
    } catch (error) {
      console.error(error);
    }
  }
 