import { FastifyInstance } from 'fastify'
import { proceduresController } from '../controllers/proceduresController'

export async function proceduresRoutes(app: FastifyInstance) {
    app.post('/procedures', proceduresController.createProcedure)
    app.get('/procedures', proceduresController.getProcedures)
    app.get('/procedures/:id', proceduresController.getWithId)
}