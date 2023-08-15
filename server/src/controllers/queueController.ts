import { FastifyRequest, FastifyReply } from "fastify";
import { PrismaClient } from "@prisma/client";
import {QueueSchema } from "../schemas/schemasValidator";
import { create } from "domain";
import { accountService } from "../services/accountService";
import { accumulatorService } from "../services/accumulatorService";
const prisma = new PrismaClient();


type params = {
    id: string;
    petId: string;
    queueId: string;
    recordId: string;
    customerId: string;
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
    const {petId, recordId, queueId, customerId} = request.params
    const {queueEntry, queryType, queueExit, debitOnThisQuery, responsibleVeterinarian} = QueueSchema.parse(request.body)
    try {

      await prisma.customer.update({
        where: {id: parseInt(customerId)},data : {
            customerAccount: {update: {debits: {increment: Number(debitOnThisQuery)}}}
        }
      })

        await  prisma.pets.update({
            where: { id: parseInt(petId)},data: {priceAccumulator: {update: {accumulator: 0}}}
        })

        await prisma.queuesForPet.create({
            data: {queryType, queueEntry, queueExit, debitOnThisQuery, responsibleVeterinarian, medicine:{ connect: {id: parseInt(recordId)}}}
        })
        
        await prisma.queues.update({
            where: {id: parseInt(queueId)}, data: {queryType: null, queueEntry: null, queueExit: null, moreInfos: null, vetPreference: null, petIsInQueue: false}
        })

    

       

        reply.send('Fila atualizada')
    } catch (error) {
        console.log(error)
        reply.status(400).send({message: { error}})
    }

  }


}

   