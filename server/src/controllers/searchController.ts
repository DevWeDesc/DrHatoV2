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
  vetsBigSearchs: async(request: FastifyRequest<{Querystring: {initialData?: Date, finalData?: Date,
    codPet?: string, isHospitalized?: string, name?: string, petName?: string}}>,  reply: FastifyReply) => {
      try {
        const initialData = request.query.initialData ? request.query.initialData : "";
        const finalData = request.query.finalData ? request.query.finalData : "";
        const codPet = request.query.codPet ? request.query.codPet : "";
        const name = request.query.name ? request.query.name : "";
        const petName = request.query.petName ? request.query.petName : "";
        const isHospitalized = request.query.isHospitalized ? request.query.isHospitalized : "";
        let response;
        switch(true) {
          case !!name: 
          response = await prisma.customer.findMany({ 
              where: {name: { startsWith: name}},
              include: {
                pets: {include: {queue: true}},
              },
            })
          break;
          case !!petName: 
          response = await prisma.pets.findMany({
            where: {name: {startsWith: petName} }, include: {customer: {select: {name: true}}},  
          })
          break;
          case !!codPet: 
          response = await prisma.customer.findFirst({
           where: {pets: {some: {codPet: {startsWith: codPet}}}}, include: {
            pets: {include: {queue: true}},
          },
          })
          break;
          case !!initialData && !!finalData: 
          response = await prisma.customer.findMany({
            where: {pets: {some: {queue: {queueEntry: { gte: initialData, lte: finalData}}}}},include: {pets: {select: {name: true, queue: {select: {queueEntry: true}}  }}}
          })
          break;
          case !!initialData: 
          response = await prisma.customer.findMany({
           where: {pets: {some: {queue: {queueEntry : { gte: initialData }}}}},include: {pets: {select: {name: true, queue: {select: {queueEntry: true}} }}} 
          })
          break;
          case !!finalData: 
          response = await prisma.customer.findMany({
           where: {pets: {some: {queue: {queueEntry: { lte: finalData}}}}},include: {pets: {select: {name: true, queue: {select: {queueEntry: true}}  }}}
          })
          break;
      
          case !!isHospitalized: 
          response = await prisma.customer.findMany({
            where: {pets: {some: {bed: { isBusy: true}}}},include: {pets: {select: {name: true, }}}
          })
          break;
          default: 
          response = await prisma.customer.findMany({include: {pets: {select: {queue: true}}}})
        }
        reply.send(response).status(200)
    } catch (error) {
      reply.status(400).send({ message: error})
      console.log()
      console.log(error)
    }
  }




}


