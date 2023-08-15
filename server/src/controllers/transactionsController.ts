import { FastifyRequest, FastifyReply } from "fastify";
import { prisma } from "../interface/PrismaInstance";
import { z } from "zod";

interface ITransaction {
    title: string
    amount: number
    type: string,
    category: string,
    createdAt: string
  }

export const transactionController = {


getAllTransactions: async (request: FastifyRequest, reply: FastifyReply) => {
    const data = await prisma.transaction.findMany()
       return reply.send(data)
},

getCustomerTransactions: async (request: FastifyRequest, reply: FastifyReply) =>{
    const IdSchema = z.object({
        id: z.string(),
    })
    const { id } = IdSchema.parse(request.params)

    try {
        const userTransactions = await prisma.transaction.findMany({
            where: {transaction_id: parseInt(id)}
        })

        reply.send(userTransactions)
    } catch (error) {
        reply.status(404).send(error)
        console.error(error)
    }
},
 
createTransaction: async (request: FastifyRequest, reply: FastifyReply) => {
    const { title, amount, type, category, createdAt, customerId }: ITransaction | any = request.body
    try {
       await prisma.transaction.create({
      
          data:{  title, amount, type, category, createdAt, customer: {connect: {id: parseInt(customerId)}}} 
       })
    } catch (error) {
          console.log(error)
          reply.send(error)
    }
},


 deleteUser: async (request: FastifyRequest, reply: FastifyReply) => {
        const { id }: any = request.params
        try {
           await prisma.transaction.delete({  where: { id: parseInt(id)} })
        } catch (error) {
        console.log(error)
        }
     
 }   
}