import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { prisma } from "../interface/PrismaInstance";



export const healthInsuranceController = {
  createHealthInsurance: async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const createHealthInsuranceSchema = z.object({
        planName              : z.string().optional(),
        disponible            : z.boolean(),
        planProvider          : z.string(),
        graceDays             : z.coerce.number().optional(),
        coverageLimit         : z.coerce.number().optional(),
        admissionDeduction    : z.coerce.number().optional(),
        disponibleAtAdmission : z.boolean().optional()
      })

      const {disponible, planProvider, admissionDeduction, coverageLimit, disponibleAtAdmission, graceDays, planName} = createHealthInsuranceSchema.parse(request.body)

    const healthPlan =  await prisma.healthInsurance.create({
        data: {
          disponible, planProvider,admissionDeduction, coverageLimit, disponibleAtAdmission, graceDays, planName
        }
      })


      reply
      .status(201)
      .send({healthPlan})

    } catch (error) {
      console.log(error)
    }
  },

  editHealthInsurance: async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const editHealthInsuranceSchema = z.object({
        planId: z.coerce.number(),
        planName              : z.string().optional(),
        disponible            : z.boolean(),
        planProvider          : z.string(),
        graceDays             : z.coerce.number().optional(),
        coverageLimit         : z.coerce.number().optional(),
        admissionDeduction    : z.coerce.number().optional(),
        disponibleAtAdmission : z.boolean().optional()
      })

      const {planId, disponible, planProvider, admissionDeduction, coverageLimit, disponibleAtAdmission, graceDays, planName} = editHealthInsuranceSchema.parse(request.body)

    const healthPlan =  await prisma.healthInsurance.update({
      where: {
        id: planId
      },
        data: {
          disponible, planProvider,admissionDeduction, coverageLimit, disponibleAtAdmission, graceDays, planName
        }
      })
      reply
      .status(201)
      .send({healthPlan})
    } catch (error) {
      console.log(error)
    }
  },

  removeHealthInsurance: async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const editHealthInsuranceSchema = z.object({
        planId: z.coerce.number(),
        
      })

      const {planId} = editHealthInsuranceSchema.parse(request.params)

   await prisma.healthInsurance.delete({
      where: {
        id: planId
      },
      })
      reply
      .status(204)
      .send({message: "Plano removido"})
    } catch (error) {
      console.log(error)
    }
  },


  getHealthInsuranceById: async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const editHealthInsuranceSchema = z.object({
        planId: z.coerce.number(),
        
      })

      const {planId} = editHealthInsuranceSchema.parse(request.params)

   const healthInsurance = await prisma.healthInsurance.findUnique({
      where: {
        id: planId
      },
      include: {
        exams: true,
        procedures: true,
        surgeries: true,
        vaccines: true
      }
      })
      reply
      .status(200)
      .send({healthInsurance})

    } catch (error) {
      console.log(error)
    }
  },

  getAllHealthInsurance: async (request: FastifyRequest, reply: FastifyReply) => {
    try {
  
   const healthInsurance = await prisma.healthInsurance.findMany({
      })
      reply
      .status(200)
      .send({healthInsurance})

    } catch (error) {
      console.log(error)
    }
  },
}