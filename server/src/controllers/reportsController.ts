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

      //// E UM RELATORIO DE SETORES NAO MUDAR A LÓGICA, E PRA TRAZER O ID DO SETOR DO AMBULATORIO(CONSULTS).
      /// ESSE SECTOR ID AINDA NÃO ESTÁ SENDO SALVO NO FRONT VOU PASSAR A LÓGICA DISSO AMANHÃ.
      const proceduresByConsults = consult.flatMap((consults) => {
        return consults.consultDebits.filter((c) => c.sectorId === 1);
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

  reportExamsConclused: async function (
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

      const examsAllFiltered = await prisma.examsForPet.findMany({
        where: {
          AND: [
            // Quando uma consulta for concluida dar um update na tabela examsForPet no campo doneExame para true
            { doneExame: true },
            { requesteData: { gte: new Date(initialDate) } },
            { updatedAt: { lt: new Date(finalDate) } },
          ],
        },
      });

      const data = {
        exams: {
          examsAll: examsAllFiltered,
          consultsQuantity: examsAllFiltered.length,
          consultsInvoicing: examsAllFiltered.reduce(
            (accumulator, examValue) => accumulator + Number(examValue.price),
            0
          ),
        },
      };

      return reply.send(data);
    } catch (error) {}
  },
};
