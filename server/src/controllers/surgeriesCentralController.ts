import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { prisma } from "../interface/PrismaInstance";








export const surgeriesCentralController = {
  createCentralSurgerie: async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      
      const createCentralSurgerieSchema = z.object({
          centralName: z.string(),
          closedHours: z.string(),
          openHours: z.string(),
          isOpen: z.coerce.boolean(),
          maxSlots: z.coerce.number(),
          movimentedValues: z.number().optional(),
          surgeriesCompleteds: z.number().optional(),

      })

      const {centralName, closedHours,
      isOpen, openHours,
     movimentedValues,
      surgeriesCompleteds, maxSlots} = createCentralSurgerieSchema.parse(request.body)

      const allSlots = [];
      for (let index = 1; index <= maxSlots; index++) {
        allSlots.push({});
      }

      const surgerieCentral = await prisma.surgeriesCentral.create({
        data: {
          centralName,
          closedHours,
          isOpen,
          maxSlots,
          openHours,
          movimentedValues,
          surgeriesCompleteds,
          surgerieSlots: {
            createMany: {
              data: allSlots
            }
          }

        }
      })

      reply.status(201).send(surgerieCentral)
    } catch (error) {
      console.log(error)
    }
  },

  editCentralSurgerie: async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      
      const editCentralSurgerieSchema = z.object({
         centralId: z.number(),
          centralName: z.string().optional(),
          closedHours: z.string().optional(),
          openHours: z.string().optional(),
          isOpen: z.coerce.boolean().optional(),
          maxSlots: z.coerce.number().optional(),
          movimentedValues: z.number().optional(),
          surgeriesCompleteds: z.number().optional(),

      })

      const {centralId, centralName, closedHours,
      isOpen, openHours,
     movimentedValues,
      surgeriesCompleteds, maxSlots} = editCentralSurgerieSchema.parse(request.body)


      const surgerieCentral = await prisma.surgeriesCentral.update({

        where: {
          id: centralId
        },
        data: {
          centralName,
          closedHours,
          isOpen,
          maxSlots,
          openHours,
   
          movimentedValues,
          surgeriesCompleteds
        }
      })

      reply.status(201).send(surgerieCentral)
    } catch (error) {
      console.log(error)
    }
  },

  excludeCentralSurgerie: async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      
      const excludeCentralSurgerieSchema = z.object({
         centralId: z.coerce.number()})

      const {centralId} = excludeCentralSurgerieSchema.parse(request.params)


    await prisma.surgeriesCentral.delete({

        where: {
          id: centralId
        },
      })

      reply.status(204)
    } catch (error) {
      console.log(error)
    }
  },

  findCentralSurgerieById: async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      
      const findCentralSurgerieSchema = z.object({
         centralId: z.coerce.number()})

      const {centralId} = findCentralSurgerieSchema.parse(request.params)


    const centralSurgerie = await prisma.surgeriesCentral.findUnique({
        where: {
          id: centralId
        },
        include: {
          surgerieSlots: true
        }
      })

      reply.send({
        centralSurgerie
      })
    } catch (error) {
      console.log(error)
    }
  },

  findAllCentralSurgeries:  async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      
    const centralSurgerie = await prisma.surgeriesCentral.findMany(
      {
        include: {
          surgerieSlots: true
        }
      }
    )

      reply.send({
        centralSurgerie
      })
    } catch (error) {
      console.log(error)
    }
  },

  reserveSlot: async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const reserveSlotSchema = z.object({
          slotId: z.number(),
					petName: z.string().optional(),
					petId: z.number().optional(),
					surgerieName: z.string().optional(),
					vetName: z.string().optional(),
					vetCrmv: z.string().optional(),
        })  

        const {petId, petName, slotId, vetCrmv, vetName,surgerieName} = reserveSlotSchema.parse(request.body)

         await prisma.surgerieSlots.update({
          where: {id: slotId},data: {
            petId,petName, surgerieName, vetCrmv, vetName
          }
         })


         reply.status(204).send({message: 'Reservado com sucesso!'})
    } catch (error) {
        console.log(error)
    }
  }



} 