import { FastifyInstance } from 'fastify'

import { chartsController } from '../controllers/chartsController';


export async function chartsRoutes(app: FastifyInstance){
app.get('/marketing', chartsController.allCharts)
}