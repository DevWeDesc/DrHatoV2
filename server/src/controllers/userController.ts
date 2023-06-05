import { FastifyRequest, FastifyReply } from "fastify";
import { PrismaClient } from "@prisma/client";
import { ValidationContract } from "../validators/validateContract";
import {  UserSchema  } from "../schemas/schemasValidator";
import { z } from "zod";
const prisma = new PrismaClient();


export const userController = {
createUser: async (request: FastifyRequest, reply: FastifyReply)=> {
  const { name, username, password, userType} = UserSchema.parse(request.body)
  let contract = new ValidationContract();

  await contract.userAlreadyExists(name, 'Usuário já existe!')
  if(contract.hadError()){
    reply.status(400).send(contract.showErrors())
    contract.clearErrors()
    return
  }

  await prisma.user.create({
      data: { name, username, password, userType}
  })
},

getUsers: async (request: FastifyRequest, reply: FastifyReply)=> {
  const perPage = 5;
  const users = await prisma.user.findMany();
  const total = Math.ceil(users.length / perPage);
  //@ts-ignore
  const pag =  1 || request.query.pag
  const init = (pag - 1) * perPage;
  const end = Math.min(init + perPage, users.length);
  const paginatedUser = users.slice(init, end);
  
  reply.send({
    pag,
    total,
    users: paginatedUser
  });

},

getWithId: async (request: FastifyRequest, reply: FastifyReply) => {
  const { id }: any = request.params
  const users = await prisma.user.findUnique({ where:{ id: parseInt(id)}});
  reply.send(users);
},

editUser: async (request: FastifyRequest, reply: FastifyReply) => {
  const{ id}: any = request.params
  const { username, password, userType } = UserSchema.parse(request.body) 
  try {
     await prisma.user.update({
        where: { id: parseInt(id) },
        data: {  
           username: username,
           password: password,
           userType: userType,
        }
     })
     reply.status(201)
  } catch (error) {
    console.log(error)
    reply.status(400)
    
  }
},

deleteUser: async (request: FastifyRequest, reply: FastifyReply) => {
  const{ id}: any = request.params
  try {
     await prisma.user.delete({
        where: { id: parseInt(id) }
     })
     reply.status(202)
  } catch (error) {
     reply.status(400)
     console.log(error)
  }
},
findVetUsers: async (request: FastifyRequest, reply: FastifyReply) => {
  const vetUsers = await prisma.user.findMany({
    where: {
      userIsVet: true
    }
  })

  try {
    reply.send(vetUsers).status(200)
  } catch (error) {
    console.error(error)
    reply.status(400).send({message: error})
  }
}
}