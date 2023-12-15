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

type body = {
  RequestedByVetId: number;
  RequestedByVetName: string;
  InAdmission: boolean;
  dosage: string;
}



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
      const {title, price, dosage, observations, unitMeasurement, stock } = request.body

      await prisma.medicine.create({
        data: {title, dosage, price, unitMeasurement, observations, stock ,MedicinesGroups: {
          connect: {id: parseInt(medicineGroupId)}
        }}
      })

      reply.send("Medicamento criado com sucesso!").status(201)


    } catch (error) {

      reply.send({message: error})

      console.log(error)
    }
  },


  setMedicineInPet: async (request: FastifyRequest<{Params:{ medicineId: string, petId: string, dosage: string; accId: string; queueId: string}, Body: body}>, reply: FastifyReply) => {
    try {
      const {medicineId, petId, accId, queueId, } = request.params
      const {RequestedByVetId, RequestedByVetName, InAdmission, dosage} = request.body
      const medicine = await prisma.medicine.findUnique({where: {id: parseInt(medicineId)}})
      if(!medicine) return

      if(InAdmission === true) {
        await prisma.petConsultsDebits.create({
          data: {
            OpenedAdmissionsForPet: {connect: {id: queueId}},
            isProcedure: true,
            name: medicine.title,
            price: medicine.price,
            itemId: medicine.id,
            RequestedByVetId,
            RequestedByVetName,
  
          }
        })
      } else {
        await prisma.petConsultsDebits.create({
          data: {
            OpenedConsultsForPet: {connect: {id: queueId}},
            isProcedure: true,
            name: medicine.title,
            price: medicine.price,
            itemId: medicine.id,
            RequestedByVetId,
            RequestedByVetName,
  
          }
        })
      }




      await prisma.medicinesForPets.create({
        data: {title: medicine.title, unitMeasurement: medicine.unitMeasurement, dosageApplication: dosage, isPaid: true
        , MedicineRecord: {connect: {petId: parseInt(petId)}}
        }
      })



      await accumulatorService.addPriceToAccum(medicine.price, accId);


      reply.send("Medicado com sucesso!").status(201)
    } catch (error) {
      console.log(error)
      reply.send({message: error})
 

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

      const allMedicines = await prisma.medicine.findMany()
      const filtredMedicines = allMedicines.map((medicine) => {
        let data = {
          id: medicine.id,
        name: medicine.title,
        stock: medicine.stock
        }
        return data
      })
      reply.send({filtredMedicines, medicines})
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
  },

  getMedicineByQuery: async(request: FastifyRequest<{Querystring: {query: string}}>, reply: FastifyReply) => {
    try {
      const { query} = request.query

      const medicines = await prisma.medicine.findMany({
        where: {title: {contains: query}}
      })

      reply.send({
        medicines
      })


    } catch (error) {
       reply.send({message: error})
      console.log(error)
    }
  },

  getMedicinesOnPets: async(request: FastifyRequest<{Params: {CodAnimal: string}}>, reply: FastifyReply) => {

    const {CodAnimal} = request.params

    try {
      const medicines = await prisma.medicinesForPets.findMany({
        where: {MedicineRecord: {
          pet:{
            id: parseInt(CodAnimal)
          }
        }}
      })

      reply.send({
        medicines
      })
    } catch (error) {
        reply.send({
          message: error
        })
    }
  },

  removeMedicineOnPet: async(request: FastifyRequest<{Params: {appliedId: string, queueId: string}, Body: {title: string; itemId: number; date: Date}}>, reply: FastifyReply) => {
    try {
      const {appliedId, queueId } = request.params
      const {title, itemId, date} = request.body

      await prisma.medicinesForPets.delete({
        where: {id: parseInt(appliedId)}
      })

      await prisma.petConsultsDebits.deleteMany({
      where: {
            name: title,
            itemId,
            requestedDate: date,
            openedConsultsForPetId: queueId
      },
      })

      reply.send("Excluido com sucesso!")
    } catch (error) {
      reply.send({
        message: error
      })
    }
  }

}