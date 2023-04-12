import { FastifyRequest, FastifyReply } from "fastify";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";
const prisma = new PrismaClient();

const CustomerSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string(),
  adress: z.string(),
  birthday: z.string(),
  cpf: z.string(),
  phone: z.string(),
  pets: z.any(),
});
export const customerController = {
  showAllUsers: async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const allUser = await prisma.customer.findMany({
        include: { pets: true },
      });
      return reply.send(allUser);
    } catch (error) {
      return reply.status(404).send({ message: error });
    }
  },
  searchUser: async (
    request: FastifyRequest<{
      Querystring: { name?: string; cpf?: string; phone?: string };
    }>,
    reply: FastifyReply
  ) => {
    const cpf = request.query.cpf;
    const name = request.query.name;
    const phone = request.query.phone;

    try {
      const customer = await prisma.customer.findFirst({
        where: {
          OR: [{ name: name }, { cpf: cpf }, { phone: phone }],
        }, include: { pets: true}
      });

      reply.send(CustomerSchema.parse(customer));
    } catch (error) {
      reply.status(404).send(error);
    }
  },

  createUser: async (request: FastifyRequest, reply: FastifyReply) => {
    const createCustomer = z.object({
        name: z.string(),
        adress: z.string(),
        phone: z.string(),
        cpf: z.string(),
        email: z.string().email(),
        birthday: z.string()
       })
    
       const {name, adress, phone, email, cpf, birthday} = createCustomer.parse(request.body)
    
       try {
        await prisma.customer.create({
          data: {name, adress, phone, email, cpf, birthday}
        })
       } catch (error) {
        console.error(error)
       }
  },

  findUserById: async (request: FastifyRequest, reply: FastifyReply) => {
    const { id }: any = (request.params)
    const customer = await prisma.customer.findUnique({ where: { id: parseInt(id) }, include:{pets: true} })
    reply.send(CustomerSchema.parse(customer))
  }
};
