import { FastifyRequest, FastifyReply } from 'fastify'
import { petSchema } from '../schemas/schemasValidator'
import { prisma } from '../interface/PrismaInstance'

type params = {
    petId: string;
    queueId: string;
}
export const petsDebitsController = {
getPetDebits: async (request: FastifyRequest<{ Params: params}>, reply: FastifyReply) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0); 
        const { petId } = request.params

        const debits = await prisma.petConsultsDebits.findMany({
            where: {
                requestedDate: {
                    gte: today
                },
                OpenedConsultsForPet: {
                    MedicineRecord: {
                        petId: parseInt(petId)
                    }
                }
            }
        })

        reply.send({
            debits
        })

    } catch (error) {
        reply.send({
            message: error
        })

        console.log(error)
    }
},

getDebitsInQueue: async (request: FastifyRequest<{ Params: params}>, reply: FastifyReply) => {
    try {
        const {queueId} = request.params
        const debits = await prisma.openedConsultsForPet.findMany({
            where: {
                id: queueId
            }, include: {
                consultDebits: true
            }
        })

        const total = debits[0]?.consultDebits?.reduce((acc, total) => {
            acc.total +=  Number(total.price)
            return acc 
        }, { total: 0})

        reply.send({
            debits,
            total
            })

    } catch (error) {
        reply.send({
            message: error
        })

        console.log(error)
    }
},


getDebitsInAdmission: async (request: FastifyRequest<{ Params: params}>, reply: FastifyReply) => {
    try {
        const {queueId} = request.params
        const debits = await prisma.openededAdmissionsForPet.findMany({
            where: {
                id: queueId
            }, include: {
                consultDebits: true
            }
        })

        const total = debits[0]?.consultDebits?.reduce((acc, total) => {
            acc.total +=  Number(total.price)
            return acc 
        }, { total: 0})

        reply.send({
            debits,
            total
            })

    } catch (error) {
        reply.send({
            message: error
        })

        console.log(error)
    }
}
}