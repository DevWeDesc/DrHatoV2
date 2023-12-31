import { FastifyRequest, FastifyReply } from "fastify";
import { ValidationContract } from "../validators/userContract";
import { ExamSchema } from "../schemas/schemasValidator";
import { accumulatorService } from "../services/accumulatorService";
import { prisma } from "../interface/PrismaInstance";

type params = {
  id: string;
  recordId: string;
  accId: string;
  title: string;
};

export const examsController = {
  createExam: async (request: FastifyRequest, reply: FastifyReply) => {
    const {
      name,
      price,
      examsType,
      available,
      applicableGender,
      description,
      subName,
    } = ExamSchema.parse(request.body);
    const contract = new ValidationContract();
    try {
      await contract.validateExamsType(examsType, "Tipo de exame não válido");
      await contract.examAlreadyExist(name, "Exame já existe");
      if (contract.hadError()) {
        reply.status(400).send(contract.showErrors());
        contract.clearErrors();
        return;
      }
      await prisma.exams.create({
        data: {
          name,
          price,
          examsType,
          available,
          applicableGender,
          description,
          subName,
        },
      });
      reply.status(201).send("Exame criado com Sucesso!");
    } catch (error) {
      console.log(error);
      reply.status(400).send({ message: error });
    }
  },

  getExams: async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const exams = await prisma.exams.findMany();
      reply.status(200).send(exams);
    } catch (error) {
      reply.status(400).send({ message: error });
    }
  },

  editExams: async (
    request: FastifyRequest<{ Params: params }>,
    reply: FastifyReply
  ) => {
    const { id } = request.params;
    const {
      name,
      price,
      examsType,
      available,
      applicableGender,
      description,
      subName,
      ageRange,
      characters,
      isMultiPart,
      exams,
      isReportByText,
      isOnePart,
    }: any = request.body;

    try {
      await prisma.exams.update({
        where: { id: parseInt(id) },
        data: {
          name,
          price,
          examsType,
          available,
          applicableGender,
          description,
          subName,
          ageRange,
          isMultiPart,
          isReportByText,
          isOnePart,
        },
      });

      if (exams) {
        for (const ids of exams) {
          await prisma.exams.update({
            where: { id: parseInt(id) },
            data: { multiparts: { connect: { id: parseInt(ids) } } },
          });
        }
      }
      if (characters) {
        for (const cIds of characters) {
          await prisma.exams.update({
            where: { id: parseInt(id) },
            data: { characteristics: { connect: { id: parseInt(cIds) } } },
          });
        }
      }

      reply.status(200).send("Exame editado com sucesso!");
    } catch (error) {
      reply.status(400).send(error);
      console.clear();
      console.error(error);
    }
  },

  deleteExam: async (
    request: FastifyRequest<{ Params: params }>,
    reply: FastifyReply
  ) => {
    const { id } = request.params;
    try {
      await prisma.exams.delete({
        where: { id: parseInt(id) },
      });

      reply.status(204).send("Usuário deletado");
    } catch (error) {
      console.log(error);
      reply.status(400).send({ message: error });
    }
  },

  getById: async (
    request: FastifyRequest<{ Params: params }>,
    reply: FastifyReply
  ) => {
    const { id } = request.params;
    try {
      const exam = await prisma.exams.findUnique({
        where: { id: parseInt(id) },
        include: {
          characteristics: true,
          multiparts: { include: { characteristics: true } },
        },
      });

      reply.status(200).send(exam);
    } catch (error) {
      console.log(error);
      reply.status(400).send({ message: error });
    }
  },

  setExamInPet: async (
    request: FastifyRequest<{ Params: params; Body: { requestedFor: string } }>,
    reply: FastifyReply
  ) => {
    const { id, recordId, accId } = request.params;
    const requestedFor = null;
    const getExame = await prisma.exams.findUnique({
      where: { id: parseInt(id) },
    });
    const processData = new Date();
    if (!getExame || getExame.available === false) {
      reply.status(400).send("Exame não disponivel/Falha ao criar exame");
      return;
    }
    try {
      await prisma.examsForPet.create({
        data: {
          name: getExame.name,
          price: getExame.price,
          doneExame: getExame.doneExame ?? false,
          requesteData: processData,
          requestedFor: requestedFor,
          examsType: getExame.examsType,
          medicine: { connect: { id: parseInt(recordId) } },
        },
      });

      await accumulatorService.addPriceToAccum(getExame.price, accId);

      reply.status(201);
    } catch (error) {
      console.log(error);
      reply.status(400).send({ message: error });
    }
  },

  removePetExam: async (
    request: FastifyRequest<{
      Params: { id: string; accId: string; examPrice: string };
    }>,
    reply: FastifyReply
  ) => {
    const { id, accId, examPrice } = request.params;
    try {
      await accumulatorService.removePriceToAccum(Number(examPrice), accId);

      await prisma.examsForPet.delete({
        where: { id: parseInt(id) },
      });

      reply.status(200).send("Sucesso ao deletar");
    } catch (error) {
      console.log(error);
    }
  },

  finishPetExam: async (
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ) => {
    const { id } = request.params;

    try {
      await prisma.examsForPet.update({
        where: { id: parseInt(id) },
        data: { doneExame: true },
      });
    } catch (error) {
      console.log(error);
    }
  },

  createExamCharacteristics: async (
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ) => {
    try {
      const { name, jsonData }: any = request.body;

      await prisma.examCharacteristics.create({
        data: { name, especie: jsonData },
      });

      reply.send("Cadastrado com sucesso!").status(201);
    } catch (error) {
      console.log(error);
      reply.send({ message: error });
    }
  },

  getExamsCharacteristics: async (
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ) => {
    try {
      const res = await prisma.examCharacteristics.findMany();

      const data = res.map((charac) => {
        let data = {
          name: charac.name,
          id: charac.id,
        };

        return data;
      });

      reply.send({ data, res });
    } catch (error) {
      reply.status(404);
      console.log(error);
    }
  },
};
