import { FastifyRequest, FastifyReply } from "fastify";
import { accumulatorService } from "../services/accumulatorService";
import { prisma } from "../interface/PrismaInstance";

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
}

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
            partExams: {
              include: {examsDetails: true}
            }
        },
      });

      reply.status(200).send(exam);
    } catch (error) {
      console.log(error);
      reply.status(400).send({ message: error });
    }
  },


  removePetExam: async (
    request: FastifyRequest<{
      Params: { id: string; accId: string; examPrice: string };
    }>,
    reply: FastifyReply
  ) => {
    const { id, accId, examPrice } = request.params;
    try {
      await accumulatorService.removePriceToAccum(Number(examPrice), accId);

      await prisma.examsForPet.delete({
        where: { id: parseInt(id) },
      });

      reply.status(200).send("Sucesso ao deletar");
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
      const totalExams = await prisma.oldExams.count();
      const totalPages = Math.ceil(totalExams / 35);

      const exams = await prisma.oldExams.findMany({
        skip: (currentPage - 1) * 35,
        take: 35,
        where: {
          disponible: true,
        },
      });

      reply.send({ totalPages, totalExams, exams });
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
      });

      reply.send(response);
    } catch (error) {
      console.log(error);
    }
  },

  setExamInPet: async (    request: FastifyRequest<{
    Params: params;
    Querystring: query;
    Body: body
  }>,
  reply: FastifyReply) => {
    try {

        const {examId, petId, accId, queueId} = request.params
        const { RequestedByVetId, RequestedByVetName, RequestedCrm, isAdmission} = request.body
        const exam = await prisma.oldExams.findUnique({where: {codexam: parseInt(examId)}})

        if(!exam) return

        if(isAdmission === true) {
          await prisma.petConsultsDebits.create({
            data: {
                OpenedAdmissionsForPet: {connect: {id: queueId}},
                isExam: true,
                name: exam.name,
                price: exam.price,
                itemId: exam.codexam,
                RequestedByVetId,
                RequestedByVetName
            }
        })
        } else {
          await prisma.petConsultsDebits.create({
            data: {
                OpenedConsultsForPet: {connect: {id: queueId}},
                isExam: true,
                name: exam.name,
                price: exam.price,
                itemId: exam.codexam,
                RequestedByVetId,
                RequestedByVetName
            }
        })
        }


        await prisma.examsForPet.create({
          data: {
            name: exam.name,
            price: exam.price,
            doneExame: false,
            twoPart: exam.twoPart,
            onePart: exam.onePart,
            byReport: exam.byReport,
            requesteData: new Date(),
            requestedFor: RequestedByVetName,
            requestedCrm: RequestedCrm,
            examsType: exam.defaultLab ? ['lab'] : ['image'],
            medicine: { connect: { petId: parseInt(petId) } },
          },
        });
        
        await accumulatorService.addPriceToAccum(exam.price, accId);



        reply.send("Success").status(200)
   
        
    } catch (error) {
    reply.send({
        error,
      });
    }
  }

}