import { FastifyRequest, FastifyReply } from "fastify";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";
const prisma = new PrismaClient();

const AutorizationSchema = z.object({
    name: z.string(),
    text: z.string()
})

export const autorizationsController = {
    createAutorization: async(request: FastifyRequest, reply: FastifyReply) => {
        const {name, text} = AutorizationSchema.parse(request.body)
        await prisma.autorizations.create({
            data: {name, text}
        })
    },
    showAutorization: async(request: FastifyRequest, reply: FastifyReply) => {
        const autorizations = await prisma.autorizations.findMany()
        reply.send(autorizations)
    }
}