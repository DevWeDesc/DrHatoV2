import { FastifyRequest, FastifyReply } from "fastify";
import { prisma } from "../interface/PrismaInstance";
import { z } from "zod";

const InstructionSchema = z.object({
  name: z.string(),
  description: z.string(),
})

type params = {
  id: string;
}
export const instructionsController = {
  createInstruction: async (request: FastifyRequest, reply: FastifyReply) => {
    const { name, description} = InstructionSchema.parse(request.body);
    try {
      await prisma.instructions.create({data: { name: name, description: description} });
      reply.status(201)
    } catch (error) {
      console.log(error);
      reply.status(400);
    }
  },

  getInstructions: async (request: FastifyRequest, reply: FastifyReply) => {
  
    try {
      const Instructions = await prisma.instructions.findMany();
      reply.send(Instructions).status(200)

    } catch (error) {
      console.log(error);
      reply.status(400);
    }
    
  },

  editInstruction: async (request: FastifyRequest<{Params: params }>, reply: FastifyReply) => {
    const { id  } = request.params
    const { name, description} = InstructionSchema.parse(request.body);
    try {
      await prisma.instructions.update({where: { id: parseInt(id)}, data: {name: name, description: description}})
      reply.send("Editado com Sucesso").status(202)
    } catch (error) {
      console.log(error);
      reply.status(400);
    }
  },

  deleteInstruction: async (request: FastifyRequest<{Params: params }>, reply: FastifyReply) => {
    const { id  } = request.params
    try {
      await prisma.instructions.delete({where: { id: parseInt(id)}})
      reply.send("Excluido com Sucesso").status(204)
    } catch (error) {
      console.log(error);
      reply.status(400);
    }
  },

  getInstructionById: async (request: FastifyRequest<{Params: params }>, reply: FastifyReply) => {
      try {
        const { id} =request.params

        const instruction = await prisma.instructions.findUnique({
          where: {
            id: parseInt(id)
          }
        })

        reply.send(instruction)

      } catch (error) {
        
      }
  }
}

