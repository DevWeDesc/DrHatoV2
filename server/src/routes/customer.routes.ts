import { FastifyInstance } from 'fastify'

import { customerController } from '../controllers/customerController';


export async function customersRoutes(app: FastifyInstance)
{

  app.get("/customersearch", customerController.searchUser)
  app.post('/customers', customerController.createUser)
  app.get('/customers', customerController.showAllUsers)
  app.get("/customers/:id", customerController.findUserById)
}