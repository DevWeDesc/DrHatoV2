
import XLSX from 'xlsx';
import { PrismaClient } from "@prisma/client";
import dayjs from 'dayjs';
const prisma = new PrismaClient();
const arquivoExcel = './src/databases/OldConsultas.xlsx';
const workbook = XLSX.readFile(arquivoExcel);
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];
const data = XLSX.utils.sheet_to_json(worksheet, { raw: false, skipEmptyLines: true});



const filteredData = data
  .map(oldConsultas => ({
    CodAnimal: parseInt(oldConsultas.CodAnimal),
    codConsulta: parseInt(oldConsultas.CodConsulta),
    petName:   oldConsultas.NomeAnimal,
    petWeight: parseFloat(oldConsultas.peso),
    vetName:  oldConsultas.NomeCompleto,
    vetId: parseInt(oldConsultas.Veterinario),
    customerName: oldConsultas.Nome,
    CodCli: parseInt(oldConsultas.codcli),
    consulType: oldConsultas.NomeTipo,
    date: new Date(oldConsultas.Data),
   startAt: oldConsultas.Horário,
   endAt: oldConsultas.HoraFim,
   symptoms: oldConsultas.Sintomas,
   request: oldConsultas.Solicitacao,
   diagnostic: oldConsultas.Diagnostico

    }));

  export async function PopulateOldConsults() {
    try {
      for (const consults of filteredData) {

        try {
          await prisma.oldConsults.create({
            data: {
              ...consults,
           Pets: {
            connect: {
              CodAnimal: consults.CodAnimal
            }
           }

            }
          });

        
        } catch (error) { 

 
        console.error(`Erro ao consulta pet: ${consults.petName}, Código do Animal: ${consults.CodAnimal}`);

        }
      }
      console.log("Banco populado Old Consults");
    } catch (error) {
      console.error(error);
    }
  }
  
