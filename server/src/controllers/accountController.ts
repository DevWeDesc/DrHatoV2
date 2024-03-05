import { FastifyRequest, FastifyReply } from "fastify";
import { accountService } from "../services/accountService";
import prisma from "../../client";
import { z } from "zod";

type params = {
  id: string;
  customerId: string;
  histBoxId: string;
  medicineId: string;
  fatherBoxId: string;
};

export const accountController = {
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
        consultId?: string;
        admissionId?: string;
      };
    }>,
    reply: FastifyReply
  ) => {

    const PayInstallmentSchema = z.object({
      customerId: z.coerce.number(),
      histBoxId: z.coerce.number(),
      fatherBoxId: z.coerce.number(),
    })
    const { customerId, histBoxId, fatherBoxId } = PayInstallmentSchema.parse(request.params);
    const {
      totalDebit,
      installmentAmount,
      debitName,
      paymentType,
      consultId,
      admissionId,
    } = request.body;
    try {
      await accountService.installmentDebit(
        customerId,
        histBoxId,
        fatherBoxId,
        totalDebit,
        installmentAmount,
        debitName,
        paymentType,
        consultId,
        admissionId,

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
