import { FastifyRequest, FastifyReply } from "fastify";
import { PrismaClient } from "@prisma/client";
import { ValidationContract } from "../validators/validateContract";
import { CustomerSchema, ExamSchema, createCustomer } from "../schemas/schemasValidator";
const prisma = new PrismaClient();

export const examsController = {

createExam: async (request: FastifyRequest, reply: FastifyReply) => {
    const {name, price, examsType, available,applicableGender, description, subName } = ExamSchema.parse(request.body)
    const contract = new ValidationContract();
    try {
        await contract.validateExamsType(examsType, "Tipo de exame não válido")
        await contract.examAlreadyExist(name, "Exame já existe")
        if(contract.hadError()){
            reply.status(400).send(contract.showErrors())
            contract.clearErrors()
            return
          }
        await prisma.exams.create({
            data: {name, price, examsType, available, applicableGender, description, subName}
        })
        reply.status(201).send('Exame criado com Sucesso!')
    } catch (error) {
        console.log(error)
        reply.status(400).send({ message: error})
    }
},

getExams: async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const exams = await prisma.exams.findMany()
        reply.status(200).send(exams)
    } catch (error) {
        reply.status(400).send({ message: error})
    }

}
}