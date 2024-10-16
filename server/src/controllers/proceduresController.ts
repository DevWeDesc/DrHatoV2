import { FastifyRequest, FastifyReply } from "fastify";
import { ProcedureSchema } from "../schemas/schemasValidator";
import { ValidationContract } from "../validators/userContract";
import { getFormattedDateTime } from "../utils/getCurrentDate";
import { accumulatorService } from "../services/accumulatorService";
import { prisma } from "../interface/PrismaInstance";
import { z } from "zod";
import { Decimal } from "@prisma/client/runtime";

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
  InAdmission: boolean;
};

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
      health_id,
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
          sector: { connect: { id: parseInt(sector_id) } },
          HealthInsurance: {
            connect: { id: health_id },
          },
        },
      });
      reply.status(201).send("Procedimento criado!");
    } catch (error) {
      console.log(error);
      reply.status(400).send({ message: error });
    }
  },

  getProcedures: async (
    request: FastifyRequest<{ Querystring: { page: string; sex?: string } }>,
    reply: FastifyReply
  ) => {
    try {
      // Obtenha o número da página atual a partir da solicitação.
      const currentPage = Number(request.query.page) || 1;
      const animalSex = request.query.sex || null;
      // Obtenha o número total de usuários.
      const totalProceds = await prisma.procedures.count();

      // Calcule o número de páginas.
      const totalPages = Math.ceil(totalProceds / 35);

      if (animalSex === "Macho") {
        const procedures = await prisma.procedures.findMany({
          skip: (currentPage - 1) * 35,
          take: 35,
          where: {
            applicableMale: true,
          },
          include: {
            groups: { select: { name: true } },
            sector: { select: { name: true } },
            appicableEspecies: true,
          },
        });

        reply.send({ totalPages, totalProceds, currentPage, procedures });
      } else if (animalSex === "Femea") {
        const procedures = await prisma.procedures.findMany({
          skip: (currentPage - 1) * 35,
          take: 35,
          where: {
            applicableFemale: true,
          },
          include: {
            groups: { select: { name: true } },
            sector: { select: { name: true } },
            appicableEspecies: true,
          },
        });

        reply.send({ totalPages, totalProceds, currentPage, procedures });
      } else {
        const procedures = await prisma.procedures.findMany({
          skip: (currentPage - 1) * 35,
          take: 35,
          include: {
            groups: { select: { name: true } },
            sector: { select: { name: true } },
            appicableEspecies: true,
          },
        });

        reply.send({ totalPages, totalProceds, currentPage, procedures });
      }
    } catch (error) {
      console.log(error);
      reply.status(400).send({ message: error });
    }
  },

  queryProcedureByName: async (
    request: FastifyRequest<{
      Querystring: { q: string; page: string; sex?: string };
    }>,
    reply: FastifyReply
  ) => {
    try {
      const currentPage = Number(request.query.page) || 1;
      const animalSex = request.query.sex || null;

      const { q } = request.query;

      if (animalSex === "Macho") {
        const totalProceds = await prisma.procedures.count({
          where: {
            name: { contains: q, mode: "insensitive" },
            applicableMale: true,
          },
        });

        const totalPages = Math.ceil(totalProceds / 35);

        const procedures = await prisma.procedures.findMany({
          skip: (currentPage - 1) * 35,
          take: 35,
          where: {
            name: { contains: q, mode: "insensitive" },
            applicableMale: true,
          },
          include: {
            groups: { select: { name: true } },
            sector: { select: { name: true } },
            appicableEspecies: true,
          },
        });

        reply.send({ totalPages, totalProceds, currentPage, procedures });
      } else if (animalSex != null && animalSex === "Femea") {
        const totalProceds = await prisma.procedures.count({
          where: {
            name: { startsWith: q, mode: "insensitive" },
            applicableFemale: true,
          },
        });

        const totalPages = Math.ceil(totalProceds / 35);

        const procedures = await prisma.procedures.findMany({
          skip: (currentPage - 1) * 35,
          take: 35,
          where: {
            name: { startsWith: q, mode: "insensitive" },
            applicableFemale: true,
          },
          include: {
            groups: { select: { name: true } },
            sector: { select: { name: true } },
            appicableEspecies: true,
          },
        });

        reply.send({ totalPages, totalProceds, currentPage, procedures });
      } else {
        const totalProceds = await prisma.procedures.count({
          where: { name: { startsWith: q, mode: "insensitive" } },
        });

        const totalPages = Math.ceil(totalProceds / 35);
        const procedures = await prisma.procedures.findMany({
          skip: (currentPage - 1) * 35,
          take: 35,
          where: { name: { startsWith: q, mode: "insensitive" } },
        });

        reply.send({
          totalProceds,
          totalPages,
          currentPage,
          procedures,
        });
      }
    } catch (error) {}
  },

  getProceduresByLetters: async (
    request: FastifyRequest<{ Querystring: { sex: string } }>,
    reply: FastifyReply
  ) => {
    try {
      const GetProceduresByLetters = z.object({
        letter: z.string(),
        page: z.coerce.number(),
      });

      const { letter, page } = GetProceduresByLetters.parse(request.params);
      const currentPage = page || 1;
      const animalSex = request.query.sex || null;

      if (animalSex === "Macho") {
        const procedures = await prisma.procedures.findMany({
          skip: (currentPage - 1) * 35,
          take: 35,
          where: {
            applicableMale: true,
            name: { startsWith: letter },
          },
          include: {
            groups: { select: { name: true } },
            sector: { select: { name: true } },
            appicableEspecies: true,
          },
        });
        const totalProceds = await prisma.procedures.count({
          where: { applicableMale: true },
        });
        const totalPages = Math.ceil(totalProceds / 35);

        reply.send({ totalPages, totalProceds, currentPage, procedures });
      } else if (animalSex === "Femea") {
        const procedures = await prisma.procedures.findMany({
          skip: (currentPage - 1) * 35,
          take: 35,
          where: {
            applicableFemale: true,
            name: { startsWith: letter },
          },
          include: {
            groups: { select: { name: true } },
            sector: { select: { name: true } },
            appicableEspecies: true,
          },
        });
        const totalProceds = await prisma.procedures.count({
          where: { applicableFemale: true },
        });
        const totalPages = Math.ceil(totalProceds / 35);

        reply.send({ totalPages, totalProceds, currentPage, procedures });
      } else {
        const procedures = await prisma.procedures.findMany({
          skip: (currentPage - 1) * 35,
          take: 35,
          where: { name: { startsWith: letter } },
        });

        const totalProceds = await prisma.procedures.count({
          where: { name: { startsWith: letter } },
        });
        const totalPages = Math.ceil(totalProceds / 35);

        reply.send({
          totalPages,
          totalProceds,
          currentPage,
          procedures,
        });
      }
    } catch (error) {
      console.log(error);
    }
  },

  getProcedureByHealthInsurance: async (
    request: FastifyRequest,
    reply: FastifyReply
  ) => {
    try {
      const GetHealthInsuranceProcedureSchema = z.object({
        planName: z.string(),
        // planProvider: z.string(),
        page: z.coerce.number(),
      });

      const { planName, page } = GetHealthInsuranceProcedureSchema.parse(
        request.params
      );
      const currentPage = page || 1;
      const procedures = await prisma.procedures.findMany({
        skip: (currentPage - 1) * 35,
        take: 35,
        where: {
          HealthInsurance: {
            planName: { contains: planName },
            // planProvider: {equals: planProvider}
          },
        },
      });

      const totalPages = Math.ceil(procedures.length / 35);

      reply.send({
        procedures,
        currentPage,
        totalPages,
        totalProceds: procedures.length,
      });
    } catch (error) {
      console.log(error);
    }
  },

  getWithId: async (request: FastifyRequest, reply: FastifyReply) => {
    const GetProceduresByIdSchema = z.object({
      id: z.coerce.number(),
    });
    const { id } = GetProceduresByIdSchema.parse(request.params);
    try {
      const procedure = await prisma.procedures.findUnique({
        where: { id: id },
        include: {
          groups: { select: { name: true } },
          sector: { select: { name: true } },
          HealthInsurance: true,
          appicableEspecies: true,
        },
      });
      reply.send(procedure);
    } catch (error) {
      console.log(error);
      reply.status(400).send({ message: error });
    }
  },

  editProcedure: async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const editProcedureSchema = z.object({
        procedureId: z.coerce.number(),
        name: z.string().optional(),
        price: z.coerce.number().optional(),
        priceTwo: z.coerce.number().optional(),
        priceThree: z.coerce.number().optional(),
        priceFour: z.coerce.number().optional(),
        minAge: z.coerce.number().optional(),
        maxAge: z.coerce.number().optional(),
        applicableMale: z.boolean().optional(),
        applicableFemale: z.boolean().optional(),
        applicationInterval: z.string().optional(),
        available: z.boolean().optional(),
        observations: z.string().optional(),
        group_id: z.coerce.number().optional(),
        sector_id: z.coerce.number().optional(),
      });

      const {
        procedureId,
        name,
        price,
        available,
        observations,
        applicationInterval,
        applicableFemale,
        applicableMale,
        group_id,
        maxAge,
        minAge,
        priceFour,
        priceThree,
        priceTwo,
        sector_id,
      } = editProcedureSchema.parse(request.body);

      await prisma.procedures.update({
        where: { id: procedureId },
        data: {
          name,
          price,
          available,
          observations,
          applicationInterval,
          applicableFemale,
          applicableMale,
          group_id,
          sector_id,
          maxAge,
          minAge,
          priceFour,
          priceThree,
          priceTwo,
        },
      });

      reply.status(200);
    } catch (error) {
      reply.send({
        message: error,
      });
      console.log(error);
    }
  },

  deleteProcedure: async (
    request: FastifyRequest<{ Params: params }>,
    reply: FastifyReply
  ) => {
    const { id } = request.params;
    try {
      await prisma.procedures.delete({ where: { id: parseInt(id) } });
      reply.status(204).send("Procedimento deletado!");
    } catch (error) {
      reply.status(400).send("Falha ao deletar procedimento!");
      console.log(error);
    }
  },

  setProcedureInPet: async (
    request: FastifyRequest<{ Params: params; Body: body }>,
    reply: FastifyReply
  ) => {
    const actualDate = getFormattedDateTime();
    const { procedureId, petId, accId, queueId } = request.params;
    const { RequestedByVetId, RequestedByVetName, InAdmission } = request.body;
    try {
      const procedure = await prisma.procedures.findUnique({
        where: { id: parseInt(procedureId) },
      });

      const pet = await prisma.pets.findUnique({
        where: { id: parseInt(petId) },
      });

      let priceProcedureByAnimalWeight: Decimal | null | undefined;

      if (!pet?.weigth) throw new Error("Peso do animal não encontrado!");

      if (pet?.weigth < 7) {
        priceProcedureByAnimalWeight = procedure?.price;
      } else if (pet?.weigth >= 7 && pet?.weigth < 16) {
        priceProcedureByAnimalWeight = procedure?.priceTwo;
      } else if (pet?.weigth >= 16 && pet?.weigth < 35) {
        priceProcedureByAnimalWeight = procedure?.priceThree;
      } else {
        priceProcedureByAnimalWeight = procedure?.priceFour;
      }

      if (!procedure) return;

      if (InAdmission === true) {
        await prisma.petConsultsDebits
          .create({
            data: {
              OpenedAdmissionsForPet: { connect: { id: queueId } },
              isProcedure: true,
              name: procedure.name,
              price: priceProcedureByAnimalWeight,
              itemId: procedure.id,
              sectorId: procedure.sector_id,
              RequestedByVetId,
              RequestedByVetName,
            },
          })
          .then(async (res) => {
            await prisma.proceduresForPet.create({
              data: {
                name: procedure.name,
                available: procedure.available,
                observations: procedure.observations,
                price: priceProcedureByAnimalWeight,
                applicationInterval: procedure.applicationInterval,
                requestedDate: actualDate,
                linkedConsultDebitId: res.id,
                medicine: { connect: { petId: parseInt(petId) } },
              },
            });
          });
      } else if (InAdmission === false) {
        await prisma.petConsultsDebits
          .create({
            data: {
              OpenedConsultsForPet: { connect: { id: queueId } },
              isProcedure: true,
              name: procedure.name,
              price: priceProcedureByAnimalWeight,
              sectorId: procedure.sector_id,
              itemId: procedure.id,
              RequestedByVetId,
              RequestedByVetName,
            },
          })
          .then(async (res) => {
            await prisma.proceduresForPet.create({
              data: {
                name: procedure.name,
                available: procedure.available,
                observations: procedure.observations,
                price: priceProcedureByAnimalWeight,
                applicationInterval: procedure.applicationInterval,
                requestedDate: actualDate,
                linkedConsultDebitId: res.id,
                medicine: { connect: { petId: parseInt(petId) } },
              },
            });
          });
      }

      // await prisma.proceduresForPet.create({
      //   data: {
      //     name: procedure.name,
      //     available: procedure.available,
      //     observations: procedure.observations,
      //     price: procedure.price,
      //     applicationInterval: procedure.applicationInterval,
      //     requestedDate: actualDate,
      //     linkedConsultDebitId: res.is,
      //     medicine: { connect: { petId: parseInt(petId) } },
      //   },
      // });

      await accumulatorService.addPriceToAccum(procedure?.price, accId);
      reply.status(200).send("Procedimento adicionado com sucesso!");
    } catch (error) {
      reply.status(400).send({ message: error });
      console.log(error);
    }
  },

  // deleteProcedureOfPet: async (
  //   request: FastifyRequest<{
  //     Params: { id: string; procedPrice: string; accId: string };
  //   }>,
  //   reply: FastifyReply
  // ) => {
  //   try {
  //     const { id, procedPrice, accId } = request.params;

  //     await accumulatorService.removePriceToAccum(Number(procedPrice), accId);

  //     await prisma.proceduresForPet.delete({
  //       where: { id: parseInt(id) },
  //     });

  //     reply.send("Procedimento deletado com sucesso!").status(203);

  //     reply.status(200);
  //   } catch (error) {
  //     console.log(error);
  //     reply.send({ message: error });
  //   }
  // },

  removePetProcedure: async (
    request: FastifyRequest<{ Params: params }>,
    reply: FastifyReply
  ) => {
    const DeleteProcedureForPetSchema = z.object({
      id: z.coerce.number(),
      accId: z.coerce.number(),
      procedurePrice: z.any(),
      linkedDebitId: z.coerce.number(),
    });
    try {
      const { id, accId, procedurePrice, linkedDebitId } =
        DeleteProcedureForPetSchema.parse(request.params);

      await accumulatorService.removePriceToAccum(
        Number(procedurePrice),
        accId
      );

      await prisma.petConsultsDebits.delete({
        where: {
          id: linkedDebitId,
        },
      });

      await prisma.proceduresForPet.delete({
        where: { id: id },
      });

      reply.status(203).send({
        message: "Deletado com sucesso!",
      });
    } catch (error) {
      console.log(error);
    }
  },

  setEspecieInProcedure: async (
    request: FastifyRequest<{
      Params: { procedureId: string; especieId: string };
    }>,
    reply: FastifyReply
  ) => {
    try {
      const { procedureId, especieId } = request.params;

      await prisma.procedures.update({
        where: { id: parseInt(procedureId) },
        data: {
          appicableEspecies: {
            connect: { id: parseInt(especieId) },
          },
        },
      });

      reply.status(201);
    } catch (error) {
      reply.send(error).status(400);
    }
  },

  setAllEspeciesInProcedure: async (
    request: FastifyRequest<{
      Params: { procedureId: string; especieId: string };
    }>,
    reply: FastifyReply
  ) => {
    try {
      const { procedureId } = request.params;

      const especies = await prisma.especies.findMany();

      for (const especie of especies) {
        await prisma.procedures.update({
          where: { id: parseInt(procedureId) },
          data: { appicableEspecies: { connect: { id: especie.id } } },
        });
      }

      reply.status(201).send("Todas especies setadas!");
    } catch (error) {
      reply.send(error).status(400);
    }
  },

  removeAllEspeciesInProcedure: async (
    request: FastifyRequest<{
      Params: { procedureId: string; especieId: string };
    }>,
    reply: FastifyReply
  ) => {
    try {
      const { procedureId } = request.params;

      const especies = await prisma.especies.findMany();

      for (const especie of especies) {
        await prisma.procedures.update({
          where: { id: parseInt(procedureId) },
          data: { appicableEspecies: { disconnect: { id: especie.id } } },
        });
      }

      reply.status(201).send("Todas especies Removidas!");
    } catch (error) {
      reply.send(error).status(400);
    }
  },
};
