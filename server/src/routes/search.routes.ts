import { FastifyInstance } from 'fastify'

import { searchController } from '../controllers/searchController';


export async function searchsRoutes(app: FastifyInstance){
  app.get('/vetsearch', searchController.vetsBigSearchs)
  app.get('/queryall', searchController.getAll)

}