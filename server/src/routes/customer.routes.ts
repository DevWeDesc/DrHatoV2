import { FastifyInstance } from 'fastify'

import { customerController } from '../controllers/customerController';


export async function customersRoutes(app: FastifyInstance)
{

  app.get("/customersearch/:page", customerController.searchUser)
  app.post('/customers', customerController.createUser)
  app.get('/customers', customerController.showAllUsers)
  app.get("/customers/:id", customerController.findUserById)
  app.get('/installments/:id', customerController.getInstallmentDetails)
  app.put('/customers/:id', customerController.updateCustomer)
  app.patch('/customer/credits', customerController.incrementCustomerCredits)
  app.get('/customer/debits/:id', customerController.getDetailsDebits)
}