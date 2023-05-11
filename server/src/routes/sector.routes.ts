import { FastifyInstance } from 'fastify'
import { sectorsController } from '../controllers/sectorsController'

export async function sectorsRoutes(app: FastifyInstance) {
  app.post('/sectors', sectorsController.createSector)
  app.get('/sectors', sectorsController.getSectors)
  app.put('/sectors/:id', sectorsController.editSector)
  app.delete('/sectors/:id', sectorsController.deleteSector)
}