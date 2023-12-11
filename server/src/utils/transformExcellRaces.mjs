import XLSX from 'xlsx';
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const arquivoExcel = './src/databases/ConsultaRacas.xlsx';
const workbook = XLSX.readFile(arquivoExcel);
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];
const data = XLSX.utils.sheet_to_json(worksheet, { raw: true, skipEmptyLines: true});


const filteredData = data
  .map(races => ({
    name: races.raça, 
    especie: races.especie,
    cod: races.codigo
  }));

 export async function PopulateRaces() {
     try {

     for await (const races of filteredData) {
        await prisma.races.create({
          data: {
            name: races.name,
            codEspOld: races.cod,
            Especies: {
                connect: {
                name: races.especie
                }}

          }
        })

      }
      
      console.log("Banco Populado Raças")
     } catch (error) {
      console.log(error);
     }
 } 
