import { FastifyInstance } from 'fastify'

import { searchController } from '../controllers/searchController';


export async function searchsRoutes(app: FastifyInstance){
app.get('/query', searchController.getAllWithName)
}