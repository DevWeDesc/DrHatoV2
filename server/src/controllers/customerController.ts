import { FastifyRequest, FastifyReply } from "fastify";
import { ValidationContract } from "../validators/userContract";
import { createCustomer } from "../schemas/schemasValidator";
import { randomNumberAccount } from "../utils/randomNumberAccount";
import { prisma } from "../interface/PrismaInstance";


export const customerController = {
  showAllUsers: async (request: FastifyRequest<{Querystring: {page: string}}>, reply: FastifyReply) => {
    try {
      // Obtenha o número da página atual a partir da solicitação.
    const currentPage = Number(request.query.page) || 1;

    // Obtenha o número total de usuários.
    const totalUsers = await prisma.customer.count();

    // Calcule o número de páginas.
    const totalPages = Math.ceil(totalUsers / 35);


      const allUser = await prisma.customer.findMany({
        skip: (currentPage - 1) * 35,
        take: 35,
        include: { pets: true, transaction: true, customerAccount: {include: {installments: true}}},
      });

      return reply.send({
        totalUsers,
        currentPage,
        totalPages,
        users: allUser,
      });
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

      const customer =  await prisma.customer.create({
          data: {name, adress, phone, email, cpf, birthday, balance, cep, district, howKnowUs, rg, tell, kindPerson, neighbour, state, 
            customerAccount:
             {create: {
            accountNumber: randomNumberAccount(100, 100000),
            credits: 0,
            debits: 0
          }}}
        })

        reply.send(customer.id)
       } catch (error) {
        console.error(error)
       }
  },

  findUserById: async (request: FastifyRequest, reply: FastifyReply) => {
    const { id }: any = (request.params)
    const customer = await prisma.customer.findUnique({ where: { id: parseInt(id) }, include:{pets: {
      include: {medicineRecords: {include: {petQueues: {include: {medicine: {include: {pet: {select: {id: true, name: true}}}}}},
      petBeds: { where: {isCompleted: true},include: {medicine: {include: {pet: {select: {id: true, name: true}}}}}}
    
    }}}
    }, transaction: true, customerAccount: {include: {installments: true}}} })


    reply.send(customer)
  }


 
};
