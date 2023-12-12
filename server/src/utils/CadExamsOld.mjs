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
    codexam: exam.codexame,
    name:      exam.nomeexame, 
    price:     exam.preçoexame,
    onePart:   exam.umaparte,
    twoPart:   exam.duasPartes,
    byReport:  exam.TextoLaudo,
    ageGroups: exam.FaixasEtarias,
    disponible:exam.disponivel,
    minAge:    exam.IdadeMinima,
    maxAge:    exam.IdadeMaxima,
    applicableMales:   exam.Macho,
    appicableFemales:  exam.Femea,
    defaultMetodology: exam.MetodologiaPadrao,
    uniqueCod:         exam.CodigoUnico,
    sector:            exam.Setor,
    ImageLab:          exam.Imagem,
    defaultLab:        exam.Laboratorial,
    healthPlan:        exam.PlanoSaude,
    impressName: exam.NomeNaImpressao
  }));

 export async function PopulateOldExams () {
     try {


     for await (const exams of filteredData) {
        await prisma.oldExams.create({
            data: exams
          })
    
      }
      console.log("Banco populado Old Exams")
      
     } catch (error) {
      console.log(error);
     }
 } 

