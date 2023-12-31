import { FastifyRequest, FastifyReply } from "fastify";
import { prisma } from "../interface/PrismaInstance";
import {  GroupSchema, } from "../schemas/schemasValidator";


export const groupsController = {
    createGroup:  async (request: FastifyRequest, reply: FastifyReply) => {
        const { name }=  GroupSchema.parse(request.body) 
        try {
            await prisma.groups.create({data: {name: name}})
            reply.status(200).send("Grupo criado com Sucesso!")
        } catch (error) {
            console.log(error)
            reply.status(400).send({error})
        }
    },

    getGroups: async (request: FastifyRequest, reply: FastifyReply) => {
        try {
            const groups = await prisma.groups.findMany()
            reply.send(groups)
        } catch (error) {
            console.log(error)
            reply.status(400).send({error})
        }
    }
}