import { FastifyRequest, FastifyReply } from "fastify";
import { prisma } from "../interface/PrismaInstance";
import { labService } from "../services/labsService";
import { Prisma } from "@prisma/client";
import { z } from "zod";
import templateMultiPartExamResultPdf from "../genericPDFs/templateMultiPartExamResultPdf";
import templateByTextExamResultPdf from "../genericPDFs/templateByTextExamResultPdf";
import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import { templateContent } from "../genericPDFs/templateContent";
import templateOnePartExamResultPdf from "../genericPDFs/templateOnePartExamResultPdf";
import path from "path";
import fs from "fs";

interface CustomFastifyRequest extends FastifyRequest {
  files: () => any;
}

export const labsController = {
  getOpenExamsInLab: async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const exams = await prisma.examsForPet.findMany({
        where: {
          doneExame: false,
        },
        orderBy: { requesteData: "asc" },
        include: {
          medicine: { select: { pet: { select: { name: true, id: true } } } },
        },
      });

      const examsdefault = await prisma.oldExams.findMany({
        select: { codexam: true, name: true },
      });

      const allExams = examsdefault;

      reply.status(200).send({ exams, allExams });
    } catch (error) {
      reply.send({ message: { error } }).status(400);
      console.log(error);
    }
  },

  getEndExamsInlab: async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const exams = await prisma.examsForPet.findMany({
        where: {
          doneExame: true,
        },
        orderBy: { requesteData: "asc" },
        include: {
          medicine: { select: { pet: { select: { name: true, id: true } } } },
        },
      });

      const examsdefault = await prisma.oldExams.findMany({
        select: { codexam: true, name: true },
      });

      const allExams = examsdefault;

      reply.status(200).send({ exams, allExams });
    } catch (error) {
      reply.send({ message: { error } }).status(400);
      console.log(error);
    }
  },
  searchExamsBy: async (
    request: FastifyRequest<{
      Querystring: { name?: string; data?: string; petName?: string };
    }>,
    reply: FastifyReply
  ) => {
    const name = request.query.name;
    const requesteData = request.query.data;
    const petName = request.query.petName;
    try {
      const result = await prisma.examsForPet.findMany({
        where: {
          OR: [
            {
              requesteData: { gte: requesteData },
              name: { startsWith: name },
              medicine: { pet: { name: { startsWith: petName } } },
            },
          ],
        },
        include: { medicine: { select: { pet: { select: { name: true } } } } },
      });

      const completeResult = result.map((exam) => {
        let examData = {
          id: exam.id,
          name: exam.name,
          price: exam.price,
          data: exam.requesteData,
          petName: exam.medicine.pet.name,
          done: exam.doneExame,
          requested: exam.requestedFor,
        };
        return examData;
      });

      reply.send(completeResult).status(200);
    } catch (error) {
      reply.send({ message: error }).status(400);
      console.log(error);
    }
  },
  searchImgExams: async (
    request: FastifyRequest<{
      Querystring: { name?: string; data?: string; petName?: string };
    }>,
    reply: FastifyReply
  ) => {
    const name = request.query.name;
    const requesteData = request.query.data;
    const petName = request.query.petName;
    try {
      const result = await prisma.examsForPet.findMany({
        where: {
          OR: [
            {
              requesteData: { gte: requesteData },
              name: { startsWith: name },
              medicine: { pet: { name: { startsWith: petName } } },
            },
          ],
        },
        include: { medicine: { select: { pet: { select: { name: true } } } } },
      });

      const validateImgExam = result.map((exam) => {
        let data;
        exam.examsType.includes("image")
          ? (data = {
              id: exam.id,
              name: exam.name,
              price: exam.price,
              data: exam.requesteData,
              petName: exam.medicine.pet.name,
              done: exam.doneExame,
              requested: exam.requestedFor,
            })
          : null;

        return data;
      });

      reply.status(200).send(validateImgExam);
    } catch (error) {
      reply.status(200).send({ message: error });
    }
  },

  reportAnExam: async (
    request: FastifyRequest<{ Params: { examId: string } }>,
    reply: FastifyReply
  ) => {
    const { examId } = request.params;
    try {
      const { jsonString, responsible, responsibleCrm }: any = request.body;

      await labService.reportExam(examId, jsonString);

      await prisma.examsForPet.update({
        where: { id: parseInt(examId) },
        data: {
          doneExame: true,
          responsibleForExam: responsible,
          responsibleForCrm: responsibleCrm,
          byReport: true,
        },
      });
    } catch (error) {
      console.log(error);
    }
  },

  reportTableExam: async (
    request: FastifyRequest<{
      Params: { examId: string };
      Body: {
        reportedFor: string;
        reportedForCrm: string;
      } & Prisma.ReportForExamsCreateInput;
    }>,
    reply: FastifyReply
  ) => {
    const { examId } = request.params;
    const { report, onePart, twoPart, byReport, reportedFor, reportedForCrm } =
      request.body;
    try {
      await prisma.examsForPet.update({
        where: { id: parseInt(examId) },
        data: {
          doneExame: true,
          onePart,
          twoPart,
          responsibleForExam: reportedFor,
          byReport,
          responsibleForCrm: reportedForCrm,
        },
      });

      await prisma.reportForExams.create({
        data: {
          onePart,
          twoPart,
          byReport,
          report,
          examsForPet: { connect: { id: parseInt(examId) } },
        },
      });

      reply.send("Exame laudado");
    } catch (error) {
      console.log(error);
      reply.send({ message: error });
    }
  },

  reportWithPdf: async (
    request: CustomFastifyRequest,
    reply: FastifyReply
  ) => {
    try {
      const { examId } = request.params as { examId: string };
      const files = request.files();

      const paths = await labService.saveExamPdfs(files);

      if (!paths || paths.length <= 0) return;

      await prisma.examsForPet.update({
        where: { id: parseInt(examId) },
        data: {
          reportExams: {
            create: {
              externalReportIds: paths,
            },
          },
        },
      });
    } catch (error) {
      reply.send({ message: error });
      console.log(error);
    }
  },

  showExamsFiles: async (
    request: FastifyRequest<{ Params: { examId: string } }>,
    reply: FastifyReply
  ) => {
    const { examId } = request.params;
    try {
      // Definir o tipo de conteúdo como application/pdf
      // reply.type('application/pdf');
      // Ler o arquivo PDF usando fs.createReadStream()
      reply.header("Content-Disposition", `attachment; filename="${examId}"`);
      const data = await labService.returnExamFile(examId);

      reply.send(data);
    } catch (error) {
      console.log(error);
    }
  },

  getOnePartExamResultById: async (
    request: FastifyRequest<{ Params: { examId: string } }>,
    reply: FastifyReply
  ) => {
    try {
      const { examId } = request.params;
      const examDetails = await prisma.examsForPet.findUnique({
        where: { id: parseInt(examId) },
        include: {
          reportExams: true,
          medicine: {
            include: {
              pet: { include: { customer: { select: { name: true } } } },
            },
          },
        },
      });

      if (!examDetails) {
        return;
      }

      const examRefs = await prisma.oldExams.findFirst({
        where: { name: { equals: examDetails.name } },
        include: { partExams: { include: { examsDetails: true } } },
      });

      const petExamResult = {
        solicitedBy: examDetails.requestedFor,
        solicitedDate: examDetails.requesteData,
        solicitedCrm: examDetails.requestedCrm,
        reportedBy: examDetails.responsibleForExam,
        reportedByCrm: examDetails.responsibleForCrm,
        examName: examDetails.name,
        petName: examDetails.medicine.pet.name,
        petEspecie: examDetails.medicine.pet.especie,
        petAge: examDetails.medicine.pet.bornDate,
        petRace: examDetails.medicine.pet.race,
        petSex: examDetails.medicine.pet.sexo,
        petCod: examDetails.medicine.pet.CodAnimal,
        petCustomer: examDetails.medicine.pet.customer.name,
        // result: examDetails.reportExams[0].report
        result: examDetails.reportExams.find((item) => item.report !== null)
          ?.report,
        resultPDF: examDetails.reportExams.filter(
          (item) => item.externalReportIds.length > 0
        ),
      };

      const petExamRefs = examRefs?.partExams;

      const refByEspecie = examRefs?.partExams[0].examsDetails.filter(
        (item) => {
          item.agesTwo?.includes(`${petExamResult.petEspecie}`);
        }
      );

      reply.send({ petExamResult, petExamRefs, refByEspecie }).status(200);
    } catch (error) {
      reply.send(error);
    }
  },
  emailService: async ({ email, pdfs }: { email: string; pdfs: Buffer[]; }): Promise<SMTPTransport.SentMessageInfo> => {
    
    const transporter = nodemailer.createTransport({
      host: "smtp-mail.outlook.com",
      port: 587,
      secure: false,
      auth: {
        user: "glaucoedtester@outlook.com",
        pass: "Glaucoed@1",
      },
    });

    const responseSendEmail = await transporter.sendMail({
      from: `"Dr Hato Hospital Veterinário" <glaucoedteste@hotmail.com>`,
      to: email,
      subject: "Resultado de Exame",
      html: templateContent,
      attachments: pdfs.map((pdf, index: number) => {
        return {
          filename: `ResultadoExame${index +1}.pdf`,
          content: pdf,
          contentType: "application/pdf",
        };
      }),
    });
    return responseSendEmail;
  },

  generatePdf: async (pdfId: string): Promise<Buffer> => {
    try {
      const filePath = path.join(__dirname, "..", "pdfs_images", pdfId);
      const pdf = fs.readFileSync(filePath);

      if (!fs.existsSync(filePath)) {
        throw new Error("File not found");
      }

      const dataPDF = await Promise.resolve(pdf);
      return dataPDF;

    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  sendMultiPartExamResultById: async (
    request: FastifyRequest<{
      Params: { examId: string };
      Body: { examDetails: any; examCharacs: any };
    }>,
    reply: FastifyReply
  ) => {
    try {

      const { examDetails, examCharacs } = request.body;
      const result = await templateMultiPartExamResultPdf({ examDetails, examCharacs });
      let data:Buffer[] = [];

      if(examDetails.resultPDF.length > 0){
        const  pdfName =  examDetails.resultPDF[0].externalReportIds[0]
        const pdfGenerated  = await labsController.generatePdf(pdfName);
        data = [pdfGenerated, result];
      }

      const responseEmailService = await labsController.emailService({
        email: "glauco.powergames@gmail.com",
        pdfs: data.length > 0 ? data : [result],
      });

      reply.send(responseEmailService).status(200);

    } catch (error) {
      reply.send(error).status(500);
    }
  },

  sendByTextExamResultPdf: async (
    request: FastifyRequest<{
      Params: { examId: string };   
      Body: { examDetails: any };
    }>,
    reply: FastifyReply
  ) => {
    try {

      const { examDetails } = request.body;
      let data:Buffer[] = [];
      const result = await templateByTextExamResultPdf({ examDetails });

      if(examDetails.resultPDF.length > 0){
        const  pdfName =  examDetails.resultPDF[0].externalReportIds[0]
        const pdfGenerated  = await labsController.generatePdf(pdfName);
        data = [ pdfGenerated, result];
      }

      const responseEmailService = await labsController.emailService({
        email: "glauco.powergames@gmail.com",
        pdfs: data.length > 0 ? data : [result],
      });

      reply.send(responseEmailService).status(200);

    } catch (error) {
      console.log(error);
      reply.send(error).status(500);
    }
  },

  sendOnePartExamResultPdf: async (
    request: FastifyRequest<{ Body: { examDetails: any; examCharacs: any } }>,
    reply: FastifyReply
  ) => {
    try {
      const { examDetails, examCharacs } = request.body;
      const result = await templateOnePartExamResultPdf({ examDetails, examCharacs });
      let data:Buffer[] = [];

      if(examDetails.resultPDF.length > 0){
        const  pdfName =  examDetails.resultPDF[0].externalReportIds[0]
        const pdfGenerated  = await labsController.generatePdf(pdfName);
        data = [ pdfGenerated, result];
      }

      const responseEmailService = await labsController.emailService({
        email: "glauco.powergames@gmail.com",
        pdfs: data.length > 0 ? data : [result],
      });

      reply.send(responseEmailService).status(200);

    } catch (error) {
      reply.send(error).status(500);
    }
  },

  getInsertedExam: async (
    request: FastifyRequest<{ Params: { pdfId: string } }>,
    reply: FastifyReply
  ): Promise<Buffer> => {
    try {
      const { pdfId } = request.params;
      const filePath = path.join(__dirname, "..", "pdfs_images", pdfId);
      const pdf = fs.readFileSync(filePath);

      if (!fs.existsSync(filePath)) {
        throw new Error("File not found");
      }

      const dataPDF = await Promise.resolve(pdf);

      reply.type("application/pdf");
      return reply.send(dataPDF);
      
    } catch (error) {
      console.log(error);
      throw error;
    }
  },



  getMultiPartExamResultById: async (
    request: FastifyRequest<{ Params: { examId: string } }>,
    reply: FastifyReply
  ) => {
    try {
      const { examId } = request.params;
      const examDetails = await prisma.examsForPet.findUnique({
        where: { id: parseInt(examId) },
        include: {
          reportExams: true,
          medicine: {
            include: {
              pet: { include: { customer: { select: { name: true } } } },
            },
          },
        },
      });

      if (!examDetails) {
        return;
      }

      const examRefs = await prisma.oldExams.findFirst({
        where: { name: { contains: examDetails.name } },
        include: { partExams: { include: { examsDetails: true } } },
      });

      const petExamResult = {
        solicitedBy: examDetails.requestedFor,
        solicitedDate: examDetails.requesteData,
        solicitedCrm: examDetails.requestedCrm,
        reportedBy: examDetails.responsibleForExam,
        reportedByCrm: examDetails.responsibleForCrm,
        examName: examDetails.name,
        petName: examDetails.medicine.pet.name,
        petEspecie: examDetails.medicine.pet.especie,
        petAge: examDetails.medicine.pet.bornDate,
        petRace: examDetails.medicine.pet.race,
        petSex: examDetails.medicine.pet.sexo,
        petCod: examDetails.medicine.pet.CodAnimal,
        petCustomer: examDetails.medicine.pet.customer.name,
        petCustomerEmail: examDetails.medicine.pet.customer_id,
        // result: examDetails.reportExams[0],
        result: examDetails.reportExams.find((item) => item.report !== null),
        resultPDF: examDetails.reportExams.filter((item) => item.externalReportIds.length > 0),
      };

      reply.send({ petExamResult, examRefs }).status(200);
    } catch (error) {
      console.log(error);
      reply.send(error);
    }
  },

  getTextExamResultById: async (
    request: FastifyRequest<{ Params: { examId: string } }>,
    reply: FastifyReply
  ) => {
    try {
      const { examId } = request.params;
      const examDetails = await prisma.examsForPet.findUnique({
        where: { id: parseInt(examId) },
        include: {
          reportExams: true,
          medicine: {
            include: {
              pet: { include: { customer: { select: { name: true } } } },
            },
          },
        },
      });

      if (!examDetails) {
        return;
      }

      const petExamResult = {
        solicitedBy: examDetails.requestedFor,
        solicitedDate: examDetails.requesteData,
        solicitedCrm: examDetails.requestedCrm,
        reportedBy: examDetails.responsibleForExam,
        reportedByCrm: examDetails.responsibleForCrm,
        examName: examDetails.name,
        petName: examDetails.medicine.pet.name,
        petEspecie: examDetails.medicine.pet.especie,
        petAge: examDetails.medicine.pet.bornDate,
        petRace: examDetails.medicine.pet.race,
        petSex: examDetails.medicine.pet.sexo,
        petCod: examDetails.medicine.pet.CodAnimal,
        petCustomer: examDetails.medicine.pet.customer.name,
        // result: examDetails.reportExams[0].textReport
        result: examDetails.reportExams.find((item) => item.textReport !== null)?.textReport, 
        resultPDF: examDetails.reportExams.filter((item) => item.externalReportIds.length > 0),
      };

      reply.send({ petExamResult }).status(200);
    } catch (error) {
      console.log(error);
      reply.send(error);
    }
  },

  getPetOpenedExamDetails: async (
    request: FastifyRequest,
    reply: FastifyReply
  ) => {
    try {
      const GetDetailsSchema = z.object({
        petId: z.coerce.number(), 
      });
      const { petId } = GetDetailsSchema.parse(request.params);

      const petDetails = await prisma.pets.findUnique({
        where: {
          id: petId,
        },
        include: {
          customer: {
            select: {
              name: true,
            },
          },
          medicineRecords: {
            include: {
              petExams: {
                where: { doneExame: false },
              },
            },
          },
        },
      });

      reply.send(petDetails);
    } catch (error) {
      console.error(error);
    }
  },
};
