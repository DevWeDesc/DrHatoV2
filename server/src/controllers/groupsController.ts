import { FastifyRequest, FastifyReply } from "fastify";
import { prisma } from "../interface/PrismaInstance";
import { GroupSchema, groupParams } from "../schemas/schemasValidator";
import { z } from "zod";

export const groupsController = {
  createGroup: async (request: FastifyRequest, reply: FastifyReply) => {
    const { name } = GroupSchema.parse(request.body);
    try {
      await prisma.groups.create({ data: { name: name } });
      reply.status(200).send("Grupo criado com Sucesso!");
    } catch (error) {
      console.log(error);
      reply.status(400).send({ error });
    }
  },

  getGroups: async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const groups = await prisma.groups.findMany();
      reply.send(groups);
    } catch (error) {
      console.log(error);
      reply.status(400).send({ error });
    }
  },

  editGroup: async (request: FastifyRequest, reply: FastifyReply) => {
    const { id } = groupParams.parse(request.params);
    const { name } = GroupSchema.parse(request.body);
    try {
      await prisma.groups.update({
        where: { id: parseInt(id) },
        data: { name: name },
      });
      reply.status(200).send("Grupo Editado com Sucesso!");
    } catch (error) {
      console.log(error);
      reply.status(400).send({ error });
    }
  },

  removeGroup: async (request: FastifyRequest, reply: FastifyReply) => {
    const { id } = groupParams.parse(request.params);
    try {
      await prisma.groups.delete({
        where: { id: parseInt(id) },
      });
      reply.status(200).send("Grupo Excuido com Sucesso!");
    } catch (error) {
      console.log(error);
      reply.status(400).send({ error });
    }
  },
};
