import { FastifyRequest, FastifyReply } from "fastify";
import { prisma } from "../interface/PrismaInstance";
import { z } from "zod";
import { accumulatorService } from "../services/accumulatorService";


type params = {
  id: string;
  recordId: string;
  accId: string, 
  sugPrice: string;
}
export const surgeriesController = {
  createSurgerie: async (request: FastifyRequest, reply: FastifyReply) => {
    const SurgerieSchema = z.object({
      name: z.string(),
      price: z.number()
    })
    const {name,price,} =  SurgerieSchema.parse(request.body) 
      try {
        await prisma.surgeries.create({
          data: {
            name,price,
          }
        })

        reply.send("Nova cirurgia criada com sucesso!").status(200)
      } catch (error) {
        reply.send({message: error})
        console.log(error)
      }
  },

  getSurgeries: async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const surgeries = await prisma.surgeries.findMany()

        reply.send(surgeries).status(200)   
       } catch (error) {
        reply.send({message: error})
        console.log(error)
    }
  },

  setSurgerieInPet: async (request: FastifyRequest<{ Params: params }>, reply: FastifyReply) => {
    const { id, recordId, accId} = request.params
    try {
      const surgerie = await prisma.surgeries.findUnique({
        where:{id: parseInt(id)}
      })
      if(!surgerie) {
        reply.status(400).send("Falha ao buscar vacina/Falha ao criar vacina")
         return
      }
      await prisma.surgeriesForPet.create({data: {name: surgerie.name, price: surgerie.price, medicine: {connect: {id:parseInt(recordId)}}}})
      await accumulatorService.addPriceToAccum(Number(surgerie.price), accId)
      reply.send("Cirurgia adiciona ao pet com sucesso").status(200)
    } catch (error) {
      reply.send({message: error})
      console.log(error)
    }
  },

  excludePetSugerie: async (request: FastifyRequest<{ Params: params }>, reply: FastifyReply) => {
     const {id, accId, sugPrice } = request.params
     try {

       await accumulatorService.removePriceToAccum(Number(sugPrice), accId)

        await prisma.surgeriesForPet.delete({
          where: {id: parseInt(id)}
        })
        reply.send("Deletado com sucesso").status(203)
     } catch (error) {
      reply.send({message: error})
      console.log(error)
     }
  },


  

  


}