import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export const accountService = {
        creditCustomerAccount: async (customerId: string, values: number) => {
            try {
                await prisma.customerAccount.update({
                    where: {id: parseInt(customerId)}, data: {credits: { increment: values}}
                })

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

        installmentDebit: async (accountId: string, boxId: string, totalDebit: number, installmentAmount: number, debitName: string, paymentType: string) => {
            try {
                const actualDate = new Date();
                const amountInstallments = (totalDebit / installmentAmount)

                await prisma.installmentsDebts.create({data: {paymentDate: actualDate, amountInstallments, totalDebit, installmentAmount, paymentType, debitName,customerAccount: {
                    connect: {id: parseInt(accountId)}
                }, boxHistory: {connect: {id: parseInt(boxId)}} }})
                
            } catch (error) {
                console.log(error)
            }
        }
}