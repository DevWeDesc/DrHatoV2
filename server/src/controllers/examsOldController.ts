import { FastifyRequest, FastifyReply } from "fastify";
import { ValidationContract } from "../validators/userContract";
import { ExamSchema } from "../schemas/schemasValidator";
import { accumulatorService } from "../services/accumulatorService";
import { prisma } from "../interface/PrismaInstance";

type params = {
  examId: string;
};
type query = {
    page: string;
}

export const oldExamsController = {
    getAllExams: async (request: FastifyRequest<{
        Params: params,
        Querystring: query
    }>, reply: FastifyReply) => {
        try {
                const currentPage = Number(request.query.page) || 1;
                const totalExams = await prisma.oldExams.count();
                const totalPages = Math.ceil(totalExams / 35);


            const exams = await prisma.oldExams.findMany({
                skip: (currentPage - 1) * 35,
                take: 35,
                where: {
                    disponible: true
                }
            })

            reply.send({ totalPages, totalExams, exams})

        } catch (error) {

            reply.send({
                message: error
            })

        }
    },

    getExamDetailById: async (request: FastifyRequest<{
        Params: params,
        Querystring: query
    }>, reply: FastifyReply) => {
        try {
            const { examId} = request.params
            const exam = await prisma.oldExams.findUnique({
                where: {
                    codexam: parseInt(examId)
                },
                include: {
                 partExams: {
                    include: {examsDetails: true}
                 }
                }
            })

            reply.send({
                exam
            })

        } catch (error) {
            
            
            reply.send({
              error
            })
            
        }
    }
}