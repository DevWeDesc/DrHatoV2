import { FastifyRequest, FastifyReply } from "fastify";
import { PrismaClient } from "@prisma/client";
import '../services/chartsMarketingCount'
import { chartsCount } from "../services/chartsMarketingCount";
const prisma = new PrismaClient();
type params = {
  id: string;
  recordId: string;
}



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