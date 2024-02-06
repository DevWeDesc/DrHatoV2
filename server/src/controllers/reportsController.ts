import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import prisma from "../../client";








export const reportsController = {
  reportBySector: async function (request: FastifyRequest, reply: FastifyReply) {
    try {
      const ReportBySectorSchema = z.object({
        initialDate: z.date(),
        finalDate: z.date()
      })

      const {initialDate, finalDate} = ReportBySectorSchema.parse(request.body)

      const consult = await prisma.openedConsultsForPet.findMany({
        where: {
          AND: [
            {openedDate: {gte: initialDate}},
            {closedDate: {lt: finalDate}}
          ]
        },
        include: {
          consultDebits: true
        }
      })

      const proceduresByConsults = consult.flatMap((consults) => {
        return consults.consultDebits.filter((c) => c.sectorId === 1)
      })

      const data = {
        consults: {
          procedures: proceduresByConsults,
          consultsQuantity: proceduresByConsults.length,
          consultsInvoicing: proceduresByConsults.reduce((accumulator, currentValue) => accumulator + Number(currentValue.price), 0)
        }
      }

    } catch (error) {
      
    }
  }
}