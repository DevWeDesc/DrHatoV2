import { FastifyInstance } from 'fastify'
import { vetsController } from '../controllers/vetsController'
import { autorizationsController } from '../services/autorizationsService'


export async function vetsRoutes(app: FastifyInstance){
    app.get('/vets', vetsController.showVets)
    app.post('/vets',vetsController.createVet)

    app.post('/autorizations', autorizationsController.createAutorization)
    app.get('/autorizations', autorizationsController.showAutorization)
    app.get('/autorizations/:id', autorizationsController.searchAutorizaton)
    app.put('/autorizations/:id', autorizationsController.editAutorizaton)

}