import { FastifyRequest, FastifyReply } from "fastify";
import { AdmissionSchema, BedSchema } from "../schemas/schemasValidator";
import { ValidationContract } from "../validators/userContract";
import { z } from "zod";
import { prisma } from "../interface/PrismaInstance";
import { GetDebitsInConsultsService } from "../services/GetDebitsInConsultsService";
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
    const { petId, isBusy, dailyRate, mustFasting, kennelId, bedId, recordId, vetPreference } =
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

      const pet = await prisma.pets.findUnique({
        where: { id: petId },
      });

      const { id: openedSurgerieId } =
        await prisma.openededAdmissionsForPet.create({
          data: {
            openedDate: new Date(),
            medicineRecordId: recordId,
            petName: pet?.name,
            isClosed: false,
            petWeight: pet?.weigth?.toString(),
          },
        });

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
                vetPreference,
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
          openedAdmissionId: openedSurgerieId,
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
      queueId: z.string().uuid(),
      admissionId: z.number().optional(),
      totalInAdmission: z.number().optional(),
      responsibleVeterinarianId: z.coerce.number(),
      responsibleVeterinarian: z.string().optional(),
    });
    const {
      petId,
      bedId,
      admissionId,
      totalInAdmission,
      queueId,
      responsibleVeterinarianId,
      responsibleVeterinarian,
    } = FinishAdmissionSchema.parse(request.body);
    const actualDate = new Date();
    const bedDetails = await prisma.bed.findUnique({
      where: { id: bedId },
    });

    if (!bedDetails) {
      return;
    }

    const totalToPay = await getDiferrenceBetweenOurs(
      bedDetails.entryOur,
      actualDate,
      bedDetails.dailyRate
    );
    const totalFinal = Number(totalToPay) + Number(totalInAdmission);
    try {
      await prisma.bed.update({
        where: { id: bedId },
        data: {
          exitOur: actualDate,
          totalDebt: Number(totalToPay),
          isBusy: false,
        },
      });

      await prisma.pets.update({
        where: { id: petId },
        data: {
          customer: {
            update: {
              customerAccount: {
                update: {
                  debits: { increment: totalFinal },
                },
              },
            },
          },
        },
      }),
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

      const pet = await prisma.pets.update({
        where: { id: petId },
        data: { priceAccumulator: { update: { accumulator: 0 } } },
        include: {
          customer: { include: { customerAccount: true } },
        },
      });

      const getDebitsInConsultService = new GetDebitsInConsultsService();

      const { total } = await getDebitsInConsultService.execute({
        queueId,
        isAdmission: true,
      });
      await prisma.openededAdmissionsForPet.update({
        where: { id: queueId },
        data: {
          closedDate: new Date(),
          petWeight: pet.weigth?.toString(),
          totaLDebits: total,
          isClosed: true,
          closedByVetId: responsibleVeterinarianId,
          clodedByVetName: responsibleVeterinarian,
          customerAccountId: pet.customer?.customerAccount?.id,
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

  showAdmitedPetsClosed: async (
    request: FastifyRequest,
    reply: FastifyReply
  ) => {
    try {
      const admmitepet = await prisma.openededAdmissionsForPet.findMany({
        where: {
          isClosed: true,
        },
        include: {
          MedicineRecord: {
            include: {
              pet: true,
            },
          },
          customerAccount: {
            include: {
              customer: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      });

      const data = admmitepet.map((admission) => {
        let data = {
          id: admission.id,
          customer: {
            name: admission.customerAccount?.customer.name,
          },
          name: admission.petName,
          especie: admission.MedicineRecord?.pet?.especie ?? "",
          race: admission.MedicineRecord?.pet.race ?? "",
          bed: {
            entryOur: admission.openedDate,
            kennel: {
              name: "-",
            },
            id: "-",
          },
          CodAnimal: admission.MedicineRecord?.pet?.CodAnimal,
        };
        return data;
      });
      reply.send(data);
    } catch (error) {
      console.log(error);
    }
  },

  showAdmitedPets: async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const admmitepet = await prisma.pets.findMany({
        where: { bed: { isBusy: true } },
        include: {
          bed: { include: { kennel: true } },
          customer: { select: { name: true } },
          medicineRecords: {
            include: { petBeds: { where: { isCompleted: false } } },
          },
        },
      });
      reply.send(admmitepet);
    } catch (error) {
      console.log(error);
    }
  },

  recordHospDiary: async (
    request: FastifyRequest<{
      Params: { bedId: string };
      Body: { observations: string };
    }>,
    reply: FastifyReply
  ) => {
    try {
      const { bedId } = request.params;
      const { observations } = request.body;

      await prisma.hospitalizationDiary.create({
        data: {
          observations,
          BedsForPet: { connect: { id: parseInt(bedId) } },
        },
      });

      reply.send("Gravação concluida com sucesso!");
    } catch (error) {
      reply.send(error);
      console.log(error);
    }
  },
};
