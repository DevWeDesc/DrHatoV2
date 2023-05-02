import { FastifyInstance } from 'fastify'
import { autorizationsRegister} from '../services/autorizationsRegister'


export async function generalRoutes(app: FastifyInstance){

    app.post('/autorizations', autorizationsRegister.createAutorization)
    app.get('/autorizations', autorizationsRegister.showAutorization)
    app.get('/autorizations/:id', autorizationsRegister.searchAutorizaton)
    app.put('/autorizations/:id', autorizationsRegister.editAutorizaton)

}