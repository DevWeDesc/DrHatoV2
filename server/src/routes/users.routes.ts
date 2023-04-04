import { FastifyInstance } from 'fastify'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()



export async function userRoutes(app: FastifyInstance){
  app.post('/users',async (request, reply)=> {
    const { name, username, password, isAdmin}: any = await request.body
 
    await prisma.user.create({
        data: { name, username, password, isAdmin}
    })
 }) 
 
 
 app.get('/users', async (request, reply) => {
 const users = await prisma.user.findMany();
 reply.send(users);
 })

 app.get('/users/:id', async (request, reply) => {
   const { id }: any = request.params
   const users = await prisma.user.findUnique({ where:{ id: parseInt(id)}});
   reply.send(users);
   })
 
 app.get('/userall', async (request: any, reply) => {
   const perPage = 5;
   const users = await prisma.user.findMany();
   const total = Math.ceil(users.length / perPage);
   const pag = request.query.pag || 1;
   const init = (pag - 1) * perPage;
   const end = Math.min(init + perPage, users.length);
   const paginatedUser = users.slice(init, end);
   
   reply.send({
     pag,
     total,
     users: paginatedUser
   });
    })
 
 app.put('/users/:id', async (request, reply) => {
   const{ id}: any = request.params
   const { username, password, isAdmin }:any = request.body
   try {
      await prisma.user.update({
         where: { id: parseInt(id) },
         data: {  
            username: username,
            password: password,
            isAdmin: isAdmin
         }
      })
      reply.status(201)
   } catch (error) {
      console.log(error)
   }
   })
 
   app.delete('/users/:id' , async (request, reply) => {
      const{ id}: any = request.params
      try {
         await prisma.user.delete({
            where: { id: parseInt(id) }
         })
      } catch (error) {
         
      }
   })
}


