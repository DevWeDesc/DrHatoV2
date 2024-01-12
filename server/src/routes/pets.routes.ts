import { FastifyInstance, } from 'fastify'
import { petsController } from '../controllers/petsController'


export async function petRoutes(app: FastifyInstance) {

  app.get('/pets', petsController.getAllPets)
  app.get('/pets/:id', petsController.getWithId)
  app.get('/petsall/:petId', petsController.getPetBedHistory)
  app.post('/pets/:id', petsController. createPet)
  app.get('/pets/queue', petsController.petsInQueue)
  app.get('/pets/queue/preference/:vetName', petsController.petsByVetQueue)
  app.put('/pet/:petId/:weight', petsController.changePetWeight)


  app.post('/pets/especie', petsController.createEspecie)
  app.get('/pets/especie', petsController.getEspecies)
  app.get('/pets/especie/:espId', petsController.getEspeciesById)
  app.post('/pets/races', petsController.createRaces)


  app.get('/pets/history/:petId', petsController.getAllPetHistory)
  app.get('/pet/old/history/consults/:petId', petsController.getPetOldHistoryConsults)

}
