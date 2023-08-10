import { FastifyRequest, FastifyReply } from "fastify";
import { PrismaClient } from "@prisma/client";
import { AdmissionSchema, BedSchema } from "../schemas/schemasValidator";
import { ValidationContract } from "../validators/validateContract";
import { z } from "zod";
import { accountService } from "../services/accountService";
const prisma = new PrismaClient();

type params = {
  id: string;
  customerId: string;
};

export const accountController = {
  creditAccount: async (request: FastifyRequest<{Params: params, Body: {values: number}}>, reply: FastifyReply) => {
    const {customerId} = request.params
    const {values} = request.body
        try {
            await accountService.creditCustomerAccount(customerId, values)
            reply.send("Conta creditada com sucesso!")
        } catch (error) {
          console.log(error)
        }
  },

  debitAccount: async (request: FastifyRequest<{Params: params, Body: {values: number}}>, reply: FastifyReply) => {
    const { customerId } = request.params
    const {values} = request.body
    try {
        await accountService.debitCustomerAccount(customerId, values)
        reply.send("Conta debitada com sucesso!")
    } catch (error) {
      console.log(error)
    }
  },

  payInInstallments: async (request: FastifyRequest<{Params: params, Body: {totalDebit: number, installmentAmount: number, debitName: string}}>, reply: FastifyReply) => {
    const { customerId } = request.params
    const {totalDebit, installmentAmount, debitName} = request.body
    try {
      await accountService.installmentDebit(customerId, totalDebit, installmentAmount, debitName)
      reply.send("Parcelado com sucesso!")
    } catch (error) {
      console.log(error)
    }
  }
}