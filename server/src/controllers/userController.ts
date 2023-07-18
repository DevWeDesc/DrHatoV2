import { FastifyRequest, FastifyReply } from "fastify";
import { PrismaClient } from "@prisma/client";
import { ValidationContract } from "../validators/validateContract";
import {  UserSchema  } from "../schemas/schemasValidator";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { z } from "zod";
const prisma = new PrismaClient();
const secret = process.env.JWT_TOKEN

export const userController = {
createUser: async (request: FastifyRequest, reply: FastifyReply)=> {
  const { email, username, password, userType, userIsVet, crmv} = UserSchema.parse(request.body)

  const hashedPassword = await bcrypt.hash(password, 10)


  let contract = new ValidationContract();
  
  await contract.userAlreadyExists(email, 'Usuário já existe!')
  await contract.userHasAllToBeCreated({email, password, username}, "Usuário não tem todos campos obrigatórios")
  if(contract.hadError()){
    reply.status(400).send(contract.showErrors())
    contract.clearErrors()
    return
  }

  await prisma.user.create({
      data: { email, username, password: hashedPassword, userType, userIsVet, crmv}
  })
},

getUsers: async (request: FastifyRequest, reply: FastifyReply)=> {
  const perPage = 10;
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
loginUser: async(request: FastifyRequest, reply: FastifyReply)=> {
  const loginSchema = z.object({
    email: z.string().email(),
    password: z.string(),
  })
  try {
    let contract = new ValidationContract()
    const { email, password} = loginSchema.parse(request.body)
    const user = await prisma.user.findUnique({where: {email}})
    const userData = {
      email: user?.email,
      username: user?.username
    }
    
  
     await contract.userAlreadyExists(email, "Usuário não encontrado")
     await contract.checkPassword({email, password}, "Senha incorreta")
    if(contract.hadError()){
      reply.status(400).send(contract.showErrors())
      contract.clearErrors()
      return
    } 
    if(!secret) {
      return
    } 


   const token = jwt.sign({userData }, secret, {expiresIn: "01h"})
   reply.send({token: token, userData}).status(200)
    

  } catch (error) {
    reply.send({error: error}).status(500)
    console.log(error)
  }
},

getWithId: async (request: FastifyRequest, reply: FastifyReply) => {
  const { id }: any = request.params
  const users = await prisma.user.findUnique({ where:{ id: parseInt(id)}});
  reply.send(users);
},

editUser: async (request: FastifyRequest, reply: FastifyReply) => {
  const{ id}: any = request.params
  const {email, username, password,userIsVet } = UserSchema.parse(request.body) 
  try {
     await prisma.user.update({
        where: { id: parseInt(id) },
        data: {  
           email: email,
           username: username,
           password: password,
           userIsVet: userIsVet
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