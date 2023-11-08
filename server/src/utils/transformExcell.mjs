
import XLSX from 'xlsx';
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const arquivoExcel = './src/Users.xlsx';
const workbook = XLSX.readFile(arquivoExcel);
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];
const data = XLSX.utils.sheet_to_json(worksheet, { raw: true, skipEmptyLines: true});


const filteredData = data
  .filter(user => user.Nome && user.senha) // Filtra linhas com Nome e senha preenchidos
  .map(user => ({
    password: user.senha,
    username: user.Nome,
    userType: ['admin']
  }));

 async function populeDb () {
     try {
      for(const user of filteredData) {
        await prisma.user.create({
          data: user
        })
      }
      console.log("Banco populado")
     } catch (error) {
      console.log(error);
     }
 } 

 populeDb()