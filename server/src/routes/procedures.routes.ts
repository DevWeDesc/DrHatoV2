import { FastifyInstance } from 'fastify'
import { proceduresController } from '../controllers/proceduresController'

export async function proceduresRoutes(app: FastifyInstance) {
    app.post('/procedures', proceduresController.createProcedure)
    app.post('/procedures/:procedureId/:petId/:accId/:queueId', proceduresController.setProcedureInPet)
    app.get('/procedures', proceduresController.getProcedures)
    app.get('/procedures/:id', proceduresController.getWithId)
    app.put('/procedures/:id', proceduresController.editProcedure)
    app.delete('/procedures/:id', proceduresController.deleteProcedure)
    app.delete('/proceduresfp/:id/:accId/:procedPrice', proceduresController.deleteProcedureOfPet)
}