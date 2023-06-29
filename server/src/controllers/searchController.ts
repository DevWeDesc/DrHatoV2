import { FastifyRequest, FastifyReply } from "fastify";
import { Prisma, PrismaClient } from "@prisma/client";
import { z } from "zod";
const prisma = new PrismaClient();



export const searchController = {
 getAll: async (request: FastifyRequest<{
    Querystring: { name?: string; cpf?: string; adress?: string };
  }>, reply: FastifyReply) => {
    try {
      const cpf = request.query.cpf;
      const name = request.query.name;
      const adress = request.query.adress;
      
      const result = await prisma.customer.findMany({
        where: {
          OR: [
            { name: { startsWith: name } },
            { adress: { startsWith: adress } },
            { cpf: { startsWith: cpf } }
          ]
        },
        include: {
          pets: {include: {queue: true}},
        },
      });
      
      reply.status(200).send(result);
    } catch (error) {
      reply.status(400).send({ message: error})
      console.log(error)
    }
  },


  vetsBigSearchs: async(request: FastifyRequest,  reply: FastifyReply) => {
    const vetsSearchSchema = z.object({
      initialData: z.string().optional(),
      finalData: z.string().optional(),
      isFinished: z.boolean().optional(),
      isHospitalized: z.boolean().optional(),
      codPet: z.string().optional(),
      name: z.string().optional(),
      petName: z.string().optional(),
    })
    const { initialData, finalData,codPet, isFinished, isHospitalized, name, petName} = vetsSearchSchema.parse(request.body)
    try {
      let response;
      if(initialData && finalData) {
        response = await prisma.customer.findMany({
          where: {
            OR: [
              {pets: {some: {queue: {queueEntry: {startsWith: initialData} || {endsWith: finalData}}}}}
            ]
          }, include: {pets: {select: {queue: true}}}
        })
      } else if (isFinished === true || isHospitalized === true) {
        response = await prisma.bed.findMany({
          where: {
            OR: [
              {isBusy: isHospitalized}
            ]
          }, include: {pet: {select: {queue: true}}}
        })
      } else {
        response = await prisma.customer.findMany({
          where: {
            OR: [
              {name: {startsWith: name} },
              {pets: {none: {name: {startsWith: petName}}}},
              {pets: {none: {codPet: {startsWith: codPet}}}}
            ]
          },
          include: { pets: {select: {queue: true}}}
        })
      }


        reply.send(response).status(200)
    } catch (error) {
      reply.status(400).send({ message: error})
      console.log(error)
    }
  }



}