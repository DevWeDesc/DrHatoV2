
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


  console.log(new Date(combinedDate.getTime() - (combinedDate.getTimezoneOffset() * 60000)))
  console.log(new Date(combinedDate.getTime() - (combinedDate.getTimezoneOffset() * 60000)).toISOString())

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

  // export async function PopulateOldConsults() {
  //   const filteredData = [];
  //   try {
  //     for (const oldConsultas of data) {  
  //       const customerId = await getCustomerIdByCodCli(oldConsultas.CodCli);
        
  //       if (customerId) {
  //           filteredData.push({
  //               idConsult: parseInt(oldConsultas.CodConsulta),
  //               openedDate: 
  //               petName: oldConsultas.NomeAnimal,
  //               openedBy: oldConsultas.NomeCompleto,
  //               vetPreference: oldConsultas.Veterinario,
  //               closedDate: combineDateTime(new Date(oldConsultas.Data), oldConsultas.HoraFim),
  //               isClosed: true,
  //               closedByVetName: oldConsultas.NomeCompleto,
  //               petWeight: parseFloat(oldConsultas.peso),
  //               consulType: oldConsultas.NomeTipo,
  //               symptoms: oldConsultas.Sintomas,
  //               request: oldConsultas.Solicitacao,
  //               diagnostic: oldConsultas.Diagnostico,
  //               customerAccountId: customerId // Associando o id do cliente
  //           });
  //       } else {

 
  //       console.error(`Erro ao consulta pet: ${consults.petName}, Código do Animal: ${consults.CodAnimal}`);

  //       }

  //       for (const dataItem of filteredData) {
  //         await prisma.openedConsultsForPet.create({
  //             data: dataItem,
  //         });
  //     }
  //     }
  //     console.log("Banco populado Old Consults");
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }
  
  const filteredData = data
  .map(oldConsultas => ({

    petName: oldConsultas.NomeAnimal,
    idConsult: parseInt(oldConsultas.CodConsulta),
    // openedDate: combineDateTime(new Date(oldConsultas.Data), oldConsultas.Horário),
    // closedDate: combineDateTime(new Date(oldConsultas.Data), oldConsultas.HoraFim),
    openedDate: new Date("2022-09-21T13:31:29.000Z"),
    closedDate: new Date("2022-09-21T13:31:29.000Z"),
    consultType: oldConsultas.NomeTipo,
    CodCli: parseInt(oldConsultas.codcli),
    vetPreference: oldConsultas.NomeCompleto,
    isClosed: true,
    observations: "",
    vetId: parseInt(oldConsultas.Veterinario),
    closedByVetName: oldConsultas.NomeCompleto,
    petWeight: oldConsultas.peso,
    consulType: oldConsultas.NomeTipo,
    symptoms: oldConsultas.Sintomas,
    request: oldConsultas.Solicitacao,
    diagnostic: oldConsultas.Diagnostico,
    openedBy: oldConsultas.NomeCompleto,
    medicineRecordId: oldConsultas.CodAnimal,
    }));

  export async function TesteTransformExcellOpenedConsultsForPet() {
    try {

      for (const consults of filteredData) {

      // const consults = filteredData[0];

      // const customerId = await getCustomerIdByCodCli(consults.CodCli);
        try {
          const newConsult = await prisma.openedConsultsForPet.create({
            data: {
              idConsult: consults.idConsult,
              petName: consults.petName,
              openedDate: consults.openedDate,
              vetPreference: consults.vetPreference,
              closedDate: consults.closedDate,
              isClosed: true,
              closedByVetId: consults.vetId,
              clodedByVetName: consults.vetPreference,
              petWeight: consults.petWeight,
              consultType: consults.consultType,
              symptoms: consults.symptoms,
              request: consults.request,
              diagnostic: consults.diagnostic,
              openedBy: consults.openedBy,
              clientIsVip: false,
              medicineRecordId: consults.medicineRecordId,
              MedicineRecord: {
                connect: {
                  CodAnimal: consults.medicineRecordId
              },
            },
              // customerAccountId: 22,
            },
          });
        
          console.log(newConsult);
        
        } catch (error) { 
          console.log(error);

 
        console.error(`Erro ao consulta pet: ${consults.petName}, Código do Animal: ${consults.CodAnimal}`);

        }
      }
      console.log("Banco populado Old Consults");
    } catch (error) {
      console.error(error);
    }
  }
  
