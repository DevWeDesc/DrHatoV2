import { FastifyRequest, FastifyReply } from "fastify";
import { prisma } from "../interface/PrismaInstance";
import { z } from "zod";
import { accumulatorService } from "../services/accumulatorService";

type params = {
  id: string;
  recordId: string;
  accId: string;
  queueId: string;
  petId: string;
  sugPrice: string;
};
type body = {
  isAdmission: boolean;
  RequestedByVetId: number;
  RequestedByVetName: string;
  petIsMale: boolean;
  petIsFemale: boolean;
};
export const surgeriesController = {
  createSurgerie: async (request: FastifyRequest, reply: FastifyReply) => {
    const SurgerieSchema = z.object({
      name: z.string(),
      price: z.number(),
    });
    const { name, price } = SurgerieSchema.parse(request.body);
    try {
      await prisma.surgeries.create({
        data: {
          name,
          price,
        },
      });

      reply.send("Nova cirurgia criada com sucesso!").status(200);
    } catch (error) {
      reply.send({ message: error });
      console.log(error);
    }
  },

  editSurgery: async (request: FastifyRequest, reply: FastifyReply) => {
    const SurgerieSchema = z.object({
      name: z.string(),
      price: z.number(),
    });
    const SurgerieParams = z.object({
      id: z.string(),
    });
    const { name, price } = SurgerieSchema.parse(request.body);
    const { id } = SurgerieParams.parse(request.params);
    try {
      await prisma.surgeries.update({
        where: { id: parseInt(id) },
        data: {
          name,
          price,
        },
      });

      reply.send("cirurgia editada com sucesso!").status(200);
    } catch (error) {
      reply.send({ message: error });
      console.log(error);
    }
  },

  getSurgeries: async (
    request: FastifyRequest<{
      Querystring: { page: string; sex?: string };
    }>,
    reply: FastifyReply
  ) => {
    try {
      // Obtenha o número da página atual a partir da solicitação.
      const currentPage = Number(request.query.page) || 1;
      // Obtenha o número total de usuários.
      const totalSurgeries = await prisma.surgeries.count();
      // Calcule o número de páginas.
      const totalPages = Math.ceil(totalSurgeries / 35);

      const animalSex = request.query.sex || null;

      if (animalSex != null && animalSex == "Macho") {
        const surgeries = await prisma.surgeries.findMany({
          skip: (currentPage - 1) * 35,
          take: 35,
          where: { applicableToMale: true },
        });

        reply
          .send({
            currentPage,
            totalPages,
            totalSurgeries,
            surgeries,
          })
          .status(200);
      } else if (animalSex != null && animalSex == "Femea") {
        const surgeries = await prisma.surgeries.findMany({
          skip: (currentPage - 1) * 35,
          take: 35,
          where: { applicableToFemale: true },
        });

        reply
          .send({
            currentPage,
            totalPages,
            totalSurgeries,
            surgeries,
          })
          .status(200);
      } else {
        const surgeries = await prisma.surgeries.findMany({
          skip: (currentPage - 1) * 35,
          take: 35,
        });
        reply
          .send({
            currentPage,
            totalPages,
            totalSurgeries,
            surgeries,
          })
          .status(200);
      }
    } catch (error) {
      reply.send(error);
      console.log(error);
    }
  },

  getSurgeriesByLetters: async (
    request: FastifyRequest,
    reply: FastifyReply
  ) => {
    try {
      const getSurgeriesByLetterSchema = z.object({
        letter: z.string(),
        page: z.coerce.number(),
      });
      const { letter, page } = getSurgeriesByLetterSchema.parse(request.params);
      const currentPage = page || 1;
      // Obtenha o número total de usuários.
      const totalSurgeries = await prisma.surgeries.count();
      // Calcule o número de páginas.
      const totalPages = Math.ceil(totalSurgeries / 35);

      const surgeries = await prisma.surgeries.findMany({
        skip: (currentPage - 1) * 35,
        take: 35,
        where: { name: { startsWith: letter.toUpperCase() } },
      });

      reply.status(200).send({
        currentPage,
        totalPages,
        totalSurgeries,
        surgeries,
      });
    } catch (error) {
      console.log(error);
    }
  },

  getSurgeriesByName: async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const getSurgeriesByLetterSchema = z.object({
        name: z.string(),
        page: z.coerce.number(),
      });
      const { name, page } = getSurgeriesByLetterSchema.parse(request.params);
      const currentPage = page || 1;
      // Obtenha o número total de usuários.
      const totalSurgeries = await prisma.surgeries.count();
      // Calcule o número de páginas.
      const totalPages = Math.ceil(totalSurgeries / 35);

      const surgeries = await prisma.surgeries.findMany({
        skip: (currentPage - 1) * 35,
        take: 35,
        where: { name: { contains: name } },
      });

      reply.status(200).send({
        currentPage,
        totalPages,
        totalSurgeries,
        surgeries,
      });
    } catch (error) {
      console.log(error);
    }
  },

  setSurgerieInPet: async (
    request: FastifyRequest<{ Params: params; Body: body }>,
    reply: FastifyReply
  ) => {
    const { id, petId, accId, queueId } = request.params;
    const { RequestedByVetId, RequestedByVetName, isAdmission } = request.body;
    try {
      const surgerie = await prisma.surgeries.findUnique({
        where: { id: parseInt(id) },
      });

      if (!surgerie) {
        reply
          .status(400)
          .send("Falha ao buscar cirurgia/Falha ao criar Cirurgia");
        return;
      }

      if (isAdmission === true) {
        await prisma.petConsultsDebits
          .create({
            data: {
              OpenedAdmissionsForPet: { connect: { id: queueId } },
              isSurgerie: true,
              name: surgerie.name,
              price: surgerie.price,
              itemId: surgerie.id,
              RequestedByVetId,
              RequestedByVetName,
              sectorId: surgerie.sector_id,
            },
          })
          .then(async (res) => {
            await prisma.surgeriesForPet.create({
              data: {
                name: surgerie.name,
                status: "STARTED",
                price: surgerie.price,
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
              isSurgerie: true,
              name: surgerie.name,
              price: surgerie.price,
              itemId: surgerie.id,
              RequestedByVetId,
              RequestedByVetName,
              sectorId: surgerie.sector_id,
            },
          })
          .then(async (res) => {
            await prisma.surgeriesForPet.create({
              data: {
                name: surgerie.name,
                status: "STARTED",
                price: surgerie.price,
                medicine: { connect: { petId: parseInt(petId) } },
                linkedConsultDebitId: res.id,
              },
            });
          });
      }

      await accumulatorService.addPriceToAccum(Number(surgerie.price), accId);
      reply.send("Cirurgia adiciona ao pet com sucesso").status(200);
    } catch (error) {
      reply.send({ message: error });
      console.log(error);
    }
  },

  excludePetSugerie: async (
    request: FastifyRequest<{ Params: params }>,
    reply: FastifyReply
  ) => {
    const DeleteSurgeryForPetSchema = z.object({
      id: z.coerce.number(),
      accId: z.coerce.number(),
      sugPrice: z.any(),
      linkedDebitId: z.coerce.number(),
    });
    try {
      const { id, accId, sugPrice, linkedDebitId } =
        DeleteSurgeryForPetSchema.parse(request.params);

      await accumulatorService.removePriceToAccum(Number(sugPrice), accId);

      await prisma.petConsultsDebits
        .delete({
          where: {
            id: linkedDebitId,
          },
        })
        .then(async () => {
          await prisma.surgeriesForPet.delete({
            where: { linkedConsultDebitId: linkedDebitId },
          });
        });

      reply.status(203).send({
        message: "Deletado com sucesso!",
      });
    } catch (error) {
      console.log(error);
    }
  },

  reportPetSurgerie: async (
    request: FastifyRequest<{
      Params: { surgerieId: string };
      Body: { reportedText: string; reportedBy: string; finishReport: boolean };
    }>,
    reply: FastifyReply
  ) => {
    try {
      const { surgerieId } = request.params;
      const { reportedText, reportedBy, finishReport } = request.body;
      const today = new Date(Date.now());

      if (finishReport === true) {
        await prisma.surgeriesForPet.update({
          where: { id: parseInt(surgerieId) },
          data: {
            completedDate: today,
            status: "FINISHED",
            surgeriesReport: { update: { reportedBy, reportedText } },
          },
        });

        return reply.status(200).send("laudado editado com sucesso!");
      }

      await prisma.surgeriesReports.create({
        data: {
          reportedText,
          reportedBy,
          SurgeriesForPet: { connect: { id: parseInt(surgerieId) } },
        },
      });

      reply.status(201).send("laudado com sucesso!");
    } catch (error) {
      console.log(error);
      reply.status(404).send(error);
    }
  },

  getPetSurgeriesHistory: async (
    request: FastifyRequest<{ Params: { petId: string } }>,
    reply: FastifyReply
  ) => {
    try {
      const { petId } = request.params;

      const response = await prisma.pets.findUnique({
        where: { id: parseInt(petId) },
        include: {
          medicineRecords: {
            include: { petSurgeries: { include: { surgeriesReport: true } } },
          },
        },
      });

      reply.send(response);
    } catch (error) {
      console.log(error);
      reply.send(error);
    }
  },

  getPetSurgeriesOpened: async (
    request: FastifyRequest<{ Params: { petId: string } }>,
    reply: FastifyReply
  ) => {
    try {
      const sugeriesOpened = await prisma.surgeriesForPet.findMany({
        where: {
          status: { equals: "STARTED" },
        },
        include: {
          medicine: { select: { pet: { include: { customer: true } } } },
        },
      });

      reply.send(sugeriesOpened);
    } catch (error) {
      reply.send(error);
      console.log(error);
    }
  },

  getPetOpenedSugerie: async (
    request: FastifyRequest<{ Params: { petId: string } }>,
    reply: FastifyReply
  ) => {
    try {
      const { petId } = request.params;

      const response = await prisma.pets.findUnique({
        where: { id: parseInt(petId) },
        include: {
          medicineRecords: {
            include: {
              petSurgeries: {
                where: {
                  status: "STARTED",
                },
                include: { surgeriesReport: true },
              },
            },
          },
          customer: { select: { name: true, cpf: true } },
        },
      });

      if (!response) {
        return reply.status(404);
      }

      const data = {
        petId: response.id,
        petName: response.name,
        petWeight: response.weigth,
        petEspecie: response.especie,
        petRace: response.race,
        petAge: response.bornDate,
        customerName: response.customer.name,
        customerCpf: response.customer.cpf,
        sugerieId: response.medicineRecords?.petSurgeries[0].id,
        sugerieName: response.medicineRecords?.petSurgeries[0].name,
        sugerieReportId:
          response.medicineRecords?.petSurgeries[0].surgeriesReport?.id,
        sugerieReport:
          response.medicineRecords?.petSurgeries[0].surgeriesReport
            ?.reportedText,
        sugerieReportBy:
          response.medicineRecords?.petSurgeries[0].surgeriesReport?.reportedBy,
      };

      reply.send(data);
    } catch (error) {
      reply.send(error);
      console.log(error);
    }
  },

  getSurgeriePetDetails: async (
    request: FastifyRequest,
    reply: FastifyReply
  ) => {
    try {
      const GetSurgeriePetDetailSchema = z.object({
        surgerieId: z.coerce.number(),
      });

      const { surgerieId } = GetSurgeriePetDetailSchema.parse(request.params);

      const surgerie = await prisma.surgeriesForPet.findUnique({
        where: {
          id: surgerieId,
        },
        include: { surgeriesReport: true },
      });

      reply.send({
        surgerie,
      });
    } catch (error) {
      reply.status(404).send({
        message: error,
      });
    }
  },
};
