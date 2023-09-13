import { FastifyRequest, FastifyReply } from "fastify";
import { prisma } from "../interface/PrismaInstance";
import {QueueSchema } from "../schemas/schemasValidator";
import { petContract } from "../interface/PetContractInstance";

type params = {
    id: string;
    petId: string;
    queueId: string;
    recordId: string;
    customerId: string;
    date: string;
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
    const {queueEntry, queryType, queueExit, debitOnThisQuery, responsibleVeterinarian, petName,
      petWeight, observations
    } = QueueSchema.parse(request.body)
    try { 

     // await petContract.verifyIfIsPossibleEndQueue(recordId, 'Exame em aberto, não possivel é encerrar consulta.')

      if(petContract.hadError()){
        reply.status(400).send(petContract.showErrors()[0])
        petContract.clearErrors()
        return
      } 
      
        await prisma.customer.update({
          where: {id: parseInt(customerId)},data : {
              customerAccount: {update: {debits: {increment: Number(debitOnThisQuery)}}}
          }
        })
  

          await  prisma.pets.update({
              where: { id: parseInt(petId)},data: {priceAccumulator: {update: {accumulator: 0}}}
          })
  
          await prisma.queuesForPet.create({
              data: {queryType, queueEntry,observations,petWeight, queueExit, queueIsDone: true,debitOnThisQuery,petName, responsibleVeterinarian, medicine:{ connect: {id: parseInt(recordId)}}}
          })
          
          await prisma.queues.update({
              where: {id: parseInt(queueId)}, data: {queryType: null, queueEntry: null, queueExit: null, moreInfos: null, vetPreference: null, petIsInQueue: false}
          })
  
      
          reply.send('Fila atualizada')
      


    } catch (error) {
        console.log(error)
        reply.status(400).send({message: { error}})
    }

  },

  getQueuePetHistory: async (request: FastifyRequest<{Params: params}>, reply: FastifyReply) => {
    const {date, petId} = request.params
    const today = new Date(date);
    today.setHours(0, 0, 0, 0); 
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    try {
      
      const petsProcedures =  await prisma.pets.findUnique({
        where: {id: parseInt(petId)},include: {customer: {select: {name: true}},medicineRecords: {include:{
          petVaccines: {where: {requestedDate: {gte: date, lt: tomorrow}}},
          petBeds: { where: {entryOur: {gte: date, lt: tomorrow}} },
          petExams: {where: {requesteData: {gte: today,
              lt: tomorrow}}},
          petSurgeries: {where:{scheduledDate: {gte: date, lt: tomorrow}},
          
        },

        }}}
      })
      
      let procedures: any = []
       procedures = procedures.concat(petsProcedures?.medicineRecords?.petVaccines.flatMap((vaccine) => vaccine),
       petsProcedures?.medicineRecords?.petExams.flatMap((exams) => exams),
       petsProcedures?.medicineRecords?.petSurgeries.flatMap((surgeries) => surgeries),
       petsProcedures?.medicineRecords?.petBeds.flatMap((beds) => beds)
       )


       const data = { 
        petName: petsProcedures?.name,
        customerName: petsProcedures?.customer.name,
        procedures
       }

      reply.send(data)
    } catch (error) {
      console.log(error)
    }
  }


}

   