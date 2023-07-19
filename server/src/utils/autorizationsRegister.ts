import { FastifyRequest, FastifyReply } from "fastify";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";
const prisma = new PrismaClient();

const AutorizationSchema = z.object({
    name: z.string(),
    text: z.string()
})

export const autorizationsRegister = {
    createAutorization: async(request: FastifyRequest, reply: FastifyReply) => {
        const {name, text} = AutorizationSchema.parse(request.body)
        await prisma.autorizations.create({
            data: {name, text}
        })
    },
    showAutorization: async(request: FastifyRequest, reply: FastifyReply) => {
        const autorizations = await prisma.autorizations.findMany()
        reply.send(autorizations)
    },

    searchAutorizaton:  async(request: FastifyRequest, reply: FastifyReply) => {
    const {id}: any = request.params
    const autorization = await prisma.autorizations.findFirst({
        where: { id: parseInt(id)}
    })
    reply.send(autorization)
    },

    editAutorizaton:  async(request: FastifyRequest, reply: FastifyReply) => {
        const Schema = z.object({
            name: z.string().optional(),
            text: z.string()
        })
        const {id}: any = request.params
        const { name, text} = Schema.parse(request.body)
        const autorization = await prisma.autorizations.update({where: {id: parseInt(id)}, data:{name, text}})
        reply.status(201).send(autorization)
        }
}