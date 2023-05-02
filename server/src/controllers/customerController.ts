import { FastifyRequest, FastifyReply } from "fastify";
import { PrismaClient } from "@prisma/client";
import { ValidationContract } from "../validators/validateContract";
import { CustomerSchema, createCustomer } from "../schemas/schemasValidator";
const prisma = new PrismaClient();

export const customerController = {
  showAllUsers: async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const allUser = await prisma.customer.findMany({
        include: { pets: true, transaction: true},
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
        }, include: { pets: true, transaction: true}
      });

      reply.send(CustomerSchema.parse(customer));
    } catch (error) {
      reply.status(404).send(error);
    }
  },
  createUser: async (request: FastifyRequest, reply: FastifyReply) => {
       const contract = new ValidationContract() ;

       const {name, adress, phone, email, cpf, birthday, balance, cep} = createCustomer.parse(request.body)
       try {

        await contract.customerAlreadyExists(cpf, 'Usuário já existe!')
        if(contract.hadError()){
          reply.status(400).send(contract.showErrors())
          contract.clearErrors()
          return
        }

        await prisma.customer.create({
          data: {name, adress, phone, email, cpf, birthday, balance, cep}
        })
       } catch (error) {
        console.error(error)
       }
  },

  findUserById: async (request: FastifyRequest, reply: FastifyReply) => {
    const { id }: any = (request.params)
    const customer = await prisma.customer.findUnique({ where: { id: parseInt(id) }, include:{pets: true, transaction: true} })

   customer?.transaction.reduce( (acc ,transaction) => {
      //@ts-ignore
      customer.balance += transaction.amount
      return acc
    }, 0)

    reply.send(CustomerSchema.parse(customer))
  }
};
