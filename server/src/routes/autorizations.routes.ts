import { FastifyInstance } from 'fastify'
import { autorizationsController } from '../controllers/autorizationsController'


export async function autorizationRoutes(app: FastifyInstance){

    app.post('/autorizations', autorizationsController.createAutorization)
    app.get('/autorizations', autorizationsController.showAutorization)
    app.get('/autorizations/:id', autorizationsController.searchAutorizaton)
    app.put('/autorizations/:id', autorizationsController.editAutorizaton)

}