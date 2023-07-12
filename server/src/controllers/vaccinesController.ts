import { FastifyRequest, FastifyReply } from "fastify";
import { PrismaClient } from "@prisma/client";
import { AdmissionSchema, BedSchema, VaccineSchema } from "../schemas/schemasValidator";
import { ValidationContract } from "../validators/validateContract";
import { getFormattedDateTime } from "../services/getCurrentDate";
const prisma = new PrismaClient();


type params = {
    id: string;
    recordId: string;
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
        const { id, recordId} = request.params
        const vaccine = await prisma.vaccines.findUnique({where: {id: parseInt(id)}})
        const applicationDate = getFormattedDateTime()
        if(!vaccine) {
            reply.status(400).send("Falha ao buscar vacina/Falha ao criar vacina")
            return
        }
        try {
            await prisma.vaccinesForPet.create({
                data: {name: vaccine?.name, price: vaccine?.price, description: vaccine?.description, applicationDate, medicine: {connect: { id: parseInt(recordId)}}}
            })

            reply.status(201).send("Vacina adicionada ao PET")
        } catch (error) {
            reply.send({message: error})
            console.log(error)
        }
        
    }
}