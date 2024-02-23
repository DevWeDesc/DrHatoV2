import { FastifyReply, FastifyRequest } from "fastify"
import z from 'zod'
import { prisma } from "../interface/PrismaInstance"



export const examsPartsController = {
  createExamPartSession: async  (req: FastifyRequest, rep: FastifyReply) => {
    const CreatePartExamParamsSchema = z.object({
      codexam: z.coerce.number()
    })
    const {codexam} = CreatePartExamParamsSchema.parse(req.params)

    const CreatePartExamBodySchema = z.object({
      partName: z.string(),
      isMultiPart: z.boolean().optional(),
      isByText: z.boolean().optional(),
      isFirst: z.boolean().optional(),

    })

    const {...data} = CreatePartExamBodySchema.parse(req.body)
    try {
      if(data.isMultiPart) {

      } else if(data.isByText) {
   
      } else {
        await prisma.partExams.create({
          data: {
            isFirst: true,
            partName: data.partName,
            OldExams: {
              connect: {codexam}
            },
          }
        })
      }
    } catch (error) {
      console.log(error)
    }
  }
}