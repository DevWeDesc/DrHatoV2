import { FastifyRequest, FastifyReply } from "fastify";
import { PrismaClient } from "@prisma/client";
import { ValidationContract } from "../validators/validateContract";
import { CustomerSchema, createCustomer } from "../schemas/schemasValidator";
import { z } from "zod";
import { randomNumberAccount } from "../utils/randomNumberAccount";
const prisma = new PrismaClient();

export const customerController = {
  showAllUsers: async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const allUser = await prisma.customer.findMany({
        include: { pets: true, transaction: true},
      });

      const teste = await prisma.customer.findMany({
        where: { adress: "Rua teste"}
      })
      return reply.send(allUser);
    } catch (error) {
      return reply.status(404).send({ message: error });
    }
  },


  searchUser: async (
    request: FastifyRequest<{
      Querystring: { name?: string; cpf?: string; rg?: string, codPet: string };
    }>,
    reply: FastifyReply
  ) => {
    const {name, cpf, rg} = request.query

    try {
      let customer = await prisma.customer.findMany({
        where: {
          OR: [{ name: {startsWith: name} }, { cpf: {startsWith: cpf} }, { rg: {startsWith: rg} }],
        }, include: { pets: true, transaction: true}
      });

      reply.send(customer);
    } catch (error) {
      reply.status(404).send(error);
      console.log(error)
    }
  },
  createUser: async (request: FastifyRequest, reply: FastifyReply) => {
       const contract = new ValidationContract() ;

       const {name, adress, district, rg  ,phone, tell, email, cpf, birthday, balance, cep, howKnowUs, kindPerson, neighbour, state} = createCustomer.parse(request.body)
       try {

        await contract.customerAlreadyExists(cpf, 'Usuário já existe!')
        if(contract.hadError()){
          reply.status(400).send(contract.showErrors())
          contract.clearErrors()
          return
        }

        await prisma.customer.create({
          data: {name, adress, phone, email, cpf, birthday, balance, cep, district, howKnowUs, rg, tell, kindPerson, neighbour, state, customerAccount: {create: {
            accountNumber: randomNumberAccount(100, 100000),
            credits: 0,
            debits: 0
          }} }
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

    reply.send(customer)
  }


 
};
