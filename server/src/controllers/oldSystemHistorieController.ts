
import { FastifyRequest, FastifyReply } from "fastify"
import { prisma } from "../interface/PrismaInstance"
import { ResourceNotFoundError } from "../errors/ResouceNotFoundError"



export const oldSystemHistorieController =  {

  getPetOldExams: async (request: FastifyRequest<{ Params: {petId: string}}>, reply :FastifyReply) => {
    try {
        const { petId} = request.params

        const  examsHistorie = await prisma.oldExamsHistory.findMany({
          where: {
            Pets: {
              id: parseInt(petId)
            }
          }, 
          include: {Pets: {select: {CodAnimal: true}}}
        })


        if(!examsHistorie) {
          throw new ResourceNotFoundError()
        }


        reply.send({
          examsHistorie
        })

    } catch (error) {

      if(error instanceof ResourceNotFoundError) {
        reply.status(404).send({
          message: error.message,
        })

        console.log(error)
      }
      
    }
  },

  getPetOldAdmissions: async (request: FastifyRequest, reply :FastifyReply) => {
    try {
      const oldAdmissions = await prisma.oldAdmissionsHistory.findMany()

      reply.send({
        oldAdmissions
      })
    } catch (error) {
      console.log(error)
    }
  }
}