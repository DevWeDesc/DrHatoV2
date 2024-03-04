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
  birthday: user.Nascimento ? `"${user.Nascimento}"` : "Atualizar",
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

