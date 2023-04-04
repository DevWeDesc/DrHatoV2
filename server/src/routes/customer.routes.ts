import { FastifyInstance, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()


export async function customersRoutes(app: FastifyInstance)
{

  const CustomerSchema = z.object({
    id: z.number(),
    name: z.string(),
    email: z.string(),
    adress: z.string(),
    birthday: z.string(),
    cpf: z.string(),
    phone: z.string(),
    pets: z.any()
  });

  app.get("/customers", async (request, reply) => {
    try {
      const customers = await prisma.customer.findMany({include: {pets: true}})
    
    reply.send(customers);
      
    } catch (error) {
      reply.status(404).send(error)
    }

  })


  app.get("/customers/:id", async (request: FastifyRequest, reply) => {

    const { id }: any = (request.params)
    const customer = await prisma.customer.findUnique({ where: { id: parseInt(id) }, include:{pets: true} })
    reply.send(CustomerSchema.parse(customer))
  })
  
  app.get('/customers/search', async (request: FastifyRequest<{ Querystring: { name?: string, cpf?: string, phone?: string } }>, reply) =>{
    const cpf = request.query.cpf
    const name = request.query.name
    const phone = request.query.phone

    try {
      const customer = await prisma.customer.findFirst({where: {
        OR: [
          {name: name},
          {cpf: cpf},
          {phone: phone}
        ]
      }  })

      reply.send(CustomerSchema.parse(customer))
    } catch (error) {
      reply.status(404).send(error)
    }
    
  })
  
  

  app.post('/customers', async (request, reply) => {
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

  });

}