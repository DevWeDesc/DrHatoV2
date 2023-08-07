import { FastifyRequest, FastifyReply } from "fastify";
import { PrismaClient } from "@prisma/client";
import { AdmissionSchema, BedSchema, VaccineSchema } from "../schemas/schemasValidator";
import { ValidationContract } from "../validators/validateContract";
import { getFormattedDateTime } from "../utils/getCurrentDate";
import { accumulatorService } from "../services/accumulatorService";
const prisma = new PrismaClient();


type params = {
    id: string;
    recordId: string;
    accId: string;
  }


export const vaccinesController = {
    createVaccine: async (request: FastifyRequest, reply: FastifyReply) => {
        try {
            const {
                name,
                description,
                price
            } = VaccineSchema.parse(request.body)

            await prisma.vaccines.create({
                data: {name, description, price}
            })
            reply.send("Sucesso ao criar nova Vacina").status(200)
        } catch (error) {
            reply.send({message: error})
            console.log(error)
        }
    },

    getAllVaccines: async (request: FastifyRequest, reply: FastifyReply) => {
         try {
            const vaccines = await prisma.vaccines.findMany()
            reply.send(vaccines).status(200)
         } catch (error) {
            reply.send({message: error})
            console.log(error)
         }
    },

    setVaccineInPet: async (request: FastifyRequest<{Params: params}>, reply: FastifyReply) => {
        const { id, recordId, accId} = request.params
        const vaccine = await prisma.vaccines.findUnique({where: {id: parseInt(id)}})
        const requestedDate = getFormattedDateTime()
        if(!vaccine) {
            reply.status(400).send("Falha ao buscar vacina/Falha ao criar vacina")
            return
        }
        try {
            await prisma.vaccinesForPet.create({
                data: {name: vaccine?.name, price: vaccine?.price, description: vaccine?.description, requestedDate, medicine: {connect: { id: parseInt(recordId)}}}
            })
            
            await accumulatorService.addPriceToAccum(vaccine?.price, accId)
            
            reply.status(201).send("Vacina adicionada ao PET")
        } catch (error) {
            reply.send({message: error})
            console.log(error)
        }
        
    },

    removeVaccine: async (request: FastifyRequest<{ Params: { id: string; accId: string; examPrice: string;}}>, reply: FastifyReply) => {
        const {id, accId, examPrice} = request.params
        try {
    
            await accumulatorService.removePriceToAccum(Number(examPrice), accId)
    
            await prisma.vaccinesForPet.delete({
                where: {id: parseInt(id)}
            })
    
            reply.status(200).send("Sucesso ao deletar")
        } catch (error) {
            console.log(error)
        }
     },


}