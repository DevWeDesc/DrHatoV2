import { FastifyInstance } from 'fastify'
import { groupsController } from '../controllers/groupsController'

export async function groupsRoutes(app: FastifyInstance) {
    app.post('/groups', groupsController.createGroup)
    app.get('/groups', groupsController.getGroups)
    
}