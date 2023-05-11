import { FastifyInstance } from 'fastify'
import { instructionsController } from '../controllers/instructionsController'

export async function instructionsRoutes(app: FastifyInstance) {
  app.post('/instructions', instructionsController.createInstruction)
  app.get('/instructions', instructionsController.getInstructions)
  app.put('/instructions/:id', instructionsController.editInstruction)
  app.delete('/instructions/:id', instructionsController.deleteInstruction)
}