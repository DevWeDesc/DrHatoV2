import { FastifyInstance, } from 'fastify'
import { petsController } from '../controllers/petsController'


export async function petRoutes(app: FastifyInstance) {

  app.get('/pets', petsController.getAllPets)
  app.get('/pets/:id', petsController.getWithId)
  app.post('/pets/:id', petsController. createPet)

}
