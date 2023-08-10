import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export const accountService = {
        creditCustomerAccount: async (customerId: string, values: number) => {
            try {
                await prisma.customerAccount.update({
                    where: {id: parseInt(customerId)}, data: {credits: { increment: values}}
                })

                return "sucesso"
            } catch (error) {
                console.log(error)
            }
          
        },

        useCreditsToPayDebits: async (customerId: string, values: number) => {
            try {
                const customer = await prisma.customerAccount.findUnique({
                    where: { id: parseInt(customerId)}
                })
                if(!customer) {
                    return
                } else {



                  //  await prisma.customerAccount.update({where: {id: parseInt(customerId)}, data: {debits:  (Number(customer.credits) - Number(customer.debits)), credits: (Number(customer.credits) - Number(values)) }})

                }
            } catch (error) {
                console.log(error)
            }
        },

        debitCustomerAccount:  async (customerId: string, values: number) => {
            try {
                await prisma.customerAccount.update({
                    where: {id: parseInt(customerId)},data: {
                        debits: {increment: values}
                    }
                })
            } catch (error) {
                console.log(error)
            }
        },

        installmentDebit: async (accountId: string, totalDebit: number, installmentAmount: number, debitName: string) => {
            try {
                const actualDate = new Date();
                const amountInstallments = (totalDebit / installmentAmount)

                await prisma.installmentsDebts.create({data: {paymentDate: actualDate, amountInstallments, totalDebit, installmentAmount, debitName,customerAccount: {
                    connect: {id: parseInt(accountId)}
                } }})
                
            } catch (error) {
                console.log(error)
            }
        }
}