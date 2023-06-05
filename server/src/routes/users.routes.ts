import { FastifyInstance } from 'fastify'
import { PrismaClient } from '@prisma/client'
import { userController } from '../controllers/userController'

export async function userRoutes(app: FastifyInstance){
app.post('/users',userController.createUser ) 
app.get('/vets', userController.findVetUsers)
app.get('/users', userController.getUsers)
app.get('/users/:id', userController.getWithId)
app.put('/users/:id', userController.editUser)
app.delete('/users/:id' , userController.deleteUser)
}


