import { FastifyInstance } from 'fastify'
import { PrismaClient } from '@prisma/client'
import { request } from 'http'
const prisma = new PrismaClient()
interface ITransaction {
  title: string
  amount: number
  type: string,
  category: string,
  createdAt: string
}
export async function transactionRoutes(app: FastifyInstance){

    app.get('/transactions', async (request, reply) => {
       const data = await prisma.transaction.findMany()
       return reply.send(data)
    })
 
    app.post('/transactions', async (request, reply) => {
       const { title, amount, type, category, createdAt, customerId }: ITransaction | any = request.body
       try {
          await prisma.transaction.create({
         
             data:{  title, amount, type, category, createdAt, customer: {connect: {id: customerId }}} 
          })
       } catch (error) {
             console.log(error)
             reply.send(error)
       }
    })


    app.delete('/transactions/:id', async (request, reply) => {

      const { id }: any = request.params

      try {
         await prisma.transaction.delete({  where: { id: parseInt(id)} })
      } catch (error) {
      console.log(error)
      }
    })
    
}