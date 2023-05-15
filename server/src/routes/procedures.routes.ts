import { FastifyInstance } from 'fastify'
import { proceduresController } from '../controllers/proceduresController'

export async function proceduresRoutes(app: FastifyInstance) {
    app.post('/procedures', proceduresController.createProcedure)
    app.get('/procedures', proceduresController.getProcedures)
    app.get('/procedures/:id', proceduresController.getWithId)
    app.put('/procedures/:id', proceduresController.editProcedure)
    app.delete('/procedures/:id', proceduresController.deleteProcedure)
}