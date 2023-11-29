import { FastifyRequest, FastifyReply } from "fastify";
import { prisma } from "../interface/PrismaInstance";
import { z } from "zod";


const SectorSchema = z.object({
  name: z.string(),
})

type params = {
  id: string;
}
export const sectorsController = {
  createSector: async (request: FastifyRequest, reply: FastifyReply) => {
    const { name} = SectorSchema.parse(request.body);
    try {
      await prisma.sectors.create({data: { name: name} });
      reply.status(201)
    } catch (error) {
      console.log(error);
      reply.status(400);
    }
  },

  getSectors: async (request: FastifyRequest, reply: FastifyReply) => {
  
    try {
      const sectors = await prisma.sectors.findMany();
      reply.send(sectors).status(200)

    } catch (error) {
      console.log(error);
      reply.status(400);
    }
    
  },

  editSector: async (request: FastifyRequest<{Params: params }>, reply: FastifyReply) => {
    const { id  } = request.params
    const { name} = SectorSchema.parse(request.body);
    try {
      await prisma.sectors.update({where: { id: parseInt(id)}, data: {name: name}})
      reply.send("Editado com Sucesso").status(202)
    } catch (error) {
      console.log(error);
      reply.status(400);
    }
  },

  deleteSector: async (request: FastifyRequest<{Params: params }>, reply: FastifyReply) => {
    const { id  } = request.params
    try {
      await prisma.sectors.delete({where: { id: parseInt(id)}})
      reply.send("Excluido com Sucesso").status(204)
    } catch (error) {
      console.log(error);
      reply.status(400);
    }
  }
}

