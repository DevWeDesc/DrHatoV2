import { FastifyRequest, FastifyReply } from "fastify";
import { Prisma, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();



export const searchController = {
  getAllWithName: async (request: FastifyRequest<{
    Querystring: { name?: string; cpf?: string; adress?: string };
  }>, reply: FastifyReply) => {
    try {
      const cpf = request.query.cpf;
      const name = request.query.name;
      const adress = request.query.adress;

      const result = await prisma.$queryRawUnsafe(`
      SELECT *FROM hato."Customer"
      WHERE "name" ILIKE '${name}%' 
      OR "adress" ILIKE '${adress}%'
      OR "cpf" ILIKE '${cpf}%'      
      `)
     reply.status(200).send(result)
    } catch (error) {
      reply.status(400).send({ message: error})
      console.log(error)
    }
  },

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



}