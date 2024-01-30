import { FastifyRequest, FastifyReply } from "fastify";
import { accountService } from "../services/accountService";
import prisma from "../../client";
import { z } from "zod";

type params = {
  id: string;
  customerId: string;
  histBoxId: string;
  medicineId: string;
};

export const accountController = {
  getAllDebits: async (request: FastifyRequest, reply: FastifyReply) => {
    var installments = await prisma.installmentsDebts.findMany({
      include: { customerAccount: true },
    });

    try {
      reply.status(200).send(installments);
    } catch (err) {
      reply.status(400).send(err);
    }
  },

  getDebitsByBox: async (request: FastifyRequest, reply: FastifyReply) => {
    const DebitsByBoxSchema = z.object({
      boxId: z.string(),
    });

    const { boxId } = DebitsByBoxSchema.parse(request.params);

    var installments = await prisma.installmentsDebts.findMany({
      where: { boxHistoryId: Number(boxId) },
      include: { customerAccount: true },
    });

    var usersInInstallments = await prisma.customer.findMany({
      where: {
        customerAccount: {
          installments: { some: { boxHistoryId: Number(boxId) } },
        },
      },
      include: { customerAccount: { include: { installments: true } } },
    });

    try {
      reply
        .status(200)
        .send({ Installments: installments, customers: usersInInstallments });
    } catch (err) {
      reply.status(400).send(err);
    }
  },

  creditAccount: async (
    request: FastifyRequest<{ Params: params; Body: { values: number } }>,
    reply: FastifyReply
  ) => {
    const { customerId } = request.params;
    const { values } = request.body;
    try {
      await accountService.creditCustomerAccount(customerId, values);
      reply.send("Conta creditada com sucesso!");
    } catch (error) {
      console.log(error);
    }
  },

  debitAccount: async (
    request: FastifyRequest<{ Params: params; Body: { values: number } }>,
    reply: FastifyReply
  ) => {
    const { customerId } = request.params;
    const { values } = request.body;
    try {
      await accountService.debitCustomerAccount(customerId, values);
      reply.send("Conta debitada com sucesso!");
    } catch (error) {
      console.log(error);
    }
  },

  payInInstallments: async (
    request: FastifyRequest<{
      Params: params;
      Body: {
        totalDebit: number;
        installmentAmount: number;
        debitName: string;
        paymentType: string;
      };
    }>,
    reply: FastifyReply
  ) => {
    const { customerId, histBoxId } = request.params;
    const { totalDebit, installmentAmount, debitName, paymentType } =
      request.body;
    try {
      await accountService.installmentDebit(
        customerId,
        histBoxId,
        totalDebit,
        installmentAmount,
        debitName,
        paymentType
      );
      reply.send("Parcelado com sucesso!");
    } catch (error) {
      console.log(error);
    }
  },

  getProceduresDebited: async (
    request: FastifyRequest<{ Params: params; Body: { values: number } }>,
    reply: FastifyReply
  ) => {
    const { medicineId } = request.params;
    try {
    } catch (error) {}
  },
};
