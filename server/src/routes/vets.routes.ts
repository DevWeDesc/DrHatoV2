import { FastifyInstance } from 'fastify'
import { vetsController } from '../controllers/vetsController'
import { autorizationsController } from '../services/autorizationsService'


export async function vetsRoutes(app: FastifyInstance){
    app.get('/vets', vetsController.showVets)
    app.post('/vets',vetsController.createVet)

    app.post('/autorizations', autorizationsController.createAutorization)
    app.post('/autorizations', autorizationsController.showAutorization)

}