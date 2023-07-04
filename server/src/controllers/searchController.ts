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
      isHospitalized: z.string().optional(),
      codPet: z.string().optional(),
      name: z.string().optional(),
      petName: z.string().optional(),
    })
    try {
     const { name,petName,codPet,initialData,finalData,isHospitalized} = vetsSearchSchema.parse(request.query)

     const response = await prisma.customer.findFirstOrThrow({
      where: {
        OR: [
          {pets: {some:{queue: {queryType: initialData}}}},
          {pets: {some:{queue: {queryType: finalData}}}},
          {name: name},
          {pets: {some: {name: petName}}},
          {pets: {some: {codPet: codPet}}},
          {pets: {some: {bed: {isBusy: Boolean(isHospitalized)}}}},
        ]
      }, include: {
        pets: {include: {queue: true}},
      },
     })

     reply.send(response)
    } catch (error) {
      reply.status(400).send(error)
      console.error(error)
    }
  }

}