
import XLSX from 'xlsx';
import { PrismaClient } from "@prisma/client";
import dayjs from 'dayjs';
const prisma = new PrismaClient();
const arquivoExcel = './src/databases/OldConsultas.xlsx';
const workbook = XLSX.readFile(arquivoExcel);
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];
const data = XLSX.utils.sheet_to_json(worksheet, { raw: false, skipEmptyLines: true});


function convertTo24HourFormat(time) {
  const [timePart, period] = time.split(' ');
  let [hours, minutes, seconds] = timePart.split(':').map(Number);

  if (period === 'PM' && hours !== 12) {
      hours += 12;
  } else if (period === 'AM' && hours === 12) {
      hours = 0;
  }

  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}


function combineDateTime(date, time) {
  // Garantir que date é uma instância de Date
  if (!(date instanceof Date)) {
      throw new TypeError('date deve ser uma instância de Date');
  }

  // Extrair a data e ignorar a parte da hora do date
  const datePart = date.toISOString().split('T')[0];
  
  // Criar uma string combinada de data e hora no formato local
  const dateTimeString = `${datePart}T${convertTo24HourFormat(time)}`;

  // Criar um novo objeto Date a partir da string combinada
  const combinedDate = new Date(dateTimeString);

  // Verificar se a data é válida
  if (isNaN(combinedDate.getTime())) {
      throw new Error('Invalid date or time format');
  }

  // Ajustar a data para o fuso horário UTC para obter o formato ISO correto
  return new Date(combinedDate.getTime() - (combinedDate.getTimezoneOffset() * 60000));
}


async function getCustomerIdByCodCli(codCli) {
  const customer = await prisma.customer.findUnique({
      where: {
          CodCli: codCli
      },
      select: {
          id: true
      }
  });
  return customer ? customer.id : null;
}

  export async function PopulateOldConsults() {
    const filteredData = [];
    try {
      for (const oldConsultas of data) {  
        const customerId = await getCustomerIdByCodCli(oldConsultas.CodCli);
        
        if (customerId) {
            filteredData.push({
                idConsult: parseInt(oldConsultas.CodConsulta),
                openedDate: combineDateTime(new Date(oldConsultas.Data), oldConsultas.Horário),
                petName: oldConsultas.NomeAnimal,
                openedBy: oldConsultas.NomeCompleto,
                vetPreference: oldConsultas.Veterinario,
                closedDate: combineDateTime(new Date(oldConsultas.Data), oldConsultas.HoraFim),
                isClosed: true,
                closedByVetName: oldConsultas.NomeCompleto,
                petWeight: parseFloat(oldConsultas.peso),
                consulType: oldConsultas.NomeTipo,
                symptoms: oldConsultas.Sintomas,
                request: oldConsultas.Solicitacao,
                diagnostic: oldConsultas.Diagnostico,
                customerAccountId: customerId // Associando o id do cliente
            });
        } else {

 
        console.error(`Erro ao consulta pet: ${consults.petName}, Código do Animal: ${consults.CodAnimal}`);

        }

        for (const dataItem of filteredData) {
          await prisma.openedConsultsForPet.create({
              data: dataItem,
          });
      }
      }
      console.log("Banco populado Old Consults");
    } catch (error) {
      console.error(error);
    }
  }
  
