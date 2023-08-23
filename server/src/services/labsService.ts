import { prisma } from "../interface/PrismaInstance";

export const labService = {
    reportExam: async (examId: any, data: Object) => {
        const jsonData = JSON.stringify(data)
        await prisma.reportForExams.create({
            data: {report: jsonData, examsForPet: {connect: {id: parseInt(examId)}}},
        })
    }
}