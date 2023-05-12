import { FastifyRequest, FastifyReply } from "fastify";
import { PrismaClient } from "@prisma/client";
import { ProcedureSchema } from "../schemas/schemasValidator";
import { ValidationContract } from "../validators/validateContract";
const prisma = new PrismaClient();

type params = {
    id: string;
  }

export const proceduresController =  {
    createProcedure: async (request: FastifyRequest, reply: FastifyReply) => {
      const contract = new ValidationContract() 
      const {name,price, available, observations, applicationInterval,ageRange, applicableGender, group_id, sector_id } = ProcedureSchema.parse(request.body)
      try {
          await contract.procedureAlreadyExist(name, "Procedimento já existe")
          if(contract.hadError()){
              reply.status(400).send(contract.showErrors())
              contract.clearErrors()
              return
            }

          await prisma.procedures.create({data: {name,price, available,observations,applicationInterval,ageRange,applicableGender, group_id,sector_id } })
           reply.status(201).send("Procedimento criado!")
      } catch (error) {
          console.log(error)
          reply.status(400).send({message: error})
      }
    },

    getProcedures: async (request: FastifyRequest, reply: FastifyReply) => {
      const procedures = await prisma.procedures.findMany()
      try {
        reply.send(procedures)
      } catch (error) {
        console.log(error)
        reply.status(400).send({message: error})
      }
    },

    getWithId: async (request: FastifyRequest<{Params: params }>, reply: FastifyReply) => {
      const {id} = request.params
      try {
        const procedure = await prisma.procedures.findUnique({where: {id: parseInt(id)}, include: {groups: {select: {name: true}}}})
        reply.send(procedure)
      } catch (error) {
        console.log(error)
        reply.status(400).send({message: error})
      }
    }


  }