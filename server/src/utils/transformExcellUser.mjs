import XLSX from 'xlsx';
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const arquivoExcel = './src/databases/Clientes.xlsx';
const workbook = XLSX.readFile(arquivoExcel);
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];
const data = XLSX.utils.sheet_to_json(worksheet, { raw: true, skipEmptyLines: true});

function randomNumberAccount(min, max){  
  return Math.floor(
    Math.random() * (max - min) + min
  )
}

function excelDateToJSDate(serial) {
  if (!serial) return null;
  
  const utc_days = Math.floor(serial - 25569);
  const utc_value = utc_days * 86400;
  const date_info = new Date(utc_value * 1000);

  const fractional_day = serial - Math.floor(serial) + 0.0000001;
  let total_seconds = Math.floor(86400 * fractional_day);

  const seconds = total_seconds % 60;
  total_seconds -= seconds;

  const hours = Math.floor(total_seconds / (60 * 60));
  const minutes = Math.floor(total_seconds / 60) % 60;

  date_info.setUTCDate(date_info.getUTCDate() + 1);

  return new Date(Date.UTC(date_info.getFullYear(), date_info.getMonth(), date_info.getDate(), hours, minutes, seconds));
}

const filteredData = data // Filtra linhas com Nome e senha preenchidos
  .map(user => ({
  CodCli: user.CodCli,
  name: user.Nome,            
  adress: user.Endereço,
  neighbour:  user.Bairro,
  district: user.Cidade,
  cep: user.CEP,
  state: user.estado,
  cpf: user.cgc,
  rg: user.rg,
  tell: user.telefone,
  phone: user.Celular,
  email: user.email,
  birthday: user.Nascimento ? (excelDateToJSDate(user.Nascimento) ? excelDateToJSDate(user.Nascimento).toISOString().split('T')[0] : "Data não disponível") : "Atualizar",
  balance:  Number(user.SaldoAnterior),
  kindPerson: user.Juridica === true ? "Fisica" : "Juridica"
  }));

 export async function PopulateCustomer () {
     try {
        const uniqueCpfs = new Set();
      for await(const user of filteredData) {

        if (!uniqueCpfs.has(user.cpf)) {
            await prisma.customer.create({
              data: {
                ...user
                ,customerAccount: {create: {
                  accountNumber: randomNumberAccount(100, 100000),
                  credits: 0,
                  debits: 0
                }}
              }
            });
            uniqueCpfs.add(user.cpf);
          }

      }
      console.log("Banco populado Customers")
     } catch (error) {
      console.log(error);
     }
 } 

