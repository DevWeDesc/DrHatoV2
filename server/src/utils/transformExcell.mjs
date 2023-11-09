import XLSX from 'xlsx';
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
const prisma = new PrismaClient();
const arquivoExcel = './src/Users.xlsx';
const workbook = XLSX.readFile(arquivoExcel);
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];
const data = XLSX.utils.sheet_to_json(worksheet, { raw: true, skipEmptyLines: true});


function returnTypeUser(crm) {
  if(crm != null || crm != undefined) {
    return "VETERINARIAN"
  } else {
    return "UNDEFINED"
  }
}

const filteredData = data
  .filter(user => user.Nome && user.senha) // Filtra linhas com Nome e senha preenchidos
  .map(user => ({
    password: user.senha, 
    username: user.Nome,
    userType: ['admin'],
    crmv: user.crm,
    role: returnTypeUser(user.crm)
  }));

 async function populeDb () {
     try {

      const uniqueNames = new Set();
     
     for await (const user of filteredData) {
      if (!uniqueNames.has(user.username)) {
        await prisma.user.create({
          data: {
            ...user,
            password: await bcrypt.hash(user.password, 10)
          }
        })

        uniqueNames.add(user.username);
      }
    
      }
      console.log("Banco populado")
      console.log(uniqueNames)
     } catch (error) {
      console.log(error);
     }
 } 

 populeDb()