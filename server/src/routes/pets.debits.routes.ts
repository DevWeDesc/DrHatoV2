import { FastifyInstance, } from 'fastify'
import { petsDebitsController } from '../controllers/petsDebitsController'


export async function petDebitsRoutes(app: FastifyInstance) {

  app.get('/debits/pets/:petId', petsDebitsController.getPetDebits)

  app.get('/debits/pets/consults/:queueId', petsDebitsController.getDebitsInQueue)
  app.get('/debits/pets/admissions/:queueId', petsDebitsController.getDebitsInAdmission)


}
