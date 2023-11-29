import { FastifyRequest, FastifyReply } from "fastify";
import { ProcedureSchema } from "../schemas/schemasValidator";
import { ValidationContract } from "../validators/userContract";
import { getFormattedDateTime } from "../utils/getCurrentDate";
import { accumulatorService } from "../services/accumulatorService";
import { prisma } from "../interface/PrismaInstance";

type params = {
  id: string;
  queueId: string;
  procedureId: string;
  petId: string;
  accId: string;
};

type body = {
  RequestedByVetId: number;
  RequestedByVetName: string;
}

export const proceduresController = {
  createProcedure: async (request: FastifyRequest, reply: FastifyReply) => {
    const {
      name,
      price,
      available,
      observations,
      applicationInterval,
      applicableFemale,
      applicableMale,
      priceTwo,
      priceThree,
      priceFour,
      minAge,
      maxAge,
      sector_id,
    } = ProcedureSchema.parse(request.body);
    try {
     
      await prisma.procedures.create({
        data: {
          name,
          price,
          priceTwo,
          priceThree,
          priceFour,
          available,
          observations,
          applicationInterval,
          applicableFemale,
          applicableMale,
          maxAge,
          minAge,
          sector: {connect: {id: parseInt(sector_id)}}
    
        },
      });
      reply.status(201).send("Procedimento criado!");
    } catch (error) {
      console.log(error);
      reply.status(400).send({ message: error });
    }
  },

  getProcedures: async (request: FastifyRequest<{Querystring: { page: string;}}>, reply: FastifyReply) => {
    try {
            // Obtenha o número da página atual a partir da solicitação.
            const currentPage = Number(request.query.page) || 1;

            // Obtenha o número total de usuários.
            const totalProceds = await prisma.procedures.count();
        
            // Calcule o número de páginas.
            const totalPages = Math.ceil(totalProceds / 35);
        
      const procedures = await prisma.procedures.findMany({
        skip: (currentPage - 1) * 35,
        take: 35,
        include: {
          groups: { select: { name: true } },
          sector: { select: { name: true } },
        },
      });
      
      reply.send({totalPages, totalProceds,  currentPage, procedures });
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

      sector_id,
    } = ProcedureSchema.parse(request.body);

      try {
        await prisma.procedures.update({where: {id: parseInt(id)}, data: {
          name,
          price,
          available,
          observations,
          applicationInterval,
   
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

  setProcedureInPet: async(request: FastifyRequest<{Params: params, Body: body}>, reply: FastifyReply) => {
    const actualDate = getFormattedDateTime()
    const {procedureId, petId,  accId, queueId} = request.params
    const {RequestedByVetId, RequestedByVetName} = request.body
    try {
     
      const procedure = await prisma.procedures.findUnique({where: {id: parseInt(procedureId)}})
      if(!procedure) return
        
      await prisma.petConsultsDebits.create({
        data: {
          OpenedConsultsForPet: {connect: {id: queueId}},
          isProcedure: true,
          name: procedure.name,
          price: procedure.price,
          itemId: procedure.id,
          RequestedByVetId,
          RequestedByVetName,

        }
      }).then(async () => {
        await prisma.proceduresForPet.create({
          data: {
            name: procedure.name,
            available: procedure.available,
            observations: procedure.observations,
            price: procedure.price,
            applicationInterval: procedure.applicationInterval,
            requestedDate: actualDate,
            medicine: {connect: {petId: parseInt(petId)}}
          }
        })
      }).then(async () => {
        await accumulatorService.addPriceToAccum(procedure?.price, accId)
        reply.status(200).send("Procedimento adicionado com sucesso!")
      })

      
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
