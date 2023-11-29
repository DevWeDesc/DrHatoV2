import { FastifyInstance } from 'fastify'
import { surgeriesController } from '../controllers/surgeriesController'

export async function surgeriesRoutes(app: FastifyInstance) {
  app.post("/surgeries", surgeriesController.createSurgerie)
  app.get("/surgeries", surgeriesController.getSurgeries)
  app.post("/surgeries/:id/:petId/:accId/:queueId", surgeriesController.setSurgerieInPet)
  app.delete("/surgeries/:id/:accId/:sugPrice", surgeriesController.excludePetSugerie)


  app.patch('/surgeries/reports/:surgerieId', surgeriesController.reportPetSurgerie)
  app.get('/surgeries/reports/:petId', surgeriesController.getPetSurgeriesHistory)
  app.get('/surgeries/reports/started', surgeriesController.getPetSurgeriesOpened)
  app.get('/surgeries/reports/started/:petId', surgeriesController.getPetOpenedSugerie)
  

}