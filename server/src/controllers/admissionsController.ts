import { FastifyRequest, FastifyReply } from "fastify";
import { PrismaClient } from "@prisma/client";
import { AdmissionSchema, BedSchema } from "../schemas/schemasValidator";
import { ValidationContract } from "../validators/validateContract";
const prisma = new PrismaClient();



type params = {
  id: string;
  recordId: string;
}

export const admissionsController = {
  createKennel: async (request: FastifyRequest, reply: FastifyReply) => {
    const { name, totalBeds} = AdmissionSchema.parse(request.body) 
    try {
      const allBeds = []
       for (let index = 0; index < totalBeds; index++) {
        allBeds.push({

        })
      }

      await prisma.kennel.create({
        data: { name, totalBeds, beds: {
          createMany: {
            data: allBeds
          }
        }} 
      })
      reply.status(201)
    } catch (error) {
      reply.status(400).send({message: error})
    }

  },
  getKennels: async (request: FastifyRequest, reply: FastifyReply) => {
    const kennels = await prisma.kennel.findMany({
      include: {beds: {select: {id: true, isBusy: true, mustFasting: true}}}
    })
    try {
      reply.send(kennels).status(200)
    } catch (error) {
      reply.status(400).send({message: error})
    }
  },
  getBeds: async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const beds = await prisma.bed.findMany()

      const allBeds = beds.map((bed) => {
        let data = {
          id: bed.id,
          isBusy: bed.isBusy,
          mustFasting: bed.mustFasting,
        }
        return data
      })
      reply.send(allBeds).status(200)
    } catch (error) {
      reply.status(400).send({message: error})
    }
  },

  admitPet: async (request: FastifyRequest, reply: FastifyReply) => {
    const { petId, isBusy, mustFasting, kennelId, bedId} = BedSchema.parse(request.body) 
    const contract = new ValidationContract() ;

    try {
      await contract.validateBedIsBusy(bedId, 'Leito já ocupado')
      if(contract.hadError()){
        reply.status(400).send(contract.showErrors())
        contract.clearErrors()
        return
      }
      await prisma.kennel.update({
        where: {id: kennelId}, 
        data: {
          beds: {update: {where: {id: bedId}, 
          data: {isBusy: isBusy, mustFasting: mustFasting, pet: {connect: {id: petId}}}}}}
      },)
    } catch (error) {
      reply.status(400).send({message: error})
    }
  },


  getBusyAndAdmittedPets: async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const response = await prisma.kennel.findMany({
       include: {beds: {select: {id: true, isBusy: true, mustFasting: true, pet: {select: {name: true}}}}}
      })

      const data = response.map((kennel) => {
        let data = {
          name: kennel.name,
          totalOcupedBeds: kennel.beds.filter((bed) => bed.isBusy === true).length,
          beds: kennel.beds.map((bed) => {
          const data =  {
            petName: bed.pet?.name,
            id: bed.id,
            busy: bed.isBusy,
            fasting: bed.mustFasting}
            return data
          })
        }
        return data
      })
      reply.send(data).status(200)
    } catch (error) {
      reply.status(400).send({message: error})
    }
  }
}