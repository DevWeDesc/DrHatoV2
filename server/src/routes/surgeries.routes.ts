import { FastifyInstance } from 'fastify'
import { surgeriesController } from '../controllers/surgeriesController'

export async function surgeriesRoutes(app: FastifyInstance) {
  app.post("/surgeries", surgeriesController.createSurgerie)
  app.get("/surgeries", surgeriesController.getSurgeries)
  app.post("/surgeries/:id/:recordId/:accId", surgeriesController.setSurgerieInPet)
  app.delete("/surgeries/:id/:accId/:sugPrice", surgeriesController.excludePetSugerie)


  app.post('/surgeries/reports/:surgerieId', surgeriesController.reportPetSurgerie)
  app.get('/surgeries/reports/:petId', surgeriesController.getPetSurgeriesHistory)

}