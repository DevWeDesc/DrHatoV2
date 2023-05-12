import { FastifyRequest, FastifyReply } from "fastify";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";
const prisma = new PrismaClient();


const petSchema = z.object({
  name: z.string(),
  especie: z.string(),
  sexo: z.string(),
  race: z.string(),
  weigth: z.string(),
  status: z.string(),
  corPet: z.string(),
  sizePet: z.string(),
  bornDate: z.string(),
  observations: z.string(),
  rga: z.string(),
})

export const petsController = {
getAllPets: async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const pets = await prisma.pets.findMany()
    return reply.send(pets)
  } catch (error) {
    reply.status(404).send(error)
  }
},

getWithId: async (request: FastifyRequest, reply: FastifyReply) => {
  const { id }: any = request.params
  try {
    const pet = await prisma.pets.findFirst({ where: { id : parseInt(id)}, include: {customer: {select: { name: true}}} })
    return reply.send(pet)
  } catch (error) {
    console.log(error)
  }
},

createPet: async (request: FastifyRequest, reply: FastifyReply) =>{
  const {
    name,
    especie,
    sexo,
    race,
    weigth,
    status,
    corPet,
    sizePet,
    bornDate,
    observations,
    rga,
    
  } = petSchema.parse(request.body)

  const { id}: any = request.params
  try {
    const petAlreadyExists = await prisma.pets.findFirst({ where:  {
      OR: [
        {name: name},
        {rga: parseInt(rga)}
      ]
    }})
    if(petAlreadyExists) {
      reply.status(404).send('Pet already exists')
      return
    }

    await prisma.pets.create({
      data: {
        name,
        especie,
        sexo,
        race,
        weigth,
        status,
        corPet,
        sizePet,
        bornDate,
        observations,
        rga: parseInt(rga),
        customer: {
          connect: {
            id: parseInt(id)
          }
        }
      }
    })
  } catch (error) {
    console.log(error)
  }
}
 
}