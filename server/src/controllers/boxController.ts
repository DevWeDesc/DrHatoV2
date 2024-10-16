import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { prisma } from "../interface/PrismaInstance";
import { randomInt } from "crypto";
import { send } from "process";

const boxSchema = z.object({
  name: z.string().optional(),
  entryValues: z.number().optional(),
  exitValues: z.number().optional(),
  movimentedValues: z.number().optional(),
  boxIsOpen: z.boolean().optional(),
  openBy: z.string().optional(),
  closedBy: z.string().optional(),
});

type params = {
  boxId: string;
  vetBox: string;
};

export const boxController = {
  createReturnsBoxByUser: async (
    request: FastifyRequest,
    reply: FastifyReply
  ) => {
    const paramsSchema = z.object({
      boxId: z.string(),
      customerId: z.string(),
      installmentId: z.string(),
    });

    const { boxId, customerId, installmentId } = paramsSchema.parse(
      request.params
    );

    const bodySchema = z.object({
      reasonForReturn: z.string(),
      userName: z.string(),
      password: z.string(),
      value: z.string(),
    });
    const { reasonForReturn, userName, value } = bodySchema.parse(request.body);

    try {
      await prisma.returnsClientBox
        .findUnique({
          where: { id: Number(installmentId) },
        })
        .then((res) => {
          if (res != null) {
            return reply
              .status(400)
              .send("Já foi efetuada a devolução nessa compra!");
          }
        });
      await prisma.user
        .findUnique({ where: { username: userName } })
        .then((res) => {
          if (res == null) {
            return reply.status(400).send("Usuário não encontrado!");
          }
        });

      var returnCreated = await prisma.returnsClientBox.create({
        data: {
          reasonForReturn: reasonForReturn,
          value: value,
          idInstallment: Number(installmentId),
          idHospVetBox: Number(boxId),
          idCustomer: Number(customerId),
        },
      });
      await prisma.hospVetBox
        .findUnique({
          where: { id: parseInt(boxId) },
        })
        .then(async (res) => {
          await prisma.hospVetBox.update({
            where: { id: res?.id },
            data: {
              movimentedValues: Number(res?.movimentedValues) - Number(value),
            },
          });
        });
      reply.status(201).send(returnCreated);
    } catch (err) {
      reply.status(400).send(err);
    }
  },

  getAllReturns: async (request: FastifyRequest, reply: FastifyReply) => {
    const allReturns = await prisma.returnsClientBox.findMany({
      include: {
        customerAccount: { include: { customer: true } },
        hospVetBox: true,
        installment: true,
      },
    });

    reply.status(200).send(allReturns);
  },

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
      include: { customerAccount: { include: { customer: true } } },
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

  createVetBox: async (request: FastifyRequest, reply: FastifyReply) => {
    const { name, boxIsOpen } = boxSchema.parse(request.body);
    try {
      if (!name) return;
      await prisma.hospVetBox.create({
        data: {
          name,
          boxIsOpen: boxIsOpen,
          entryValues: 0,
          exitValues: 0,
          movimentedValues: 0,
        },
      });
      reply.send("Caixa criado com sucesso");
    } catch (error) {
      console.log(error);
      reply.send(error);
    }
  },

  showVetBox: async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const boxs = await prisma.hospVetBox.findMany({
        include: { historyBox: true },
      });

      if(boxs.length === 0) {
        return reply.send({}).status(200)
      }

      reply.send(boxs[0]).status(200);
    } catch (error) {
      console.log(error);
      reply.send(error);
    }
  },

  showDailyBox: async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const dailyBox = await prisma.hospBoxHistory.findFirst({
        where: { boxIsOpen: true },
      });
      reply.send(dailyBox);
    } catch (error) {
      console.log(error);
    }
  },

  showlastBoxClosed: async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const boxs = await prisma.hospBoxHistory.findMany({
        where: { boxIsOpen: false },
      });
      const lastBox = boxs[boxs.length - 1];
      reply.send(lastBox);
    } catch (error) {
      console.log(error);
    }
  },

  openBoxDaily: async (
    request: FastifyRequest<{ Params: params }>,
    reply: FastifyReply
  ) => {
    const { entryValues, exitValues, openBy } = boxSchema.parse(request.body);
    const { boxId } = request.params;
    try {
      const actualDate = new Date();
      if (!entryValues || !exitValues) {
        return;
      }

      const dailyBox = await prisma.hospBoxHistory.create({
        data: {
          openBox: actualDate,
          entryValues,
          exitValues,
          boxIsOpen: true,
          openBy,
          totalValues: entryValues - exitValues,
          HospVetBox: { connect: { id: parseInt(boxId) } },
        },
      });

      await prisma.hospVetBox.update({
        where: { id: parseInt(boxId) },
        data: { boxIsOpen: true },
      });

      reply.send(dailyBox);
    } catch (error) {
      console.log(error);
    }
  },

  closeBoxDaily: async (
    request: FastifyRequest<{ Params: params }>,
    reply: FastifyReply
  ) => {
    const ParamsSchema =  z.object({
      vetBox: z.coerce.number(),
      boxId: z.coerce.number(),
    })
    const { boxId, vetBox } = ParamsSchema.parse(request.params);
    const { entryValues, exitValues, closedBy } = boxSchema.parse(request.body);
    try {

      const customers = await prisma.customer.findMany({
        where: {
          customerAccount: { debits: { gte: 1 }, clientIsVip: false },
        },
        include: {
          customerAccount: true,
        },
      });

      const accounts =  customers.map((customer) => {
        return customer.customerAccount
      })
    


      if (accounts) {
        const debits = accounts.reduce((acc, account) => {
          return acc += Number(account?.debits)
        }, 0)

        if(debits >= 1) {
          return reply
          .status(400)
          .send("Não é possivel fechar o caixa, pois tem débitos em aberto!");
        }

      }

      const dailyBox = await prisma.hospBoxHistory.findUnique({
        where: { id: boxId },
      });

      const fatherBox = await prisma.hospVetBox.findUnique({where: {id: vetBox}})

      
      if (!dailyBox) {
        return;
      }

      let totalMovimentendValues =
      Number(fatherBox?.entryValues) +
      Number(fatherBox?.exitValues);

      let totalValues =
      Number(dailyBox.entryValues) -
      Number(dailyBox.exitValues)

     const dailyVetBox = await prisma.hospVetBox
        .update({
          where: { id: vetBox },
          data: {
            entryValues: {increment: Number(dailyBox.entryValues)},
            exitValues: {
              increment: Number(dailyBox.exitValues),
            },
            movimentedValues: totalMovimentendValues,
            
            historyBox: {
              update: {
                where: { id: boxId },
                data: {
                  closeBox: new Date(),
                  entryValues: { increment: entryValues },
                  exitValues: { increment: exitValues },
                  totalValues,
                  closedBy,
                  boxIsOpen: false,

                },
              },
            },
          },
        })

      
        reply.send({
          dailyVetBox
        })
    } catch (error) {
      console.log(error);
    }
  },

  showCustomerDebitsOpen: async (
    request: FastifyRequest<{ Params: params }>,
    reply: FastifyReply
  ) => {
    try {
      const accounts = await prisma.customer.findMany({
        where: { customerAccount: { debits: { gte: 1 } } },
        include: {
          pets: {
            select: {
              name: true,
            }
          },
          customerAccount: true,
        },
      });
      reply.send(accounts);
    } catch (error) {
      console.log(error);
    }
  },

  getDailyBoxInstallments: async (
    request: FastifyRequest,
    reply: FastifyReply
  ) => {
    try {
      
      const DailyBoxInstallmentSchema = z.object({
        dailyBoxId: z.coerce.number()
      })
      const {dailyBoxId} = DailyBoxInstallmentSchema.parse(request.params)

      const box =  await prisma.hospBoxHistory.findMany({
        where: {
          id: dailyBoxId
        },
        include: {
          installments: true
        }
      })

      return {
        box
      }
    } catch (error) {
      console.log(error) 
    }
  }
};
