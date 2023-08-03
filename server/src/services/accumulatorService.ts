import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const accumulatorService = {
    addPriceToAccum: async (values: any, id: any ) => {
            try {
                const actualValue =  await prisma.pricesAccumulator.findUnique({
                    where: {
                        id: parseInt(id)
                    }
                })
                if(!actualValue) return 

                const total = Number(actualValue.accumulator) + Number(values)
                await prisma.pricesAccumulator.update({
                    where: {id :  parseInt(id)},
                    data: {accumulator: total }
                })


                return total
            } catch (error) {
                console.log(error)
            }
    },

    removePriceToAccum: async (values: any, id: any ) => {
        try {
            const actualValue =  await prisma.pricesAccumulator.findUnique({
                where: {
                    id: parseInt(id)
                }
            })
            if(!actualValue) return 

            const total = Number(actualValue.accumulator) - Number(values)

            await prisma.pricesAccumulator.update({
                where: {id :  parseInt(id)},
                data: {accumulator: total }
            })


            return total
        } catch (error) {
            console.log(error)
        }
},

}