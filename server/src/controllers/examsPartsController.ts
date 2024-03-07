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
  },


  createExamPartCharacteristics: async  (req: FastifyRequest, rep: FastifyReply) => {

    try {
      const CreatePartCharacteristicsParamSchema = z.object({
        sessionId: z.coerce.number()
      })
      const { sessionId} = CreatePartCharacteristicsParamSchema.parse(req.params)
      const CreatePartCharacteristicsBodySchema = z.object({
        caracteristic: z.string().optional(),
        relativeUnit: z.string().optional(),
        absoluteUnit: z.string().optional(),
        agesOne: z.string().optional(),
        minAgesOne: z.string().optional(),
        maxAgesOne: z.string().optional(),
        agesTwo: z.string().optional(),
        minAgesTwo: z.string().optional(),
        maxAgesTwo: z.string().optional(),
        agesThree: z.string().optional(),
        minAgesThree: z.string().optional(),
        maxAgesThree: z.string().optional(),
        parts: z.number().optional(),
    });
  
     const {...data} = CreatePartCharacteristicsBodySchema.parse(req.body)


      await prisma.partDetails.create({
        data: {
              caracteristic: data.caracteristic,
              relativeUnit : data.relativeUnit,
              absoluteUnit : data.absoluteUnit,
              agesOne      : data.agesOne,
              minAgesOne   : data.minAgesOne,
              maxAgesOne   : data.maxAgesOne,
              agesTwo      : data.agesTwo,
              minAgesTwo   : data.minAgesTwo,
              maxAgesTwo   : data.maxAgesTwo,
              agesThree    : data.agesThree,
              minAgesThree : data.minAgesThree,
              maxAgesThree : data.maxAgesThree,
              parts     : data.parts,
              PartExams: {
                connect: {
                 id: sessionId
                }
              }
        }
      })

       rep.status(201).send({message: 'Criado com sucesso!'})
 
    } catch (error) {
      console.log(error)
      rep.send(error)
    }
  }
}