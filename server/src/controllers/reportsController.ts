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
        include:{
          medicine: {
            select: {pet: {select: {name: true, CodAnimal: true, especie: true, customer: {
              select: {name: true, email: true, tell: true, phone: true}
            }}},}
          }
        }
      });

      const exams = await prisma.oldExams.findMany()
      const sectors =  await prisma.sectors.findMany()


      const data = examsAllFiltered.map((data) => {
        const filtered = {
          // data do último update (onde deixa o doneExam True)
        date: data.updatedAt,
        customerName: data?.medicine.pet?.customer?.name,
        customerEmail: data?.medicine.pet?.customer?.email,
        customerTell: data?.medicine.pet?.customer?.tell,
        customerPhone: data?.medicine.pet?.customer?.phone,
        examName: data.name,
        examPrice: Number(data.price),
        petName: `${data.medicine?.pet?.name} - ${data.medicine?.pet?.CodAnimal}`,
        petEsp: data?.medicine.pet?.especie,
        responsibleVet: data?.responsibleForExam,
        sector: sectors.find((sector) => sector.id === exams.find(exam => exam.name === data.name)?.sector)?.name
        }

        return filtered
      })
   
      return reply.send(data);
    } catch (error) {}
  },
};
