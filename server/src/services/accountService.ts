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

        pushDebitsToAccount: async (customerId: string) => {
            try {
                const customer = await prisma.customer.findUnique({
                    where: {id: parseInt(customerId)},include: {pets: {select: {debits: true}},  customerAccount: true}
                })

                if(!customer) {
                    return
                } else {
                    let totalDebits = customer?.pets.reduce((acc, pet) => acc + Number(pet.debits), Number(customer.customerAccount?.debits))
            
                    await prisma.customer.update({
                     where: {id: parseInt(customerId)},data: {
                         customerAccount: {update: {debits: {increment: Number(totalDebits)}}}
                     }
                 })
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