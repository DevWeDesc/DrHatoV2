import { FastifyRequest, FastifyReply } from "fastify";
import { prisma } from "../interface/PrismaInstance";
import { ValidationContract } from "../validators/userContract";
import {  UserSchema  } from "../schemas/schemasValidator";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { z } from "zod";
import { ResourceNotFoundError } from "../errors/ResouceNotFoundError";
import { InvalidPasswordError } from "../errors/InvalidPasswordError";

const secret = process.env.JWT_TOKEN

export const userController = {
createUser: async (request: FastifyRequest, reply: FastifyReply)=> {
  const { email, username, password, userType, userIsVet, crmv, role, name} = UserSchema.parse(request.body)

  const hashedPassword = await bcrypt.hash(password, 10)


  let contract = new ValidationContract();
  
  //await contract.userAlreadyExists(email, 'Usuário já existe!')
  await contract.userHasAllToBeCreated({email, password, username}, "Usuário não tem todos campos obrigatórios")
  if(contract.hadError()){
    reply.status(400).send(contract.showErrors())
    contract.clearErrors()
    return
  }

  await prisma.user.create({
      data: { email, username, name, password: hashedPassword, userType, userIsVet, crmv, role}
  })
},

getUsers: async (request: FastifyRequest<{Querystring: {page: string}}>, reply: FastifyReply)=> {
  const { page} = request.query
  const perPage = 10;
  const users = await prisma.user.findMany();
  const total = Math.ceil(users.length / perPage);
  //@ts-ignore
  const pag =  page ? page : 1
  const init = (Number(pag) - 1) * perPage;
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
    username: z.string(),
    password: z.string(),
  })
  try {

    let contract = new ValidationContract()
    const { username, password} = loginSchema.parse(request.body)
    const user = await prisma.user.findUnique({where: {
          username
    }})


    if (!user) {
      return reply.send("Usuário não encontrado")
    }

    const userData = {
      id: user.id,
      crm: user?.crmv,
      username: user?.username,
      name: user.name,
      consultName: user.consultName,
      role: user.role
    }
    
  
    
    const checkedPassword =  await contract.checkPassword({username, password}, "Senha incorreta")

    if(!checkedPassword || checkedPassword === undefined) {
      throw new Error('Something wrong with this credentials')
    }

    if(!secret) {
      return
    } 

  
   const token = jwt.sign({userData}, secret, {expiresIn: "01h"})
     reply.send({token: token, userData}).status(200)
    

  } catch (error) {

    if(error instanceof ResourceNotFoundError || error instanceof InvalidPasswordError) {
      reply.status(404).send({error: error.message})
    }

    reply.send({error: error}).status(500)
  }
},

getWithId: async (request: FastifyRequest, reply: FastifyReply) => {
  const { id }: any = request.params
  const users = await prisma.user.findUnique({ where:{ id: parseInt(id)}});
  reply.send(users);
},

editUser: async (request: FastifyRequest, reply: FastifyReply) => {
  const{ id}: any = request.params
  const {email, username, password,userIsVet, crmv, role } = UserSchema.parse(request.body) 
  const hashedPassword = await bcrypt.hash(password, 10)
  try {
     await prisma.user.update({
        where: { id: parseInt(id) },
        data: {  
           email: email,
           username: username,
           password: hashedPassword,
           userIsVet: userIsVet,
           crmv, 
           role
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
},

getVetUsers: async (request: FastifyRequest, reply: FastifyReply) => {

  const totalVets = await prisma.user.count({
    where: {role: 'VETERINARIAN'}
  })

  const vets = await prisma.user.findMany({
    where: {
      role: 'VETERINARIAN',
    },select: {
      username: true,
      id: true,
      crmv: true,
      name: true,
      consultName: true
    }

  })

  try {
    reply.send({totalVets,vets}).status(200)
  } catch (error) {
    console.error(error)
    reply.status(400).send({message: error})
  }
},

searchVetByName: async (request: FastifyRequest<{
  Params: { consultName: string}
}>, reply: FastifyReply) => {
try {
  const {consultName} = request.params
  const vets = await prisma.user.findMany({
    where: {
      consultName: {contains: consultName},
      role: 'VETERINARIAN'
    }})


    reply.send(vets)

} catch (error) {
    reply.send(error)
}
}
}