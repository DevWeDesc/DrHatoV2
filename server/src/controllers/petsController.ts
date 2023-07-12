import { FastifyRequest, FastifyReply } from "fastify";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import { petSchema } from "../schemas/schemasValidator";
const prisma = new PrismaClient();



export const petsController = {
getAllPets: async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const pets = await prisma.pets.findMany({include: {queue: {select: {  id: true, queryType: true, vetPreference: true}}, customer: {select: {name: true}}}})
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
      medicineRecords: {select: {petExams: true, observations: true, id: true, petVaccines: true }},
      queue: {select: { id: true, queryType: true, vetPreference: true, moreInfos: true, queueOur: true}}
    } })

    const petData = { 
      name: pet?.name,
      balance: Number(pet?.customer.balance),
      customerName: pet?.customer.name,
      customerId: pet?.customer.id,
      especie: pet?.especie,
      sexo: pet?.sexo,
      race: pet?.race,
      castred: pet?.isCastred,
      chip: pet?.haveChip,
      weigth: pet?.weigth,
      corPet: pet?.corPet,
      sizePet: pet?.sizePet,
      bornDate: pet?.bornDate,
      observations: pet?.observations,
      codPet: pet?.codPet,
      more: pet?.queue?.moreInfos,
      ouor: pet?.queue?.queueOur,
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
       vaccines: pet?.medicineRecords?.petVaccines.map((vaccine) => {
        let vacineData = {
          id: vaccine.id,
          name: vaccine.name,
          applicableDate: vaccine.applicationDate
        }
        return vacineData
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
    haveChip,
    isCastred,
    corPet,
    bornDate,
    observations,
  } = petSchema.parse(request.body)

  const { id}: any = request.params

   try {
    const petAlreadyExists = await prisma.pets.findFirst({ where:  {name: name}})

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
        haveChip,
        isCastred,
        corPet,
        bornDate,
        observations,
        customer: {
          connect: {
            id: parseInt(id)
          }
        },
        queue: {
          create: {
            vetPreference: "",
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

   reply.status(201).send("Sucesso") 
  } catch (error) {
  reply.send("FALHA")

  }
},

petsInQueue: async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const pets = await prisma.pets.findMany({ where: {
      queue: {petIsInQueue: true}
    },include: {queue: {select: {vetPreference: true, queryType: true, queueEntry: true, petIsInQueue: true, queueOur: true, moreInfos: true }}, customer: {select: {name: true, vetPreference: true, cpf: true}}}})

    const totalInQueue = await prisma.queues.count({
      where: {petIsInQueue: true}
    })
    const response = pets.map((pet) => {
      let data = {
        name: pet.name,
        id: pet.id,
        customerName: pet.customer.name,
        vetPreference: pet.queue?.vetPreference,
        codPet: pet.codPet.substring(0,6).concat("..."),
        queueEntry: pet.queue?.queueEntry,
        ouor: pet.queue?.queueOur,
        more: pet.queue?.moreInfos,
        race: pet.race,
        customerCpf: pet.customer.cpf,
        queryType: pet.queue?.queryType,
        totalInQueue
      }
      return data
    })




    return reply.send({response, totalInQueue})
  } catch (error) {
    reply.status(404).send(error)
  }
}}