import { FastifyInstance } from 'fastify'
import { vetsController } from '../controllers/vetsController'


export async function vetsRoutes(app: FastifyInstance){
    app.get('/vets', vetsController.showVets)
    app.post('/vets',vetsController.createVet)
}