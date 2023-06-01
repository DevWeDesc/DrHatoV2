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
    const pets = await prisma.pets.findMany({include: {queue: {select: { returnQueue: true, serviceQueue: true, id: true}}, customer: {select: {name: true}}}})
    return reply.send(pets)
  } catch (error) {
    reply.status(404).send(error)
  }
},

getWithId: async (request: FastifyRequest, reply: FastifyReply) => {
  const { id }: any = request.params
  try {
    const pet = await prisma.pets.findFirst({ where: { id : parseInt(id)}, 
    include: {customer: 
      {select: { name: true, id: true, balance: true}}, 
      medicineRecords: {select: {petExams: true, observations: true, id: true }},
      queue: {select: {returnQueue: true, serviceQueue: true, id: true}}
    } })

    const petData = { 
      name: pet?.name,
      balance: Number(pet?.customer.balance),
      customerName: pet?.customer.name,
      customerId: pet?.customer.id,
      especie: pet?.especie,
      sexo: pet?.sexo,
      race: pet?.race,
      weigth: pet?.weigth,
      status: pet?.status,
      corPet: pet?.corPet,
      sizePet: pet?.sizePet,
      bornDate: pet?.bornDate,
      observations: pet?.observations,
      codPet: pet?.codPet,
      rga: pet?.rga,
      recordId: pet?.medicineRecords?.id,
      exams: pet?.medicineRecords?.petExams.map((exams) => {
        let examData = {
          id: exams.id,
          requestedData: exams.requesteData,
          name: exams.name,
          price: exams.price,
           doneExam: exams.doneExame}
        return examData
       }),
      queue: pet?.queue
    }
    return reply.send(petData)
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
        },
        queue: {
          create: {
            returnQueue: false,
            serviceQueue: false,
            queryType: "",
            queueEntry: null,
          },
        },
        medicineRecords: {
          create: {
            observations: [""],
          }
        }
      }
    })
  } catch (error) {
    console.log(error)
  }
},

petsInQueue: async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const pets = await prisma.pets.findMany({where: {queue: {OR: [{returnQueue: true}, {serviceQueue: true}]}}, include: {queue: {select: {returnQueue: true, serviceQueue: true, queryType: true, queueEntry: true }}, customer: {select: {name: true, vetPreference: true}}}})
    return reply.send(pets)
  } catch (error) {
    reply.status(404).send(error)
  }
}
 
}