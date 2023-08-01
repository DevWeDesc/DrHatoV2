import { FastifyInstance } from 'fastify'
import { autorizationsRegister} from '../utils/autorizationsRegister'
import { UserIsAuth } from '../middlewares/auth'


export async function generalRoutes(app: FastifyInstance){

    app.post('/autorizations', { preHandler: UserIsAuth}, autorizationsRegister.createAutorization)
    app.get('/autorizations', autorizationsRegister.showAutorization)
    app.get('/autorizations/:id', autorizationsRegister.searchAutorizaton)
    app.put('/autorizations/:id', autorizationsRegister.editAutorizaton)

}