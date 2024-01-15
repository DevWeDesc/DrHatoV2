import { FastifyInstance } from 'fastify'
import { queueController } from '../controllers/queueController'

export async function queueRoutes(app: FastifyInstance) {
    app.put('/queue/:id', queueController.setPetInQueue)
    app.put('/endqueue/:petId/:queueUUID/:queueId/:customerId', queueController.finishQueueOfPet)
    app.get('/queuedebits/:petId/:date', queueController.getQueuePetHistory)
    app.put('/queue/unconclude', queueController.unconcludeQueue)

    app.patch('/queue/consult/:queueId', queueController.updateQueueDiagnostics)

}