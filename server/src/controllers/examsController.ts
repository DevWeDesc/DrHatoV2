import { FastifyRequest, FastifyReply } from "fastify";
import { accumulatorService } from "../services/accumulatorService";
import { prisma } from "../interface/PrismaInstance";
import { z } from "zod";

type params = {
  id: string;
  recordId: string;
  title: string;
  examId: string;
  petId: string;
  accId: string;
  examName: string;
  firstLetter: string;
  queueId: string;
};
type query = {
  page: string;
};

type body = {
  RequestedByVetId: number;
  RequestedByVetName: string;
  RequestedCrm: string;
  isAdmission: boolean;
};

export const examsController = {
  getById: async (
    request: FastifyRequest<{ Params: params }>,
    reply: FastifyReply
  ) => {
    const { id } = request.params;
    try {
      const exam = await prisma.oldExams.findUnique({
        where: { codexam: parseInt(id) },
        include: {
          appicableEspecies: true,
          partExams: {
            include: { examsDetails: true },
          },
        },
      });

      reply.status(200).send(exam);
    } catch (error) {
      console.log(error);
      reply.status(400).send({ message: error });
    }
  },

  removePetExam: async (request: FastifyRequest, reply: FastifyReply) => {
    const DeleteExamForPetSchema = z.object({
      id: z.coerce.number(),
      accId: z.coerce.number(),
      examPrice: z.any(),
      linkedDebitId: z.coerce.number(),
    });
    try {
      const { id, accId, examPrice, linkedDebitId } =
        DeleteExamForPetSchema.parse(request.params);

      await accumulatorService.removePriceToAccum(Number(examPrice), accId);

      await prisma.petConsultsDebits.delete({
        where: {
          id: linkedDebitId,
        },
      });

      await prisma.examsForPet.delete({
        where: { id: id },
      });

      reply.status(203).send({
        message: "Deletado com sucesso!",
      });
    } catch (error) {
      console.log(error);
    }
  },

  finishPetExam: async (
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ) => {
    const { id } = request.params;

    try {
      await prisma.examsForPet.update({
        where: { id: parseInt(id) },
        data: { doneExame: true },
      });
    } catch (error) {
      console.log(error);
    }
  },

  getAllExams: async (
    request: FastifyRequest<{
      Params: params;
      Querystring: query;
    }>,
    reply: FastifyReply
  ) => {
    try {
      const currentPage = Number(request.query.page) || 1;
      const totalExams = await prisma.oldExams.count({
        where: {
          disponible: true,
        }
      });
      const totalPages = Math.ceil(totalExams / 35);

      const exams = await prisma.oldExams.findMany({
        skip: (currentPage - 1) * 35,
        take: 35,
        where: {
          disponible: true,
        },
        include:{
          appicableEspecies: true
        }
      });

      reply.send({ totalPages, totalExams, currentPage, exams });
    } catch (error) {
      reply.send({
        message: error,
      });
    }
  },

  getExamDetailById: async (
    request: FastifyRequest<{
      Params: params;
      Querystring: query;
    }>,
    reply: FastifyReply
  ) => {
    try {
      const { examId } = request.params;
      const exam = await prisma.oldExams.findUnique({
        where: {
          codexam: parseInt(examId),
        },
        include: {
          partExams: {
            include: { examsDetails: true },
          },
          appicableEspecies: true
        },
      });

      reply.send({
        exam,
      });
    } catch (error) {
      reply.send({
        error,
      });
    }
  },

  getByName: async (
    request: FastifyRequest<{
      Params: params;
      Querystring: query;
    }>,
    reply: FastifyReply
  ) => {
    try {
      const { examName } = request.params;

      const response = await prisma.oldExams.findMany({
        where: {
          name: { contains: examName },
          
       
        },
        include:{
          appicableEspecies: true
        }
      });

      reply.send(response);
    } catch (error) {
      console.log(error);
    }
  },

  getByLetter: async (
    request: FastifyRequest<{
      Params: params;
      Querystring: query;
    }>,
    reply: FastifyReply
  ) => {
    try {
      const { firstLetter } = request.params;

      const response = await prisma.oldExams.findMany({
        where: {
          name: { startsWith: firstLetter.toUpperCase() },
        },
        include:{
          appicableEspecies: true
        }
      });

      reply.send(response);
    } catch (error) {
      console.log(error);
    }
  },

  getExamByHealthInsurance: async (request: FastifyRequest,reply: FastifyReply) => {
    try {
      const GetHealthInsuranceExamSchema = z.object({
        planName: z.string(),
        // planProvider: z.string(),
        page: z.coerce.number()
      })
   
      const {planName,page} = GetHealthInsuranceExamSchema.parse(request.params)
      const currentPage = page || 1;
      const exams = await prisma.oldExams.findMany({
        skip: (currentPage - 1) * 35,
        take: 35,
        where: {
          HealthInsurance: {
            planName: {contains: planName},
            // planProvider: {equals: planProvider}
          }
        }
      })

     
      const totalPages = Math.ceil(exams.length / 35);

      reply.send({
        exams,
        currentPage,
        totalPages,
        totalProceds: exams.length
      })

    } catch (error) {
        console.log(error)
    }
  },


  setExamInPet: async (
    request: FastifyRequest<{
      Params: params;
      Querystring: query;
      Body: body;
    }>,
    reply: FastifyReply
  ) => {
    try {
      const { examId, petId, accId, queueId } = request.params;
      const {
        RequestedByVetId,
        RequestedByVetName,
        RequestedCrm,
        isAdmission,
      } = request.body;
      const exam = await prisma.oldExams.findUnique({
        where: { codexam: parseInt(examId) },
      });

      if (!exam) return;

      if (isAdmission === true) {
        await prisma.petConsultsDebits
          .create({
            data: {
              OpenedAdmissionsForPet: { connect: { id: queueId } },
              isExam: true,
              name: exam.name,
              price: exam.price,
              itemId: exam.codexam,
              RequestedByVetId,
              RequestedByVetName,
              sectorId: exam.sector,
            },
          })
          .then(async (res) => {
            await prisma.examsForPet.create({
              data: {
                codeExam: exam.codexam,
                name: exam.name,
                price: exam.price,
                doneExame: false,
                twoPart: exam.twoPart,
                onePart: exam.onePart,
                byReport: exam.byReport,
                requesteData: new Date(),
                requestedFor: RequestedByVetName,
                requestedCrm: RequestedCrm,
                examsType: exam.defaultLab ? ["lab"] : ["image"],
                medicine: { connect: { petId: parseInt(petId) } },
                LinkedAdmissionDebitId: res.id,
              },
            });
          });
      } else {
        await prisma.petConsultsDebits
          .create({
            data: {
              OpenedConsultsForPet: { connect: { id: queueId } },
              isExam: true,
              name: exam.name,
              price: exam.price,
              itemId: exam.codexam,
              RequestedByVetId,
              RequestedByVetName,
              sectorId: exam.sector,
            },
          })
          .then(async (res) => {
            await prisma.examsForPet.create({
              data: {
                codeExam: exam.codexam,
                name: exam.name,
                price: exam.price,
                doneExame: false,
                twoPart: exam.twoPart,
                onePart: exam.onePart,
                byReport: exam.byReport,
                requesteData: new Date(),
                requestedFor: RequestedByVetName,
                requestedCrm: RequestedCrm,
                examsType: exam.defaultLab ? ["lab"] : ["image"],
                medicine: { connect: { petId: parseInt(petId) } },
                linkedConsultDebitId: res.id,
              },
            });
          });
      }

      await accumulatorService.addPriceToAccum(exam.price, accId);

      reply.status(201).send({
        message: "Exame adicionado com sucesso!",
      });
    } catch (error) {
      reply.send({
        error,
      });
    }
  },


  createExam: async (  request: FastifyRequest, reply: FastifyReply) => {
    try {

      const CreateExamSchema = z.object({
        name: z.string(),
        price: z.number(),
        disponible: z.boolean(), 
        onePart: z.boolean(),
        twoPart: z.boolean(),
        report: z.boolean(),
        sector: z.coerce.number(),
        health_id: z.number().optional()
      })
      
      const {disponible, name, onePart, price, report, twoPart, sector, health_id} = CreateExamSchema.parse(request.body)


      await prisma.oldExams.create({
        data: {
          name,
          price,
          onePart,
          twoPart,
          byReport: report,
          disponible,
          sector,
          HealthInsurance: {
            connect: {id: health_id}
          }

        }
      })

      reply.status(201)

    } catch (error) {

      console.error(error)
    }
  },


  deleteExam: async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const DeletExamParams =  z.object({
          examId: z.coerce.number()
        })
 
        const {examId} = DeletExamParams.parse(request.params)


        await prisma.oldExams.delete({
          where: {
            codexam: examId
          }
        })


        reply.status(204)
    } catch (error) {
        console.log(error)
    }
  },
  setEspecieInExam: async (
    request: FastifyRequest<{
      Params: { examId: string; especieId: string };
    }>,
    reply: FastifyReply
  ) => {
    try {
      const { examId, especieId } = request.params;

      await prisma.oldExams.update({
        where: { codexam: parseInt(examId) },
        data: {
          appicableEspecies: {
            connect: { id: parseInt(especieId) },
          },
        },
      });

      reply.status(201);
    } catch (error) {
      reply.send(error).status(400);
    }
  },

  removeEspecieInExam: async (
    request: FastifyRequest<{
      Params: { examId: string; especieId: string };
    }>,
    reply: FastifyReply
  )=>{
    try {
      const {examId, especieId} = request.params

      await prisma.oldExams.update({
        where: {codexam: parseInt(examId)},
        data: {
          appicableEspecies: {
            disconnect: {
              id: parseInt(especieId)
            }
          }
        }
      })
    } catch (error) {
      console.error(error)
    }
  }


};
