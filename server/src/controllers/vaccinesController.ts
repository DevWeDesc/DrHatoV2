import { FastifyRequest, FastifyReply } from "fastify";
import { prisma } from "../interface/PrismaInstance";
import { VaccineSchema } from "../schemas/schemasValidator";
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
      const CreateVaccineSchema = z.object({
        name: z.string(),
        price: z.number(),
        description: z.string(),
        disponible: z.boolean().optional(),
        applicableFemale: z.boolean().optional(),
        applicableMale: z.boolean().optional(),
        health_id: z.number(),
      });
      const {
        name,
        description,
        price,
        applicableFemale,
        applicableMale,
        disponible,
        health_id,
      } = CreateVaccineSchema.parse(request.body);

      await prisma.vaccines.create({
        data: {
          name,
          description,
          price,
          disponible,
          applicableFemale,
          applicableMale,
          HealthInsurance: {
            connect: { id: health_id },
          },
        },
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

      if (animalSex === "Macho") {
        const vaccines = await prisma.vaccines.findMany({
          where: {
            disponible: true,
            applicableMale: true,
          },
        });
        reply.send(vaccines).status(200);
      } else if (animalSex === "Fêmea") {
        const vaccines = await prisma.vaccines.findMany({
          where: {
            disponible: true,
            applicableFemale: true,
          },
        });
        reply.send(vaccines).status(200);
      } else {
        const vaccines = await prisma.vaccines.findMany({
          where: {
            disponible: true,
          },
        });
        reply.send(vaccines).status(200);
      }
    } catch (error) {
      reply.send({ message: error });
      console.log(error);
    }
  },

  getVaccinesByLetter: async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const getVaccinesByLetterSchema = z.object({
        letter: z.string(),
        page: z.coerce.number(),
      });
      const { letter, page } = getVaccinesByLetterSchema.parse(request.params);
      const currentPage = page || 1;
      const getVaccinesByLetterSchemaQuery = z.object({
        sex: z.string(),
      });

      const { sex: animalSex } = getVaccinesByLetterSchemaQuery.parse(
        request.query
      );

      if (animalSex === "Macho") {
        const totalVaccines = await prisma.vaccines.count({
          where: {
            name: { startsWith: letter.toUpperCase() },
            applicableMale: true,
          },
        });

        const totalPages = Math.ceil(totalVaccines / 35);

        const vaccines = await prisma.vaccines.findMany({
          skip: (currentPage - 1) * 35,
          take: 35,
          where: {
            name: { startsWith: letter.toUpperCase() },
            applicableMale: true,
          },
        });

        reply.status(200).send({
          currentPage,
          totalPages,
          totalVaccines,
          vaccines,
        });
      } else if (animalSex === "Fêmea") {
        const totalVaccines = await prisma.vaccines.count({
          where: {
            name: { startsWith: letter.toUpperCase() },
            applicableFemale: true,
          },
        });

        const totalPages = Math.ceil(totalVaccines / 35);

        const vaccines = await prisma.vaccines.findMany({
          skip: (currentPage - 1) * 35,
          take: 35,
          where: {
            name: { startsWith: letter.toUpperCase() },
            applicableFemale: true,
          },
        });

        reply.status(200).send({
          currentPage,
          totalPages,
          totalVaccines,
          vaccines,
        });
      } else {
        const totalVaccines = await prisma.vaccines.count({
          where: { name: { startsWith: letter.toUpperCase() } },
        });

        const totalPages = Math.ceil(totalVaccines / 35);

        const vaccines = await prisma.vaccines.findMany({
          skip: (currentPage - 1) * 35,
          take: 35,
          where: { name: { startsWith: letter.toUpperCase() } },
        });

        reply.status(200).send({
          currentPage,
          totalPages,
          totalVaccines,
          vaccines,
        });
      }
    } catch (error) {
      console.log(error);
    }
  },

  getVaccinesByName: async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const getVaccinesByLetterSchema = z.object({
        name: z.string(),
        page: z.coerce.number(),
      });

      const getVaccinesByLetterSchemaQuery = z.object({
        sex: z.string(),
      });

      const { sex } = getVaccinesByLetterSchemaQuery.parse(request.query);
      const { name, page } = getVaccinesByLetterSchema.parse(request.params);
      const currentPage = page || 1;
      // Obtenha o número total de usuários.

      if (sex === "Macho") {
        const totalVaccines = await prisma.vaccines.count({
          where: {
            name: { contains: name, mode: "insensitive" },
            applicableMale: true,
          },
        });

        const totalPages = Math.ceil(totalVaccines / 35);

        const vaccines = await prisma.vaccines.findMany({
          skip: (currentPage - 1) * 35,
          take: 35,
          where: {
            name: { contains: name, mode: "insensitive" },
            applicableMale: true,
          },
        });

        reply.status(200).send({
          currentPage,
          totalPages,
          totalVaccines,
          vaccines,
        });
      } else if (sex === "Fêmea") {
        const totalVaccines = await prisma.vaccines.count({
          where: {
            name: { contains: name, mode: "insensitive" },
            applicableFemale: true,
          },
        });

        const totalPages = Math.ceil(totalVaccines / 35);

        const vaccines = await prisma.vaccines.findMany({
          skip: (currentPage - 1) * 35,
          take: 35,
          where: {
            name: { contains: name, mode: "insensitive" },
            applicableFemale: true,
          },
        });

        reply.status(200).send({
          currentPage,
          totalPages,
          totalVaccines,
          vaccines,
        });
      } else {
        const totalVaccines = await prisma.vaccines.count({
          where: {
            name: { contains: name, mode: "insensitive" },
          },
        });

        const totalPages = Math.ceil(totalVaccines / 35);

        const vaccines = await prisma.vaccines.findMany({
          skip: (currentPage - 1) * 35,
          take: 35,
          where: { name: { contains: name, mode: "insensitive" } },
        });

        reply.status(200).send({
          currentPage,
          totalPages,
          totalVaccines,
          vaccines,
        });
      }
    } catch (error) {
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
      const pet = await prisma.pets.findUnique({
        where: { id: parseInt(petId) },
      });

      let priceSurgerieByAnimalWeight: number | any = 0;

      if (!pet?.weigth) throw new Error("Peso do animal não encontrado!");
      if (pet?.weigth < 7) {
        priceSurgerieByAnimalWeight = vaccine?.price;
      } else if (pet?.weigth >= 7 && pet?.weigth < 16) {
        priceSurgerieByAnimalWeight = vaccine?.priceTwo;
      } else if (pet?.weigth >= 16 && pet?.weigth < 35) {
        priceSurgerieByAnimalWeight = vaccine?.priceThree;
      } else {
        priceSurgerieByAnimalWeight = vaccine?.priceFour;
      }

      if (isAdmission === true) {
        await prisma.petConsultsDebits
          .create({
            data: {
              OpenedAdmissionsForPet: { connect: { id: queueId } },
              isVaccine: true,
              name: vaccine.name,
              price: priceSurgerieByAnimalWeight,
              itemId: vaccine.id,
              RequestedByVetId,
              RequestedByVetName,
              sectorId: vaccine.sector_id,
            },
          })
          .then(async (res) => {
            await prisma.vaccinesForPet.create({
              data: {
                name: vaccine?.name,
                price: priceSurgerieByAnimalWeight,
                description: vaccine?.description,
                requestedDate: new Date(),
                medicine: { connect: { petId: parseInt(petId) } },
                linkedConsultDebitId: res.id,
              },
            });
          });
      } else {
        await prisma.petConsultsDebits
          .create({
            data: {
              OpenedConsultsForPet: { connect: { id: queueId } },
              isVaccine: true,
              name: vaccine.name,
              price: priceSurgerieByAnimalWeight,
              itemId: vaccine.id,
              RequestedByVetId,
              RequestedByVetName,
              sectorId: vaccine.sector_id,
            },
          })
          .then(async (res) => {
            await prisma.vaccinesForPet.create({
              data: {
                name: vaccine?.name,
                price: priceSurgerieByAnimalWeight,
                description: vaccine?.description,
                requestedDate: new Date(),
                medicine: { connect: { petId: parseInt(petId) } },
                linkedConsultDebitId: res.id,
              },
            });
          });
      }

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

      await prisma.petConsultsDebits
        .delete({
          where: {
            id: linkedDebitId,
          },
        })
        .then(async () => {
          await prisma.vaccinesForPet.delete({
            where: { id: id },
          });
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

  getVaccineByHealthInsurance: async (
    request: FastifyRequest,
    reply: FastifyReply
  ) => {
    try {
      const GetHealthInsuranceVaccineSchema = z.object({
        planName: z.string(),
        // planProvider: z.string(),
        page: z.coerce.number(),
      });

      const { planName, page } = GetHealthInsuranceVaccineSchema.parse(
        request.params
      );
      const currentPage = page || 1;
      const vaccines = await prisma.vaccines.findMany({
        skip: (currentPage - 1) * 35,
        take: 35,
        where: {
          HealthInsurance: {
            planName: { contains: planName },
            // planProvider: {equals: planProvider}
          },
        },
      });

      const totalPages = Math.ceil(vaccines.length / 35);

      reply.send({
        vaccines,
        currentPage,
        totalPages,
        totalProceds: vaccines.length,
      });
    } catch (error) {
      console.log(error);
    }
  },
};
