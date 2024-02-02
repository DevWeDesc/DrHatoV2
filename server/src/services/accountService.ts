import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export const accountService = {
  creditCustomerAccount: async (customerId: string, values: number) => {
    try {
      await prisma.customerAccount.update({
        where: { id: parseInt(customerId) },
        data: { credits: { increment: values } },
      });
    } catch (error) {
      console.log(error);
    }
  },

  pushDebitsToAccount: async (customerId: string) => {
    try {
      const customer = await prisma.customer.findUnique({
        where: { id: parseInt(customerId) },
        include: { pets: { select: { debits: true } }, customerAccount: true },
      });

      if (!customer) {
        return;
      }
      let totalDebits = customer?.pets.map((pet) => {
        let totalToPay = pet.debits;
      });

      await prisma.customer.update({
        where: { id: parseInt(customerId) },
        data: {
          customerAccount: {
            update: { debits: { increment: Number(totalDebits) } },
          },
        },
      });
    } catch (error) {
      console.log(error);
    }
  },

  debitCustomerAccount: async (customerId: string, values: number) => {
    try {
      await prisma.customerAccount.update({
        where: { id: parseInt(customerId) },
        data: {
          debits: { increment: values },
        },
      });
    } catch (error) {
      console.log(error);
    }
  },

  installmentDebit: async (
    accountId: string,
    boxId: string,
    totalDebit: number,
    installmentAmount: number,
    debitName: string,
    paymentType: string,
    consultId?: string,
    admissionId?: string
  ) => {
    try {
      const actualDate = new Date();
      const amountInstallments = totalDebit / installmentAmount;

      await prisma.installmentsDebts
        .create({
          data: {
            paymentDate: actualDate,
            amountInstallments,
            totalDebit,
            installmentAmount,
            paymentType,
            debitName,
            customerAccount: {
              connect: { customerId: parseInt(accountId) },
            },
            boxHistory: { connect: { id: parseInt(boxId) } },
          },
        })
        .then(async (res) => {
          await prisma.installmentsDebts.update({
            where: { id: res.id },
            data: {
              consultPetId: consultId ? consultId : null,
              admissionsPetId: admissionId ? admissionId : null,
            },
          });
        });

      await prisma.customer.update({
        where: { id: parseInt(accountId) },
        data: {
          customerAccount: {
            update: {
              debits: { decrement: totalDebit },
              admissionId: admissionId ? "" : admissionId,
              consultId: consultId ? "" : consultId,
            },
          },
        },
      });
    } catch (error) {
      console.log(error);
    }
  },
};
