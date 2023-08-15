import { FastifyRequest, FastifyReply } from "fastify";
import { PrismaClient } from "@prisma/client";
import { ProcedureSchema } from "../schemas/schemasValidator";
import { ValidationContract } from "../validators/validateContract";
import { getFormattedDateTime } from "../utils/getCurrentDate";
import { accumulatorService } from "../services/accumulatorService";
const prisma = new PrismaClient();

type params = {
  id: string;
};

export const proceduresController = {
  createProcedure: async (request: FastifyRequest, reply: FastifyReply) => {
    const contract = new ValidationContract();
    const {
      name,
      price,
      available,
      observations,
      applicationInterval,
      ageRange,
      applicableGender,
      group_id,
      sector_id,
    } = ProcedureSchema.parse(request.body);
    try {
      await contract.procedureAlreadyExist(name, "Procedimento já existe");
      if (contract.hadError()) {
        reply.status(400).send(contract.showErrors());
        contract.clearErrors();
        return;
      }

      await prisma.procedures.create({
        data: {
          name,
          price,
          available,
          observations,
          applicationInterval,
          ageRange,
          applicableGender,
          group_id,
          sector_id,
        },
      });
      reply.status(201).send("Procedimento criado!");
    } catch (error) {
      console.log(error);
      reply.status(400).send({ message: error });
    }
  },

  getProcedures: async (request: FastifyRequest, reply: FastifyReply) => {
    const procedures = await prisma.procedures.findMany({
      include: {
        groups: { select: { name: true } },
        sector: { select: { name: true } },
      },
    });
    try {
      reply.send(procedures);
    } catch (error) {
      console.log(error);
      reply.status(400).send({ message: error });
    }
  },

  getWithId: async (
    request: FastifyRequest<{ Params: params }>,
    reply: FastifyReply
  ) => {
    const { id } = request.params;
    try {
      const procedure = await prisma.procedures.findUnique({
        where: { id: parseInt(id) },
        include: {
          groups: { select: { name: true } },
          sector: { select: { name: true } },
        },
      });
      reply.send(procedure);
    } catch (error) {
      console.log(error);
      reply.status(400).send({ message: error });
    }
  },

  editProcedure:   async (
    request: FastifyRequest<{ Params: params }>,
    reply: FastifyReply
  ) => {
    const { id } = request.params;
    const {
      name,
      price,
      available,
      observations,
      applicationInterval,
      ageRange,
      applicableGender,
      group_id,
      sector_id,
    } = ProcedureSchema.parse(request.body);

      try {
        await prisma.procedures.update({where: {id: parseInt(id)}, data: {
          name,
          price,
          available,
          observations,
          applicationInterval,
          ageRange,
          applicableGender,
          group_id,
          sector_id,
        }})
      } catch (error) {
        
      }
  },
  
  deleteProcedure: async (
    request: FastifyRequest<{ Params: params }>,
    reply: FastifyReply
  ) => {
    const{ id} = request.params
    try {
      await prisma.procedures.delete({where: {id: parseInt(id)}})
      reply.status(204).send("Procedimento deletado!")
    } catch (error) {
      reply.status(400).send("Falha ao deletar procedimento!")
      console.log(error)
    }
  },

  setProcedureInPet: async(request: FastifyRequest<{Params: {recordId: string, procedureId: string, accId: string;}}>, reply: FastifyReply) => {
    const actualDate = getFormattedDateTime()
    const {recordId, procedureId, accId} = request.params
    try {
     
      const procedure = await prisma.procedures.findUnique({where: {id: parseInt(procedureId)}})
      if(!procedure) return
      
      await prisma.proceduresForPet.create({
        data: {
          name: procedure.name,
          available: procedure.available,
          observations: procedure.observations,
          price: procedure.price,
          ageRange: procedure.ageRange,
          applicableGender: procedure.applicableGender,
          applicationInterval: procedure.applicationInterval,
          requestedDate: actualDate,
          medicine: {connect: {id: parseInt(recordId)}}
        }
      })
      
      await accumulatorService.addPriceToAccum(procedure?.price, accId)
      reply.status(200).send("Procedimento adicionado com sucesso!")
    } catch (error) {
      reply.status(400).send({message: error})
      console.log(error)
    }
  },

  deleteProcedureOfPet: async (request: FastifyRequest<{Params: { id: string; procedPrice: string; accId: string;}}>, reply: FastifyReply) => {
    try {

      const { id, procedPrice, accId} = request.params


      await accumulatorService.removePriceToAccum(Number(procedPrice), accId)

      await prisma.proceduresForPet.delete({
        where: {id: parseInt(id)}
      })

    
      reply.send("Procedimento deletado com sucesso!").status(203)
      
      reply.status(200)
    } catch (error) {
        console.log(error)
        reply.send({message: error})
    }
  }
};
