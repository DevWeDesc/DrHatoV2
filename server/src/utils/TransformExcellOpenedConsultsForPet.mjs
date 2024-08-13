
import XLSX from 'xlsx';
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const arquivoExcel = './src/databases/OldConsultas.xlsx';
const workbook = XLSX.readFile(arquivoExcel);
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];
const data = XLSX.utils.sheet_to_json(worksheet, { raw: false, skipEmptyLines: true});


function convertTo24HourFormat(time) {
  if (typeof time !== 'string') {
       return "00:00:00";
  }
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
  if (!(date instanceof Date)) {
      throw new TypeError('date deve ser uma instância de Date');
  }

  const datePart = date.toISOString().split('T')[0];
  const dateTimeString = `${datePart}T${convertTo24HourFormat(time)}`;
  const combinedDate = new Date(dateTimeString);

  if (isNaN(combinedDate.getTime())) {
      throw new Error('Invalid date or time format');
  }
  return new Date(combinedDate.getTime() - (combinedDate.getTimezoneOffset() * 60000));
}
  const filteredData = data
  .map((oldConsultas) => ({

    petName: oldConsultas.NomeAnimal,
    idConsult: parseInt(oldConsultas.CodConsulta),
    openedDate: combineDateTime(new Date(oldConsultas.Data), oldConsultas.Horário, oldConsultas.CodConsulta),
    closedDate: combineDateTime(new Date(oldConsultas.Data), oldConsultas.HoraFim, oldConsultas.CodConsulta),
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
    CodAnimal: parseInt(oldConsultas.CodAnimal),
    }));

  export async function PopulateOpenedConsultsForPet() {
    try {


      for (const consults of filteredData) {

             try {

              const numberMedicioneRecord = await prisma.pets.findFirst({
                where: {
                  CodAnimal: consults.CodAnimal,
                },
                select: {
                  id: true,
                }
              });

          await prisma.openedConsultsForPet.create({
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
              medicineRecordId: consults.CodAnimal ? numberMedicioneRecord.id : null,
            }, 
          });
                  
        } catch (error) { 
        console.error(`Erro ao consulta pet: ${consults.petName}, Código do Animal: ${consults.CodAnimal}`);

        }
      }
      console.log("Banco populado OpenedConsultsForPet");
    } catch (error) {
      console.error(error);
    }
  }
  
