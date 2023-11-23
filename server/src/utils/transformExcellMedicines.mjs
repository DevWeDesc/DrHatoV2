import XLSX from 'xlsx';
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const arquivoExcel = './src/Medicamentos.xlsx';
const workbook = XLSX.readFile(arquivoExcel);
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];
const data = XLSX.utils.sheet_to_json(worksheet, { raw: true, skipEmptyLines: true});


const filteredData = data
.filter(medicine => medicine.NomeMedicamento)
  .map(medicine => ({
    title: medicine.NomeMedicamento, 
    price: medicine.preço,
    dosage: medicine.posologia,
    observations: medicine.substância,
    group: medicine.tipo
  }));

 export async function PopulateMedicines () {
     try {

      const uniqueTipes = new Set();
     
     for await (const medicine of filteredData) {
      if (!uniqueTipes.has(medicine.title)) {

        let group = await prisma.medicinesGroups.findFirst({where: {title: medicine.group}})

        await prisma.medicine.create({
          data: {
            dosage: medicine.dosage,
            title: medicine.title,
            observations: medicine.observations,
            price: medicine.price,
            MedicinesGroups: {
                connect: {id: group.id}
            }
          }
        })

        uniqueTipes.add(medicine.title);
      }
    
      }
      console.log("Banco populado Medicines")
  
     } catch (error) {
      console.log(error);
     }
 } 

