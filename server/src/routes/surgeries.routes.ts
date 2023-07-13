import { FastifyInstance } from 'fastify'
import { surgeriesController } from '../controllers/surgeriesController'

export async function surgeriesRoutes(app: FastifyInstance) {
  app.post("/surgeries", surgeriesController.createSurgerie)
  app.get("/surgeries", surgeriesController.getSurgeries)
  app.post("/surgeries/:id/:recordId", surgeriesController.setSurgerieInPet)
}