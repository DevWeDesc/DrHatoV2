import { FastifyRequest, FastifyReply } from "fastify";
import { AdmissionSchema, BedSchema } from "../schemas/schemasValidator";
import { ValidationContract } from "../validators/userContract";
import { z } from "zod";
import { prisma } from "../interface/PrismaInstance";
const { getDiferrenceBetweenOurs } = require("../utils/countOurs");


type params = {
  id: string;
  recordId: string;
};

export const admissionsController = {
  createKennel: async (request: FastifyRequest, reply: FastifyReply) => {
    const { name, totalBeds, price, description } = AdmissionSchema.parse(
      request.body
    );
    try {
      const allBeds = [];
      for (let index = 0; index < totalBeds; index++) {
        allBeds.push({});
      }
      await prisma.kennel.create({
        data: {
          name,
          totalBeds,
          description,
          price,
          beds: {
            createMany: {
              data: allBeds,
            },
          },
        },
      });
      reply.status(201);
    } catch (error) {
      reply.status(400).send({ message: error });
    }
  },
  getKennels: async (request: FastifyRequest, reply: FastifyReply) => {
    const kennels = await prisma.kennel.findMany({
      include: {
        beds: {
          select: {
            id: true,
            isBusy: true,
            mustFasting: true,
            pet: { select: { name: true } },
          },
        },
      },
    });
    try {
      reply.send(kennels).status(200);
    } catch (error) {
      reply.status(400).send({ message: error });
    }
  },
  getBeds: async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const beds = await prisma.bed.findMany();

      const allBeds = beds.map((bed) => {
        let data = {
          id: bed.id,
          isBusy: bed.isBusy,
          mustFasting: bed.mustFasting,
        };
        return data;
      });
      reply.send(allBeds).status(200);
    } catch (error) {
      reply.status(400).send({ message: error });
    }
  },

  admitPet: async (request: FastifyRequest, reply: FastifyReply) => {
    const { petId, isBusy, dailyRate, mustFasting, kennelId, bedId, recordId } =
      BedSchema.parse(request.body);
    const contract = new ValidationContract();
    const actualDate = new Date();
    try {
      await contract.validateBedIsBusy(bedId, "Leito já ocupado");
      if (contract.hadError()) {
        reply.status(400).send(contract.showErrors());
        contract.clearErrors();
        return;
      }
      await prisma.kennel.update({
        where: { id: kennelId },
        data: {
          beds: {
            update: {
              where: { id: bedId },
              data: {
                isBusy: isBusy,
                mustFasting,
                dailyRate,
                entryOur: actualDate,
                pet: { connect: { id: petId } },
              },
            },
          },
        },
      });

      await prisma.bedsForPet.create({
        data: {
          entryOur: actualDate,
          mustFasting,
          isCompleted: false,
          medicine: { connect: { id: recordId } },
        },
      });

      reply.send("Animal internado com sucesso");
    } catch (error) {
      reply.status(400).send(error);
      console.log(error);
    }
  },

  finishPetAdmission: async (request: FastifyRequest, reply: FastifyReply) => {
    const FinishAdmissionSchema = z.object({
      petId: z.number().optional(),
      bedId: z.number().optional(),
      admissionId: z.number().optional(),
    });
    const { petId, bedId, admissionId } = FinishAdmissionSchema.parse(
      request.body
    );
    const actualDate = new Date();
    const bedDetails = await prisma.bed.findUnique({
      where: { id: bedId },
    });
    if (!bedDetails) {
      return; 
    }

    const totalToPay = await getDiferrenceBetweenOurs(bedDetails.entryOur,actualDate, bedDetails.dailyRate
    );
    
    try {
      await prisma.bed.update({
        where: { id: bedId }, data: {
          exitOur: actualDate,
          totalDebt: Number(totalToPay),
          isBusy: false,
        },
      });

      await prisma.pets.update({
        where: { id: petId },
        data: {
          debits: {increment: Number(totalToPay)},
        },
      });

      await prisma.bedsForPet.update({
        where: { id: admissionId },
        data: {
          exitOur: actualDate,
          totalDebt: Number(totalToPay),
          isCompleted: true,
        },
      });

      await prisma.bed.update({
        where: { id: bedId },
        data: {
          petId: null,
          dailyRate: null,
          entryOur: null,
          exitOur: null,
          totalDebt: null,
          hospitalizedDays: null,
        },
      });

      reply.send("Internação Encerrada com sucesso").status(202);
    } catch (error) {
      console.log(error);
      reply.send(error);
    }
  },

  getBusyAndAdmittedPets: async (
    request: FastifyRequest,
    reply: FastifyReply
  ) => {
    try {
      const response = await prisma.kennel.findMany({
        include: {
          beds: {
            select: {
              id: true,
              isBusy: true,
              mustFasting: true,
              pet: { select: { name: true } },
            },
          },
        },
      });

      const data = response.map((kennel) => {
        let data = {
          name: kennel.name,
          totalOcupedBeds: kennel.beds.filter((bed) => bed.isBusy === true)
            .length,
          beds: kennel.beds.map((bed) => {
            const data = {
              petName: bed.pet?.name,
              id: bed.id,
              busy: bed.isBusy,
              fasting: bed.mustFasting,
            };
            return data;
          }),
        };
        return data;
      });
      reply.send(data).status(200);
    } catch (error) {
      reply.status(400).send({ message: error });
    }
  },

  showAdmitedPets: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
          const admmitepet = await prisma.pets.findMany({
            where: {bed: {isBusy: true}}, include: {bed: {include: {kennel: true}}, customer: {select: {name: true}}, medicineRecords: {include: {petBeds: {where: {isCompleted: false} }}}}
          })
          reply.send(admmitepet)
      } catch (error) {
        console.log(error)
      }
  }
};
