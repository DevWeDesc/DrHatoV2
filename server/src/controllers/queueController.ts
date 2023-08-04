import { FastifyRequest, FastifyReply } from "fastify";
import { PrismaClient } from "@prisma/client";
import {QueueSchema } from "../schemas/schemasValidator";
import { create } from "domain";
const prisma = new PrismaClient();


type params = {
    id: string;
    petId: string;
    queueId: string;
    recordId: string;
  }

export const queueController = {
    setPetInQueue: async (request: FastifyRequest<{Params: params}>, reply: FastifyReply) => {
        const {queueEntry, queryType, vetPreference, petIsInQueue, moreInfos, queueOur} = QueueSchema.parse(request.body)
        const { id } = request.params
        try {
           await prisma.queues.update({where: {id: parseInt(id) }, data: {queueEntry, queryType, vetPreference,petIsInQueue, moreInfos, queueOur } })
           reply.status(200).send("Status da fila Atualizada")
        } catch (error) {
         console.error(error)
        reply.status(400).send({message: { error}})
        }
    },


  finishQueueOfPet:  async (request: FastifyRequest<{Params: params}>, reply: FastifyReply) => {
    const {petId, recordId, queueId} = request.params
    const {queueEntry, queryType, queueExit, debitOnThisQuery, responsibleVeterinarian} = QueueSchema.parse(request.body)
    try {
        await prisma.queuesForPet.create({
            data: {queryType, queueEntry, queueExit, debitOnThisQuery, responsibleVeterinarian, medicine:{ connect: {id: parseInt(recordId)}}}
        })
        
        await prisma.queues.update({
            where: {id: parseInt(queueId)}, data: {queryType: null, queueEntry: null, queueExit: null, moreInfos: null, vetPreference: null, petIsInQueue: false}
        })

        await  prisma.pets.update({
            where: { id: parseInt(petId)},data: {debits: {increment: Number(debitOnThisQuery) }}
        })

        reply.send('Fila atualizada')
    } catch (error) {
        console.log(error)
        reply.status(400).send({message: { error}})
    }

  }


}

   