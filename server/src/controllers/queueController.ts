import { FastifyRequest, FastifyReply } from "fastify";
import { PrismaClient } from "@prisma/client";
import {QueueSchema } from "../schemas/schemasValidator";
const prisma = new PrismaClient();


type params = {
    id: string;
  }

export const queueController = {
    setPetInQueue: async (request: FastifyRequest<{Params: params}>, reply: FastifyReply) => {
        const {returnQueue, serviceQueue, queueEntry, queryType, vetPreference} = QueueSchema.parse(request.body)
        const { id } = request.params
        try {
           await prisma.queues.update({where: {id: parseInt(id) }, data: {returnQueue, serviceQueue, queueEntry, queryType} })
           reply.status(200).send("Status da fila Atualizada")
        } catch (error) {
         console.error(error)
        reply.status(400).send({message: { error}})
        }
    }
}

   