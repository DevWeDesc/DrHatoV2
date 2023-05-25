import { FastifyInstance } from 'fastify'
import { labsController } from '../controllers/labsController'

export async function labsRoutes(app: FastifyInstance) {
  app.get('/labs', labsController.getOpenExamsInLab)
  app.get('/labsearch', labsController.searchExamsBy)
}