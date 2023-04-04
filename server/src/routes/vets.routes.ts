import { z } from 'zod'
import { FastifyInstance } from 'fastify'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()



export async function vetsRoutes(app: FastifyInstance){
    app.get('/vets', async (request, reply) => {
        const data = await prisma.vets.findMany({include: {schedule: true}})
        return reply.send(data)
    })

    app.post('/vets', async(request, reply) => {
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
    })

}