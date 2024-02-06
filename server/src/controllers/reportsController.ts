import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import prisma from "../../client";

export const reportsController = {
  reportBySector: async function (
    request: FastifyRequest,
    reply: FastifyReply
  ) {
    try {
      const ReportBySectorSchema = z.object({
        initialDate: z.string(),
        finalDate: z.string(),
      });

      const { initialDate, finalDate } = ReportBySectorSchema.parse(
        request.body
      );

      const consult = await prisma.openedConsultsForPet.findMany({
        where: {
          AND: [
            { openedDate: { gte: new Date(initialDate) } },
            { closedDate: { lt: new Date(finalDate) } },
          ],
        },
        include: {
          consultDebits: true,
        },
      });

      const proceduresByConsults = consult.flatMap((consults) => {
        return consults.consultDebits.filter(
          (c) => Number(c.consultOpenedId) !== 1
        );
      });

      const data = {
        consults: {
          procedures: proceduresByConsults,
          consultsQuantity: proceduresByConsults.length,
          consultsInvoicing: proceduresByConsults.reduce(
            (accumulator, currentValue) =>
              accumulator + Number(currentValue.price),
            0
          ),
        },
      };

      return reply.status(200).send(data);
    } catch (error) {}
  },
};
