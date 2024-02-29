import { FastifyRequest, FastifyReply } from "fastify";
import { prisma } from "../interface/PrismaInstance";
import { QueueSchema } from "../schemas/schemasValidator";
import bcrypt from "bcrypt";
import { z } from "zod";
import { GetDebitsInConsultsService } from "../services/GetDebitsInConsultsService";
import { ResourceNotFoundError } from "../errors/ResouceNotFoundError";
type params = {
  id: string;
  petId: string;
  queueId: string;
  recordId: string;
  customerId: string;
  date: string;
};
export const queueController = {
  setPetInQueue: async (
    request: FastifyRequest<{ Params: params }>,
    reply: FastifyReply
  ) => {
    const { queryType, vetPreference, moreInfos, openedBy } = QueueSchema.parse(
      request.body
    );
    const { id } = request.params;
    try {

      const pet = await prisma.pets.findUnique({where:{ id: parseInt(id)}})

      if(!pet) {
        return
      }

      await prisma.openedConsultsForPet.create({
        data: {
          petName: pet.name,
          openedDate: new Date(),
          consultType: queryType,
          vetPreference,
          isClosed: false,
          observations: moreInfos,
          openedBy,
          MedicineRecord: {
            connect: { petId: parseInt(id) },
          },
        },
      });

      reply.status(200).send({
        message: "Fila iniciada com sucesso!",
      });
    } catch (error) {
      console.error(error);
      reply.status(400).send({ message: { error } });
    }
  },

  getQueueByID: async (request: FastifyRequest, reply: FastifyReply) => {
    const ParamsSchema = z.object({
      queueId: z.string().uuid(),
    });

    const { queueId } = ParamsSchema.parse(request.params);

    try {
      var consultbyId = await prisma.openedConsultsForPet.findUnique({
        where: { id: queueId },
      });
      return reply.status(200).send(consultbyId);
    } catch (err) {
      return reply.status(400).send(err);
    }
  },

  finishQueueOfPet: async (request: FastifyRequest, reply: FastifyReply) => {
    const ParamsSchema = z.object({
      petId: z.coerce.number(),
      queueUUID: z.string().uuid(),
      customerId: z.coerce.number(),
    });
    const QueueSchema = z.object({
      vetPreference: z.string().optional(),
      responsibleVeterinarianId: z.number().optional(),
      debitOnThisQuery: z.number().optional(),
      responsibleVeterinarian: z.string().optional(),
      petWeight: z.number().optional(),
      consultId: z.string().optional(),
      admissionId: z.string().optional(),
       accountId: z.number().optional(),
    });
    const { petId, queueUUID, customerId } = ParamsSchema.parse(request.params);
    const {
      responsibleVeterinarianId,
      responsibleVeterinarian,
      petWeight,
      consultId,
      admissionId,
       accountId,
    } = QueueSchema.parse(request.body);
    try {
      const getDebitsInConsultService = new GetDebitsInConsultsService();

      const { debits, total } = await getDebitsInConsultService.execute({
        queueId: queueUUID,
      });

     const pet = await prisma.pets.update({
        where: { id: petId },
        data: { priceAccumulator: { update: { accumulator: 0 } } },
      });

      await prisma.openedConsultsForPet.update({
        where: {
          id: queueUUID,
        },
        data: {
          petName: pet.name,
          clodedByVetName: responsibleVeterinarian,
          closedByVetId: responsibleVeterinarianId,
          closedDate: new Date(),
          isClosed: true,
          petWeight: petWeight?.toString(),
          totaLDebits: total,
          symptoms: debits[0].symptoms,
          request: debits[0].request,
          diagnostic: debits[0].diagnostic,
          observations: debits[0].observations,
          customerAccountId: accountId,
        },
      });

      await prisma.customer.update({
        where: { id: customerId },
        data: {
          customerAccount: {
            update: {
              debits: { increment: Number(total) },
              admissionId: admissionId,
              consultId: consultId,
            },
          },
        },
      });

  

      reply.status(201).send({
        message: "Fila encerrada com sucesso!",
      });
    } catch (error) {
      console.log(error);

      if (error instanceof ResourceNotFoundError) {
        reply.status(404).send({ message: error.message });
      }
      console.log(error);
      //reply.status(400).send({message: { error}})
    }
  },

  updatedClientIsVipInConsultForPet: async (
    request: FastifyRequest,
    reply: FastifyReply
  ) => {
    const consultSchema = z.object({
      queueId: z.string(),
      clientIsVip: z.string(),
      idCustomer: z.string(),
    });

    const { queueId, idCustomer, clientIsVip } = consultSchema.parse(
      request.params
    );

    let valueIsVip = clientIsVip === "false" ? false : true;

    try {
      await prisma.openedConsultsForPet
        .update({
          where: { id: queueId },
          data: { clientIsVip: valueIsVip },
        })
        .then(async () => {
          await prisma.customer.update({
            where: { id: Number(idCustomer) },
            data: { customerAccount: { update: { clientIsVip: valueIsVip } } },
          });
        });
      reply.status(200).send("O Campo Cliente Vip Foi atualizado!");
    } catch (error) {
      reply.status(400).send(error);
    }
  },

  getQueuePetHistory: async (
    request: FastifyRequest<{ Params: params }>,
    reply: FastifyReply
  ) => {
    const { date, petId } = request.params;
    const today = new Date(date);
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    try {
      const petsProcedures = await prisma.pets.findUnique({
        where: { id: parseInt(petId) },
        include: {
          customer: { select: { name: true } },
          medicineRecords: {
            include: {
              petVaccines: {
                where: { requestedDate: { gte: date, lt: tomorrow } },
              },
              petBeds: { where: { entryOur: { gte: date, lt: tomorrow } } },
              petExams: {
                where: { requesteData: { gte: today, lt: tomorrow } },
              },
              petSurgeries: {
                where: { requestedDate: { gte: date, lt: tomorrow } },
              },
            },
          },
        },
      });

      let procedures: any = [];
      procedures = procedures.concat(
        petsProcedures?.medicineRecords?.petVaccines.flatMap(
          (vaccine) => vaccine
        ),
        petsProcedures?.medicineRecords?.petExams.flatMap((exams) => exams),
        petsProcedures?.medicineRecords?.petSurgeries.flatMap(
          (surgeries) => surgeries
        ),
        petsProcedures?.medicineRecords?.petBeds.flatMap((beds) => beds)
      );

      const data = {
        petName: petsProcedures?.name,
        customerName: petsProcedures?.customer.name,
        procedures,
      };

      reply.send(data);
    } catch (error) {
      console.log(error);
    }
  },

  unconcludeQueue: async (
    request: FastifyRequest<{ Params: params }>,
    reply: FastifyReply
  ) => {
    try {
      const unconcludeSchema = z.object({
        masterPassword: z.string(),
        unconcludeObs: z.string(),
        userId: z.number(),
        queueId: z.number(),
      });
      const { masterPassword, unconcludeObs, userId, queueId } =
        unconcludeSchema.parse(request.body);
      const user = await prisma.user.findUnique({ where: { id: userId } });
      if (!user) return;

      const authorizedUser = await bcrypt.compare(
        masterPassword,
        user.password
      );

      if (authorizedUser) {
        await prisma.queuesForPet.update({
          where: { id: queueId },
          data: {
            queueIsDone: false,
            unconcludeObs,
            medicine: {
              update: {
                pet: { update: { queue: { update: { petIsInQueue: true } } } },
              },
            },
          },
        });

        reply.send("Consulta desconcluida!!");
      } else {
        reply.send("Falha ao desconcluir consulta!").status(401);
      }
    } catch (error) {
      console.log(error);
      reply.send(error);
    }
  },

  updateQueueDiagnostics: async (
    request: FastifyRequest,
    reply: FastifyReply
  ) => {
    try {
      const GetParams = z.object({
        queueId: z.string().uuid(),
      });

      const BodyParams = z.object({
        symptoms: z.string().optional(),
        request: z.string().optional(),
        diagnostic: z.string().optional(),
      });

      const { queueId } = GetParams.parse(request.params);

      const {
        diagnostic,
        request: DiagnosticRequest,
        symptoms,
      } = BodyParams.parse(request.body);

      await prisma.openedConsultsForPet.update({
        where: { id: queueId },
        data: {
          symptoms,
          diagnostic,
          request: DiagnosticRequest,
        },
      });

      reply.status(200).send({
        message: "Consulta atualizada",
      });
    } catch (error) {
      reply.status(404).send({
        message: error,
      });
    }
  },

  updatePetWeightInQueue: async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const UpdatePetWeightInQueueParams = z.object({
        queueId: z.string().uuid(),
        petWeigth: z.coerce.string()
      });

      const {petWeigth, queueId} = UpdatePetWeightInQueueParams.parse(request.params)

      await prisma.openedConsultsForPet.update({
        where:{ id: queueId},
        data: {
          petWeight: petWeigth
        }
      })


    } catch (error) {
      
    }
  },

  getQueueDiagnostics: async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const GetParams = z.object({
        queueId: z.string().uuid(),
      });

      const { queueId } = GetParams.parse(request.params);

      const diagnostic = await prisma.openedConsultsForPet.findUnique({
        where: { id: queueId },
        select: {
          diagnostic: true,
          symptoms: true,
          request: true,
        },
      });

      reply.send({
        diagnostic,
      });
    } catch (error) {
      reply.status(404).send({
        message: error,
      });
      console.error(error);
    }
  },
};
