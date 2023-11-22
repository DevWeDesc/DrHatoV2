
import XLSX from 'xlsx';
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const arquivoExcel = './src/CadAnimais.xlsx';
const workbook = XLSX.readFile(arquivoExcel);
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];
const data = XLSX.utils.sheet_to_json(worksheet, { raw: true, skipEmptyLines: true});



const filteredData = data
  .map(pet => ({
    CodAnimal: pet.CodAnimal,
    name:       pet.NomeAnimal,
    especie: pet.Tipo,
    sexo: pet.Sexo,
    race: pet.raça,
    weigth: pet.Peso ? `"${pet.Peso}"`: "Atualizar",
    haveChip:  pet.Microchipagem,
    corPet: pet.Cor,
    sizePet: "",
    bornDate: pet.Idade,       
    observations: pet.Obs,
    isCastred: pet.castrado,
    debits: 0,
    CodCli: pet.codcli

  }));

  export async function PopulatePets() {
    try {
      for await (const pets of filteredData) {
        try {
          await prisma.pets.create({
            data: {
              ...pets,
              customer: {
                connect: {
                  CodCli: parseInt(pets.CodCli)
                }
              },
              queue: {
                create: {
                  vetPreference: '',
                  queryType: '',
                  queueEntry: null
                }
              },
              medicineRecords: {
                create: {
                  observations: ['']
                }
              },
              priceAccumulator: {
                create: {
                  accumulator: 0
                }
              }
            }
          });

        
        } catch (error) {
          // Registre o erro, mas continue com o próximo pet
         // console.error(`Erro ao criar pet: ${pets.name}, Código do Cliente: ${pets.CodCli}`);

        }
      }
      console.log("Banco populado Pets");
    } catch (error) {
      console.error(error);
    }
  }
  
