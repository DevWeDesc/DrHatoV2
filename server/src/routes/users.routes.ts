import { FastifyInstance } from 'fastify'
import { PrismaClient } from '@prisma/client'
import { userController } from '../controllers/userController'

export async function userRoutes(app: FastifyInstance){
app.post('/users',userController.createUser ) 
app.post('/login', userController.loginUser)
app.get('/vets', userController.findVetUsers)
app.get('/users', userController.getUsers)
app.get('/users/:id', userController.getWithId)
app.put('/users/:id', userController.editUser)
app.delete('/users/:id' , userController.deleteUser)


app.get('/users/vets', userController.getVetUsers)
app.get('/users/vets/name/:consultName',userController.searchVetByName)
}


