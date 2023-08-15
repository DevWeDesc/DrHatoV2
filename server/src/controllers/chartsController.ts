import { FastifyRequest, FastifyReply } from "fastify";
import '../utils/chartsMarketingCount'
import { chartsCount } from "../utils/chartsMarketingCount";
import { prisma } from "../interface/PrismaInstance";


export const chartsController = {
allCharts: async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const marketingChart = await prisma.customer.findMany({
            select: {howKnowUs: true}
        })
        let response = chartsCount(marketingChart)
        reply.send(response)
    } catch (error) {
        console.log(error)
    }
}
}