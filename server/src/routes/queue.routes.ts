import { FastifyInstance } from 'fastify'
import { queueController } from '../controllers/queueController'

export async function queueRoutes(app: FastifyInstance) {
    app.put('/queue/:id', queueController.setPetInQueue)
    app.put('/endqueue/:petId/:recordId/:queueId/:customerId', queueController.finishQueueOfPet)

}