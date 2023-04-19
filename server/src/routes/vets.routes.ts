import { FastifyInstance } from 'fastify'
import { vetsController } from '../controllers/vetsController'
import { autorizationsRegister} from '../services/autorizationsRegister'


export async function vetsRoutes(app: FastifyInstance){
    app.get('/vets', vetsController.showVets)
    app.post('/vets',vetsController.createVet)

    app.post('/autorizations', autorizationsRegister.createAutorization)
    app.get('/autorizations', autorizationsRegister.showAutorization)
    app.get('/autorizations/:id', autorizationsRegister.searchAutorizaton)
    app.put('/autorizations/:id', autorizationsRegister.editAutorizaton)

}