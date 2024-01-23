import { FastifyRequest, FastifyReply } from "fastify";
import { prisma } from "../interface/PrismaInstance";
import { VaccineSchema } from "../schemas/schemasValidator";
import { getFormattedDateTime } from "../utils/getCurrentDate";
import { accumulatorService } from "../services/accumulatorService";
import { z } from "zod";

type params = {
  id: string;
  recordId: string;
  accId: string;
  queueId: string;
  petId: string;
};

type body = {
  RequestedByVetId: number;
  RequestedByVetName: string;
  isAdmission: boolean;
};

export const vaccinesController = {
  createVaccine: async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const { name, description, price } = VaccineSchema.parse(request.body);

      await prisma.vaccines.create({
        data: { name, description, price },
      });
      reply.send("Sucesso ao criar nova Vacina").status(200);
    } catch (error) {
      reply.send({ message: error });
      console.log(error);
    }
  },

  getAllVaccines: async (
    request: FastifyRequest<{ Querystring: { sex?: string } }>,
    reply: FastifyReply
  ) => {
    try {
      const animalSex = request.query.sex || null;

      const vaccines = await prisma.vaccines.findMany({
        where: {
          disponible: true,
        },
      });
      reply.send(vaccines).status(200);
    } catch (error) {
      reply.send({ message: error });
      console.log(error);
    }
  },

  setVaccineInPet: async (
    request: FastifyRequest<{ Params: params; Body: body }>,
    reply: FastifyReply
  ) => {
    const { id, petId, accId, queueId } = request.params;
    const { RequestedByVetId, RequestedByVetName, isAdmission } = request.body;
    const vaccine = await prisma.vaccines.findUnique({
      where: { id: parseInt(id) },
    });
    if (!vaccine) {
      reply.status(400).send("Falha ao buscar vacina/Falha ao criar vacina");
      return;
    }
    try {
      if (isAdmission === true) {
        await prisma.petConsultsDebits.create({
          data: {
            OpenedAdmissionsForPet: { connect: { id: queueId } },
            isVaccine: true,
            name: vaccine.name,
            price: vaccine.price,
            itemId: vaccine.id,
            RequestedByVetId,
            RequestedByVetName,
          },
        });
      } else {
        await prisma.petConsultsDebits.create({
          data: {
            OpenedConsultsForPet: { connect: { id: queueId } },
            isVaccine: true,
            name: vaccine.name,
            price: vaccine.price,
            itemId: vaccine.id,
            RequestedByVetId,
            RequestedByVetName,
          },
        });
      }

      await prisma.vaccinesForPet.create({
        data: {
          name: vaccine?.name,
          price: vaccine?.price,
          description: vaccine?.description,
          requestedDate: new Date(),
          medicine: { connect: { petId: parseInt(petId) } },
        },
      });

      await accumulatorService.addPriceToAccum(vaccine?.price, accId);

      reply.status(201).send("Vacina adicionada ao PET");
    } catch (error) {
      reply.send({ message: error });
      console.log(error);
    }
  },
  removePetVaccine: async (request: FastifyRequest, reply: FastifyReply) => {
    const DeleteVaccineForPetSchema = z.object({
      id: z.coerce.number(),
      accId: z.coerce.number(),
      vaccinePrice: z.any(),
      linkedDebitId: z.coerce.number(),
    });
    try {
      const { id, accId, vaccinePrice, linkedDebitId } =
        DeleteVaccineForPetSchema.parse(request.params);

      await accumulatorService.removePriceToAccum(Number(vaccinePrice), accId);

      await prisma.petConsultsDebits.delete({
        where: {
          id: linkedDebitId,
        },
      });

      await prisma.vaccinesForPet.delete({
        where: { id: id },
      });

      reply.status(203).send({
        message: "Deletado com sucesso!",
      });
    } catch (error) {
      console.log(error);
    }
  },

  removeVaccine: async (
    request: FastifyRequest<{
      Params: { id: string; accId: string; examPrice: string };
    }>,
    reply: FastifyReply
  ) => {
    const { id, accId, examPrice } = request.params;
    try {
      await accumulatorService.removePriceToAccum(Number(examPrice), accId);

      await prisma.vaccinesForPet.delete({
        where: { id: parseInt(id) },
      });

      reply.status(200).send("Sucesso ao deletar");
    } catch (error) {
      console.log(error);
    }
  },
};
