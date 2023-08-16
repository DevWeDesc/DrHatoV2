import { FastifyRequest, FastifyReply } from "fastify";
import { accountService } from "../services/accountService";


type params = {
  id: string;
  customerId: string;
  histBoxId: string;
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

  payInInstallments: async (request: FastifyRequest<{Params: params, Body: {totalDebit: number, installmentAmount: number, debitName: string, paymentType: string}}>, reply: FastifyReply) => {
    const { customerId,histBoxId } = request.params
    const {totalDebit, installmentAmount, debitName, paymentType} = request.body
    try {
      await accountService.installmentDebit(customerId, histBoxId, totalDebit, installmentAmount, debitName, paymentType)
      reply.send("Parcelado com sucesso!")
    } catch (error) {
      console.log(error)
    }
  }
}