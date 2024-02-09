import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import prisma from "../../client";
import { OutpatientAdmissionsAndConsultsReportSector } from "../services/reports/outpatient-report-sector";
import { LabsAdmissionsAndConsultsReportSector } from "../services/reports/labs-report-sector";
import { LabsImageAdmissionsAndConsultsReportSector } from "../services/reports/labimage-report-sector";
import { SurgeriesAdmissionsAndConsultsReportSector } from "../services/reports/surgerie-report-sector";
import { CardiologyAdmissionsAndConsultsReportSector } from "../services/reports/cardiology-report-sector";
import { AnesthesiaAdmissionsAndConsultsReportSector } from "../services/reports/anesthesia-report-sector";
import { GetSectorsReport } from "../services/reports/all-sectors-reports";

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
      
      const openedDay = new Date(initialDate).setHours(0, 0, 0, 0)
      const endDay = new Date(finalDate).setHours(0,0,0,0)

      // const outpatient = await OutpatientAdmissionsAndConsultsReportSector(openedDay, endDay)
      // const labs =  await LabsAdmissionsAndConsultsReportSector(openedDay, endDay)
      // const labsImage = await LabsImageAdmissionsAndConsultsReportSector(openedDay, endDay)
      // const surgeries = await SurgeriesAdmissionsAndConsultsReportSector(openedDay, endDay)
      // const cardiology = await CardiologyAdmissionsAndConsultsReportSector(openedDay,endDay)
      // const anesthesia = await AnesthesiaAdmissionsAndConsultsReportSector(openedDay, endDay)

      const reports = await GetSectorsReport(openedDay, endDay)

      const data = {
        reports
        // outpatient,
        // labs,
        // labsImage,
        // surgeries,
        // cardiology,
        // anesthesia
      }
        
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
