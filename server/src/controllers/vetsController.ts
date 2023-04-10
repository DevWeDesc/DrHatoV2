import { FastifyRequest, FastifyReply } from "fastify";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";
const prisma = new PrismaClient();


export const vetsController = { 
    showVets: async (request: FastifyRequest, reply: FastifyReply) => {
        try {
            const vets = await prisma.vets.findMany({include: {schedule: true}})
            return reply.send(vets)
        } catch (error) {
            console.log(error);
        }
    },
    createVet: async(request: FastifyRequest, reply: FastifyReply) =>{
        const vetSchema = z.object({
            name: z.string(),
            speciality: z.string(),
            crmv: z.number()
        })
        const { name, speciality, crmv} = vetSchema.parse(request.body)
        try {
            await prisma.vets.create({
                data: {name, crmv, speciality}
            })
        } catch (error) {
            return reply.status(404).send({ message: error})
        }
    }
}