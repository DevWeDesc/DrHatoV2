import { FastifyRequest, FastifyReply } from "fastify";
import { prisma } from "../interface/PrismaInstance";
import { Prisma } from "@prisma/client";
import { accumulatorService } from "../services/accumulatorService";

type params = {
  id: string;
  customerId: string;
  histBoxId: string;
  medicineId: string;
};



export const medicinesController = {
  createMedicineGroup: async (request: FastifyRequest<{Body:{ title: string;}}>, reply: FastifyReply) => {
    try { 

      const {title} = request.body;

      await prisma.medicinesGroups.create({
        data: {title}
      })
      
      reply.send("Grupo de medicamentos criado com sucesso!")
    } catch (error) {

      reply.send({message: error})
      console.log(error)

    }
  },


  createMedicine: async (request: FastifyRequest<{Body: Prisma.MedicineCreateInput, Params: {medicineGroupId: string}}>, reply: FastifyReply) => {
    try {

      const { medicineGroupId} = request.params
      const {title, price, dosage, observations, unitMeasurement } = request.body

      await prisma.medicine.create({
        data: {title, dosage, price, unitMeasurement, observations, MedicinesGroups: {
          connect: {id: parseInt(medicineGroupId)}
        }}
      })

      reply.send("Medicamento criado com sucesso!").status(201)


    } catch (error) {

      reply.send({message: error})

      console.log(error)
    }
  },


  setMedicineInPet: async (request: FastifyRequest<{Params:{ medicineId: string, petId: string, dosage: string; accId: string;}}>, reply: FastifyReply) => {
    try {
      const {medicineId, petId, dosage, accId } = request.params

      const medicine = await prisma.medicine.findUnique({where: {id: parseInt(medicineId)}})

      if(!medicine) return

      await accumulatorService.addPriceToAccum(medicine.price, accId);

      await prisma.medicinesForPets.create({
        data: {title: medicine.title, unitMeasurement: medicine.unitMeasurement, dosageApplication: dosage, isPaid: true
        , MedicineRecord: {connect: {petId: parseInt(petId)}}
        }
      })

      reply.send("Medicado com sucesso!").status(201)
    } catch (error) {
      
      reply.send({message: error})
      console.log(error)

    }
  },


  getPetMedicineHistory: async(request: FastifyRequest<{Params: {petId: string}}>, reply: FastifyReply) => {
    try {
      const { petId } = request.params

      const petHistory = await prisma.pets.findUnique({where: {id: parseInt(petId)}, include: {
        medicineRecords: {select: {petMedicines: true}}
      }})

      reply.send({
        history: petHistory?.medicineRecords?.petMedicines,
      })

      
    } catch (error) {

      reply.send({message: error})
      console.log(error)

    }
  },

  getAllMedicinesGroupsAndMedicines: async(request: FastifyRequest<{Params: {petId: string}}>, reply: FastifyReply) => {
    try {
      const medicines = await prisma.medicinesGroups.findMany({
        include: {medicines: true}
      })

      reply.send({medicines})
    } catch (error) {
      reply.send({message: error})
      console.log(error)
    }
  },

  getMedicineById: async(request: FastifyRequest<{Params: {medicineId: string}}>, reply: FastifyReply) => {
    try {
      const { medicineId} = request.params

        const medicine = await prisma.medicine.findUnique({
          where: {id: parseInt(medicineId)}
        })

        reply.send(medicine)
    } catch (error) {
      
      reply.send({message: error})
      console.log(error)
    }
  }

}