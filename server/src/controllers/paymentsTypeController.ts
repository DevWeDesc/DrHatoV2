import { FastifyRequest, FastifyReply } from "fastify";
import prisma from "../client";
import { z } from "zod";

const PaymentsTypeSchema = z.object({
  id: z.number(),
  type: z.string(),
});

export const paymentsTypeController = {
  getAllPaymentsType: async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      reply.send(await prisma.paymentsType.findMany());
    } catch (error) {
      console.log(error);
    }
  },

  getPaymentTypeById: async (
    request: FastifyRequest<{ Params: { id: any } }>,
    reply: FastifyReply
  ) => {
    try {
      const { id } = request.params;

      const payment = await prisma.paymentsType.findUnique({ where: id });
      reply.send({ payment });
    } catch (error) {
      console.log(error);
    }
  },
  createPaymentType: async (request: FastifyRequest, reply: FastifyReply) => {
    const PaymentsTypechema = z.object({
      typePayment: z.string(),
    });

    const { typePayment } = PaymentsTypechema.parse(request.body);

    await prisma.paymentsType.create({ data: { typePayment } });

    reply.send("Tipo de pagamento criado com sucesso!");
  },

  editPaymentType: async (request: FastifyRequest, reply: FastifyReply) => {
    const Schema = z.object({
      typePayment: z.string(),
    });
    const { id }: any = request.params;
    const { typePayment } = Schema.parse(request.body);
    const payment = await prisma.paymentsType.update({
      where: { id: parseInt(id) },
      data: { typePayment },
    });
    reply.status(201).send(payment);
  },

  deletePaymentType: async (request: FastifyRequest, reply: FastifyReply) => {
    const { id }: any = request.params;
    await prisma.paymentsType.delete({
      where: { id: parseInt(id) },
    });
    reply.status(201).send("Tipo de pagamento deletado com sucesso!");
  },
};
