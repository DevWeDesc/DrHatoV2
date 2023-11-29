import { FastifyInstance } from 'fastify'
import { vaccinesController } from '../controllers/vaccinesController'


export async function vaccinesRoutes(app: FastifyInstance) {
    app.post("/vaccines", vaccinesController.createVaccine)
    app.get("/vaccines", vaccinesController.getAllVaccines)
    app.post('/vaccinepet/:id/:petId/:accId/:queueId', vaccinesController.setVaccineInPet)
    app.delete('/vaccinepet/:id/:accId/:examPrice', vaccinesController.removeVaccine)
}